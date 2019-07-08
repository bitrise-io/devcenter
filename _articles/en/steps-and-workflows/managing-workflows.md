---
title: Managing workflows
tag:
- workflows
- steps
summary: 'You can chain multiple workflows, rearrange the order of workflows in a
  chain, as well as rename workflows at any time in the Bitrise Workflow Editor. '
redirect_from: []
menu:
  steps-workflows-main:
    weight: 17

---
You can chain multiple workflows, rearrange the order of workflows in a chain, as well as rename workflows at any time in the Bitrise Workflow Editor.

## Chaining workflows together

You can set up multiple workflows to run in succession. The order of these workflows can be rearranged, new workflows can be added to the "chain" and existing workflows can be removed from it at any time.

{% include message_box.html type="important" title="Bitrise Start Build step" content="
Be aware that if you chain workflows together as described in this guide, all the workflows will still run on the same Virtual Machine. However, if you use the `Bitrise Start Build` step as described in our [Starting parallel builds with a single trigger ](/builds/triggering-builds/trigger-multiple-workflows) guide, each of the triggered workflows will run on a separate Virtual Machine. "%}

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

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Manage your app's workflows</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>