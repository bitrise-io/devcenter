In short Bitrise is a [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration)
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
which trigger.

The steps can do anything that can be implemented a command line scripts / programs:
send emails, [text messages](https://github.com/bitrise-io/steps-sms-text-message),
pass values to each other, [create Xcode archives](https://github.com/bitrise-io/steps-xcode-archive),
gather system information about the Virtual Machine
running the build, notify other users (e.g. on Slack)
or even [publish to iTunes Connect](https://github.com/bitrise-io/steps-deploy-to-itunesconnect-deliver), and many more.
You can read more at [Builds and Workflows](/getting-started/builds-and-workflows).

After a build is finished the Virtual Machine is destroyed and you can browse
the logs of every step that ran during the workflow.
You can read more at [Code Security](/getting-started/code-security).


## Offline CLI

To run a Bitrise build on your machine, you can install our [open source runner](https://www.bitrise.io/cli)
and use the `bitrise` command to execute your workflows locally.
It's a great help when you're developing steps, debugging builds,
or just want to use Bitrise for [any kind of automation](https://github.com/bitrise-io/steps-random-quote) on your machine.


## Feel free to edit any page of this DevCenter and to send us a Pull Request!!

!!! note "Edit on GitHub / in your browser directly!"
    You can edit the pages on GitHub directly,
    you don't even have to `git clone` the repository.
    Just select the file on [GitHub](https://github.com/bitrise-io/devcenter)
    and click the **pencil/edit** icon,
    which will open the GitHub editor for the file.
    [Example for this page](https://github.com/bitrise-io/devcenter/edit/master/docs/index.md).

If you don't want to edit the page on GitHub,
feel free to [contact us](https://www.bitrise.io/contact),
and we'll do the change for you!
