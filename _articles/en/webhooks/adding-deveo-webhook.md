---
changelog:
last_modified_at:
title: Adding a Deveo webhook
menu:
  webhooks-main:
    weight: 16

---
You can set up webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action, such as a code push or a pull request. For Deveo, all you have to do is register your `bitrise-webhooks` URL for
a [Deveo](https://deveo.com) repository.

## Get the webhook URL for Deveo

1. Go to the **Code** tab of your app's page and in the **INCOMING WEBHOOKS** menu, click **SETUP MANUALLY**.
2. Select **Deveo** from the dropdown menu.

   ![Screenshot](/img/bitrise-deveo-webhook.png)
3. Copy the webhook URL for the selected service.

## Set up webhook on Deveo

1. Open your repository on [app.deveo.com](https://app.deveo.com).
2. Go to **Hooks** of the project.

   ![Screenshot](/img/webhooks/deveo-hooks.png)
3. Add a new Repository Hook by clicking the **+** button on the right.
4. Select your repository and select the **Webhook** service.

   ![Screenshot](/img/webhooks/deveo-add-hooks.png)
5. Enter the `bitrise-webhooks` URL (`.../h/deveo/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN` in the `Url` field).
6. Type `json` in the **Content type** field.
7. Click **Save hook**.

   ![Screenshot](/img/webhooks/deveo-save-hook.png)

That's all! The next time you **push code** or **push a new tag**
a build will be triggered (if you have Trigger mapping defined for the event(s) on Bitrise).

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Let's add a Deveo webhook!</div>
	<a target="_blank" href="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta"><button class="button">Go to your Dashboard!</button></a>
</div>