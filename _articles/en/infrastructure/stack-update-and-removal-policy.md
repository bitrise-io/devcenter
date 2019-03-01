---
title: 'Stack update and removal policy '
redirect_from: []
date: 2019-02-05 15:39:10 +0000
menu:
  infrastructure:
    weight: 3

---
Stacks on [bitrise.io](https://www.bitrise.io) are generally updated every weekend, but what’s updated depends on the stack. There are stacks where only certain caches are updated and there are stacks which are completely re-built every week. Check out our Stacks in our [system reports Github site](https://github.com/bitrise-io/bitrise.io/tree/master/system_reports).

## Xcode stacks

We use two types of Xcode stacks; Stable stacks and Edge stacks.

* Xcode Stable stacks are **built once, and are not updated** at all (except with Bitrise CLI related updates, [dependency manager cache updates](/infrastructure/stack-update-and-removal-policy/#about-dependency-manager-cache-updates) and with critical fixes). These stacks are designed so that if a build worked on the stack, the same build should run the same way as long as the stack is available.
* Xcode "Edge" stack is **re-built every week**. It includes the latest-and-greatest versions of the pre-installed tools and the [dependency manager cache updates](/infrastructure/stack-update-and-removal-policy/#about-dependency-manager-cache-updates). The stack uses the same [scripts](https://github.com/bitrise-io/osx-box-bootstrap) we use for creating new Xcode stacks.

### **About dependency manager cache updates**

All of the macOS stacks receive a dependency manager cache update (brew, cocoapods and bitrise CLI) every week. These cache updates do not change the pre-installed tool versions, they **only update the package manager caches** for faster dependency installs.

For more information on what else we use for provisioning the macOS VMs, head over to the weekly cache update `Ansible` playbook on [GitHub](https://github.com/bitrise-io/osx-box-bootstrap/blob/master/weekly-cache-update-playbook.yml).

## Android / Linux (Docker) stacks

The Android / Linux stacks are prepared with `docker`, using multiple separate docker images, built on top of each other. You can find these docker images on [GitHub](https://github.com/bitrise-docker).

* The **Android (Ubuntu 16.04)** stack is a **rolling release stack**, rebuilt automatically from a base Ubuntu image.
* The **Android LTS (Long Term Support) (Ubuntu 14.04)** image is a “frozen” version of a previous rolling release image, and is not updated at all (except with Bitrise CLI related updates and with critical fixes).

## Hybrid (Visual Studio for Mac) stacks

{% include message_box.html type="note" title="Deprecated Xamarin Studio Stacks" content=" Please note that Xamarin Studio stacks have been deprecated and replaced with the new Visual Studio for Mac stack. Make sure you switch to the Visual Studio for Mac one if you've been using the Xamarin Studio one before! "%}

The Visual Studio for Mac stacks are built on top of the latest Stable Xcode stack, so the preinstalled building tools of the base Xcode stack are not updated and are the same as in the base Xcode stack. The Xamarin specific bits are applied on top of the base Xcode image **every week** when generating the Visual Studio for Mac stacks ([using this Ansible playbook](https://github.com/bitrise-io/osx-box-bootstrap/blob/master/xamarin-playbook.yml)).

The [dependency manager cache updates](/infrastructure/stack-update-and-removal-policy/#about-dependency-manager-cache-updates) are applied on these stacks too. Visual Studio for Mac stacks are upgraded to the latest Visual Studio for Mac versions on **every weekend**.

This means that the Visual Studio for Mac stacks are [**hybrid** stacks](/infrastructure/stack-update-and-removal-policy/#hybrid-stacks), built on a Stable base Xcode stack, but applying certain Visual Studio for Mac and Xamarin specific bits and updates every week.

## Deprecating and removing stacks

### Xcode Stacks

We keep the latest patch version of every minor Xcode version as long as that Xcode version is the latest major version.

In addition, we keep the very last minor+patch version of the previous two major Xcode versions

{% include message_box.html type="example" title="Example for maintaining Xcode stacks" content=" When the latest Xcode version was 8.3.3 we kept:

All the latest patch releases for every minor version of Xcode 8:

* 8.3.x (8.3.3)
* 8.2.x (8.2.1)
* 8.1.x (8.1)
* 8.0.x (8.0)

And the latest versions from the previous two Xcode major versions:

* 7.3.1
* 6.4

We will carry this example through our guide to illustrate stack removal and deprecation processes below.

"%}

#### **Deprecating and removing Xcode stacks**

When the first **beta of the next major Xcode version** is released, we **deprecate** all the minor versions of the last major version, except the very last version

{% include message_box.html type="example" title="Example for deprecating Xcode stacks when beta Xcode version is released " content=" When Xcode 9 was released, we deprecated

* all the Xcode 8 stacks except the very last one (8.3.x)
* the oldest major version (Xcode 6.4). "%}

When the first **final (non beta) version** of the new major Xcode version is released, we **remove** the deprecated stacks; the oldest major version as well as the minor versions of the last major version except the latest minor version.

{% include message_box.html type="example" title="Example for removing stacks when final Xcode version is released" content=" For example, when Xcode 9 (final, non beta) was released, we removed:

* the oldest major version (the Xcode 6 (6.4) stack)
* the minor versions of the last major version (Xcode 8.0, 8.1 and 8.2 stacks) except for the latest minor version (Xcode 8.3) "%}

This means that the latest patch release version of Xcode is **supported for about 2.5 years**, in sync with Xcode major version releases.

### Hybrid Stacks

Altogether we have 4 Hybrid stacks:

* The **Hybrid Visual Studio for Mac Stable** and **Hybrid Visual Studio for Mac Beta** Stacks are updated every weekend with the current Visual Studio 4 Mac Stable and Beta releases.
* The **Hybrid stack, with both Android tools and Xcode 8** is affected by a long term support and deprecation policy, so it only gets the latest Bitrise CLI and critical updates.
* The **Previous Hybrid stack with Xamarin and vs4mac** is kept on the previous version of Visual Studio for Mac.

So when a new version of Visual Studio for Mac (vs4mac) comes out:

* the current vs4mac Stable becomes the Previous Hybrid stack with Xamarin and vs4mac and
* the current Previous Hybrid stack with Xamarin and vs4mac gets deprecated.

This means that the **Hybrid Visual Studio for Mac Stable** is **supported for about 1 year**, in sync with the major Xcode version releases.

### Android/Linux Stacks

The **Android/Linux LTS** stack is upgraded when we release the first non LTS stack update with a new Ubuntu LTS version.

{% include message_box.html type="example" title="Example for upgrading the Android/Linux LTS stack" content=" The **Android/Linux LTS** stack was upgraded to the last version built on Ubuntu 16.04 when we released the first non LTS Android/Linux stack update built on Ubuntu 18.04. "%}

This means that an Android/Linux LTS stack is **supported for about 2 years**, roughly in sync with Ubuntu LTS (long term support) releases.