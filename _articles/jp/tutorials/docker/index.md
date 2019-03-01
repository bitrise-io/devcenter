---
# jp title missing
title: Docker support on bitrise.io
menu:
  docker:
    weight: 1

---

{% include not_translated_yet.html %}

[Docker](https://www.docker.com/) is an ideal tool to create, use and share custom environments, as well as to provide a lightweight way to do builds in ephemeral environments (where the environment is destroyed after the build, and a new one is created as the next build starts).

Unfortunately, Docker can only be used to run Linux guest systems right now. Since Windows Server 2016, it’s possible to run Windows docker containers (guest system) but only from Windows Server 2016 and on Windows 10 with Anniversary Update.

Docker can be installed on Linux, macOS and Windows, but the environment (container) it runs can only be Linux (and Windows, on Windows Server 2016 and on Windows 10 with Anniversary Update). Linux containers (guest) can run on all platforms where you can install `docker` (Linux, Windows, macOS, …).

This is why our Android/Linux environment is provided as a docker image, but not our macOS Stacks.

## Linux/Android stacks

Our Linux/Android stacks have full `docker` support. This means that you can run any `docker` command during the build. When a build runs on a Linux/Android stack, the build actually runs inside a docker container. For security, however, every Linux/Android build gets its own Virtual Machine too, in which the build runs in a docker container.

## Setting custom docker images

You can [set a custom docker image](/tutorials/docker/use-your-own-docker-image/) for your builds if you select the Linux/Android stack on the `Stack` tab of your app's Workflow Editor. In most cases, however, you should not change this image! Instead, you should run `docker` commands during the build using our a `Script` step.
