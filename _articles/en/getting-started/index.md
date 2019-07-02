---
title: Getting started
redirect_from:
- "/getting-started/adding-a-new-app/"
- "/getting-started/create-your-first-app-on-bitrise/"
- "/getting-started/add-your-first-step-to-your-workflow/"
tag:
- getting-started
- sign-up
- add-app
- webhooks
- builds
- workflows
summary: 'Get started with Bitrise: sign up, add an app, start a build. Find out how
  to register webhooks, set up organizations, and learn the basics of Steps and Workflows.'
menu:
  main:
    identifier: getting-started-main
    weight: 1
---
Bitrise is powerful and complex - but getting started is easy and intuitive! You can kick off your first build within minutes of signing up. Let's go over what you need to do to make that happen!

## Signing up to Bitrise

First of all, you need a Bitrise account. Choose one of the following to sign up:

* [Email](/getting-started/signing-up/signing-up-with-email)
* [GitHub](/getting-started/signing-up/signing-up-with-github)
* [GitLab](/getting-started/signing-up/signing-up-with-gitlab)
* [Bitbucket](/getting-started/signing-up/signing-up-with-bitbucket)

Signing up with either of the Git service providers means you connect your Bitrise account to your account on that service provider. With a connected account, you can easily grant Bitrise access to any of your repositories on that account.

After signing up, you can connect your Bitrise account to all of the three supported Git service providers. For example, after you signed up with GitHub, you can connect your Bitrise account to both your GitLab and Bitbucket accounts, too, and access any repositories you have on those accounts.

{% include message_box.html type="info" title="Trial after signing up" content="If you sign up for a free account, you will automatically be granted a two-week trial on our Developer plan. This includes:

* 45 minutes of build time
* 1000 builds a month
* a maximum of 100 team members

Read more about the available plans on the [Pricing](https://www.bitrise.io/pricing/teams) page!"%}

## Adding apps

[Adding a new app](/getting-started/adding-a-new-app/) to Bitrise means that you connect a specific repository to Bitrise, allowing us to clone the repository and then build it.

Add a new app any time by clicking the `+` symbol on the top menu bar and then selecting `Add app` from the dropdown menu.

![Adding a new app](/img/adding-a-new-app/add_new_app.png)

As part of the initial configuration process, you:

* Decide if an app is private or public. Private app data is only available to those who are invited to work on the app. About public apps, read our [Public apps](/getting-started/public-apps/) guide.
* Specify the repository: it can be either a GitHub, GitLab or Bitbucket repository, a manual repository URL, or a self-hosted GitLab repository.
* Register an SSH key: this gives Bitrise access to the repository so we can clone it during the build process.
* Specify the branch that you want to build.

You can change all this later - and anyway, adding a new app takes a couple of minutes so you can always just do the process from scratch.

As part of the process, Bitrise will scan and validate your repository and set up an app configuration based on the results of the scan: we can detect the platform type of your app based on the configuration files. If the validation fails, you can set up the app manually.

Read the details of the process in our [Adding a new app](/getting-started/adding-a-new-app/) guide.

## Webhooks and triggers

You can set up webhooks as part of the process of adding a new app, or at any time later. Webhooks allow Bitrise to communicate with third party services: for example, a Bitrise webhook set up on a GitHub repository allows Bitrise to start a build automatically when code is modified in the repository.

Once webhooks are set up, configure when to start builds automatically by defining triggers. You can set:

* The event which should trigger the build: for example, code push or a pull request.
* The branch of your repository that can trigger builds: for example, `master` or `dev`.

![](/img/trigger-pull-request.png)

This means that you can, for example, set up a trigger that starts a build when a pull request is opened to the `master` branch.

Webhooks are required for triggers to work! Read more about webhooks in our [Webhooks ](/webhooks/index/)guide and about triggers in our [Triggering builds](/builds/triggering-builds/triggering-builds/) guide.

## Builds and workflows

Once you added an app, your first build will be kicked off automatically. To view your builds, go to your Dashboard - which is the first page once you log in to Bitrise -, select the app and click on the **Builds** tab to access your builds.

A build is a series of jobs, executed in the order defined in the app's Workflow Editor. The jobs are called Steps, which represent blocks of script execution. The Steps can be arranged on the graphical UI of the Workflow Editor and they can do a huge number of things: clone your repository, build your app, run tests, pass values to each other, send notification messages to developers.

![](/img/rename-workflow.png)

Read more about Workflows and Steps in our relevant guides:

* [Workflows](/getting-started/getting-started-workflows)
* [Steps](/getting-started/getting-started-steps)

[A build's logs](/builds/build-logs/) can be viewed on the build's page: go to the **Builds** tab and select the build you want.

All builds run in clean virtual machines that are discarded after the build is complete. Read more about them in our [Virtual machines](/infrastructure/virtual-machines/) guide.

## Teams and organizations

Once you set up a new app, you can [start inviting team members](/team-management/index). If you have a Developer or an Organization plan, you can have unlimited team members! Only members of an app's team can view a private app, including its logs. For public apps, anyone can view the build logs who has the URL to the build.

You can also [create organizations](/team-management/organizations/creating-org) if you are on one of our Organization plans. Organizations allow you to manage entire teams quickly and effectively.

## Testing and deployment

Testing your app and deploying your app are both done with the help of our Steps: we have Steps dedicated to both these functions, based on the platform type. Unit testing, UI testing, and real device testing are all possible on Bitrise.

Once your app is tested, built and ready to go, you can quickly deploy it to the store of your choice, for example, Google Play or the App Store.
