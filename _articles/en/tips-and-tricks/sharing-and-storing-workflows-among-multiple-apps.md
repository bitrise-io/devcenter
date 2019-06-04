---
title: Sharing and storing workflows among multiple apps
redirect_from: []
date: '2019-03-01T14:20:01.000+00:00'
menu:
  tips-and-tricks-main:
    weight: 24

---
Here are a couple of tricks to share and store a specific workflow among multiple apps instead of building your workflow from scratch every time you add an app to Bitrise.

## Using the bitrise.yml tab

Do you have a workflow that you want to "reuse" multiple times when you onboard new apps on Bitrise? An easy way to do so is using the `bitrise.yml` tab in your Workflow Editor and simply copy/paste the reusable yml in your new app.

1. Find the app whose workflow you want to reuse in another app on your Dashboard.
2. Click the Workflow Editor of the app and find the `bitrise.yml` tab.
3. Copy the yml of the reusable app from the `bitrise.yml editor`.
4. Paste the yml into the new app's `bitrise.yml`.

   ![](/img/bitrise-yml-tab-2.png)
5. [Start a build](/builds/Starting-builds-manually/).

Please note that the newly added apps have the latest config in this case, but the previously added apps have to be updated manually if needed.

## Storing bitrise.yml in the project's repository

If you prefer, you can store the `bitrise.yml` in your project's git repository instead of uploading it to Bitrise. This is similar to the previously mentioned method but with a bonus: you can track changes using your own source control system.

## Storing bitrise.yml and your projects in separate repositories

If you store your projects in a repository (repo A) and your .yml files in _another_ repository (repo B), you can easily track changes made to the .yml files in repo B without creating extra noise in the project's repo.

Let's tie in Bitrise to run a specific workflow!

You have to set up a simple workflow on Bitrise which contains a `Git Clone Repository` Step and two `Script` Steps. The `Git Clone Repository` Step clones your project's repo (repo A), the first `Script` Step clones the yml repository (from repo B), and the second `Script` Step starts running the workflow specified in your yml. You can start a build manually on Bitrise or by any code push if you [have set up a webhook](https://devcenter.bitrise.io/webhooks/index/) on Bitrise.

## Storing bitrise.yml in a mono repository with other project's bitrise.yml

You might store a lot of projects (along with their own .yml files) in a single git repository (called mono repo) for easier app accessibility & management. You might prefer configuring and testing your project's `bitrise.yml` locally as opposed to testing it on virtual machines. Then you push your changes back to git project repo where changes tracked and accessible for all project members.

Now let's tie in Bitrise and run a specific project's `bitrise.yml` directly from your git repo!

Irrespective of keeping only one project and a `bitrise.yml` or more in one folder, here is what you can do:

You can use a simple workflow in Bitrise that contains only two steps:

* the `Git Clone Repository` Step
* the  `Script` Step (or optionally the `Bitrise Start Build` Step)

We're recruiting this workflow to perform 2 things: clone your git repo and start running a specific yml out of all the other projects that you store in your repo. Once the `Git Clone Repository` Step has cloned your git repository, the `Script` Step starts running (`bitrise run`) one of your project's `bitrise.yml` or a [specific workflow](/bitrise-cli/workflows/) within that .yml file! If you have [set up a webhook on Bitrise](/webhooks/index/) for your code hosting service, then you will be able to view your completed build's artifacts in the `APPS & ARTIFACTS` tab, once code has been pushed to git repo.

{% include message_box.html type="info" title="Need Bitrise support for one of your mono-repo project?" content=" If you've been using the above method and need Bitrise support, we recommend you the following: since you have not uploaded your project specific yml to Bitrise, we do not have access to it and our Bitrise UI does not contain the cloned yml either! What we have access to is only the short workflow that contains the `Git Clone Repository` and the `Script` Steps! For easier troubleshooting, we recommend you to provide access to your git repository _or_ share your project specific yml with us!"%}

{% include message_box.html type="note" title="Using Workflow Editor locally" content=" If you use our [Workflow Editor locally](https://github.com/bitrise-io/bitrise-workflow-editor), please note that it only supports .yml files called `bitrise.yml`, and you can store only one `bitrise.yml` per folder." %}