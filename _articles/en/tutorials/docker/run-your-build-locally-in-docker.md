---
title: How to run your build locally in Docker
redirect_from:
- "/docker/run-your-build-locally-in-docker/"
menu:
  docker:
    weight: 2

---
To be able to run your Linux stack builds locally, you'll need [docker](https://www.docker.com/):

* For Linux just follow the [official install instructions](https://docs.docker.com/engine/installation/linux/).
* For Mac you can use [Docker for Mac](https://www.docker.com/products/docker#/mac), which is the easiest way to get started.

In this guide we'll use [this Bitrise Android sample project](https://github.com/bitrise-samples/sample-apps-android-sdk22).

{% include message_box.html type="warning" title="Large images ahead" content=" The official Bitrise Docker images are quite large because they include a wide variety of preinstalled tools. You'll need at **least** 20-25 GB free disk space! "%}

If you're not familiar with the [Bitrise CLI](https://www.bitrise.io/cli) you should try that first. You don't have to master the CLI, if you know what `bitrise run WORKFLOW` does, that should be enough for this tutorial.

## Downloading Docker images from quay.io

1. Install [docker](https://www.docker.com/).
2. Make sure you have your `bitrise.yml` in your repository.

   You don't have to commit it, but the file must exist in your repository's root directory.
3. `cd` into your repository's directory on your Mac/Linux.
4. Pull the image from its registry:

       docker pull quay.io/bitriseio/android:latest
5. Run the following command:

       docker run --privileged --env CI=false --volume "$(pwd):/bitrise/src" --volume "/var/run/docker.sock:/var/run/docker.sock" --rm quay.io/bitriseio/android:latest bitrise run WORKFLOW`

   If you want to just jump into the container and experiment inside, you can replace `--rm quay.io/bitriseio/android:latest bitrise run WORKFLOW` with `-it quay.io/bitriseio/android:latest bash` to start an interactive bash shell inside the container. For example:

       docker run --privileged --env CI=false --volume "$(pwd):/bitrise/src" --volume "/var/run/docker.sock:/var/run/docker.sock" -it quay.io/bitriseio/android:latest bash

   In general, if your project is an Android project but you don't use Android NDK, to preserve precious disk space, you should use the [quay.io/bitriseio/android](https://quay.io/repository/bitriseio/android) docker image. You can find other official Bitrise docker images on our [Quay page](https://quay.io/organization/bitriseio). In this example, we're using the `quay.io/bitriseio/android` one.
6. Download docker images from the [Quay](https://quay.io/organization/bitriseio):

       docker pull quay.io/bitriseio/android:latest`

   Be aware that this can take quite a bit of time, as this image is over 10 GB. If the 			download fails or hangs, you can restart it any time by running the same command again.
7. Download your Bitrise build configuration (`bitrise.yml`) to the root directory of your repository.

   You can download your project's `bitrise.yml` from the `bitrise.yml` tab of your Workflow Editor on [bitrise.io](https://www.bitrise.io).
8. In your Terminal / Command Line go to (`cd`) the root directory of your repository. Check if your `bitrise.yml` is at this location.

**If you try to reproduce an issue, you should** `git clone` **your repository into a new directory**, so that the directory will only contain the files which are committed into the repository! It's a frequent reproducibility issue that you try to run the commands in your normal working directory, where you most likely have files which are not committed into your repository, for example, files which are in `.gitignore`.

## Running your builds

Run your build with the following command:

    docker run --privileged --env CI=false --volume "$(pwd):/bitrise/src" --volume "/var/run/docker.sock:/var/run/docker.sock" --rm quay.io/bitriseio/android:latest bitrise run WORKFLOW

* If you want to jump into the container and experiment inside, you can replace:

  `--rm quay.io/bitriseio/android:latest bitrise run WORKFLOW`

  with `-it quay.io/bitriseio/android:latest bash` to start an interactive bash shell inside the container.

  For example:

      docker run --privileged --env CI=false --volume "$(pwd):/bitrise/src" --volume "/var/run/docker.sock:/var/run/docker.sock" -it quay.io/bitriseio/android:latest bash`.

  After this, you can run `bitrise run WORKFLOW`, which will run the workflow inside the container. To exit from the container, just run `exit`.
* Don't forget to replace `WORKFLOW` with the actual ID of your workflow in your `bitrise.yml`, with something like `primary`!

This command will share the current directory (the directory of your repository) as a shared volume with the docker container, and will make it available **inside** the container at the path `/bitrise/src`.

* The `--env CI=false` flag sets the environment variable `CI` to `false` - this will make Bitrise CLI skip certain steps that only make sense to run in a CI environment. For example, our `Git Clone` Step - you already have your code, so there's no need to git clone it again inside the docker container (that's why we shared the code directory as a `--volume`).
* The `--rm` flag tells docker to discard the container after the `docker run` command finishes. This means that if you run the command again, the only thing which will persist between the `docker run ..` commands are the files stored at the shared `--volume` (in your repository's directory). Every other file that is generated into a temp or any other location will be discarded / won't be kept.

  If you want to debug the container after a failed build, feel free to remove the `--rm` flag, and check out a Docker tutorial about how you can connect to an existing docker container. Please note that simply **running the command again** will not use the same container, but will create a new one!
* The `--privileged` flag allows access control of the host (!) from the docker container, so you should never use this flag unless you trust the docker image you will use! This flag is required for allowing VPNs to work (to change network configs of the host) for example.
* The `--volume "/var/run/docker.sock:/var/run/docker.sock"` flag exposes the docker socket from the host for the container - this is required if you want to run other docker containers from within the container, or if you want to run any `docker` command during your build / inside the container.