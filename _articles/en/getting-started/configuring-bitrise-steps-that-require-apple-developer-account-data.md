---
tag:
- apple
- builds
- code-signing
- security
title: Configuring Steps that require Apple Developer account data
redirect_from:
- https://devcenter.bitrise.io/getting-started/signing-up/connecting-apple-dev-account/
- "/signing-up/connecting-apple-dev-account"
summary: 'Your Workflow may contain Steps that need information from your Apple Developer
  account. If so, you need to provide authentication data to allow Bitrise to connect
  to your Apple Developer account. '
menu:
  getting-started-main:
    weight: 9

---
Your Workflow may contain Steps that need information from your Apple Developer account. If so, you need to provide authentication data to allow Bitrise to connect to your Apple Developer account. You may also need to authorize the app to use the data from this account when connected.

To determine if you need to connect your Apple Developer account and authorize your app, check out [Steps that require connecting to your Apple Developer account](/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/#steps-that-require-connecting-to-your-apple-developer-account) and allow your app to use this data.

## Steps that require connecting to your Apple Developer account

The following Steps require connection to your [Apple Developer account](https://developer.apple.com/). If you’re using any of these Steps, make sure you connect your Apple Developer Account with the right connection method.

The below table contains a summary of the authentication method the Step uses.

| Steps | Connection type |
| --- | --- |
| iOS Auto Provision with App Store Connect API Step | App Store Connect API |
| iOS Auto Provision with Apple ID Step | session-based |
| Fastlane Step | session-based |
| Deploy to iTunes Connect Step | session-based |
| Deploy to iTunes Connect - Application Loader Step | App Store Connect API or session-based |

{% include message_box.html type="important" title="Apple Developer Enterprise Program vs Apple Developer Program" content="Please note if you are member of an organization that uses the [Apple Developer Enterprise Program](https://developer.apple.com/programs/enterprise/), you cannot use the App Store Connect API and the Steps related to it. Instead, use the Steps that work with session-based authentication (see table above). If you are using the [Apple Developer Program](https://developer.apple.com/programs/), you can authenticate with the App Store Connect API.![](/img/apple-developer-enterprise-porgram.jpg)"%}

## iOS Auto Provision with App Store Connect API Step

The [Step](https://www.bitrise.io/integrations/steps/ios-auto-provision-appstoreconnect) uses the official [App Store Connect API (JSON Web Token)](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests). By using your Apple Developer account definition that has been assigned to the app, this Step, when executed will:

* Generate, update and download the provisioning profiles needed for your iOS project.
* Verify if your project is registered with the App Store Connect.
* Register the iOS devices connected to your Bitrise account with the App Store Connect.

### Defining your Apple Developer account to Bitrise

Use this method to provide authentication data to connect Bitrise to your Apple Developer account when using the [**iOS Auto Provision with App Store Connect API**](https://www.bitrise.io/integrations/steps/ios-auto-provision-appstoreconnect) Step.

1. On [App Store Connect](https://appstoreconnect.apple.com/login), [generate a new API key with Admin access](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api) under **Users and Access**.
2. Log in to [bitrise.io](https://www.bitrise.io/).
3. Click on your profile in the upper-right corner of your **Dashboard** and select [**Account settings**](https://app.bitrise.io/me/profile#/overview) from the dropdown menu.
4. On the menu bar on the left, select **Apple Developer Account**.
5. Click **Add an Account**.

   ![{{ page.title }}](/img/account-settings-1.jpg)
6. Fill out all required fields: provide a work or personal **Name** of the team, **an** [**Issuer ID**](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests), the **Key ID** you generated at Step 1., and [**Upload a Private key (.p8)**](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api). If one input is missing, the **Connect** and **Upload a Private Key (.p8)** buttons won’t be available.

   ![{{ page.title }}](https://devcenter.bitrise.io/img/appstoreconnectapi-addanaccount.jpg)
7. Continue with assigning an Apple Developer Account for your app.

### Assigning an Apple Developer Account for your app

When using the **iOS Auto Provision with App Store Connect API** Step, you also need to select the account for your app to receive data from your Apple Developer account when your build runs on Bitrise.

1. Open your app’s page on [bitrise.io](https://www.bitrise.io/).
2. Select the **Team** tab.
3. Scroll down to the **Connected Apple Developer Portal Account** section.
4. Select the account for the app to use in the **Apple Developer Portal API** dropdown. It displays only your connected Apple Developer account and no app owner's or app admin's connected account is displayed here.![{{ page.title }}](/img/connected-apple-developer-account.jpg)

The **iOS Auto Provision with App Store Connect API** Step is now set to connect to the Apple Developer account assigned to the app during your build.

## iOS Auto Provision with Apple ID Step

[This Step](https://www.bitrise.io/integrations/steps/ios-auto-provision) automatically manages your iOS provisioning profiles for your Xcode project. The Step uses session-based authentication to connect to an Apple Developer account. In addition to an Apple ID and password, it also stores the 2-factor authentication (2FA) code you provide. Please note that the 2FA code is only valid for 30 days. When the 2FA code expires, you will need to re-authenticate to provide a new code.

{% include message_box.html type="note" title="iOS Auto Provision with Apple ID is deprecated" content="This method has been deprecated. We highly recommend that you use the **iOS Auto Provision App Store Connect API** Step instead."%}

### Defining your Apple Developer Account to Bitrise

Use this method to provide authentication data to connect to your Apple Developer account if you wish to use the **iOS Auto Provision with Apple ID** Step in your Workflow.

1. Log in to [bitrise.io](https://www.bitrise.io/).
2. Click on your profile in the upper-right corner of your **Dashboard** and select [**Account settings**](https://app.bitrise.io/me/profile#/overview) from the dropdown menu.
3. On the left menu bar, select **Apple Developer Account**.
4. Click the **Add an Account** button.
5. On top of the popup, click the **deprecated, session-based auth** link.

   ![{{ page.title }}](/img/session-based-auth.jpg)
6. Provide your **Apple ID** and **Password** in the popup window and click **Store credentials**.

   ![{{ page.title }}](/img/sync-your-account.jpg)
7. You will be prompted to provide your verification code. Please make sure you receive the 6-digit code on a trusted device using iCloud and not via SMS.

   ![{{ page.title }}](/img/2fa.jpg)
8. Your authentication expires in 30 days and you will have to authenticate again. When that happens, go to the **Apple Developer Account** of the **Account settings** page, it will automatically ask for the 2FA code to authenticate again. There will be a list of the Apple Developer accounts that you have defined. To the far right of each, there are 3 dots. Click the dots and select **Re-authenticate** (**2SA/2FA**).
9. Continue with assigning an Apple Developer Account for your app.

### Assigning an Apple Developer Account for your app

When using the **iOS Auto Provision with Apple ID** Step, you also need to select the account for your app to receive data from your Apple Developer account when it runs on Bitrise.

1. Open your app’s page on [bitrise.io](https://www.bitrise.io/).
2. Select the **Team** tab.
3. Scroll down to the **Connected Apple Developer Portal Account** section.
4. Select the account for the app to use. Note that the **Session based authentication (deprecated)** dropdown displays the connected Apple Developer accounts belonging to the app owner and other team members with admin authority.

   ![{{ page.title }}](/img/connected-apple-developer-account-session-based.jpg)

The **iOS Auto Provision with Apple ID** Step is now set to connect to the Apple Developer account assigned to the app during your build.

## Fastlane Step

With this Step you can run your [_fastlane_](https://fastlane.tools/) lanes on Bitrise just like you would locally. It uses session-based authentication which allows Bitrise to reuse your authentication sessions for 30 days. This way you do not have to manually go through 2FA on every single occasion. After 30 days, however, the authentication expires and you’ll have to re-authenticate.

### Defining your Apple Developer Account to Bitrise

If you wish to use [Fastlane Step](https://www.bitrise.io/integrations/steps/fastlane) to deploy iOS apps to the App Store or upload metadata, you’ll have to provide authentication data to connect to your Apple Developer account.

1. Log in to [bitrise.io](https://www.bitrise.io/).
2. Click on your profile in the upper-right corner of your **Dashboard** and select [**Account settings**](https://app.bitrise.io/me/profile#/overview) from the dropdown menu.
3. On the left menu bar, select **Apple Developer Account**.
4. Click the **Add an Account** button.
5. On top of the popup, click the **deprecated, session-based auth** link.

   ![{{ page.title }}](/img/session-based-auth.jpg)
6. Provide your **Apple ID** and **Password** in the popup window and click **Store credentials**.

   ![{{ page.title }}](/img/sync-your-account.jpg)
7. Your authentication expires in 30 days and you will have to authenticate again. When that happens, go to the **Apple Developer Account** of the **Account settings** page, it will automatically ask for the 2FA code to authenticate again. There will be a list of the Apple Developer accounts that you have defined. To the far right of each, there are 3 dots. Click the dots and select **Re-authenticate (2SA/2FA**).
8. Continue with assigning an Apple Developer Account for your app.

### Assigning an Apple Developer Account for your app

Once you have defined your Apple Developer account to Bitrise, you need to select the account for your app to receive data from your Apple Developer account when it runs on Bitrise.

1. Open your app’s page on [bitrise.io](https://www.bitrise.io/).
2. Select the **Team** tab.
3. Scroll down to the **Connected Apple Developer Portal Account** section.
4. Select the account for the app to use. Note that the **Session based authentication (deprecated)** dropdown displays the connected Apple Developer accounts belonging to the app owner and other team members with admin authority.

   ![{{ page.title }}](/img/connected-apple-developer-account-session-based.jpg)

The **Fastlane** Step is now set to connect to the Apple Developer account assigned to the app during your build.

## Deploy to iTunes Connect Step

With [this Step](https://www.bitrise.io/integrations/steps/deploy-to-itunesconnect-deliver), you can upload screenshots, metadata and binaries to [iTunes Connect](https://itunesconnect.apple.com/) and submit your app for App Store review using the fastlane [deliver](https://docs.fastlane.tools/actions/deliver/) action.

If you wish to use the **Deploy to iTunes Connect** Step in your Workflow, you can set up connection to your Apple Developer Account by adding your credentials to the Step’s input fields.

1. Add the Step to your Workflow.
2. Provide your **Apple ID**, **Password**, and the **Application Specific Password** to the respective input fields.
3. Save your changes.

In addition to setting the Step's input (Step 2.), you need to set up session-based authentication to submit the app for review. This allows Bitrise to reuse your authentication sessions for 30 days. This way you do not have to manually go through 2FA on every single occasion. After 30 days, however, the authentication expires and you’ll have to re-authenticate.

### Defining your Apple Developer Account to Bitrise

If you wish to use [**Deploy to iTunes Connect**](https://www.bitrise.io/integrations/steps/deploy-to-itunesconnect-deliver) Step to submit apps for review (in addition t uploading the app and some metadata), you’ll have to provide authentication data to connect to your Apple Developer account.

1. Log in to [bitrise.io](https://www.bitrise.io/).
2. Click on your profile in the upper-right corner of your **Dashboard** and select [**Account settings**](https://app.bitrise.io/me/profile#/overview) from the dropdown menu.
3. On the left menu bar, select **Apple Developer Account**.
4. Click the **Add an Account** button.
5. On top of the popup, click the **deprecated, session-based auth** link.

   ![{{ page.title }}](/img/session-based-auth.jpg)
6. Provide your **Apple ID** and **Password** in the popup window and click **Store credentials**.

   ![{{ page.title }}](/img/sync-your-account.jpg)
7. You will be prompted to provide your verification code. Please make sure you receive the 6-digit code on a trusted device using iCloud and not via SMS.

   ![{{ page.title }}](/img/2fa.jpg)
8. Your authentication expires in 30 days and you will have to authenticate again. When that happens, go to the **Apple Developer Account** of the **Account settings** page, it will automatically ask for the 2FA code to authenticate again. There will be a list of the Apple Developer accounts that you have defined. To the far right of each, there are 3 dots. Click the dots and select **Re-authenticate** (**2SA/2FA**).
9. Continue with assigning an Apple Developer Account for your app.

### Assigning an Apple Developer Account for your app

When you have defined your Apple Developer account to Bitrise, you also need to select the account for your app to receive data from your Apple Developer account when it runs on Bitrise.

1. Open your app’s page on [bitrise.io](https://www.bitrise.io/).
2. Select the **Team** tab.
3. Scroll down to the **Connected Apple Developer Portal Account** section.
4. Select the account for the app to use. Note that the **Session based authentication (deprecated)** dropdown displays the connected Apple Developer accounts belonging to the app owner and other team members with admin authority.

   ![{{ page.title }}](/img/connected-apple-developer-account-session-based.jpg)

The **Deploy to iTunes Connect** Step is now set to connect to the Apple Developer account.

## Deploy to iTunes Connect - Application Loader Step

With [this Step](https://www.bitrise.io/integrations/steps/deploy-to-itunesconnect-application-loader), you can upload binaries (.ipa or .pkg files) to [iTunes Connect](https://itunesconnect.apple.com/). The **Deploy to iTunes Connect - Application Loader** Step can connect to your Apple Developer Account either with session-based authentication or with the App Store Connect API. Choose your favorite (but not both) and enter the respective credentials in the Step’s input fields.

1. Add the Step to your Workflow.
2. Set up your connection:
   * For the session-based method: Provide your **Apple ID,** **Password** and **Application Specific Password** to the respective input fields.
   * For the App Store Connect API: Provide your **API Key URL** (for example, https://URL/TO/AuthKey_something.p8 or file:///PATH/TO/AuthKey_something.p8) and the **Issuer ID** as Step inputs. Please note that connecting with the App Store Connect API works with XCode 11.0 and above releases.
3. Save your changes.

The **Deploy to iTunes - Application Loader** Step is now set to connect to the Apple Developer account.