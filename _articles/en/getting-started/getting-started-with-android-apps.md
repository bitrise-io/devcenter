---
title: Getting started with Android apps
date: '2018-09-21T08:47:45.000+00:00'
redirect_from:
- "/getting-started/Getting-started-with-Android-apps/"
- "/getting-started/Getting-started-with-android-apps/"
- "/getting-started/getting-started-with-Android-apps/"
tag:
- getting-started
- android
- deploy
- testing
summary: 'Go through the procedure of adding an Android app on Bitrise from start
  to finish, from adding the app to deploying it. Learn about unit and UI testing
  and code signing. '
menu:
  getting-started-main:
    weight: 28

---
In this guide, we'll walk you through how to add an Android app to Bitrise, what the default workflows can do, and finally how to test and deploy your app to [bitrise.io](https://www.bitrise.io/) and to the

## Adding an Android app to Bitrise

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider. "%}

1. Log into [bitrise.io](https://www.bitrise.io/).
2. On your Dashboard, click **+ Add new app**.
3. On **Create new App** page, choose the account you wish to add the app to.
4. Set the privacy of the app to either Private or [Public](/getting-started/adding-a-new-app/public-apps) and click **Next**.
5. Select the Git hosting service that hosts your repository, then find and select your own repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/connecting-a-repository/).
6. When prompted to set up repository access, click **No, auto-add SSH key**. Read more about [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/).
7. Type the name of the branch that includes your project's configuration - master, for example, - then click **Next**.
8. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them.
   * Bitrise Scanner selects the module of your project by default. If there are more modules to choose from in the **Module** list, select a module that works best for your project.
   * Select a variant for **building** (you can **Select All Variants** which will generate all variants in **APPS & ARTIFACTS**) and select a variant for **testing** too.
9. Register a [webhook](/webhooks/index/) when prompted so that Bitrise can start a build automatically when code is pushed to your repository. This also kicks off your first build on the primary Workflow - click the message and it will take you to the build page. The first build does not generate an APK yet, however, you can already check out the project's logs on the Build's page.

As you can see in the primary workflow, there is no **Android Build** step that would build your project and our **Android Sign** Step is missing as well, which means this workflow is only a jumping off-point for you to test your project on code level.

