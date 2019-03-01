---
title: Sharing and Storing workflows among multiple apps - draft
redirect_from: []
date: 2019-02-14 10:04:13 +0000
published: false

---
Here are a couple of tricks to share and store a specific workflow among multiple apps instead of building your workflow from scratch every time you add an app to Bitrise.

## Using bitrise.yml tab

Do you have a workflow that you want to "reuse" multiple times when you onboard new apps on Bitrise? An easy way to do so is using the `<> bitrise.yml` tab in your Workflow Editor and simply copy/paste the reusable yml in your new app.

1. Find the app whose workflow you want to reuse in another app on your Dashboard.
2. Click the Workflow Editor of the app and find the `<> bitrise.yml` tab.
3. Copy the yml of the reusable app from the `bitrise.yml editor`.
4. Paste the yml into the new app's `<> bitrise.yml`.

   ![](/img/bitrise-yml-tab-2.png)
5. Start a build.

Please note that the newly added apps have the latest config in this case, but the previously added apps have to be updated manually if needed.

## Storing bitrise.yml in the project's repository

You can store the `bitrise.yml` in your project's git repository as well instead of uploading it to Bitrise. This is similar to the previously mentioned method but with the bonus: you can track changes using your own source control system.

## Storing bitrise.yml and your projects in separate repositories

If you store your projects in a repository (repo A) and your ymls in _another_ repository (repo B), you can easily track changes made to the ymls in repo B without creating extra noise in the project's repo.

Let's tie in Bitrise to run a specific workflow!

You have to set up a simple workflow on Bitrise which contains a `Git Clone Repository` Step and two `Script` Steps. The `Git Clone Repository` Step clones your project's repo (repo A), the first `Script` Step clones a specific yml (from repo B), and the second `Script` Step starts running the workflow specified in your yml. You can start a build manually on Bitrise or by any code push if you [have set up a webhook](https://devcenter.bitrise.io/webhooks/index/) on Bitrise.

## Storing bitrise.yml in a mono repository with other project's bitrise.yml

You might store a lot of projects (along with their own ymls) in a single git repository (called mono-repo) for easier app accessibility & management. You might prefer configuring and testing your project's yml locally (as opposed to on virtual machines). Then you push your changes back to your code hosting service's project repo to make sure changes are tracked and accessible for all project members.

Now let's tie in Bitrise to run a specific project's yml directly from your git repo?

If you store one project and one yml in a folder or more projects with their own ymls, here is what you can do: 

You can use a simple yml in Bitrise where its workflow contains only two steps: 

* the `Git Clone Repository`


* the  `Script Steps` (or optionally the `Bitrise Start Build Step`)

This workflow is solely recruited to perform 2 things: clone your git repo and start running a specific yml out of all the other projects that you store in your repo. Once the `Git Clone Repository` Step has cloned your git repository, the `Script` Step starts running (with a simple `bitrise run`) one of your project's yml or a [specific workflow](/bitrise-cli/workflows/)within that yml! If you have [set up a webhook on Bitrise](/webhooks/index/) for your code hosting service, then you will be able to view your completed build's artifacts in the `APPS & ARTIFACTS` tab, once code has been pushed to your code hosting service.

{% include message_box.html type="info" title="Need Bitrise support for one of your mono-repo project?" content=" If you've been using the above method and need Bitrise support, we recommend you the following: since you have not uploaded your project specific yml to Bitrise, we do not have access to it and our Bitrise UI does not contain the cloned yml either! What we have access to is only the short workflow that contains the `Git Clone Repository` and the `Script` Steps! For easier troubleshooting, we recommend you to provide access to your git repository _or_ share your project specific yml with us!"%}

{% include message_box.html type="note" title="Using Workflow Editor locally" content=" If you use our [Workflow Editor locally](https://github.com/bitrise-io/bitrise-workflow-editor), please note that it supports only ymls called bitrise.yml, and you can store only one bitrise.yml per folder." %}