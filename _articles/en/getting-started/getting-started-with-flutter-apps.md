---
title: Getting started with Flutter apps
redirect_from: []
date: '2019-01-25T13:26:58.000+00:00'
tag:
- getting-started
- flutter
- code-signing
- testing
- deploy
summary: 'Go through the procedure of adding a Flutter app on Bitrise from start to
  finish, from adding the app to deploying it. Learn about managing dependencies,
  testing, and code signing. '
menu:
  getting-started-main:
    weight: 31

---
Flutter is a mobile app SDK that allows developers to create native apps for both iOS and Android. Bitrise supports Flutter apps: we have dedicated Steps to help you with all your Flutter needs. This guide walks you through setting up, testing, building and deploying a simple Flutter app on Bitrise.

## Adding a Flutter app

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider. "%}

 1. Click the **+** sign on the top menu bar and select **Add app**.
 2. On the **Create New App** page, choose the account you wish to add the app to.
 3. Set the privacy of the app to either Private or [Public](/getting-started/adding-a-new-app/public-apps) and click **Next**.
 4. Select the Git hosting service that hosts your repository, then find and select your repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/#connecting-a-repository).
 5. When prompted to set up repository access, click **No, auto-add SSH key**. Read more about [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/).
 6. Type the name of the branch that includes your project's configuration - master, for example - then click **Next**.
 7. Wait while Bitrise is validating your project.

    We look for your configuration files and set up your app based on them. In the case of Flutter apps, you definitely need a `pubspec.yaml` file in your project.
 8. If your app has tests in the repository, you will be prompted to decide if you want to run them.

    ![](/img/flutter-project-build-config.jpg)
 9. If you have an iOS project in your Flutter project, you will have to select an .ipa export method.

    ![](/img/flutter-select-export-method.jpg)
10. Register a [webhook](/webhooks/index/) when prompted.

    With a webhook, Bitrise can start a build automatically when code is pushed to your repository, or a pull request is created. This also kicks off your first build - click the message and it will take you to the build page.

## Testing a Flutter app

