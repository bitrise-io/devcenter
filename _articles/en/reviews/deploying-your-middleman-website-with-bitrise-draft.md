---
title: Deploying your Middleman website with Bitrise - draft
redirect_from: []
date: 2019-04-09 10:06:04 +0000
published: false

---
{% include not_translated_yet.html %}

**This tutorial helps you create a basic static website project (for example, a blog) with** [**Middleman**](https://middlemanapp.com/)**, connect and deploy it with Bitrise.**

## Creating and cloning a repository on Github

First, you need to sign in with your Github account, or sign up if you don't have one yet.

1. To create a new repository on Github, [follow the steps on Github](https://github.com/new).
2. Once you've created your repository, clone it.

## Installing Middleman

Let's see all the tools you need to use Middleman.

Middleman is distributed using the RubyGems package manager. This means you will need both the Ruby language runtime installed and RubyGems to begin using Middleman.

MacOS comes prepackaged with Ruby, however, some of Middleman's dependencies need to be compiled during installation. On macOS that requires Xcode that you can install via the [Mac App Store](http://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12). Alternately you can just install the Xcode Command Line Tools, that should be enough if you don't want to install the full Xcode.app.

Once you have Ruby and Xcode (Command Line Tools), execute the following from the command line:

    gem install middleman

This will install Middleman, its dependencies and the command-line tools.

## Creating a Middleman project

Now that you have installed Middleman, let's create a new Middleman project!

1. To create a Middleman project, navigate to the root folder of your repository and execute the following from the command line:

       middleman init my_new_project
2. Once the setup has finished, commit and push your changes.

## Connecting your repository with Bitrise

Before you start, make sure you're signed up to Bitrise either via your [git provider](/getting-started/signing-up/signing-up-with-github/) or [email](/getting-started/signing-up/signing-up-with-email/).

1. Once you're signed in, click `+` to [Add new App](/getting-started/adding-a-new-app/index/).
2. Connect a [provider](/getting-started/adding-a-new-app/connecting-a-repository/) (in this case, GitHub).
   You will see a list of all your repositories on GitHub.
3. Select the repository you just created.
4. Next you will get an alert, since the repository you are connecting is not an Xcode project. Select `Configure Manually`, then enter the branch name `master`.
5. 

## Preparing your Workflow

1. Once you created your project, select it in the [Dashboard](https://www.bitrise.io/dashboard).
2. Select the `Workflow` tab from the top menu. We are going to add a bash script that will be executed on each build.
3. First, delete all the automatically created steps (if any).
4. Next, we need to add new steps. You can add new steps by clicking on the `+` sign button between steps / in the step list and selecting the step
   from the step list popup. Add the following steps to your Workflow, in this order:
   * `Activate SSH key` - unless you used the public, non SSH URL of the repository during the Add New App process
   * `Git Clone Repository`
   * `Script`
5. Select the `Script` step and add the following lines:

   \#!/bin/bash
   set -ex
   bundle install
   bundle exec middleman build --verbose

The above code installs the dependencies specified in your `Gemfile`, and runs a Middleman build on the virtual machine.

## Deploying to Amazon S3:

Add an Amazon S3 bucket sync to your Workflow steps

Now we are going to add and customize an Amazon S3 bucket sync to the Workflow steps.

1. Click on the _Add new Step_ button and select `Amazon S3 bucket sync` from the step list.
2. Select the step to customize it.
   * Enter your AWS access key
   * Your AWS secret key
   * And enter a name for your S3 bucket.
   * For your local path, enter the following: `$BITRISE_SOURCE_DIR/build/`

This will select the contents of the build folder in the project source path on the virtual machine.
It will be uploaded on every build.

For access control, enter `public-read` or `private`, as advised.

{% include message_box.html type="note" title="Alternative deploy destinations" content="
You can of course use `Heroku`, GitHub pages or any other service as your deployment target.
"%}

You can find a more complex setup, deploying to `Heroku`,
[on our Blog](http://blog.bitrise.io/2016/04/29/hooking-up-a-middleman-project-to-deploy-a-static-site-to-heroku-with-bitrise.html).

## Running builds manually

Once the configuration of your Workflow is complete,
you can run a build manually by clicking on the `Start/Schedule a build` button on the app's page (where you see the
`Builds`, `Workflow`, `Team`, ... tabs).

## Running builds automatically

If you chose GitHub when adding your repository, each code change (commit) on GitHub will automatically trigger a Bitrise build.
Otherwise you can find more information about how you can setup a Webhook, to trigger builds
automatically for code push, pull request and tags [here](/webhooks/).