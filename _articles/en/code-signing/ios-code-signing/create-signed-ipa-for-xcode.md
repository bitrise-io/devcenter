---
title: Creating a signed .ipa for Xcode projects
tag:
- xcode
- ios
- code-signing
- app-store
description: You can easily create a signed IPA for your Xcode project with Bitrise. All
  you need to do is set the relevant inputs of our Xcode Archive & Export for iOS
  step!
redirect_from: []
menu:
  ios-code-signing:
    weight: 8

---
You can easily create a signed .ipa file for your Xcode project with Bitrise. All you need to do is set the relevant inputs of our **Xcode Archive & Export for iOS** Step!

## Before you start

Before setting up .ipa export, make sure that:

* Your code signing files have been collected and uploaded to Bitrise: we recommend using our [codesigndoc](https://github.com/bitrise-tools/codesigndoc) tool.
* You have the required Steps in your workflow to manage code your signing files:
  * **Certificate and profile installer** if you [uploaded your provisioning profiles manually](/code-signing/ios-code-signing/ios-manual-provisioning/).
  * **iOS Auto Provisioning** if you connected your Bitrise account to your Apple Developer account for [automatic provisioning](/code-signing/ios-code-signing/ios-auto-provisioning/).

{% include message_box.html type="important" title="Development profile and certificate" content="You always need to upload at least a Developer certificate and a Development type provisioning profile! That is necessary for our Xcode Steps to be able to test and build your apps properly."%}

If you're all set, proceed to setting up .ipa export in your Workflow.

## Exporting an .ipa

1. Make sure you have the **Xcode Archive & Export for iOS** Step in your Workflow.
2. Set the **Select method for export** input of the Step to the type of code signing you want to use.

   ![Select export method for Xcode Archive for iOS](/img/code-signing/ios-code-signing/xcode-archive-export-method.png)

   If you use automatic provisioning, make sure it matches the value of the **Distribution type** input of the **iOS Auto Provisioning** Step. The options are:
   * `auto-detect` - Please note that this option is deprecated and will be removed. We do not recommend using it.
   * `app-store`.
   * `ad-hoc`.
   * `enterprise`.
   * `development`.
3. Save the Workflow, and start a new build.

That's all. Xcode will automatically select the right signing files based on your project's Bundle ID and Team ID settings, and the export method you set.

If you want to sign the .ipa file with a different team's code signing files (for example, if you use your company's code signing for internal builds, but your client's code signing files for App Store distribution), all you have to do is to set
the **The Developer Portal team to use for this export** option as well (in addition to the **Select method for export**).

<div class="banner">
<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
<div class="deploy-text">Sign your .ipa for Xcode projects</div>
<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>
