---
last_modified_at: '2020-05-26T22:00:00.000+00:00'
title: Deploying Android apps to Bitrise and Google Play
date: '2018-10-26T13:00:41.000+00:00'
redirect_from:
- "/tutorials/deploy/android-deployment/"
- "/tutorials/deploy/android-deployment/"
tag:
- deploy
- android
- google play
description: Find out how you can deploy the APK built from your Android app to both
  bitrise.io and to the Google Play Store. Learn about Google Play API access and
  the JSON key file.
summary: This guide describes how you can add your Android project to bitrise.io and
  deploy the APK built from your project to Google Play Store.
menu:
  android-deploy:
    weight: 1

---
This guide describes how you can add your Android project to [bitrise.io](https://www.bitrise.io) and deploy the APK built from your project to [Google Play Store](https://play.google.com/store).

## Before you start

Make sure you have:

* [Added an Android app to Bitrise](/getting-started/getting-started-with-android-apps/).
* Have signed your APK [digitally](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-APK-step/).
* [Uploaded your keystore file](/code-signing/android-code-signing/android-code-signing-index/) to the **Code Signing** tab of the Workflow Editor.

{% include video.html embed_url="https://www.youtube.com/embed/Obp0cTJEETY" %}

## Setting up your first project

You need a new service account created in the Google Play Console so that Bitrise can authenticate with Google Play Deploy during your build. The new service account has to be invited to Google Play Console as a user with the appropriate permission.

1. Register a [Google Play Developer Account](https://developer.android.com/distribute/console/). If you already have a Google Play Developer account, and have already deployed your app to Google Play Store, skip to [Set up Google Play API access](/deploy/android-deploy/deploying-android-apps/#set-up-google-play-api-access/).
2. Go through the [Prepare & roll out steps](https://support.google.com/googleplay/android-developer/answer/7159011?hl=en).

### Setting up Google Play API access

Link your API project by either creating a new API project or linking an existing API project. In this tutorial, we’re creating a new one.

 1. Go to your Google Play Console and click **Settings**. Click **API** **access** on the left menu bar. On the **Linked Google Cloud project** page, select **Create new project** option.![](/img/apiaccessstart.jpg)
 2. On the **API access** page, scroll down to **Service accounts** and click **Create a new service account**. Follow the instructions to get to Google Cloud Platform.![](/img/createnewserviceaccount.jpg)
 3. On the Google Cloud Platform, click **+ CREATE SERVICE ACCOUNT** on the top menu bar.![](/img/pluscreateserviceaccount.jpg)
 4. A 3-step **Create service account** page comes up, where you have to provide a **Service account name** first. A **Service account ID** is automatically generated based on the **Service account name** you typed.![](/img/serviceaccountdetails.jpg)
 5. Although the second and third steps of the process are marked optional on Google Cloud Platform, those are essential for Bitrise to be able to use the service account access. At the **Grant this service account access to project** step, select Browser in the **Role** dropdown.![](/img/serviceaccountdetails.png)
 6. Fill out the **Service account user role** and **Service account admins role** fields of the **Grant users access to this service account** step. Hit **Done** at the bottom of the page.![](/img/grantuseraccess.jpg)
 7. You land back on the **API Access page** of the Google Play Console where you can create a key to your new service account. Bitrise will use the key to authenticate as the service account. Click the **ellipsis** next to the new service account and select **Manage keys** from the options.![](/img/managekeys.jpg)
 8. You are directed to the **KEYS** page of the **Service accounts**. Click the **ADD KEY** dropdown and select **Create new key** option.![](/img/createnewkey.jpg)
 9. Select **JSON** as your **Key type**. Click **CREATE**. Once you created a key here, it automatically downloads to your local machine and you can upload it to the **Code Signing** tab of Bitrise. You may close your Google Cloud Platform window as we won’t need it any more.![](/img/jsonkey-png.jpg)
10. You are landing back on the **API access** page of Google Play Console where you can see your new service account under **Service accounts**. Click **Grant access** to link your project to the Google Console. The Google Cloud Platform (GCP) service account will be invited as a user to the Google Play Console, so GCP will have access to your apps in Play Console. Bitrise uses this service account to make changes in the Google Play Console.
![](/img/grantaccess.jpg)
11. In the **Invite user** window, the **Email address** field is pre-filled. Under **Permissions**, the default ones are already selected. You can go with these. Click **Invite user** at the bottom of the page.![](/img/permission.jpg)
12. Check out the [Google Play Developer API](https://developers.google.com/android-publisher/getting_started "https://developers.google.com/android-publisher/getting_started") guide if you need more information on the process.

    You have successfully prepared your Google Play Console project. A service account has been created which is authorized to manage your releases.

Check out the [Google Play Developer API](https://developers.google.com/android-publisher/getting_started) guide if you need more information on the process.

You have successfully prepared your Google Play Console project. A services credential account has been created which is authorized to manage your releases.

## Deploying to bitrise.io

The **Deploy to bitrise.io - Apps, Logs, Artifacts** Step attaches all the generated artifacts to your build and uploads them into the [ APPS & ARTIFACTS](/builds/build-artifacts-online/) tab on your Build’s page. By default, the value of the **Enable public page for the App?** input field is set to `true`. This way, once the build runs, a [public install page](/deploy/bitrise-app-deployment/#accessing-the-public-install-page) will be available with a long and random URL which can be shared with others who are not registered on Bitrise.

You can notify user groups or individual users that your APK file has been built by specifying roles and/or email addresses. You can share the app's public install page with anyone if you set the following input fields:

1. Go to the **Deploy to bitrise.io** Step.
2. In the **Notify: User Roles** input field, add the role (for example, `testers`, `developers`, `admins`) so that only those get notified who have been granted with this particular role.
3. Or fill out the **Notify: Emails** input field with email addresses of the users you want to send the URL to. Make sure you set those email addresses as [secret Environment Variables](/builds/env-vars-secret-env-vars/)! These details can be also modified under **Notifications** if you click the **eye** icon next to your generated APK file in the **APPS & ARTIFACTS** tab. Here you can check the URL by clicking **Open Public install page**.

![{{ page.title }}](/img/public-install-page.png)

{% include message_box.html type="info" title="How can I get notified?" content="You can get a [notification email](/builds/configuring-notifications/#watching-an-app) about a successful or failed build, if you click the **Watch** icon above the **Start/Schedule a Build** purple button on your Build's page."%}

## Deploying to the Google Play Store

Before you'd use the **Google Play Deploy** Step, make sure you have performed the following tasks:

1. Upload the first APK or AAB manually to Google Play [using the Google Play Console](https://support.google.com/googleplay/android-developer/answer/113469?hl=en).
2. [Link](https://developers.google.com/android-publisher/getting_started) your Google Play Developer Console to an API project.
3. [Set up API Access Clients using a service account](https://developers.google.com/android-publisher/getting_started): Please note when you create your service account on the Google Developer Console, you have to choose `json` as **Key Type**.
4. Grant the necessary rights to the service account with your [Google Play Console](https://play.google.com/apps/publish). Go to **Settings**, then **Users & permissions**, then **Invite new user**. Due to the way the Google Play Publisher API works, you have to grant at least the following permissions to the service account:
   * Access level: View app information, Create & edit draft apps.
   * Release management: Manage production releases, manage testing track releases, Manage testing track configuration.
5. As an optional Step, you can add translations to your Store Listing. To allow the **Google Play Deploy** Step to assign your `whatsnew` files to the uploaded APK version, visit the [Translate & localize your app](https://support.google.com/googleplay/android-developer/answer/3125566?hl=en) guide and add translations to your Store Listing section.

Now let's head back to Bitrise and finish off the deploy configuration!

1. Log in to [bitrise.io](https://www.bitrise.io).
2. Select your project and go to Workflow Editor.
3. Click the **Code Signing** tab.
4. Upload the service account JSON key into the **GENERIC FILE STORAGE**.
5. Copy the env key which stores your uploaded file's URL.

   For example:

   `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
6. Go back to your Workflow Editor and add the **Google Play Deploy** Step to the end of your Workflow.
7. Fill out the required input fields which are:
   * **Service Account JSON key file path**: this field can accept a remote url so you have to provide the environment which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`.
   * **Package name**: the package name of your Android app.
   * **Track**: the track where you want to deploy your app (for example, internal/alpha/beta/production or any custom track you set).

You can use the Play Console UI to promote apps to other tracks (for example, an app uploaded to internal testing can be released on alpha track).

The final configuration looks like this:

    {% raw %}
    workflows:
    deploy:
      steps:
      - activate-ssh-key@4.0.5:
          run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
      - git-clone@4.0.17: {}
      - cache-pull@2.0.1: {}
      - script@1.1.5:
          title: Do anything with Script step
      - install-missing-android-tools@2.3.7: {}
      - android-build@0.10.0:
          inputs:
          - project_location: $BITRISE_SOURCE_DIR
          - module: "app"
      - sign-APK@1.4.1: {}
      - google-play-deploy@3.0.1:
          inputs:
          - package_name: io.bitrise.googleplay
          - service_account_json_key_path: "$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL"
          - track: alpha
      - deploy-to-bitrise-io@1.9.4: {}
      - cache-push@2.2.3: {}
    {% endraw %}

Your workflow is ready for deploying your app automatically to [Google Play Store](https://play.google.com/store). Once the app is tested and generated, you can upload it to Google Play Store.

{% include banner.html banner_text="Let's deploy your APK!" url="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta" button_text="Go to your app" %}