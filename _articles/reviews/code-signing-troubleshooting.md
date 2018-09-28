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
* 