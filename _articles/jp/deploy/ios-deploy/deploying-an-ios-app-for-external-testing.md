---
# jp title missing
title: Deploying an iOS app for external testing
date: 2018-10-26 12:39:01 +0000
redirect_from: []
menu:
  ios-deploy:
    weight: 3

---

{% include not_translated_yet.html %}

Before deploying your app to the App Store, you might want to release it to external testers who can test it on their devices outside the development environment. If you do not want to use Testflight, then you can do this by exporting an .ipa file with the **ad-hoc** export method.

{% include message_box.html type="important" title="Using Testflight" content="If you wish to invite external testers using Testflight, you CANNOT use the **ad-hoc** export method. You need an .ipa with the **app-store** export method."%}

#### Before you start

Make sure that you have:

* generated an .ipa file locally, on your own machine, at least once
* uploaded all the Developer certificates that are included in the provisioning profile to Bitrise
* uploaded the app's Development Provisioning Profile if you want to use [manual provisioning](/code-signing/ios-code-signing/ios-manual-provisioning/) on Bitrise. If you use [auto-provisioning](), you don't need to upload a profile.
* uploaded a Distribution certificate for the app
* uploaded an Ad-hoc Provisioning Profile (if you want to use manual provisioning)

#### Deploying the app

1. Make sure the `Certificate and profile installer` Step or the `iOS Auto Provision` Step is in your workflow.

   Do NOT use both!
2. Make sure the `Xcode Archive & Export for iOS` Step is in your workflow.
3. Set the `Select method for export` input of the Step to `ad-hoc`.
4. Make sure you have the `Deploy to Bitrise.io` Step in your workflow.
5. Start a build.
6. When the build is finished, go to the app's `Builds` page and click the latest build.
7. Click the `APPS & ARTIFACTS` tab to find your .ipa file that you can distribute.
