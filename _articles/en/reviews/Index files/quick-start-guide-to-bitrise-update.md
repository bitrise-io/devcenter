---
tag: []
title: Quick start guide to Bitrise - update
redirect_from: []
summary: ''
published: false

---
Bitrise is powerful and complex - but getting started is easy and intuitive! You can kick off your first build within minutes of signing up. Let's go over what you need to do make that happen!

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

[Adding a new app](/getting-started/adding-a-new-app/index) to Bitrise means that you connect a specific repository to Bitrise, allowing us to clone the repository and then build it. As part of the initial configuration process, you:

* 
* Specify the repository: it can be either a GitHub, GitLab or Bitbucket repository, a manual repository URL, or a self-hosted GitLab repository. 
* 

![Adding a new app](/img/adding-a-new-app/add_new_app.png)

### Validating and configuring the project

After setting up repository access, type the branch of the repository you wish to use and click `Next`.

![](/img/choose-branch.png)

[Bitrise will scan and validate your repository and set up a project configuration](/getting-started/adding-a-new-app/setting-up-configuration) based on the results. If the validation fails, you can set up the project manually.

### Webhook setup

[Register a webhook](/webhooks/index/) immediately so Bitrise can start a build every time you push code into your repository. You can skip webhook setup when creating a new app: you can always set up webhooks later.

## Builds and workflows

Once you added an app, your first build will be kicked off automatically. This means running a workflow which is a collection of Steps. Steps represent a block of script execution with predefined input and output variables and they are the heart of Bitrise. You can create new workflows, chain workflows together. You can also modify Step inputs, add and remove Steps to and from workflows.

* [The build process](/getting-started/builds-and-workflows)
* [Workflows](/getting-started/getting-started-workflows)
* [Steps](/getting-started/getting-started-steps)

## Teams and organizations

Once you set up a new app, you can [start inviting team members](/team-management/index). If you have a Developer or an Organization plan, you can have unlimited team members!

You can also [create organizations](/team-management/organizations/creating-org) if you are on one of our Organization plans. Organizations allow you to manage entire teams quickly and effectively.