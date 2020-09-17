---
title: Connecting your Apple Developer Account to Bitrise
redirect_from:
- https://devcenter.bitrise.io/getting-started/signing-up/connecting-apple-dev-account/
- "/signing-up/connecting-apple-dev-account"
tag:
- apple
- " builds"
- code-signing
- security
description: Connecting your Apple Developer Account allows Bitrise to reuse your
  authentication sessions for 30 days so you do not have to manually go through 2FA
  on every iOS deploy.
menu:
  getting-started-main:
    weight: 9
    title: Connecting your Apple Developer Account
published: false

---
Your Workflow may contain Steps that need information from your Apple Developer account. If so, you need to provide authentication data to allow Bitrise to connect to your Apple Developer account. You may also need to authorize the app to use the data from this account when connected.

To determine if you need to connect your Apple Developer account and authorize your app, check out Steps that require connecting to your Apple Developer account \[link\] and allow your app to use this data \[link\].

## Steps that require connecting to your Apple Developer account

The following Steps require connection to your Apple Developer account. If you’re using any of these Steps, make sure you connect your Apple Developer Account with the right connection method.

The table below table sums up what you have to do to establish connection between Bitrise and your Apple Developer account.

| Steps | How to set up the connection |
| --- | --- |
| iOS Auto Provision with App Store Connect API | 1. Provide the connection information to your Apple Developer Account on the Account settings page. 2. Assign the app to your Apple Developer account on the Team tab. |
| LTS (Long Term Support) | No changes (updates) will be made to the stack, except for absolutely crucial changes (for example which affect security), and Bitrise CLI tool updates. Preinstalled tool versions will remain the same, until the Stack is removed from our collection. |

