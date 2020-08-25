---
title: Enabling the Bitrise Support user for your app
tag:
- troubleshooting
- " apps"
- builds
description: If you need quick tech support from us, our onsite chat support can look
  into your project and fix your technical issues in the most efficient way! All you
  have to do is enable Bitrise Support user so that we have access to your app.
redirect_from: []
summary: ''
menu:
  troubleshooting-main:
    weight: 6

---
If you need quick tech support from us, our onsite chat support can look into your project and fix your technical issues in the most efficient way! All you have to do is enable **Bitrise Support User** so that we have access to your project, specifically your workflow, build log, app settings or your yml.


{% include video.html embed_url="https://www.youtube.com/embed/VcgVDZekcHg" %}

With the toggle function, you can easily turn the **Bitrise Support User** on and off. No need to add us as a user to your app's Team any more.

{% include message_box.html type="note" title="How long does the Bitrise Support User remain active?" content="Please note that due to security reasons once you turn the Bitrise Support User on, it will remain active for two weeks after which it automatically gets revoked."%}

Let's see how to set it up!

1. Go to the **Settings** tab of your app on Bitrise.
2. Scroll down to the **Enable Bitrise Support User for this app** and toggle the switch to the right to enable it.
   It might take a couple of seconds to work and you might need to refresh your page to see the enabled status.

   ![](/img/bitrise-support-user.png)
3. Ping us through our onsite chat and let us know that you have enabled the Bitrise support user for your app.

## What the Bitrise Support user can do

The Bitrise Support User, when enabled, has Admin access to your app. That means it can do anything that a regular user with Admin access rights on an app can do: it has access to your builds and can edit your Workflows, modify the inputs of the **Team**, **Code** and the **Settings** tab.

Let's see in detail what the Support User can do! The list is not exhaustive: these are the most important capabilities of the Bitrise Support User.

It can:

* Add and update webhooks.
* Add and update SSH keys.
* Change notification settings.
* Enable manual build approval.
* Manage build cache.
* Enable rolling and selective builds.
* Enable GitHub Checks.
* Update all app data, including title and repository URL.
* Manage team member roles.
* Select the service credential user and the connected Apple Developer account.
* Enable or disable the app.

On the **Builds** page, it can:

* View builds.
* View build logs.
* Start builds.

In the **Workflow Editor**, it can:

* Add, update, and delete Workflows.
* Modify Step inputs.
* Update the bitrise.yml file.
* Add, update, and remove code signing files.
* Add, update, and remove Env Vars and Secrets.
* Add, update, and remove build triggers.
* Configure the stack used.

In the case of a failing workflow, our best practice is to create a new and correct version of the failing workflow called `support-testing`. You can compare our `support-testing` with your own and update yours or keep the `support-testing` workflow, rename it as you wish, and develop it further.

## What the Bitrise Support user can't do

The Bitrise Support user can't see your **Account information** or any **Billing** information. Only the owner of the account has access to this information and has the right to modify any account-related records.

The Support user can't see your other apps where the Support user is not enabled.

{% include banner.html banner_text="Let's enable the Bitrise Support User" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}