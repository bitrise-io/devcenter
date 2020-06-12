---
title: Managing iOS code signing files - automatic provisioning
tag:
- ios
- " app-store"
- xcode
- code-signing
- files
redirect_from: []
description: Manage your code signing files on bitrise.io. You can use iOS automatic
  provisioning to automatically download or generate the required provisioning profiles
  for your project.
summary: ''
menu:
  ios-code-signing:
    weight: 4

---
Manage your code signing files on [bitrise.io](https://www.bitrise.io). You can use iOS automatic provisioning to automatically download or generate the required provisioning profiles for your project.

With automatic provisioning, the **iOS Auto Provision with App Store Connect API** Step will manage the Provisioning Profiles. You only have to upload the .p12 certificate files manually to [bitrise.io](https://www.bitrise.io).

{% include message_box.html type="important" title="Upload the distribution AND the development signing certificates" content=" We strongly recommend uploading BOTH the development and distribution signing certificates for your project. Without the different types of certificates, you will not be able to generate different types of signed .ipa files. "%}

## Before you start

Before setting up automatic provisioning in your workflow, make sure that:

* You collected the required files with [codesigndoc](https://github.com/bitrise-tools/codesigndoc). You can also upload the distribution and development certificates with the tool!
* You have at least **Admin** role in the developer portal team.
* [your Apple Developer account is connected to bitrise.io](/getting-started/connecting-apple-dev-account/).
* Apple Developer Portal integration to your Bitrise project is enabled.

{% include message_box.html type="important" title="iOS Auto Provision with App Store Connect API" content="Automatic provisioning with the **iOS Auto Provision with App Store Connect API** Step is not supported for Xamarin apps!"%}

Once you are ready, proceed to uploading your files and setting up your workflow.

## Configuring iOS auto provisioning

1. Open your app on your **Dashboard**.
2. Select the **Workflow Editor** tab.
3. Select the **Code Signing** tab.
4. Make sure you have the .p12 certificate files uploaded.
   If not, add the .p12 files in the **Add the private key (.p12) for signing** field. Make sure you upload the correct certificate type: for example, to release your app to the App Store, you need a Distribution certificate.

   ![Uploading certificates and Provisioning Profiles](/img/code-signing/ios-code-signing/provisioning-and-certificate-upload.png)
   For a MacOS app, the provisioning profile file extension is `.provisionprofile`; for an iOS app, the file extension is `.mobileprovision`.
5. Make sure that you do NOT have the **Certificate and profile installer** Step in your Workflow.

   There is no need to have both and it might cause unforeseen issues.
6. Add the **iOS Auto Provision with App Store Connect API** Step to your app's Workflow.
   You can check it on the **Workflow** tab of the **Workflow Editor**.

   Please note that this step must come **AFTER** any dependency installer Step in your Workflow, such as **Run CocoaPods install** or **Carthage**. Make sure that you do NOT modify your Xcode project between the **iOS Auto Provision with App Store Connect API** and the **Xcode Archive & Export for iOS** Steps. For example, do not change the bundle ID after the **iOS Auto Provision with App Store Connect API** Step.

   ![](/img/iosautoprov.png)
7. Fill the required inputs of the step:
   * **The Developer Portal team id** - find this on the [Membership Details page of your Apple Developer Portal account](https://developer.apple.com/account/#/membership)
   * **Distribution type** - make sure its value matches the value of the **Select method for export** input in the **Xcode Archive & Export for iOS step**. Read more about archiving and exporting an .ipa in our [Creating a signed .ipa for Xcode](/code-signing/ios-code-signing/create-signed-ipa-for-xcode/) projects guide.
   * **Scheme** - you can restrict which targets to process.
8. Make sure your Apple Developer account is connected on the **Teams** tab of your app.

   It is not enough to simply connect the account to your Bitrise account: you need to also connect it to the app itself.
   Optionally, you can set one more input if you use the **Automatically manage signing** option in Xcode: if the input marked with **Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?** is set to `true` then the Step will try to generate a profile. If you use manual code signing in Xcode, this input has no effect.

If `codesigndoc` does not pick up one or more distribution .p12 files, you can export those manually from the **Keychain Access** app, just like you would when you transfer these files between Macs.

{% include banner.html banner_text="Set up automatic provisioning" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}