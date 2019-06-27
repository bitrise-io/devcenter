---
tag: []
title: Steps and Workflows
redirect_from: []
summary: ''
menu:
  main:
    identifier: steps-workflows-main
    weight: 5

---
Steps and Workflows are the heart of how Bitrise works. A Bitrise build is simply a series of Steps, defined in a Workflow, executed by the Bitrise CLI on our virtual machines (or on your own).

A Step contains the code that performs the build task. You can configure the inputs and parameters that define the task, and view and reuse the outputs a Step generates.

When a build of an app is running, the Steps will be executed in the order that is defined in the workflow.

You can easily move Steps around in a Workflow, you can chain different Workflows together, and you can configure your app so that different branches or code events trigger builds with different Workflows.

* [Introduction to Steps](/steps-and-workflows/getting-started-steps/)
* [Introduction to Workflows](/steps-and-workflows/getting-started-workflows/)
