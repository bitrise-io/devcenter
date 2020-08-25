---
title: Deploying an iOS app to Bitrise.io
date: '2018-10-26T12:37:47.000+00:00'
redirect_from: []
tag:
- deploy
- ios
- code-signing
- testing
description: Deploy an app to Bitrise to be able to download the .ipa file and install
  it on devices specified in the app's Development Provisioning Profile. This way,
  your internal testers can easily test the app.
summary: ''
menu:
  ios-deploy:
    weight: 3

---
Deploy an app to Bitrise to be able to download the .ipa file and install it on devices specified in the app's Development type provisioning profile. This way, your internal testers can easily test the app.

#### Before you start

Make sure that you have:

* Generated an .ipa file locally, on your own machine, at least once.
* Uploaded all the Developer certificates that are included in the provisioning profile to Bitrise.
* Uploaded the app's Development Provisioning Profile if you want to use [manual provisioning](/code-signing/ios-code-signing/ios-manual-provisioning/) on Bitrise.
* [Registered your testers' devices](/testing/registering-a-test-device/) on Bitrise if you want to install the app from Bitrise, or from the notification email we'll send out.

{% include message_box.html type="important" title="Clear the cache" content="When trying to install an app from the public install page, you should clear the cache: click the link appearing in the **If you synced your settings from your old device, you need to clear the cache and register your new device** line. The link redirects to the **Account settings** page where you can follow the procedure described in our guide."%}

{% include message_box.html type="important" title="Developer certificate and Development profile" content="To deploy an iOS app, you will always need a Developer type certificate and a Development type provisioning profile. Even if you want to deploy to the App Store, these are still required: they are used to create the .xcodearchive file from the provided code in the process of exporting the .ipa file."%}

#### Deploying the app

{% include message_box.html type="important" title="Installing from the public install page" content="To install an app from the public install page, you must use a native Safari browser of the iOS device. You cannot click the installation link if you're browsing from a third-party app."%}

1. Make sure the **Certificate and profile installer** Step or the **iOS Auto Provision with App Store Connect API** Step is in your Workflow.

   Do NOT use both!
2. Make sure the **Xcode Archive & Export for iOS** Step is in your Workflow.
3. Set the **Select method for export** input of the Step to `development`.

   ![](/img/xcode-archive-export-method.png)

   You can use other export methods, too, but if you only deploy to Bitrise and want to install your app on the specified devices of internal testers, `development` is sufficient.
4. Make sure the **Deploy to Bitrise.io** Step is in your Workflow.

   By default, the value of the **Enable public page for the App?** input is set to `true`. This way, once the build runs, a public install page will be available with a long and random URL which can be shared with others who are not registered on Bitrise. This URL is sent to the users in an email. The **Notify: User Roles** and the **Notify: Emails** inputs determine which users get the email.
5. Start a build.
6. When the build is finished, go to the app's **Builds** page and click the latest build.
7. Click the **APPS & ARTIFACTS** tab to find your .ipa file.

   You can also find the public install URL here. Click the eye icon next to the .ipa file to reveal the details and to find the toggle for the public install page. Make sure that's toggled on so you're able to send the link to non-Bitrise users. 

   ![](/img/public-install-page.png)

And that's it! The file can now be installed on all the devices included in the app's provisioning profile. Remember: the installation link must be accessed from an iOS device's Safari browser!

{% include banner.html banner_text="Deploy to bitrise.io" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}