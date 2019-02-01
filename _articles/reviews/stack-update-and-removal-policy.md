---
title: Stack update and removal policy
redirect_from: []
date: 2019-01-31 10:50:13 +0000
published: false

---
Stacks on [bitrise.io](https://www.bitrise.io) are generally updated every weekend, but what’s updated depends on the stack. There are stacks where only certain caches are updated and there are stacks which are completely re-built every week. In this article we give an overview of the Xcode, Android (Linux) and Xamarin stacks and their update process as well as how stacks /removed. lifecycle

## Xcode stacks

We use two types of Xcode stacks: Stable stacks and Edge stacks.

* Xcode Stable stacks are **built once, and are not updated** at all (except with Bitrise CLI related updates, [dependency manager cache updates](/infrastructure/stack-update-and-removal-policy/#about-dependency-manager-cache-updates) and with critical fixes). These stacks are designed so that if a build worked on the stack, the same build should run the same way as long as the stack is available.
* Xcode "Edge" stack is **re-built every week**. It includes the latest-and-greatest versions of the pre-installed tools and the dependency manager cache updates. The stack uses the same [scripts](https://github.com/bitrise-io/osx-box-bootstrap) we use for creating new Xcode stacks.

### **About dependency manager cache updates**

All of the macOS stacks receive a dependency manager cache update (brew, cocoapods and bitrise CLI) every week. These cache updates do not change the pre-installed tool versions, they **only update the package manager caches** for faster dependency installs. 

For more information on everything else we use for provisioning the macOS VMs, head over to the weekly cache update `Ansible` playbook on [GitHub](https://github.com/bitrise-io/osx-box-bootstrap/blob/master/weekly-cache-update-playbook.yml).

## Android / Linux (Docker) stacks

The Android / Linux stacks are prepared with `docker`, using multiple separate docker images, built on top of each other. You can find these docker images on [GitHub](https://github.com/bitrise-docker).

* The **Android (Ubuntu 16.04)** stack is a **rolling release stack**, rebuilt automatically from a base Ubuntu image.
* The **Android LTS (Long Term Support) (Ubuntu 14.04)** image is a “frozen” version of a previous rolling release image, and is not updated at all (except with Bitrise CLI related updates and with critical fixes).

## Xamarin stacks

{% include message_box.html type="note" title="Deprecated Xamarin Studio Stacks" content=" Please note that Xamarin Studio stacks have been deprecated and replaced with the new Visual Studio for Mac stack. Make sure you switch to the Visual Studio for Mac one if you've been using the Xamarin Studio one before! "%}

The Xamarin Stacks are built on top of the latest Stable Xcode stack, so the _preinstalled things of the b_ase Xcode stack are not updated and are the same as in the base Xcode stack. The Xamarin specific bits are applied on top of the base Xcode image **every week** when generating the Xamarin stacks ([using this Ansible playbook](https://github.com/bitrise-io/osx-box-bootstrap/blob/master/xamarin-playbook.yml)).

The [dependency manager cache updates](infrastructure/stack-update-and-removal-policy/#about-dependency-manager-cache-updates) are applied on these stacks too.

In addition to the dependency manager cache updates, Xamarin Stacks are upgraded to the latest Visual Studio for Mac versions on **every weekend**, except the `LTS` (Long Term Support) stacks.

This means that the Xamarin stacks are **hybrid** stacks, built on a Stable base Xcode stack, but applying certain Xamarin specific bits and updates every week.

The **Xamarin Stable LTS (Long Term Support)** stack, similar to the Android LTS stack, is a “frozen” version of a previous Xamarin Stable stack version, and is **not updated** at all (except with Bitrise CLI related updates and with critical fixes).

## Stack Deprecation / removal policy

### Xcode

* We keep the latest patch version of every minor Xcode version as long as that Xcode version is the latest major version.
* In addition, we keep the very last minor+patch version of the previous two major Xcode versions

{% include message_box.html type="example" title="Example for" content=" When the latest Xcode version was 8.3.3 we kept:

All the latest patch releases for every minor version of Xcode 8:

* 8.3.x (8.3.3)
* 8.2.x (8.2.1)
* 8.1.x (8.1)
* 8.0.x (8.0)

And the latest versions from the previous two Xcode major versions:

* 7.3.1
* 6.4
  "%}

**Removal schedule**: **when the first beta of the next major Xcode version is released**, we **deprecate** all the minor versions of the last major version, except the very last version (continuing the above example, when the first beta of Xcode 9 was released we deprecated all the Xcode 8 stacks except the very last one, 8.3.x) as well as the oldest major version (Xcode 6.4 in the example above).

**Once the first final (non beta) version of the new major Xcode version is released,** we remove the deprecated stacks, the oldest major version (from the above example, when Xcode 9 (final, non beta) was released we removed the Xcode 6 (6.4) stack) as well as the minor versions of the last major version except the latest minor version (in the example above the Xcode 8.0, 8.1 and 8.2 stacks; keeping the Xcode 8.3 one).

This means that the latest patch release version of Xcode is **supported for about 2.5 years**, in sync with Xcode major version releases.

### Xamarin

Most of the Xamarin stacks are upgraded every weekend, so the only stack which is affected by a long term support and deprecation policy is the **Xamarin Stable LTS (long term support)** stack.

We upgrade the Xamarin Stable LTS stack when we roll out the first Xamarin updates built on a new Xcode major version.

What we do actually is that we keep the last Xamarin Stable (non LTS) stack built on the previous / last Xcode major version.

{% include message_box.html type="example" title="My message" content="
**Example:** when the first **Xamarin Stable** (non LTS) stack (built on Xcode 9) was released, we upgraded the **Xamarin Stable LTS** stack to the one built on the latest Xcode 8 version.
"%}

This means that the Xamarin Stable LTS stack is **supported for about 1 year**, in sync with Xcode major version releases.

### Android/Linux

The **Android/Linux LTS** stack is upgraded when we release the first non LTS stack update with a new Ubuntu LTS version.

{% include message_box.html type="example" title="My message" content="
The **Android/Linux LTS** stack was upgraded to the last version built on Ubuntu 16.04 when we released the first non LTS Android/Linux stack update built on Ubuntu 18.04
"%}

This means that an Android/Linux LTS stack is **supported for about 2 years**, roughly in sync with Ubuntu LTS (long term support) releases.