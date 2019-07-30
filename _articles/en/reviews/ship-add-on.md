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

To expose a Workflow's artifacts to Ship:

1. Go to your app's Ship page. 
2. Click **Settings** in the top right corner. 
3. In the **Expose Artifacts From the Selected Workflow to Ship** text box, add all the Workflows you need. 

   Be aware there are TWO such text boxes: one for iOS and one for Android. If your app is cross-platform, fill out both. Separate the different Workflow names with a comma. 
4. Scroll down to the bottom of the page and click **Save**. 

### Publishing settings 

On the **Settings** page, you can configure a number of options for publishing your app. If it's a cross-platform app, you can define settings separately for the iOS and the Android versions. 

For iOS:

* Choose the provisioning profiles and code signing identities to be used.
* Set the app specific password. 
* Set the Apple Developer Account email. 

To access the **Settings** page:

1. Go to your app's Ship page. 
2. Click **Settings** in the top right corner. 

### Code signing files

On the **Settings** page, you can choose between different code signing files. You can upload these files - iOS provisioning profiles and certificates, Android keystore files and Service Account JSON files - in the usual way:

* [iOS code signing files](/code-signing/ios-code-signing/code-signing-index/).
* [Android code signing files.](/code-signing/android-code-signing/android-code-signing-index/)