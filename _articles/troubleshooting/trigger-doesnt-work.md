---
title: Build Trigger does not work
menu:
  troubleshooting:
    weight: 7

---
Unfortunately, it can happen that your build triggers do not trigger a build automatically on Bitrise. There are many potential issues that can stop your builds - let's take a look!

1. Check your webhooks.

    Check that you have the webhook set up correctly. You can find out the webhook URL for your repository's hosting provider on the `Code` tab of your app and you can check in your repository's settings if they match.

    Also, you have to enable the specific event that you would like to trigger a build. For example, if your repository is hosted at GitLab and you wish to trigger builds with Git Tags, you must enable Tag Push events in your GitLab webhook.

    Check in your repository's settings if there are any error messages regarding the delivery attempts related to your webhook.

    For more information about potential issues with webhooks, check out [Webhook troubleshooting](/webhooks/troubleshooting)

1. Check the branch names and tags you set up with the trigger on bitrise.io.

    For example, if you accidentally typed `msater` instead of `master`, no build will be triggered.

1. Check if you previously enabled Selective Builds for the app. You can find the option on your app's `Settings` page. With this feature, you can set that a build should be triggered only if certain files or folders have been changed.

1. Check the status page of your repository's hosting provider to see if there are any known issues.