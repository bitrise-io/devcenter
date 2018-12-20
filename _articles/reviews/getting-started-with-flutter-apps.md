---
title: Getting started with Flutter apps
redirect_from: []
date: 2018-12-20 16:43:42 +0000
published: false

---
## Adding a Flutter app

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider. "%}

1. Click the `+` sign on the top menu bar and select `Add app`.
2. On the Create new App page, choose the account you wish to add the app to.
3. Set the privacy of the app to either Private or [Public](/getting-started/adding-a-new-app/public-apps) and click `Next`.
4. Select the Git hosting service that hosts your repository, then find and select your repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/connecting-your-repository).
5. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/).
6. Type the name of the branch that includes your project's configuration - master, for example - then click `Next`.
7. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them. In the case of an iOS app, we're looking for your Xcode Project (`.xcodeproj`) or Xcode Workspace (`.xcworkspace`) path.

   **IMPORTANT**: the validation will fail if you do not have a SHARED scheme in your project. You can still point Bitrise manually to your Xcode scheme but if it's shared, we automatically detect it for you. [Read more about schemes and the possible issues with them!](/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found)
8. Select the .ipa export method. You can modify this later - for now, select `development`.

   ![iOS project scanned](/img/ios-project-scanned.png)

   Once you clicked it, you should see your:
   * Project or Workspace path
   * Scheme name
   * ipa export method
   * iOS stack
9. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository, or a pull request is created. This also kicks off your first build - click the message and it will take you to the build page.