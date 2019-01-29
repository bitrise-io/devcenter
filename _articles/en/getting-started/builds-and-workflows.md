---
title: Builds
redirect_from:
- "/getting-started/builds-and-workflows"
- "/getting-started/builds-and-workflows/"
menu:
  getting-started:
    weight: 4

---
## Builds & Workflows

Once you added an app to Bitrise, your first build will be kicked off automatically.

A _build_ is the process specified by the app's [_workflow_](/getting-started/getting-started-workflows), which is a collection of [_steps_](getting-started/getting-started-steps). The app's build configuration is specified in the `[bitrise.yml](/bitrise-cli/basics-of-bitrise-yml)`[ configuration file](/bitrise-cli/basics-of-bitrise-yml) which you can modify in [bitrise.io](https://www.bitrise.io)'s
graphical Workflow Editor UI,
or in a [yaml editor](http://blog.bitrise.io/2016/02/12/edit-your-yaml-files-like-a-boss.html) directly.

On the graphical UI of the [Workflow editor](/getting-started/getting-started-workflows), you are able to add, remove, and reorder the build steps.
Steps represent a block of script execution with predefined input and output variables. Steps can be written in various languages, like bash, Go, Ruby, [Swift](https://go.bitrise.io/swift), and more.

When a build is running, these scripts will be downloaded and executed in the order you've defined in your workflow,
with the input parameters you set. They will produce the predefined outputs set as [environment variables](/builds/available-environment-variables).

Read more about how the CLI, workflows and steps work "under the hood" in the [Bitrise CLI and bitrise.yml](/bitrise-cli/) section.

## The build process

1. Trigger builds by:
   * clicking the `Build` button on the application's page (manual build trigger)
   * [scheduling with a selected branch and frequency](/builds/scheduling-builds)
   * [webhooks](/webhooks/) - after each code/tag push or pull request to the given branch
   * our `Build Trigger API`
2. Environment preparation:
   A virtual machine will be provisioned and prepared to run the build.
   Build specific environment variables are preset so you can use these in your steps.
   You can find more information about the available stacks in the Workflow Editor, on the `Stack` tab.
3. Workflow execution:
   Steps in Workflows are executed in the same order as defined in the Workflow editor of your application,
   from top to bottom. You can reorder the steps by dragging.
   The log each step generates will be displayed on the build's details page.
4. Cleanup:
   After the execution of the build, a build log is
   created and stored on the Bitrise server and **the virtual machine gets destroyed**,
   so your code/files will not fall into the wrong hands.

## Build concurrency

Build concurrency determines how many builds you can run simultaneously. Builds over your subscription plan's concurrency count will be marked as **on hold**.
They will start whenever your ongoing builds are finished and you have a free build slot. You can always [purchase additional concurrencies](https://www.bitrise.io/pricing) with the Developer or Organization (Org Standard or Org Elite) plans to increase the concurrent builds you can run at the same time.