---
tag: []
title: ship-androiddraft
redirect_from: []
summary: ''
published: false

---
## Ship overview

With Ship, you can manage Continuous Deployment of your app, as well as manage different build versions of the app in a convenient way. Using Ship to distribute your app gives you more control and granularity.

You can do a whole lot of things with Ship:

* View all the build versions of your app.

  ![](/img/ship_apphome.png)
* View and edit all the details of a given build version, including a description, screenshots, and the most important parameters, such as the app size or the supported device types.
* Install a given build version directly from the Ship page for testing, or share it with a third party.
* Deploy a given build version to App Store Connect and/or the Play Store, once you set up publishing.

## Publishing an app with Ship

To publish an app using Ship, you need a minimum of three things:

* At least one Workflow's artifacts must be exposed to Ship.
* Either an .xcarchive.zip or an APK file which must be placed in the directory stored in the `BITRISE_DEPLOY_DIR` Environment Variable. For iOS apps, the **Xcode Archive & Export for iOS** Step does this by default; for Android apps, any Step that builds an APK - such as **Android Build** - does it.
* All exposed Workflows must include a **Deploy to Bitrise.io** Step.

Exposing the artifact means that the products of the Workflow will be available in Ship: for example, if your Workflow produces an APK, you can publish that using Ship.

On the **Settings** page, you can configure a number of options for publishing your app. If it's a cross-platform app, you can define the settings separately for the iOS and the Android versions.

### Exposing a Workflow's artifacts to Ship

To expose a Workflow's artifacts to Ship:

1. Go to your app's Ship page.
2. Click **Settings** in the top right corner.
3. Go to the **General** tab.

   ![](/img/ship_settings.png)
4. In the **Expose Artifacts From the Selected Workflow to Ship** text box, add all the Workflows you need.

   Be aware that if your app is cross-platform, there are TWO such text boxes: one for iOS and one for Android. Separate the different Workflow names with a comma.
5. Scroll down to the bottom of the page and click **Save**.

### Code signing files

On the **Settings** page, you can choose between different code signing files. You can upload these files - iOS provisioning profiles and certificates, Android keystore files and Service Account JSON files - in the usual way:

* [iOS code signing files](/code-signing/ios-code-signing/code-signing-index/).
* [Android code signing files](/code-signing/android-code-signing/android-code-signing-index/).

Code signing files are required to publish an app to any online store, or to install them to test devices.

### Installing an app on a test device

To install an app on a device, there are three options:

* Send the public install page link to all the testers and other stakeholders.
* Send the QR code: scanning it takes you to the public install page of the app.
* Log in to Ship from the device and install it directly from there.

{% include message_box.html type="important" title="Enabling the public install page" content="Be aware that to have a public install page, you must configure your exposed Workflow's **Deploy to Bitrise.io** Step correctly: the **Enable public page for the App?** input of the Step must be set to `true`."%}

