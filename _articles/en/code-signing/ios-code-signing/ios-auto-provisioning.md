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

With automatic provisioning, the [**iOS Auto Provision with App Store Connect API**](https://app.bitrise.io/integrations/steps/ios-auto-provision-appstoreconnect "/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/#ios-auto-provision-with-app-store-connect-api-step") or the [**iOS Auto Provision with Apple ID **](https://app.bitrise.io/integrations/steps/ios-auto-provision "/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/#ios-auto-provision-with-apple-id-step")Step will manage the Provisioning Profiles. You only have to upload the .p12 certificate files manually to [bitrise.io](https://www.bitrise.io/ "https://www.bitrise.io/").

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
6. Add the iOS Auto Provision Step of your choice.

### Configuring the iOS Auto Provision with App Store Connect API Step

Before you start using the iOS Auto Provision Step in your Workflow, make sure you have [connected your Apple Developer Account to Bitrise and assigned an Apple Developer Account to your app](/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/ "/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/#ios-auto-provision-with-app-store-connect-api-step"). Once these are done, the [**iOS Auto Provision with App Store Connect API**](https://www.bitrise.io/integrations/steps/ios-auto-provision-appstoreconnect) Step inputs need very little configuration.

1. Add the **iOS Auto Provision with App Store Connect API** after any dependency installer Step in your Workflow, such as [**Run CocoaPods install**](https://www.bitrise.io/integrations/steps/cocoapods-install) or [**Carthage**](https://www.bitrise.io/integrations/steps/carthage).
2. Make sure that you do NOT modify your Xcode project between the **iOS Auto Provision with App Store Connect API** and the [**Xcode Archive & Export for iOS**](https://www.bitrise.io/integrations/steps/xcode-archive) Steps. For example, do not change the bundle ID after the **iOS Auto Provision with App Store Connect API** Step.
3. Click the Step to edit its input fields. You can see that the **Build API token**, **Build URL**, and the **Xcode Project (or Workspace)** path are automatically filled out for you.
   * **Build API token**: Every running build has a temporary API token on a Bitrise virtual machine. This token is only available while the build is running. The Step downloads the connected API key with the help of this API token and Bitrise saves it in a JSON file.
   * **Build URL:** The path where the JSON file is located.
   * **Xcode Project path:** The path where the `.xcodepro`j or `.xcworkspace` are located.
4. **Distribution type** input's value has to match with the value of the **Select method for export** input in the **Xcode Archive & Export for iOS** step.
5. **Scheme name** input: you can restrict which targets to process.

### Configuring the iOS Auto Provision with Apple ID Step

If you are using the **iOS Auto Provision with Apple ID** Step in your Workflow, make sure you have [connected to your Apple Developer Account and assigned an Apple Developer Account to your app](/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/).

1. Add the **iOS Auto Provision with Apple ID** after any dependency installer Step in your Workflow, such as [**Run CocoaPods install**](https://www.bitrise.io/integrations/steps/cocoapods-install) or [**Carthage**](https://www.bitrise.io/integrations/steps/carthage). 
2. Make sure that you do NOT modify your Xcode project between the **iOS Auto Provision with Apple ID** and the [**Xcode Archive & Export for iOS**](https://www.bitrise.io/integrations/steps/xcode-archive) Steps. For example, do not change the bundle ID after the **iOS Auto Provision with Apple ID** Step.
3. **The Developer Portal team ID** - find this on the [Membership Details page of your Apple Developer Portal account](https://developer.apple.com/account/#/membership).
4. **Distribution type** - make sure its value matches the value of the **Select method for export** input in the **Xcode Archive & Export for iOS step**. Read more about archiving and exporting an .ipa in our [Creating a signed .ipa for Xcode](https://devcenter.bitrise.io/code-signing/ios-code-signing/create-signed-ipa-for-xcode/) projects guide.
5. **Scheme** - you can restrict which targets to process. 
6. Optionally, you can set one more input if you use the **Automatically manage signing** option in Xcode: if the input of **Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?** is set to `true` , then the Step will try to generate a profile. If you use manual code signing in Xcode, this input has no effect.

If `codesigndoc` does not pick up one or more distribution .p12 files, you can export those manually from the **Keychain Access** app, just like you would when you transfer these files between Macs.

{% include banner.html banner_text="Set up automatic provisioning" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}