---
title: Adding a GitHub webhook
menu:
  webhooks-main:
    weight: 3

---
You can specify webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action, such as a code push or a pull request. For GitHub, all you have to do is register your `bitrise-webhooks` URL as a Webhook in your [GitHub](https://www.github.com) repository.

You can register a webhook either automatically or manually. This guide walks you through the process of manually registering a webhook. [Read more about automatic webhook registration](/webhooks/adding-webhooks/#adding-a-webhook-automatically-when-adding-an-app).

## Get the webhook URL for GitHub

1. Go to the **Code** tab of your app's page and in the **INCOMING WEBHOOKS** menu, click **SETUP MANUALLY**.
2. Select **GitHub** from the dropdown menu.

   ![{{ page.title }}](/img/github-webhook-1.png)
3. Copy the webhook URL for the selected service.

## Set up webhook on GitHub

1. Navigate to your GitHub repository and select **Settings**.

   ![{{ page.title }}](/img/webhooks/github-webhook-2.png)
2. Select **Add webhook** under **Webhooks**.

   ![{{ page.title }}](/img/webhooks/github-webhook-3.png)
3. Paste the GitHub Webhook URL from Bitrise to the **Payload URL**.

   ![{{ page.title }}](/img/webhooks/github-webhook-4.png)
4. And on the same page, select **Let me select individual events**.

   ![{{ page.title }}](/img/webhooks/github-webhook-5.png)
5. Select **Pull request** and **Push**. After you are ready press the **Add webhook** button and you are ready to roll!

   ![{{ page.title }}](/img/webhooks/github-webhook-6.png)

{% include banner.html banner_text="Let's add a GitHub webhook!" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your Dashboard" %}