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
  getting-started-main:
    weight: 9

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

In this article we walk you through the three authentication methods first, then break it down for each Step mentioned above.

## Setting up connection to an Apple service with API key

Connecting to an Apple service (such as the App Store Connect or the Apple Developer Portal) with the API key requires that you first add your Apple service authentication data on our **Apple Services Connection** page, then an API key for your app.

Please note that the API key authentication is the recommended way when connecting Bitrise to Apple Services. Please note that you can have 50 API key added to the **Apple Services connection** page but your project can use only one (selected in the **Team** tab).

### Adding API key authentication data on Bitrise

1. On [App Store Connect](https://appstoreconnect.apple.com/login), [generate a new API key with Admin access](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api) under **Users and Access**.![](/img/usersandaccess.jpg)
2. Log in to [bitrise.io](https://www.bitrise.io/).
3. Click on your profile in the upper-right corner of your **Dashboard** and select [**Account settings**](https://app.bitrise.io/me/profile#/overview) from the dropdown menu.
4. On the menu bar select **Apple Service Connection**.![](/img/appleserviceconnection.jpg)
5. Click **Add connection**.
6. Fill out all required fields: provide the **Name**, [**Issuer ID**](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests), and the **Key ID** you generated at Step 1., and [**Upload a Private key (.p8)**](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api). If one input is missing, the **Connect** and **Upload a Private Key (.p8)** buttons won’t be available.
   ![](/img/apikeyauthentication.jpg)
7. Click **Connect**.
8. Continue with assigning an Apple Developer Account for your app.

### Assigning API key authentication to your app

When you wish to use a Step with the established connection, you also have to select an app for the connection. This way your app can receive data from your Apple Developer account when your build runs on Bitrise.

1. Open your app’s page on [bitrise.io](https://www.bitrise.io/).
2. Select the **Team** tab.
3. Scroll down to the **Apple Service connection** section.
4. Select the **API key authentication (recommended)** method for the app to use in the dropdown.  
   ![](/img/apikeyteam.jpg)

The Step is now able to connect to the App Store Connect or the Apple Developer Portal during your build. Please note that there is no need to modify any Step input fields manually since these are automatically populated once the connection is set up.

## Setting up connection with the Apple ID and password

Connecting to an Apple service (such as the App Store Connect or the Apple Developer Portal) with the Apple ID requires that you first add your Apple ID and password on the Apple Service connection page, then select an app to use Apple ID authentication while the build is running.

If you cannot use the API key authentication, we recommend you try this option. Please note that you can only connect one Apple ID to Bitrise.

{% include message_box.html type="important" title="Apple accounts with enabled two-factor authentication" content="Please note that if two-factor authentication is enabled on your Apple account, you will have to provide the App-specific password during this process. Learn [how to generate an app-specific password on the Security section of your Apple ID account page](https://support.apple.com/en-us/HT204397)."%}

![](/img/appspecificpassword.jpg)

### Adding Apple ID authentication data on Bitrise

 1. Log in to [bitrise.io](https://www.bitrise.io/).
 2. Click on your profile in the upper-right corner of your **Dashboard** and select [**Account settings**](https://app.bitrise.io/me/profile#/overview) from the dropdown menu.
 3. On the left menu bar, select **Apple Service connection**.
 4. Click the **Add connection** button.
 5. Provide your **Apple ID** and **Password** in the popup window. Click **Connect**.![](/img/appleidauthentication.jpg)
 6. Enter your **verification code** in the **Two factor authentication** window.
 7. Add the **app-specific password**. Click **Verify** to continue.
 8. You will be prompted to provide your verification code.
 9. Your authentication expires in 30 days and you will have to authenticate again. When that happens, go to the **Apple Service connection** page, it will automatically ask for the two-factor authentication (2FA) code to authenticate again. There will be a list of the Apple Developer accounts that you have defined. To the far right of the Apple ID connection, there are 3 dots. Click the dots and select **Re-authenticate** (**2SA/2FA**).
10. Continue with Assigning an Apple Developer Account for your app.

### Assigning Apple ID authentication to your app

When a Step uses the Apple ID authentication, you also need to select the authentication method for your app to receive data from your Apple while your build is running.

1. Open your app’s page on [bitrise.io](https://www.bitrise.io/).
2. Select the **Team** tab.
3. Scroll down to the **Apple service connection** section.
4. Select the **Apple ID authentication** for the app to use. It displays the connection method of the app owner and other team members with admin authority.
   ![](/img/appleidteam.jpg)

The Step is now able to connect to an Apple service during your build. No need to modify any Step input fields manually since these are automatically populated once the connection is set up.

## Setting up connection with Step inputs

If you wish to deploy to multiple teams or deploy to a team where authentication is different from the connected one you’ve been using, then you can add your preferred authentication into the Step’s inputs. This will override the connection previously set in Bitrise Developer Connection.

This way connection is restricted to the given Step where you set up authentication.

Please note that you can only add one type of authentication into the Step, either the API key one or the Apple ID one. In either case, make sure the **Bitrise Apple Developer** **Connection** input is set to off, otherwise the Step will go with the configured authentication method found in **Apple Service connection** (unless you decide to remove the connection on the Teams tab).

### Authenticating with API key

1. Add the Step to your Workflow.
2. Upload the API key to the **GENERIC FILE STORAGE** section of the **Code Signing** page.
3. Set the **Bitrise Apple Developer** **Connection** input to off.
4. Set the **Issuer ID** as a secret Environment Variable in the respective field of the Step.
5. Configure the **API Key path** and **API Issuer** inputs.
6. Save your changes and run a new build.

### Authenticating with Apple ID and password

1. Add the Step to your Workflow.
2. Set the **Apple ID** and **Password**.
3. Set the **Bitrise Apple Developer Connection** input to off.
4. Save your changes and run a new build.

{% include message_box.html type="important" title="2FA and Apple ID authentication" content="Please note that if 2FA is required for your Apple ID, then you must use the Apple ID authentication with the **Deploy to iTunes Connect** and the **Fastlane** Steps instead of authenticating through Step inputs."%}

## Steps and their possible authentication methods

In this section we list all the Steps that require authentication and the authentication methods that you can choose from depending on your project’s requirement.

### iOS Auto Provision with App Store Connect API Step

The [Step](https://www.bitrise.io/integrations/steps/ios-auto-provision-appstoreconnect) uses the official [App Store Connect API (JSON Web Token)](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests). By using the established API key that has been assigned to the app, this Step will:

* Generate, update and download the provisioning profiles needed for your iOS project.
* Verify if your project is registered with the App Store Connect.
* Register the iOS devices connected to your Bitrise account with the App Store Connect.

[Connect to Bitrise with API key.](/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/#setting-up-connection-to-an-apple-service-with-api-key)

[Connect to Bitrise with Step inputs.](/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/#setting-up-connection-with-step-inputs)

### iOS Auto Provision with Apple ID Step

[This Step](https://www.bitrise.io/integrations/steps/ios-auto-provision) automatically manages your iOS provisioning profiles for your Xcode project. The Step uses the Apple ID and password authentication to connect to an Apple service. Once connection is configured, the Step will:

* Generate, update and download the provisioning profiles needed for your iOS project.
* Verify if your project is registered with the App Store Connect.
* Register the iOS devices connected to your Bitrise account with the App Store Connect.

In addition to an Apple ID and password, it also stores the 2-factor authentication (2FA) code you provide. Please note that the 2FA code is only valid for 30 days. When the 2FA code expires, you will need to re-authenticate to provide a new code.

[Connect to Bitrise with Apple ID and password.](/configuring-bitrise-steps-that-require-apple-developer-account-data/#setting-up-connection-with-the-apple-id-and-password)

### Deploy to iTunes Connect Step

With [this Step](https://www.bitrise.io/integrations/steps/deploy-to-itunesconnect-deliver), you can upload screenshots, metadata and binaries to [iTunes Connect](https://itunesconnect.apple.com/) and submit your app for App Store review using the fastlane [deliver](https://docs.fastlane.tools/actions/deliver/) action. The **Deploy to iTunes Connect** Step can connect to your Apple Developer Account either with Apple ID or with the App Store Connect API, or through Step inputs. Please note that in the case of 2FA enabled Apple ID, the **Deploy to iTunes Connect** Step can only work with Apple ID authentication which you can set on the Apple Service page of your profile. The default method is the API key authentication. Choose the connection method that works with your project:

[Connect to Bitrise with API key (recommended).](/configuring-bitrise-steps-that-require-apple-developer-account-data/#setting-up-connection-to-an-apple-service-with-api-key)

[Connect to Bitrise with the Apple ID and password.](/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/#setting-up-connection-with-the-apple-id-and-password)

[Connect to Bitrise with Step inputs.](/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/#setting-up-connection-with-step-inputs)

The **Deploy to iTunes Connect** Step is now set to connect to the Apple Developer account.

### Deploy to iTunes Connect - Application Loader Step

With [this Step](https://www.bitrise.io/integrations/steps/deploy-to-itunesconnect-application-loader), you can upload binaries (.ipa or .pkg files) to [iTunes Connect](https://itunesconnect.apple.com/). The **Deploy to iTunes Connect - Application Loader** Step can connect to your Apple Developer Account either with the App Store Connect API, the Apple ID and password, or through Step inputs. Choose the connection method that works with your project:

[Connect with the API key (recommended).](/configuring-bitrise-steps-that-require-apple-developer-account-data/#setting-up-connection-to-an-apple-service-with-api-key)

[Connect with the Apple ID and password.](/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/#setting-up-connection-with-the-apple-id-and-password)

[Connect your Apple Services to Bitrise with Step inputs.](/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/#setting-up-connection-with-step-inputs)

### Fastlane Step

With this Step you can run your [_fastlane_](https://fastlane.tools/) lanes on Bitrise just like you would locally. Please note that in the case of 2FA enabled Apple ID, the **Fastlane** Step can only work with Apple ID authentication which you can set on the **Apple Service** page of your profile.

[Connect to Bitrise with API key (recommended).](/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/#setting-up-connection-to-an-apple-service-with-api-key)

[Connect with Apple ID and password.](/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/#setting-up-connection-with-the-apple-id-and-password)

[Connect with Step inputs.](/getting-started/configuring-bitrise-steps-that-require-apple-developer-account-data/#setting-up-connection-with-step-inputs)

The **Fastlane** Step is now set to connect to the Apple Developer account assigned to the app during your build.