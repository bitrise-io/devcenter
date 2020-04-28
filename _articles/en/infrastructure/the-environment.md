---
changelog:
last_modified_at: 2020-04-27
title: The Android/Linux/Docker environment
tag:
- android
- linux
- docker
- infrastructure
description: We use standard Docker images, published on Quay, and the related Dockerfile
  which you can find on GitHub. Right now we have four docker images, built on top
  of each other.
redirect_from: []
menu:
  infrastructure-main:
    weight: 7

---
## Environment

We use standard [Docker](https://quay.io) images, published on [Quay](https://quay.io/organization/bitriseio), and the related `Dockerfile` which you can find on GitHub (see below).

{% include message_box.html type="note" title="What is a Dockerfile?" content=" A `Dockerfile` is a file where you describe the docker image / environment and is directly used to build a Docker image." %}

Right now we have four docker images, built on top of each other:

### Bitrise Base image ([GitHub](https://github.com/bitrise-docker/bitrise-base) / [Quay](https://quay.io/repository/bitriseio/bitrise-base))

* Image name ID: `quay.io/bitriseio/bitrise-base`.
* Includes all the non-Android tools and environment setup.
* Ideal to be used for non-Android projects as a base image, if you want to use it locally too, as this is the smallest image.
* `Ruby`, `Go`, `Python`, `git` and the [bitrise command line tools](https://www.bitrise.io/cli) are all preinstalled and ready to use.
* OS: `Ubuntu 16.04`, 64 bit.
* Check out the related `Dockerfile` [where](https://github.com/bitrise-docker/bitrise-base/blob/master/Dockerfile) you can see what's preinstalled in this image.

### Base Android image ([GitHub](https://github.com/bitrise-docker/android) / [Quay](https://quay.io/repository/bitriseio/android))

* Image name ID: `quay.io/bitriseio/android`.
* Extends the Bitrise Base image with Android-specific tools and environments.
* Multiple Android SDK, build tool and system image versions are preinstalled, as well as `gradle` and `maven`.
* You can use the `$ANDROID_HOME` environment variable to point to the location of the pre-installed Android SDK.
* Check out the related `Dockerfile` [where](https://github.com/bitrise-docker/android/blob/master/Dockerfile) you can see what's preinstalled in this image.

### Android NDK image ([GitHub](https://github.com/bitrise-docker/android-ndk) / [Quay](https://quay.io/repository/bitriseio/android-ndk))

* Image name ID: `quay.io/bitriseio/android-ndk`.
* Built on the Base Android image and extends it with the latest Android NDK.
* You can use the `$ANDROID_NDK_HOME` environment variable to point to the location of the preinstalled Android NDK, and it's also added to `$PATH`.
* Check out the related `Dockerfile` [where](https://github.com/bitrise-docker/android-ndk/blob/master/Dockerfile) you can see what's preinstalled in this image.
* You can find the pre-installed tools & System Report of this Stack [here](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/linux-docker-android.log).

### Android NDK LTS image ([GitHub](https://github.com/bitrise-docker/android-ndk-lts) / [Quay](https://quay.io/repository/bitriseio/android-ndk-lts))

* Image name ID: `quay.io/bitriseio/android-ndk-lts`.
* It’s always a tagged version of an older Android NDK image.
* You can use the `$ANDROID_NDK_HOME` environment variable to point to the location of the preinstalled Android NDK, and it’s also added to `$PATH`.
* OS: Ubuntu16.04, 64 bit.
* You can find the pre-installed tools & System Report of this Stack [here](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/linux-docker-android-lts.log).

## Docker & Virtual Machines

**Every build runs in a new VM,** not just in a new container. The VM is destroyed right after the build. This allows us to grant you full control over `Docker` and the whole environment.

When your build starts on the Docker based Stack, we volume mount the `/var/run/docker.sock` socket into your container (similar to calling `docker run -v /var/run/docker.sock:/var/run/docker.sock ...`. You can find a description about this access granting method [here](https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/)).

{% include message_box.html type="note" title="Docker binary installation" content=" The `docker` binary has to be installed inside the base Docker image because docker started to migrate from a single-binary solution to dynamically loaded components, and simply sharing the `docker` binary is not sufficient anymore.

We install Docker in every one of our Docker images so that you don't have to do anything if you use our image, or you base your own image on our Docker images."%}

This means that you have access to `docker` in your container, and can use other tools which use docker, like [docker-compose](https://docs.docker.com/compose). You can, for example, configure and run tests and other automations on website projects using `docker-compose`.

You can call `docker info`, `docker build`, `docker run`, `docker login`, `docker push` exactly how you would on your own machine.

### Shared volumes

{% include message_box.html type="warning" title="How to run `docker` in your build and share volumes" content="If you want to run `docker` in your build and share volumes, please note that only those volumes can be shared that are shared with the base docker container (the one your build is running in). This is due to how `docker` handles volume sharing. Everything under `/bitrise` can be mounted as a volume, but no other path is guaranteed to work with `--volume` mapping. "%}

It means that if you use the standard paths and you use relative paths to mount volumes, it'll work as expected, as the default source code directory is located inside `/bitrise` (by default it's `/bitrise/src` in our Docker images).

What WON'T WORK, however, is if you change the source code directory to be located outside of `/bitrise`, or you want to mount a folder with an absolute path outside of `/bitrise`.