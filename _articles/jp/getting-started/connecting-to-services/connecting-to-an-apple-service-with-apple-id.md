---
tag: []
title: Connecting to Apple services with Apple ID
redirect_from: []
summary: ''
menu:
  connecting-to-services:
    weight: 10

---
{% include not_translated_yet.html %}

Connecting to an Apple service (such as the App Store Connect or the Apple Developer Portal) with the Apple ID requires that you first add your Apple ID and password on the **Apple Service connection** page, then select an app to use Apple ID authentication while the build is running.

If you cannot use the API key authentication, we recommend you try this option. Please note that you can only connect one Apple ID to Bitrise.

{% include message_box.html type="important" title="Apple accounts with enabled two-factor authentication" content="Please note that if two-factor authentication is enabled on your Apple account, you will have to provide the App-specific password during this process. Learn [how to generate an app-specific password on the Security section of your Apple ID account page](https://support.apple.com/en-us/HT204397)."%}

![](/img/appspecificpassword.jpg)

### Adding Apple ID authentication data on Bitrise

 1. Log in to [bitrise.io](https://www.bitrise.io/).
 2. Click on your profile in the upper-right corner of your **Dashboard** and select [**Profile settings**](https://app.bitrise.io/me/profile#/overview) from the dropdown menu.
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
4. Select the **Apple ID authentication** for the app to use. It displays the connection method of the app owner and other team members with admin authority. ![](/img/appleidteam.jpg)

The Step is now able to connect to an Apple service during your build.

{% include message_box.html type="important" title="No Step input modification needed" content="Please note that there is NO NEED TO MODIFY ANY STEP INPUT  fields manually since these are automatically populated once the connection is set up."%}

### What's next?

Check out the [Steps that use the Apple ID and password authentication](/getting-started/connecting-to-services/connecting-to-an-apple-service-with-apple-id/).