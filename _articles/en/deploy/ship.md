---
tag:
- ship
- deploy
- ios
- android
title: Deploying with Ship
redirect_from: []
description: Ship is a deployment solution that aims to save users a lot of headache.
  With Ship, you have complete control over your app's distribution, its version history,
  and all the important metadata - and you can manage all that in one place.
summary: ''
changelog: Clarification added about using Steps that can build a deployable app but
  do not automatically export it to Ship.
last_modified_at: '2020-04-01'
menu:
  deploy-main:
    weight: 5

---
## Ship overview

{% include message_box.html type="important" title="Ship in BETA" content="Please note that this feature is still a BETA version."%}

Ship is a deployment solution that aims to save users a lot of headache. With Ship, you have complete control over your app's distribution, its version history, and all the important metadata - and you can manage all that in one place.

Deployment with Ship includes automatic re-sign and artifact generation and we store all the previous versions too. The app’s metadata, all the marketing copy, and screenshots can also be edited on the spot and non-developer people can manage it.

{% include message_box.html type="info" title="Ship language" content="As of right now, Ship only supports English locale. No other language submissions are supported."%}

You can do a whole lot of things with Ship:

* View all the build versions of your app.
* View and edit all the details of a given build version, including a description, screenshots, and the most important parameters, such as the app size or the supported device types.
* Send your app directly to testers with a link to the public install page.
* Deploy a given build version to App Store Connect and/or the Google Play Console, once you set up publishing.
* Switch between platforms on the **Version History** page in the case of cross-platform projects.

  ![](/img/ship_benefits.jpg)

## Getting started with Ship

You have two options to open Ship:

* On the **Add-ons** tab of the app: this option takes you to Ship’s home page.
* From the **Builds** page: this option takes you to the build’s Ship page.

When first logging in, you might not have a single build version available to publish. But don't worry, that can be fixed quickly.

* In one of your Workflows, you need a Step that builds your app. By default, **Xcode Archive & Export for iOS**, **Gradle Runner** and **Android Build** are automatically supported.
* The same Workflow must have the correct version of the **Deploy to Bitrise.io** Step after the Step that builds your app.
* The **Deploy to Bitrise.io** Step must export the relevant file: an APK file for Android apps and the `.xcarchive` file for iOS apps. If you use either one of the **Xcode Archive & Export for iOS**, **Gradle Runner** and **Android Build** Steps, you don't have to change anything in the default configuration of the **Deploy to Bitrise.io** Step to export the relevant files. 

{% include message_box.html type="warning" title="Step versions compatible with Ship" content="Please note that the **Deploy to Bitrise.io** Step must be version 1.9.0 or higher and the **Xcode Archive & Export for iOS** Step for iOS apps must be version 2.6.0 or higher - older versions of the Steps do not support Ship."%}

