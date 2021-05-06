---
title: iOS code signing - troubleshooting
date: '2018-10-11T11:28:48.000+00:00'
tag:
- troubleshooting
- code-signing
- xcode
- ios
description: 'If you have issues with iOS code signing, you need to check your code
  signing files, your export method, your app''s capabilities, and your registered
  test devices. '
redirect_from: []
summary: ''
menu:
  ios-code-signing:
    weight: 24

---
To make iOS code signing work on Bitrise, you generally need to get three things right:

* A provisioning profile.
* A .p12 certificate file.
* Setting the **Select method for export** input of the **Xcode Archive & Export for iOS** Step.

To get your code signing files, you can:

* Use our [codesigndoc](https://github.com/bitrise-tools/codesigndoc) tool.
* [Export them with Xcode](https://devcenter.bitrise.io/code-signing/ios-code-signing/exporting-code-signing-files/#exporting-certificates-using-xcode).
* [Export them with the Keychain app](https://devcenter.bitrise.io/code-signing/ios-code-signing/exporting-code-signing-files/#exporting-manually).

If you suspect an error is related to code signing, there is almost certainly a problem with one of these three. When trying to build an iOS app on Bitrise, we strongly recommend generating an .ipa file of the app locally, on your own machine first. If that fails, the build will certainly fail on Bitrise, too.

Let's look into what you can do to make sure code signing works!

## The Xcode Archive & Export for iOS Step fails

If the Step fails, check the logs. If you see the message: `Code signing error` then this guide can hopefully help you find the solution!

![{{ page.title }}](/img/archive_fail.png)

Most of the time, this error means your project is missing either the correct .p12 certificate file or the correct provisioning profile - or the **Select method for export** input of the Step is set incorrectly.

### Manual provisioning

If you manually upload your provisioning profiles and use the **Certificate and profile installer** Step to install your code signing files, read on.

If you use the **iOS Auto Provision with App Store Connect API** Step, skip to [Automatic provisioning](/code-signing/ios-code-signing/ios-code-signing-troubleshooting/#automatic-provisioning).

1. Check that you have both a .p12 certificate and a provisioning profile uploaded to Bitrise.

   To do so, go to your app's Workflow Editor and check the **Code Signing** tab.
2. Check that the provisioning profile and the .p12 certificate of your project match.

   A Development type provisioning profile requires a Development certificate. An App Store, Ad-hoc or Enterprise type provisioning profile requires a Distribution certificate. You can check the compatibility on the **Code Signing** tab: click **Show matching Certificates, Devices & Capabilities** under any provisioning profile.
3. Check that the uploaded code signing files belong to the correct team IDs.

   Also, make sure the provisioning profile is for the correct Bundle ID.
4. Check that your uploaded code signing files are valid!

   Remember that these files can and do expire or get revoked.
5. Check the **Select method for export** input of the **Xcode Archive & Export for iOS** Step in the Workflow Editor.

   If, for example, it is set to `ad-hoc` or `app-store`, you need a Distribution type .p12 certificate file and either an Ad-hoc or an App Store type provisioning profile.

   ![{{ page.title }}](/img/export_fail.png)
6. Check if the capability lists in the **iOS app** and in the **provisioning profile uploaded to the Developer Portal** match.

   ![{{ page.title }}](/img/capapbilities_xcode.png)

{% include message_box.html type="info" title="Xcode managed signing" content="If you use Xcode managed signing, the Step only accepts an Xcode managed provisioning profile.

Read more about it in [Apple's Technical Q&A](https://developer.apple.com/library/archive/qa/qa1814/_index.html)."%}

### Automatic provisioning

With the **iOS Auto Provision with App Store Connect API** Step, you do not need to manually upload a provisioning profile to Bitrise. You only need a certificate.

1. Check that you have a .p12 certificate uploaded to Bitrise.

   To do so, go to your app's Workflow Editor and check the **Code Signing** tab.

   Check that the uploaded code signing files belong to the correct team IDs.

   Also, make sure the provisioning profile is for the correct Bundle ID.
2. Check that your uploaded certificate is valid!

   Remember that these files can and do expire or get revoked.
3. Check the **Select method for export** input of the **Xcode Archive & Export** Step in the Workflow Editor.

   If, for example, it is set to `ad-hoc` or `app-store`, you need a Distribution type .p12 certificate file.
4. Check if the certificate is locked. If it is, check if the password is correct!

When you use the **iOS Auto Provision with App Store Connect API** Step, using Xcode managed signing is an important factor. Let's go through what can happen depending on whether you use the option.

#### If Xcode managed signing is enabled in the iOS app

Check if the capability lists in the iOS app and in the provisioning profile on the Developer Portal match.

This is only relevant if the **iOS Auto Provision with App Store Connect API** Step is set to NOT generate a profile.

#### If Xcode managed signing is disabled in the iOS app

If you uncheck Xcode managed signing, the **iOS Auto Provision with App Store Connect API** Step generates a new provisioning profile on the Apple Developer portal for the project when running a build. This profile will be up to date with all of the capabilities and developer devices.

## Have you exceeded the file count limit of the provisioning profiles?

The maximum number of provisioning profiles and .p12 certificates you can upload to the Code Signing tab is 30. If you’ve already reached this limit and wish to use even more, then here are a few tips on how to use even more provisioning profiles:

* Use the **iOS Auto Provision with App Store Connect API** Step. This only requires the code signing identities (certificates with .p12 extension) to be uploaded to Bitrise. You can download the provisioning profiles from the Apple Developer portal on-the-fly during the build if you have [connected your Apple Developer account to Bitrise]/getting-started/connecting-to-services/configuring-bitrise-steps-that-require-apple-developer-account-data/ "/connecting-apple-dev-account/#enabling-apple-developer-portal-integration").
* You can create a .zip file containing the required certificates/profiles. In this case, you don't need to upload any certificates/profiles on Bitrise. During the build you can download the .zip file and update the certificate/profile related inputs of the **Certificate and Profile Installer** Step to match the path to the certificate/profile on the build machine. Note that the **Certificate and Profile Installer** Step supports local paths and URLs for certificates and profiles.
* You can host the profiles and certificates yourself, and only add an URL that is pointing to a given certificate/profile to the workflow.

Also note that multiple URLs can be specified for both the certificate and profile inputs. Make sure you separate them with a pipe (`|`) character.

## The iOS Auto Provision with App Store Connect API Step fails

The **iOS Auto Provision with App Store Connect API** Step manages your provisioning profiles for you: it downloads the profiles from the Apple Developer portal and installs them for you. Here's what you can do if this Step fails:

* If you are trying to use it with a Xamarin app, you will have to swap it for the **Certificate and profile installer** Step. Automatic provisioning is not supported for Xamarin apps.
* Before trying to use this Step, generate an .ipa file locally - with the same export method you want to use on Bitrise - to ensure that the profiles are uploaded to the Apple Developer portal.
* Make sure that your Bitrise account is connected to the Apple Developer portal and that you have at least an Admin role in your Apple Developer team.

### Test device already registered

If the **iOS Auto Provision with App Store Connect API** Step fails with this error message, it is likely that you registered a specific test device on Bitrise twice.

![{{ page.title }}](/img/device-2.png)

Check out if the same UDID has been registered twice:

1. Open the app on Bitrise.
2. Go to the **Team** tab.
3. Scroll down and click the **Download list of test devices** button.

The result will be in json format: check if the same UDID appears twice. If so, it has to be removed from the account to which it was registered.

1. Open the top-right menu and click **Account settings**.
2. On the left, click **Test devices**.
3. Remove one of the duplicated devices.

## Could not install the app on a device

To install iOS apps on a given device, you have to either:

* Export an .ipa file with the `development` export method, with the device's UDID registered in the provisioning profile used for the export.
* Export an .ipa file with the `ad-hoc` export method and install the app via the public install page generated by the **Deploy to Bitrise.io** Step.

1. Check that the device UDID is included in the app's provisioning profile.
   * If you use manual provisioning, check the provisioning profile you uploaded to Bitrise.
   * If you use automatic provisioning, **Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?** input is set to `no` in the **iOS Auto Provision with Apple ID** step: check the provisioning profile on the Apple Developer Portal.
   * If you use automatic provisioning, and the **Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?** input is set to `yes` in the **iOS Auto Provision with Apple ID** Step: check that the device is registered to the developer team on the Apple Developer portal.
2. Check the logs to see if the **Xcode Archive & Export for iOS** Step used the provisioning profile with the device's UDID in it.

{% include banner.html banner_text="Let's check out your iOS app" url="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta" button_text="Go to your app" %}