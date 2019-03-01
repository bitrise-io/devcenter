---
title: Managing iOS code signing files - automatic provisioning
menu:
  ios-code-signing:
    weight: 3

---
Manage your code signing files on [bitrise.io](https://www.bitrise.io). You can use iOS automatic provisioning to automatically download or generate the required Provisioning Profiles for your project.

With automatic provisioning, the `iOS Auto Provision` step will manage the Provisioning Profiles. You only have to upload the .p12 certificate files manually to [bitrise.io](https://www.bitrise.io).

{% include message_box.html type="important" title="Upload the distribution AND the development signing certificates" content=" We strongly recommend uploading **BOTH** the development and distribution signing certificates for your project. Without the different types of certificates, you will not be able to generate different types of signed IPAs. "%}

Before setting up automatic provisioning in your workflow, make sure that:

* you collected the required files with [codesigndoc](https://github.com/bitrise-tools/codesigndoc). You can also upload the distribution and development certificates with the tool!
* you have at least **Admin** role in the developer portal team.
* [your Apple Developer account is connected to bitrise.io](/getting-started/signing-up/connecting-apple-dev-account/).
* Apple Developer Portal integration to your Bitrise project is enabled.

{% include message_box.html type="important" title="iOS Auto Provision" content="Automatic provisioning with the `iOS Auto Provision` Step is not supported for Xamarin apps!"%}

Once you are ready, proceed to uploading your files and setting up your workflow:

1. Open your app on your `Dashboard`.
2. Select the `Workflow Editor` tab.
3. Select the `Code Signing` tab.
4. Make sure you have the .p12 certificate files uploaded. If not, add the .p12 files in the `Add the private key (.p12) for signing` field.

   ![Uploading certificates and Provisioning Profiles](/img/code-signing/ios-code-signing/provisioning-and-certificate-upload.png)
   For a MacOS project, the Provisioning Profile file extension is `.provisionprofile`; for an iOS project, the file extension is `.mobileprovision`.
5. Make sure that you do **NOT** have the `Certificate and profile installer` step in your Workflow. If you have both `iOS Auto Provision` and `Certificate and profile installer` steps in your Workflow, your build will fail.
6. Add the `iOS Auto Provision` step to your app's Workflow. You can check it on the `Workflow` tab of the `Workflow Editor`.

   Please note that this step must come **AFTER** any dependency installer step in your workflow, such as `Run CocoaPods install` or `Carthage`. Make sure that you do **NOT** modify your Xcode project between the `iOS Auto Provision` and the `Xcode Archive & Export for iOS` steps. For example, do not change the bundle ID after the `iOS Auto Provision` step.

   ![iOS Auto Provisioning in your workflow](/img/code-signing/ios-code-signing/workflow-with-auto-prov.png)
7. Fill the required inputs of the step.
   * `The Developer Portal team id` - find this on the [Membership Details page of your Apple Developer Portal account](https://developer.apple.com/account/#/membership)
   * `Distribution type` - make sure its value matches the value of the `Select method for export` input in the `Xcode Archive & Export for iOS step`.
   * `Scheme` - you can restrict which targets to process.

Optionally, you can set one more input if you use the _Automatically manage signing option_ in Xcode: if the input marked with `Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?` is set to `true` then the step will try to generate a profile. If you use manual code signing in Xcode, this input has no effect.

If `codesigndoc` does not pick up one or more distribution .p12 files, you can export those manually from the `Keychain Access` app, just like you would when you transfer these files between Macs.