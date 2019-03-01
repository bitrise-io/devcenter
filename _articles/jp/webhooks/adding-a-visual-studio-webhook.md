---
# jp title missing
title: Adding a Visual Studio webhook
menu:
  webhooks:
    weight: 7

---

{% include not_translated_yet.html %}

You can set up webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action, such as a code push or a pull request. For Visual Studio, all you have to do is register your `bitrise-webhooks` URL for
a [visualstudio.com](https://visualstudio.com) *project* as a `Service Hooks` integration.

You can find an official guide
on [visualstudio.com 's documentations site](https://www.visualstudio.com/en-us/get-started/integrate/service-hooks/webhooks-and-vso-vs).

## Get the webhook URL for Visual Studio

1. Go to the `Code` tab of your app's page and in the `INCOMING WEBHOOKS` menu, click `SETUP MANUALLY`.

1. Select `Visual Studio Online / Visual Studio Team Services` from the dropdown menu.

    ![Screenshot](/img/bitrise-visual-webhook.png)

1. Copy the webhook URL for the selected service.

## Set up webhook on Visual Studio

1. Open your *project* on [visualstudio.com](https://visualstudio.com).
1. Go to the *Admin/Control panel* of the *project*.
1. Select `Service Hooks`.

    ![Screenshot](/img/webhooks/visual-studio-service-hooks.png)

1. Click `Create subscription`.
1. Create a service integration:

    * In the Service list select the `Web Hooks` option.

        ![Screenshot](/img/webhooks/visual-studio-new-service.png)

    * Select the `Code pushed` event as the *Trigger*.

        ![Screenshot](/img/webhooks/visual-studio-code-pushed.png)

    * In the `Filters` section select the `Repository` you want to integrate.
    * You can leave the other filters on default.
    * Click `Next`.
    * On the `Action` setup form enter the `bitrise-webhooks` URL (`.../h/visualstudio/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) in the `URL` field. You can leave every other option on default.

        ![Screenshot](/img/webhooks/visual-studio-webhook-url.png)

1. Click `Finish`

That's all! The next time you __push code__ or __push a new tag__
a build will be triggered (if you have Trigger mapping defined for the event(s) on Bitrise).
