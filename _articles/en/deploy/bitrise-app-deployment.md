---
title: Bitrise OTA app Deployment
redirect_from: "/tutorials/deploy/bitrise-app-deployment/"
menu:
  deploy-main:
    weight: 6

---
Bitrise has an integrated app deployment system you can use for app and other build artifact file distribution.

With this you can distribute your apps over the air for your app's team members or even for those who don’t have a Bitrise account. You can also use it to archive your app and other build artifact files which will be available on the app's Build page for viewing and downloading.

Here is a short recap on the different build Steps per platform.

| Platform | Build step | Deploy step to Bitrise |
| --- | --- | --- |
| iOS | Xcode Archive & Export for iOS | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| Android | Gradle Runner or Android Build | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| Xamarin | Xamarin Archive | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| React Native | Android Build and/or Xcode Archive & Export for iOS | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| Ionic | Ionic Archive | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| Cordova | Cordova Archive | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| MacOS | Archive for MacOS and/or Export for MacOS | Deploy to Bitrise.io - Apps, Logs, Artifacts |

First let's have a look at the required and sensitive fields of the **Deploy to Bitrise.io** Step:

![{{ page.title }}](/img/deploy-to-bitrise.png)

## Deploying directory or file path

If the file path of the app (.ipa/APK) is available in the right directory, the **Deploy to Bitrise.io** Step will upload the file for the build and the file will be listed on the Build’s page.

If you use custom Steps or our **Script** Step to deploy apps from the `$BITRISE_DEPLOY_DIR` directory, make sure:

* You move the generated app into this directory or
* You set the **Deploy directory or file path** input of the **Deploy to Bitrise.io** Step to point to the location of the app file.

## Notify: User Roles

You can define who should get notified of the generated build based on your app's user groups. There are a couple of options for you to choose from:

* Leave everyone in the input field to notify everyone in the group.
* Notify based on user role: testers, developers, admins, or owner (Select one or more and separate the roles with commas)
* If you don't want to notify anyone, set it to `none`.

The default input value here is `everyone`.

## Notify: Emails

Set one or more email addresses of those who should get notification. This field is  [sensitive](/builds/env-vars-secret-env-vars/) so make sure you register those email addresses in our **Secrets** tab.

{% include message_box.html type="info" title="How can I get notified?" content="You can get a [notification email](/builds/configuring-notifications/#watching-an-app) about a successful or failed build, if you click the **Watch** icon above the **Start/Schedule a Build** purple button on your Build's page."%}

## Enabling Public Page for the App

With this option enabled, you can create a Public install page that comes with a long and random URL. You can share this URL with anyone - yes, even with those who are not registered on Bitrise.

You can enable it directly in the Step's input field or at the generated .ipa/APK in your Build's **APPS & ARTIFACTS** tab.

### Accessing the Public install page

You can access the Public install page's URL, if you head over to your generated build's **APPS & ARTIFACTS** tab and find the .ipa/APK file.

![{{ page.title }}](/img/public-install-page-1.png)

Besides the **Public install page** link on the **APPS & ARTIFACTS** tab, you’ll see a bunch of other information about the deployed app. For example, you can check the details of the App (such as App title, Bundle ID, Version, Size, etc) or download the file to your local computer as well.

![{{ page.title }}](/img/app-release-unsigned.jpg)

If you click **Open Public install page** link, you’ll see a basic description of the app (title, version, size, supported devices).

![{{ page.title }}](/img/publicinstallpage.jpg)

You can share this page with anyone, even if they don’t have a Bitrise account. You have to make sure that they’ll be able to install the app, though. If you don’t use an Enterprise Provisioning Profile to build your app, you have to add every device identifier (UDID) to the Provisioning Profile (just like you do on your Mac). The iOS app can’t be installed on any other device but on the ones which were included in the Provisioning Profile the build was signed with. Also note that an app store `.ipa` won't receive a Public install page as it should be uploaded to the app store directly. Learn how to [install an .ipa file from the Public Install page](/testing/installing-an-ipa-file-from-the-public-install-page/) in our detailed guide. 

### Sending invites and notifications

You can send install invites and notifications based on roles or email address. You can either send invites for a group of your app's team members (testers, developers, admins or owner) or (if the **Public install page** option is enabled) you can send install invites to any email address.

{% include message_box.html type="note" title="Can't access the Public install page?" content="

* Keep in mind that if you disable the **Public install page** toggle, Bitrise won’t send install invite emails for the emails you specified. Only those can get the link who are in the app's team.
* Keep in mind that the install invite emails contain the **Public install page** URL. If you invite someone who’s not in your App’s team and then disable the `Public install page` toggle, they won’t be able to access the install page! Those who are in your App’s team will be redirected to the Build’s page if the `Public install page` toggle is disabled. "%}

You can specify the list of groups and emails for automatic install invite notification in the App’s Workflow using the **Notify: User Groups** and **Notify: Emails** Step input fields.

### Test Devices

If you built your iOS App with a development or an ad hoc provisioning profile, an additional section will be presented with a list of allowed device identifiers (UDID) on your Build's page. If you or a team member of your app’s team [register a device](/testing/registering-a-test-device/) for his/her Bitrise account and the device’s identifier can be found in the provisioning profile, you will see the following in the list:

* the Test device identifier with its name
* the person's name who registered the Test device

For Android apps, you don’t have to register your test devices, as Android apps don’t have per-device install restrictions. However you’ll have to enable the **Unknown Sources** option in Android to be able to install the APK from outside of the Google Play Store.

### Disabling Public Page for the App

You can disable this toggle any time:

* Move the toggle to the left in your Build's **APPS & ARTIFACTS** or
* Set the step input field to `false` value in the Step.

{% include message_box.html type="warning" title="Who can receive the app after disabling?" content=" If you disable this function for the app, then only your app's team members will be able to install the app from Bitrise! Additionally, the **Notify: Emails** option will be ignored and the **Notify: User Roles** users will receive the build's URL instead of the public page's URL."%}

{% include banner.html banner_text="Distribute your app over the air" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}