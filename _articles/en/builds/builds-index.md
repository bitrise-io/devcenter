---
redirect_from: []
tag:
- builds
- workflows
- triggers
title: Builds
description: A build is a series of jobs, specified by the app’s Workflow which is
  a collection of Steps. The app’s build configuration is specified in the bitrise.yml
  configuration file which you can modify in bitrise.io’s graphical Workflow Editor
  UI, or in a yaml editor directly.
menu:
  main:
    identifier: builds-main
    weight: 13

---
A build is a series of jobs, specified by the app’s Workflow which is a collection of [Steps](/steps-and-workflows/getting-started-steps). The app’s build configuration is specified in the [bitrise.yml configuration file](/bitrise-cli/basics-of-bitrise-yml) which you can modify in [bitrise.io](https://www.bitrise.io/)’s graphical Workflow Editor.

When a build is running, these scripts will be downloaded and executed in the order you’ve defined in your Workflow, with the input parameters you set. They will produce the predefined outputs set as [Environment Variables](/builds/available-environment-variables).

## Triggering builds

Trigger builds by:

* Clicking the `Build` button on the application’s page (manual build trigger).
* [Scheduling with a selected branch and frequency](/builds/scheduling-builds).
* [Webhooks](/webhooks/): automatically trigger a build after each [code/tag push](/builds/triggering-builds/trigger-code-push/) or [pull request](/builds/triggering-builds/trigger-pull-request/) to the given branch.
* Our[ API](/api/build-trigger/).

Read more about triggers in our [Triggering builds](/builds/triggering-builds/triggering-builds-index/) guide.

## The build process

1. [Triggering the build](/builds/triggering-builds/triggering-builds-index/).
2. Environment preparation: A virtual machine will be provisioned and prepared to run the build. Build specific Environment Variables are preset so you can use these in your steps. You can find more information about the available stacks in the Workflow Editor, on the **Stack** tab.
3. Workflow execution: Steps in Workflows are executed in the same order as defined in the Workflow Editor of your application, from top to bottom. You can reorder the Steps by dragging them around. The log each Step generates will be displayed on the build’s details page.
4. Cleanup: After the execution of the build, a build log is created and stored on the Bitrise server. The virtual machine running the build is destroyed so your code/files will never fall into the wrong hands.

## Build concurrency

Build concurrency determines how many builds you can run simultaneously. Builds over your subscription plan’s concurrency count will be marked as on hold. They will start whenever your ongoing builds are finished and you have a free build slot. You can always [purchase additional concurrencies](https://www.bitrise.io/pricing) with the Developer or Organization plans to increase the number of builds you can run at the same time.