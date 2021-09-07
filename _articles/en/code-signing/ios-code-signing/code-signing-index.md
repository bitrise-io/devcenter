---
title: iOS code signing
redirect_from:
- "/code-signing/ios-code-signing/code-signing/"
tag:
- ios
- code-signing
description: 'Manage iOS code signing on Bitrise: collect and upload your code signing
  files using our tools, and export your app with the export method you specify.'
menu:
  code-signing-main:
    identifier: ios-code-signing
    weight: 3

---
To run a build of your iOS app on Bitrise, you will need to provide code signing files in some way. The code signing of iOS projects requires:

* **Signing certificates** in a .p12 format.
* **Provisioning profile** file(s) matching your project (team ID, bundle ID, and so on).
* A script, tool or step which installs these files in the build environment.

You can store your code signing files and create a signed .ipa file for your iOS project (either native or cross-platform), or a signed .app or .pkg file for your MacOS project on [bitrise.io](https://www.bitrise.io). You can manually upload all the required files (provisoning profiles and .p12 certificate files) or you can use automatic provisioning to automatically generate and manage provisioning profiles from a connected Apple Developer account. We'll show you how to use either option!

{% include message_box.html type="info" title="Manual versus automatic provisioning" content="To avoid confusion, do not mix manual and automatic provisioning Steps when you are setting up your project for the first time. With manual provisioning, you are uploading your certificates and provisioning profiles to Bitrise and then they are inserted in the virtual machine by a Step. With automatic provisioning, you are downloading your certificates and provisioning profiles directly from your Apple account."%}

We also support using Xcode's **Automatically manage signing** option, with both manual and automatic provisioning.

## iOS code signing procedure

The basic workflow of code signing is pretty straightforward:

1. [Collect the required files with our codesigndoc tool](/code-signing/ios-code-signing/collecting-files-with-codesigndoc).
2. Upload your code signing files to [bitrise.io](https://www.bitrise.io). You can upload the files using `codesigndoc` or manually on the website. For provisioning profiles, you can use:
   * [Manual provisioning](/code-signing/ios-code-signing/ios-manual-provisioning).
   * [Automatic provisioning](/code-signing/ios-code-signing/ios-auto-provisioning).
3. Use the **Xcode Archive & Export for iOS** or the **Xamarin Archive** Step to create a signed .ipa:
   * Xcode projects (this includes native iOS apps, as well as apps built with React Native, Flutter, or Ionic/Cordova): [Create a signed .ipa for Xcode projects](/code-signing/ios-code-signing/create-signed-ipa-for-xcode).
   * Xamarin projects: [Create a signed .ipa for Xamarin projects](/code-signing/ios-code-signing/create-signed-ipa-for-xamarin).

## iOS code signing with third party tools

You can use third party tools to manage code signing on Bitrise, such as [fastlane match](https://github.com/fastlane/fastlane/tree/master/match)
or [fastlane sigh](https://github.com/fastlane/fastlane/tree/master/sigh). However, we recommend using our own steps and tools.

{% include message_box.html type="important" title="Third party guide for code signing" content=" If you decide to use a third party tool for code signing management, please consult the tool's documentation and issue tracker, we only provide customer support for our own Step (**Certificate and profile installer**) and tools (`codesigndoc`)!"%}

Even if you use a third party tool to manage your code signing files, and you don't plan to upload any code signing file to bitrise.io, you should keep the **Certificate and profile installer** Step in your Workflow. This is because certain tools were not designed to work in an ephemeral environment, or in a full clean macOS install, and the **Certificate and profile installer** Step includes common workarounds for this situation. It's not guaranteed that it will help with the tool of your choice, but it won't cause any issue either.
