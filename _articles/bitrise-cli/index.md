---
title: Intro
redirect_from:
- "/bitrise-cli"
- "/bitrise-cli/"
menu:
  bitrise-cli:
    weight: 1

---
Bitrise is a collection of tools and services to help you with the development
and automation of your software projects, with a main focus on mobile apps.

Most of this DevCenter describes things related to [bitrise.io](https://www.bitrise.io),
the hosted automation service, but the heart of Bitrise is the
[open source Bitrise CLI / runner](https://github.com/bitrise-io/bitrise),
which is responsible for interpreting the build configuration and executing it.

This open source runner is referred to as `Bitrise CLI` or `Bitrise`,
and **it's a tool which you can install and run on your own Mac/PC!**

This section of the DevCenter is dedicated to this runner (`Bitrise CLI`) and the
`bitrise.yml` configuration format, **the things described here don't even require a**
[**bitrise.io**](https://www.bitrise.io) **account**, the only requirement is that
you install the `Bitrise CLI` on your Mac/PC.

{% include message_box.html type="note" title="Bitrise CLI on bitrise.io" content="
The CLI you can install is exactly the same as what's used on [bitrise.io](https://www.bitrise.io). When a build starts on [bitrise.io](https://www.bitrise.io), a virtual machine is created for the build with the Bitrise CLI preinstalled, and once the virtual machine is ready, the build is performed through the Bitrise CLI. "%}

## Bitrise CLI - the open source, offline, automation runner

To run a Bitrise build on your machine, you can install our [open source runner](https://www.bitrise.io/cli)
and use the `bitrise` command to execute your _workflows_ locally.
It's a great help when you're developing steps, debugging builds,
or just want to use Bitrise for _any kind of automation_ on your machine.

## bitrise.yml - the configuration format

The configuration format of the `Bitrise CLI` is referred to as `bitrise.yml`,
as that's the expected file name the configuration should be saved with.

_Technically the CLI can also accept the configuration in JSON format, and the file name can be changed too, but if you save the configuration into a file named_ `_bitrise.yml_`_, you can simply_ `_bitrise run_` _in that directory, without specifying any configuration path, and the CLI will read the configuration from_ `_bitrise.yml_` _automatically._

## Step Library (StepLib)

The StepLib is the collection of the build steps you can use in your
`bitrise.yml`. The steps in the official [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib)
are all open source, **you can write your own** too and then share it with others!
See the [step-template](https://github.com/bitrise-steplib/step-template) for more information.

You can also create your own Step Library if you want to, but it's usually easier to just reference your steps with their `git clone` URL directly if you don't want to share it with others.

{% include message_box.html type="note" title="Custom StepLib support in tools" content="
The Bitrise CLI tools can work with custom step libraries, but other tools like the Visual Workflow Editor on [bitrise.io](https://www.bitrise.io) might be limited in functionality for steps not available in the main [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib). "%}

If possible, you should share your steps in the main [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib),
to help others as well as for the extra reliability the StepLib offers.

_Custom StepLibs can also provide fallbacks (alternative download URLs, caches),
automatic and preiodic checks etc. to provide the best reliability, but you get all these for free
if you use the main Bitrise StepLib._

### Why to use the StepLib and Steps instead of ad-hoc build scripts?

Same reason why code libraries / dependencies are awesome:

You have a code which can be updated independently from other parts,
and **you can re-use/share** this between your configurations.

**Shared maintenance**: when you use Steps created by others you don't have to maintain
the codes, but you can contribute to it if you want to, or create and use your own.

**Versioned**: If a new version doesn't work for you, **you can always go back to a previous one**.

_We frequently push features as Steps instead of building it into the core tools.
This allows faster and versioned iterations, and updating the parts independently.
We try to maintain compatibility as much as possible, so older versions can work too,
providing a way to upgrade when it's appropriate for you._