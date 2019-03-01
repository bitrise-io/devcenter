---
title: Android deployment
redirect_from: []
menu:
  deployment-tutorials:
    weight: 1

---
This guide describes how you can add your Android project to [bitrise.io](https://www.bitrise.io) and deploy the APK built from your project to [Google Play Store](https://play.google.com/store). We're using the [sample-apps-android-googleplay](https://github.com/bitrise-samples/sample-apps-android-googleplay) app as an example for this tutorial.

In this guide, you will learn how to:

* create an Android project on [bitrise.io](https://www.bitrise.io)
* set up a [Google Play Store](https://play.google.com/store) project
* set up [Google Play API](https://developers.google.com/android-publisher/getting_started) access
* [deploy to Google Play Store](#deploy-to-google-play-store-using-bitrise-google-play-deploy-step) using Bitrise's `Google Play Deploy` step

## Creating your Android project on [bitrise.io](https://www.bitrise.io)

* Log into [bitrise.io](htts://www.bitrise.io).
* Create a [new Bitrise project](getting-started/adding-a-new-app). Bitrise scans your Android project and creates the initial configuration for it.
* Sign your `APK` file [digitally](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-APK-step/).

  Do not forget to **upload your keystore file** to [bitrise.io](https://www.bitrise.io).

  Once your code signing is completed, your config will look like this:

  {% raw %}
  ```yaml
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
  ```
  {% endraw %}

## Registering to Google Play Store and setting up your first project

1. Register a [Google Play Developer Account](https://developer.android.com/distribute/console/).
   If you already have a Google Play Developer account, and you have already deployed your app to Google Play Store, skip to [Set up Google Play API access](#set-up-google-play-api-access).
2. Go through the [Prepare & roll out steps](https://support.google.com/googleplay/android-developer/answer/7159011?hl=en).

## Setting up Google Play API access

1. Link your API project by `Creating a new API project` or `Using an existing API project`.
2. Set up `API Access Clients` using a service account and grant `Release manager` role to the service account.
3. **Save the downloaded JSON key of your service account** now because you will need it later.

Check out the [Google Play Developer API](https://developers.google.com/android-publisher/getting_started) guide if you need more information on the process.

You have successfully prepared your Google Play Console project. A services credential account has been created which is authorized to manage your releases.

## Deploying to Google Play Store using Bitrise Google Play Deploy step

1. Log in to [bitrise.io](https://www.bitrise.io).
2. Select your project and go to your `Workflow Editor`.
3. Open the `Code Signing` tab of your `Workflow Editor`.
4. Upload the service account JSON key into the `GENERIC FILE STORAGE`.
5. Copy the env key which stores your uploaded file's url.

   For example:

   `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
6. Go back to your `Workflow Editor` and add the `Google Play Deploy` step to the end of your Workflow.
7. Fill out the required input fields which are:
   * `Service Account JSON key file path`: This field can accept a remote url so you have to provide the environment which contains your uploaded service account JSON key.
     For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`: the package name of your Android app
   * `Track`: the track where you want to deploy your APK (alpha/beta/rollout/production)

The final configuration looks like this:

{% raw %}
```yaml
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
```
{% endraw %}

Your workflow is ready for deploying your app automatically to [Google Play Store](https://play.google.com/store). Once the app is tested and generated, you can upload it to Google Play Store.