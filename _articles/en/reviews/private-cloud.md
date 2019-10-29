---
tag: []
title: Private cloud
redirect_from: []
summary: ''
published: false

---
Using a private cloud means running your Bitrise builds on virtual machines (VM) dedicated and specifically configured to your needs. With a private cloud, you have complete control over how and when your builds run.

Bitrise offers two types of private clouds:

* A set of dedicated machines behind the Bitrise firewall. These machines will have the same public IP address as any Bitrise build machine but they are reserved for your exclusive use.
* A full private cloud: this includes your own firewall, storage capacity, and vSphere environment. This allows you to create a custom virtualization configuration, as well as a site-to-site VPN. With the latter, data will never leave your network and you do not have to separately connect to a VPN with each build.

The full private cloud is an advanced set-up with plenty of configuration options. To learn more about the details, contact us!

You need to make a few decisions when ordering either version. Depending on whether you need Macs or Linux-based machines, the decisions are a bit different. We’ll go over the process now - and of course our sales and tech support teams are more than happy to help out if you have any questions!

## Stacks

[The stack](https://devcenter.bitrise.io/infrastructure/available-stacks/ "https://devcenter.bitrise.io/infrastructure/available-stacks/") indicates the virtual machine version that we will use to run your build. On a private cloud, you need to choose your stack or stacks in advance and as of now, you cannot change them afterwards. You can choose any of the stacks that are available on [bitrise.io](http://bitrise.io/ "http://bitrise.io"), and you can choose multiple types of stacks.

If you wish to order more than one stack, be aware that at least one virtual machine for each stack must keep running at all times - in idle mode, if there are no builds running. This means that you cannot use all your virtual machines to run builds on the same stack at the same time. Let’s look at an example of how this works in practice:

Our example organization has three virtual machines, with Xcode 11 and Xcode 10.2 stacks. When no builds are running, an Xcode 11 virtual machine and an Xcode 10.2 virtual machine is running in idle mode while the third virtual machine is off. If the organization, however, wants to run three builds on the Xcode 11 stack. They can only run two at the same time because the third virtual machine is in idle mode with the Xcode 10.2 stack.

## Machine setup

### For Xcode stacks

You need to select the type of Mac Pro machines you need and the number of virtual machines that will run on them.

We offer two different types of Mac Pro machines:

* 6-core CPU and 32 GB of RAM.
* 12-core CPU and 64 GB of RAM.

Both versions support hyperthreading so the effective number of cores is 12 and 24, respectively.

The minimum order is two 6-core machines.

The next step is to decide the virtual machine configuration:

* The number of VMs you need.
* The number of cores and the amount of RAM each VM should use.

A virtual machine requires at least two cores (out of either 12 or 24, depending on the Mac type). RAM capacity reserved for the virtual machines must be less than the full capacity of your chosen Mac because of the limitations of virtualization. For example, on a machine with 32 GB RAM, 27 GB can be reserved for the virtual machines. That means that if you want four virtual machines with 8 GB RAM for each, they won’t be able to run on the same Mac machine.

### For Linux stacks

Our Linux-based virtual machines are provided by Google Compute Engine. For the available machine types, see the [Google Compute Engine documentation](https://cloud.google.com/compute/docs/machine-types "https://cloud.google.com/compute/docs/machine-types").

## Pricing

Private cloud pricing is subject to the required resources and configuration. Our sales team can provide further details.