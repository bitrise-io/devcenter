---
last_modified_at: '2020-04-27'
title: 'Stack update and removal policy '
redirect_from: []
date: '2019-02-05T15:39:10.000+00:00'
tag:
- infrastructure
- builds
- xcode
- android
- linux
description: Stacks on bitrise.io are generally updated every weekend, but what’s
  updated depends on the stack. There are stacks where only certain caches are updated
  and there are stacks which are completely re-built every week.
summary: ''
menu:
  infrastructure-main:
    weight: 4

---
Stacks on [bitrise.io](https://www.bitrise.io) are generally updated every weekend, but what’s updated depends on the stack. There are stacks where only certain caches are updated and there are stacks which are completely re-built every week. Check out our Stacks in our [system reports Github site](https://github.com/bitrise-io/bitrise.io/tree/master/system_reports).

## Xcode stacks

We use two types of Xcode stacks; Stable stacks and Edge stacks.

* Xcode Stable stacks are built when a new minor version of a major Xcode version comes out. For example, Xcode 12.5.x has its own stable stack. These stacks are only updated with Xcode patch versions, Bitrise CLI related updates, [dependency manager cache updates](/infrastructure/stack-update-and-removal-policy/#about-dependency-manager-cache-updates) and with critical fixes. These stacks are designed so that if a build worked on the stack, the same build should run the same way as long as the stack is available.
* Xcode "Edge" stack is **re-built every week**. It includes the latest stable release of Xcode, the same pre-installed tools as on the Stable stack, and the [dependency manager cache updates](/infrastructure/stack-update-and-removal-policy/#about-dependency-manager-cache-updates). The stack uses the same [scripts](https://github.com/bitrise-io/osx-box-bootstrap) we use for creating new Xcode stacks.

{% include message_box.html type="note" title="Pinning an Xcode version" content="Whenever a new Xcode version comes out, our aim is to provide it to our users as soon as possible. But we do not update existing stable stacks with a new Xcode version as that could potentially break builds: instead, we provide a new stack with the new version, and keep maintaining the older versions.

As such, if your app's current stable stack works well for your needs, you don't have to do anything at all when a newer version comes out: you can keep using the previous Xcode version.

The only instance when you're potentially forced to take action is when older Xcode stacks are removed. This does not happen without advance warning; check out our [deprecation and removal policy](/infrastructure/stack-update-and-removal-policy/#deprecating-and-removing-stacks) to be prepared. "%}

### About dependency manager cache updates

All of the macOS stacks receive a dependency manager cache update (brew, cocoapods and bitrise CLI) every week. These cache updates do not change the pre-installed tool versions, they **only update the package manager caches** for faster dependency installs.

For more information on what else we use for provisioning the macOS VMs, head over to the weekly cache update Ansible playbook on [GitHub](https://github.com/bitrise-io/osx-box-bootstrap/blob/master/weekly-cache-update-playbook.yml).

## Android / Linux (Docker) stacks

The Android / Linux stacks are prepared with `docker`, using multiple separate docker images, built on top of each other. You can find these docker images on [GitHub](https://github.com/bitrise-docker).

* The **Android & Docker, on Ubuntu** stack is a **rolling release stack**, rebuilt automatically from a base Ubuntu image.
* The **Android & Docker, on Ubuntu - LTS Stack** image is a “frozen” version of a previous rolling release image, and is not updated at all (except with Bitrise CLI related updates and with critical fixes).

## Hybrid (Visual Studio for Mac) stacks

{% include message_box.html type="note" title="Deprecated Xamarin Studio Stacks" content=" Please note that Xamarin Studio stacks have been deprecated and replaced with the new Visual Studio for Mac stack. Make sure you switch to the Visual Studio for Mac one if you've been using the Xamarin Studio one before! "%}

The Visual Studio for Mac stacks are built on top of the latest Stable Xcode stack, so the preinstalled building tools of the base Xcode stack are not updated and are the same as in the base Xcode stack. The Xamarin specific bits are applied on top of the base Xcode image **every week** when generating the Visual Studio for Mac stacks ([using this Ansible playbook](https://github.com/bitrise-io/osx-box-bootstrap/blob/master/roles/xamarin/tasks/main.yml)).

The [dependency manager cache updates](/infrastructure/stack-update-and-removal-policy/#about-dependency-manager-cache-updates) are applied on these stacks too. Visual Studio for Mac stacks are upgraded to the latest Visual Studio for Mac versions on **every weekend**.

This means that the Visual Studio for Mac stacks are [**hybrid** stacks](/infrastructure/stack-update-and-removal-policy/#hybrid-stacks), built on a Stable base Xcode stack, but applying certain Visual Studio for Mac and Xamarin specific bits and updates every week.

## Deprecating and removing stacks

### Xcode Stacks

We keep the latest patch version of every minor Xcode version as long as that Xcode version is the latest major version.

In addition, we keep the very last minor+patch version of the previous two major Xcode versions

{% include message_box.html type="example" title="Example for maintaining Xcode stacks" content=" When the latest Xcode version was 12.5.x, we kept:

All the latest patch releases for every minor version of Xcode 12:

* 12.5.x
* 12.4.x
* 12.3.x
* 12.2.x
* 12.1.x
* 12.0.x

And the latest versions from the previous two Xcode major versions:

* 11.7.x
* 11.6.x
* 10.3.x

We will carry this example through our guide to illustrate stack removal and deprecation processes below.

"%}

#### **Deprecating and removing Xcode stacks**

When the first **beta of the next major Xcode version** is released, we **deprecate** all the minor versions of the last major version, except the very last version.

{% include message_box.html type="example" title="Example for deprecating Xcode stacks when beta Xcode version is released" content=" When Xcode 12 was released, we deprecated:

* The oldest major version which was Xcode 9.4.
* The minor versions of the last major version (Xcode 11 stacks) except for the last couple of minor versions (Xcode 11.6 and 11.7)."%}

When the first **final (non beta) version** of the new major Xcode version is released, we **remove** the deprecated stacks; the oldest major version as well as the minor versions of the last major version except the latest minor version.

{% include message_box.html type="example" title="Example for removing stacks when final Xcode version is released" content=" For example, when Xcode 12 (final, non beta) was released, we removed:

* The oldest major version which was Xcode 9.4.
* The minor versions of the last major version (Xcode 11 stacks) except for the last couple of minor versions (Xcode 11.6 and 11.7)."%}

This means that the latest patch release version of Xcode is **supported for about 2.5 years**, in sync with Xcode major version releases.

### Hybrid Stacks

Altogether we have 4 Hybrid stacks:

* The **Hybrid Visual Studio for Mac Stable** and **Hybrid Visual Studio for Mac Beta** Stacks are updated every weekend with the current Visual Studio 4 Mac Stable and Beta releases.
* The **Hybrid stack, with both Android tools and Xcode 8** is affected by a long term support and deprecation policy, so it only gets the latest Bitrise CLI and critical updates.
* The **Previous Hybrid stack with Xamarin and vs4mac** is kept on the previous version of Visual Studio for Mac.

So when a new version of Visual Studio for Mac (vs4mac) comes out:

* The current vs4mac Stable becomes the Previous Hybrid stack with Xamarin and vs4mac.
* The current Previous Hybrid stack with Xamarin and vs4mac gets deprecated.

This means that the **Hybrid Visual Studio for Mac Stable** is **supported for about 1 year**, in sync with the major Xcode version releases.

### Android/Linux Stacks

The **Android/Linux LTS** stack is upgraded when we release the first non LTS stack update with a new Ubuntu LTS version.

{% include message_box.html type="example" title="Example for upgrading the Android/Linux LTS stack" content=" The **Android/Linux LTS** stack was upgraded to the last version built on Ubuntu 16.04 when we released the first non LTS Android/Linux stack update built on Ubuntu 18.04. "%}

This means that an Android/Linux LTS stack is **supported for about 2 years**, roughly in sync with Ubuntu LTS (long term support) releases.