---
last_modified_at: 
title: Available environment variables
redirect_from:
- "/faq/available-environment-variables/"
tag:
- builds
- env vars
- triggers
description: 'Environment Variables (Env Vars) consist of a key and a value, as well
  as optional attributes. They can be defined on the level of apps, Workflows or Steps. '
menu:
  builds-main:
    weight: 27

---
Environment Variables (Env Vars) consist of a key and a value, as well as optional attributes. They can be defined on the level of apps, Workflows or Steps.

## Exposed by the Bitrise CLI

These Environment Variables are available everywhere, even if you run the build on your own computer, using the [Bitrise CLI](https://www.bitrise.io/cli).

{% include collapse.html title="$BITRISE_TRIGGERED_WORKFLOW_ID" content="The ID of the Workflow that was triggered. This env var is exposed regardless of whether the Workflow was triggered manually or automatically. "%}

{% include collapse.html title="$BITRISE_TRIGGERED_WORKFLOW_TITLE" content="The title of the Workflow that was triggered - if it has a title, which is completely optional. This env var is exposed regardless of whether the Workflow was triggered manually or automatically." %}

{% include collapse.html title="$BITRISE_BUILD_STATUS" content="The current status of the build. The available options are:

* 0: Successful.
* 1: Failed.

A successful current status means that none of the previous Steps in the build failed."%}

{% include collapse.html title="$BITRISE_SOURCE_DIR" content="Path to the base working directory. By default, it's the directory where Bitrise runs
(for example, your repository root), unless you provide a different value. This can be overwritten during the build, which will change the working directory for subsequent Steps in the build. "%}

{% include collapse.html title="$BITRISE_DEPLOY_DIR" content="Path to the directory that stores artifacts and files for deployment.
It's a temporary directory created by the Bitrise CLI by default, and can be overwritten before starting the Bitrise CLI. The **Deploy to Bitrise.io** Step looks for your build artifacts - such as an IPA or APK of the app -, test results, and other files in this directory." %}

{% include collapse.html title="$CI" content="Indicates whether the Bitrise CLI is running in CI (Continuous Integration) mode. Value can be `true` or `false`. It is false if, for example, your run Bitrise on your own computer." %}

{% include collapse.html title="$PR" content="Indicates whether the Bitrise CLI is running in PR (Pull Request) mode. Value can be `true` or `false`. Running in Pull Request mode means that Bitrise builds your code in the state as if the Pull Request was already merged. " %}

## Exposed by Bitrise.io

These Environment Variables are available for builds running on [bitrise.io](https://www.bitrise.io) virtual machines.

{% include collapse.html title="$BITRISE_BUILD_NUMBER" content="Build number of the build on [bitrise.io](https://www.bitrise.io). You can [modify any app's build number](/builds/build-numbering-and-app-versioning/#change-the-build-number-of-your-build) if you want to - for example, if you wish to reset to 1."%}

{% include collapse.html title="$BITRISE_APP_TITLE" content="The title of your app on [bitrise.io](https://www.bitrise.io). You can change it any time on the **Settings** tab of the app. "%}

{% include collapse.html title="$BITRISE_APP_URL" content="The URL or your app on [bitrise.io](https://www.bitrise.io). This is not the same as the git repository URL! An app URL has the following format:

`app.bitrise.io/APP-SLUG/`"%}

{% include collapse.html title="$BITRISE_APP_SLUG" content="The slug that uniquely identifies your app on [bitrise.io](https://www.bitrise.io). It's part of the app URL, too. "%}

{% include collapse.html title="$BITRISE_BUILD_URL" content="The URL of the build on [bitrise.io](https://www.bitrise.io). A build URL has the following format:

`app.bitrise.io/build/BUILD-SLUG`"%}

{% include collapse.html title="$BITRISE_BUILD_SLUG" content="The slug that uniquely identifies a build on [bitrise.io](https://www.bitrise.io). It's part of the build URL, too. "%}

{% include collapse.html title="$BITRISE_BUILD_TRIGGER_TIMESTAMP" content="The date and time when the build was triggered."%}

{% include collapse.html title="$GIT_REPOSITORY_URL" content="The URL of the Git repository that hosts your app. This can be changed in the **Settings** tab of the app. "%}

{% include collapse.html title="$BITRISE_GIT_BRANCH" content="The git branch that is built by Bitrise. For example, `master`. "%}

{% include collapse.html title="$BITRISEIO_GIT_BRANCH_DEST" content="Used only with builds triggered by pull requests: the destination/target branch of the pull request that triggered the build. "%}

{% include collapse.html title="$BITRISE_GIT_TAG" content="You can [use Git Tags to trigger builds](/builds/triggering-builds/trigger-git-tags/) on Bitrise: this Env Var stores the tag used to trigger the build. "%}

{% include collapse.html title="$BITRISE_GIT_COMMIT" content="The commit hash of the Git commit that triggered the build, when applicable. There is no commit hash, for example, in the case of a pull request build. "%}

{% include collapse.html title="$BITRISE_GIT_MESSAGE" content="The commit message, pull request title or the message you specified if you triggered the build manually. "%}

{% include collapse.html title="$BITRISEIO_GIT_REPOSITORY_OWNER" content="The owner of the Git repository of the app (for example, `bitrise-io`). "%}

{% include collapse.html title="$BITRISEIO_GIT_REPOSITORY_SLUG" content="The slug of the Git repository of the app (for example, `devcenter`). "%}

{% include collapse.html title="$BITRISE_PULL_REQUEST" content="The ID of the pull request that triggered a build. Not applicable, of course, if the build was not triggered by a pull request."%}

{% include collapse.html title="$BITRISEIO_PULL_REQUEST_REPOSITORY_URL" content="The URL of the repository from where the pull request has been sent."%}

{% include collapse.html title="$BITRISEIO_PULL_REQUEST_MERGE_BRANCH" content="The pre-merge branch - if the Git hosting provider supports and provides the pre-merged state of a pull request on a special merge branch. "%}

{% include collapse.html title="$BITRISEIO_PULL_REQUEST_HEAD_BRANCH" content="The pull request head branch, if the Git hosting provider system supports and provides this. This special git ref should point to the source of the pull request. "%}

{% include collapse.html title="$BITRISE_PROVISION_URL" content="The URL of the Apple provisioning profiles uploaded to [bitrise.io](https://www.bitrise.io). If there is more than one provisioning profile uploaded for your app, a pipe character separates the URLs in the list (`|`).

This is only relevant for iOS apps and for cross-platform apps with iOS versions. "%}

{% include collapse.html title="$BITRISE_CERTIFICATE_URL" content="The URL of the Apple certificates uploaded to [bitrise.io](https://www.bitrise.io). If there is more than one certificate uploaded for your app, a pipe character separates the URLs in the list (`|`).

This is only relevant for iOS apps and for cross-platform apps with iOS versions. "%}

{% include collapse.html title="$BITRISE_CERTIFICATE_PASSPHRASE" content="The passphrase you set for the uploaded Apple certificates on the app's **Code Signing** tab. If there is more than one certificate with a passphrase, a pipe character separates the phrases in the list (`|`)

This is only relevant for iOS apps and for cross-platform apps with iOS versions. "%}

{% include collapse.html title="$BITRISE_IO" content="Indicates that the build is running in a bitrise.io environment. Value is set to `true` by Bitrise when it starts a build."%}

For more information on Env Vars, check out [Secrets and Env Vars](/builds/env-vars-secret-env-vars/).

{% include banner.html banner_text="Now you know everything" url="https://app.bitrise.io/dashboard/builds" button_text="Go to Bitrise now" %}