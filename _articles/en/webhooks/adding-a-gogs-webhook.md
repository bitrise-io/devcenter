---
title: Adding a Gogs webhook
menu:
  webhooks-main:
    weight: 8

---
You can set up webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action. For Gogs, all you have to do is register your `bitrise-webhooks` URL as a Webhook in your [Gogs](https://gogs.io) repository.

## Get the webhook URL for Gogs

1. Go to the Code tab of your app's page and in the **INCOMING WEBHOOKS** menu, click **SETUP MANUALLY**.
2. Select **Gogs** from the dropdown menu.

   ![Screenshot](/img/bitrise-gogs-webhook.png)
3. Copy the webhook URL for the selected service.

## Set up webhook on Gogs

1. Open your project on your repository's hosting URL.
2. Go to **Settings** of the project.
3. Select **Webhooks**, **Add Webhook**, then **Gogs**.

   ![Screenshot](/img/webhooks/gogs-webhook-select.png)
4. Specify the `bitrise-webhooks` URL (`.../h/gogs/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) in the **Payload URL** field.

   ![Screenshot](/img/webhooks/add-webhook-gogs.png)
5. Set the **Content Type** to `application/json`.
6. A Secret is not required at this time.
7. Set the trigger to be fired on **Just the push event**.

   ![Screenshot](/img/webhooks/gogs-webhook-triggered.png)
8. Click **Add Webhook**.

And you're done! From now on, every code push to your Gogs repository will trigger a build on Bitrise.

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Let's add a Gogs webhook</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your Dashboard</button></a>
</div>