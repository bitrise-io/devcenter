---
title: Default workflows
tag:
- steps
- workflows
- deploy
summary: 'When you add a new app on bitrise.io, two workflows are created automatically.
  These are the primary and the deploy workflows. '
redirect_from: []
menu:
  steps-workflows-main:
    weight: 13

---
When you add a new app on [bitrise.io](https://www.bitrise.io), one or two workflows are created automatically, depending on your app. These are the `primary` and the `deploy` workflows. By default, every code change in your project's repository triggers the `primary` workflow if the required webhook has been set up.

Triggers can be configured so that any other workflow (including `deploy`) is automatically triggered when certain code events happen. For more information, [read some more about build triggers](/builds/triggering-builds/triggering-builds).

## The primary workflow

The `primary` workflow is automatically created when adding a new app. Once the process of adding the app is over, Bitrise triggers the app's first build automatically: this build runs with the `primary` workflow.

![](/img/primarywf.png)

The `primary` workflow is not the same for every app you create: it contains different Steps depending on the project type. For example, an Android project's `primary` workflow will include the `Install missing Android SDK components`, the `Android Lint` and the `Android Unit Test` Steps. But overall, `primary` is a "basic" workflow that always performs the following actions:

* Activates the SSH key, if one has been added to the app. The step saves it to file and then loads it into the user's ssh-agent with the `ssh-add` command. The step, by default, does not run if there is no SSH key added.
* Clones the Git repository of the project with the `Git Clone Repository` Step.
* Rusn the `Bitrise.io Cache:Pull` and `Bitrise.io Cache:Push` Steps. Read more about [caching on Bitrise](/caching/about-caching).
* Deploys build artifacts with the `Deploy to Bitrise.io` Step.

## The deploy workflow

The `deploy` workflow is automatically created when adding a new app if you have tests configured in your app. It is similar to the [primary workflow](/getting-started/getting-started-workflows#the-primary-workflow) in a number of ways:

* it has the same 'basic' steps
* its specific steps are dependent on the project type

The `deploy` workflow, however, also contains the Steps that "build" the project, and, if the build is successful, produces the necessary artifacts for installing the app or deploying it online. For example, an Android project's `deploy` workflow contains the `Android Build` Step that builds your project with Gradle, and the `Android Sign` Step that creates a signed .apk file which can be deployed to Google Play or installed on test devices.

<div class="banner"> <img src="/assets/images/banner-bg-888x170.png" style="border: none;"> <div class="deploy-text">Check out your app's default workflows!</div> <a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your Dashboard</button></a> </div>