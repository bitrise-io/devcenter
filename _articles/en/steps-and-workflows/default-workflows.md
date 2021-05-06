---
title: Default Workflows
tag:
- steps
- workflows
- deploy
description: 'When you add a new app on bitrise.io, two Workflows are created automatically.
  These are the primary and the deploy Workflows. '
redirect_from: []
menu:
  steps-workflows-main:
    weight: 13

---
When you add a new app on [bitrise.io](https://www.bitrise.io), one or two Workflows are created automatically, depending on your app. These are the **primary** and the **deploy** Workflows. By default, every code change in your project's repository triggers the **primary** Workflow if the required webhook has been set up.

Triggers can be configured so that any other Workflow (including deploy) is automatically triggered when certain code events happen. For more information, [read some more about build triggers](/builds/triggering-builds/triggering-builds).

## The primary workflow

The **primary** Workflow is automatically created when adding a new app. Once the process of adding the app is over, Bitrise triggers the app's first build automatically: this build runs with the **primary** workflow.

![{{ page.title }}](/img/primarywf.png)

The **primary** Workflow is not the same for every app you create: it contains different Steps depending on the project type. For example, an Android project's **primary** Workflow will include the **Install missing Android SDK components**, the **Android Lint** and the **Android Unit Test** Steps. But overall, **primary** is a basic Workflow that always performs the following actions:

* Activates the SSH key, if one has been added to the app. The step saves it to file and then loads it into the user's ssh-agent with the `ssh-add` command. The Step, by default, does not run if there is no SSH key added.
* Clones the Git repository of the project with the **Git Clone Repository** Step.
* Runs the **Bitrise.io Cache:Pull** and **Bitrise.io Cache:Push** Steps. Read more about [caching on Bitrise](/caching/about-caching).
* Deploys build artifacts with the **Deploy to Bitrise.io** Step.

## The deploy Workflow

The **deploy** Workflow is automatically created when adding a new app if you have tests configured in your app. It is similar to the [primary Workflow](/steps-and-workflows/default-workflows/#the-primary-workflow) in a number of ways:

* It has the same basic steps.
* Its specific steps are dependent on the project type.

The **deploy** Workflow, however, also contains the Steps that build the project, and, if the build is successful, produces the necessary artifacts for installing the app or deploying it online. For example, an Android project's **deploy** Workflow contains the **Android Build** Step that builds your project with Gradle, and the **Android Sign** Step that creates a signed APK which can be deployed to Google Play or installed on test devices.

{% include banner.html banner_text="Check out your app's default workflows!" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your Dashboard" %}