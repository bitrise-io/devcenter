---
# jp title missing
title: Use your own Docker image
menu:
  docker:
    weight: 3

---

{% include not_translated_yet.html %}

{% include message_box.html type="note" title="Have a question or suggestion?" content=" Join the discussion on [How to use your own Docker image for your builds](http://discuss.bitrise.io/t/how-to-use-your-own-docker-image-for-your-builds/69). "%}

There are two ways to use `docker` on [bitrise.io](https://www.bitrise.io/):

1. Run `docker` commands yourself, for example, with a `Script` step.
2. Use a Linux/Android stack and set the environment docker image for the app on the `Stack` tab of the Workflow Editor.

Running `docker` commands with a `Script` Step is the **recommended option** as you should **not change the base environment docker image** on the `Stack` tab unless you really have to! Running the `docker` commands yourself during the build is way more flexible and provides an overall higher level of control.

{% include message_box.html type="note" title="GitHub sample repository" content=" You can find a sample repository on [GitHub](https://github.com/bitrise-samples/minimal-docker), which is configured to run on your Mac/Linux using the [Bitrise CLI](https://www.bitrise.io/cli). "%}

## Running docker commands with the Script step during the build

**This is the recommended way of using docker** both locally and on [bitrise.io](https://www.bitrise.io/).

You have to:

1. Add a `Script` step to your workflow.
2. Add the `docker` (or any other docker command such as `docker-compose`) you want to run.
3. If you want to run the build on [bitrise.io](https://www.bitrise.io/), make sure that you select a Linux/Android stack for the app; those stacks have `docker` preinstalled and are ready to use out of the box.

We provide three examples on how to run Docker commands using our `Script` Step:

* [Running docker hello-world](/tutorials/docker/use-your-own-docker-image/#running-docker-hello-world)
* [Building and running a Dockerfile](/tutorials/docker/use-your-own-docker-image/#build-and-run-a-dockerfile)
* [Using docker-compose](/tutorials/docker/use-your-own-docker-image/#using-docker-compose)

### Running docker hello-world

In this example, we're following the official “getting started” guide to run the “hello world” docker image. Your Bitrise build configuration yml can be as simple as:

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
            run_if: ''
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

### Building and running a Dockerfile

Here is a bit more complex example for using your own `Dockerfile` in your repository to define the docker environment:

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
            run_if: ''
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

This workflow will:

1. Git Clone your repository.
2. Run `docker build -t bitrise-minimal-sample .` and `docker run --rm bitrise-minimal-sample` in the repository’s root.

If you have a `Dockerfile` like this in the root of the repository:

    FROM alpine:3.3
    
    CMD cat /etc/alpine-release

The output will be something like:

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

### Using docker-compose

The previous example could be even shorter using [docker-compose](https://docs.docker.com/compose/).

For example, if you have a `docker-compose.yml` like this in your repository root (where the `Dockerfile` is):

    version: '2'
    services:
      sample-app:
        build: .

you can replace the

    docker build -t bitrise-minimal-sample .
    docker run --rm bitrise-minimal-sample

lines with a single `docker-compose` call:

    docker-compose run --rm sample-app

Docker compose will build and run the image automatically, you don’t have to specify a `-t` tag since the `services` name will be used by `docker-compose` to tag the image automatically.

## Using bitrise.io custom docker image option

Use a Linux/Android stack and set the environment docker image for the app (on the `Stack` tab)

{% include message_box.html type="important" title="Custom Android docker image" content=" Creating and maintaining your own Android Docker image can be quite time consuming! **If you only need to install a couple of additional tools, you should do** that, for example, with a **Script Step** instead! For more information, see our [Install Any Additional Tool](https://devcenter.bitrise.io/tips-and-tricks/install-additional-tools/) guide. You should only use your own Android docker image if you really have to! "%}

If you want to run your build in a custom docker environment, **you should base your own docker image on one of our base Docker images**. Our base Docker images have every base tool pre-installed, the standard bitrise directories created, the environments (like `$BITRISE_DEPLOY_DIR`) set, and are pre-cached on the build virtual machines. **If you decide to create your own Docker image please read this guide, from start to finish!**

**Feel free to send Pull Request for our images if you think we missed something, this would be useful for everyone who uses our images!**

The bare-minimum Bitrise base image can be found at [quay.io](https://quay.io/repository/bitriseio/bitrise-base) and at [Github](https://github.com/bitrise-docker/bitrise-base):

* Android base image, built on the bare-minimum base image with Android-specific tools and envs can be found at [quay.io](https://quay.io/repository/bitriseio/android) and at [Github](https://github.com/bitrise-docker/android):
* Android NDK image, built on the Android base image with pre-installed Android NDK and envs, can be found at [quay.io](https://quay.io/repository/bitriseio/android-ndk) and at [Github](https://github.com/bitrise-docker/android-ndk):
* Android NDK LTS, can be found at [quay.io ](https://quay.io/repository/bitriseio/android-ndk-lts)and at [Github](https://github.com/bitrise-docker/android-ndk-lts):

To base your own image on one of our available images:

1. Specify your base image at the very top of your `Dockerfile` with a `FROM quay.io/bitriseio/IMAGE-ID:latest`.

   As an example: `FROM quay.io/bitriseio/docker-bitrise-base:latest`

{% include message_box.html type="important" title="Don’t use the `alpha` images for your builds" content=" For every docker image we have on [quay.io](https://quay.io/), we have an `alpha` tagged version too. The `alpha` ones are frequently rebuilt and are **not precached on** [**bitrise.io**](https://www.bitrise.io/), so you should avoid those. The only purpose of the `alpha` images is to provide ready to use test environments for us, before we would publish a non-alpha version. "%}

{% include message_box.html type="note" title="Quay.io ID" content=" You have to use the **quay.io ID** of the image you want to use as the base image. For example, `quay.io/bitriseio/android`, `quay.io/bitriseio/android-ndk`, `quay.io/bitriseio/android-ndk-lts`, or `quay.io/bitriseio/bitrise-base`. "%}

### Use your own (public) Docker image for your builds [⚓](https://devcenter.bitrise.io/tutorials/docker/use-your-own-docker-image/#use-your-own-public-docker-image-for-your-builds)

If you have your own Docker image and you checked if it can be `docker pull`-ed, you can set its ID this way:

1. Go to your Workflow Editor.
2. Click the `Stack` tab.
3. Copy and paste the ID of your app (for example, `quay.io/bitriseio/bitrise-base`)

   ![](/img/docker-image-to-use.png)
4. Click Save in the upper-right corner.

Now you should be able to use your own image to run your builds on [bitrise.io](https://www.bitrise.io).
