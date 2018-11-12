---
title: Bitrise OTA App deployment- draft
date: 2018-11-09 14:46:59 +0000
redirect_from: []
published: false

---
Bitrise has an integrated App Deployment system you can use for App and other build artifact file distribution.

With this you can distribute your iOS and Android app, over the air, for your testers (**even for those who don’t have a Bitrise account**) or you can just use it for archiving your App and other build artifact files (these files will be available on the related Build’s details page).

| Platform | Build step | Deploy step |
| --- | --- | --- |
| iOS | Xcode Archive & Export for iOS | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| Android | Gradle Runner or Android Build | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| Xamarin | Xamarin Archive | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| React Native | Android Build and/or Xcode Archive & Export for iOS | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| Ionic | Ionic Archive | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| Cordova | Cordova Archive | Deploy to Bitrise.io - Apps, Logs, Artifacts |
| MacOS | Archive for MacOS and/or Export for MacOS | Deploy to Bitrise.io - Apps, Logs, Artifacts |

![](/img/deploy-to-bitrise.png)

{% include message_box.html type="important" title="Deploy directory file path" content="
If you use custom steps or our `Do anything with Script step` to deploy apps from the `$BITRISE_DEPLOY_DIR` directory, make sure you move the generated app into this directory or set the `Deploy directory or file path` input of the `Deploy to Bitrise.io step` to point to the location of the app file.
"%}

If the app file (.ipa/APK) is available, the `Deploy to Bitrise.io` Step will upload the file for the Build and **the file will be listed on the Build’s page**.

Depending on the **notification settings** you set for the `Deploy to Bitrise.io` step, Bitrise.io will also send emails for the Team of the app.

For each deployed app you’ll see an information and notifications card on the Build’s page, where you can check the details of the App (title, bundle id, version number, size, etc.) and you can download or install the App right from the Build’s page.

{% include message_box.html type="note" title="Device identifier" content="
If you built your iOS App** with a Development or Ad Hoc Provisioning Profile, an additional section will be presented with a list of allowed device identifiers (UDID)
"%}

If you or a team member of your App’s team register a device for his/her Bitrise account (you can do this on your [Account Settings page](https://www.bitrise.io/me/profile) in the [Test Devices](/testing/registering-a-test-device/) section) and the device’s identifier can be found in the Provisioning Profile, you will see two things in the list: 

* the Test device identifier with its name
* the person's name who registered the Test device

Visiting the Build page from an iOS device (which you registered for your account) and you’ll see an `Install` button instead of the `Download` button. With this **you can install the App on your device directly from Bitrise**.

**For Android apps you don’t have to register your test devices**, as Android apps don’t have per-device install restrictions. You’ll, however, have to enable the **“Unknown Sources”** option in Android to be able to install the app/apk from outside of the Google Play Store.

## Public App install page [⚓](https://devcenter.bitrise.io/tutorials/deploy/bitrise-app-deployment/#public-app-install-page)

If you enable the **Public install page** option (of the `Deploy to Bitrise.io` step) for the App, then a **long, random URL** will be available for you, which you **can be sent even to people who are not registered on Bitrise.io**.

Opening this link you’ll see a base description of the App (title, version, size, supported devices) and an `Install` button if you visit the page from an iOS or Android device (depending on the app’s platform of course).

You can share this page with anyone, even if they don’t have a Bitrise account, but **you have to make it sure that they’ll actually be able to install it** - if you don’t use an Enterprise Provisioning Profile to build your App, you have to add every device identifier (UDID) to the Provisioning Profile (just like you do on your Mac), the iOS App can’t be installed on any other device, only on the ones which were included in the Provisioning Profile the build was signed with.

**You can enable or disable the App’s public install page any time from the related Build page** and **you can also set the default state** (enabled or disabled) **in your App’s Workflow** (select the `Deploy to Bitrise.io` step and set the `Enable public page for the App?` to `false` if you don’t want to automatically enable this feature).

**_If you disable the Public install page for the App, then only your App’s team members will be able to install the App from Bitrise, from the Build’s detail page!_**

## Notifications and install invites [⚓](https://devcenter.bitrise.io/tutorials/deploy/bitrise-app-deployment/#notifications-and-install-invites)

On the Build’s page you can send install invites for your testers. You can either send invites for a group of your team (testers, developers, admins or owner) or (if the `Public install page` option is enabled) you can send install invites to any email address.

**Keep in mind that the install invite email contains the URL of the Public install page.** If you invite someone who’s not in your App’s team and then disable the Public install page, they won’t be able to access the install page! Those who are in your App’s team will be redirected to the Build’s page if the Public install page is disabled.

**You can specify the list of groups and emails for automatic install invite notification** in the App’s Workflow. Similarly to the Public page option just select the `Deploy to Bitrise.io` step in your Workflow and specify the list of groups and emails to automatically notify in the `Notify: User Groups` and `Notify: Emails` options.

Keep in mind that if you disable the _Public install page_ option, Bitrise won’t send install invite emails for the emails you specify, only to those who are in the App’s Team, because in this case only your team members can access the App (on the Build’s page).