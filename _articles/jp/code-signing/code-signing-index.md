---
changelog: 
last_modified_at: 
tag: []
title: Code signing
redirect_from: []
description: ''
menu:
  main:
    identifier: code-signing-main
    weight: 16

---
{% include not_translated_yet.html %}

Code signing is the process of digitally signing your app, as a means of guaranteeing that the code has not been altered since signing. It provides security for deployment, and identifies the author.

To deploy mobile apps to an online store, such as Google Play or the App Store, code signing is absolutely crucial. On Bitrise, we tried to make it as easy and convenient as possible.

## iOS code signing

Every iOS app, native or cross-platform, needs code signing. At the minimum, two files are required:

* A provisioning profile.
* A .p12 certificate.

Bitrise supports Xcode-managed signing as well as manual code signing, and we also offer automatic provisioning: when using that, your provisioning profiles are downloaded directly from your Apple Developer Portal account.

**Details:**

* [iOS code signing](/jp/code-signing/ios-code-signing/index/)

## Android code signing

Android code signing can be handled via our dedicated Step, via Android Studio, or in your Gradle configuration.

To sign an Android app, you will need a keystore file which requires a Google Play Developer account, and Google Play API access.

**Details:**

* [Android code signing](/jp/code-signing/android-code-signing/index/)