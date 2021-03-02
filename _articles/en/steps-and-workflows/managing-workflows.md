---
changelog: 'New tutorial video about managing your Workflows: learn how name Workflows,
  rearrange them, and chain them together.'
last_modified_at: '2020-04-14'
title: Managing Workflows
tag:
- workflows
- steps
description: 'You can chain multiple Workflows, rearrange the order of Workflows in
  a chain, as well as rename Workflows at any time in the Bitrise Workflow Editor. '
redirect_from: []
summary: ''
menu:
  steps-workflows-main:
    weight: 17

---
{% include video.html embed_url="https://www.youtube.com/embed/8_Fi5-p96zg" %}

You can chain multiple Workflows, rearrange the order of Workflows in a chain, as well as rename Workflows at any time in the Bitrise Workflow Editor.

## Chaining Workflows together

You can set up multiple Workflows to run in succession. The order of these Workflows can be rearranged, new Workflows can be added to the chain and existing Workflows can be removed from it at any time.

{% include message_box.html type="important" title="Bitrise Start Build Step" content="
Be aware that if you chain Workflows together as described in this guide, all the Workflows will still run on the same Virtual Machine. However, if you use the **Bitrise Start Build** Step as described in our [Starting parallel builds with a single trigger ](/builds/triggering-builds/trigger-multiple-workflows) guide, each of the triggered Workflows will run on a separate Virtual Machine. "%}

1. Click the app's **Workflow** tab. Note that you cannot leave the Workflow Editor without either saving or discarding any changes you made.
2. Open the **WORKFLOW** menu on the left and select a Workflow. The default is the **primary** Workflow. You can chain Workflows before and after the selected Workflow.
3. Click **Add Workflow before** to chain a Workflow before the currently selected one or click **Add Workflow after** to chain a Workflow after the currently selected one.

   ![{{ page.title }}](/img/chaining.jpg)
4. Click **Save** in the top right corner.

## Rearranging Workflows

Once you have a chain, you can easily rearrange the order of Workflows in a drag-and-drop menu.

1. Click the app's **Workflow** tab. Note that you cannot leave the Workflow Editor without either saving or discarding any changes you made.
2. Open the **WORKFLOW** menu on the left and select a Workflow that is part of a chain.
3. Click **Rearrange** to bring up a drag-and-drop menu where you can rearrange the Workflows of the chain.

   ![{{ page.title }}](/img/rearrange.png)
4. Click **Save** in the top right corner.

## Renaming Workflows

Rename your Workflows at any time you feel necessary: it's quick and simple.

1. Click the app's **Workflow** tab. Note that you cannot leave the Workflow Editor without either saving or discarding any changes you made.
2. Open the **WORKFLOW** menu on the left and select a Workflow.
3. Click **RENAME** next to the name of the Workflow.
4. Type the new name then click the check mark to save the new name.
5. Click **Save** in the top right corner.

{% include banner.html banner_text="Manage your app's Workflows" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}