You can write and run unit-, widget-, and integration tests with Flutter. For more information, check out [Flutter's official documentation](https://flutter.io/docs/testing).

You can use our automatically generated **primary** Workflow to test your Flutter app. By default, it will include the **Flutter Analyze** Step which runs static code tests.

{% include message_box.html type="info" title="Flutter tests" content="If you have tests in your repository, and selected **yes** when prompted, during app creation, whether you want to run these tests, the primary Workflow will include the **Flutter Test** Step by default. If you add tests to your app later, add the **Flutter Test** Step to your Workflow manually."%}

1. Open your app's Workflow Editor and open the **primary** Workflow.
2. In the **Flutter Install** Step, fill in the **Flutter SDK Version** input.

   You can specify either tags or branches of the Flutter SDK's git repository. The default value is `stable`. This will use the latest stable branch of Flutter.
   * To find the available version tags, check: [https://github.com/flutter/flutter/releases](https://github.com/flutter/flutter/releases "https://github.com/flutter/flutter/releases").
   * To see the the available branches, check: [https://github.com/flutter/flutter/branches](https://github.com/flutter/flutter/branches "https://github.com/flutter/flutter/branches").
3. To the **Flutter Analyze** Step, add any flags you wish to use to the **Additional parameters** input.

   The Step runs the `flutter analyze` command with the specified flags. To check the available flags, open a command line interface on your own machine and run `flutter analyze --help`.
4. To the **Flutter Test** Step - if you have it -, add any flags you wish to use to the **Additional parameters** input.

   The Step runs the `flutter test` command with the specified flags. To check the available flags, open a command line interface on your own machine and run `flutter test --help`.

   ![](/img/flutter_test.png)
5. Make sure the **Project Location** input of the **Flutter Test** Step is correct.

   The default value is the the Environment Variable (Env Var) created for your Flutter project's location.

Run a build! Once it's done, you can find your test results on the [**APPS & ARTIFACTS**](https://devcenter.bitrise.io/builds/build-artifacts-online/) tab of the Build's page of the app.

## Deploying a Flutter app

To build and deploy a Flutter app, a Workflow must contain these Flutter Steps:

* **Flutter Install**
* **Flutter Build**

If you have platforms specified in your repository, a **deploy** Workflow will be automatically generated when adding the app on Bitrise. The content of this Workflow depends on the platforms: for example, if your app contains only an iOS project, the Workflow will contain the **Certificate and profile installer** and the **Xcode Archive & Export for iOS** Steps.

You can build both iOS and Android projects at the same time or you can build them separately, each using their own Workflow. You can set this in the **Platform** input of the **Flutter Build** Step any time. By default, the Step is configured according to the platform or platforms that the scanner detected when adding the app on Bitrise.

Here's an example Workflow we'll use in this configuration, with all the necessary Steps:

![](/img/flutter-getting-started.jpg)

We'll discuss the Steps specific to iOS and Android deployment in their respective sections!

{% include message_box.html type="note" title="Packages and libraries" content="We also support building Flutter packages and libraries. Unlike in the case of apps, there is no artifact to build so there is no need for a **Flutter Build** Step in your Workflow."%}

### Deploying a Flutter app to Bitrise

The **Deploy to bitrise.io** Step uploads all the artifacts related to your build into the [**APPS & ARTIFACTS**](/builds/build-artifacts-online/) tab on your Build’s page.

You can share the generated APK/.ipa file with your team members using the build’s URL. You can also notify user groups or individual users that your APK/.ipa file has been built.

1. Go to the **Deploy to bitrise.io** Step.
2. In the **Notify: User Roles**, add the role so that only those get notified who have been granted with this role. Or fill out the **Notify: Emails** field with email addresses of the users you want to notify. Make sure you set those email addresses as [secret Env Vars](/builds/env-vars-secret-env-vars/)! These details can be also modified under **Notifications** if you click the **eye** icon next to your generated APK/.ipa file in the **APPS & ARTIFACTS** tab.

### Deploying a Flutter app to App Store Connect

To deploy your iOS Flutter project to the App Store, you'll need to build the app, export an .ipa file and submit it to the App Store.

Unlike testing, this requires code signing files:

* An iOS Distribution Certificate (a .p12 file).
* An App Store Provisioning Profile.

For Flutter applications, code signing requires setting a Team ID in the project settings in Xcode.

Read more about iOS code signing on Bitrise in [our detailed guides](https://devcenter.bitrise.io/code-signing/ios-code-signing/code-signing/)!

#### Configuring Team ID for Flutter apps

Once you created your iOS project locally, you will need to review the project settings for it in Xcode. More specifically, you need to set a valid Team ID: without that, your build will fail on Bitrise.

1. In Xcode, open **Runner.xcworkspace** in your app’s **ios** folder.
2. To view your app’s settings, select the **Runner** project in the Xcode project navigator. Then, in the main view sidebar, select the **Runner** target.
3. Select the **General** tab.
4. In the **Signing** section, find the **Team** menu and set it to the team associated with your registered Apple Developer account.
5. Commit the change to your repository!

   This is very important: if you only set the Team ID locally, your build will still fail on Bitrise!

#### Configuring deployment on Bitrise

 1. Make sure you have the **Certificate and profile installer** Step in your Workflow.
 2. [Upload the required code signing files](/code-signing/ios-code-signing/ios-manual-provisioning/) to Bitrise.
 3. Open the **Flutter Build** Step and find the **iOS Platform Configs** input group.
 4. Make sure the **Additional parameters** input has the value `--release`.
 5. Check the **Platform** input of the Step: make sure it's set to either `iOS` or `both`.
 6. Make sure you have the **Xcode Archive & Export for iOS** Step in your Workflow.

    It should be after the **Flutter Build** Step.
 7. Set the **Select method for export** input of the Step to **app-store**.
 8. Add the **Deploy to iTunes Connect** Step to the end of the Workflow.
 9. Provide your Apple credentials in the respective input fields.
    * Apple ID
    * password or, if you use two-factor authentication on iTunes Connect, your application password.

    Don’t worry, the password will not be visible in the logs or exposed - [that’s why it is marked SENSITIVE](/builds/env-vars-secret-env-vars#about-secrets).
10. [Start a build]()!

If all goes well, the Step will submit the app to App Store Connect. You can, from the App Store Connect page, distribute the app to external testers via Testflight, or release it to the App Store itself.

### Deploying a Flutter app to Google Play

To deploy your app to Google Play, you need to export an APK file and sign it.

You can [configure the signing](https://flutter.io/docs/deployment/android#configure-signing-in-gradle) in the app's `build.gradle` file and then Flutter will sign your app during the build phase.

In this guide, we'll walk you through the other option: how to sign your APK file on Bitrise and then deploy the app to Google Play. First, you will need to [create a keystore file](https://flutter.io/docs/deployment/android#create-a-keystore) and then upload it to Bitrise.

1. Open your app's Workflow Editor.
2. Go to the **Code Signing** tab.
3. Drag-and-drop your keystore file to the **ANDROID KEYSTORE FILE** field.
4. Fill out the **Keystore password**, **Keystore alias**, and **Private key password** fields and click **Save metadata**.

Once that is done, you are ready to configure a Workflow to deploy the app.

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

1. In your Bitrise Dashboard, go to **Code Signing** tab and upload the service account JSON key into the `GENERIC FILE STORAGE.`
2. Copy the env key which stores your uploaded file’s url.

   For example: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
3. Make sure you have the **Android Sign** Step in your Workflow.

   It should be after the **Flutter Build** Step.
4. Open the **Flutter Build** Step and find the **Android Platform Configs** input group.
5. Make sure the **Additional parameters** input has the value `--release`.
6. Check the **Platform** input of the Step: make sure it's set to either `android` or `both`.
7. Make sure you have the **Google Play Deploy** Step after the **Android Sign** Step to your Workflow.
8. Fill out the required input fields as follows:
   * **Service Account JSON key file path**: This field can accept a remote URL so you have to provide the Env Var which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * **Package name**: the package name of your Android app
   * **Track**: the track where you want to deploy your APK (for example, alpha/beta/rollout/production or any custom track you set)

And that’s it! Start a build and release your Android app to the app store of your choice.