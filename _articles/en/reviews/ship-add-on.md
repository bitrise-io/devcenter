---
tag: []
title: Ship add-on
redirect_from: []
summary: ''
published: false

---
## Ship overview

With Ship, you can manage Continous Deployment of your app, as well as manage different releases of the app in a convenient way. Using Ship to distribute your app gives you more control and granularity. 

You can do a whole lot of things with Ship:

* View all the releases of your app.
* View and edit all the details of a given release, including a description, screenshots, and the most important parameters, such as the app size or the supported device types. 
* Install a given release directly from the Ship page for testing, or share it with a third party.
* Quickly deploy a given release to all applicable online stores, once you set up publishing.

## Publishing an app with Ship

To publish an app using Ship, you need a minimum of two things (other than an app, of course). 

* At least one Workflow's artifacts must be exposed to Ship.
* All such Workflows must include a **Deploy to Bitrise.io**  Step.

Exposing the artifact means that the products of the Workflow will be available in Ship: for example, if your Workflow produces an .ipa file, you can deploy that file using Ship. 

On the **Settings** page, you can configure a number of options for publishing your app. If it's a cross-platform app, you can define settings separately for the iOS and the Android versions. 

### Exposing a Workflow's artifacts to Ship

To expose a Workflow's artifacts to Ship:

1. Go to your app's Ship page. 
2. Click **Settings** in the top right corner. 
3. In the **Expose Artifacts From the Selected Workflow to Ship** text box, add all the Workflows you need. 

   Be aware there are TWO such text boxes: one for iOS and one for Android. If your app is cross-platform, fill out both. Separate the different Workflow names with a comma. 
4. Scroll down to the bottom of the page and click **Save**. 

### Publishing an app for iOS

On the **iOS Settings** section of the **Settings page**, you can:

* Choose the provisioning profiles and code signing identities to be used.
* Set the app specific password. 
* Set the Apple Developer Account email. 
* Set the App SKU.

Once you configured publishing for the app, you do not have to set these options every time, only if you want to change some of them. 

To configure publishing an app for iOS:

1. Open your app's Ship page and click **Settings** in the top right corner.
2. Go to the **iOS Settings** section. 
3. [Expose a Workflow](/deploy/ship/#exposing-a-workflows-artifacts-to-ship) that creates the .ipa you want to publish. 
4. Select the [code signing files](/deploy/ship/#code-signing-files) you want to use. 

   Make sure you choose the files appropriate for the export method you used to create the .ipa file. For example, if your .ipa was exported using the `app-store` method, choose an App Store provisioning profile and a Distribution certificate (code signing identity).

### Publishing an app for Android

On the **Android Settings** section of the **Settings page**, you can:

* Choose the Android keystore files and the Service Account JSON file. 
* Set the track you want to use to release your APK.

Once you configured publishing for the app, you do not have to set these options every time, only if you want to change some of them. 

To configure publishing an app for Android:

1. Open your app's Ship page and click **Settings** in the top right corner.
2. Go the **Android Settings** section.
3. [Expose a Workflow](/deploy/ship/#exposing-a-workflows-artifacts-to-ship) that creates the APK you want to publish. 
4. Set the [track](https://developers.google.com/android-publisher/tracks) you want to use. 
5. Choose the approriate keystore file and the Service Account JSON file. 

### Code signing files

On the **Settings** page, you can choose between different code signing files. You can upload these files - iOS provisioning profiles and certificates, Android keystore files and Service Account JSON files - in the usual way:

* [iOS code signing files](/code-signing/ios-code-signing/code-signing-index/).
* [Android code signing files.](/code-signing/android-code-signing/android-code-signing-index/)