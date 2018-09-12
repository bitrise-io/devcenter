---
title: Re-signing an .ipa
menu:
  ios-code-signing:
    weight: 7

---
During the development of your iOS app you will need multiple types of distributions for different purposes, such as internal testing or deployment to the App Store. The good news is that this does not require setting up two separate workflows on [bitrise.io](https://www.bitrise.io).

Before you start, you need to:

* upload different types of .p12 certificates (for example, developer and distribution certificates)
* upload the associated Provisioning Profiles (or managing them automatically with the `iOS Auto Provisioning` step)

If all your code signing files are in place, proceed to setting up your workflow. In this example we'll be setting up a workflow to create two signed .ipa files: one with the `development` and one with the `app-store` export method.

1. Make sure you have the `Xcode Archive & Export for iOS` step in your workflow, and select it.

   Please note that this step must come **AFTER** either the `Certificate and profile installer` or the `iOS Auto Provisioning` step in your workflow.
2. In the list of input variables, navigate to `Select method for export` and select `development` from the dropdown menu.

   ![Select export method for Xcode Archive for iOS](/img/code-signing/ios-code-signing/xcode-archive-export-method.png)
3. Add the `Export iOS and tvOS Xcode archive` step to your workflow.
4. In the list of input variables, navigate to `Select method for export` and select `app-store` from the dropdown menu.

   ![Export method input variable](/img/code-signing/ios-code-signing/export-ios-step-for-resigning.png)

And you're done! Feel free to add multiple `Export iOS and tvOS Xcode archive` steps to your workflow to create multiple different signed .ipa files if necessary.