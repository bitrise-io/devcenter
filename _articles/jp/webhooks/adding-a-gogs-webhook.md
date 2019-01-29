---
# jp title missing
title: Adding a Gogs webhook
menu:
  webhooks:
    weight: 5

---

{% include not_translated_yet.html %}

You can set up webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action. For Gogs, all you have to do is register your `bitrise-webhooks` URL as a Webhook in your [Gogs](https://gogs.io) repository.

## Get the webhook URL for Gogs

1. Go to the `Code` tab of your app's page and in the `INCOMING WEBHOOKS` menu, click `SETUP MANUALLY`.

1. Select `Gogs` from the dropdown menu.

    ![Screenshot](/img/bitrise-gogs-webhook.png)

1. Copy the webhook URL for the selected service.

## Set up webhook on Gogs

1. Open your project on your repository's hosting URL.

1. Go to `Settings` of the project.

1. Select `Webhooks`, `Add Webhook`, then `Gogs`.

    ![Screenshot](/img/webhooks/gogs-webhook-select.png)

1. Specify the `bitrise-webhooks` URL (`.../h/gogs/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) in the `Payload URL` field.

    ![Screenshot](/img/webhooks/add-webhook-gogs.png)

1. Set the `Content Type` to `application/json`.

1. A Secret is not required at this time.

1. Set the trigger to be fired on `Just the push event`.

    ![Screenshot](/img/webhooks/gogs-webhook-triggered.png)

1. Click `Add Webhook`.

And you're done! From now on, every code push to your Gogs repository will trigger a build on Bitrise.
