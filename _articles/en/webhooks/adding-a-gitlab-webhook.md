---
title: Adding a Gitlab webhook
menu:
  webhooks-main:
    weight: 6

---
You can set up webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action, such as a code push or a pull request. For GitLab, all you have to do is register your `bitrise-webhooks` URL as a Webhook in your [GitLab](https://www.gitlab.com) repository.

You can register a webhook either automatically or manually. This guide walks you through the process of manually registering a webhook. [Read more about automatic webhook registration](/webhooks/adding-webhooks/#adding-a-webhook-automatically-when-adding-an-app).

## Get the webhook URL for GitLab

1. Go to the Code tab of your app's page and in the **INCOMING WEBHOOKS** menu, click **SETUP MANUALLY**.
2. Select **GitLab** from the dropdown menu.

   ![{{ page.title }}](/img/bitrise-gitlab-webhook.png)
3. Copy the webhook URL for the selected service.

## Set up webhook on GitLab

1. Open your project on [GitLab.com](https://www.gitlab.com)
2. Go to **Settings** of the project.
3. Select **Integrations**.

   ![{{ page.title }}](/img/webhooks/integrations-gitlab.png)
4. Enter the `bitrise-webhooks` URL in the URL field.

   ![{{ page.title }}](/img/webhooks/gitlab-webhook-url.png)
5. In the **Trigger** section select:
   * Push events
   * Tag push events
   * Merge request events

   ![{{ page.title }}](/img/webhooks/gitlab-webhook-events.png)
6. Click **Add webhook**.

That's all! The next time you push code, push a new tag or create/update a merge request a build will be triggered (if you have Trigger mapping defined for the event(s) on Bitrise).

{% include banner.html banner_text="Let's add a GitLab webhook!" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your Dashboard" %}