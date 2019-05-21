---
title: Introduction to Steps
redirect_from:
- "/getting-started/builds-and-workflows/getting-started/getting-started-steps"
- "/getting-started/manage-your-bitrise-workflow/"
menu:
  steps-workflows:
    weight: 1

---
Steps are the heart of Bitrise. A Step is a build task: for example, the `Git Clone` Step clones your git repository at the start of a build while the `Google Play Deploy` Step can deploy your finished app to the Play Store.

A Step contains the code that performs the build task. You can configure the inputs and parameters that define the task, and view and reuse the outputs a Step generates. Reusing the output means that another Step can use it as the value of one of its inputs.

Our Steps are defined in YAML format, and written in either bash or Go. [Check out our in-depth guide about how our Steps work](/bitrise-cli/steps).

You can find and check out all our available Steps at any of three locations:

* The Integrations page
* The Bitrise StepLib
* The [Workflow Editor](/getting-started/getting-started-workflows)

For the purposes of your builds, Steps can be managed directly from the Workflow Editor. You can:

* Add and remove Steps in workflows.
* Rearrange the order of Steps in any workflow.
* Specify the version of the Step you wish to run in a given workflow.
* Specify the inputs of the Steps you need.
* Set a Step to run only if the previous Step succeeded.
