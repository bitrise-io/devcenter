---
title: Bitrise OTA App deployment- draft
date: 2018-11-09 14:46:59 +0000
redirect_from: []
published: false

---
Bitrise has an integrated app deployment system you can use for app and other build artifact file distribution.

With this you can distribute your apps over the air for your app's team members (**or** **even for those who don’t have a Bitrise account**). You can also use it to archive your app and other build artifact files which will be available on the app's Build page.

Here is a short recap on the different build steps per platform. The links point to our step by step getting started tutorials if you needed more information for each platform.

| Platform | Build step | Deploy step |
| --- | --- | --- |
| iOS | Xcode Archive & Export for iOS | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| Android | Gradle Runner or Android Build | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| Xamarin | Xamarin Archive | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| React Native | Android Build and/or Xcode Archive & Export for iOS | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| Ionic | Ionic Archive | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| Cordova | Cordova Archive | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| MacOS | Archive for MacOS and/or Export for MacOS | Deploy to Bitrise.io - Apps, Logs, Artifacts |

First let's have a look at the required and sensitive fields of the Step:

![](/img/deploy-to-bitrise.png)

## Deploy directory or file path

If you use custom steps or our `Do anything with Script step` to deploy apps from the `$BITRISE_DEPLOY_DIR` directory, make sure you move the generated app into this directory or set the `Deploy directory or file path` input of the `Deploy to Bitrise.io step` to point to the location of the app file. If the app file (.ipa/APK) is available, the `Deploy to Bitrise.io` Step will upload the file for the Build and **the file will be listed on the Build’s page**.

## Notify: User Roles

You can define who should get notification of the generated build based on your app's user groups. There are a couple of options for you to choose from:

* leave `everyone` in the input field to notify everyone in the group.
* notify based on user role: `testers`, `developers`, `admins`, or `owner` (select one or more and separate with commas)
* if you don't want to notify anyone, set it to `none`.

The default input here is `everyone`.

## Notify: Emails

Set one or more email addresses of those who should get **notification**. This field is  [sensitive](/builds/env-vars-secret-env-vars/) so make sure you register those email addresses in `Secrets`.

## Enable Public Page for the App

With this option enabled, you can create a Public install page that comes with a long and random URL. You can share this URL with anyone - yes, even with those who are not registered on Bitrise!

You can enable it directly in the Step's input field or at the generated .ipa/APK in your Build's `APPS & ARTIFACTS` tab.

## Access the Public install page

You can access the Public install page's URL, if you head over to your generated build's `APPS & ARTIFACTS` tab and find the .ipa/APK file. Click the `eye` icon to view the details online !

![](/img/public-install-page-1.png)

If you click `Open Public install page` link, you’ll see a base description of the App (title, version, size, supported devices).

![](/img/public-install-page-example.png)

If you visit your iOS Build's page from an iOS device (which you've registered for your account), you’ll see an `Install` button instead of the `Download` button. With this you **can install** the App on your device directly from Bitrise.

{% include message_box.html type="warning" title="Shared but can't install it?" content=" You can share this page with anyone, even if they don’t have a Bitrise account. You have to make sure that they’ll be able to install the app, though. If you don’t use an Enterprise Provisioning Profile to build your app, you have to add every device identifier (UDID) to the Provisioning Profile (just like you do on your Mac). The iOS app can’t be installed on any other device but on the ones which were included in the Provisioning Profile the build was signed with. "%}

Now let's head back to your Build's page! Besides the `Public install page` link on the `APPS & ARTIFACTS` tab, you’ll see a bunch of other information about the deployed app. For example, you can check the details of the App (such as App title, Bundle ID, Version, Size, etc) or download the file to your local computer as well.

![](/img/info-card-android.jpg)

### Send invites and notifications

You can send install invites and notifications based on roles or email address. You can either send invites for a group of your team members (testers, developers, admins or owner) or (if the `Public install page` option is enabled) you can send install invites to any email address.

{% include message_box.html type="note" title="Can't access the Public install page?" content="

* Keep in mind that if you disable the `Public install page` toggle, Bitrise won’t send install invite emails for the emails you specified. Only those can get the link who are in the app's team.
* Keep in mind that the install invite emails contain the `Public install page` URL. If you invite someone **who’s not in your App’s team** and then disable the `Public install page` toggle, they won’t be able to access the install page! Those who are in your App’s team will be redirected to the Build’s page if the `Public install page` toggle is disabled. "%}

You can specify the list of groups and emails for automatic install invite notification in the App’s Workflow using the `Notify: User Groups` and `Notify: Emails` step input fields.

### Test Devices

If you built your **iOS App** with a **development or an ad hoc provisioning profile**, an additional section will be presented with a list of allowed device identifiers (UDID) on your Build's page. If you or a team member of your app’s team [register a device](/testing/registering-a-test-device/) for his/her Bitrise account and the device’s identifier can be found in the Provisioning Profile, you will see the following in the list:

* the Test device identifier with its name
* the person's name who registered the Test device

For **Android** apps, you don’t have to register your test devices, as Android apps don’t have per-device install restrictions. However you’ll have to enable the `Unknown Sources` option in Android to be able to install the APK from outside of the Google Play Store.

### Disable Public Page for the App

You can disable this toggle any time:

* in your Build's `APPS & ARTIFACTS`, move the toggle to the left or
* in the Step, set the step input field to `false` value

{% include message_box.html type="warning" title="Who can receive the app after disabling?" content="
If you disable this function for the app, then only your app's team members will be able to install the app from Bitrise! Additionally, the `Notify: Emails` option will be ignored and the `Notify: User Roles` users will receive the build's URL instead of the public page's URL!
"%}