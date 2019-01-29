---
title: ''
redirect_from: []
date: 2018-12-19 14:28:42 +0000
published: false

---
Do you require a VPN connection for your build, to be able to connect to your server, either to `git clone` your repository or to access a private API? If yes, then this tutorial is for you!

## Technical information

To connect to a VPN, you need to:

1. Install and configure the required VPN components
2. Connect to the VPN

You can configure and connect a VPN anywhere in your Workflow - BEFORE you would use the VPN connection, of course. For example, if you require a VPN connection to access your repository, you have to connect before the `Git Clone` Step.

{% include message_box.html type="important" title="SSH sessions" content="When you choose your VPN tool and do the setup/configuration, you have to be careful **not to restart or abort** existing SSH sessions! The [bitrise.io](https://www.bitrise.io) workers will abort the build if the SSH connection between the build's Control/Master machine and the build virtual machine terminates!"%}

## Example configurations

### Using the `Connect to OpenVPN Server` Step

To use the `Connect to OpenVPN Server` Step, you need to build an OpenVPN server in advance. [Read more about how to set up an OpenVPN server](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-openvpn-server-on-ubuntu-18-04).

Once the server is ready, encode the following in Base64:

* CA certificate
* client certificate
* client private key

You can base64 encode files with the following command:

    $ base64 <filepath>

Now you are ready to set up the VPN on Bitrise, in the Workflow Editor of your app:

