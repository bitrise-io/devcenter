# Builds & Workflows

A *build* is the process specified by the app's *workflow*, which is a collection of *steps*.
Every step is an **open source** repository which you can inspect, modify,
and run with the [open source Bitrise CLI](https://www.bitrise.io/cli).

The app's build configuration can be specified as a `yaml` (`bitrise.yml`) config,
which you can modify in [bitrise.io](https://www.bitrise.io)'s
graphical Workflow Editor UI (on your app's Bitrise.io page click the `Workflows` tab),
or [yaml editor](http://blog.bitrise.io/2016/02/12/edit-your-yaml-files-like-a-boss.html) directly.

On the graphical UI of the Workflow editor, you are able to add, remove, and reorder the build steps.
Steps represent a block of script execution with predefined input and output variables.
Steps can be written in various languages, like bash, Go, Ruby, Swift, etc.
Read more about how the CLI, workflows and steps work in the [Bitrise CLI and bitrise.yml](/bitrise-cli/) section.

When a build is running, these scripts will be downloaded and executed in the order you've defined in your workflow,
with the input parameters you set. They will produce the predefined outputs set as environment variables.

## The build process

There are a lot of things that can be customized when working with Bitrise.
The build process has some mutable dimensions as well,
from several kind of [triggers](https://bitrise-io.github.io/devcenter/webhooks/trigger-map),
through different stacks and preparation types to environment variables.

1. Trigger builds by:
    * clicking the `Build` button on the application's page (manual build trigger)
    * scheduling with a selected branch and frequency (runs when scheduled - you can find this option in the `Build` popup)
    * [webhook](https://bitrise-io.github.io/devcenter/webhooks) - after each code/tag push or pull request to the given branch (runs when push/pull request arrives)
    * our `Build Trigger API`
2. Environment preparation:
   Once we've found a suitable machine, a virtual machine will be provisioned and prepared to run the build.
   Build specific environment variables are preset, so you can use these in your steps.
   You can find more information about the available `Stacks` on your app's `Settings` tab,
   in the `Stack Selector` section.
3. Concurrency:
   Builds over your subscription plan's concurrency count will be marked as __on hold__.
   They will start whenever your ongoing builds are finished and you have a free build slot.
   You can always [purchase additional concurrencies](https://www.bitrise.io/me/profile/pricing) with the Pro plan
   to increase the concurrent builds you can run at the same time.
4. Workflow execution:
   Steps in Workflows are executed in the same order as defined in the Workflow editor of your application,
   from top to bottom. You can reorder the steps by dragging.
   The log each step generates will be displayed on the build's details page.
5. Cleanup:
   After the execution of the build, there will be a summary of the build
   created and stored on the Bitrise server and **the virtual machine gets destroyed**,
   so your code/files woudn't fall into the wrong hands.
