---
tag: []
title: Connecting to Apple services with API key
redirect_from: []
summary: ''
menu:
  connecting-to-services:
    weight: 

---

{% include not_translated_yet.html %}

Connecting to an Apple service (such as the App Store Connect or the Apple Developer Portal) with the API key requires that you first add your Apple service authentication data on our **Apple Services Connection** page, then an API key for your app.

Please note that the API key authentication is the recommended way when connecting Bitrise to Apple Services. Please note that you can have 50 API key added to the **Apple Services connection** page but your project can use only one (selected in the **Team** tab).

### Adding API key authentication data on Bitrise

1. On [App Store Connect](https://appstoreconnect.apple.com/login), [generate a new API key with Admin access](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api) under **Users and Access**.![](/img/usersandaccess.jpg)
2. Log in to [bitrise.io](https://www.bitrise.io/).
3. Click on your profile in the upper-right corner of your **Dashboard** and select [**Account settings**](https://app.bitrise.io/me/profile#/overview) from the dropdown menu.
4. On the menu bar select **Apple Service Connection**.![](/img/appleserviceconnection.jpg)
5. Click **Add connection**.
6. Fill out all required fields: provide the **Name**, [**Issuer ID**](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests), and the **Key ID** you generated at Step 1., and [**Upload a Private key (.p8)**](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api). If one input is missing, the **Connect** and **Upload a Private Key (.p8)** buttons won’t be available. ![](/img/apikeyauthentication.jpg)
7. Click **Connect**.
8. Continue with assigning an Apple Developer Account for your app.

### Assigning API key authentication to your app

When you wish to use a Step with the established connection, you also have to select an app for the connection. This way your app can receive data from your Apple Developer account when your build runs on Bitrise.

1. Open your app’s page on [bitrise.io](https://www.bitrise.io/).
2. Select the **Team** tab.
3. Scroll down to the **Apple Service connection** section.
4. Select the **API key authentication (recommended)** method for the app to use in the dropdown.  
   ![](/img/apikeyteam.jpg)

The Step is now able to connect to the App Store Connect or the Apple Developer Portal during your build.

{% include message_box.html type="important" title="No Step input modification needed" content="Please note that there is NO NEED TO MODIFY ANY STEP INPUT  fields manually since these are automatically populated once the connection is set up."%}

### What's next?

Check out [Steps that use the official API key authentication](/getting-started/connecting-to-services/bitrise-steps-and-their-authentication-methods/).