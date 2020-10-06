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

| Stack type | Public IP | Build VM internal subnet | Note |
| --- | --- | --- | --- |
| Xcode and VS4Mac stacks | 208.52.166.154 | 10.200.15.0/20 |  |
|  | 207.254.0.248/29 | 10.246.15.0/20 | The public address is a subnet: the entire subnet must be in the allow list! |
|  | 207.254.34.148 | 10.254.228.0/20 |  |
| Linux/Docker stacks | 104.197.15.74 | 10.0.0.0/9 |  |
|  | 35.202.121.43 | 10.0.0.0/9 |  |
|  | 35.237.165.17 | 10.0.0.0/9 |  |
|  | 35.231.56.118 | 10.0.0.0/9 |  |

## Storage space

Our virtual machines have different amounts of free space to use, depending on the stack type. The table summarises the data - please keep in mind that these numbers are subject to change, as different versions of pre-installed tools and resources take up a varying amount of space on the machines.

| Stack Name | Filesystem | Size (GB) | Free (GB) |
| --- | --- | --- | --- |
| linuxandroidlts | /dev/loop0 | 160 | 113 |
| linuxandroidlts | /dev/sda1(bitrise) | 194 | 28 |
| linuxandroid | /dev/loop0 | 160 | 130 |
| linuxandroid | /dev/sda1(bitrise) | 194 | 28 |
| vs4mac-beta | /dev/disk1s5 | 200 | 50 |
| vs4mac-pre | /dev/disk1s1 | 200 | 32 |
| vs4mac-stable | /dev/disk1s5 | 200 | 51 |
| xcode-10.1.x | /dev/disk0s2 | 199 | 61 |
| xcode-10.2.x | /dev/disk1s1 | 200 | 61 |
| xcode-10.3.x | /dev/disk1s1 | 200 | 60 |
| xcode-11.0.x | /dev/disk1s1 | 200 | 50 |
| xcode-11.1.x | /dev/disk1s1 | 200 | 48 |
| xcode-11.2.x | /dev/disk1s1 | 200 | 23 |
| xcode-11.3.x | /dev/disk1s1 | 200 | 25 |
| xcode-11.4.x | /dev/disk1s5 | 200 | 50 |
| xcode-9.4.x | /dev/disk0s2 | 199 | 55 |
| xcode-edge | /dev/disk1s5 | 200 | 59 |

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

By default, every Bitrise stack comes with Java 8 pre-installed and ready to use. For now, if you do not switch to another version, your build will use Java 8. However, we recommend switching to Java 11: it should give you better performance, and Java 8 will be removed entirely at some point in the future. Use the older version only if you absolutely must: for example, if your app uses an older tool or dependency.

Java 11 is also available on every stack type, though the process of switching to Java 11 is slightly different on our Ubuntu-based stacks compared to the macOS-based stacks.

### Switching to Java 11

Our Android & Docker stacks run on virtual machines with Ubuntu, while our Xcode and Visual Studio for Mac stacks run on macOS. The process is a little different but on all stacks, switching to a different Java version requires three things:

* Setting Java itself and the Java compiler to the selected version.
* Setting the `JAVA_HOME` Environment Variable with the `export` command.
* Storing this Environment Variable with `envman` so it can be accessed by all Steps in your Workflow.

{% include message_box.html type="important" title="Steps and Env Vars" content="You need envman because without that, Steps can’t access each other’s Environment Variables. If you only set the Java environment for one Step, but do not store it with envman, the other Steps will use the default Java environment, Java 8."%}

You can do all of it in one **Script** Step though, so it’s quite simple. To set the Java version to Java 11:

{% include collapse.html title="On macOS-based stacks" content="

1. Add a **Script** Step to the Workflow before any Step that uses Java in any way.  
   The simplest way to do it is to place it as the first Step of the Workflow.
2. Add the following commands to the **Script content** input of the Step:

   ``` 
   jenv global system
   export JAVA_HOME='$(jenv prefix)'
   envman add --key JAVA_HOME --value '$(jenv prefix)'
   ```

   "%}

{% include collapse.html title="On Ubuntu-based stacks" content="

1. Add a **Script** Step to the Workflow before any Step that uses Java in any way.  
   The simplest way to do it is to place it as the first Step of the Workflow.
2. Add the following commands to the **Script content** input of the Step:

   ``` 
   sudo update-alternatives --set javac /usr/lib/jvm/java-11-openjdk-amd64/bin/javac
   sudo update-alternatives --set java /usr/lib/jvm/java-11-openjdk-amd64/bin/java
   
   export JAVA_HOME=1/usr/lib/jvm/java-11-openjdk-amd641
   envman add --key JAVA_HOME --value 1/usr/lib/jvm/java-11-openjdk-amd641
   ```  " %}
   
   ```

## iOS Simulator version & SDK support

All the iOS Simulator versions (which can be installed
through **Xcode**, **Preferences**, **Components**) are installed and available.