---
last_modified_at: 
tag: []
title: Steps and Workflows
redirect_from: []
description: ''
menu:
  main:
    identifier: steps-workflows-main
    weight: 11

---
## Steps and Workflows overview

Steps and Workflows are the heart of how Bitrise works. A Bitrise build is simply a series of Steps, defined in a Workflow, executed by the Bitrise CLI on our virtual machines (or your own).

A Step contains the code that performs the build task. You can configure the inputs and parameters that define the task, and view and reuse the outputs a Step generates.

When a build of an app is running, the Steps will be executed in the order that is defined in the Workflow.

You can easily move Steps around in a Workflow, you can chain different Workflows together, and you can configure your app so that different branches or code events trigger builds with different Workflows.

* [Introduction to Steps](/steps-and-workflows/getting-started-steps/)
* [Introduction to Workflows](/steps-and-workflows/getting-started-workflows/)

## Video tutorials for Steps and Workflows 

Here's a couple of introductory videos for how Steps and Workflows work on Bitrise: one for Android, one for iOS. For the other platforms, check out our [official channel](https://www.youtube.com/channel/UCpPg789a-SRZrcQ0GoH74KA).

### Configuring Steps and Workflows for Android apps

{% include video.html embed_url="https://www.youtube.com/embed/H_qhsdSo4I8" %}

### Configuring Steps and Workflows for iOS apps 

{% include video.html embed_url="https://www.youtube.com/embed/1oR_vjGdAo0" %}