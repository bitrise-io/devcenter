---
title: Deploying your Middleman website with Bitrise
menu:
  tutorials-main:
    weight: 20

---
This tutorial describes how you can create a basic static website project (for example, a blog) with [Middleman](https://middlemanapp.com/), and how to connect and deploy the project with Bitrise.

## Creating & cloning a repository on Github

First, you need to sign in with your Github account, or sign up if you don't have one yet.

1. To create a new repository on Github, [follow the steps on Github](https://github.com/new).
2. Once you've created your repository, clone it.

## Installing Middleman

Let's see the tools you need to install and use Middleman.

Middleman is distributed using the RubyGems package manager. This means you need both the Ruby language runtime installed and RubyGems to begin using Middleman.

MacOS comes prepackaged with Ruby, however, some of Middleman's dependencies need to be compiled during installation. On macOS that requires Xcode which you can install via the [Mac App Store](http://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12). Alternatively, you can just install the Xcode Command Line Tools, that should be enough if you don't want to install the full Xcode app.

Once you have Ruby and Xcode (Command Line Tools), execute the following from the command line:

    gem install middleman

This will install Middleman, its dependencies and the command-line tools.

## Creating a Middleman project

Now that you have installed Middleman, let's create a new Middleman project!

1. Navigate to the root folder of your repository and execute the following from the command line:

       middleman init my_new_project
2. Once the setup has finished, commit and push your changes.

## Connecting your repository with Bitrise

Before you start, make sure you're signed up to Bitrise either via your [git provider](/getting-started/signing-up/signing-up-with-github/) or [email](/getting-started/signing-up/signing-up-with-email/).

1. Log into [bitrise](https://www.bitrise.io).
2. Click **+**  on your Dashboard to [add a new app](/getting-started/adding-a-new-app/index/).
3. Connect a [provider](/getting-started/adding-a-new-app/connecting-a-repository/) (in this case, GitHub). You will see a list of all your repositories on GitHub.
4. Select the repository you just created.
5. Next you will get an alert, since the repository you are connecting is not an Xcode project. Select **Configure Manually**, then enter the branch name `master`.

## Preparing your workflow

1. Once you created your project, select it in the [Dashboard](https://www.bitrise.io/dashboard).
2. Go to Workflow Editor.
3. Delete all the automatically created steps (if any).
4. Add new Steps in the order below by clicking the **+** sign.
   * **Activate SSH key** - unless you used the public, non SSH URL of the repository when adding a new app
   * **Git Clone Repository**
   * **Script**
5. Select the **Script** Step and add the following lines:

       #!/bin/bash
       set -ex
       bundle install
       bundle exec middleman build --verbose

The above code installs the dependencies specified in your `Gemfile`, and runs a Middleman build on the virtual machine.

## Deploying to Amazon S3

Now we are going to add and customize an Amazon S3 bucket sync to the workflow steps.

1. Go to your workflow.
2. Click **+** to inject the **Amazon S3 bucket sync** Step from the StepLib to your workflow.
3. Configure the **Amazon S3 bucket sync** Step:
   * Enter your AWS Access Key, AWS Secret Key and the name for your S3 bucket.
   * Add your local path which should be: `$BITRISE_SOURCE_DIR/build/` (This will select the contents of the build folder in the project source path on the virtual machine. It will be uploaded on every build.)
   * Add `public-read` or `private` to **Access Control**.

{% include message_box.html type="note" title="Alternative deploy destinations" content=" You can of course use Heroku, GitHub pages or any other service as your deployment target. You can find a more complex setup; deploying to Heroku [on our Blog](http://blog.bitrise.io/2016/04/29/hooking-up-a-middleman-project-to-deploy-a-static-site-to-heroku-with-bitrise.html). "%}

## Running your builds

Once the configuration of your Workflow is complete, you can run a build manually by clicking on the **Start/Schedule a build** button on the app's page.

If you chose GitHub when adding your repository, each code change (commit) on GitHub will automatically trigger a Bitrise build. Otherwise you can find more information about how you can setup a Webhook, to trigger builds automatically for code push, pull request and tags [here](/webhooks/).

{% include banner.html banner_text="Manage Middleman projects with Bitrise" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}