---
# jp title missing
title: iOS code signing troubleshooting - draft
redirect_from: []
date: 2019-01-10 13:28:14 +0000
published: false

---

{% include not_translated_yet.html %}

To make iOS code signing work on Bitrise, you generally need three things:

* a provisioning profile
* a .p12 certificate file
* setting the `Select method for export` input of the `Xcode Archive & Export for iOS` Step

To get your code signing files, you can:

* use our [codesigndoc](https://github.com/bitrise-tools/codesigndoc) tool
* [export them with Xcode](https://devcenter.bitrise.io/code-signing/ios-code-signing/exporting-code-signing-files/#exporting-certificates-using-xcode)
* [export them with the Keychain app](https://devcenter.bitrise.io/code-signing/ios-code-signing/exporting-code-signing-files/#exporting-manually)

If you suspect an error is related to code signing, there is almost certainly a problem with one of these three. When trying to build an iOS app on Bitrise, we strongly recommend generating an .ipa file of the app locally, on your own machine first. If that fails, the build will certainly fail on Bitrise, too.

Let's look into what you can do to make sure code signing works!

## The _Xcode Archive & Export for iOS_ Step fails

If the Step fails, check the logs. If you see the message: `Code signing error` then this guide can hopefully help you find the solution!

![](/img/archive_fail.png)

Most of the time, this error means your project is missing either the correct .p12 certificate file or the correct provisioning profile - or the `Select method for export` input of the Step is set incorrectly.

### Manual provisioning

If you manually upload your provisioning profiles and use the `Certificate and profile installer` Step to install your code signing files, read on.

If you use the `iOS Auto Provision` Step, skip to [Automatic provisioning](/code-signing/ios-code-signing/ios-code-signing-troubleshooting/).

1. Check that you have both a .p12 certificate and a provisioning profile uploaded to Bitrise.

   To do so, go to your app's `Workflow Editor` and check the `Code Signing` tab.
2. Check that the provisioning profile and the .p12 certificate of your project match.

   A Development type provisioning profile requires a Development certificate. An App Store, Ad-hoc or Enterprise type provisioning profile requires a Distribution certificate. You can check the compatibility on the Code Signing tab: click `Show matching Certificates, Devices & Capabilities` under any provisioning profile.
3. Check that the uploaded code signing files belong to the correct team IDs.

   Also, make sure the provisioning profile is for the correct Bundle ID.
4. Check that your uploaded code signing files are valid!

   Remember that these files can and do expire or get revoked.
5. Check the `Select method for export` input of the Step in the Workflow Editor.

   If, for example, it is set to `ad-hoc` or `app-store`, you need a Distribution type .p12 certificate file and either an Ad-hoc or an App Store type provisioning profile.

   ![](/img/export_fail.png)
6. Check if the capability lists in the **iOS app** and in the **provisioning profile uploaded to the Developer Portal** match.

   ![](/img/capapbilities_xcode.png)

{% include message_box.html type="info" title="Xcode managed signing" content="If you use Xcode managed signing, the Step only accepts an Xcode managed provisioning profile.

Read more about it in [Apple's Technical Q&A](https://developer.apple.com/library/archive/qa/qa1814/_index.html)."%}

### Automatic provisioning

With the `iOS Auto Provision` Step, you do not need to manually upload a provisioning profile to Bitrise. You only need a certificate.

1. Check that you have a .p12 certificate uploaded to Bitrise.

   To do so, go to your app's `Workflow Editor` and check the `Code Signing` tab.

   Check that the uploaded code signing files belong to the correct team IDs.

   Also, make sure the provisioning profile is for the correct Bundle ID.
2. Check that your uploaded certificate is valid!

   Remember that these files can and do expire or get revoked.
3. Check the `Select method for export` input of the Step in the Workflow Editor.

   If, for example, it is set to `ad-hoc` or `app-store`, you need a Distribution type .p12 certificate file.
4. Check if the certificate is locked. If it is, check if the password is correct!

When you use the `iOS Auto Provision` Step, using Xcode managed signing is an important factor. Let's go through what can happen depending on whether you use the option.

#### If Xcode managed signing is enabled in the iOS app

1. Check the value of the `Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?` input is set to in the `iOS Auto Provision` step.
   * If it's set to `no`, the Step will look for an Xcode Managed Provisioning Profile on the Apple Developer Portal.
   * If it's set to `yes`, the Step will generate a new manual provisioning profile on the Apple Developer portal for the project.
2. Check if the capability lists in the iOS app and in the provisioning profile on the Developer Portal match.

   This is only relevant if the `iOS Auto Provision` Step is set to NOT generate a profile.

#### If Xcode managed signing is disabled in the iOS app

If you uncheck Xcode managed signing, the `iOS Auto Provision` step generates a new provisioning profile on the Apple Developer portal for the project when running a build. This profile will be up to date with all of the capabilities and developer devices.

## The _iOS Auto Provision Step_ fails

The `iOS Auto Provision` Step manages your provisioning profiles for you: it downloads the profiles from the Apple Developer portal and installs them for you. Here's what you can do if this Step fails:

* If you are trying to use it with a Xamarin app, you will have to swap it for the `Certificate and profile installer` Step. Automatic provisioning is not supported for Xamarin apps.
* Before trying to use this Step, generate an .ipa file locally - with the same export method you want to use on Bitrise - to ensure that the profiles are uploaded to the Apple Developer portal.
* Make sure that your Bitrise account is connected to the Apple Developer portal and that you have at least an Admin role in your Apple Developer team.

## Could not install the app on a device 

To install iOS apps on a given device, you have to either:

* export an .ipa file with the `development` export method, with the device's UDID registered in the provisioning profile used for the export
* export an .ipa file with the `ad-hoc` export method and install the app via the public install page generated by the `Deploy to Bitrise.io` Step. 

1. Check that the device UDID is included in the app's provisioning profile. 
   * If you use manual provisioning, check the provisioning profile you uploaded to Bitrise.
   * If you use automatic provisioning, `Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?` input is set to `no` in the `iOS Auto Provision` step: check the provisioning profile on the Apple Developer Portal.
   * If you use automatic provisioning, and the `Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?` input is set to `yes` in the `iOS Auto Provision` step: check that the device is registered to the developer team on the Apple Developer portal.
2. Check the logs to see if the `Xcode Archive & Export for iOS` Step used the provisioning profile with the device's UDID in it. 
