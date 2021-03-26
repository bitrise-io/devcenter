---
title: Using your own Docker image
menu:
  docker:
    weight: 2

---
On Bitrise, every single build runs in its own, separate virtual machine that is destroyed at the end of the build. On our Android stacks, we use Docker for this purpose. Our stacks have pre-installed Docker images but you can use your own custom image, and run custom Docker commands in your Workflow. There are two ways to use your own Docker configuration on Bitrise:

1. Run `docker` commands yourself during your build. To do so, use one or more **Script** Steps.
2. Set a custom image in the Workflow Editor.

We recommend that you run `docker` commands with a **Script** Step as you should NOT CHANGE the base environment Docker image on the **Stack** tab unless you really have to! Running the `docker` commands yourself during the build is more flexible and provides an overall higher level of control.

{% include message_box.html type="note" title="GitHub sample repository" content=" You can find a sample repository on [GitHub](https://github.com/bitrise-samples/minimal-docker), which is configured to run on your Mac/Linux using the [Bitrise CLI](https://www.bitrise.io/cli). "%}

## Running docker commands with the Script Step during the build

The recommended way of using a custom Docker configuration both locally and on [bitrise.io](https://www.bitrise.io/ "https://www.bitrise.io/"), is to add a Script Step to your Workflow to run Docker commands. You can use the same Step to authenticate yourself to a service such as Docker Hub and to run your selected image.

We provide three examples on how to run Docker commands using our **Script** Step:

* [Running docker hello-world](/tutorials/docker/use-your-own-docker-image/#running-docker-hello-world)
* [Building and running a Dockerfile](/tutorials/docker/use-your-own-docker-image/#building-and-running-a-dockerfile)
* [Using docker-compose](/tutorials/docker/use-your-own-docker-image/#using-docker-compose)

### Running Docker hello-world

{% include message_box.html type="warning" title="Docker Hub authentication" content="The official hello-world Docker image is hosted on Docker Hub. If you wish to use any of the images from Docker Hub, you must authenticate first, as outlined in the [Using a custom Docker image from Docker Hub](/tutorials/docker/use-your-own-docker-image/#using-a-custom-docker-image-from-docker-hub) section."%}

In this example, we’re following the official getting started guide to run the `hello-world` Docker image. In our example `bitrise.yml` file, you can see a simple build configuration that can run the image:

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
    
            	docker login -u $DOCKERHUB_USER -p $DOCKERHUB_TOKEN
            	docker run hello-world

### Building and running a Dockerfile

You can use your own `Dockerfile` on Bitrise in your repository to define the Docker environment:

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

This Workflow will:

1. Git clone your repository.
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

Using the [docker-compose](https://docs.docker.com/compose/ "https://docs.docker.com/compose/") command, running a Docker image from your own Docker file is even simpler. With Compose, you can configure your application’s services and then you can start all services with a single command.

For example, set up a `docker-compose.yml` like this in your repository root (where the Dockerfile is):

    version: '2'
    services:
      sample-app:
        build: .

Now you can run your services with a single docker-compose call in your **Script** Step:

    - script@1.1.3:
        title: docker run
        inputs:
        - content: |-
            #!/bin/bash
            # fail if any commands fails
            set -e
            # debug log
            set -x
            docker-compose run --rm sample-app

Docker compose will build and run the image automatically. You don’t have to specify a `-t` tag since the `services` name will be used by `docker-compose` to tag the image automatically.

### Using a custom Docker image from Docker Hub

You can use Bitrise with a Docker image pulled from Docker Hub, as you can see in our [Running Docker hello-world](/tutorials/docker/use-your-own-docker-image/#running-docker-hello-world) example. However, on a free plan for anonymous users, Docker Hub only allows a limited number of image pulls. If you set the image in the Workflow Editor, no authentication will be performed: your pull will be a pull by an anonymous user from a Bitrise public IP address. With many of our users going for this option, the Docker Hub rate limit would mean some users wouldn’t be able to start builds.

The workaround is simple: you need to use a Script Step to authenticate yourself with your own Docker Hub account, and use the Step to pull the image from Docker Hub. To do so:

1. [Create a personal access token on Docker Hub. ](https://bitrise.atlassian.net/wiki/spaces/TW/pages/867238476/DockerHub+issue "https://bitrise.atlassian.net/wiki/spaces/TW/pages/867238476/DockerHub+issue")  
   This will be used to authenticate you instead of your password.
2. On Bitrise, create two Secret Environment Variables: one for your Docker Hub username and another for the personal access token.  
   In our examples, we’ll use `DOCKERHUB_USER` for the Docker Hub username and `DOCKERHUB_TOKEN`.
3. Use the `docker login` command in a **Script** Step to authenticate, with the Secret Env Vars as arguments:

       - script@1.1.3: 
       	   inputs: 
           - content: | 
               docker login -u $DOCKERHUB_USER -p $DOCKERHUB_TOKEN
4. Use the `docker run` command in the **Script Step** to run your chosen Docker image.

   In our example, it’s Docker’s official `hello-world` image. You can just replace hello-world with any image you want to use from Docker Hub.

       - script@1.1.3: 
       	   inputs: 
           - content: | 
               docker login -u $DOCKERHUB_USER -p $DOCKERHUB_TOKEN
               docker run hello-world

## Setting a custom Docker image in the Workflow Editor

In the Workflow Editor on bitrise.io, you have the option to set a path to a custom Docker image. Generally, we recommend sticking with the default, pre-installed images on our stacks but if you need to use your own image, read our guide carefully.

{% include message_box.html type="important" title="Custom Android docker image" content=" Creating and maintaining your own Android Docker image can be quite time consuming! If you only need to install a couple of additional tools, you should do that, for example, with a **Script** Step instead! For more information, see our [Install Any Additional Tool](https://devcenter.bitrise.io/tips-and-tricks/install-additional-tools/) guide. You should only use your own Android docker image if you really have to! "%}

{% include message_box.html type="warning" title="My message" content="If you wish to use an image hosted on Docker Hub, do not set the image path on the **Stack** tab of the Workflow Editor! Use a **Script** Step instead to authenticate your Docker Hub account and run the selected image. Check out the [Using a custom Docker image from Docker Hub](/tutorials/docker/use-your-own-docker-image/#using-a-custom-docker-image-from-dockerhub) section for the details."%}

If you want to run your build in a custom Docker environment, we strongly recommend basing your own Docker image on one of our base Docker images. Our images have every base tool pre-installed, the standard Bitrise directories created, the environments (such as `$BITRISE_DEPLOY_DIR`) set, and are pre-cached on the build virtual machines.

However, if you decide to create your own Docker image please read this guide, from start to finish.

### Creating your own image from a Bitrise image

We have four different Docker image types available. You can base your own image on any of these, depending on your needs.

| Image type | Description | GitHub link | quay.io link |
| --- | --- | --- | --- |
| Bitrise base image | The bare minimum Bitrise image with no specific tools installed. | Github | quay.io |
| Android base image | Bare-minimum base image with Android-specific tools and environment. | Github | quay.io |
| Android NDK image | Built on the Android base image with pre-installed Android NDK and environment. | Github | quay.io |
| Android NDK LTS image | LTS "pin" of the Android NDK Docker image. | Github | quay.io |

To base your own image on one of our available images, specify your base image at the very top of your `Dockerfile` with a `FROM` instruction and the quay.io ID of the image. In our example, we'll use  the latest version of the Bitrise base image:

    FROM quay.io/bitriseio/docker-bitrise-base:latest

{% include message_box.html type="note" title="Quay.io ID" content=" You have to use the quay.io ID of the image you want to use as the base image. For example, `quay.io/bitriseio/android`, `quay.io/bitriseio/android-ndk`, `quay.io/bitriseio/android-ndk-lts`, or `quay.io/bitriseio/bitrise-base`. "%}

{% include message_box.html type="important" title="Don’t use the `alpha` images for your builds" content=" For every Docker image we have on [quay.io](https://quay.io/), we have an `alpha` tagged version too. The `alpha` ones are frequently rebuilt and are NOT PRECACHED ON [**bitrise.io**](https://www.bitrise.io/), so you should avoid those. "%}

### Use your own Docker image for your builds

{% include message_box.html type="warning" title="Using an image hosted on Docker Hub" content="If you wish to use an image hosted on Docker Hub, do not set the image path on the **Stack** tab of the Workflow Editor! Use a **Script** Step instead to authenticate your Docker Hub account and run the selected image. Check out the [Using a custom Docker image from Docker Hub](/tutorials/docker/use-your-own-docker-image/#using-a-custom-docker-image-from-docker-hub) section for the details."%}

You can set your own Docker image in the Workflow Editor if the image can be pulled with the [`docker pull` command](https://docs.docker.com/engine/reference/commandline/pull/). To do so:

1. Go to your Workflow Editor.
2. Click the **Stack** tab.
3. Copy and paste the ID of your app.
   For example, `quay.io/bitriseio/bitrise-base`.

   ![Set custom Docker image on the Stack tab](/img/docker-image-to-use.png)
4. Click **Save** in the upper-right corner.

Now you should be able to use your own image to run your builds on [bitrise.io](https://www.bitrise.io).