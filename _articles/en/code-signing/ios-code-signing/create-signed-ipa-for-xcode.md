---
title: Creating a signed .ipa for Xcode projects
menu:
  ios-code-signing:
    weight: 5

---
You can easily create a signed IPA for your Xcode project with Bitrise. All you need to do is set the relevant inputs of our `Xcode Archive & Export for iOS` step!

Before setting up IPA export, make sure that:

* your code signing files have been collected: we recommend using our [codesigndoc](https://github.com/bitrise-tools/codesigndoc) tool.
* you have the required steps in your workflow to manage code your signing files:
* `Certificate and profile installer` if you uploaded your Provisioning Profiles manually.
* `iOS Auto Provisioning` if you connected your Bitrise account to your Apple Developer account for automatic provisioning.

If you're all set, proceed to setting up IPA export in your workflow:

1. Make sure you have the `Xcode Archive & Export for iOS` step in the app's Workflow Editor, depending on your project type. Select your step.

1. Set the `Select method for export` input of the step to the type of code signing you want to use.

    ![Select export method for Xcode Archive for iOS](/img/code-signing/ios-code-signing/xcode-archive-export-method.png)

    If you use automatic provisioning, make sure it matches the value of the `Distribution type` input of the `iOS Auto Provisioning` step. The options are:

    * `auto-detect` - please note that this option is deprecated and will be removed. We do not recommend using it.

    * `app-store`

    * `ad-hoc`

    * `enterprise`

    * `development`.

1. Save the Workflow, and start a new build.

That's all. Xcode will auto select the right signing files based on your project's Bundle ID and
Team ID settings, and the Export Method you set.

If you want to sign the IPA with a different team's code signing files (e.g.
if you use your company's code signing for internal builds, but your client's
code signing files for App Store distribution), all you have to do is to set
the `The Developer Portal team to use for this export` option as well (in addition
to the `Select method for export`).