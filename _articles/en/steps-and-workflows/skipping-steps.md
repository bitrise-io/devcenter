---
title: Skipping Steps
tag:
- steps
- workflows
summary: Skip Steps if the previous Step failed or set certain conditions to disable
  Steps in a given Workflow. You can only do the latter by directly editing a .yml
  file.
redirect_from: []
menu:
  steps-workflows-main:
    weight: 7

---
Skip Steps if the previous Step failed or set certain conditions to disable Steps in a given Workflow.

## Skipping the Step if the previous Step failed

You can skip certain Steps in your Bitrise build. There is no point in running, for example, a unit test Step if the previous Step failed to build your app.

Of course, there are examples when it's better to run a Step even if the previous Step failed. For example, if the **Cache:Pull** Step fails, there is no reason not to run the next Step - in fact, if the next Step is one that installs dependencies then it's a very bad idea to skip that Step if pulling the cache is unsuccessful.

![Run if previous step failed](/img/run-if-prev-version.png)

To set a given Step to be skipped if the previous Step failed:

1. Open your app by clicking on the app's name on your [Dashboard](https://app.bitrise.io/dashboard).
2. Click the **Workflow** tab to enter the Workflow Editor.

   Note that you cannot leave the Workflow Editor without either saving or discarding any changes you made.
3. Select the workflow you need in the **WORKFLOW** dropdown menu on the top left.
4. Click the Step you want to skip.
5. On the right, use the toggle to disable the **Run if previous Step failed** option.

## Disabling a Step conditionally

You can also disable a Step by a given condition, or just set it to never run in a specific workflow. The latter can be useful if, for example, you want to keep a Step's exact configuration but not use the Step itself for a while.

This can only be done in `yaml` mode: go to the `bitrise.yml` tab in your app's Workflow Editor and edit the file directly. To read about the specific conditions you can set, check out our [Enabling or disabling a Step conditionally](/tips-and-tricks/disable-a-step-by-condition/) guide.

<div class="banner"> <img src="/assets/images/banner-bg-888x170.png" style="border: none;"> <div class="deploy-text">Let's manage Steps in your build!</div> <a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your build</button></a> </div>