---
tag: []
title: Bitrise Steps and their authentication methods
redirect_from: []
summary: ''
menu:
  connecting-to-services:
    weight: 7

---
In this guide we list all the Steps that require authentication and the authentication methods that you can choose from depending on your project’s requirement.

### iOS Auto Provision with App Store Connect API Step

The [Step](https://www.bitrise.io/integrations/steps/ios-auto-provision-appstoreconnect) uses the official [App Store Connect API (JSON Web Token)](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests). By using the established API key that has been assigned to the app, this Step will:

* Generate, update and download the provisioning profiles needed for your iOS project.
* Verify if your project is registered with the App Store Connect.
* Register the iOS devices connected to your Bitrise account with the App Store Connect.

[Connect to Bitrise with API key.](/getting-started/connecting-to-services/setting-up-connection-to-an-apple-service-with-api-key/)

[Connect to Bitrise with Step inputs.](/getting-started/connecting-to-services/connecting-to-an-apple-service-with-step-inputs/)

### iOS Auto Provision with Apple ID Step

[This Step](https://www.bitrise.io/integrations/steps/ios-auto-provision) automatically manages your iOS provisioning profiles for your Xcode project. The Step uses the Apple ID and password authentication to connect to an Apple service. Once connection is configured, the Step will:

* Generate, update and download the provisioning profiles needed for your iOS project.
* Verify if your project is registered with the App Store Connect.
* Register the iOS devices connected to your Bitrise account with the App Store Connect.

In addition to an Apple ID and password, it also stores the 2-factor authentication (2FA) code you provide. Please note that the 2FA code is only valid for 30 days. When the 2FA code expires, you will need to re-authenticate to provide a new code.

[Connect to Bitrise with Apple ID and password.](/getting-started/connecting-to-services/connecting-to-an-apple-service-with-apple-id/)

### Deploy to iTunes Connect Step

With [this Step](https://www.bitrise.io/integrations/steps/deploy-to-itunesconnect-deliver), you can upload screenshots, metadata and binaries to [iTunes Connect](https://itunesconnect.apple.com/) and submit your app for App Store review using the fastlane [deliver](https://docs.fastlane.tools/actions/deliver/) action. The **Deploy to iTunes Connect** Step can connect to your Apple Developer Account either with Apple ID or with the App Store Connect API, or through Step inputs. Please note that in the case of 2FA enabled Apple ID, the **Deploy to iTunes Connect** Step can only work with Apple ID authentication which you can set on the Apple Service page of your profile. The default method is the API key authentication. Choose the connection method that works with your project:

[Connect to Bitrise with API key (recommended).](/getting-started/connecting-to-services/setting-up-connection-to-an-apple-service-with-api-key/)
[Connect to Bitrise with the Apple ID and password.](/getting-started/connecting-to-services/connecting-to-an-apple-service-with-apple-id/)
[Connect to Bitrise with Step inputs.](/getting-started/connecting-to-services/connecting-to-an-apple-service-with-step-inputs/)


The **Deploy to iTunes Connect** Step is now set to connect to the Apple Developer account.

### Deploy to iTunes Connect - Application Loader Step

With [this Step](https://www.bitrise.io/integrations/steps/deploy-to-itunesconnect-application-loader), you can upload binaries (.ipa or .pkg files) to [iTunes Connect](https://itunesconnect.apple.com/). The **Deploy to iTunes Connect - Application Loader** Step can connect to your Apple Developer Account either with the App Store Connect API, the Apple ID and password, or through Step inputs. Choose the connection method that works with your project:

Connect with the API key (recommended).

Connect with the Apple ID and password.

Connect your Apple Services to Bitrise with Step inputs.

### Fastlane Step

With this Step you can run your [_fastlane_](https://fastlane.tools/) lanes on Bitrise just like you would locally. Please note that in the case of 2FA enabled Apple ID, the **Fastlane** Step can only work with Apple ID authentication which you can set on the **Apple Service** page of your profile.

Connect to Bitrise with API key (recommended).

Connect with Apple ID and password.

Connect with Step inputs.

The **Fastlane** Step is now set to connect to the Apple Developer account assigned to the app during your build.