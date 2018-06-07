## Hardware

We're still experimenting with new VM providers and VM configurations, but in general, what you can expect:

* at least 7.5GB RAM
* at least 2 CPU cores
* 64 bit CPU
* at least 10GB free disk space

## Environment

We use standard [Docker](http://www.docker.com) images, published on [Docker Hub](https://hub.docker.com),
and the related `Dockerfile` (the description file which describes the docker image / environment,
and which is directly used to build the image) can be found on [GitHub](https://github.com/bitrise-docker).

Right now we have three docker images, built on top of each other:

1. __Bitrise Base__ image ( [GitHub](https://github.com/bitrise-docker/bitrise-base) / [Docker Hub](https://hub.docker.com/r/bitriseio/docker-bitrise-base/) )
    * includes all the non-Android tools and environment setup
    * ideal to be used for non-Android projects as a base image, if you want to use it locally too, as this is
      the smallest image
    * `Ruby`, `Go`, `Python`, `git` and the [bitrise command line tools](https://www.bitrise.io/cli) are all preinstalled and ready to use.
    * OS: `Ubuntu 16.04`, 64 bit
    * Related `Dockerfile` where you can see what's preinstalled in this image:
      [https://github.com/bitrise-docker/bitrise-base/blob/master/Dockerfile](https://github.com/bitrise-docker/bitrise-base/blob/master/Dockerfile)
2. __Base Android__ image (  [GitHub](https://github.com/bitrise-docker/android) / [Docker Hub](https://hub.docker.com/r/bitriseio/docker-android/) )
    * __extends the Bitrise Base image__ with Android specific tools and environments.
    * Multiple Android SDK, Build Tool and system image versions are preinstalled, as well as `gradle` and `maven`.
    * You can use the `$ANDROID_HOME` environment variable to point to the location of the pre-installed Android SDK
    * Related `Dockerfile` where you can see what's preinstalled in this image:
      [https://github.com/bitrise-docker/android/blob/master/Dockerfile](https://github.com/bitrise-docker/android/blob/master/Dockerfile)
3. __Android NDK__ image (  [GitHub](https://github.com/bitrise-docker/android-ndk) / [Docker Hub](https://hub.docker.com/r/bitriseio/android-ndk/) )
    * __built on the Base Android image__, extends it with the latest Android NDK.
    * You can use the `$ANDROID_NDK_HOME` environment variable to point to the location of the preinstalled Android NDK, and it's also added to `$PATH`
    * Related `Dockerfile` where you can see what's preinstalled in this image:
      [https://github.com/bitrise-docker/android-ndk/blob/master/Dockerfile](https://github.com/bitrise-docker/android-ndk/blob/master/Dockerfile)

**You can find the pre-installed tools & System Report** of this Stack at:
[https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/linux-docker-android.log](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/linux-docker-android.log)


## Docker & Virtual Machines

__Every build runs in a new VM__ (which is destroyed right after the build),
not just in a new container! This allows us to grant you full control over `Docker`
and the whole environment.

When your build starts on the Docker based Stack we volume mount the `/var/run/docker.sock` socket
into your container (similar to calling `docker run -v /var/run/docker.sock:/var/run/docker.sock ...`;
you can find a description about this access granting method at:
[https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/](https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/)).
_Note: The `docker` binary have to be installed inside the base Docker image
(we install Docker in every one of our Docker images so that you don't have to do anything if you use our image,
or you base your own image on our Docker images),
because docker started to migrate from a single-binary solution to dynamically loaded components,
and simply sharing the `docker` binary is not sufficient anymore._

This means that you have access to `docker` in your container, and can use other tools which use docker,
like [docker-compose](https://docs.docker.com/compose).
You can, for example, configure and run tests and other automations on website projects using `docker-compose`.

You can call `docker info`, `docker build`, `docker run`, `docker login`, `docker push`,
etc. exactly how you would on your own machine.


### Shared volumes

!!! warning
    __Important Note if you want to run `docker` in your build, and share volumes__: because of how `docker` handles volume sharing,
    only those volumes can be shared which are shared with the base docker container (the one your build is running in).
    Everything under `/bitrise` can be mounted as a volume, but no other path is guaranteed to work with `--volume` mapping.

__Practically this means__ that if you use the standard paths and you use relative paths to mount volumes it'll work as expected,
as the default source code directory is located inside `/bitrise` (by default it's `/bitrise/src` in our Docker images).
__What won't work__ is if you change the source code directory to be located __outside__ of `/bitrise`,
or you want to mount a folder with an absolute path outside of `/bitrise`.
