---
title: Deploying an iOS app to Bitrise.io
date: 2018-10-26 12:37:47 +0000
redirect_from: []
menu:
  ios-deploy:
    weight: 2

---
Deploy an app to Bitrise to be able to download the .ipa file and install it on devices specified in the app's Development Provisioning Profile. This way, your internal testers can easily test the app.

#### Before you start

Make sure that you have:

* generated an .ipa file locally, on your own machine, at least once
* uploaded all the Developer certificates that are included in the provisioning profile to Bitrise
* uploaded the app's Development Provisioning Profile if you want to use [manual provisioning](/code-signing/ios-code-signing/ios-manual-provisioning/) on Bitrise
* [registered your testers' devices](/testing/registering-a-test-device/) on Bitrise if you want to install the app from Bitrise, or from the notification email we'll send out

{% include message_box.html type="important" title="My message" content="To deploy an iOS app, you will **always** need a Developer type certificate and a Development type provisioning profile. Even if you want to deploy to the App Store, the these are still required: they are used to create the .xcodearchive file from the provided code in the process of exporting the .ipa file."%}

#### Deploying the app

1. Make sure the `Certificate and profile installer` Step or the `iOS Auto Provision` Step is in your workflow.

   Do NOT use both!
2. Make sure the `Xcode Archive & Export for iOS` Step is in your workflow.
3. Set the `Select method for export` input of the Step to `development`.

   You can use other export methods, too, but if you only deploy to Bitrise and want to install your app on the specified devices of internal testers, `development` is sufficient.

   ![](/img/code-signing/ios-code-signing/xcode-archive-export-method.png)
4. Make sure the `Deploy to Bitrise.io` Step is in your workflow.

   By default, the value of the `Enable public page for the App?` input is set to `true`. This way, once the build runs, a public install page will be available with a long and random URL which can be shared with others who are not registered on Bitrise. This URL is sent to the users in an email. The `Notify: User Roles` and the `Notify: Emails` inputs determine which users get the email.
5. Start a build.
6. When the build is finished, go to the app's `Builds` page and click the latest build.
7. Click the `APPS & ARTIFACTS` tab to find your .ipa file.

   You can also find the public install URL here. 

   ![](/img/public-install-page.png)

And that's it! The file can now be installed on all the devices included in the app's provisioning profile.