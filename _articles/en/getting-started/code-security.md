---
title: Code security
tag:
- getting-started
- security
description: 'Bitrise uses virtual machines to run your builds. Every build is run in
  a clean VM: we discard the whole machine when the build finishes. We do not store
  your source code. '
redirect_from: []
menu:
  getting-started-main:
    weight: 13

---
To guarantee the security of your builds we use [virtual machines](/infrastructure/virtual-machines) for builds. Every build runs in its own, clean virtual machine and we discard the whole virtual machine after the build finishes, erasing every file your build uses and every change you make during your build.

This is also true for the Linux/Android stacks, which use Docker containers to run the build. The build itself still gets a full virtual machine where no other Docker container is started, only the one used as the environment of the build. In short we only use Docker containers to manage the environment, not for build environment isolation - that's ensured by using full virtual machines for every build.

This way your builds are always protected from changes made by others and from your previous builds, no one else can access your code and you can use a stable environment to define your build workflow. Every build is completed in an isolated environment, unrelated to any previous or parallelly running builds.

## Source code

We don't store your source code. The source code is only accessed on the build machines (virtual machines) the way you define it in your Bitrise Configuration (workflow). If you don't have a **Git Clone** Step in your configuration, then the source code won't be touched at all. At the end of the build the whole virtual machine is destroyed.

## Code signing and other files

The files you upload in the **Code Signing** tab of the Workflow Editor are stored on `Amazon S3` in a way that it's only accessible for the web servers.

The required credentials are not stored in any database, it is only available in the web servers' environment. Build servers can't access the files directly either. When a build starts, the web server generates a read-only, time limited access URL for these files, using [Amazon S3 pre-signed URLs](https://docs.aws.amazon.com/aws-sdk-php/v3/guide/service/s3-presigned-url.html).

## Passwords

Passwords are stored in a hashed, encrypted form. We are encrypting the passwords with [bcrypt algorithm](https://en.wikipedia.org/wiki/Bcrypt), using multiple stretches.

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Now you know everything</div>
	<a target="_blank" href="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta"><button class="button">Go to Bitrise now</button></a>
</div>