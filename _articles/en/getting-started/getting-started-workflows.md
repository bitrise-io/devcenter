---
title: Workflows
redirect_from:
- "/getting-started/manage-your-workflow/"
menu:
  getting-started:
    weight: 7

---
A Bitrise workflow is a collection of Steps. When a build of an app is run, the steps will be executed in the order that is defined in the workflow. Workflows can be created, defined and modified in two ways:

* Using the graphical Workflow Editor on [bitrise.io](https://www.bitrise.io)
* Directly editing the `bitrise.yml` file of your project

Ultimately, both methods modify the `bitrise.yml` file - the `Workflow Editor` is simply a friendlier way of doing so!

By default, a single build is a single workflow. But it's also possible to [chain workflows together](/getting-started/getting-started-workflows#chain-workflows-together) so they run in succession, as well as to [trigger multiple workflows to run simultaneously](/builds/triggering-builds/trigger-multiple-workflows).

## Default Workflows

When you add a new app on [bitrise.io](https://www.bitrise.io), two workflows are created automatically. These are the `primary` and the `deploy` workflows. By default, every code change in your project's repository triggers the `primary` workflow if the required webhook has been set up.

Triggers can be configured so that any other workflow (including `deploy`) is automatically triggered when certain code events happen. For more information, [read some more about build triggers](/builds/triggering-builds/triggering-builds).

### The `primary` workflow

The `primary` workflow is automatically created when adding a new app. Once the process of adding the app is over, Bitrise triggers the app's first build automatically: this build runs with the `primary` workflow.

![](/img/primarywf.png)

The `primary` workflow is not the same for every app you create: it contains different Steps depending on the project type. For example, an Android project's `primary` workflow will include the `Install missing Android SDK components`, the `Android Lint` and the `Android Unit Test` Steps. But overall, `primary` is a "basic" workflow that always performs the following actions:

* Activates the SSH key, if one has been added to the app. The step saves it to file and then loads it into the user's ssh-agent with the `ssh-add` command. The step, by default, does not run if there is no SSH key added.
* Clones the Git repository of the project with the `Git Clone Repository` Step.
* `Bitrise.io Cache:Pull` and `Bitrise.io Cache:Push` Steps. Read more about [caching on Bitrise](/caching/about-caching).
* Deploys build artifacts with the `Deploy to Bitrise.io` Step.

### The `deploy` workflow

The `deploy` workflow is automatically created when adding a new app. It is similar to the [primary workflow](/getting-started/getting-started-workflows#the-primary-workflow) in a number of ways:

* it has the same 'basic' steps
* its specific steps are dependent on the project type

The `deploy` workflow, however, also contains the Steps that "build" the project, and, if the build is successful, produces the necessary artifacts for installing the app or deploying it online. For example, an Android project's `deploy` workflow contains the `Android Build` Step that builds your project with Gradle, and the `Sign APK` Step that creates a signed .apk file which can be deployed to Google Play or installed on test devices.

## Creating your own workflow

It's very simple to create your own workflow with the Workflow Editor. You can create new workflows based on any of the existing ones, or you can simply create an empty workflow and add the steps yourself.

If, for example, you create a workflow based on your `primary` one, it means that it will be created with the exact same Steps as the `primary` workflow.

1. Click the app's `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.
2. Click `+ Workflow`

   ![](/img/addworkflow.png)
3. Select the workflow you want to use as the basis for the new one. Alternatively, choose the `Empty workflow` option to create an empty workflow

   ![Add new workflow](/img/getting-started/add-new-workflow.png)
4. Add the Steps you need to your workflow. Click the `+` symbol between two Steps to insert a Step at that position. Remove Steps you do not need by clicking on the Step and clicking the little trash bin symbol.
5. Click `Save` in the top right corner.

   ![](/img/save.png)

## Chaining workflows together

You can set up multiple workflows to run in succession. The order of these workflows can be rearranged, new workflows can be added to the "chain" and existing workflows can be removed from it at any time.

{% include message_box.html type="important" title="Bitrise Start Build step" content="
Be aware that if you chain workflows together as described in this guide, all the workflows will still run on the same Virtual Machine. However, if you use the `Bitrise Start Build` step as described in [this guide](/builds/triggering-builds/trigger-multiple-workflows), each of the triggered workflows will run on a separate Virtual Machine. "%}

1. Click the app's `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.
2. Open the `WORKFLOW` menu on the left and select a workflow. The default is the `primary` workflow. You can chain workflows before and after the selected workflow.
3. Click `Add Workflow before` to chain a workflow before the currently selected one or click `Add Workflow after` to chain a workflow after the currently selected one.

   ![](/img/chaining.jpg)
4. Click `Save` in the top right corner.

## Rearranging workflows

Once you have a "chain", you can easily rearrange the order of workflows in a drag-and-drop menu.

1. Click the app's `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.
2. Open the `WORKFLOW` menu on the left and select a workflow that is part of a "chain".
3. Click `Rearrange` to bring up a drag-and-drop menu where you can rearrange the workflows of the chain.

   ![](/img/rearrange.png)
4. Click `Save` in the top right corner.

## Renaming workflows

Rename your workflows at any time you feel necessary: it's quick and simple.

1. Click the app's `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.
2. Open the `WORKFLOW` menu on the left and select a workflow.
3. Click `RENAME` next to the name of the workflow.

   ![](/img/rename-workflow.png)
4. Type the new name then click the check mark to save the new name.
5. Click `Save` in the top right corner.