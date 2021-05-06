---
last_modified_at: '2020-05-19T22:00:00.000+00:00'
title: Introduction to Steps
redirect_from:
- getting-started/getting-started-steps/
- "/getting-started/getting-started-steps"
- "/getting-started/builds-and-workflows/getting-started/getting-started-steps"
- "/getting-started/manage-your-bitrise-workflow/"
tag:
- getting-started
- steps
- workflows
- contributors
description: 'Steps are the heart of Bitrise. A Step is a build task: for example,
  the Git Clone Step clones your git repository at the start of a build while the
  Google Play Deploy Step can deploy your finished app to the Play Store.'
summary: Learn the essentials about our Steps and what cool things you can do with
  them.
menu:
  steps-workflows-main:
    weight: 1

---
Steps are the heart of Bitrise. A Step is a build task: for example, the **Git Clone** Step clones your Git repository at the start of a build while the **Google Play Deploy** Step can deploy your finished app to the Play Store.

A Step contains the code that performs the build task. You can configure the inputs and parameters that define the task, and view and reuse the outputs a Step generates. Reusing the output means that another Step can use it as the value of one of its inputs.

Our Steps are defined in YAML format, and written in either bash or Go. [Check out our in-depth guide about how our Steps work](/bitrise-cli/steps).

You can find and check out all our available Steps at any of three locations:

* [The Integrations page](https://www.bitrise.io/integrations)
* [The Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib)
* [The Workflow Editor](/getting-started/getting-started-workflows)

For the purposes of your builds, Steps can be managed directly from the Workflow Editor. You can rearrange them, set their versions, add or remove Steps at any time.

Read on to find out more about working with our Steps!

* [Adding and removing Steps](/steps-and-workflows/adding-removing-steps/)
* [Step versions and inputs](/steps-and-workflows/step-inputs/)
* [Skipping Steps](/steps-and-workflows/skipping-steps/)

Would you like to contribute to our enormous Step Library with your own Step? Check out our guides at [For Contributors](/contributors/contributors-index/).

{% include banner.html banner_text="Let's see your build's Steps" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your build" %}