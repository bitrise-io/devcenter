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
7. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them. In the case of Flutter apps, you definitely need a `pubspec.yaml` file in your project. 
8. If you have both an iOS and an Android project in your Flutter repo, you will be prompted to select:
   * an export method for the iOS project
   * the variants you want to use for the Android project
9. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository, or a pull request is created. This also kicks off your first build - click the message and it will take you to the build page.

## Testing a Flutter app

You can write and run unit, widget and integration tests with Flutter. For more information, check out [Flutter's official documentation](https://flutter.io/docs/testing). 

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