{% include message_box.html type="important" title="Artifact types" content="The public install page is not available for all type of artifacts.

* For iOS, it's only available if your Workflow builds an .ipa file that is signed with a Debug, Development or Ad-hoc type provisioning profile.
* For Android, it's only available if the artifact is an APK, either universal or split. For AABs, there will be no public install page link."%}

To send the public install page link or the QR code:

1. [Expose the Workflow](/deploy/ship/#exposing-a-workflows-artifacts-to-ship) that creates the installable file, and run the Workflow on Bitrise.
2. Open the **Details** page of your app's chosen build version.

   ![](/img/ship-details.png)
3. On the right, find the Public Install Page link or the QR code.
4. Copy the one you need and send it to the stakeholders (by email, for example).

To install it directly from Ship:

1. Log in to Ship from a supported device.

   Click on the **Devices** tab to find out if a given device is registered. Read [our guide on how to register your devices](/testing/registering-a-test-device/) on Bitrise.
2. Under the name of the app, find and click the **Install** button.

### Publishing an app for iOS

{% include message_box.html type="important" title="Building the app" content="You can only publish an app in Ship if it's built in a Workflow that is exposed to Ship. For an iOS app, the Workflow should contain the **Xcode Archive & Export for iOS** Step and the **Deploy to Bitrise.io** Step."%}

{% include message_box.html type="note" title="The `.xcarchive` file with a custom Step" content="The **Deploy to Bitrise.io** Step looks for an `.xcarchive.zip` file to export to Ship in the case of an iOS app. If you do not want to use the **Xcode Archive & Export for iOS** Step, you just need to make sure that:

* There is a Step in your exposed Workflow that exports an `.xcarchive.zip` file of your app. That is, the Step you use needs to create an Xcode Archive and needs to package it in a zip file.
* This Step exports the `.xcarchive.zip` file into the `BITRISE_DEPLOY_DIR` directory."%}

To configure publishing an iOS app to App Store Connect (formerly known as iTunes Connect), you have to:

* Choose the provisioning profiles and code signing identities to be used.
* Set the app specific password.
* Set the Apple Developer Account email.
* Set the [App SKU](https://help.apple.com/app-store-connect/#/dev219b53a88): this is a unique ID you give to your app for internal tracking. It's not visible to customers.

Once you configured publishing for the app, you do not have to set these options every time, only if you want to change some of them.

To configure publishing an app for iOS:

1. Open your app's Ship page and click **Settings** in the top right corner.
2. Go to the **General** tab.
3. Go to the **iOS Settings** section.
4. [Expose a Workflow](/deploy/ship/#exposing-a-workflows-artifacts-to-ship) that creates the .ipa you want to publish, and run the Workflow on Bitrise.
5. Select the [code signing files](/deploy/ship/#code-signing-files) you want to use.

   Make sure you choose the files appropriate for the export method you used to create the .ipa file. For example, if your .ipa was exported using the `app-store` method, choose an App Store provisioning profile and a Distribution certificate (code signing identity).
6. Enter the **Apple Developer Account Email** and the **App Specific Password** to be able to publish to the App Store.
7. Enter the **App SKU**.

Your app is now ready for publishing. To publish, go back to the **Details** page and click **Publish**.

### Publishing an app for Android

{% include message_box.html type="important" title="Building the app" content="You can only publish an app in Ship if it's built in a Workflow that is exposed to Ship. The Workflow must contain a Step that builds an APK (for example, **Android Build**) and the **Deploy to Bitrise.io** Step.

Note that the if you wish to use a custom Script Step or other custom Step to build your APK, you must make sure that the Step exports the APK to the `BITRISE_DEPLOY_DIR` directory."%}

To configure publishing an Android app to Play Store, you can:

* Choose the Android keystore files and the Service Account JSON file.
* Set the track you want to use to release your app.

Once you configured publishing for the app, you do not have to set these options every time, only if you want to change some of them.

To configure publishing an app for Android:

1. Open your app's Ship page and click **Settings** in the top right corner.
2. Go the **Android Settings** section.
3. [Expose a Workflow](/deploy/ship/#exposing-a-workflows-artifacts-to-ship) that creates the APK you want to publish.
4. Enter the [track](https://developers.google.com/android-publisher/tracks) you want to use to publish to the Play Store.
5. Choose the appropriate keystore file and the Service Account JSON file.

Your app is now ready for publishing. To publish, go back to the **Details** page and click **Publish**.

### Publishing status and logs

Once you clicked **Publish** in Ship, the process starts according to the configured settings. You can view the status of the active publishing process on top of the **Details** page of the app.

To view the logs of any publishing process, go to the **Activity** tab. From there, you can download the logs to troubleshoot any errors after a failed publish.

## App details

The purpose of the app details page is to update the most important information about your app, as you want that information to appear in your online store of choice, for example.

The details include:

* A description of the app.
* Screenshots and feature graphics of the app, arranged by the different supported devices.  At least two screenshots are required for an app to be published.
* Metadata such as version number, size, version code, SDK version, and so on. The exact parameters depend on the type of the app. This is automatically exported to Ship by the **Deploy to Bitrise.io** Step.

### Adding screenshots or feature graphics

At least two screenshots are required for an app to be published. Once you added screenshots or graphics to one build version of the app, they are automatically added to all subsequent versions. If you want to display different screenshots, you can modify it, otherwise you can leave it alone.

To add screenshots or feature graphics to your app details page:

1. Open the **Details** page in Ship of your app's chosen build version.
2. Go to **Screenshots** or **Feature Graphic**, depending on what you want to upload.

   ![](/img/ship-screenshots.png)
3. Drag and drop a file OR click **Browse files** and select the ones you wish to upload.
4. Once done, click **Save** in the top right corner.

### Updating the app's descriptions

You can update the app's description, or all its other textual details in the same way. The types of text fields that you have available depend on the type of the app.

1. Open the **Details** page in Ship of your app's chosen build version.
2. Go to the field you want to edit and click in the content field.
3. Edit the content.
4. Click **Save** in the top right of the Details tab.

## Notifications

Ship can send emails about three different events:

* A new build version of an app is available in Ship.
* Ship successfully published the app.
* Ship failed to publish the app.

These notifications can be sent to any number of different email addresses. When a new email address is added to the notifications list, Ship sends a confirmation email to the address: after confirmation, notifications should work.

### Adding a new email address

To add a new email address to the notification list for an app:

1. Open your app's Ship page.
2. Click **Settings.**
3. Go to the **Notifications** tab.
4. In the input field under **Email notifications**, type the email address.

   ![](/img/ship-notifications.png)
5. Click **Add**.

The address should appear in the list below, with **Pending** as its status. An email is sent to the address: the recipient must click **Confirm Notifications** in the email to start receiving notifications.

### Configuring notifications

You can pick and choose the Ship events about which you want to notify different people. For example, it's possible to only send notifications about a failed publishing event if you do not want to be bothered when things go well! And of course you can send different notifications to different email addresses.

To configure notifications:

1. Open your app's Ship page.
2. Click **Settings.**
3. Go to the **Notifications** tab.
4. Use the toggles under the different event types.