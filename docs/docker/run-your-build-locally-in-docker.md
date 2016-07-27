To be able to run your Linux stack builds locally you'll need [docker](https://www.docker.com/).

For Linux just follow the [official install instructions](https://docs.docker.com/engine/installation/linux/).

For Mac you can use [Docker for Mac](https://www.docker.com/products/docker#/mac),
which is probably the easiest way to get started.

For this example we'll use [this Bitrise Android sample project](https://github.com/bitrise-samples/sample-apps-android-sdk22).

!!! warning "Large images ahead"
    The official Bitrise Docker images are quite large, due to the fact that it includes
    a wide variety of preinstalled tools. You'll need at least 15-20 GB free disk!

If you're not familiar with the [Bitrise CLI](https://www.bitrise.io/cli)
you should try that first. You don't have to master the CLI,
if you know what `bitrise run WORKFLOW` does, that should be enough for this tutorial.


## Getting started

Open your Terminal / Command Line, and download the docker image you want to use.
In general, if your project is an Android project but you don't use the Android NDK,
to preserve precious disk space you should use the
[bitriseio/docker-android](https://hub.docker.com/r/bitriseio/docker-android/) docker image.
You can use other official Bitrise docker images [on our Docker Hub page](https://hub.docker.com/u/bitriseio/).
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

The only thing left to do is to actually run a build:

```
docker run --env CI=false --volume "$(pwd):/bitrise/src" --rm bitriseio/docker-android:latest bitrise run WORKFLOW
```

_Don't forget to replace `WORKFLOW` with the actual ID of your workflow in your `bitrise.yml`,
with something like `primary`!_

This command will share the current directory (the directory of your repository)
as a shared volume with the docker container, and will make it available __inside__ the
container at the path `/bitrise/src`.

The `--env CI=false` flag sets the environment variable `CI` to `false` - this will
make Bitrise CLI to skip certain steps which only make sense to run in a Continuous Integration
environment. A basic example is the Git Clone step - you already have your code, so
no need to git clone it again inside the docker container (that's also why we
shared it as a `--volume`).

The `--rm` flag tells docker to discard the container immedately at the end of the `docker run`
session. This means that if you run the command again, the only thing which will
persist between the `docker run ..` commands are the files stored at the shared `--volume`
(in your repository's directory). Every other file which is generated into a temp
or any other location will be discarded / won't be kept. If you want to
debug the container after a failed build feel free to remove the `--rm` flag,
and check out a Docker tutorial about how you can connect to an existing
docker container - simply running the command again will not use the same container,
but will create a new one!
