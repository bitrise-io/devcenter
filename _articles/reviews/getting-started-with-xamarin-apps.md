---
title: Getting started with Xamarin apps
date: 2018-10-04 10:09:54 +0000
redirect_from: []
published: false

---
[Xamarin](/tutorials/xamarin/index/) provides a developer with tools that can help them building cross-platform mobile applications. Bitrise supports Xamarin apps, of course: this guide aims to walk you through the procedure of:

* adding a Xamarin app to Bitrise
* testing the app
* deploying the app

## Before you start

Before adding a Xamarin app on Bitrise, you need to prepare your Xamarin solution file. Bitrise detects the solution file and all the available solution configurations present in it. 

A Xamarin solution file can contain multiple projects. Your solution configuration determines which projects (_solution items_) should be built and what project configuration type (for example, _debug_ or _release_) the build should use. 

 [Set up your solution configurations in Visual Studio](https://docs.microsoft.com/en-us/appcenter/build/xamarin/ios/solution-configuration-mappings). The solution file will have to contain all the solution configurations that you wish to build on Bitrise. Also, make sure that a solution configuration you wish to build on a given solution platform is compatible with that platform. 

{% include message_box.html type="example" title="Solution configuration" content="For example, if your solution file contains an Android and an iOS project but you want Bitrise to build only the Android project, set up a solution configuration in Visual Studio that only builds the Android project and use that configuration on Bitrise. Use the appropriate solution platform for that configuration: for example, if you only build an Android project, do not set iPhone as your solution platform."%}

## Adding a Xamarin app

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider. "%}

 1. Click the `+` sign on the top menu bar and select `Add app`.
 2. On the Create new App page, choose the account you wish to add the app to.
 3. Set the privacy of the app to either Private or [Public](/getting-started/adding-a-new-app/public-apps) and click `Next`.
 4. Select the Git hosting service that hosts your repository, then find and select your repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/connecting-your-repository).
 5. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/).
 6. Type the name of the branch that includes your project's configuration - master, for example - then click `Next`.
 7. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them. In the case of a Xamarin app, we're looking for the Xamarin Solution file.
 8. Select the Xamarin solution configuration. The available options are based on the solution file. This will be stored as an Environment Variable and it can be changed later.

    ![](/img/xamarin-setup-config.png)
 9. Select the Xamarin solution platform. This will be stored as an Environment Variable and it can be changed later.
10. Confirm your build configuration.
11. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository, or a pull request is created. This also kicks off your first build - click the message and it will take you to the build page.

## Installing dependencies

Installing your dependencies with Xamarin apps is taken care of by a dedicated Step: `NuGet restore`. This Step is part of every automatically created workflow for Xamarin apps and it has one required input: the path to the Xamarin solution file which is stored as an Environment Variable when you add the app. 

## Testing Xamarin apps 

You can run **unit tests** and **UI tests** on Bitrise, both with Android and iOS projects.  