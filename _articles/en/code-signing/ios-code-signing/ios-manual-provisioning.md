---
title: Managing iOS code signing files - manual provisioning
tag:
- ios
- code-signing
- files
- xcode
summary: Manage your code signing files on bitrise.io. With manual provisioning, you
  can collect your Provisioning Profiles and .p12 certificates with our codesigndoc
  tool and then upload them manually or by using the tool.
redirect_from: []
menu:
  ios-code-signing:
    weight: 6

---
Manage your code signing files on [bitrise.io](https://www.bitrise.io). With manual provisioning, you can collect your Provisioning Profiles and .p12 certificates with our [codesigndoc](https://github.com/bitrise-tools/codesigndoc) tool and then upload them manually or by using the tool.

We support _Automatically manage signing_ option, introduced in Xcode 8, with your project. In this case, create an IPA of the desired type on your local machine to let Xcode generate the required profiles and then codesigndoc can collect these. If your project changes and Xcode re-generates the profiles, you will need to re-upload these profiles to Bitrise as well.

If you collected all the necessary files with the codesigndoc tool, proceed to uploading them and setting up your workflow. In this example, we'll be uploading the code signing files manually - however, you can do this with the codesigndoc tool, too!

{% include message_box.html type="important" title="Development profile and certificate" content="You always need to upload at least a Developer certificate and a Development type Provisioning Profile! That is necessary for our Xcode Steps to be able to test and build your apps properly."%}

1. Open your app on your `Dashboard`.
2. Select the `Workflow Editor` tab.
3. Select the `Code Signing` tab.
4. Make sure that the Provisioning Profile files and the .p12 files are uploaded. If not, add them in the `Add Provisioning Profile(s)` and the `Add the private key (.p12) for signing` fields, respectively.

   ![Uploading certificates and Provisioning Profiles](/img/code-signing/ios-code-signing/provisioning-and-certificate-upload.png)

   For a MacOS project, the Provisioning Profile file extension is `.provisionprofile`; for an iOS project, the file extension is `.mobileprovision`.
5. Make sure you have the `Certificate and profile installer` step in your app's Workflow. You can check it on the `Workflow` tab of the `Workflow Editor`.

   Please note that these steps must be **BEFORE** the steps that archive and export your project (for example, `Xcode Archive & Export for iOS`) in your workflow.

   ![Certificate and profile installer step in your workflow](/img/code-signing/ios-code-signing/workflow-with-cert-prof-inst.png)

If `codesigndoc` does not pick up one or more distribution .p12 files and/or Provisioning Profile(s), you can export those manually (.p12 from `Keychain Access` app, Provisioning Profiles from [Apple Developer Portal](https://developer.apple.com/)), just like you would when you transfer these files between Macs.

But **even if** `**codesigndoc**` **does not find all the files, you should upload all the files collected by** `**codesigndoc**`**!** The base files collected by `codesigndoc` are essential for your project's code signing: without those it's not possible to create a signed IPA for the project!

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Set up manual provisioning</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>