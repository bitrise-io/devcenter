---
changelog: 'The internal IP address space of the virtual machines is now available
  here: this information can be valuable if, for example, you''re trying to use a
  VPN with Bitrise.'
last_modified_at: '2020-05-05T08:30:00.000+00:00'
title: Virtual machines
tag:
- infrastructure
- security
description: On bitrise.io, we run your builds on macOS and Linux virtual machines.
  You can select from multiple stacks, each with its own list of preinstalled tool
  versions.
redirect_from: []
summary: On bitrise.io, we have macOS and Linux virtual machines hosted for your builds.
  You can select from multiple stacks, each with its own list of preinstalled tool
  versions.
menu:
  infrastructure-main:
    weight: 6

---
On [bitrise.io](https://www.bitrise.io), we have macOS and Linux virtual machines hosted for your builds. You can select from multiple stacks, each with its own list of preinstalled tool versions. Read more about available stacks and stack prepare types in the [Available Stacks docs](/infrastructure/available-stacks/).

The user account that is used for the builds is configured to have **passwordless sudo** enabled. This way you are able to install all the extra things you need for your builds and for other automation. If a tool is not preinstalled on your Stack of choice, you can install it yourself - see the [Install Any Additional Tool](/tips-and-tricks/install-additional-tools/) guide.

## Security

Every build runs in its own virtual machine and the virtual machine is rolled back to a saved state, the "base box" state, after the build is finished. This way **your builds are always protected** by changes made by others and by your previous builds and you can use a **stable environment** to define your build workflow, since no state persists between builds.

For more information about build and code security, see the [Code security](/getting-started/code-security/) guide.

### Network configuration for the virtual machines

For most users, who host their repositories on cloud-based service providers, there is no need for any network configuration to be able to use Bitrise. All we need is permission to access the repository and for that, an SSH key is enough.

However, your company security policy might not allow unknown and unauthorized IP addresses to communicate with the servers where your code is being stored - either on your own datacenter or in a private cloud. In that case, Bitrise won’t work unless the relevant IP addresses are added to your allow list.

### Adding build machine IPs to your allow list

Our datacenters are behind a set of public static IP addresses, with the virtual machines having their own internal subnets behind these addresses. You need to add the public IP addresses that you can find in [External and internal IP addresses](/infrastructure/virtual-machines/#external-and-internal-ip-addresses "/infrastructure/virtual-machines/#external-and-internal-ip-addresses").

Please note that the different stack types have different public IPs. If, for example, you only use the Xcode stacks, there is no need to add the IPs belonging to the Linux/Docker environments.

### Configuring your network for VPNs

You can [connect to Bitrise via VPN](/tutorials/vpn-configuration/ "https://devcenter.bitrise.io/tutorials/vpn-configuration/") - but it can cause a conflict if your local network uses the same address space as our build VMs. In such a case, the VPN may detect a clash and return an error. In this case, the only solution is to re-configure your local address space to use different subnets than our virtual machines. You can find the build VM internal address subnets in [External and internal IP addresses](/infrastructure/virtual-machines/#external-and-internal-ip-addresses "/infrastructure/virtual-machines/#external-and-internal-ip-addresses").

### External and internal IP addresses

{% include message_box.html type="warning" title="Allow-listing entire subnets" content="If the provided public IP address is a subnet, you need to allow the entire subnet on your network! For example, 208.52.166.128/28 means all IP addresses between 208.52.166.128  and 208.52.166.143 (208.52.166.128, 208.52.166.129, 208.52.166.130, and so on, all the way to and including 208.52.166.143) have to be allow-listed."%}

| Stack type | Public IP | Build VM internal subnet |
| --- | --- | --- |
| Xcode and VS4Mac stacks | 208.52.166.154/32 and<br>208.52.166.128/28 | 10.200.0.0/20 |
|  | 207.254.0.248/29 and<br>207.254.0.208/28 | 10.246.0.0/20 |
|  | 207.254.34.148/32 and<br>207.254.33.176/28 | 10.254.224.0/20 |
| Linux/Docker stacks | 104.197.15.74/32 | 10.0.0.0/9 |
|  | 34.125.50.224/32 | 10.0.0.0/9 |
|  | 34.125.82.130/32 | 10.0.0.0/9 |
|  | 35.202.121.43/32 | 10.0.0.0/9 |
|  | 35.237.165.17/32 | 10.0.0.0/9 |
|  | 35.231.56.118/32 | 10.0.0.0/9 |

## Storage space

Our virtual machines have different amounts of free space to use, depending on the stack type. The table summarises the data - please keep in mind that these numbers are subject to change, as different versions of pre-installed tools and resources take up a varying amount of space on the machines.

| Stack Name | Filesystem | Size (GB) | Free (GB) |
| --- | --- | --- | --- |
| linuxandroidlts | /dev/loop0 | 160 | 104 |
| linuxandroidlts | /dev/sda1(bitrise) | 194 | 28 |
| linuxandroid | /dev/loop0 | 160 | 112 |
| linuxandroid | /dev/sda1(bitrise) | 194 | 28 |
| vs4mac-beta | /dev/disk1s5 | 200 | 43 |
| vs4mac-pre | /dev/disk1s5 | 200 | 65 |
| vs4mac-stable | /dev/disk1s5s1 | 200 | 43 |
| xcode-10.3.x | /dev/disk1s1 | 200 | 96 |
| xcode-11.7.x | /dev/disk1s5 | 200 | 54 |
| xcode-11.6.x | /dev/disk1s5 | 200 | 62 |
| xcode-12.0.x | /dev/disk1s5 | 200 | 70 |
| xcode-12.1.x | /dev/disk1s5 | 200 | 57 |
| xcode-12.2.x | /dev/disk1s5 | 200 | 60 |
| xcode-12.3.x | /dev/disk1s5 | 200 | 35 |
| xcode-12.4.x | /dev/disk1s5 | 200 | 53 |
| xcode-12.5.x | /dev/disk1s5s1 | 200 | 39 |
| xcode-13.0.x | /dev/disk1s5s1 | 200 | 119 |
| xcode-edge | /dev/disk1s5s1 | 200 | 39 |

### Freeing up disk space

If you need additional disk space, you can always delete tools and resources that you do not use. For example, if your app does not need Android SDK tools, you can remove them. Just add a Script Step to your Workflow with the appropriate commands:

```bash
sudo rm -rf ~/Library/Developer/Xamarin/android-sdk-macosx
sudo rm -rf /usr/local/share/android-sdk 
sudo rm -rf /opt/android-ndk`
```

Similarly, feel free to delete iOS simulators that you do not use:

```bash
sudo rm -rf /Library/Developer/CoreSimulator/Profiles/Runtimes/iOS\\ 10.3.simruntime/
```

## Customization

You can find the macOS base box setup guide and automation scripts we use for building our
macOS virtual machine base boxes in our [OS X Box Bootstrap repository](https://github.com/bitrise-io/osx-box-bootstrap).
The repository includes every script we use for preparing these base virtual machine images.

For our Linux machines, check out the [Bitrise Base Docker Image's repository](https://github.com/bitrise-docker/bitrise-base).

{% include message_box.html type="note" title="System reports" content="
You can always check our current configurations in the [system reports folder of our main repository](https://github.com/bitrise-io/bitrise.io/tree/master/system_reports), to see what tools and which versions are preinstalled. These reports have been generated by the scripts, linked in the first lines of the report. "%}

The repositories used for our virtual machine preparation are open source,
and pull requests are welcome.
If you'd like to have a tool pre-installed in our machines,
feel free to add your changes and they will be included in the related Stack(s)
the next time the Stack is updated.

## Virtual machine updates

Updates are always announced in the [#changelog category of discuss.bitrise.io](https://discuss.bitrise.io/c/changelog)
and can be seen on [your Bitrise Dashboard](https://www.bitrise.io/dashboard).
We will also send you a _Platform Updates_ notification about significant changes,
unless you disable this feature under your [account settings page](https://www.bitrise.io/me/profile).

### Stack updates

In general we do stack updates once a week, during the weekends.

Minor patches might be applied during the week in case we detect an issue
with the current virtual machine environment.
These patches do not change any pre-installed tool version, unless it's really necessary.

We test every stack change as much as we can before it is
released to avoid any changes / updates during the week.

## Managing Java versions

By default, every Bitrise stack comes with Java 8 pre-installed and ready to use. For now, if you do not switch to another version, your build will use Java 8. However, we recommend switching to Java 11 as the latest Android tools require it: for example, the Gradle 7.0 plugin will not work with older Java versions.

{% include message_box.html type="warning" title="Java 11 to become the default version" content="From September 11/12, Java 11 will replace Java 8 as the default Java version on all Bitrise stacks. You will still be able to use Java 8 by switching back to it with a Script Step in your Workflow."%}

Java 11 is also available on every stack type, though the process of switching to Java 11 is slightly different on our Ubuntu-based stacks compared to the macOS-based stacks.

### Setting Java versions with the Set Java version Step

You can easily switch between Java 8 and Java 11 with our [**Set Java version** Step](https://www.bitrise.io/integrations/steps/set-java-version). The Step allows you to set the global Java version of the virtual machine that runs your build. 

{% include message_box.html type="important" title="Installing a new Java version" content="This Step cannot install any Java version. It can only switch between the versions that are pre-installed on our stacks. If you want to install a Java version that is not available on our stacks by default, check out the [Using a Java version not installed on our Android stacks](/infrastructure/virtual-machines/#using-a-java-version-not-installed-on-our-android-stacks) section."%}

1. Add the **Set Java version** Step to your Workflow. We recommend setting it as the first Step of the Workflow.
2. Find the **Java version to be set globally for the build** input.
3. Set it to the version you need. The accepted input values are 8 and 11.

### Setting Java versions with a Script Step

Our Android & Docker stacks run on virtual machines with Ubuntu, while our Xcode and Visual Studio for Mac stacks run on macOS. The process is a little different for the different stack types but on all stacks, switching to a different Java version requires three things:

* Setting Java itself and the Java compiler to the selected version.
* Setting the `JAVA_HOME` Environment Variable with the `export` command.
* Storing this Environment Variable with `envman` so it can be accessed by all Steps in your Workflow.

{% include message_box.html type="important" title="Steps and Env Vars" content="You need envman because without that, Steps can’t access each other’s Environment Variables. If you only set the Java environment for one Step, but do not store it with envman, the other Steps will use the default Java environment, Java 8."%}

You can do all of it in one **Script** Step though, so it’s quite simple. To change the default Java version:

{% include collapse.html title="On macOS-based stacks" content="

1. Add a **Script** Step to the Workflow before any Step that uses Java in any way.  
   The simplest way to do it is to place it as the first Step of the Workflow.
2. Add the following commands to the **Script content** input of the Step:  
   To set the global Java version for the build to Java 11:

   ``` 
   jenv global 11
   export JAVA_HOME=\"$(jenv prefix)\"
   envman add --key JAVA_HOME --value \"$(jenv prefix)\"
   ```

   To set the global Java version for the build to Java 8:

   ```   
   jenv global 1.8
   export JAVA_HOME="$(jenv prefix)"
   envman add --key JAVA_HOME --value "$(jenv prefix)"
   ```
3. Click **Save** at the top right corner.
   "%}

{% include collapse.html title="On Ubuntu-based stacks" content="

1. Add a **Script** Step to the Workflow before any Step that uses Java in any way.  
   The simplest way to do it is to place it as the first Step of the Workflow.
2. Add the following commands to the **Script content** input of the Step:
   To set the global Java version for the build to Java 11:

   ``` 
   sudo update-alternatives --set javac /usr/lib/jvm/java-11-openjdk-amd64/bin/javac
   sudo update-alternatives --set java /usr/lib/jvm/java-11-openjdk-amd64/bin/java
   
   export JAVA_HOME='/usr/lib/jvm/java-11-openjdk-amd64'
   envman add --key JAVA_HOME --value '/usr/lib/jvm/java-11-openjdk-amd64'
   ```
   1. To set the global Java version for the build to Java 8:

       sudo update-alternatives --set javac /usr/lib/jvm/java-8-openjdk-amd64/bin/javac
       sudo update-alternatives --set java /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
       
       export JAVA_HOME='/usr/lib/jvm/java-8-openjdk-amd64'
       envman add --key JAVA_HOME --value '/usr/lib/jvm/java-8-openjdk-amd64'
3. Click **Save** at the top right corner.
   " %}

### Using a Java version not installed on our Android stacks

If you need a Java or JDK version which is not installed on our Android stacks, follow this guide. The example below will install Java/JDK 1.14 with a **Script** Step. You can adapt it to the version of your choice.

1. Add the **Script** Step to your Workflow with the content below and don't forget to replace the version to the version you wish to install:

       #!/bin/bash
       set -ex
       
       add-apt-repository -y ppa:openjdk-r/ppa
       apt-get update -qq
       apt-get install -y openjdk-14-jdk
       update-java-alternatives -s /usr/lib/jvm/java-1.14.0-openjdk-amd64
       echo "done"
2. Start a new build. This **Script** Step can be the very first Step in the Workflow, as it does not depend on anything else.

## iOS Simulator version & SDK support

All the iOS Simulator versions (which can be installed
through **Xcode**, **Preferences**, **Components**) are installed and available.