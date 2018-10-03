---
title: iOS code signing on Bitrise
redirect_from:
- "/ios/code-signing/"
menu:
  ios-code-signing:
    weight: 1

---
To run a build of your iOS app on Bitrise, you will need to provide code signing files in some way. The code signing of iOS projects requires:

* **Signing certificates** in a .p12 format
* **Provisioning Profile** file(s) matching your project (team ID, bundle ID, ...)
* a script, tool or step which installs these files in the build environment.

You can store your code signing files and create a signed .ipa file for your iOS project (Xcode or Xamarin), or a signed .app or .pkg file for your MacOS project on [bitrise.io](https://www.bitrise.io). You can manually upload all the required files (Provisoning Profiles and .p12 certificate files) or you can use automatic provisioning to automatically generate and manage Provisioning Profiles from a connected Apple Developer account. We'll show you how to use both options!

We also support using Xcode's **Automatically manage signing** option, with both manual and automatic provisioning.

### iOS code signing procedure

The basic workflow of code signing is pretty straightforward:

1. [Collect the required files with our codesigndoc tool](/code-signing/ios-code-signing/collecting-files-with-codesigndoc).
2. Upload your code signing files to [bitrise.io](https://www.bitrise.io). You can upload the files using `codesigndoc` or manually on the website. For Provisioning Profiles, you can use:
   * [manual provisioning](/code-signing/ios-code-signing/ios-manual-provisioning)
   * [automatic provisioning](/code-signing/ios-code-signing/ios-auto-provisioning).
3. Use the `Xcode Archive & Export for iOS` or the `Xamarin Archive` step to create a signed `.ipa`:
   * Xcode projects: [Create a signed .ipa for Xcode projects](/code-signing/ios-code-signing/create-signed-ipa-for-xcode)
   * Xamarin projects: [Create a signed .ipa for Xamarin projects](/code-signing/ios-code-signing/create-signed-ipa-for-xamarin)

### iOS code signing with third party tools

You can use third party tools to manage code signing on Bitrise, such as [fastlane match](https://github.com/fastlane/fastlane/tree/master/match)
or [fastlane sigh](https://github.com/fastlane/fastlane/tree/master/sigh). However, we recommend using our own steps and tools.

{% include message_box.html type="important" title="Third party guide for code signing" content=" If you decide to use a third party tool for code signing management, please consult the tool's documentation and issue tracker, we only provide customer support for our own Step (`Certificate and profile installer`) and tools (`codesigndoc`)!"%}

Even if you use a third party tool to manage your code signing files, and you don't plan to upload any code signing file to bitrise.io, you should keep the `Certificate and profile installer` step in your Workflow. This is because certain tools were not designed to work in an ephemeral environment, or in a full clean macOS install, and the `Certificate and profile installer` includes common workarounds for this situation. It's not guaranteed that it will help with the tool of your choice, but it won't cause any issue either.