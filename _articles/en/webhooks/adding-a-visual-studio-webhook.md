---
title: Adding a Visual Studio webhook
menu:
  webhooks-main:
    weight: 12

---
You can set up webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action, such as a code push or a pull request. For Visual Studio, all you have to do is register your `bitrise-webhooks` URL for
a [visualstudio.com](https://visualstudio.com) project as a **Service Hooks** integration.

## Get the webhook URL for Visual Studio

1. Go to the Code tab of your app's page and in the **INCOMING WEBHOOKS** menu, click **SETUP MANUALLY**.
2. Select **Visual Studio Online / Visual Studio Team Services** from the dropdown menu.

   ![{{ page.title }}](/img/bitrise-visual-webhook.png)
3. Copy the webhook URL for the selected service.

## Set up webhook on Visual Studio

1. Open your project on [visualstudio.com](https://visualstudio.com).
2. Go to the **Admin/Control pane** of the project.
3. Select **Service Hooks**.

   ![{{ page.title }}](/img/webhooks/visual-studio-service-hooks.png)
4. Click **Create subscription**.
5. Create a service integration:
   * In the Service list select the **Web Hooks** option.

     ![{{ page.title }}](/img/webhooks/visual-studio-new-service.png)
   * Select the **Code pushed** event as the **Trigger**.

     ![{{ page.title }}](/img/webhooks/visual-studio-code-pushed.png)
   * In the **Filters** section select the **Repository** you want to integrate.
   * You can leave the other filters on default.
   * Click **Next**.
   * On the **Action** setup form enter the `bitrise-webhooks` URL (`.../h/visualstudio/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) in the **URL** field. You can leave every other option on default.

     ![{{ page.title }}](/img/webhooks/visual-studio-webhook-url.png)
6. Click **Finish**.

That's all! The next time you **push code** or **push a new tag**
a build will be triggered (if you have Trigger mapping defined for the event(s) on Bitrise).

{% include banner.html banner_text="Let's add a Visual Studio webhook" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your Dashboard" %}