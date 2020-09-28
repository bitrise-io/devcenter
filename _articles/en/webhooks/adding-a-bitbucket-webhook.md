---
title: Adding a Bitbucket webhook
menu:
  webhooks-main:
    weight: 7

---
To have Bitrise automatically start a build every time you push code into your repository, you can set up a webhook at your code hosting service which will automatically trigger a build on Bitrise with the code you push to your repository.

You can register a webhook either automatically or manually. This guide walks you through the process of manually registering a webhook. [Read more about automatic webhook registration](/webhooks/adding-webhooks/#adding-a-webhook-automatically-on-the-code-tab).

## Get the webhook URL for Bitbucket

1. Go to the Code tab of your app's page and in the **INCOMING WEBHOOKS** menu, click **SETUP MANUALLY**.
2. Select **Bitbucket** from the dropdown menu.

   ![Screenshot](/img/webhooks_bitbucket.png)
3. Copy the webhook URL for the selected service.

## Setup webhook on Bitbucket

1. Navigate to your Bitbucket repository and select **Settings**.

   ![Screenshot](/img/webhooks/bitbucket_settings.png)
2. Select **Webhooks** from the left.

   ![Screenshot](/img/webhooks/bitbucket_settings_webhooks.png)
3. Select **Add Webhook**.

   ![Screenshot](/img/webhooks/bitbucket_add_webhooks.png)
4. Paste the Bitbucket Webhook URL from Bitrise to the **URL** and add a **Title**.

   ![Screenshot](/img/webhooks/bitbucket_webhook_info.png)
5. Select **Choose from a full list of triggers**.

   ![Screenshot](/img/webhooks/bitbucket_webhook_trigger.png)
6. Select **Repository Push** and **Pull Request Created** and **Updated** triggers. After you are ready press the **Save** button and you are ready to roll!

   ![Screenshot](/img/webhooks/bitbucket_webhook_push_and_pr.png)

{% include banner.html banner_text="Let's add a Bitbucket webhook!" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your Dashboard" %}
