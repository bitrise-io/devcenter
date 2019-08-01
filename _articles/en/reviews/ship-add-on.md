---
tag: []
title: Ship add-on
redirect_from: []
summary: ''
published: false

---
## Ship overview

With Ship, you can manage Continous Deployment of your app, as well as manage different build versions of the app in a convenient way. Using Ship to distribute your app gives you more control and granularity.

You can do a whole lot of things with Ship:

* View all the build versions of your app.
* View and edit all the details of a given build version, including a description, screenshots, and the most important parameters, such as the app size or the supported device types.
* Install a given build version directly from the Ship page for testing, or share it with a third party.
* Quickly deploy a given build version to all applicable online stores, once you set up publishing.

## Publishing an app with Ship

To publish an app using Ship, you need a minimum of two things (other than an app, of course).

* At least one Workflow's artifacts must be exposed to Ship.
* All such Workflows must include a **Deploy to Bitrise.io** Step.

Exposing the artifact means that the products of the Workflow will be available in Ship: for example, if your Workflow produces an .ipa file, you can deploy that file using Ship.

On the **Settings** page, you can configure a number of options for publishing your app. If it's a cross-platform app, you can define the settings separately for the iOS and the Android versions.

### Exposing a Workflow's artifacts to Ship

To expose a Workflow's artifacts to Ship:

1. Go to your app's Ship page.
2. Click **Settings** in the top right corner.
3. In the **Expose Artifacts From the Selected Workflow to Ship** text box, add all the Workflows you need.

   Be aware there are TWO such text boxes: one for iOS and one for Android. If your app is cross-platform, fill out both. Separate the different Workflow names with a comma.
4. Scroll down to the bottom of the page and click **Save**.

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

{% include message_box.html type="important" title="Binary types" content="The public install page is not available for all type of artifacts.

* For iOS, it's only available if the .ipa file is signed with a Debug, Development or Ad-Hoc type provisioning profile. It's not available if the artifact is an .xcarchive file.
* For Android, it's only available if the artifact is a universal APK. For split APKs or AABs, there will be no public install page link."%}

To send the public install page link or the QR code:

1. [Expose the Workflow](/deploy/ship/#exposing-a-workflows-artifacts-to-ship) that creates the installable file, and run the Workflow on Bitrise.
2. Open the **Details** page of your app's chosen build version.
3. On the right, find the Public Install Page link or the QR code.
4. Copy the one you need and send it to the stakeholders (by email, for example).

To install it directly from Ship:

1. Log in to Ship from a supported device.
2. Under the name of the app, find and click the **Install** button.

### Publishing an app for iOS

To configure publishing an iOS app to the App Store, you can:

* Choose the provisioning profiles and code signing identities to be used.
* Set the app specific password.
* Set the Apple Developer Account email.
* Set the App SKU.

Once you configured publishing for the app, you do not have to set these options every time, only if you want to change some of them.

To configure publishing an app for iOS:

1. Open your app's Ship page and click **Settings** in the top right corner.
2. Go to the **iOS Settings** section.
3. [Expose a Workflow](/deploy/ship/#exposing-a-workflows-artifacts-to-ship) that creates the .ipa you want to publish, and run the Workflow on Bitrise.
4. Select the [code signing files](/deploy/ship/#code-signing-files) you want to use.

   Make sure you choose the files appropriate for the export method you used to create the .ipa file. For example, if your .ipa was exported using the `app-store` method, choose an App Store provisioning profile and a Distribution certificate (code signing identity).
5. Set the **Apple Developer Account Email** and the **App Specific Password** to be able to publish to the App Store.

When you're done, you can go back to the app's home page in Ship, and click **Publish**.

### Publishing an app for Android

To configure publishing an Android app to Play Store, you can:

* Choose the Android keystore files and the Service Account JSON file.
* Set the track you want to use to release your app.

Once you configured publishing for the app, you do not have to set these options every time, only if you want to change some of them.

To configure publishing an app for Android:

1. Open your app's Ship page and click **Settings** in the top right corner.
2. Go the **Android Settings** section.
3. [Expose a Workflow](/deploy/ship/#exposing-a-workflows-artifacts-to-ship) that creates the APK you want to publish.
4. Set the [track](https://developers.google.com/android-publisher/tracks) you want to use to publish to the Play Store.
5. Choose the appropriate keystore file and the Service Account JSON file.

When you're done, you can go back to the app's home page in Ship, and click **Publish**.

## App details

The purpose of the app details page is to update the most important information about your app, as you want that information to appear in your online store of choice, for example.

The details include:

* A short and a full description of the app.
* Screenshots and feature graphics of the app, arranged by the different supported devices.  At least two screenshots are required for an app to be published.
* Metadata such as version number, size, version code, SDK version, and so on. The exact parameters depend on the type of the app.

### Adding screenshots or feature graphics

At least two screenshots are required for an app to be published. To add screenshots or feature graphics to your app details page:

1. Open the **Details** page in Ship of your app's chosen build version.
2. Go to **Screenshots** or **Feature Graphic**, depending on what you want to upload.
3. Drag and drop a file OR click **Browse files** and select the ones you wish to upload.
4. Once done, click **Save** in the top right corner.

### Updating the app's descriptions

Update the app's short and full descriptions in the same way:

1. Open the **Details** page in Ship of your app's chosen build version.
2. Go to **Short description** or **Full description**.
3. Click the Edit icon, shaped like a pencil.
4. Edit the content.

   Note that the short description can contain a maximum of 80 characters while a full description can contain a maximum of 4000 characters.
5. Click **Save** in the top right corner.