---
# jp title missing
title: Enabling Bitrise Support user for your app
menu:
  troubleshooting:
    weight: 2

---

{% include not_translated_yet.html %}

If you need quick tech support from us, our onsite chat support can look into your project and fix your technical issues in the most efficient way! All you have to do is enable `Bitrise Support user` so that we have access to your project, specifically to your workflow, your build log, your app settings or to your yml.

With the toggle function, you can easily turn the `Bitrise Support user` on and off, no need to add us as a user to your app's Team any more.

Let's see how to set it up!

1. Go to the `Settings` tab of your project.
2. Scroll down to the `Enable Bitrise Support user for this app` and toggle the switch to the right to enable it.
   It might take a couple of seconds to work and you might need to **refresh your page** to see the enabled status.

   ![Screenshot](/img/troubleshooting/enable-bitrise-support-user.png)
3. Ping us through our onsite chat and notify us that you have enabled the Bitrise support user for your app so that we can help you with your issue.

### What the Bitrise Support user can see if it's enabled

The Bitrise Support user has access to your builds and can edit your workflows. We can also modify the inputs of the `Team`, `Code` and the `Settings` tab. In the case of a failing workflow, our best practice is to create a new and correct version of the failing workflow called `support-testing`. You can compare our `support-testing` with your own and update yours or keep the `support-testing` workflow, rename it as you wish, and develop it further.

### What the Bitrise Support user can't see if it's enabled

The Bitrise Support user can't see your `Account information` or any `Billing` information. Only the owner of the account has access to this information and has the right to modify any account-related records.
