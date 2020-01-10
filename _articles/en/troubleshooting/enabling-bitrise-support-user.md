---
title: Enabling the Bitrise Support user for your app
tag:
- troubleshooting
- " apps"
- builds
summary: If you need quick tech support from us, our onsite chat support can look
  into your project and fix your technical issues in the most efficient way! All you
  have to do is enable Bitrise Support user so that we have access to your app.
redirect_from: []
menu:
  troubleshooting-main:
    weight: 5

---
If you need quick tech support from us, our onsite chat support can look into your project and fix your technical issues in the most efficient way! All you have to do is enable **Bitrise Support user** so that we have access to your project, specifically your workflow, build log, app settings or your yml.

With the toggle function, you can easily turn the **Bitrise Support user** on and off. No need to add us as a user to your app's Team any more.

{% include message_box.html type="note" title="How long does the Bitrise Support User remain active?" content="Please note that due to security reasons once you turn the Bitrise Support User on, it will remain active for two weeks after which it automatically gets revoked."%}

Let's see how to set it up!

1. Go to the **Settings** tab of your project.
2. Scroll down to the **Enable Bitrise Support user for this app** and toggle the switch to the right to enable it.
   It might take a couple of seconds to work and you might need to refresh your page to see the enabled status.

   ![](/img/bitrise-support-user.png)
3. Ping us through our onsite chat and let us know that you have enabled the Bitrise support user for your app.

### What the Bitrise Support user can see if it's enabled

The Bitrise Support user has access to your builds and can edit your workflows. We can also modify the inputs of the **Team**, **Code** and the **Settings** tab. In the case of a failing workflow, our best practice is to create a new and correct version of the failing workflow called `support-testing`. You can compare our `support-testing` with your own and update yours or keep the `support-testing` workflow, rename it as you wish, and develop it further.

### What the Bitrise Support user can't see if it's enabled

The Bitrise Support user can't see your **Account information** or any **Billing** information. Only the owner of the account has access to this information and has the right to modify any account-related records.

<div class="banner">
<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
<div class="deploy-text">Let's enable the Bitrise Support User</div>
<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>