[Bitrise](https:///bitrise.io) is a continuous integration and delivery (CI/CD) platform with a main focus on mobile app development. We currently maintain full support of testing, building and deployment of `iOS`, `Android` and `Xamarin` mobile applications.

## Your apps

You can set up a workflow of steps to automate the testing and deployment processes of your apps with just a few clicks.

When you trigger a build, a [virtual machine](doc:virtual-machines) is assigned to host your app and to execute the corresponding workflow, step by step.

You are able to define more workflows for the very same app. A workflow consists of one or more steps which are scripts that being imported into Bitrise from their own [GitHub repositories](https://github.com/bitrise-io/bitrise-steplib/tree/master/steps). It's all open source so [you can develop your own desired steps](doc:step-development) any time to use them on Bitrise.

The steps can do anything that can be implemented using scripts: send emails, [text messages](https://github.com/bitrise-io/steps-sms-text-message), pass values to each other, [create Xcode archives](https://github.com/bitrise-io/steps-xcode-archive), [publish to iTunes Connect](https://github.com/bitrise-io/steps-deploy-to-itunesconnect-deliver), or just run any kind of script. You can read more about steps and workflows in [Builds & workflows](doc:how-bitrise-works).

After a build is finished, the dedicated virtual machine is going to be discarded. You can browse the logs of every step that ran during the workflow if necessary. You can read more about code security in [Virtual machines](doc:virtual-machines).

## Offline CLI

To run Bitrise on your machine, you can install our [open source runner](https://www.bitrise.io/cli) and use the `bitrise` command to execute your workflows locally. It's a great help when you're developing steps, or just want to use Bitrise for [any kind of automation](https://github.com/bitrise-io/steps-random-quote) on your machine.
