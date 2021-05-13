---
last_modified_at: '2020-04-27'
tag:
- infrastructure
- stack
- VPN
title: Customizable enterprise build platforms
redirect_from: []
description: Using a custom enterprise build platform means running your Bitrise builds
  on virtual machines (VM) dedicated and specifically configured to your needs.
summary: ''
menu:
  infrastructure-main:
    weight: 8

---
Using a custom enterprise build platform means running your Bitrise builds on virtual machines (VM) dedicated and specifically configured to your needs. With a private cloud, you have complete control over how and when your builds run.

Bitrise offers two types of custom build platforms for enterprises:

* Dedicated build platform: a set of dedicated machines behind the Bitrise firewall. These machines will have the same public IP address as any Bitrise build machine but they are reserved for your exclusive use.
* Private build platform: this solution includes your own firewall, storage capacity, and vSphere environment. This allows you to create a custom virtualization configuration, as well as a site-to-site VPN. With the latter, data will never leave your network and you do not have to separately connect to a VPN with each build.

The private build platform is an advanced set-up with plenty of configuration options. To learn more about the details, contact us!

## Dedicated vs private build platform

Check out the most important differences between the dedicated and the private build platforms:

| Available service | Dedicated build platform | Private build platform |
| --- | --- | --- |
| Selecting the resources available to your virtual machines | ✅ | ✅ |
| Dedicated Customer Success Engineer, who is an expert in Mobile CI/CD. | ✅ | ✅ |
| Initial onboarding assistance for the first month with weekly calls. | ✅ | ✅ |
| Continued CI/CD best practices mentoring with monthly check-ins from Bitrise Account Managers and Customer Success Engineers. | ✅ | ✅ |
| Weekly Infrastructure maintenance that includes licenses for virtualization, orchestration, and data storage. | ✅ | ✅ |
| Private network with a dedicated firewall and IP addresses | - | ✅ |
| Management dashboard access (vSphere and Google Cloud Platform) | - | ✅ |
| Customize the pre-installed tools on the VMs | - | ✅ |

## Stacks

[The stack](https://devcenter.bitrise.io/infrastructure/available-stacks/ "https://devcenter.bitrise.io/infrastructure/available-stacks/") indicates the virtual machine version that we will use to run your build. On a custom build platform, you need to choose your stack or stacks in advance and as of now, you cannot change them afterwards. You can choose any of the stacks that are available on [bitrise.io](http://bitrise.io/ "http://bitrise.io"), and you can choose multiple types of stacks.

If you wish to order more than one type of stack, be aware that at least one virtual machine for each stack must keep running at all times - in idle mode, if there are no builds running. This means that you cannot use all your virtual machines to run builds on the same stack at the same time. Let’s look at an example of how this works in practice:

Our example organization has three virtual machines, with Xcode 11 and Xcode 10.2 stacks. When no builds are running, an Xcode 11 virtual machine and an Xcode 10.2 virtual machine is running in idle mode while the third virtual machine is off. If the organization, however, wants to run three builds on the Xcode 11 stack. They can only run two at the same time because the third virtual machine is in idle mode with the Xcode 10.2 stack.

## Machine setup

For both the dedicated build platform and the private build platform, you can choose the hardware resources available for your VMs.

### For Xcode and Visual Studio for Mac stacks

Our Xcode and Visual Studio for Mac stacks run on machines provided by MacStadium. You need to select the type of Mac Pro machines you need and the number of virtual machines that will run on them.

We offer two different types of Mac Pro machines:

* 6-core CPU and 32 GB of RAM.
* 12-core CPU and 64 GB of RAM.

Both versions support hyperthreading so the effective number of cores is 12 and 24, respectively.

The minimum order is two 6-core physical machines (12 effective cores), to ensure there is redundancy: a single hardware failure will never prevent users from running builds.

The next step is to decide the virtual machine configuration:

* The number of concurrencies you need: every concurrent build requires its own VM.
* The number of cores and the amount of RAM each VM should use.

A virtual machine requires at least two cores (out of either 12 or 24, depending on the Mac type). RAM capacity reserved for the virtual machines must be less than the full capacity of your chosen Mac because of the limitations of virtualization. For example, on a machine with 32 GB RAM, 27 GB can be reserved for the virtual machines.

### Available MacStadium configurations

The table shows the available resources for each VM, depending on the number of concurrencies.

| Number of concurrencies | Available resources for each VM (6 core Mac Pros @3.5GHz and 32GB RAM) | Available resources for each VM (12 core Mac Pros @2.7GHz and 64GB RAM) |
| --- | --- | --- |
| 1 concurrency | 12 vCPU, 27GB RAM | 24 vCPU, 54GB RAM |
| 2 concurrencies | 6 vCPU, 13GB RAM | 12 vCPU, 27GB RAM |
| 3 concurrencies | 4 vCPU, 9GB RAM | 8 vCPU, 18GB RAM |
| 4 concurrencies | - | 6 vCPU, 13GB RAM |
| 6 concurrencies | - | 4 vCPU, 9GB RAM |
| 12 concurrencies | - | - |

### For Android & Docker stacks

Our Linux-based virtual machines are provided by Google Cloud Platform. You can choose from two different types of machines for your VMs:

* Four virtual CPUs with 15 GB RAM.
* Eight virtual CPUs with 30 GB RAM.

### Available Google Cloud Platform configurations

The table shows the available resources for each VM.

| CPU | Storage | RAM |
| --- | --- | --- |
| Intel Xeon E5 @2.6 GHz with 4 vCPUs | 200GB SSD | 15GB |
| Intel Xeon E5 @2.6 GHz with 8 vCPUs | 200GB SSD | 30GB |

## Pricing

Private cloud pricing is subject to the required resources and configuration. Our sales team can provide further details. [Contact them](https://www.bitrise.io/contact), should you have more questions.