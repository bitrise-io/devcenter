---
title: Managing iOS code signing files - manual provisioning
tag:
- ios
- code-signing
- files
- xcode
description: Manage your code signing files on bitrise.io. With manual provisioning,
  you can collect your Provisioning Profiles and .p12 certificates with our codesigndoc
  tool and then upload them manually or by using the tool.
redirect_from: []
menu:
  ios-code-signing:
    weight: 6

---
Manage your code signing files on [bitrise.io](https://www.bitrise.io). Collect your provisioning profiles and .p12 certificates with our [codesigndoc](https://github.com/bitrise-tools/codesigndoc) tool, and then upload them to Bitrise manually or by using the tool.

## Collecting code signing files

[If you collected all the necessary files](/code-signing/ios-code-signing/collecting-files-with-codesigndoc/) with the `codesigndoc` tool, proceed to uploading them and setting up your Workflow. You can upload the files manually or you can do this with the `codesigndoc` tool, too!

{% include message_box.html type="info" title="Xcode managed signing" content="We support the **Automatically manage signing** option, introduced in Xcode 8, with your app. In this case, create an .ipa of the desired type on your local machine to let Xcode generate the required profiles and then `codesigndoc` can collect these. If your app changes and Xcode re-generates the profiles, you will need to re-upload these profiles to Bitrise as well."%}

## Uploading code signing files

{% include message_box.html type="important" title="Development profile and certificate" content="You always need to upload at least a Developer certificate and a Development type provisioning profile! That is necessary for our Xcode Steps to be able to test and build your apps properly."%}

1. Open your app on your **Dashboard.**
2. Select the **Workflow Editor** tab.
3. Select the **Code Signing** tab.
4. Make sure that the provisioning profiles and the .p12 files are uploaded.

   If not, add them in the **Add Provisioning Profile(s)** and the **Add the private key (.p12) for signing** fields, respectively.

   ![Uploading certificates and Provisioning Profiles](/img/code-signing/ios-code-signing/provisioning-and-certificate-upload.png)

   For a MacOS app, the provisioning profile file extension is `.provisionprofile`; for an iOS app, the file extension is `.mobileprovision`.
5. Make sure you have the **Certificate and profile installer** Step in your app's Workflow.
   You can check it on the **Workflow** tab of the Workflow Editor.

   Please note that these Steps must be **BEFORE** the Steps that archive and export your app (for example, **Xcode Archive & Export for iOS**) in your Workflow.

   ![Certificate and profile installer step in your workflow](/img/code-signing/ios-code-signing/workflow-with-cert-prof-inst.png)

If `codesigndoc` does not pick up one or more distribution .p12 files and/or provisioning profile(s), you can export those manually (the .p12 file from the **Keychain Access** app, provisioning profiles from [Apple Developer Portal](https://developer.apple.com/)), just like you would when you transfer these files between Macs.

But even if `codesigndoc` does not find all the files, you should upload all the files collected by `codesigndoc**`! The base files collected by `codesigndoc` are essential for your app's code signing: without those it's not possible to create a signed .ipa of the app!

{% include banner.html banner_text="Set up manual provisioning" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}