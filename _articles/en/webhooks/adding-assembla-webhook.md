---
title: Adding an Assembla webhook
menu:
  webhooks-main:
    weight: 14

---
You can set up webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action, such as a code push or a pull request. For Assembla, you only need to add your `bitrise-webhooks` URL to your [Assembla](https://assembla.com) space.

## Get the webhook URL for Assembla

1. Go to the **Code** tab of your app's page and in the **INCOMING WEBHOOKS** menu, click **SETUP MANUALLY**.
2. Select **Assembla** from the dropdown menu.

   ![Screenshot](/img/bitrise-assembla-webhook.png)
3. Copy the webhook URL for the selected service.

## Set up webhook on Assembla

1. Open your space on [assembla.com](https://assembla.com) or your organisation's assembla domain.
2. Go to the **Webhooks** section of the space.
3. Select **Create New Webhook**.
4. Set **Title** to **BitRise Webhook**.
5. Specify the `bitrise-webhooks` URL. (`.../h/assembla/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) in the **External url** field
6. Select `application/json` in the **Content type** field.
7. Paste the following code to **Content**:

       {"assembla": {"space": "%{space}", "action": "%{action}", "object": "%{object}"}, "message": {"title": "%{title}", "body": "%{body}", "author": "%{author}"}, "git": {"repository_suffix": "%{repository_suffix}", "repository_url": "%{repository_url}", "branch": "%{branch}", "commit_id": "%{commit_id}"}}
8. Select `Code commits` and/or `Git Push` in the `Post updates about:` section.
9. Click `Add`.

That's all! The next time you **push code** a build will be triggered (if you have Trigger mapping defined for the event(s) on Bitrise).

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Let's add an Assembla webhook!</div>
	<a target="_blank" href="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta"><button class="button">Go to Bitrise now</button></a>
</div>