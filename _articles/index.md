---
title: What is Bitrise?
permalink: "/"
menu:
  main:
    weight: 1

---
**Bitrise** is a [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration)
and [Delivery](https://en.wikipedia.org/wiki/Continuous_delivery) (CI/CD) Platform as a Service (PaaS)
with a main focus on mobile app development (`iOS`, `Android`, `Xamarin`, ...). It is a collection of tools and services to help you with the development and automation of your software projects.

**Automate the testing and deployment of your apps with just a few clicks.**

## Run your builds on bitrise.io

* Run builds of your app on Bitrise by defining a `Workflow`. A `Workflow` consists of one or more build `Steps` (open source git repositories
  which can be executed with the [open source Bitrise CLI](https://www.bitrise.io/cli)).
* [Create and share your own build Steps](https://github.com/bitrise-steplib/step-template).
* Define more workflows for the same app, and define [triggers](/webhooks/trigger-map) to specify which workflow should be selected for each trigger.

The steps can do anything that can be implemented by command line scripts and/or programs:

* send emails,
* [send text messages](https://github.com/bitrise-io/steps-sms-text-message),
* pass values to each other,
* [create Xcode archives](https://github.com/bitrise-io/steps-xcode-archive),
* gather system information about the Virtual Machine running the build,
* notify other users (for example, on Slack)
* even [publish to iTunes Connect](https://github.com/bitrise-io/steps-deploy-to-itunesconnect-deliver), and many more.

### Infrastructure

When you trigger a build a Virtual Machine is assigned to host, your build and your defined Workflow (series of build Steps) will be executed, step by step.

After a build is finished the Virtual Machine is destroyed and you can browse the logs of every step that ran during the workflow.
You can read more at [Code Security](/getting-started/code-security).

The VMs are equipped with all the tools required to build your app. Bitrise automatically detects which Stack - virtual machine type - is appropriate for your app but of course you can change it manually at any time.

## Bitrise CLI - the open source, offline, automation runner

To run a `bitrise` build on your machine, you can install our [open source runner](https://www.bitrise.io/cli)
and use the `bitrise` command to execute your workflows locally.
_No_ [_bitrise.io_](https://www.bitrise.io) _account required to use the Bitrise CLI._

It's a great help when you're developing Steps, debugging builds, or just want to use Bitrise for _any kind of automation_ on your machines.

You can find more information about the offline runner
in the [Bitrise CLI and bitrise.yml](/bitrise-cli/index/) section of the DevCenter.

## Bitrise API

You can easily access and use our API, built on Golang - all you need to do is acquire a Personal Access Token to authenticate and you are good to go!

{% include message_box.html type="info" title="API documentation" content="

* [Bitrise API overview](/api/v0.1/)


* [Bitrise API endpoint documentation](https://api-docs.bitrise.io)"%}