---
tag:
- testing
- ios
title: Installing an ipa file from the public install page
redirect_from: []
summary: Learn how to install an ipa file from the public install page with or without
  a Bitrise account.
menu:
  testing-main:
    weight: 8

---
The public install page is a convenient way of sharing the latest version of your app with team members and any other stakeholders who wish to check the app out. The page includes all the important details of the build such as filename, size, version code, minimum SDK version, and build number. Anyone, whose email address or Bitrise team role you add before building the app, will receive an email from Bitrise with a link to the public install page. The public install page's direct link can be shared with anyone as well. From there they can quickly install the app on their own test device.

The public install page enables you to install .ipa files on provisioned and registered test devices. The allowed device types are: iPhone and iPad.

Installing an .ipa file on a test device consist of three phases: initiating the device compatibility check, installing a configuration profile on the test device, then finishing up with installing the app on the device.

In this tutorial we’re describing:

* How to install an app on a registered test device without a Bitrise account (for anyone who has not subscribed to Bitrise but wishes to check out the current version of the app).
* How to install an app on a test device which is yet to be registered on Bitrise (for Bitrise users).

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/cyHRJdJoP0E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

## Prepping for installation

Before installing the app on any test device, the app’s developer has to complete a couple of steps to build the app and share it with anyone:

* The device, on which the app will be installed, is registered as a test device at the developer’s Apple account.
* The device has to be included in the provisioning profile of the app.
* The device meets the minimum OS requirements of the app.

Please note that if the test device is not registered on the Apple Developer portal, the developer has to manually add it to the device list, and re-build the app so that the .ipa file contains the test device/s the app can be installed on. We also recommend you [register the test device on Bitrise](/testing/registering-a-test-device/) as well.

{% include message_box.html type="info" title="Which browser should I use with the public install page?" content="Anyone who wishes to install the app on a test device has to make sure that the public install page of the app is opened in a native Safari session with non-incognito mode."%}

## Installing an .ipa file on test devices

During this whole flow, use a native, non-incognito Safari session instead of any other in-app browser type. If you follow the link in the notification email you got from Bitrise, the public install page will automatically open in a native Safari session.

{% include message_box.html type="info" title="Would you rather download the app?" content="If you only wish to download the app and manually upload it somewhere else, you can find the download button on the **APPS & ARTIFACTS** page of the build. Please note that downloading an app does not mean you can install it on the test device."%}

### Installing an app on a test device without a Bitrise account

 1. Long tap on the link you received from Bitrise. To open the link in native Safari, tap **Open Link**. It brings up the public install page in a native Safari session. If you copy the link from the email, make sure you paste it in a native Safari session.
 2. Tap the link in the **Click here to check device compatibility of this device with this app** yellow message box. If you cannot see this message, you are most likely using another browser so switch to Safari.

    ![](/img/3a-public-install-page-not-logged-in-bitrise-user-png.png)
 3. Tap **Allow** on the pop-up to install the configuration profile on your device. This configuration profile makes the device’s UDID available to Bitrise for the compatibility check.

    ![](/img/4a_-_configuration_profile__not_logged_in_bitrise_user__png.jpg)
 4. A pop-up confirms the configuration profile has been downloaded, and it can be installed in the **Settings** app. Tap **Close**.

    ![](/img/5a_-_configuration_profile_downloaded__not_logged_in_bitrise_user__png.jpg)
 5. Tap the **Home** button to go the the home screen.

    ![](/img/6_0_home_screen.jpg)
 6. Open **Settings**. You can find the downloaded profile at the top of the **Settings**. Tap **Profile Downloaded** menu item on the left to install the profile.

    ![](/img/step6.jpg)
 7. Tap **Install**.

    ![](/img/6_2_-_install_configuration_profile_2_png.jpg)
 8. Type your device’s passcode in the **Enter passcode** pop-up.

    ![](/img/6_3_-_install_configuration_profile_3_png.jpg)
 9. Tap **Install** again.

    ![](/img/6_4_-_install_configuration_profile_4_png.jpg)
10. Wait until the profile is installed.

    ![](/img/6_5_-_install_configuration_profile_5_png.jpg)
11. Once the profile is installed, you’re directed to the public install page. As you can see, the **Install** button is now available. Tap it!

    ![](/img/7_1_-_install_application_1_png.jpg)
12. Tap **OK** on the next pop-up.

    ![](/img/tapok.png)
13. As a final confirmation, tap on **Install** and press the **Home** button. Now you’re installing the app to your test device.

    ![](/img/7_3_-_install_application_3_png.jpg)
14. Wait till the app installs on your test device’s home screen.

    ![](/img/7_5_install_application_5_png.jpg)

Check out the app you’ve successfully installed on your test device.

### Installing an app on a test device not registered to Bitrise

If you’re accessing the public install page from a test device which displays the below message, you’ll have to register the device on Bitrise which is only a few steps different from the above flow.

Please note that you can only add a test device to Bitrise if you already have a Bitrise account.

![](/img/3b_-_public_install_page__logged_in_bitrise_user__png.jpg)

 1. Tap **Click here** to start the device registration process.
 2. Tap **Allow** to download the configuration profile.

    ![](/img/4b_-_configuration_profile__logged_in_bitrise_user__png.jpg)
 3. When the configuration profile is downloaded, tap **Close**.

    ![](/img/5b_-_configuration_profile_downloaded__logged_in_bitrise_user__png.jpg)
 4. Tap the **Home** button to go to your **Settings** app on your test device’s home screen.

    ![](/img/6_0_home_screen-1.jpg)
 5. Open **Settings**. You can find the downloaded profile at the top of the **Settings**. Tap **Profile Downloaded** menu item on the left to install the profile.

    ![](/img/step6.jpg)
 6. Tap **Install**.

    ![](/img/6_2_-_install_configuration_profile_2_png.jpg)
 7. Type your device’s passcode in the **Enter Passcode** pop-up.

    ![](/img/6_3_-_install_configuration_profile_3_png.jpg)
 8. Tap **Install** again in the **Install Profile** pop-up.

    ![](/img/6_4_-_install_configuration_profile_4_png.jpg)
 9. Wait until the profile installation is complete. You automatically get redirected to the **Register your test device** page.

    ![](/img/6_5_-_install_configuration_profile_5_png.jpg)
10. Your device’s name and UDID gets populated automatically. You can only change the device name here. Tap **Register Device**.

    ![](/img/6_6b_-_register_device_png.jpg)
11. You land on the public install page where the **Install** button is now available. Tap it!

    ![](/img/7_1_-_install_application_1_png.jpg)
12. Tap **OK** on the prompt.

    ![](/img/tapok.png)
13. To install the app on your test device, tap on **Install**. Then press the **Home** button to follow the installment of your app.

If all went well, you can find the installed app on your test device’s **Home** page.

![](/img/7_5_install_application_5_png.jpg)