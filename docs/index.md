In short __Bitrise__ is a [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration)
and [Delivery](https://en.wikipedia.org/wiki/Continuous_delivery) (CI/CD) Platform as a Service (PaaS)
with a main focus on mobile app development (`iOS`, `Android`, `Xamarin`, ...).

__Automate the testing and deployment of your apps with just a few clicks.__

When you trigger a build a Virtual Machine is assigned to host
your build and your defined Workflow (series of build Steps) will be executed, step by step.

A `Workflow` consists of one or more build `Steps` (open source git repositories
which can be executed with the [open source Bitrise CLI](https://www.bitrise.io/cli)).
[You can create and share your own build Steps too](https://github.com/bitrise-steplib/step-template).
You are able to define more workflows for the very same app,
and define [triggers](https://bitrise-io.github.io/devcenter/webhooks/trigger-map/) to specify which workflow should be selected for
each trigger.

The steps can do anything that can be implemented by command line scripts / programs:
send emails, [text messages](https://github.com/bitrise-io/steps-sms-text-message),
pass values to each other, [create Xcode archives](https://github.com/bitrise-io/steps-xcode-archive),
gather system information about the Virtual Machine
running the build, notify other users (e.g. on Slack)
or even [publish to iTunes Connect](https://github.com/bitrise-io/steps-deploy-to-itunesconnect-deliver), and many more.
You can read more at [Builds and Workflows](/getting-started/builds-and-workflows).

After a build is finished the Virtual Machine is destroyed and you can browse
the logs of every step that ran during the workflow.
You can read more at [Code Security](/getting-started/code-security).


## Bitrise CLI - the open source, offline, automation runner

To run a `bitrise` build on your machine, you can install our [open source runner](https://www.bitrise.io/cli)
and use the `bitrise` command to execute your workflows locally.
_No [bitrise.io](https://www.bitrise.io) account required to use the Bitrise CLI._

It's a great help when you're developing steps, debugging builds,
or just want to use Bitrise for _any kind of automation_ on your machine.

You can find more information about the offline runner
in the [Bitrise CLI and bitrise.yml](/bitrise-cli/) section of the DevCenter.
