---
# jp title missing
title: Adding an Assembla webhook
menu:
  webhooks:
    weight: 8

---

{% include not_translated_yet.html %}

You can set up webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action, such as a code push or a pull request. For Assembla, you only need to add your `bitrise-webhooks` URL to your [Assembla](https://assembla.com) space.

## Get the webhook URL for Assembla

1. Go to the `Code` tab of your app's page and in the `INCOMING WEBHOOKS` menu, click `SETUP MANUALLY`.

1. Select `Assembla` from the dropdown menu.

    ![Screenshot](/img/bitrise-assembla-webhook.png)

1. Copy the webhook URL for the selected service.

## Set up webhook on Assembla

1. Open your space on [assembla.com](https://assembla.com) or your organisation's assembla domain.
1. Go to the `Webhooks` section of the space.
1. Select `Create New Webhook`.
1. Set `Title` to `BitRise Webhook`.
1. Specify the `bitrise-webhooks` URL. (`.../h/assembla/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) in the `External url` field
1. Select `application/json` in the `Content type` field.
1. Paste the following code to `Content`:

    ```
    {"assembla": {"space": "%{space}", "action": "%{action}", "object": "%{object}"}, "message": {"title": "%{title}", "body": "%{body}", "author": "%{author}"}, "git": {"repository_suffix": "%{repository_suffix}", "repository_url": "%{repository_url}", "branch": "%{branch}", "commit_id": "%{commit_id}"}}
    ```

1. Select `Code commits` and/or `Git Push` in the `Post updates about:` section.
1. Click `Add`.

That's all! The next time you __push code__ a build will be triggered (if you have Trigger mapping defined for the event(s) on Bitrise).
