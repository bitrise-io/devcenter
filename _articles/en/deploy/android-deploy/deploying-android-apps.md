---
title: Deploying Android apps
date: '2018-10-26T13:00:41.000+00:00'
redirect_from:
- "/tutorials/deploy/android-deployment/"
- "/tutorials/deploy/android-deployment/"
tag:
- deploy
- android
- google play
summary: Find out how you can deploy the APK built from your Android app to both bitrise.io
  and to the Google Play Store. Learn about Google Play API access and the JSON key
  file.
menu:
  android-deploy:
    weight: 1

---
This guide describes how you can add your Android project to [bitrise.io](https://www.bitrise.io) and deploy the APK built from your project to [Google Play Store](https://play.google.com/store). We're using the [sample-apps-android-googleplay](https://github.com/bitrise-samples/sample-apps-android-googleplay) app as an example for this tutorial.

In this guide, you will learn how to:

* create an Android app on [bitrise.io](https://www.bitrise.io)
* set up a [Google Play Store](https://play.google.com/store) project
* set up [Google Play API](https://developers.google.com/android-publisher/getting_started) access
* [deploy to Google Play Store](#deploy-to-google-play-store-using-bitrise-google-play-deploy-step) using Bitrise's `Google Play Deploy` step

## Adding your Android app on [bitrise.io](https://www.bitrise.io)

* Log into [bitrise.io](htts://www.bitrise.io).
* Create a [new Bitrise project](getting-started/adding-a-new-app). Bitrise scans your Android project and creates the initial configuration for it.
* Sign your `APK` file [digitally](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-APK-step/).

  Do not forget to **upload your keystore file** to [bitrise.io](https://www.bitrise.io).

  Once your code signing is completed, your config will look like this:

      {% raw %}
      workflows:
      deploy:
        steps:
        - activate-ssh-key@3.1.1:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - cache-pull@2.0.1: {}
        - script@1.1.5:
            title: Do anything with Script step
        - install-missing-android-tools@2.1.1: {}
        - android-build@0.9.4:
            inputs:
            - project_location: $BITRISE_SOURCE_DIR
            - module: "app"
        - sign-APK@1.2.0: {}
        - deploy-to-bitrise-io@1.3.12: {}
        - cache-push@2.0.5: {}
      {% endraw %}

## Setting up your first project

1. Register a [Google Play Developer Account](https://developer.android.com/distribute/console/). If you already have a Google Play Developer account, and you have already deployed your app to Google Play Store, skip to [Set up Google Play API access](#set-up-google-play-api-access).
2. Go through the [Prepare & roll out steps](https://support.google.com/googleplay/android-developer/answer/7159011?hl=en).

### Setting up Google Play API access

1. Link your API project by `Creating a new API project` or `Using an existing API project`.
2. Set up `API Access Clients` using a service account and grant `Deployment manager` role to the service account.
3. **Save the downloaded JSON key of your service account** now because you will need it later.

Check out the [Google Play Developer API](https://developers.google.com/android-publisher/getting_started) guide if you need more information on the process.

You have successfully prepared your Google Play Console project. A services credential account has been created which is authorized to manage your releases.

## Deploying to bitrise.io

The `Deploy to bitrise.io - Apps, Logs, Artifacts` Step attaches all the generated artifacts to your build and uploads them into the [ APPS & ARTIFACTS](https://devcenter.bitrise.io/builds/build-artifacts-online/) tab on your Build’s page. By default, the value of the `Enable public page for the App?` input field is set to `true`. This way, once the build runs, a public install page will be available with a long and random URL which can be shared with others who are not registered on Bitrise.

You can notify user groups or individual users that your APK file has been built by specifying roles and/or email addresses. You can share the app's public install page with anyone if you set the following input fields:

1. Go to the `Deploy to bitrise.io` step.
2. In the `Notify: User Roles` input field, add the role (for example, `testers`, `developers`, `admins`) so that only those get notified who have been granted with this particular role.
3. Or fill out the `Notify: Emails` input field with email addresses of the users you want to send the URL to. Make sure you set those email addresses as [secret env vars](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/)! These details can be also modified under `Notifications` if you click the `eye` icon next to your generated APK file in the `APPS & ARTIFACTS` tab. Here you can check the URL by clicking `Open Public install page`.

![](/img/public-install-page.png)

## Deploying to the Google Play Store

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

1. Log in to [bitrise.io](https://www.bitrise.io).
2. Select your project and go to your `Workflow Editor`.
3. Open the `Code Signing` tab of your `Workflow Editor`.
4. Upload the service account JSON key into the `GENERIC FILE STORAGE`.
5. Copy the env key which stores your uploaded file's url.

   For example:

   `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
6. Go back to your `Workflow Editor` and add the `Google Play Deploy` step to the end of your Workflow.
7. Fill out the required input fields which are:
   * `Service Account JSON key file path`: This field can accept a remote url so you have to provide the environment which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`: the package name of your Android app
   * `Track`: the track where you want to deploy your APK (for example, alpha/beta/rollout/production or any custom track you set)

The final configuration looks like this:

    {% raw %}
    workflows:
    deploy:
      steps:
      - activate-ssh-key@3.1.1:
          run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
      - git-clone@4.0.11: {}
      - cache-pull@2.0.1: {}
      - script@1.1.5:
          title: Do anything with Script step
      - install-missing-android-tools@2.1.1: {}
      - android-build@0.9.4:
          inputs:
          - project_location: $BITRISE_SOURCE_DIR
          - module: "app"
      - sign-APK@1.2.0: {}
      - google-play-deploy@1.5.0:
          inputs:
          - package_name: io.bitrise.googleplay
          - service_account_json_key_path: "$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL"
          - track: alpha
      - deploy-to-bitrise-io@1.3.12: {}
      - cache-push@2.0.5: {}
    {% endraw %}

Your workflow is ready for deploying your app automatically to [Google Play Store](https://play.google.com/store). Once the app is tested and generated, you can upload it to Google Play Store.

<div class="banner">
<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
<div class="deploy-text">Let's deploy your APK!</div>
<a target="_blank" href="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta"><button class="button">Go to your app</button></a>
</div>