{% include message_box.html type="important" title="Order of the steps matter!" content="

* To cache Gradle dependencies, keep the **Bitrise.io Cache:Pull** Step as the first and the **Bitrise.io Cache:Push** Step as the very last step in your Workflow!
* Right after our **Do anything with Script** Step, the **Install missing Android SDK components** will take care of installing the missing Android SDK components that your project might be lacking.
* **Change Android versionCode and versionName** Step must be inserted BEFORE the **Android Build** Step as the former makes sure you will upload the build with the right version code and version name to Google Play Store.
* **Android Lint** and **Android Unit Test** Steps must be inserted BEFORE the **Android Build** Step to test your code and debug before building your build.
* **Android Sign** Step must be AFTER the **Android Build** Step as the latter builds your project so that you have an APK ready to be signed with the **Android Sign** Step. Make sure that this Step is BEFORE any deploy Step so that you can upload an authorized project."%}

## Dependencies

Luckily, our **Android Build** Step, which is by default part of your deploy Workflow, takes care of all the dependencies which you have listed in your `build.gradle` file and installs them for your project.

## Testing your project

As you can see in the above Android Workflows, the **Android Lint** and **Android Unit Test** Steps are by default included in your Workflow.

For UI testing, add our **\[BETA\] Virtual Device Testing for Android** step to run Android UI tests on virtual devices. Available test types - make sure you select one!

* instrumentation
* robo
* gameloop

If you selected instrumentation, don't forget to set **Test APK path** under the **Instrumentation Test** group as well.

{% include message_box.html type="info" title="More testing steps to choose from" content=" Click the **+** sign on the left side of your Workflow and select another test Step from our collection."%}

## Signing your Android project

1. Select your deployment workflow at the **WORKFLOW** dropdown menu in the top left corner of your apps’ Workflow Editor.
2. Go to the **Code Signing** tab.
3. Drag-and-drop your keystore file to the **ANDROID KEYSTORE FILE** field.
4. Fill out the **Keystore password**, **Keystore alias**, and **Private key password** fields and click **Save metadata**.

   With this information added to your **Code Signing** tab, our **Android Sign** Step (by default included in your Android deploy workflow) will take care of signing your APK so that it’s ready for distribution!

![](https://devcenter.bitrise.io/img/keystore.png)

{% include message_box.html type="note" title="More on Android code signing" content="You should have the keystore password, keystore alias and the private key password available as these are included in your keystore file which is generated in Android Studio prior to uploading your app to Bitrise. You can learn more about the keystore file if you head over to [Android Studio’s guide on Keys, certificates, and keystores](https://developer.android.com/studio/publish/app-signing#certificates-keystores).

You can also check out what other code signing options you have at Bitrise in our [Android code signing guide](https://devcenter.bitrise.io/code-signing/android-code-signing/android-code-signing-procedures/)."%}

## Deploying your project

### Deploying to Bitrise

This step uploads all the artifacts related to your build into the [ APPS & ARTIFACTS ](/builds/build-artifacts-online/)tab on your Build's page.

You can share the generated apk with your team members using the build's URL. You can also notify user groups or individual users that your APK has been built.

1. Go to the **Deploy to bitrise.io** Step.
2. In the **Notify: User Roles**, add the role so that only those get notified who have been granted with this role. Or fill out the **Notify: Emails** field with email addresses of the users you want to notify. Make sure you set those email addresses as [secret Environment Variables](/builds/env-vars-secret-env-vars/)! These details can be also modified under **Notifications** if you click the **eye** icon next to your generated APK in the **APPS & ARTIFACTS** tab.

### Deploying to Google Play Store

If you add **Google Play Deploy** step to your workflow (after the **Android Sign** Step), your signed APK will get uploaded to Google Play Store.

Before you'd use the **Google Play Deploy** Step, make sure you have performed the following tasks:

1. Upload the first APK manually to Google Play [using the Google Play Console](https://support.google.com/googleplay/android-developer/answer/113469?hl=en).
2. [Link](https://developers.google.com/android-publisher/getting_started) your Google Play Developer Console to an API project.
3. [Set up API Access Clients using a service account](https://developers.google.com/android-publisher/getting_started): Please note when you create your service account on the Google Developer Console, you have to choose `json` as **Key Type**.
4. Grant the necessary rights to the service account with your [Google Play Console](https://play.google.com/apps/publish). Go to **Settings**, then **Users & permissions**, then **Invite new user**. Due to the way the Google Play Publisher API works, you have to grant at least the following permissions to the service account:
   * Access level: View app information.
   * Release management: Manage production releases, manage testing track releases.
   * Store presence: Edit store listing, pricing & distribution.
5. As an optional step, you can add translations to your Store Listing. To allow the **Google Play Deploy** Step to assign your `whatsnew` files to the uploaded APK version, visit the [Translate & localize your app](https://support.google.com/googleplay/android-developer/answer/3125566?hl=en) and add translations to your Store Listing section.

Now let's head back to Bitrise and finish off the deploy configuration!

1. In your Bitrise Dashboard, go to **Code Signing** and upload the service account JSON key into the **GENERIC FILE STORAGE**.
2. Copy the env key which stores your uploaded file’s url.

   For example: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
3. Go back to the **Google Play Deploy** Step in your Workflow Editor.
4. Fill out the required input fields as follows:
   * **Service Account JSON key file path**:  This field can accept a remote URL so you have to provide the environment variable which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`.
   * **Package name**: the package name of your Android app.
   * **Track**: the track where you want to deploy your APK (for example, alpha/beta/rollout/production or any custom track you set).

{% include message_box.html type="info" title="Other deploy steps you can add to your workflow" content="Click the **+** sign on the left side of your Workflow and select another deploy Step from our collection, for example, **Appetize.io deploy** or **Amazon Device Farm File Directory**, if you wish. "%}

That's all! Start or schedule a build and share the URL with external testers or distribute your app on an app store of your choice!