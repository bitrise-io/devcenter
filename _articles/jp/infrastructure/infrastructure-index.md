---
changelog: 
last_modified_at: 
tag: []
title: Infrastructure
redirect_from: []
description: ''
menu:
  main:
    identifier: infrastructure-main
    weight: 6

---
{% include not_translated_yet.html %}

Bitrise is a platform, above all: you do not have to download anything to use it, you do not have to run it on your own computer or servers - we take care of all of that.

That also means you do not have to worry about infrastructure, either: maintenance, tools, virtualization are all our jobs and our concerns.

## Virtual machines

On Bitrise, we use virtual machines (VM) to run your builds: every build runs in a new VM, and each VM is discarded immediately when the build is finished.

**Details:**

* [Virtual machines](/jp/infrastructure/virtual-machines/)

## Available stacks

A stack is the type of virtual machine we'll use to run your build. For example, for a native iOS app, the best stack is one of our Xcode stacks. Stacks come with all the necessary tools pre-installed, and they are regularly updated to make sure they serve all your needs.

**Details:**

* [Available stacks](/jp/infrastructure/available-stacks/)
* [Stack update and removal policy](/jp/infrastructure/stack-update-and-removal-policy/)
* [The Android/Linux/Docker environment](/jp/infrastructure/the-environment/)