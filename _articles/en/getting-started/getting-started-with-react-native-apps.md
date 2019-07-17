---
title: Getting started with React Native apps
date: '2018-10-12T13:16:58.000+00:00'
redirect_from: []
tag:
- getting-started
- react
- testing
- deploy
- code-signing
summary: 'Go through the procedure of adding a React Native app on Bitrise from start
  to finish, from adding the app to deploying it. Learn about dependency management,
  code signing, and testing. '
menu:
  getting-started-main:
    weight: 25

---
You can easily set up and configure your React Native project on [Bitrise](https://app.bitrise.io/users/sign_in). A React Native repo can consist of an Android and an iOS project so configurations should be done as you would normally do with Android and iOS apps. When running a React Native project on Bitrise, you will see that first an Android, then an iOS build gets built. If your [organization](/team-management/organizations/organizations-index/) has more than one concurrency, you can have Android and iOS builds run simultaneously.

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Before you dive in, make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider. "%}

## Adding a React Native project to Bitrise

1. Add your React Native project to Bitrise as a [new app](https://app.bitrise.io/apps/add).

   This flow will guide you through the process of connecting your repository, setting up your repository access, selecting a branch and validating your project. Below we highlight some React Native-specific configuration.
2. Once you get to **Project build configuration**, you should see React Native as the selected **project type**. (If the project scanner fails and the **project type** is not selected automatically, you can [configure your project manually](https://devcenter.bitrise.io/getting-started/adding-a-new-app/setting-up-configuration#manual-project-configuration). You can see that **Android** is automatically selected in **The root directory of an Android app** field.

   If your project consists of only one module, that module will be automatically selected for **Module**. If your project contains more than one module, you can pick a module, but we recommend the main one!
3. In the **Variant** field, select a variant that suits your project. Pick **Select All Variants** to build all variants. Pick **debug** or **release** if you wish to generate an APK or an .ipa file.
4. In the **Project (or Workspace)** field, select your Xcode project or Xcode Workspace path.
5. In the **Select Scheme name**, pick a scheme name. The scanner validation will fail if you do not have a SHARED scheme in your project. You can still point Bitrise manually to your Xcode scheme but if it’s shared, we automatically detect it for you. [Read more about schemes and the possible issues with them!](https://devcenter.bitrise.io/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found)
6. In **Select ipa export method**, select the export method of your .ipa file: ad-hoc, app-store, development or enterprise method. You can read more on the different export methods in our [iOS app deployment guides](/deploy/ios-deploy/introduction-to-deploying-ios-apps/).

You have successfully set up your React Native project on [bitrise.io](https://www.bitrise.io)! Your first build gets kicked off automatically. You can check the generated artifacts of the first build on the [**APPS & ARTIFACTS**](/builds/build-artifacts-online/) tab of your Build's page.

## Installing dependencies

### Javascript dependencies

If the Bitrise project scanner has successfully scanned your project, **Run npm command** or **Run yarn command** Steps will be included in your workflow.

1. In the **Run npm command** Step, type install in the **npm command with arguments to run** input field so that it can add javascript dependencies to your project.

![](/img/run-nmp.png)

The **Run yarn command** Step can install javascript dependencies automatically to your project without having to configure it manually.

### Native dependencies

**Install missing Android SDK components** Step installs the missing native dependencies  for your Android project - luckily this Step is by default included in your workflow for deployment.

For iOS dependencies, you can add the **Run CocoaPods install** Step to your workflow as it is not part of the workflow by default.

## Code signing

A React Native app can consists of two projects, an Android and an iOS - both have different signing procedures. If you click the Code Signing tab of your project's Workflow Editor, all iOS and Android code signing fields are displayed in one page for you. Follow our platform-specific instructions to code sign your app for both iOS and Android.

### Signing your Android project

1. Select your deployment workflow at the **WORKFLOW** dropdown menu in the top left corner of your apps' Workflow Editor.
2. Go to the **Code Signing** tab.
3. Drag-and-drop your keystore file to the **ANDROID KEYSTORE FILE** field.
4. Fill out the **Keystore password**, **Keystore alias**, and **Private key password** fields and click **Save metadata**.

   With this information added to your **Code Signing** tab, our **Android Sign** Step (by default included in your Android deploy workflow) will take care of signing your APK so that it’s ready for distribution!

![](/img/keystore.png)

{% include message_box.html type="info" title="More on Android code signing" content=" You should have the keystore password, keystore alias and the private key password available as these are included in your keystore file which is generated in Android Studio prior to uploading your app to Bitrise. You can learn more about the keystore file if you head over to [Android Studio's guide on Keys, certificates, and keystores](https://developer.android.com/studio/publish/app-signing#certificates-keystores).

You can also check out what other code signing options you have at Bitrise in our [Android code signing guide](https://devcenter.bitrise.io/code-signing/android-code-signing/android-code-signing-procedures/)."%}

### Signing and exporting your iOS project for testing

Code signing your iOS project depends on what you wish to do with the exported .ipa file. In this section, we describe how to code sign your project if you wish to **install and test it on internal testers' registered devices**. You will need an .ipa file exported with the **development** export method to share your project with testers.

If you wish to upload your .ipa file to an app store, check out [Signing and exporting your iOS project for deployment](/getting-started/getting-started-with-react-native-apps/#signing-and-exporting-your-ios-project-for-deployment)!

{% include message_box.html type="note" title="Automatic provisioning" content=" The example procedure described here uses manual provisioning, with the **Certificate and profile installer** Step. However, Bitrise also supports [automatic provisioning](https://devcenter.bitrise.io/code-signing/ios-code-signing/ios-auto-provisioning/) but it is not in the scope of this guide. "%}

You will need:

* an automatically created workflow for deployment
* an iOS **Development** certificate (a .p12 certificate file)
* a **Development** type Provisioning Profile"%}

1. Set the code signing type of your project in Xcode to either manual or automatic (Xcode managed), and generate an .ipa file locally.
2. Collect AND upload the code signing files with [the codesigndoc tool](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).

   Otherwise, upload them manually: enter the Workflow Editor and select the **Code signing** tab, then upload the files in their respective fields.
3. Go to your app’s Workflow Editor, and select the **deploy** workflow in the **WORKFLOW** dropdown menu in the top left corner.
4. Check that you have the **Certificate and profile installer** Step in your workflow. It must be before the **Xcode Archive & Export for iOS** Step (you can have other Steps between the two, like **Xcode Test for iOS**).
5. Check the **Select method for export** input of the **Xcode Archive & Export for iOS** Step. By default, it should be the `$BITRISE_EXPORT_METHOD` Environment Variable (Env Var). This variable stores the export method you selected when creating the app. If you selected **development** back then, you don’t need to change the input. Otherwise, manually set it to **development**.

   ![](/img/export-method.png)
6. [Start a build](https://devcenter.bitrise.io/builds/starting-builds-manually/).

If you uploaded the correct code signing files, the **Certificate and profile installer** Step should install your code signing files and the **Xcode Archive & Export for iOS** Step should export an .ipa file with the **development export method**. If you have the **Deploy to Bitrise.io** Step in your workflow, you can find the .ipa file on the **APPS & ARTIFACTS** tab of the Build's page.

{% include message_box.html type="info" title="About iOS code signing" content=" iOS code signing is often not this simple - read more about how [iOS code signing works on Bitrise](https://devcenter.bitrise.io/code-signing/ios-code-signing/code-signing)!"%}

### Signing and exporting your iOS project for deployment

If you set up your code signing files and created an .ipa file for your internal testers, it is time to involve external testers and then to [publish your iOS app to the App Store](/getting-started/getting-started-with-react-native-apps/#deploying-your-ios-app-to-testflight-and-itunes-connect).

To deploy to Testflight and to the App Store, you will need more code signing files:

* an iOS **Distribution** Certificate
* an **App Store** type Provisioning Profile

1. On your local machine, set up App Store code signing for your project in Xcode, and export an App Store .ipa file. If this fails locally, it will definitely fail on Bitrise, too!
2. Collect and upload the code signing files with [the codesigndoc tool](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).
3. Go to the app’s Workflow Editor and create a [new workflow](https://devcenter.bitrise.io/getting-started/getting-started-workflows/): click the **+ Workflow** button, enter the name of your new workflow and in the **BASED ON** dropdown menu, select **deploy**. This way the new workflow will be a copy of the basic **deploy** workflow.
4. Set the **Select method for export** input of the **Xcode Archive & Export for iOS** Step to **app-store**.

   ![](/img/app-store-export-method-1.png)

## Testing your project

You can use React Native's built in testing method, called **jest** to perform unit tests.  Add another **Run nmp command** Step to your workflow, and type **test** in the **npm command with arguments to run** input field.

![](/img/test-npm.png)

## Deploying to Bitrise

The **Deploy to bitrise.io** Step uploads all the artifacts related to your build into the[ APPS & ARTIFACTS ](https://devcenter.bitrise.io/builds/build-artifacts-online/) tab on your Build’s page. All you have to do is add the Step to your workflow and [configure](/tutorials/deploy/bitrise-app-deployment/) it based on with who and how you want to share the artifacts. You can share the generated APK/.ipa file with your team members using the build’s URL. You can also notify user groups or individual users that your APK/.ipa file has been built.

## Deploying to an app store

### Deploying to your iOS app iTunes Connect

If you wish to deploy your iOS app, follow the instructions in [Code sign your iOS project for deployment](https://devcenter.bitrise.io/getting-started/getting-started-with-react-native-apps/#sign-and-export-your-ios-project-for-deployment).

{% include message_box.html type="important" title="Have you exported an **app-store** .ipa file yet?" content="Make sure that you have exported an **app-store** .ipa file before starting the deployment procedure to a native marketplace!"%}

1. Add the **Deploy to iTunes Connect - Application Loader** Step to your workflow, after the **Xcode Archive & Export for iOS** Step but preferably before the **Deploy to Bitrise.io** Step.
2. Provide your Apple credentials in the **Deploy to iTunes Connect - Application Loader** Step.

   The Step will need your:
   * Apple ID
   * password or, if you use two-factor authentication on iTunes Connect, your application password.

   Don’t worry, the password will not be visible in the logs or exposed - [that’s why it is marked SENSITIVE](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars#about-secrets).
3. [Start a build](https://devcenter.bitrise.io/builds/Starting-builds-manually/).

If all goes well, your app will be submitted to iTunes Connect and you can distribute it via Testflight or via the App Store!

### Deploying your Android app to Google Play Store

If you add the **Google Play Deploy** Step to your workflow (after the **Android Sign** Step), your signed APK will get uploaded to Google Play Store.

Before you'd use the **Google Play Deploy** Step, make sure you have performed the following tasks:

1. Upload the first APK manually to Google Play [using the Google Play Console](https://support.google.com/googleplay/android-developer/answer/113469?hl=en).
2. [Link](https://developers.google.com/android-publisher/getting_started) your Google Play Developer Console to an API project.
3. [Set up API Access Clients using a service account](https://developers.google.com/android-publisher/getting_started): Please note when you create your service account on the Google Developer Console, you have to choose `json` as **Key Type**.
4. Grant the necessary rights to the service account with your [Google Play Console](https://play.google.com/apps/publish). Go to **Settings**, then **Users & permissions**, then **Invite new user**. Due to the way the Google Play Publisher API works, you have to grant at least the following permissions to the service account:
   * Access level: View app information.
   * Release management: Manage production releases, manage testing track releases.
   * Store presence: Edit store listing, pricing & distribution.
5. As an optional step, you can add translations to your Store Listing. To allow the **Google Play Deploy** Step to assign your `whatsnew` files to the uploaded APK version, visit the [Translate & localize your app](https://support.google.com/googleplay/android-developer/answer/3125566?hl=en) guide and add translations to your Store Listing section.

Now let's head back to Bitrise and finish off the deploy configuration!

1. In your Bitrise **Dashboard**, go to **Code Signing** tab and upload the service account JSON key into the **GENERIC FILE STORAGE**.

   Make sure that you have uploaded the keystore file to the **ANDROID KEYSTORE FILE** field!
2. Copy the env key which stores your uploaded file’s url.

   For example: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
3. Add the **Google Play Deploy** step after the **Android Sign** step in your deploy workflow.
4. Fill out the required input fields as follows:
   * **Service Account JSON key file path**: This field can accept a remote URL so you have to provide the Env Var which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * **Package name**: the package name of your Android app
   * **Track**: the track where you want to deploy your APK (for example, alpha/beta/rollout/production or any custom track you set)

And that’s it! [Start a build](/builds/Starting-builds-manually/) and release your Android app to the app store of your choice.

<div class="banner">
<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
<div class="deploy-text">Let's add a React Native app</div>
<a target="_blank" href="https://app.bitrise.io/apps/add"><button class="button">Go to Bitrise now</button></a>
</div>

