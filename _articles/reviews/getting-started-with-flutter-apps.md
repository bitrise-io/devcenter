---
title: Getting started with Flutter apps
redirect_from: []
date: 2018-12-20 16:43:42 +0000
published: false

---
Flutter is a mobile app SDK that allows developers to create native apps for both iOS and Android. Bitrise supports Flutter apps: we have dedicated Steps to help you with all your Flutter needs. This guide walks you through setting up, testing, building and deploying a simple Flutter app on Bitrise. 

## Adding a Flutter app

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider. "%}

 1. Click the `+` sign on the top menu bar and select `Add app`.
 2. On the Create new App page, choose the account you wish to add the app to.
 3. Set the privacy of the app to either Private or [Public](/getting-started/adding-a-new-app/public-apps) and click `Next`.
 4. Select the Git hosting service that hosts your repository, then find and select your repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/connecting-your-repository).
 5. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/).
 6. Type the name of the branch that includes your project's configuration - master, for example - then click `Next`.
 7. Wait while Bitrise is validating your project. 

    We look for your configuration files and set up your app based on them. In the case of Flutter apps, you definitely need a `pubspec.yaml` file in your project. 
 8. Choose a stack. 

    If you are not sure [which one of our stacks](/infrastructure/available-stacks/) you wish to use, just leave it on the default value!
 9. If you have both an iOS and an Android project in your Flutter repo, you will be prompted to select:
    * an export method for the iOS project
    * the variant you want to use for the Android project
10. Register a webhook when prompted. 

    With a webhook, Bitrise can start a build automatically when code is pushed to your repository, or a pull request is created. This also kicks off your first build - click the message and it will take you to the build page.

## Testing a Flutter app

You can write and run **unit-**, **widget-,** and **integration** tests with Flutter. For more information, check out [Flutter's official documentation](https://flutter.io/docs/testing). 

You can use our automatically generated `primary` workflow to test your Flutter app. This contains the necessary Steps to install the Flutter SDK and to test your Flutter app on Bitrise.

1. Open your app's Workflow Editor and open the `primary` workflow. 
2. In the `Flutter Install` Step, fill in the `Flutter SDK Version` input. 

   You can specify either tags or branches of the Flutter SDK's git repository. The default value is `stable`. This will use the latest stable branch of Flutter. 
   * To find the available version tags, check: [https://github.com/flutter/flutter/releases](https://github.com/flutter/flutter/releases "https://github.com/flutter/flutter/releases")
   * To see the the avilable branches, check: [https://github.com/flutter/flutter/branches](https://github.com/flutter/flutter/branches "https://github.com/flutter/flutter/branches")
3. To the `Flutter Test` Step, add any flags you wish to use to the `Additional parameters` input.

   The Step runs the `flutter test` command with these flags. To check the available flags, open a command line interface on your own machine and run `flutter test --help`. 
4. Make sure the `Project Location` input of the `Flutter Test` Step is correct. 

   The default value is the the environment variable created for your Flutter project's location. 

Run a build! Once it's done, you can find your test results on the `Apps and Artifacts` tab of the **Build** page of the app.

## Deploying a Flutter app

To build and deploy a Flutter app, we recommend creating a new workflow based on the automatically created `deploy` workflow. As a minimum, the workflow must contain these Flutter Steps: 

* `Flutter Install`
* `Flutter Build` 

You can build both iOS and Android projects at the same time or you can build them separately, each using their own workflow. You can set this in the `Platform` input of the `Flutter Build` Step. 

We'll discuss the Steps specific to iOS and Android deployment in their respective sections! 

### Deploying to Bitrise

The `Deploy to bitrise.io` step uploads all the artifacts related to your build into the[ APPS & ARTIFACTS ](/builds/build-artifacts-online/)tab on your Build’s page.

You can share the generated APK/.ipa file with your team members using the build’s URL. You can also notify user groups or individual users that your APK/.ipa file has been built.

1. Go to the `Deploy to bitrise.io` step.
2. In the `Notify: User Roles`, add the role so that only those get notified who have been granted with this role. Or fill out the `Notify: Emails` field with email addresses of the users you want to notify. Make sure you set those email addresses as [secret env vars](/builds/env-vars-secret-env-vars/)! These details can be also modified under `Notifications` if you click the `eye` icon next to your generated APK/.ipa file in the `APPS & ARTIFACTS` tab.

### Deploying a Flutter app to the App Store 

To deploy your iOS Flutter project to the App Store, you'll need to build the app, export an. ipa file and submit it to the App Store.

Unlike testing, this requires code signing files: 

* an iOS Distribution Certificate (a .p12 file)
* an App Store Provisioning Profile 

Read more about iOS code signing on Bitrise in [our detailed guides](https://devcenter.bitrise.io/code-signing/ios-code-signing/code-signing/)! 

1. Make sure you have the `Certificate and profile installer` Step in your workflow. 
2. [Upload the required code signing files](/code-signing/ios-code-signing/ios-manual-provisioning/) to Bitrise. 
3. Open the `Flutter Build` Step and find the `iOS Platform Configs` input group. 
4. Make sure the `Additional parameters` input has the value `--release`.
5. Set the `Select method for export` input to `app-store`. 
6. Add the `Deploy to iTunes Connect` Step to the end of the workflow.
7. Provide your Apple credentials in the respective input fields.
   * Apple ID
   * password or, if you use two-factor authentication on iTunes Connect, your application password.

   Don’t worry, the password will not be visible in the logs or exposed - [that’s why it is marked SENSITIVE](/builds/env-vars-secret-env-vars#about-secrets).