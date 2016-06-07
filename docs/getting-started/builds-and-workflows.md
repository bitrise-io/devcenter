# Builds & Workflows

A *build* is the process specified by the app's *workflow*, which is a collection of *steps*. Every step is an [**open source**](https://github.com/bitrise-io/bitrise-steplib) script repository which you can inspect and modify.

A Workflow is interpreted as a `yaml`, which you are able to modify at bitrise.io's Workflow editor, or [yaml editor](http://blog.bitrise.io/2016/02/12/edit-your-yaml-files-like-a-boss.html) directly. On the graphical UI of the Workflow editor, you are able to add, remove, and reorder the build steps. Steps represent a block of script execution with predefined input and output variables. Steps can be written in various languages we (our virtual machines) support, like bash, Go, Ruby, Swift, etc. Read more about how workflows and steps are implemented on our [engineering blog](https://tech.bitrise.io/decentralized-automation/).

When a build is running, these scripts will be downloaded and executed in the order you've defined in your workflow, with the input parameters you set. They will produce the predefined outputs set as environment variables.

## The build process

There are a lot of things that can be customized when working with Bitrise. The build process has some mutable dimensions as well, from several kind of triggers, through different stacks and preparation types to environment variables.

1. Trigger builds by
  * clicking the "Build" button on the application's page (runs manually)
  * scheduling with a selected branch and frequency (runs when scheduled)
  * [webhook](doc:adding-webhooks)  - after each push or pull request to the given branch (runs when push/pull request arrives)
  * our [Build Trigger API](doc:build-trigger-api)

2. Environment preparation
Once we've found a suitable machine, a virtual machine will be provisioned and prepared to run the build. Read more about our virtual machines in [Virtual machines](doc:virtual-machines). Build specific environment variables are preset, so you can use these in your steps. Read more about our available stacks and preparation types in [Available Stacks](doc:available-stacks).

3. Concurrency
Builds over your subscription plan's concurrency count will be marked as *on hold*. They will start whenever your ongoing builds are finished and you have a free build slot. You can always [purchase additional concurrencies](https://www.bitrise.io/me/profile/pricing) with the Pro plan.

4. Workflow execution
Steps in Workflows are executed in the same order as defined in the Workflow editor of your application, from top to bottom. You can reorder the steps by dragging. The log each step generates will be displayed on the build's details page.

5. Cleanup
After the execution of the build, there will be a summary of the build created and stored on the Bitrise server and **the virtual machine gets rolled back to a predefined state**, erasing every file and every change your build made so your code/files woudn't fall into the wrong hands.
