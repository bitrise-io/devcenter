---
last_modified_at: 
tag: []
title: Infrastructure
redirect_from: []
description: ''
menu:
  main:
    identifier: infrastructure-main
    weight: 5

---
Bitrise is a platform, above all: you do not have to download anything to use it, you do not have to run it on your own computer or servers - we take care of all of that.

That also means you do not have to worry about infrastructure, either: maintenance, tools, virtualization are all our job and our concern.

## Virtual machines

On Bitrise, we use virtual machines (VM) to run your builds: every build runs in a new VM, and each VM is discarded immediately after the build has finished.

**Details:**

* [Virtual machines](/infrastructure/virtual-machines/)

## Available stacks

A stack is the type of virtual machine we can use to run your build. For example, for a native iOS app, the best stack is one of our Xcode stacks. Stacks come with all of the necessary tools pre-installed, and are regularly updated to make sure they will serve all of your needs.

**Details:**

* [Available stacks](/infrastructure/available-stacks/)
* [Stack update and removal policy](/infrastructure/stack-update-and-removal-policy/)
* [The Android/Linux/Docker environment](/infrastructure/the-environment/)