{% include message_box.html type="info" title="Using Ship with different build Steps" content="By default, **Xcode Archive & Export for iOS**, **Gradle Runner**, and **Android Build** are automatically supported with Ship.

If you want to build your app with any other Step, you can do so - please check out the [Using Ship for apps built with cross-platform frameworks](/deploy/ship/#using-ship-for-apps-built-with-cross-platform-frameworks) section."%}

Once you successfully built your app, you will be able to start using Ship.

## Configuring and publishing an app with Ship

To publish an app on Ship, you need to:

* Build an app that has at least one [exposed Workflow](/ship-add-on-beta-version/#exposing-a-workflows-artifacts-to-ship).
* Configure publishing on the **Settings** page.
* Push the **Publish** button.

iOS and Android apps have their own set of settings on the **Settings** page; for cross-platform app, both iOS and Android settings must be configured.

### Exposing a Workflow's artifacts to Ship

Exposing a Workflow's artifacts means that the products of the Workflow will be available in Ship: for example, if your Workflow produces an APK, you can publish that using Ship. By default, all Workflows are exposed if they contain the correct version of the **Deploy to Bitrise.io** Step. If you are happy with that, just leave the field as is.

If, however, you add a Workflow here, only that Workflow will be exposed.

To expose a Workflow's artifacts to Ship:

1. Go to your app's Ship page.
2. Click **Settings** in the top right corner.
3. Go to the **General** tab.
4. In the **Expose Artifacts From the Selected Workflow to Ship** text box, add all the Workflows you need.

   ![](/img/Settings___android-test-test.png)

   Be aware that if your app is cross-platform, there are TWO such text boxes: one for iOS and one for Android. Separate the different Workflow names with a comma (for example, `build, deploy, release_build_android`) .
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

* For iOS, it's only available if your app is signed with a Debug, Development or Ad-hoc type provisioning profile.
* For Android, it's only available if your Workflow builds an APK which is NOT split or if it builds a universal APK which is split. For AABs, there will be no public install page link."%}

To send the public install page link or the QR code:

1. [Expose](/ship-add-on-beta-version/#exposing-a-workflows-artifacts-to-ship) the Workflow that creates the installable file, and run the Workflow on Bitrise.
2. Open the **Details** page of your app's chosen build version.
3. On the right, find the Public Install Page link or the QR code.
4. Copy the one you need and send it to the stakeholders (by email, for example).

To install it directly from Ship:

1. Log in to Ship from a supported device.

   Click on the **Devices** tab to find out if a given device is registered. Read [our guide on how to register your devices](/testing/registering-a-test-device/) on Bitrise.
2. Under the name of the app, find and click the **Install** button.

### Publishing an app online

<div><button type="button" class="collapsible"><p>Publishing an app for iOS</p></button> <div class="collapsible-content" markdown="1"> {% include message_box.html type="important" title="Building the app" content="You can only publish an app in Ship if it's built in a Workflow that is [exposed](/ship-add-on-beta-version/#exposing-a-workflows-artifacts-to-ship) to Ship. For an iOS app, the Workflow should contain the **Xcode Archive & Export for iOS** Step and the **Deploy to Bitrise.io** Step. Make sure the **Xcode Archive & Export for iOS** Step archives and exports the project with `Release` configuration."%}
  
{% include message_box.html type="important" title="The `.xcarchive` file" content="Please note that in order to deploy an iOS app with Ship, Ship needs the `.xcarchive` file from the **Deploy to Bitrise.io** Step. Make sure that the archive is deployed by the Step otherwise Ship won't be able to publish your app! 
  
To make sure, check the **Deploy to Bitrise.io** Step in your Workflow. It has an input called **Deploy directory or file path**: the path specified here must contain the `xcarchive` file. The default value is the `BITRISE_DEPLOY_DIR` Environment Variable: we recommend you don't remove this. If this Env Var is included, the file is automatically exported."%}

{% include message_box.html type="important" title="Apps built with cross-platform frameworks" content="If you wish to deploy an iOS app that is built using Flutter, React Native, or any other cross-platform framework, you can do so: you just need to make sure that the Step that archives your iOS project exports the `.xcarchive` file for the **Deploy to Bitrise.io** Step. Read more in the [Deploying iOS apps built with cross-platform frameworks](/deploy/ship/#deploying-ios-apps-built-with-cross-platform-frameworks)."%}

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
4. [Expose](/ship-add-on-beta-version/#exposing-a-workflows-artifacts-to-ship) a Workflow that creates the .ipa you want to publish, and run the Workflow on Bitrise.
5. Select the code signing files you want to use.

   Make sure you choose the files appropriate for the export method you used to create the .ipa file. For example, if your .ipa was exported using the `app-store` method, choose an App Store provisioning profile and a Distribution certificate (code signing identity).
6. Enter the **Apple Developer Account Email** and the **App Specific Password** to be able to publish to the App Store.
7. Enter the **App SKU**.
8. Go back to the **Details** page and click **Publish**.
</div>
</div>

<div><button type="button" class="collapsible"><p>Publishing an app for Android</p></button> <div class="collapsible-content" markdown="1"> {% include message_box.html type="important" title="Building the app" content="Before you publish an Android app in Ship, make sure that:

* Your app is built in a Workflow that is exposed to Ship. The Workflow must contain a build Step that builds an APK(s) or an Android App Bundle (such as **Android Build** or **Gradle Runner** Step) and the **Deploy to Bitrise.io** Step.
* You have built a release version of your app before publishing it in Ship. Please note that without a release version, the **Publish** button on the **Details** page of Ship will be disabled. In this case, check if the following is set in your build Steps: the **Android Build** Step's **Variant** input field must contain `release` (for example `release` or `demoRelease`) and the **Gradle Runner** Step's **Gradle task to run** input field must contain `Release` (for example, `assembleRelease` or `assembleDemoRelease`).
* If using a custom **Script** Step or other custom Step to build your APK, you must make sure that the Step exports the APK to the `BITRISE_DEPLOY_DIR` directory and that the **Deploy to Bitrise.io** Step is included in your exposed Workflow."%}

To configure publishing an Android app to Google Play Console, you can:

* Choose the Android keystore files and the Service Account JSON file.
* Set the track you want to use to release your app.

Once you configured publishing for the app, you do not have to set these options every time, only if you want to change some of them.

To configure publishing an app for Android:

1. Open your app's Ship page and click **Settings** in the top right corner.
2. Go to the **Android Settings** section.
3. [Expose](/ship-add-on-beta-version/#exposing-a-workflows-artifacts-to-ship) a Workflow that creates the APK you want to publish.
4. Enter the [track](https://developers.google.com/android-publisher/tracks) you want to use to publish to the Google Play Console.
5. If your Android app contains multiple modules, enter the exact module under **Module**. ![](/img/module-android-settings.png)
6. Choose the appropriate keystore file and the Service Account JSON file.
7. Head back to the **Version History** page and select the version you wish to publish. If your app has multiple flavors, you can filter for the right flavor and select it for publishing. ![](/img/flavorandroid.jpg)
8. Fill out the **Details** page and click **Publish.**
</div>
</div>

## Publishing status and logs

Once you clicked **Publish** in Ship, the process starts according to the configured settings. You can view the status of the active publishing process on top of the **Details** page of the app.

To view the logs of any publishing process, go to the **Activity** tab. From there, you can download the logs by clicking **Download Build Log** to troubleshoot any errors after a failed publish.

![](/img/downloadbuildlog.jpg)

## App details

The purpose of the app **Details** page is to update the most important information about your app, as you want that information to appear in your online store of choice, for example.

The details include:

* A description of the app.
* Screenshots and feature graphics of the app, arranged by the different supported devices.
* Metadata such as version number, size, version code, SDK version, and so on. The exact parameters depend on the type of the app. This is automatically exported to Ship by the **Deploy to Bitrise.io** Step.

### Adding screenshots or feature graphics

You can add screenshots for an app to be published. Once you added screenshots or graphics to one build version of the app, they are automatically added to all subsequent versions. If you want to display different screenshots, you can modify it, otherwise you can leave it alone.

To add screenshots or feature graphics to your app details page:

1. Open the **Details** page in Ship of your app's chosen build version.
2. Go to **Screenshots** or **Feature Graphic**, depending on what you want to upload.

   ![](/img/ship-screenshots-1.jpg)
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

   ![](/img/ship-notifications.jpg)
5. Click **Add**.

The address should appear in the list below, with **Pending** as its status. An email is sent to the address: the recipient must click **Confirm Notifications** in the email to start receiving notifications.

### Configuring notifications

You can pick and choose the Ship events about which you want to notify different people. For example, it's possible to only send notifications about a failed publishing event if you do not want to be bothered when things go well! And of course you can send different notifications to different email addresses.

To configure notifications:

1. Open your app's Ship page.
2. Click **Settings.**
3. Go to the **Notifications** tab.
4. Use the toggles under the different event types.
5. Hit **Save** once all notifications are set.

## Using Ship for apps built with cross-platform frameworks

By default, Ship works with the **Android Build, Gradle Runner** and the **Xcode Archive & Export for iOS** Steps. The output of these Steps are automatically exported by the **Deploy to Bitrise.io** Step to Ship.

However, for apps built with cross-platform frameworks, such as React Native or Flutter, you might not use these Steps in your Workflows. But don't worry: you can use Steps that are not supported by default to build your app and still deploy it with Ship. All you need to do is make sure the right files end up in the right place.

### Deploying iOS apps built with cross-platform frameworks

The **Deploy to Bitrise.io** Step looks for an `.xcarchive.zip` file to export to Ship in the case of an iOS app. If you do not want to use the **Xcode Archive & Export for iOS** Step, you just need to make sure that:

* There is a Step in your exposed Workflow that exports an `.xcarchive.zip` file of your app. That is, the Step you use needs to create an Xcode Archive and needs to package it in a zip file.
* This Step exports the `.xcarchive.zip` file into the `BITRISE_DEPLOY_DIR` directory.

### Deploying Android apps built with different Steps

The **Deploy to Bitrise.io** Step looks for an APK or an AAB file in the `BITRISE_DEPLOY_DIR` directory.

If you do not want to use the **Android Build** or the **Gradle Runner** Steps, you just need to make sure that:

* There is a Step in your exposed Workflow that exports an APK or AAB file of your app.
* This Step exports the APK or AAB file into the `BITRISE_DEPLOY_DIR` directory.