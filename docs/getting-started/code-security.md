To guarantee the security of your builds we use [virtual machines](/infrastructure/virtual-machines) for builds. Every build runs in its own, clean virtual machine and we discard the whole virtual machine after the build finishes, erasing every file your build uses and every change you make during your build.

This way your builds are always protected by changes made by others and from your previous builds, no one else can access your code and you can use a stable environment to define your build workflow (no state persists between builds).

## Source code
We don't store your source code. The source code is only accessed on the build machines (virtual machines) the way you define it in your Bitrise Configuration (workflow). If you don't have a Git Clone step in your configuration, then the source code won't be touched at all. At the end of the build the whole Virtual Machine is destroyed.

## Code signing and other files
The files you upload in the Workflow Editor (**Code Signing & Files** section of the editor) are stored on `Amazon S3` in a way that it's only accessible for the web servers.

The required credentials are not stored in any database, it is only available in the web servers' environment. Build servers can't access the files directly either. When a build starts the web server generates a read-only, time limited access URL for these files, using [Amazon S3 presigned URLs](https://docs.aws.amazon.com/aws-sdk-php/v3/guide/service/s3-presigned-url.html).

## Passwords
Passwords are stored in a hashed, encrypted form. We are encrypting the passwords with [bcrypt algorithm](https://en.wikipedia.org/wiki/Bcrypt), using multiple stretches.
