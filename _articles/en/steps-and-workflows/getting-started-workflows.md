---
title: Introduction to workflows
redirect_from:
- "/getting-started/getting-started-workflows/"
- "/getting-started/getting-started-workflows"
- "/getting-started/manage-your-workflow/"
tag:
- getting-started
- steps
- workflows
summary: A Bitrise workflow is a collection of Steps. When a build of an app is running,
  the Steps will be executed in the order that is defined in the workflow. Workflows
  can be created, defined and modified in the Workflow Editor.
menu:
  steps-workflows-main:
    weight: 9

---
A Bitrise workflow is a collection of Steps. When a build of an app is running, the Steps will be executed in the order that is defined in the workflow. Workflows can be created, defined and modified in two ways:

* Using the graphical Workflow Editor on [bitrise.io](https://www.bitrise.io)
* Directly editing the `bitrise.yml` file of your project

Ultimately, both methods modify the `bitrise.yml` file - the `Workflow Editor` is simply a friendlier way of doing so!

By default, a single build is a single workflow. But it's also possible to [chain workflows together](/getting-started/getting-started-workflows#chain-workflows-together) so they run in succession, as well as to [trigger multiple workflows to run simultaneously](/builds/triggering-builds/trigger-multiple-workflows).

Read on to find out more about working with workflows!

* [Default workflows](/steps-and-workflows/default-workflows/)
* [Creating a workflow](/steps-and-workflows/creating-workflows/)
* [Managing workflows](/steps-and-workflows/managing-workflows/)