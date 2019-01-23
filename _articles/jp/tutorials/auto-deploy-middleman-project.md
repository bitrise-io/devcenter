---
# jp title missing
title: Deploying your Middleman website with Bitrise
menu:
  tutorials:
    weight: 10

---

{% include not_translated_yet.html %}

This tutorial helps you create a basic static website project (for example, a blog) with [Middleman](https://middlemanapp.com/),
connect and deploy it with Bitrise.

## 1. Create and clone a repository on Github

To create a new repository on Github, [click here](https://github.com/repositories/new).
You need to sign in with your Github account, or sign up if you don't have one yet.
Once you created your repository, clone it.

## 2. Install Middleman

Middleman is distributed using the RubyGems package manager.
This means you will need both the Ruby language runtime installed and RubyGems to begin using Middleman.

MacOS comes prepackaged with Ruby, however, some of the Middleman's dependencies need to be compiled
during installation and on macOS that requires Xcode.
Xcode can be installed via the [Mac App Store](http://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12).
Alternately you can just install the Xcode Command Line Tools, that should be enough
if you don't want to install the full Xcode.app.

Once you have Ruby and Xcode (Command Line Tools), execute the following from the command line:

    gem install middleman

This will install Middleman, its dependencies and the command-line tools for using Middleman.

## 3. Create a Middleman project

To create a Middleman project, navigate to the root folder of your repository and execute the following from the command line:

    middleman init my_new_project

Once the setup is finished, commit and push your changes.

## 4. Connect your repository with Bitrise

To connect your repository with Bitrise, visit the [Bitrise](https://www.bitrise.io/) site.
You need to sign in with your Bitrise account, or sign up if you don't have one yet.
Once you're signed in, select [Add new App](https://www.bitrise.io/apps/add) in the top dropdown menu.

In the first step, you need to select the provider, where you store your code, in this case, GitHub.

In the second step, you will see a list of all your repositories on GitHub. Select the one you just created.

In the third step, you will get an alert, since the repository you are connecting is not an Xcode project.
Select "Configure Manually", then enter the branch name "master".

## 5. Prepare your Workflow

Once you created your project, select it in the [Dashboard](https://www.bitrise.io/dashboard)
and select the `Workflow` tab from the top menu.
We are going to add a bash script that will be executed on each build.
First, delete all the automatically created steps (if any).
Next, we need to add new steps.
You can add new steps by clicking on the `+` sign button between steps / in the step list and selecting the step
from the step list popup. Add the following steps to your Workflow, in this order:

1. `Activate SSH key` - unless you used the public, non SSH URL of the repository during the Add New App process
2. `Git Clone Repository`
3. `Script`

Select the `Script` step and add the following lines:

    #!/bin/bash
    set -ex
    bundle install
    bundle exec middleman build --verbose

The above code installs the dependencies specified in your `Gemfile`, and runs a Middleman build on the virtual machine.

## 6. Deploy to Amazon S3: Add an Amazon S3 bucket sync to your Workflow steps

Now we are going to add and customize an Amazon S3 bucket sync to the Workflow steps.
Click on the _Add new Step_ button and select `Amazon S3 bucket sync` from the step list.

Select the step to customize it.

* Enter your AWS access key
* Your AWS secret key
* And enter a name for your S3 bucket.
* For your local path, enter the following: `$BITRISE_SOURCE_DIR/build/`

This will select the _contents_ of the build folder in the project source path on the virtual machine.
It will be uploaded on every build.

For access control, enter `public-read` or `private`, as advised.

{% include message_box.html type="note" title="Alternative deploy destinations" content="
You can of course use `Heroku`, GitHub pages or any other service as your deployment target.
"%}

You can find a more complex setup, deploying to `Heroku`,
[on our Blog](http://blog.bitrise.io/2016/04/29/hooking-up-a-middleman-project-to-deploy-a-static-site-to-heroku-with-bitrise.html).

## 7. Run build manually

Once the configuration of your Workflow is complete,
you can run a build manually by clicking on the `Start/Schedule a build` button on the app's page (where you see the
`Builds`, `Workflow`, `Team`, ... tabs).

## 8. Run builds automatically

If you chose GitHub when adding your repository, each code change (commit) on GitHub will automatically trigger a Bitrise build.
Otherwise you can find more information about how you can setup a Webhook, to trigger builds
automatically for code push, pull request and tags [here](/webhooks/).
