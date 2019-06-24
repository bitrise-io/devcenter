---
tag:
- getting-started
- testing
- deploy
- code-signing
title: Getting started with Expo apps
redirect_from: []
summary: In this guide we discuss how to set up, test, code sign and deploy your React
  Native project built with the Expo CLI.
menu:
  getting-started-main:
    weight: 40

---
{% include not_translated_yet.html %}

You can generate React Native projects [with the React Native CLI or with the Expo CLI](https://facebook.github.io/react-native/docs/getting-started.html). [Expo](https://docs.expo.io/versions/latest/) is a toolchain that allows you to quickly get a React Native app up and running without having to use native code in Xcode or Android Studio.

In this guide we discuss how to set up, test, code sign and deploy your React Native project built with the [Expo CLI](https://docs.expo.io/versions/latest/introduction/installation/#local-development-tool-expo-cli).

Whether you've been using ExpoKit or not with your project, Bitrise project scanner detects the necessary configuration and adds the **\[BETA\] Expo Eject** Step to your deploy workflow. If you've been using ExpoKit with your React Native app, Bitrise project scanner adds the necessary platform-specific dependency manager Steps to your workflow as well.

## Adding an Expo app to bitrise.io

First, let's see how to add a React Native Expo app to [bitrise.io](https://www.bitrise.io/).

{% include message_box.html type="info" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io/) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider. "%}

 1. Log into [bitrise.io](https://www.bitrise.io/).
 2. Click **Add a new app**.
 3. Select the privacy setting of your app: **private** and [**public**](https://mpxzvqn7ysfysw.preview.forestry.io/getting-started/adding-a-new-app/public-apps/).
 4. Select the Git hosting service that hosts your repository, then find and select your own repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/connecting-a-repository/).
 5. When prompted to set up repository access, click **No, auto-add SSH key**. Read more about [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/).
 6. Type the name of the branch that includes your project’s configuration - master, for example, - then click **Next**.
 7. At **Validating repository**, Bitrise runs an automatic repository scanner to set up the best configuration for your project.
 8. At **Project build configuration**, the React Native project type gets automatically selected. If the scanner fails and the project type is not selected automatically, you can [configure your project manually](https://devcenter.bitrise.io/getting-started/adding-a-new-app/setting-up-configuration#manual-project-configuration). Bitrise also detects the **Module** and the **Variant** based on your project.

    Now let's have a look at the fields you manually have to fill out:
    * To generate an iOS app from your React Native project, enter your iOS Development team ID at the **Specify iOS Development team** field.
    * In **Select ipa export method**, select the export method of your .ipa file: ad-hoc, app-store, development or enterprise method.
    * In **Specify Expo username** enter your username and hit **Next**.
    * In **Specify Expo password**, enter your password and hit **Next**. You only need to provide your Expo credentials if you've been using [ExpoKit](https://docs.expo.io/versions/v32.0.0/expokit/overview/) with your project.
    * Confirm your project build configuration.
 9. [Upload an app icon](/getting-started/adding-a-new-app/setting-up-configuration/#adding-an-app-icon-with-the-project-scanner).
10. At **Webhook setup**, [register a Webhook](/webhooks/index/) so that Bitrise can automatically start a build every time you push code into your repository.

You have successfully set up your React Native project on [bitrise.io](https://www.bitrise.io/)! Your first build gets kicked off automatically using the primary workflow. You can check the generated reports of the first build on the **APPS & ARTIFACTS** tab on your Build’s page.

## Installing dependencies

### JavaScript dependencies

If Bitrise scanner has successfully scanned your app, depending on your project configuration, **Run npm command** or **Run yarn command** Step will be included in your workflow.

The default value of the **Run npm command** Step is `install` in the **npm command with arguments to run** input field. This way the Step can add JavaScript dependencies to your project.

### Ejecting your app

React Native apps built with Expo do not come with native modules. Since our build Steps are platform-specific, Bitrise has to eject your app, add and configure the necessary native templates. Then our native dependency installer Steps take care of installing any missing native dependencies so that your project is ready for building and shipping.

The Bitrise project scanner automatically inserts the **\[BETA\] Expo Eject** Step right after the **Run npm command** or **Run yarn command** Steps in your deploy workflow.

![](/img/eject-expo-input-fields.png)

Let's see which fields you have to fill out when clicking **\[BETA\] Expo Eject** Step!

* **Working directory input field:** Provide the path of your project directory.
* **Expo CLI version:** Provide the Expo CLI version you used for your project.
* **Username for Expo** and **Password for your Expo account:** Provide your Expo credentials (username and password). If your project uses an Expo SDK, you must provide the username and password for your Expo account. Without the account, the Expo CLI will choose the plain `--eject-method` and the Expo SDK imports will stop working.

  If your project does not use an Expo SDK then you don’t need to do anything.  
  Just add the step after the `git-clone` step and you are done.

### Native dependencies

The **Install missing Android SDK components** Step installs the missing native dependencies for your Android project. This Step is by default included in your deploy workflow.

If you've been using the ExpoKit to develop your app, the **Run CocoaPods install** Step is automatically added to your deploy workflow to take care of any missing iOS dependencies.

## Testing your app

You can use React Native’s built in testing method, called jest, to perform unit tests on your app.

1. Add another Run nmp command step to your workflow right after the first **Run npm command** Step.
2. Type `test` in the **npm command with arguments to run** input field.

   ![](/img/jest-test-react-expo.jpg)
3. [Start a build](/builds/Starting-builds-manually/).

You can view the test artifacts on the **APPS & ARTIFACTS** tab of your Build's page.

## Code signing

A React Native app consists of two projects; an Android and an iOS - both must be properly code signed. If you click on the Code Signing tab of your project’s Workflow Editor, all iOS and Android code signing fields are displayed in one page for you.

Let’s see how to fill them out!

### Signing your Android app

1. Select the deploy workflow at the **WORKFLOW** dropdown menu in the top left corner of your app's Workflow Editor.
2. Go to the **Code Signing** tab.
3. Drag-and-drop your keystore file to the **ANDROID KEYSTORE FILE** field.
4. Fill out the **Keystore password**, **Keystore alias**, and **Private key password** fields and click Save metadata.

   You should have these already at hand as these are included in your keystore file which is generated in Android Studio prior to uploading your app to Bitrise. For more information on keystore file, click [here](https://developer.android.com/studio/publish/app-signing). With this information added to your **Code Signing** tab, our **Sign APK** step (by default included in your Android **deploy** workflow) will take care of signing your APK so that it’s ready for distribution!

{% include message_box.html type="info" title="More information on Android code signing" content=" Head over to our [Android code signing guide](https://devcenter.bitrise.io/code-signing/android-code-signing/android-code-signing-procedures/) to learn more about your code signing options! "%}

![](https://mpxzvqn7ysfysw.preview.forestry.io/img/keystore.png)

The Android chunk of code signing is done. Let's continue with iOS!

### Signing and exporting your iOS app for deployment

To deploy to Testflight and to the App Store, you will need the following code signing files:

* an iOS **Distribution** Certificate
* an **App Store** type Provisioning Profile

1. Open the **Workflow** tab of your project on [bitrise.io](https://www.bitrise.io).
2. Click on **Code Signing** tab.
3. Click or drag and drop the App Store type provisioning profile in the **PROVISIONING PROFILE** field and the iOS Distribution certificate in the **CODE SIGNING IDENTITY** field.
4. Click on the **Workflows** tab and select your deploy Workflow.
5. Set the **Select method for export** input field of the **Xcode Archive & Export for iOS** Step to **app-store**.
6. Select **Xcode Archive & Export for iOS** Step and scroll down to the **Force Build Settings** input group.
7. Fill out the following input fields based on your uploaded code signing files:

   **Force code signing with Development Team**: Add the team ID.

   ![](/img/force-code-signing-development.jpg) **Force code signing with Code Signing Identity:** Add the Code Signing Identity as a full ID or as a code signing group.

   ![](/img/force-code-signing-code-signing.jpg) **Force code signing with Provisioning Profile**: Add the provisioning profile's UDID (and not the file name).

   ![](/img/force-code-signing-provisioning-profile.jpg)
8. If the code signing files are manually generated on the Apple Developer Portal, you have to specify to use manual code signing settings since the ejected React Native project have Xcode managed code signing turned on. Click the **Debug** input group and add `CODE_SIGN_STYLE="Manual"` to the **Additional options for xcodebuild call input** field.

## Deploying to Bitrise

The **Deploy to bitrise.io** Step uploads all the artifacts related to your build into the [**APPS & ARTIFACTS**](/builds/build-artifacts-online/) tab on your Build’s page.

You can share the generated APK/.ipa file with your team members using the build’s URL. You can also notify user groups or individual users that your APK/.ipa file has been built.

1. Go to the Deploy to bitrise.io step.
2. In the Notify: User Roles, add the role so that only those get notified who have been granted with this role. Or fill out the **Notify: Emails** field with email addresses of the users you want to notify. Make sure you set those email addresses as [secret env vars](/builds/env-vars-secret-env-vars/)! These details can be also modified under Notifications if you click the eye icon next to your generated APK/.ipa file in the **APPS & ARTIFACTS** tab.

## Deploying to an app store

If you wish to deploy your iOS app, follow the steps in [Signing and exporting your iOS app for deployment](/getting-started/getting-started-with-react-native-apps/#sign-and-export-your-ios-project-for-deployment).

### Deploying your iOS app to Testflight and iTunes Connect

{% include message_box.html type="important" title="Have you exported an app-store .ipa file yet" content=" Make sure that you have exported an app-store .ipa file before starting the deployment procedure to a native marketplace! "%}

1. Modify the **Xcode Archive & Export for iOS** Step's input fields to the force options and upload the app store profile and distribution certificate **manually**.
2. Add the **Deploy to iTunes Connect - Application Loader** Step to your workflow.

   Put the Step after the **Xcode Archive & Export for iOS** Step but preferably before the **Deploy to Bitrise.io** Step.
3. Provide your Apple credentials in the **Deploy to iTunes Connect - Application Loader** Step.

   The Step will need your:
   * Apple ID
   * password or, if you use two-factor authentication on iTunes Connect, your app-specific password.

   Don’t worry, the password will not be visible in the logs or exposed - [that’s why it is marked SENSITIVE](/builds/env-vars-secret-env-vars#about-secrets).
4. [Start a build](/builds/Starting-builds-manually/).

   If everything went well, you should see your app on Testflight. From there, you can distribute it to external testers or release it to the App Store.

### Deploying your Android app to Google Play Store

{% include message_box.html type="important" title="Have you uploaded keystore file yet" content=" Make sure that you have uploaded the keystore file to the **ANDROID KEYSTORE FILE** field before starting the deployment procedure to a native marketplace! "%}

Before you'd use the **Google Play Deploy** Step, make sure you have performed the following tasks:

1. Upload the first APK manually to Google Play [using the Google Play Console](https://support.google.com/googleplay/android-developer/answer/113469?hl=en).
2. [Link](https://developers.google.com/android-publisher/getting_started) your Google Play Developer Console to an API project.
3. [Set up API Access Clients using a service account](https://developers.google.com/android-publisher/getting_started): Please note when you create your service account on the Google Developer Console, you have to choose `json` as **Key Type**.
4. Grant the necessary rights to the service account with your [Google Play Console](https://play.google.com/apps/publish). Go to **Settings** -> **Users & permissions** -> **Invite new user**. Due to the way the Google Play Publisher API works, you have to grant at least the following permissions to the service account:
   * Access level: View app information.
   * Release management: Manage production releases, manage testing track releases.
   * Store presence: Edit store listing, pricing & distribution.
5. As an optional step, you can add translations for your Store Listing. To allow the step to assign your `whatsnew` files to the uploaded APK version, visit [Play Console Help](https://support.google.com/googleplay/android-developer/answer/3125566?hl=en)'s and add translations for your Store Listing section.

Now let's head back to Bitrise and finish off the deploy configuration!

1. In your Bitrise Dashboard, go to **Code Signing** tab and upload the service account JSON key into the **GENERIC FILE STORAGE**.
2. Copy the env key which stores your uploaded file’s url.

   For example: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
3. Add the **Google Play Deploy** Step after the **Sign APK** Step in your deploy workflow.
4. Fill out the required input fields as follows:

   **Service Account JSON key file path**: This field can accept a remote URL so you have to provide the environment variable which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`

   **Package name**: the package name of your Android app.

   **Track**: the track where you want to deploy your APK (for example, alpha/beta/rollout/production or any custom track you set).

And that’s it! Start a build and release your app to the Google Play Store.