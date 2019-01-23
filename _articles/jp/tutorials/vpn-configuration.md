---
# jp title missing
title: Configuring and connecting to your VPN
menu:
  tutorials:
    weight: 8

---

{% include not_translated_yet.html %}

Do you require a VPN connection for your build, to be able to connect to your server,
either to `git clone` your repository or to access a private API?
If yes, then this tutorial is for you!


## Technical infos

Connecting to a VPN, in short, works like this:

1. the build starts
1. you install & configure the VPN components you need
1. you start the VPN
1. you proceed with the build

Obviously, if you require a VPN connection in order to access your code repository,
you have to connect to the VPN __before__ the `Git Clone` step, but in general
you can configure & connect to the VPN anywhere in your Workflow, __before__ you'd use the
connection.

_You can choose other VPN tools, not just the one shown here ([strongswan](https://www.strongswan.org)),
this is just one example setup which works on [bitrise.io](https://www.bitrise.io)._

__One important note__: when you choose your VPN tool and do the setup/configuration,
you have to be careful to __not to restart / abort__ existing SSH sessions!
The [bitrise.io](https://www.bitrise.io) workers will abort the build
if the SSH connection between the build's Control/Master machine and
the Build virtual machine terminates!


## Example

This is an example script which you can either save into your repository and run
it from there, or just copy paste its content into a `Script Step` in your `bitrise`
configuration (`bitrise.yml` / Workflow).

```bash
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
    main_interface=$(networksetup -listnetworkserviceorder | awk -F'\) ' '/\(1\)/ {print $2}')
    # Completely disable IPv6
    sudo networksetup -setv6off "$main_interface"
    # Switch 10.0.0.1 with your DNS server
    sudo networksetup -setdnsservers "$main_interface" 10.0.0.1
    ;;
  *) ;;
esac

# Your VPN connection should be up and running. Any following steps of your Bitrise workflow can access devices over your VPN connection 🎉

```
