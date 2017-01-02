!!! note "Have a question or suggestion? Join the discussion!"
    You can find this guide's discussion topic at:
    [discuss.bitrise.io/t/69](http://discuss.bitrise.io/t/how-to-use-your-own-docker-image-for-your-builds/69)

There are two ways to use `docker` on [bitrise.io](https://www.bitrise.io):

1. Run `docker` commands yourself, e.g. with a `Script` step
1. Use a Linux/Android stack and set the environment docker image for the app (`Settings` tab)

__The first option is strongly preferred, you should not change the base environment docker image (on the `Settings` tab on bitrise.io)
unless you really have to!__ Running the `docker` commands yourself during the build is way more flexible,
and provides an overall better control.


## Run docker commands during the build

__This is the preferred way of using docker__, both locally and on [bitrise.io](https://www.bitrise.io).

All you have to do is:

1. Add a `Script` step to your workflow
1. And in the `Script` step run the `docker` (or `docker-compose`, etc.) command you want to
1. Additionally, if you want to run the build on [bitrise.io](https://www.bitrise.io), make sure that you select
   a Linux/Android stack for the app; those stacks have `docker` preinstalled and ready to use our of the box.


_You can find a sample repository on GitHub,
which is configure to run on your Mac/Linux using the [Bitrise CLI](https://www.bitrise.io/cli):
[https://github.com/bitrise-samples/minimal-docker](https://github.com/bitrise-samples/minimal-docker)_


### Running docker hello-world

Following the official "getting started" guide for example, to run the "hello world" docker image
your bitrise build configuration yml can be as simple as:

```
---
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
trigger_map:
- push_branch: "*"
  workflow: primary
- pull_request_source_branch: "*"
  workflow: primary
workflows:
  primary:
    steps:
    - activate-ssh-key@3.1.1:
        run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
    - git-clone@3.4.1: {}
    - script@1.1.3:
        title: docker run hello-world
        inputs:
        - content: |-
            #!/bin/bash
            # fail if any commands fails
            set -e
            # debug log
            set -x

            docker run hello-world
```


### Build and run a Dockerfile

A bit more complex example, using your own `Dockerfile` in your repository to define the docker environment:

```
---
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
trigger_map:
- push_branch: "*"
  workflow: primary
- pull_request_source_branch: "*"
  workflow: primary
workflows:
  primary:
    steps:
    - activate-ssh-key@3.1.1:
        run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
    - git-clone@3.4.1: {}
    - script@1.1.3:
        title: docker run
        inputs:
        - content: |-
            #!/bin/bash
            # fail if any commands fails
            set -e
            # debug log
            set -x

            docker build -t bitrise-minimal-sample .
            docker run --rm bitrise-minimal-sample
```

This workflow will:

1. Git Clone your repository
1. And then run `docker build -t bitrise-minimal-sample .` and `docker run --rm bitrise-minimal-sample` in the repository's root.

If you have a `Dockerfile` like this in the root of the repository:

```
FROM alpine:3.3

CMD cat /etc/alpine-release
```

The output will be something like:

```
+------------------------------------------------------------------------------+
| (2) docker run hello-world                                                   |
+------------------------------------------------------------------------------+
| id: script                                                                   |
| version: 1.1.3                                                               |
| collection: https://github.com/bitrise-io/bitrise-steplib.git                |
| toolkit: bash                                                                |
| time: 2016-11-21T14:28:23Z                                                   |
+------------------------------------------------------------------------------+
|                                                                              |
+ docker build -t bitrise-minimal-sample .
Sending build context to Docker daemon 69.12 kB

Step 1 : FROM alpine:3.3
3.3: Pulling from library/alpine
985c5f84712b: Pulling fs layer
985c5f84712b: Verifying Checksum
985c5f84712b: Download complete
985c5f84712b: Pull complete
Digest: sha256:ec40755933414575748cecf929f1f2012cace2d2e0f8147e77e652d600ff17d7
Status: Downloaded newer image for alpine:3.3
 ---> 6c2aa2137d97
Step 2 : CMD cat /etc/alpine-release
 ---> Running in 507cfb961cc7
 ---> 02a0da3ac697
Removing intermediate container 507cfb961cc7
Successfully built 02a0da3ac697
+ docker run --rm bitrise-minimal-sample
3.3.3
|                                                                              |
+---+---------------------------------------------------------------+----------+
| ✓ | docker run hello-world                                        | 4.24 sec |
+---+---------------------------------------------------------------+----------+
```

_You can find a sample repository on GitHub,
which is configure to run on your Mac/Linux using the [Bitrise CLI](https://www.bitrise.io/cli):
[https://github.com/bitrise-samples/minimal-docker](https://github.com/bitrise-samples/minimal-docker)_

### Using docker-compose

The previous example could be even shorter using [docker-compose](https://docs.docker.com/compose/).

For example, if you have a `docker-compose.yml` like this in your repository root (where the `Dockerfile` is):

```
version: '2'
services:
  sample-app:
    build: .
```

You can replace the

```
docker build -t bitrise-minimal-sample .
docker run --rm bitrise-minimal-sample
```

lines with a single `docker-compose` call:

```
docker-compose run --rm sample-app
```

Docker compose will build and run the image automatically, you don't have to specify a `-t` tag - the `services`
name will be used by `docker-compose` to tag the image automatically.

_You can find a sample repository on GitHub,
which is configure to run on your Mac/Linux using the [Bitrise CLI](https://www.bitrise.io/cli):
[https://github.com/bitrise-samples/minimal-docker](https://github.com/bitrise-samples/minimal-docker)_

## Using bitrise.io custom docker image option

> Use a Linux/Android stack and set the environment docker image for the app (`Settings` tab)

!!! warning "Custom Android docker image"
    Creating and maintaining your own Android Docker image can be quite time consuming!
    __If what you need is just to install a couple of additional tools, you should do that with e.g. a Script step instead!__
    For more information see the [Install Any Additional Tool](/tips-and-tricks/install-additional-tools/) guide.
    _You should only use your own Android docker image if you really have to!_

If you want to run your build in a custom docker environment,
__you should base your own docker image on one of our base Docker images__, as those have every base tool pre-installed,
the standard bitrise directories created, the Environments (like `$BITRISE_DEPLOY_DIR`) set,
and are pre-cached on the build virtual machines.
**If you decide to create your own Docker image please read this guide, from start to finish!**


**Feel free to send Pull Request for our images if you think we missed something, which would be useful for everyone who uses our images!**

The bare-minimum base image can be found at:

* Docker Hub: [https://hub.docker.com/r/bitriseio/docker-bitrise-base/](https://hub.docker.com/r/bitriseio/docker-bitrise-base/)
* GitHub: [https://github.com/bitrise-docker/bitrise-base](https://github.com/bitrise-docker/bitrise-base)

Android base image, built on the bare-minimum base image, adding Android specific tools and Envs:

* Docker Hub: [https://hub.docker.com/r/bitriseio/docker-android/](https://hub.docker.com/r/bitriseio/docker-android/)
* GitHub: [https://github.com/bitrise-docker/android](https://github.com/bitrise-docker/android)

Android NDK image, built on the Android base image, adding a pre-installed Android NDK and Envs:

* Docker Hub: [https://hub.docker.com/r/bitriseio/android-ndk/](https://hub.docker.com/r/bitriseio/android-ndk/)
* GitHub: [https://github.com/bitrise-docker/android-ndk](https://github.com/bitrise-docker/android-ndk)

As you can see, if you want to base your own image on one of our available images you can do that by specifying
it at the very top of your `Dockerfile` with a `FROM bitriseio/IMAGE-ID:latest`,
for example: `FROM bitriseio/docker-bitrise-base:latest`

!!! warning "Don't use the `-alpha` images for your builds"
    For every docker image we have on Docker Hub we have a `-alpha` post fixed version too.
    the `-alpha` ones are rebuilt frequently and are __not precached on [bitrise.io](https://www.bitrise.io)__,
    so you should avoid those. The only purpose of the `-alpha` images is to provide
    ready to use test environments for us, before we would publish a non `-alpha` version.

**Important**: you have to use the **Docker Hub ID** of the image you want to use as
the base image (ex: `bitriseio/docker-android`, `bitriseio/android-ndk` or `bitriseio/docker-bitrise-base`).

You can find an example project which extends our Android image by
installing additional SDKs at: [https://github.com/viktorbenei/docker-bitrise-android-ext](https://github.com/viktorbenei/docker-bitrise-android-ext)


### Create the Docker Image, to be able to use it on bitrise.io

You can create it any way you want to and push it into any Docker registry.
The only requirement is that it have to be a **public** image, private images are not (yet) supported.

We'll show a quick example with GitHub and Docker Hub, using Docker Hub's
automatic builds (it'll automatically create a new Docker image for you every time you change your Dockerfile on GitHub).

What you need for this guide:

* [GitHub account](https://github.com)
* [Docker Hub account](https://hub.docker.com)

First, you have to create a new repository on GitHub, and add at least a `Dockerfile`, with a `FROM bitriseio/IMAGE-ID:latest`
statement at the top of the `Dockerfile`, like the one you can see at:
[https://github.com/viktorbenei/docker-bitrise-android-ext/blob/master/Dockerfile#L1](https://github.com/viktorbenei/docker-bitrise-android-ext/blob/master/Dockerfile#L1)
(_don't forget to commit & push it!_).

!!! note "Which image to use?"
    1. If you don't need the Android tools you should base your image on
       the __bitrise-base__ (`bitriseio/docker-bitrise-base`) image
       and install just the things you need.
    1. If you need the Android tools then you should use
       the __android__ (`bitriseio/docker-android`) image
       or the __bitrise-base__ (`bitriseio/docker-bitrise-base`) image.
    1. You should only use the __android-ndk__ (`bitriseio/android-ndk`) image
       as the base image if you actually need the NDK.

    From a performance perspective: you should install the least amount of tools in your image,
    as it'll make your image smaller, which means faster download & build start.

You now have the description of your image. Go to [Docker Hub](https://hub.docker.com), click `Create` in the top menu and select `Create Automated Build`.
If you haven't linked your GitHub account to your Docker Hub account you'll have to do it now.
Once the link between GitHub and Docker Hub is established you'll see a list of your GitHub repositories.
Select the repository you just created (the one with the `Dockerfile` in its root), and follow the guide.

Congratulation! You now have a fully automatic Docker image creation, based on your GitHub repository!
This means that every time you change the repository, commit & push the change Docker Hub will pick up the new `Dockerfile` and will build a Docker image for you.

**One more thing you should do is to Link your image to our base image you use, so that every time our base image is updated your image will update as well.**

*This is especially important if you base your Docker image on one of our Android images.
Those images are quite large, and if we have to do a change in the base Docker image and you don't build a new image,
**your image will require the old base image, which won't be pre-cached** on the build Virtual Machines anymore!
This means that to `docker pull` your image it won't be enough to download just the diffs anymore,
**the whole image will have to be pulled** which might even result in errors like "no space left on the device" -
to `docker pull` the base Android image, if no cache is available, it already requires ~10GB disk space, and the Android NDK image is even larger!*

**Link your image to one of ours**: you can do this on DockerHub, on the `Build Settings` tab,
under the `Repository Links` section. Just specify the ID of our Docker image (ex: `bitriseio/docker-android`),
save the link and the next time the specified image is updated your image will be re-built as well (using the `Dockerfile` in **your** repository).


### Use your own (public) Docker image for your builds

Once you have your own Docker image and you verified that it can be `docker pull`-ed,
you can set its ID on the `Settings` tab of your app on [bitrise.io](https://www.bitrise.io),
in the `Stack Selector` section.

You just have to copy paste the ID of your image (e.g. `bitriseio/docker-bitrise-base`)
into the `Docker image to use` field and click the `Save` button.
Your next build will use the image you specified.

!!! note "Have a question or suggestion? Join the discussion!"
    You can find this guide's discussion topic at:
    [discuss.bitrise.io/t/69](http://discuss.bitrise.io/t/how-to-use-your-own-docker-image-for-your-builds/69)
