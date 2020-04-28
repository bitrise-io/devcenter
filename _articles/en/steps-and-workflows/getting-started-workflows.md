---
changelog:
published_at:
last_modified_at:
title: Introduction to Workflows
redirect_from:
- "/getting-started/getting-started-workflows/"
- "/getting-started/getting-started-workflows"
- "/getting-started/manage-your-workflow/"
tag:
- getting-started
- steps
- workflows
description: A Bitrise Workflow is a collection of Steps. When a build of an app is
  running, the Steps will be executed in the order that is defined in the Workflow.
  Workflows can be created, defined and modified in the Workflow Editor.
menu:
  steps-workflows-main:
    weight: 11

---
A Bitrise Workflow is a collection of Steps. When a build of an app is running, the Steps will be executed in the order that is defined in the Workflow. Workflows can be created, defined and modified in two ways:

* Using the graphical Workflow Editor on [bitrise.io](https://www.bitrise.io).
* Directly editing the `bitrise.yml` file of your project.

Ultimately, both methods modify the `bitrise.yml` file - the **Workflow Editor** is simply a friendlier way of doing so!

By default, a single build is a single Workflow. But it's also possible to [chain Workflows together](/getting-started/getting-started-Workflows#chain-workflows-together) so they run in succession, as well as to [trigger multiple Workflows to run simultaneously](/builds/triggering-builds/trigger-multiple-workflows).

Read on to find out more about working with Workflows!

* [Default Workflows](/steps-and-workflows/default-workflows/)
* [Creating a Workflow](/steps-and-workflows/creating-workflows/)
* [Managing Workflows](/steps-and-workflows/managing-workflows/)

<div class="banner"> <img src="/assets/images/banner-bg-888x170.png" style="border: none;"> <div class="deploy-text">Let's go to your build!</div> <a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your build</button></a> </div>