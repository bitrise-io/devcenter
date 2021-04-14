---
tag: []
title: Migrating from Jenkins to Bitrise
redirect_from: []
summary: ''
published: false

---
If you have been looking to switch from [Jenkins](https://www.jenkins.io/) to Bitrise to speed up your mobile CI/CD flow and ease dedicated manpower, look no further. This guide introduces the most important Bitrise features and how you can quickly settle into Bitrise from your Jenkins world.

## Why bother migrating?

Jenkins is a self-hosted CI server where you have to manually install and maintain most of the functionalities before you could run any build and also requires dedicated manpower for regular maintenance. When you switch to Bitrise, you get to experience the comfort of using a cloud-based, mobile first CI/CD platform which offers out-of-the box functionalities for all your mobile development needs on one platform. This means there is:

* No need to download anything.
* No need for any on-premise servers or plugins.
* No need to worry about infrastructure, tools and virtualization.

Bitrise takes care of all of the above. We have a vast array of automatized Steps, [API](/api/api-index/), [CLI](/bitrise-cli/index/), [up-to-date Stacks ](https://github.com/bitrise-io/bitrise.io/tree/master/system_reports) and add-ons with a highly intuitive GUI, called Workflow Editor, all available at your fingertips.

Check out the world of automated mobile development with Bitrise!

{% include message_box.html type="info" title="Looking for more evidence on how Bitrise helped other companies switching from Jenkins?" content="Learn how [EPAM, Nextdoor, Pulselive, Delivery Hero, Signify, and more](https://www.bitrise.io/bitrise-vs-jenkins) have switched from Jenkins to Bitrise. "%}

## Projects on Jenkins and Bitrise

A project on Bitrise is the synonym of an application. When you [add an app to Bitrise](/getting-started/adding-a-new-app/), you connect your Git repository to Bitrise. Then the Bitrise project scanner detects your project type and crafts a default configuration. Once the process completes, your project is available on Bitrise. From this point on, we call it an app.

Most Jenkins users work with Jenkins Pipeline or Freestyle project (besides other available project types). There is no such project difference in Bitrise. Every time you connect an app to Bitrise, we automatically create a basic configuration file, called [bitrise.yml](/bitrise-cli/basics-of-bitrise-yml/), and immediately trigger a build with that configuration. Should you need to modify your project’s repository URL (due to, for example, a repository name or URL change) you can easily change it on your app’s **Settings** page.

When using Jenkins, you can configure your Pipeline or Freestyle project, through the classic UI, to some extent, or more so through the Blue Ocean plugin or directly through the Jenkinsfile. To get a more enjoyable developer experience, you might lean onto using Blue Ocean, depending on your preference. If using the Blue Ocean plugin, you first have to install it. In Bitrise, there is no need to install anything to enjoy an intuitive, mobile developer friendly UI that visualizes your Workflow with the necessary tools right off the bat at your fingertips.

#### Out-of-box support for platforms

Bitrise supports [native and cross-platform apps](/getting-started/index/) out of the box and detects your project type automatically: [iOS](/getting-started/getting-started-with-ios-apps/), [Android](/getting-started/getting-started-with-android-apps/), [Ionic / Cordova](/getting-started/getting-started-with-ionic-cordova-apps/), [React Native](/getting-started/getting-started-with-react-native-apps/), [Flutter](/getting-started/getting-started-with-flutter-apps/), [Xamarin](/getting-started/getting-started-with-xamarin-apps/), [MacOS](/getting-started/getting-started-with-macos-apps/), and [Expo](/getting-started/getting-started-with-expo-apps/). No need to painfully select and install machines and plugins to run your preferred app type.

Check out your apps listed under **APPS** on your Dashboard.

{% include message_box.html type="note" title="Your code is safe with us" content="To guarantee the security of your builds we use clean [virtual machines](/infrastructure/virtual-machines) for every builds. This means that every build runs in its own, clean virtual machine and we discard the whole virtual machine after the build finishes, erasing every file your build (except for artifacts) uses and every change you make during your build. Learn more about [code security](/getting-started/code-security/)."%}

## Quick Start Guide

This Quick Start Guide helps you start your first build on Bitrise with minimum config.

1. [Sign up](/getting-started/signing-up-to-bitrise/) to Bitrise if you don’t have an account yet.
2. [Connect a repo ](/getting-started/adding-a-new-app/) and run an automatically configured standard Workflow on any project.
3. Once you’ve looked through the generated YML, make the changes you need: if you’re opting for a custom code, pop it into our [Script Step](https://www.bitrise.io/integrations/steps/script), and run your first build. Or find the Steps in our [Step Library](/getting-started/signing-up-to-bitrise/) to replicate your Jenkinsfile’s behaviors.
4. After getting to your new Workflow’s first green build, setup other jobs based on, for example, [triggers](/builds/triggering-builds/triggering-builds-index/) and [scheduled builds](/builds/Scheduling-Builds/).
5. Optimize your Workflows with Steps like Bitrise.io Cache Pull and Bitrise.io Cache Push
6. Need help? [Contact us](https://support.bitrise.io/hc/en-us).

If you are interested in the main Jenkins-Bitrise differences and how Bitrise enhance your mobile development process, then browse through the guide below.

## Managing Builds in Jenkins and Bitrise

A build on Bitrise is the process specified by the app’s Workflow. It is a series of Steps, defined in a Workflow, executed by the [Bitrise CLI](https://devcenter.bitrise.io/bitrise-cli/index/ "https://devcenter.bitrise.io/bitrise-cli/index/") on a clean virtual machine or locally on your machine. You can check your app’s builds on the Bitrise **Dashboard** or [analyze your builds](https://devcenter.bitrise.io/builds/build-logs/ "https://devcenter.bitrise.io/builds/build-logs/") log on your app’s own **Builds** page. If you’re looking to view or download your artifacts after a successful build run, check out [build artifacts online](https://devcenter.bitrise.io/builds/build-artifacts-online/ "https://devcenter.bitrise.io/builds/build-artifacts-online/").

Let’s see what you can do with builds on Bitrise:

### Triggering builds on Jenkins and Bitrise

In this section we describe how you can trigger builds on Bitrise:

* The **Build Now** function in Jenkins corresponds with [manually triggering builds on Bitrise](https://devcenter.bitrise.io/builds/Starting-builds-manually/ "https://devcenter.bitrise.io/builds/Starting-builds-manually/"): click the **Start/Schedule a Build** button on your builds page and either simply start a new build or tinker away with the [**Advanced** options](https://devcenter.bitrise.io/builds/Starting-builds-manually/#advanced-configuration "https://devcenter.bitrise.io/builds/Starting-builds-manually/#advanced-configuration").
* The **Build periodically** function of Jenkins is the [**Schedule this build** function on Bitrise](https://devcenter.bitrise.io/builds/Scheduling-Builds/ "https://devcenter.bitrise.io/builds/Scheduling-Builds/"). A big advantage of Bitrise is that you don’t have to set up a [cron](https://en.wikipedia.org/wiki/Cron#CRON_expression "https://en.wikipedia.org/wiki/Cron#CRON_expression") job, like you would in Jenkins, to schedule a specific time. Instead, select a day/s from the timeline and type an hour and month. No confusion over cron expressions any more!
* Builds on Bitrise can run [parallel](https://devcenter.bitrise.io/builds/triggering-builds/trigger-multiple-workflows/ "https://devcenter.bitrise.io/builds/triggering-builds/trigger-multiple-workflows/") if you/your Org have more than one concurrency. Or switch to our [Velocity plan](https://www.bitrise.io/pricing "https://www.bitrise.io/pricing") to run limitless builds in parallel while having access to the best, fastest compute options available on our public MacOS and Linux cloud.
* For any Git related events, such as code push, pull requests, and Git tags, or [trigger map](https://devcenter.bitrise.io/builds/triggering-builds/trigger-map/ "https://devcenter.bitrise.io/builds/triggering-builds/trigger-map/"), you can use the [**Triggers**](https://devcenter.bitrise.io/builds/triggering-builds/trigger-map/ "https://devcenter.bitrise.io/builds/triggering-builds/trigger-map/") page on Bitrise.
* The **Build after other projects** function of Jenkins is equivalent to the [chaining Workflows feature](https://devcenter.bitrise.io/steps-and-workflows/managing-workflows/#chaining-workflows-together "https://devcenter.bitrise.io/steps-and-workflows/managing-workflows/#chaining-workflows-together") on Bitrise where the Workflows run in [succession](https://devcenter.bitrise.io/steps-and-workflows/managing-workflows/#chaining-workflows-together "https://devcenter.bitrise.io/steps-and-workflows/managing-workflows/#chaining-workflows-together"). It’s surprisingly easy to chain Workflows together on Bitrise.
* You can trigger builds by any other remote system: use our [Webhooks](https://devcenter.bitrise.io/webhooks/webhooks-index/ "https://devcenter.bitrise.io/webhooks/webhooks-index/"). We’re integrated with GitHub, Gitlab, Bitbucket, Gogs, Slack, Visual Studio, Assembla, Develo.
* You can also [push back build status reports](https://devcenter.bitrise.io/builds/triggering-builds/status-reporting/ "https://devcenter.bitrise.io/builds/triggering-builds/status-reporting/") to your Git provider (GitHub/GitLab/Bitbucket).

### Environment Variables and Secrets

Environment Variables (a key and value pair) can be defined on app, Workflow and Steps level. There are certain Env Vars that are [exposed by the Bitrise CLI](https://devcenter.bitrise.io/builds/available-environment-variables/#exposed-by-the-bitrise-cli "https://devcenter.bitrise.io/builds/available-environment-variables/#exposed-by-the-bitrise-cli") and ones which are [only exposed by bitrise.io](https://devcenter.bitrise.io/builds/available-environment-variables/#exposed-by-bitriseio "https://devcenter.bitrise.io/builds/available-environment-variables/#exposed-by-bitriseio").

There are a bunch of [cool stuff you can do with Env Vars](https://devcenter.bitrise.io/tips-and-tricks/expose-environment-variable/ "https://devcenter.bitrise.io/tips-and-tricks/expose-environment-variable/"), for example:

* Expose them and reuse them in another Step.
* Copy an Env Var to another key.
* Overwrite an Env Var.
* Parameterize a build by adding a custom Env Vars to a build.link
* Set up Workflow-specific Env Vars on the **Env Vars** tab to run Workflows with Env Vars that are only available for that particular Workflow.

**Secrets** are a type of Environment Variables but special ones. They hide sensitive information such as in an encrypted format so that your private input is not exposed in the build logs or in the bitrise.yml. Secret Environment Variables, or **Secrets** in short, can be set by adding a key and the variable in the **Secrets** tab of the Workflow Editor. This is again an built-in feature of Bitrise which ensures the following:

* Your secrets are not shown in the bitrise.yml.
* Your secrets are stored encrypted.
* You can prevent exposing secrets on the UI by making them protected.
* Note that anyone might be able to do a workaround and log the value of secrets with a pull request, thus we advise **not to expose secrets in PRs.**

Learn more about Secrets:

* [Sensitive input in public apps](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/ "https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/")
* [Secrets in depth](https://devcenter.bitrise.io/bitrise-cli/secrets/ "https://devcenter.bitrise.io/bitrise-cli/secrets/")

### Caching

Every build on Bitrise runs on a clean virtual machine but it does not mean you have to do everything from scratch - you can [cache](https://devcenter.bitrise.io/builds/caching/about-caching-index/ "https://devcenter.bitrise.io/builds/caching/about-caching-index/") contents of important files and preserve them between builds.

Learn more about [builds](https://devcenter.bitrise.io/builds/builds-index/ "https://devcenter.bitrise.io/builds/builds-index/") in Bitrise.

## Jenkins plugins and Bitrise Steps

A [Step](https://devcenter.bitrise.io/steps-and-workflows/getting-started-steps/ "https://devcenter.bitrise.io/steps-and-workflows/getting-started-steps/") is a pre-defined task in Bitrise just like the Jenkins Steps, however, a Bitrise Step can be easily configured on our intuitive UI or you can even pull in your own Step from your repository. You can configure the inputs and parameters that define a Step task, and view/reuse the outputs a Step generates. Reusing the output means that another Step in the same Workflow can use it as the value of one of its inputs.

### Advantage of using Bitrise Steps

As being a continuous integration tool itself, Jenkins integrates with other services with the help of plugins. Jenkins users have to manage plugins in a centralized place, called **Manage plugins**, install them globally (on their Jenkins server), then use them in their specific projects. If Jenkins notifies of a newer plugin version, Jenkins admins have to double check with teams if they’re running any builds since updating a plugin requires the server to restart. With Jenkins plugins, reverting to an older version is not possible, since only the latest version is available. In Bitrise, however, you do not have to install any Steps first, because you can add or remove any Step in your Bitrise Workflow at any time as you wish and it won’t block any running builds of the project. You can always revert back to a previous Step version too if that’s what you need.

What’s more: When editing your Workflow in the **Workflow Editor**, you can easily search for a Step based on functionality or platform you are looking for in the **Step Library** and add it to your Workflow straightaway - there is no need to install them prior to setting up your Workflow.

You can create your own custom Step too and store in a repository, then you can reference it by a URL in your Workflow.

A Step jolly joker: Bitrise Script Step

Do you have a custom script you’d like to run in your Workflow? Select the **Script** Step from the Step Library and add your custom code to the **Script content** input. Learn more about[ configuring the Step and some troubleshooting tips](https://www.bitrise.io/integrations/steps/script "https://www.bitrise.io/integrations/steps/script").

Discover our Steps on our [Integrations](https://www.bitrise.io/integrations/steps "https://www.bitrise.io/integrations/steps") page or right when editing your Workflow.

Learn what else you can do with Steps:

* Adding and removing Steps [https://devcenter.bitrise.io/steps-and-workflows/adding-removing-steps/](https://devcenter.bitrise.io/steps-and-workflows/adding-removing-steps/ "https://devcenter.bitrise.io/steps-and-workflows/adding-removing-steps/")
* Step versions and inputs [https://devcenter.bitrise.io/steps-and-workflows/step-inputs/](https://devcenter.bitrise.io/steps-and-workflows/step-inputs/ "https://devcenter.bitrise.io/steps-and-workflows/step-inputs/")
* Skipping Steps [https://devcenter.bitrise.io/steps-and-workflows/skipping-steps/](https://devcenter.bitrise.io/steps-and-workflows/skipping-steps/ "https://devcenter.bitrise.io/steps-and-workflows/skipping-steps/")
* Enabling or disabling a Step conditionally [https://devcenter.bitrise.io/steps-and-workflows/disable-a-step-by-condition/](https://devcenter.bitrise.io/steps-and-workflows/disable-a-step-by-condition/ "https://devcenter.bitrise.io/steps-and-workflows/disable-a-step-by-condition/")
* Editing a Step in bitrise.yml [https://devcenter.bitrise.io/bitrise-cli/steps/](https://devcenter.bitrise.io/bitrise-cli/steps/ "https://devcenter.bitrise.io/bitrise-cli/steps/")
* For contributors who wish to create and submit a Step to Bitrise [https://devcenter.bitrise.io/contributors/contributors-index/](https://devcenter.bitrise.io/contributors/contributors-index/ "https://devcenter.bitrise.io/contributors/contributors-index/")

Using fastlane in Jenkins?

You can easily put your fastlane lanes to work on Bitrise too. All you have to do is add a Bitrise’s [**Fastlane**](https://www.bitrise.io/integrations/steps/fastlane "https://www.bitrise.io/integrations/steps/fastlane") Step to your Workflow and add your lane name into the Step. Start a build and your lane will run on Bitrise.

## Jenkins Pipeline - Bitrise Workflow

A Jenkins Pipeline is equal to a Bitrise [Workflow](https://devcenter.bitrise.io/steps-and-workflows/getting-started-workflows/ "https://devcenter.bitrise.io/steps-and-workflows/getting-started-workflows/"), but the Bitrise Workflows are much easier to manage: you can quickly create new Workflows based on existing ones, chain multiple Workflows together in a single build, or delete Workflows that you no longer need

A Bitrise **Workflow** is a series of Steps, such as test, code sign, build APK/ ipa and deploy. When you add an app to Bitrise, a primary Workflow, created based on the project scanner’s findings, gets kicked off/triggered automatically.

Tips on using Workflows on Bitrise

You can have several Workflows for a certain project based on the for what purpose you’d want to run the Workflow. For example:

* For any PR events, create a Workflow that, once triggered, runs quickly and only executes basic tests such as smoke tests.
* For a meatier Workflow, that runs all your test, we recommend creating another Workflow and run it overnight or schedule it on 6/12/24 hour interval.

### Workflow Editor

The **Workflow Editor** is the main place for configuring your Workflow. Jenkins **Stages** are equal to multiple Bitrise Workflows chained together inside a main Workflow. On Bitrise the Workflow Editor helps you to chain Workflows like one would chain toy trains after each other.

The Workflow Editor has other powerful features built in to assist you with mobile development:

* [Code signing](https://devcenter.bitrise.io/code-signing/code-signing-index/ "https://devcenter.bitrise.io/code-signing/code-signing-index/"): one place to store and manage all your code signing files which then will be used by the Workflow. Again, no need for installing a code signing tool first like in Jenkins. You can store any custom file here too (in the **GENERIC FILE STORAGE** section) which the [Generic File Storage](https://www.bitrise.io/integrations/steps/generic-file-storage "https://www.bitrise.io/integrations/steps/generic-file-storage") Step can download.
* [Secrets](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/ "https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/"): check out your app’s secret Environment Variables here or add them.
* [Env Vars](https://devcenter.bitrise.io/builds/available-environment-variables/ "https://devcenter.bitrise.io/builds/available-environment-variables/"): there is no confusion of secrets and Env Vars in Bitrise. They are neatly organized into separate tabs so that you know where’s what. Add App Env Vars or Workflow specific Env Vars here. You can also reference Secrets as Env Vars with $.
* [Triggers](https://devcenter.bitrise.io/builds/triggering-builds/triggering-builds-index/ "https://devcenter.bitrise.io/builds/triggering-builds/triggering-builds-index/"): You can configure triggers: code push events, pull requests, or tags can all be set up to automatically start builds on Bitrise.
* [Stack](https://devcenter.bitrise.io/infrastructure/available-stacks/ "https://devcenter.bitrise.io/infrastructure/available-stacks/"): Check out the default stack of your app, select a new one from a dropdown menu or select a specific stack for one of your Workflows.

There’s a bunch of other Workflow management tasks you can do with Workflow, check them out:

* Default Workflows [https://devcenter.bitrise.io/steps-and-workflows/default-workflows/](https://devcenter.bitrise.io/steps-and-workflows/default-workflows/ "https://devcenter.bitrise.io/steps-and-workflows/default-workflows/")
* Creating a Workflow [https://devcenter.bitrise.io/steps-and-workflows/creating-workflows/](https://devcenter.bitrise.io/steps-and-workflows/creating-workflows/ "https://devcenter.bitrise.io/steps-and-workflows/creating-workflows/")
* Managing Workflows [https://devcenter.bitrise.io/steps-and-workflows/managing-workflows/](https://devcenter.bitrise.io/steps-and-workflows/managing-workflows/ "https://devcenter.bitrise.io/steps-and-workflows/managing-workflows/")
* Copying one Workflow from one app to another [https://devcenter.bitrise.io/steps-and-workflows/copying-workflows-from-one-app-to-another/](https://devcenter.bitrise.io/steps-and-workflows/copying-workflows-from-one-app-to-another/ "https://devcenter.bitrise.io/steps-and-workflows/copying-workflows-from-one-app-to-another/")

## Dashboards in Jenkins and Bitrise

This is the main landing page where you find yourself once you start your first build. If you start using Bitrise more, you will see a list of your latest, queued builds and your installed projects along with your own profile and the Organization/s you are member of - all on one page.

The **LATEST BUILDS** tab on your Bitrise Dashboard displays all recent builds similarly to the **Build history** feature in Jenkins. You can filter for any status: successful, aborted, failed, and running but each build displays their statuses anyway.

On Jenkins, build statuses are listed in the **Build Executor Status** or on the Blue Ocean **Dashboard**. When using Bitrise you get a user-friendly graphical interface right from the start whereas, with Jenkins, you have to install the plugin first. Bitrise build statuses are shown on both the **Dashboard**, and on the **Builds** page of your app.

**Build Queue** on Jenkins is the **Queued Builds** on Bitrise. You can schedule builds to queue them with the **Advanced** option of the [Schedule builds f](https://devcenter.bitrise.io/builds/Scheduling-Builds/#managing-a-scheduled-build "https://devcenter.bitrise.io/builds/Scheduling-Builds/#managing-a-scheduled-build")eature.

On the right side of the Dashboard, you can see all your apps under **APPS**.

### Adding a new app to Bitrise

What **New item** means in Jenkins, is the **adding a new app flow**, either by the [web UI](https://devcenter.bitrise.io/getting-started/adding-a-new-app/ "https://devcenter.bitrise.io/getting-started/adding-a-new-app/") or from [any CLI](https://devcenter.bitrise.io/getting-started/adding-an-app-from-a-cli/ "https://devcenter.bitrise.io/getting-started/adding-an-app-from-a-cli/"). This is a highly automated flow where minimal configuration is needed from you and literally within a minute your new build kicks off. Our flow takes you through all the important phases: setting privacy, connecting your repository, setting up repository access, choosing a branch, configuring your app, setting up your build configuration and [setting up a webhook](https://devcenter.bitrise.io/webhooks/adding-webhooks/ "https://devcenter.bitrise.io/webhooks/adding-webhooks/").

### Webhooks

Bitrise makes extensive use of webhooks, which you can enable with a simple click when connecting an app to Bitrise. It all makes sense to add the webhook during the initial setup and not having to search for this functionality when you try to quickly get your app to speed.

In short, there are two types of Webhooks:

* Incoming webhooks, registered with your Git service provider, are used to automatically trigger builds on Bitrise.
* Outgoing webhooks are used to send reports of build events to other services, such as Slack. They can be added either on the website or [via the Bitrise API](https://devcenter.bitrise.io/api/incoming-and-outgoing-webhooks/#outgoing-webhooks/ "https://devcenter.bitrise.io/api/incoming-and-outgoing-webhooks/#outgoing-webhooks/").

Learn more about [Webhooks](https://devcenter.bitrise.io/webhooks/webhooks-index/ "https://devcenter.bitrise.io/webhooks/webhooks-index/").

## Jenkins plugins - Bitrise Add-ons

Add-ons are like cherry on the cake. They take Bitrise's functionality to the next level by recruiting the already existing data on Bitrise and providing extra services in testing, deployment, monitoring, reporting, security and utility. Add-ons blend in nicely into the Bitrise ecosystem since they act as individual galaxies in the big Bitrise universe.

Bitrise add-ons don’t have to be installed and updated like Jenkins plugins - they are available out of the box and come for free. They have their own page which you can access either from the Dashboard or through your **Builds** page. Let’s have a closer look.

* **Trace**: Monitor your apps from the end users' perspective and get data on performance monitoring and possible issues. Access Trace through your Dashboard or from your build’s **Add-ons** tab. [https://devcenter.bitrise.io/monitoring/trace-index/](https://devcenter.bitrise.io/monitoring/trace-index/ "https://devcenter.bitrise.io/monitoring/trace-index/")
* **Test Reports**: a neatly organized collection of all your test reports on one place. Access Test Reports from your build’s **Add-ons** tab. [https://devcenter.bitrise.io/testing/test-reports/](https://devcenter.bitrise.io/testing/test-reports/ "https://devcenter.bitrise.io/testing/test-reports/")
* **Ship**: Manage your app’s distribution, version history and metadata from one place. Access Ship from your build’s Add-ons page. [https://devcenter.bitrise.io/deploy/ship/](https://devcenter.bitrise.io/deploy/ship/ "https://devcenter.bitrise.io/deploy/ship/")
* **Rolling Builds**: No need for manually aborting a build any more! With Rolling Builds, the previous builds of your app can be automatically aborted once a new one is started. Access Rolling Builds from your build’s Add-ons page. [https://devcenter.bitrise.io/builds/rolling-builds/](https://devcenter.bitrise.io/builds/rolling-builds/ "https://devcenter.bitrise.io/builds/rolling-builds/")

## Jenkinsfile - Bitrise YAML

A Jenkins Pipeline uses groovy code, while Bitrise uses the more highly structured YAML format. All Workflows are defined in the bitrise.yml file in yml format, which you can [edit](https://devcenter.bitrise.io/builds/bitrise-yml-online/#editing-and-downloading-bitriseyml-online "https://devcenter.bitrise.io/builds/bitrise-yml-online/#editing-and-downloading-bitriseyml-online") by clicking the bitrise.yml tab of the Workflow Editor.

You can[ store and manage](https://devcenter.bitrise.io/builds/bitrise-yml-online/#storing-the-bitriseyml-file-in-your-repository "https://devcenter.bitrise.io/builds/bitrise-yml-online/#storing-the-bitriseyml-file-in-your-repository") the bitrise.yml file of your app either on [bitrise.io](http://bitrise.io/ "http://bitrise.io") or in your repository. Don’t worry, your secrets (for example, credentials and IDs) are safe with us.

You can also download the current bitrise.yml configuration of your app and run it locally with the [Bitrise CLI](https://devcenter.bitrise.io/bitrise-cli/index/ "https://devcenter.bitrise.io/bitrise-cli/index/").

### Jenkinsfile - Bitrise yml file comparison

If you have been using a Jenkinsfile (Pipeline project) in Jenkins and decided to switch to Bitrise, you can easily match Jenkinsfile stages with Bitrise Steps. If you have been using the old-school free style project, then you have to map your configuration’s settings with a matching Bitrise Step or a Bitrise function. For example, match the **Build** section of your freestyle project with a Bitrise build Step, such as the **Android Build** Step, or map the **Build Trigger** section of Jenkins with the **Triggers** function of Bitrise. Make sure you check out our [Step Library](https://www.bitrise.io/integrations/steps "https://www.bitrise.io/integrations/steps") for more inspiration.

### bitrise.yml templates

Here you can find recommended iOS, Android and cross-platform sample projects that you can use as your jumping off point when crafting your first Bitrise project.

#### iOS

#### Android

#### React Native

A simple React Native setup:

#### Flutter

A simple Flutter setup:

## Master and agent on Jenkins - Bitrise Stacks

A stack is the type of virtual machine we use to run your build. For example, for a native iOS app, the best stack is one of our Xcode stacks. Stacks come with all of the necessary tools pre-installed, and are regularly updated to make sure they will serve all of your needs. This way you don’t have to bother with maintaining master and agent instances or adding a node machine to your groovy code to run a build on a certain platform.

### How do stacks work on Bitrise?

When you add your app to Bitrise, our project selector automatically detects the type of your project and based on its platform type, adds a default stack to it. Your first build will run on this stack, which is a virtual machine with all the required tools pre-installed on it. Should you wish to use another stack, you can simply select it from the **Default Stack** dropdown menu on the **Stack** tab. If you click the **More information** link, you can see the preinstalled tools with their versions.

We support the latest Xcode version shortly after its official release.

System reports

In our [system reports](https://github.com/bitrise-io/bitrise.io/tree/master/system_reports "https://github.com/bitrise-io/bitrise.io/tree/master/system_reports") you can check the installed tools and their versions on each stack.

Learn more about our [Stack update and removal policy](https://devcenter.bitrise.io/infrastructure/stack-update-and-removal-policy/ "https://devcenter.bitrise.io/infrastructure/stack-update-and-removal-policy/").

## People management in Jenkins and Bitrise

What you have on the **People** page of Jenkins can be found in two places on Bitrise (depending on if you have a team or an Organization set up).

* You can see your team members on the **Teams** tab of your app.
* You can see the Organization members if you click the Account Settings, then select and Organization and find the **People** tab on the left.

The purpose of Organizations is to make it easier to manage several people working on different apps on Bitrise. [Organizations can own an unlimited number of apps](https://devcenter.bitrise.io/team-management/organizations/managing-apps/ "https://devcenter.bitrise.io/team-management/organizations/managing-apps/"), and Organization owners can assign Organization members to work on different apps as they see fit.

A **Team** on Bitrise means all the users who work on the same app: they make up the app’s team, and you can manage them on the app’s Teams tab

On the **Groups** tab you can manage Org members such as delete, add a new member to the group, assign a group to apps and rename a group. On the **People** tab you can see who is already added to the Org and, if needed, you can remove a member from all groups of the Organization.

Organizations consist of groups: Organization owners [can create groups and decide which members belong to which groups](https://devcenter.bitrise.io/team-management/organizations/members-organizations/ "https://devcenter.bitrise.io/team-management/organizations/members-organizations/"). A given group can be assigned to work on an app: all members of the same group will have the same level of access to the app.

Learn more about[ Organizations and Teams](https://devcenter.bitrise.io/team-management/teams-vs-organizations-index/ "https://devcenter.bitrise.io/team-management/teams-vs-organizations-index/").

### Integrated SSO management on Bitrise

While in Jenkins you have to install an authorization plugin for SSO management, in Bitrise it comes as an integral part of the[ Org Elite and Velocity plans](https://www.bitrise.io/pricing "https://www.bitrise.io/pricing"). Organization with such plans can set up SAML SSO as their single gateway to their Org on Bitrise. No more remembering usernames and credentials! All the Org owner has to do is set up Bitrise as a SAML SSO app on the SAML SSO provider and invite Org members to the Bitrise Org. We have specific guides to the different SAML SSO providers to guide you through the steps.

Learn more about SAML SSO setup:

* SAML SSO in Organizations [https://devcenter.bitrise.io/team-management/organizations/saml-sso-in-organizations/](https://devcenter.bitrise.io/team-management/organizations/saml-sso-in-organizations/ "https://devcenter.bitrise.io/team-management/organizations/saml-sso-in-organizations/")
  * Setting up Google SSO for Bitrise [https://devcenter.bitrise.io/team-management/organizations/setting-up-google-sso-for-bitrise/](https://devcenter.bitrise.io/team-management/organizations/setting-up-google-sso-for-bitrise/ "https://devcenter.bitrise.io/team-management/organizations/setting-up-google-sso-for-bitrise/")
  * Setting up AD FS SSO for Bitrise [https://devcenter.bitrise.io/team-management/organizations/setting-up-ad-fs-sso-for-bitrise/](https://devcenter.bitrise.io/team-management/organizations/setting-up-ad-fs-sso-for-bitrise/ "https://devcenter.bitrise.io/team-management/organizations/setting-up-ad-fs-sso-for-bitrise/")
  * Setting up Azure AD SSO for Bitrise [https://devcenter.bitrise.io/team-management/organizations/setting-up-azure-ad-sso-for-bitrise/](https://devcenter.bitrise.io/team-management/organizations/setting-up-azure-ad-sso-for-bitrise/ "https://devcenter.bitrise.io/team-management/organizations/setting-up-azure-ad-sso-for-bitrise/")
  * Setting up Idaptive SAML SSO for Bitrise [https://devcenter.bitrise.io/team-management/organizations/setting-up-auth0-sso-for-bitrise/](https://devcenter.bitrise.io/team-management/organizations/setting-up-auth0-sso-for-bitrise/ "https://devcenter.bitrise.io/team-management/organizations/setting-up-auth0-sso-for-bitrise/")
  * Setting up Okta SSO for Bitrise [https://devcenter.bitrise.io/team-management/organizations/setting-up-okta-sso-for-bitrise/](https://devcenter.bitrise.io/team-management/organizations/setting-up-okta-sso-for-bitrise/ "https://devcenter.bitrise.io/team-management/organizations/setting-up-okta-sso-for-bitrise/")
  * Setting up Ping Identity SSO for Bitrise [https://devcenter.bitrise.io/team-management/organizations/setting-up-pingone-saml-sso-for-bitrise/](https://devcenter.bitrise.io/team-management/organizations/setting-up-pingone-saml-sso-for-bitrise/ "https://devcenter.bitrise.io/team-management/organizations/setting-up-pingone-saml-sso-for-bitrise/")
  * Setting up OneLogin SSO for Bitrise [https://devcenter.bitrise.io/team-management/organizations/setting-up-onelogin-sso-for-bitrise/](https://devcenter.bitrise.io/team-management/organizations/setting-up-onelogin-sso-for-bitrise/ "https://devcenter.bitrise.io/team-management/organizations/setting-up-onelogin-sso-for-bitrise/")

## Have some tips and tricks?

If you have some tips and tricks on migrating from Jenkins to Bitrise and you believe the rest of the community from benefit from it, leave us a [pull request](https://github.com/bitrise-io/devcenter/ "https://github.com/bitrise-io/devcenter/") and we will be in touch with you.