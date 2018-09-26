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