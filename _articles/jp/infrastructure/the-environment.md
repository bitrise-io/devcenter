---
# jp title missing
title: The Android/Linux/Docker environment
menu:
  infrastructure:
    weight: 3

---

{% include not_translated_yet.html %}

## Hardware

The current hardware specifications are the following:

* at least 7.5GB RAM
* at least 2 CPU cores
* 64 bit CPU
* at least 10GB free disk space

## Environment

We use standard [Docker](https://quay.io) images, published on [Quay](https://quay.io/organization/bitriseio), and the related `Dockerfile` which you can find on [GitHub](https://github.com/bitrise-docker).

{% include message_box.html type="note" title="What is a Dockerfile?" content=" The `Dockerfile` is the description file which describes the docker image / environment and is directly used to build the image." %}

Right now we have four docker images, built on top of each other:

### Bitrise Base image ([GitHub](https://github.com/bitrise-docker/bitrise-base) / [Quay](https://quay.io/repository/bitriseio/bitrise-base))

* image name ID: `quay.io/bitriseio/bitrise-base`
* includes all the **non-Android tools and environment setup**
* ideal to be used for non-Android projects as a base image, if you want to use it locally too, as this is the smallest image
* `Ruby`, `Go`, `Python`, `git` and the [bitrise command line tools](https://www.bitrise.io/cli) are all preinstalled and ready to use
* OS: `Ubuntu 16.04`, 64 bit
* check out the related `Dockerfile` [where](https://github.com/bitrise-docker/bitrise-base/blob/master/Dockerfile) you can see what's preinstalled in this image

### Base Android image ([GitHub](https://github.com/bitrise-docker/android) / [Quay](https://quay.io/repository/bitriseio/android))

* image name ID: `quay.io/bitriseio/android`
* **extends the Bitrise Base image** with Android specific tools and environments
* multiple Android SDK, build tool and system image versions are preinstalled, as well as `gradle` and `maven`
* you can use the `$ANDROID_HOME` environment variable to point to the location of the pre-installed Android SDK
* check out the related `Dockerfile` [where](https://github.com/bitrise-docker/android/blob/master/Dockerfile) you can see what's preinstalled in this image

### Android NDK image ([GitHub](https://github.com/bitrise-docker/android-ndk) / [Quay](https://quay.io/repository/bitriseio/android-ndk))

* image name ID: `quay.io/bitriseio/android-ndk`
* **built on the Base Android image** and extends it with the latest Android NDK
* you can use the `$ANDROID_NDK_HOME` environment variable to point to the location of the preinstalled Android NDK, and it's also added to `$PATH`
* check out the related `Dockerfile` [where](https://github.com/bitrise-docker/android-ndk/blob/master/Dockerfile) you can see what's preinstalled in this image
* You can find the pre-installed tools & System Report of this Stack [here](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/linux-docker-android.log)

### Android NDK LTS image ([GitHub](https://github.com/bitrise-docker/android-ndk-lts) / [Quay](https://quay.io/repository/bitriseio/android-ndk-lts))

* image name ID: `quay.io/bitriseio/android-ndk-lts`
* it’s always a **tagged version of an older Android NDK image**
* you can use the `$ANDROID_NDK_HOME` environment variable to point to the location of the preinstalled Android NDK, and it’s also added to `$PATH`
* OS: Ubuntu16.04, 64 bit
* you can find the pre-installed tools & System Report of this Stack [here](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/linux-docker-android-lts.log)

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

**What won't work**, however, is if you change the source code directory to be located **outside** of `/bitrise`, or you want to mount a folder with an absolute path outside of `/bitrise`.