1. Register the encoded certificates and the key as [Secrets](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/#adding-a-secret-env-var) on [bitrise.io]().

   We recommend using the following keys as they are the default inputs for the VPN Step:
   * CA certificate: `$VPN_CA_CRT_BASE64`
   * Client certificate: `$VPN_CLIENT_CRT_BASE64`
   * Private key: `VPN_CLIENT_KEY_BASE64`
2. Add the `Connect to OpenVPN Server` Step to your workflow.

   Don't forget to add the Step before any Steps that might require VPN connection.
3. [Add the previously created Secrets](https://devcenter.bitrise.io/getting-started/getting-started-steps/#environment-variables-as-step-inputs) to their respective inputs:
   * `Base64 encoded CA Certificate`
   * `Base64 encoded Client Certificate`
   * `Base64 encoded Client Private Key`

   If you created the Secrets with the recommended keys, you do not have to change the inputs.
4. Fill in the other required inputs.
   * `Host`: the Open VPN Server IP or hostname
   * `Port`: OpenVPN Server Port number
   * `Protocol`: OpenVPN Server Protocol

### Strongswan VPN setup

This is an example script which you can either save into your repository and run it from there, or just copy paste its content into a `Script Step` in your `bitrise` configuration (`bitrise.yml` / Workflow).

    #!/usr/bin/env bash
    set -e
    
    echo "WAN IP"
    # This prints the servers Internet IP adress to the log, useful for debugging
    curl http://httpbin.org/ip
    
    case "$OSTYPE" in
      linux*)
        echo "Configuring for Linux"
    
        # Variables
        etc_dir=/etc
        etc_sudo='sudo' # Sudo is needed for Linux Strongswan configuration
    
        # Install strongswan
        echo "Installing Strongswan..."
        sudo apt-get install -y strongswan
    
        ;;
      darwin*)
        echo "Configuring for Mac OS"
    
        # Variables
        etc_dir=/usr/local/etc
        etc_sudo='' # Sudo is NOT needed for Mac OS Strongswan configuration
    
        # Install Strongswan using homebrew
        echo "Installing OpenSSL..."
        # Manually install OpenSSL first to save time, since installing Strongswan directly compiles OpenSSL from source instead
        brew install openssl
        echo "Installing Strongswan..."
        brew install strongswan
    
        ;;
      *)
        echo "Unknown operative system: $OSTYPE, exiting"
        exit 1
        ;;
    esac
    
    
    # Method for rendering a template string file (when run, returns the input string with $VARIABLES replaced from env)
    render_template() {
      eval "echo \"$(cat $1)\""
    }
    
    # Create a temporary directory to hold files
    temp_dir=/tmp/vpn-config
    mkdir $temp_dir
    
    # IPsec config file, see examples at https://wiki.strongswan.org/projects/strongswan/wiki/IKEv1Examples and https://wiki.strongswan.org/projects/strongswan/wiki/IKEv2Examples
    echo "Downloading ipsec.conf..."
    wget https://www.example.com/ipsec.conf.template -O $temp_dir/ipsec.conf.template
    # IPsec credentials file, see documentation at https://wiki.strongswan.org/projects/strongswan/wiki/IpsecSecrets
    echo "Downloading ipsec.secrets..."
    wget https://www.example.com/ipsec.secrets.template -O $temp_dir/ipsec.secrets.template
    # In some cases you might need to download the certificate, or certificate chain, of your other VPN endpoint
    echo "Downloading server.crt..."
    wget https://www.example.com/server.crt -O $temp_dir/server.crt
    
    echo "Rendering config templates"
    render_template $temp_dir/ipsec.conf.template > $temp_dir/ipsec.conf
    render_template $temp_dir/ipsec.secrets.template > $temp_dir/ipsec.secrets
    
    echo "Installing configuration"
    $etc_sudo cp $temp_dir/ipsec.conf $etc_dir/ipsec.conf
    $etc_sudo cp $temp_dir/ipsec.secrets $etc_dir/ipsec.secrets
    $etc_sudo cp $temp_dir/server.crt $etc_dir/ipsec.d/ocspcerts/server.crt
    
    # Start the ipsec service
    echo "Starting ipsec"
    sudo ipsec start
    
    # We're sleeping between commands, mostly since Mac OS seems to have some problems otherwise
    sleep 1
    
    # Output some helpful status to the log
    echo "Status ipsec"
    sudo ipsec statusall
    
    sleep 1
    
    # Switch out myconnection with the name of your connection in ipsec.conf
    echo "Initiating VPN connection"
    sudo ipsec up myconnection
    
    sleep 1
    
    case "$OSTYPE" in
      linux*)
        ;;
      darwin*)
        # In Mac OS El Capitan, the `sudo ipsec up` command consistently fails the first time, but succeeds after a restart of the ipsec service
        echo "Restarting ipsec"
        sudo ipsec restart
    
        sleep 1
    
        echo "Initiating VPN connection"
        sudo ipsec up myconnection
    
        sleep 1
    
        # This step might apply if you are routing all traffic trough the IPsec connection (that is, if your remote IP range is 0.0.0.0/0)
        # Mac OS El Capitan seems to have problems getting the DNS configuration from the Strongswan interface. Also IPv6 sometimes causes issues. So we're manually turning off IPv6 and forcing a new DNS configuration.
        echo "Disabling IPv6 and forcing DNS settings"
        # Fetch main interface
        main_interface=$(networksetup -listnetworkserviceorder | awk -F'\\) ' '/\(1\)/ {print $2}')
        # Completely disable IPv6
        sudo networksetup -setv6off "$main_interface"
        # Switch 10.0.0.1 with your DNS server
        sudo networksetup -setdnsservers "$main_interface" 10.0.0.1
        ;;
      *) ;;
    esac
    
    # Your VPN connection should be up and running. Any following steps of your Bitrise workflow can access devices over your VPN connection 🎉

### Cisco VPN connect

You can use the `Cisco VPN connect` Step: it connects with Cisco VPN provided by VPN3000 Concentrator, Juniper/Netscreen, IOS and PIX using **vpnc**.

To provide VPN client settings and credentials required for the Step, you can:

* use the existing vpnc configuration file: `vpnc.conf`
* use the `Command line options` input of the Step. The options specified in this input will take precedence over the configuration file!

For more information on setting up vpnc, check the [vpnc homepage](https://www.unix-ag.uni-kl.de/\~massar/vpnc/) and the [vpnc manual](https://linux.die.net/man/8/vpnc).