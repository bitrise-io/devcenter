---
title: Visual Studio webhookの追加 (Adding a Visual Studio webhook)
redirect_from: []
date: 2019-03-28 13:58:24 +0000
published: false

---
You can set up webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action, such as a code push or a pull request. For Visual Studio, all you have to do is register your `bitrise-webhooks` URL for a [visualstudio.com](https://visualstudio.com) _project_ as a `Service Hooks` integration.

You can find an official guide on [visualstudio.com 's documentations site](https://www.visualstudio.com/en-us/get-started/integrate/service-hooks/webhooks-and-vso-vs).

## Get the webhook URL for Visual Studio

1. Go to the `Code` tab of your app's page and in the `INCOMING WEBHOOKS` menu, click `SETUP MANUALLY`.
2. Select `Visual Studio Online / Visual Studio Team Services` from the dropdown menu.

   ![Screenshot](/img/bitrise-visual-webhook.png)
3. Copy the webhook URL for the selected service.

## Set up webhook on Visual Studio

1. Open your _project_ on [visualstudio.com](https://visualstudio.com).
2. Go to the _Admin/Control panel_ of the _project_.
3. Select `Service Hooks`.

   ![Screenshot](/img/webhooks/visual-studio-service-hooks.png)
4. Click `Create subscription`.
5. Create a service integration:
   * In the Service list select the `Web Hooks` option.

     ![Screenshot](/img/webhooks/visual-studio-new-service.png)
   * Select the `Code pushed` event as the _Trigger_.

     ![Screenshot](/img/webhooks/visual-studio-code-pushed.png)
   * In the `Filters` section select the `Repository` you want to integrate.
   * You can leave the other filters on default.
   * Click `Next`.
   * On the `Action` setup form enter the `bitrise-webhooks` URL (`.../h/visualstudio/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) in the `URL` field. You can leave every other option on default.

     ![Screenshot](/img/webhooks/visual-studio-webhook-url.png)
6. Click `Finish`

That's all! The next time you **push code** or **push a new tag** a build will be triggered (if you have Trigger mapping defined for the event(s) on Bitrise).