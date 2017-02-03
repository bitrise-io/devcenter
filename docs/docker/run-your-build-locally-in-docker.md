To be able to run your Linux stack builds locally you'll need [docker](https://www.docker.com/).

For Linux just follow the [official install instructions](https://docs.docker.com/engine/installation/linux/).

For Mac you can use [Docker for Mac](https://www.docker.com/products/docker#/mac),
which is probably the easiest way to get started.

For this example we'll use [this Bitrise Android sample project](https://github.com/bitrise-samples/sample-apps-android-sdk22).

!!! warning "Large images ahead"
    The official Bitrise Docker images are quite large, due to the fact that it includes
    a wide variety of preinstalled tools. You'll need at __least__ 20-25 GB free disk space!

If you're not familiar with the [Bitrise CLI](https://www.bitrise.io/cli)
you should try that first. You don't have to master the CLI,
if you know what `bitrise run WORKFLOW` does, that should be enough for this tutorial.


## TL;DR;

If you're familiar with `docker` and the `bitrise` CLI:

1. Install [docker](https://www.docker.com/)
2. Make sure you have your `bitrise.yml` in your repository (you don't have to commit it, but the file have to exist in your repository's root directory)
3. `cd` into your repository's directory on your Mac/Linux
    * _If you try to reproduce an issue, you should `git clone` your repository into a __new directory__,
      so that the directory will only contain the files which are committed into the repository!_
4. `docker pull bitriseio/docker-android:latest`
5. `docker run --privileged --env CI=false --volume "$(pwd):/bitrise/src" --volume "/var/run/docker.sock:/var/run/docker.sock" --rm bitriseio/docker-android:latest bitrise run WORKFLOW`
    * Note: if you want to just jump into the container and experiment inside, you can replace `--rm bitriseio/docker-android:latest bitrise run WORKFLOW` with `-it bitriseio/docker-android:latest bash` to start an interactive bash shell inside the container. E.g.: `docker run --privileged --env CI=false --volume "$(pwd):/bitrise/src" --volume "/var/run/docker.sock:/var/run/docker.sock" -it bitriseio/docker-android:latest bash`.

_Keep reading if you want to read more details and notes about the process and commands!_


## Getting started

Open your Terminal / Command Line, and download the docker image you want to use.
In general, if your project is an Android project but you don't use the Android NDK,
to preserve precious disk space you should use the
[bitriseio/docker-android](https://hub.docker.com/r/bitriseio/docker-android/) docker image.
You can find other official Bitrise docker images [on our Docker Hub page](https://hub.docker.com/u/bitriseio/).
For this example we'll use the `bitriseio/docker-android` one.

Downloading docker images from the [Docker Hub](https://hub.docker.com) is quite easy:

```
docker pull bitriseio/docker-android:latest
```

Be prepared, this can take quite a bit of time, as this image is over 10 GB.
_If the download would fail or hang, you can restart it any time by running
the same command again._

Once the download succeeds you have everything prepared to run your build
in Docker! The last thing you have to do is to download your Bitrise build
configuration (`bitrise.yml`).

!!! note "`bitrise.yml`"
    You can download your project's `bitrise.yml` from the __Workflow Editor__
    on [bitrise.io](https://www.bitrise.io), under the `bitrise.yml` section.

In your Terminal / Command Line go to (`cd`) the root directory
of _your repository_, and make sure your `bitrise.yml` is at this location.

__If you try to reproduce an issue, you should `git clone` your repository into a new directory,
so that the directory will only contain the files which are committed into the repository!__
It's a frequent reproducibility issue that you try to run the commands in your
normal working directory, where you most likely have files which are not
committed into your repository, e.g. files which are in `.gitignore`.


## Run your builds

The only thing left to do is to actually run a build:

```
docker run --privileged --env CI=false --volume "$(pwd):/bitrise/src" --volume "/var/run/docker.sock:/var/run/docker.sock" --rm bitriseio/docker-android:latest bitrise run WORKFLOW
```

!!! note
    If you want to just jump into the container and experiment inside, you can replace `--rm bitriseio/docker-android:latest bitrise run WORKFLOW` with `-it bitriseio/docker-android:latest bash` to start an interactive bash shell inside the container.
    E.g.: `docker run --privileged --env CI=false --volume "$(pwd):/bitrise/src" --volume "/var/run/docker.sock:/var/run/docker.sock" -it bitriseio/docker-android:latest bash`.
    After this, if you want to, you can run `bitrise run WORKFLOW`, which will run the workflow inside the container.
    To exit from the container just run `exist`.

_Don't forget to replace `WORKFLOW` with the actual ID of your workflow in your `bitrise.yml`,
with something like `primary`!_

This command will share the current directory (the directory of your repository)
as a shared volume with the docker container, and will make it available __inside__ the
container at the path `/bitrise/src`.

The `--env CI=false` flag sets the environment variable `CI` to `false` - this will
make Bitrise CLI to skip certain steps which only make sense to run in a Continuous Integration
environment. An example is the `Git Clone` step - you already have your code, so there's
no need to git clone it again inside the docker container (that's why we
shared the code directory as a `--volume`).

The `--rm` flag tells docker to discard the container after the `docker run`
command finishes. This means that if you run the command again, the only thing which will
persist between the `docker run ..` commands are the files stored at the shared `--volume`
(in your repository's directory). Every other file which is generated into a temp
or any other location will be discarded / won't be kept. If you want to
debug the container after a failed build feel free to remove the `--rm` flag,
and check out a Docker tutorial about how you can connect to an existing
docker container - _Note: simply running the command again **will not** use the same container,
but **will create a new one**_!

The `--privileged` flag allows access control of the host (!) from the docker container,
so you should never use this flag unless you trust the docker image you will use!
This flag is required for allowing VPNs to work (to change network configs
of the host) for example.

The `--volume "/var/run/docker.sock:/var/run/docker.sock"` flag exposes the
docker socket from the host for the container - this is required
if you want to run other docker containers from whithin the container,
or if you want to run any `docker` command during your build / inside the container.
