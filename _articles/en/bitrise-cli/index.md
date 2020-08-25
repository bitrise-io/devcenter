---
title: Bitrise CLI
redirect_from:
- "/bitrise-cli"
- "/bitrise-cli/"
tag:
- cli
- bitrise
- bitrise.yml
description: The open source Bitrise CLI / runner is responsible for interpreting
  and executing the build configuration. Using the Bitrise CLI you can run the same
  configuration on any compatible Mac/PC, inside and outside of bitrise.io.
menu:
  main:
    identifier: bitrise-cli-main
    weight: 23

---
Bitrise is a [collection of tools](https://devcenter.bitrise.io/tools/bitrise-tools/) and [services](https://www.bitrise.io) to help you with the development and automation of your software projects, with a main focus on mobile apps. This section is dedicated solely to the [open source Bitrise CLI / runner](https://github.com/bitrise-io/bitrise), which is responsible for interpreting and executing the build configuration. Using the Bitrise CLI you can run the same configuration on any compatible Mac/PC, inside and outside of [bitrise.io](https://www.bitrise.io).

## Bitrise CLI - the open source, offline, automation runner

This open source runner, referred to as `Bitrise CLI` or `bitrise`, is a tool which you can install and run on your own Mac/PC! **This CLI is exactly the same as what's used on** [bitrise.io](https://www.bitrise.io). What it means is that when a build starts on [bitrise.io](https://www.bitrise.io), a virtual machine is created for the build with the `Bitrise CLI` preinstalled. Once the virtual machine is ready, the build is performed through the `Bitrise CLI`.

{% include message_box.html type="note" title="Do I need a bitrise.io account to use the Bitrise CLI offline runner?" content=" You do not need a [bitrise.io](https://www.bitrise.io) account to use the offline automation runner, the only requirement is to install `Bitrise CLI` on your Mac/PC.  "%}

To run a Bitrise build on your machine, you can install our [open source runner](https://www.bitrise.io/cli) and use the `bitrise` command to **execute your workflows locally**. It's a great help when you're developing steps, debugging builds, or just want to use Bitrise for any kind of automation on your machine.

{% include message_box.html type="info" title="Explore Bitrise CLI" content="

Learn more about what else you can do with `Bitrise CLI`:

* [Installing and updating the Bitrise CLI](/bitrise-cli/installation/)
* [Installing and upgrading the offline Workflow Editor](/bitrise-cli/offline-workflow-editor/)
* [Initializing a Bitrise project locally](/bitrise-cli/initializing-a-bitrise-project-locally/)
* [Running your first build](/bitrise-cli/run-your-first-build/)

"%}

## bitrise.yml - the configuration format

The configuration format of the `Bitrise CLI` is referred to as `bitrise.yml`. This is the expected file name the configuration should be saved with.

If you save the configuration into a file named `bitrise.yml`, you can simply `bitrise run` in that directory without specifying any configuration path! This way the CLI will read the configuration from `bitrise.yml` automatically.  (Technically the `Bitrise CLI` can also accept the configuration in JSON format.)

{% include message_box.html type="info" title="Explore bitrise.yml" content="

Learn more about what else you can do with `bitrise.yml`:

* [Basics of bitrise.yml](/bitrise-cli/basics-of-bitrise-yml/)
* [Customizing bitrise.yml](/bitrise-cli/customizing-bitrise-yml/)

"%}

## Step Library (StepLib)

The StepLib is the collection of the build steps you can use in your `bitrise.yml`. The steps in the official [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib) are all open source. You [can write your own too and then share](/bitrise-cli/create-your-own-step/) it with others!

You can also create your own Step Library if you want to, but it's usually easier to just reference your steps with their `git clone` URL directly if you don't want to share it with others.

{% include message_box.html type="note" title="Custom StepLib support in tools" content=" The Bitrise CLI tools can work with custom step libraries, but other tools like the Visual Workflow Editor on [bitrise.io](https://www.bitrise.io) might be limited in functionality for steps not available in the main [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib). "%}

Custom StepLibs can also provide fallbacks (alternative download URLs, caches), automatic and periodic checks to provide the best reliability, but you get all these for free if you use the main [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib).

{% include message_box.html type="info" title="About Steps" content=" Learn more about Steps here:

* [Steps in YAML](/bitrise-cli/steps/)
* [Step properties](/bitrise-cli/step-properties/)
* [Step inputs](/bitrise-cli/step-inputs/)
* [Step outputs](/bitrise-cli/step-outputs/) "%}

### Why to use the StepLib and Steps instead of ad-hoc build scripts?

Same reason why code libraries / dependencies are awesome:

* **Re-use and share**: You have a code which can be updated independently from other parts, and you can re-use/share this between your configurations.
* **Shared maintenance**: when you use Steps created by others you don't have to maintain the codes, but you can contribute to it if you want to, or create and use your own.
* **Versioned**: If a new version doesn't work for you, you can always go back to a previous one.

We frequently push features as Steps instead of building it into the core tools. This allows faster and versioned iterations, and updating the parts independently. We try to maintain compatibility as much as possible, so older versions can work too, providing a way to upgrade when it's appropriate for you.