---
title: Code signing troubleshooting
date: 2018-09-26 14:16:21 +0000
redirect_from: []
published: false

---
Auto provisioning issues:

* certificate and profile installer is in the workflow
* no profiles are uploaded to the Developer portal
* Developer portal account is not connected

Certificate and profile installer issues:

* not the right types of profile and certificate uploaded to Bitrise
* not all code signing files are uploaded

Xcode Archive issues:

* export-method does not match code signing file type

Other stuff:

* manual vs automatic code signing in Xcode
* ad-hoc vs app-store vs enterprise profiles

**Code signing error: No profile for team 'TEAM ID' matching 'x' found: Xcode couldn't find any provisioning profiles matching 'x'.**

The most likely reason for this error is that your project does not have a valid provisioning profile. The potential issues include:

* the provisioning profile is missing: there is no valid profile at all. If you use manual provisioning, go to your app's `Workflow Editor` and check the `Code Signing` tab. If you do not have a provisioning profile uploaded, do it. You can collect it with our codesigndoc tool!
* the provisioning profile does not match the certificate and/or the export method. For example, you have a Distribution certificate uploaded but you only have a Development type Provisioning Profile. In this scenario, if you set the `Export method` input of the `Xcode Archive & Export for iOS` Step to, say, `app-store`, the Step and your build will fail with the above error message.

If you get this error AND your code signing files are managed by Xcode - that is, the `Automatically manage signing` option in Xcode is checked -, the best practice is to generate an .ipa file locally. That should generate and upload the necessary provisioning profiles to the Apple Developer Portal.

**Code Signing Error: Provisioning profile "x" doesn't include signing certificate "y".**

Once again, check that the provisioning profiles and certificates uploaded to Bitrise are valid and matching. We also recommend generating an .ipa locally - if that succeeds, [use our codesigndoc tool](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/) to collect the code signing files again and upload them!

If you use the `iOS Auto Provision` Step, you only need to upload the appropriate certificates, of course.

**I uploaded a Distribution certificate and an App Store type provisioning profile but my builds still fail.**

To export an .ipa file with the app-store or ad-hoc export methods, you also need to upload a Development certificate, as the first step of the .ipa export process uses that to generate an .xcodearchive file. Even if you only wish to use Bitrise to submit your apps to the App Store, we strongly recommend uploading a Developer certificate and provisioning profile of the app, too, for this reason.