---
title: iOS code signing - troubleshooting
date: 2018-10-11 11:28:48 +0000
menu:
  ios-code-signing:
    weight: 13

---
To make iOS code signing work on Bitrise, you generally need three things:

* a provisioning profile
* a .p12 certificate file
* setting the `Select method for export` input of the `Xcode Archive & Export for iOS` Step

To get your code signing files, you can:

- use our [codesigndoc](https://github.com/bitrise-tools/codesigndoc) tool
- [export them with Xcode](https://devcenter.bitrise.io/code-signing/ios-code-signing/exporting-code-signing-files/#exporting-certificates-using-xcode)
- [export them with the Keychain app](https://devcenter.bitrise.io/code-signing/ios-code-signing/exporting-code-signing-files/#exporting-manually)

If you suspect an error is related to code signing, there is almost certainly a problem with one of these three. When trying to build an iOS app on Bitrise, we strongly recommend generating an .ipa file of the app locally, on your own machine first. If that fails, the build will certainly fail on Bitrise, too.

Let's look into what you can do to make sure code signing works!

### The _Xcode Archive & Export for iOS_ Step fails with the error message _Code signing error_

Most of the time, this error means your project is missing either the correct .p12 certificate file or the correct provisioning profile - or the `Select method for export` input of the Step is set incorrectly. Here's what you can do:

* **Check that you have both a .p12 certificate and a provisioning profile uploaded to Bitrise**: go to your app's `Workflow Editor` and check the `Code Signing` tab. If you use the `iOS Auto Provision` Step, you only need to upload a .p12 certificate file.

![](/img/archive_fail.png)

* **Check that the provisioning profile and the .p12 certificate of your project match**. A Development type provisioning profile requires a Development certificate. An App Store, Ad-hoc or Enterprise type provisioning profile requires a Distribution certificate.

* **Check that the uploaded code signing files belong to the correct team IDs**. Also, make sure the provisioning profile contains the correct App ID.

* Check that your uploaded code signing files are valid! Remember that these files can and do expire or get revoked.

* **Check the** `Select method for export` **input of the Step in the Workflow Editor**. If, for example, it is set to `ad-hoc` or `app-store`, you need a Distribution type .p12 certificate file and either an Ad-hoc or an App Store type provisioning profile.

![](/img/export_fail.png)

* **Make sure that you do not have both the** `iOS Auto Provision` and the `Certificate and profile installer` **Steps in your workflow**. You cannot use both in the same workflow - your build will definitely fail.

### The _iOS Auto Provision Step_ fails

The `iOS Auto Provision` Step manages your provisioning profiles for you: it downloads the profiles from the Apple Developer portal and installs them for you. Here's what you can do if this Step fails:

* **If you are trying to use it with a Xamarin app**, you will have to swap it for the `Certificate and profile installer` Step. Automatic provisioning is not supported for Xamarin apps.

* **Before trying to use this Step, generate an .ipa file locally** - with the same export method you want to use on Bitrise - to ensure that the profiles are uploaded to the Apple Developer portal.

* **Make sure that your Bitrise account is connected to the Apple Developer portal** and that you have at least an Admin role in your Apple Developer team.

### I uploaded a Distribution certificate and an App Store type provisioning profile but I cannot deploy to the App Store because of a code signing error!

To export an .ipa file with the app-store or ad-hoc export methods, you also need to upload a Development certificate and Development type provisioning profile, as the first step of the .ipa export process uses that to generate an .xcodearchive file.

### I have added the _Run Cocoapods Install_ Step and now my builds are failing

Installing dependencies can result in a failed build for many reasons. When it comes to iOS code signing, problems can occur if you use the `iOS Auto Provision` Step. In practice, this means that in your Bitrise workflow, Steps that install dependencies - such as `Run Cocoapods Install` or `Carthage` - should be BEFORE the `iOS Auto Provision` Step.