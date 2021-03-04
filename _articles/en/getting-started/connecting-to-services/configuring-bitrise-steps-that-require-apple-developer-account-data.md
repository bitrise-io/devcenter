---
tag:
- apple
- builds
- code-signing
- security
title: Apple services connection
redirect_from:
- https://devcenter.bitrise.io/getting-started/signing-up/connecting-apple-dev-account/
- "/signing-up/connecting-apple-dev-account"
summary: 'Your Workflow may contain Steps that need information from your Apple Developer
  account. If so, you need to provide authentication data to allow Bitrise to connect
  to your Apple Developer account. '
menu:
  connecting-to-services:
    weight: 12

---
Your Workflow may contain Steps that need information from the Apple service you use, for example, the App Store Connect or the Apple Developer Portal. These two services are supported by the following Steps:

* [iOS Auto Provision with App Store Connect API](https://www.bitrise.io/integrations/steps/ios-auto-provision-appstoreconnect)
* [iOS Auto Provision with Apple ID](https://www.bitrise.io/integrations/steps/ios-auto-provision)
* [Deploy to iTunes Connect](https://www.bitrise.io/integrations/steps/deploy-to-itunesconnect-deliver)
* [Deploy to iTunes Connect - Application Loader](https://www.bitrise.io/integrations/steps/deploy-to-itunesconnect-application-loader)
* [Fastlane](https://www.bitrise.io/integrations/steps/fastlane)

To connect these Steps with the Apple service you wish to use while your build runs on Bitrise, you need to provide authentication data to Bitrise and select the established authentication method for your app.

You can authenticate with Apple’s official API key or with Apple ID and password. To determine which authentication to use, check out Steps that require connecting to Apple Services.

## Apple two-factor authentication requirements

Apple’s [two-factor authentication](https://developer.apple.com/support/authentication/) (2FA) provides an extra layer of security on your Apple account.

If you have been authenticating with the API key so far, you are not affected by the two-factor authentication requirement.

If, however, you have been authenticating with an Apple ID and a password, and the [new 2FA requirement](https://developer.apple.com/support/authentication/) affects you, then you’ll have to reconnect your Apple Developer Account on the **Apple Service connection** page of your Bitrise profile. You’ll also have to provide the two-factor authentication/two-step verification code and an app-specific password as well. Please find the official Apple documentation on [how to generate an app-specific password](https://support.apple.com/en-us/HT204397).

## Steps that require connecting to your Apple Developer account

The following Steps require connection to Apple services (such as App Store Connect or the Apple Developer Portal). If you’re using any of these Steps, make sure you establish connection with the right method.

The below table contains a summary of the authentication method the Step uses.

| Steps | Connection type |
| --- | --- |
| iOS Auto Provision with App Store Connect API Step | API key authentication, API key authentication through Step inputs |
| iOS Auto Provision with Apple ID Step | Apple ID authentication |
| Fastlane Step | API key authentication, Apple ID authentication, API key or Apple ID authentication through Step inputs |
| Deploy to iTunes Connect Step | API key authentication, Apple ID authentication, API key or Apple ID authentication through Step inputs |
| Deploy to iTunes Connect - Application Loader Step | API key authentication, Apple ID authentication, API key or Apple ID authentication through Step |

Depending on which authentication you can use in your project, you have the following options:

* API key authentication: If you can, we recommend you use this authentication method. It does not require two-factor authentication. All it takes is connecting to the Apple services by providing **Name**, **Issuer ID**, **Key ID** and upload a **Private Key (.p8)**, then selecting an account under the **Team** tab. The data you give automatically populates the respective fields of the Steps that work with API key authentication.
* Apple ID authentication: If you cannot use the API key authentication, you can authenticate with your Apple ID and password. Provide your **Apple ID**, **password**, **2FA code** and **app-specific password** then select an account under the **Team** tab. The data you give automatically populates the respective fields of the Steps that work with the Apple ID authentication.
* API key or Apple Id authentication through Step inputs: If you wish to deploy to multiple teams or deploy to a team where authentication is different from the connected one you’ve been using, then you can add your preferred authentication into the Step’s inputs. This will override the connection previously set in **Bitrise Developer Connection**.