{% include collapse.html title="iOS Auto Provision with App Store Connect API Step" content="

The Step uses the official [App Store Connect API (JSON Web Token)](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests "https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests"). By using your Apple Developer account definition that has been assigned to the app, this Step when executed will:

* Generate, update and download the provisioning profiles needed for your iOS project.
* Verify your project is registered with the App Store Connect.
* Register the iOS devices connected to your Bitrise account with the App Store Connect.

### Defining your Apple Developer account to Bitrise

Use this method to provide authentication data to connect Bitrise to your Apple Developer account when using the **iOS Auto Provision with App Store Connect API** Step.

1. On [App Store Connect](https://appstoreconnect.apple.com/login "https://appstoreconnect.apple.com/login") [generate a new API key on App Store Connect](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api "https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api") under **Users and Access**.
2. Log into [bitrise.io](https://www.bitrise.io/ "https://www.bitrise.io/").
3. Click on your profile in the upper-right corner of your **Dashboard** and select [**Account settings**](https://app.bitrise.io/me/profile#/overview "https://app.bitrise.io/me/profile#/overview") from the dropdown menu.
4. On the menu bar on the left, select **Apple Developer Account**.
5. Click **Add an Account.**
6. Fill out all required fields: provide a work or personal **Name** of the team, **an** [**Issuer ID**](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests "https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests"), the **Key ID** you generated at Step 1., and [**Upload a Private key (.p8)**](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api "https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api"). If one input is missing, the **Connect** and **Upload a Private Key (.p8)** buttons won’t be available.
7. Continue with Assigning an Apple Developer Account for your app.

### Assigning an Apple Developer Account for your app

When using the **iOS Auto Provision with App Store Connect API** Step, you also need to select the account for your app to receive data from your Apple Developer account when your build runs on Bitrise.

1. Open your app’s page on [bitrise.io](https://www.bitrise.io/ "https://www.bitrise.io/").
2. Select the **Team** tab.
3. Scroll down to the **Connected Apple Developer Portal Account** section.
4. Select the account for the app to use in the **Apple Developer Portal API** dropdown. It displays only the app owner’s connected Apple Developer account.

The **iOS Auto Provision with App Store Connect API** step is now set to connect to the Apple Developer account assigned to the app during your build." %}

## Which iOS Auto Provision Step to use

Bitrise has two iOS Auto Provision Steps available in the Step Library:

* The **iOS Auto Provision with App Store Connect API** Step uses the official [App Store Connect API (JSON Web Token)](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests) solution which means that you don’t have to connect your Apple Developer account to Bitrise and 2FA with Apple any more. We keep a close eye on any new App Store Connect API features and update our Step accordingly.
* The **iOS Auto Provision with Apple ID** Step is our deprecated Step which uses session-based authentication, just like the **_fastlane_** and the **Deploy** **to iTunes Connect** Steps. The session-based authentication allows Bitrise to reuse your authentication sessions for 30 days so you do not have to manually go through 2FA on every single occasion. After 30 days, however, the authentication expires and you’ll have to log in with your Apple ID and password. Please note that we do not update the **iOS Auto Provision with Apple ID** Step any more.

## Connecting your account

To successfully connect your Apple Developer account, and use your Apple Developer credentials in your Bitrise builds, you need to do TWO things:

1. Authenticate your Apple Developer account by providing your Apple credentials [on your **Account settings** page](https://app.bitrise.io/me/profile#/apple_developer_account) either using the App Store Connect API or the old session-based method.
2. [Authorize apps](/getting-started/connecting-apple-dev-account/#enabling-apple-developer-portal-integration) to use the data from your Apple Developer account.

{% include message_box.html type="important" title="Authorizing the apps" content="It is NOT enough to simply connect your Apple Developer Account to Bitrise. Apps will not be able to automatically use your credentials: you need to authorize each app to do so. For more information, check out [Enabling Apple Developer Portal integration](/getting-started/connecting-apple-dev-account/#enabling-apple-developer-portal-integration)."%}

### Authenticating your Apple Developer account with App Store Connect API

Our **iOS Auto Provision with App Store Connect API** Step uses the official App Store Connect API so you can use automatic code signing with Bitrise and don’t have to worry about providing Apple credentials.

You can use the Apple ID with [**_fastlane_**](https://www.bitrise.io/integrations/steps/fastlane), [**Deploy to itTunes Connect**](https://www.bitrise.io/integrations/steps/deploy-to-itunesconnect-deliver)**,** and with our deprecated **iOS Auto Provision with Apple ID** Step.

1. [Generate a new API key on App Store Connect](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api) under **Users and Access** in [App Store Connect](https://appstoreconnect.apple.com/login).
2. Log into [bitrise.io](https://www.bitrise.io/).
3. Click on your profile in the upper-right corner of your **Dashboard** and select [**Account settings**](https://app.bitrise.io/me/profile#/overview) from the dropdown menu.
4. On the menu bar on the left, select **Apple Developer Account**.
5. Click **Add an Account.**
6. To connect your API key, fill out all required fields: provide a work or personal **Name** of the team, an [**Issuer ID**](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests), a **Key ID** and an **Upload a Private key (.p8)**. If one input is missing, the **Connect** and **Upload a Private Key (.p8)** buttons won’t be available.

   ![](/img/appstoreconnectapi-addanaccount.jpg)
7. Continue with [Enabling Developer Portal integration](/getting-started/connecting-apple-dev-account/#enabling-apple-developer-portal-integration).

### Authenticating your Apple Developer account with Apple ID

Please note that this method is now deprecated since the official Apple Store Connect API (JSON Web Token) has been released. Our [**_fastlane_**](https://www.bitrise.io/integrations/steps/fastlane), [**Deploy to iTunes Connect** ](https://www.bitrise.io/integrations/steps/deploy-to-bitrise-io)and the related **iOS Auto Provision with Apple ID** Steps still use this method tough.

1. Log in to [bitrise.io](https://www.bitrise.io/).
2. Click on your profile in the upper-right corner of your **Dashboard** and select [**Account settings**](https://app.bitrise.io/me/profile#/overview) from the dropdown menu.
3. On the menu bar on the left, select **Apple Developer Account**.
4. Provide your credentials in the popup window and click **Store credentials**.

   ![](/img/appstoreconnect_sessionbased.jpg)
5. If two-factor authentication is enabled on your Apple Developer account, you will be prompted to provide your verification code. In this case, your authentication will expire in 30 days and you will have to authenticate again!

## Enabling Apple Developer Portal integration

Authorize your app to receive Apple Developer Portal data from Bitrise once your Apple Developer Account is connected to your [bitrise.io](https://www.bitrise.io/) account.

As such, any team member’s connected account can be used with an app. The app does NOT necessarily have to use the owner’s connected Apple Developer account.

To authorize the app:

1. Open your project’s page on [bitrise.io](https://www.bitrise.io/).
2. Select the **Team** tab.
3. Scroll down to the **Connected Apple Developer Portal Account** section.
4. Select an account by the **App Store Connect API** or **Session based authentication (deprecated)** drop downs. You can select both authentication methods if that’s what your Workflow requires. Make sure you test your **Session based authentication**'s connection. Please note that only app owner’s and admin’s connected Apple Developer Accounts will appear in the lists.

   ![](/img/connected-apple-dev-portal.png)

If everything goes well, you should be able to use the connected accounts’ Apple Developer credentials in the app’s builds.