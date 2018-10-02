---
title: Code signing troubleshooting
date: 2018-09-26 14:16:21 +0000
redirect_from: []
published: false

---
* profile
* certificate
* export-method

Generate ipa locally. 

**The** `Xcode Archive & Export for iOS` **Step fails with the error message _Code signing error_.**

Most of the time, this error means your project is missing either the correct .p12 certificate file or the correct provisioning profile - or the **Select method for export** input of the Step is set incorrectly. Here's what you can do:

* Check that you have both a .p12 certificate and a provisioning profile uploaded to Bitrise: go to your app's `Workflow Editor` and check the `Code Signing` tab. If you use the `iOS Auto Provision` Step, you only need to upload a .p12 certificate file.
* Check that the provisioning profile and the .p12 certificate of your project match. A Development type provisioning profile requires a Development certificate. An App Store, Ad-hoc or Enterprise type provisioning profile requires a Distribution certificate.
* Check that your uploaded code signing files are valid! Remember that these files can and do expire. 

**The** `**iOS Auto Provision**` **Step fails**

* generate ipa locally
* check uploaded profile
* check that your account is connected 

**I uploaded a Distribution certificate and an App Store type provisioning profile but my builds still fail.**

To export an .ipa file with the app-store or ad-hoc export methods, you also need to upload a Development certificate, as the first step of the .ipa export process uses that to generate an .xcodearchive file. Even if you only wish to use Bitrise to submit your apps to the App Store, we strongly recommend uploading a Developer certificate and provisioning profile of the app, too, for this reason.