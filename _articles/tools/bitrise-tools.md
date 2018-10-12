---
title: Bitrise tools
menu:
  tools:
    weight: 1

---
List of Open Source tools maintained by the Bitrise team.

{% include message_box.html type="note" title="Where can I find the repositories?" content="
For historical reasons the core Bitrise CLI tools live in [github.com/bitrise-io](https://github.com/bitrise-io), but most of our tools, and every new tool we create lives in the [github.com/bitrise-tools](https://github.com/bitrise-tools), and the CLI core components (plugins, etc.) in the [github.com/bitrise-core](https://github.com/bitrise-core) GitHub organization. "%}

## Core, Bitrise CLI tools

* [bitrise](https://github.com/bitrise-io/bitrise) -
  the Bitrise CLI, which is used on [bitrise.io](https://www.bitrise.io)
  to run the builds, as well as you can install it on your own Mac/Linux and run your the build locally!
* [stepman](https://github.com/bitrise-io/stepman) -
  used for managing the Step Library, including
  downloading and sharing steps.
* [envman](https://github.com/bitrise-io/envman) -
  environment variable manager, can be used independently
  and Bitrise CLI uses it to isolate and manage environment variables during the build.

## Bitrise CLI plugins

* [Analytics plugin](https://github.com/bitrise-core/bitrise-plugins-analytics)

## Infrastructure

* [bitrise-machine](https://github.com/bitrise-tools/bitrise-machine) -
  Manage bitrise CLI runner hosts (virtual machines). Create, destroy, cleanup based on configuration.
* [bitrise-bridge](https://github.com/bitrise-tools/bitrise-bridge) -
  Responsible for "bridging" a Bitrise CLI command
  from a remote host to the local Bitrise CLI;
  either directly or by creating a Docker container and running the Bitrise CLI command in it.
* [cmd-bridge](https://github.com/bitrise-io/cmd-bridge) -
  Helps bridging an outside (generic) command (e.g. any command, through SSH) into a host. Useful in cases
  where the command have to be performed in a specific environment, e.g. the iOS Simulator
  can't be started from an SSH session, it have to be started from a logged in "GUI" user.
  In this case you start `cmd-bridge`'s server in the environment, and then
  you can use `cmd-bridge` through SSH or another way to send commands to the running
  `cmd-bridge` server, which will perform the commands in its context / the environment
  it is running in.
* [garden](https://github.com/bitrise-tools/garden) -
  A tool to manage your template (plan) based directories.
  You can perform a setup (plant) by running garden grow,
  which'll create your garden (directories) based on your plans (temlates).

## iOS

* [codesigndoc](https://github.com/bitrise-tools/codesigndoc) -
  Your friendly iOS Code Signing Doctor.

## Generic

* [depman](https://github.com/bitrise-tools/depman) -
  Super Simple Dependency Manager
* [releaseman](https://github.com/bitrise-tools/releaseman) -
  Your friendly Release Manager

## Go

Go / golang related tools.

* [gows](https://github.com/bitrise-tools/gows) -
  Go Workspace / Environment Manager, to easily manage the Go Workspace during development.
* [goinst](https://github.com/bitrise-tools/goinst) -
  Go Install command line tools in an isolated environment.

## Server / service

* [bitrise webhooks](https://github.com/bitrise-io/bitrise-webhooks) -
  Bitrise Webhooks processor. Transforms various incoming webhooks (GitHub, Bitbucket, Slack, ...)
  to [bitrise.io](https://www.bitrise.io)'s Build Trigger API format, and calls it to start a build.
* [DATapi](https://github.com/bitrise-tools/datapi) -
  A very simple data series storage service.
  Store and retrieve data series in a quick and simple way, based on timestamp and category of the data.
  * [DATapi Ruby Client](https://github.com/bitrise-tools/datapi-client)