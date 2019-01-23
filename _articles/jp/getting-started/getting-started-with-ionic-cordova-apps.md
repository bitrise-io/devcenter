---
# jp title missing
title: Getting started with Ionic/Cordova apps
date: 2018-11-16 14:33:48 +0000
redirect_from: []
menu:
  getting-started:
    weight: 14

---

{% include not_translated_yet.html %}

You can use Cordova and Ionic frameworks to develop cross-platform apps. Bitrise can help you with its automated testing, code signing and deploying procedures so that you can ship your iOS and/or Android app/s to the respective marketplace in no time! If your organization has more than one concurrency, you can have Android and iOS builds run simultaneously. Now let us guide you through the process!

* [Before setting up an Ionic/Cordova project](/getting-started/getting-started-with-ionic-cordova-apps/#before-setting-up-an-ioniccordova-project)
* [Adding an Ionic/Cordova project to Bitrise](/getting-started/getting-started-with-ionic-cordova-apps/#adding-an-ioniccordova-app-to-bitrise)
* [Dependencies](/getting-started/getting-started-with-ionic-cordova-apps/#dependencies)
* [Testing Ionic/Cordova apps](/getting-started/getting-started-with-ionic-cordova-apps/#testing-ioniccordova-apps)
* [Code signing](/getting-started/getting-started-with-ionic-cordova-apps/#code-signing)
* [Deploying Ionic/Cordova apps](/getting-started/getting-started-with-ionic-cordova-apps/#deploying-ioniccordova-app)

## Before setting up an Ionic/Cordova project

Make sure you have signed up to [bitrise.io](https://www.bitrise.io/) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider.

## Adding an Ionic/Cordova app to Bitrise

 1. Log into [bitrise.io](https://www.bitrise.io/).
 2. On your Dashboard, click `+ Add new app`.
 3. On `Create new App` page, choose the account you wish to add the app to.
 4. Set the privacy of the app to either private or [public](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/public-apps) and click `Next`.
 5. Select the Git hosting service that hosts your repository, then find and select your own repository that hosts the project. Read more about [connecting your repository](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/connecting-a-repository/).
 6. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/setting-up-ssh-keys/).
 7. Type the name of the branch that includes your project’s configuration - `master`, for example, - then click `Next`.
 8. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them.
 9. At `Project Build configuration`, you can select which platform to build your app for. You can select:
    * iOS
    * Android
    * iOS and Android (where the Android build gets built first)

    ![](/img/project-build-cordova.png)

    ![](/img/project-build-ionic.png)
10. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository. This also kicks off your first build on the primary workflow - click the message and it will take you to the build page. The first build does not generate an APK and an .ipa yet, however, you can already check out the project’s logs on the Build’s page.

As an example, have a look at a Cordova **primary workflow** containing `Karma Jasmine Test Runner` step.

    {% raw %}
    primary:
        steps:
        - activate-ssh-key@4.0.3:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - script@1.1.5:
            title: Do anything with Script step
        - npm@0.9.1:
            inputs:
            - command: install
        - karma-jasmine-runner@0.9.1: {}
        - deploy-to-bitrise-io@1.3.15: {}
    {% endraw %}

{% include message_box.html type="info" title="How about using other testing frameworks?" content=" It's worth mentioning that our scanner knows about Jasmin and Karma Jasmine testing solutions. If your project uses another test framework/runner, our  scanner will not be able to generate a test workflow (which would be the `primary` workflow), but it will generate a build workflow instead. Since this workflow is the only one generated, it will be called `primary` workflow." %}

## Dependencies

To install Javascript dependencies listed in your app's `package.json` file, you can use either `Run npm command` or `Run yarn command` Steps.

`Run npm command` Step is by default part of your primary and deploy workflows. Make sure you have `The nmp command with arguments to run` field set to `install` in `Run npm command` Step.

![](https://devcenter.bitrise.io/img/run-nmp.png)

Leave the input field of `The 'yarn' command to run` empty or set it to `install` - `Run yarn command` Step will install those dependencies either way.

## Testing Ionic/Cordova apps

Perform unit testing by our `Karma Jasmine Test Runner` or `Jasmine Test Runner` Steps. If your Cordova/Ionic project has Karma Jasmine dependency in its `package.json` file, our Scanner will detect it and automatically insert the respective testing step into your workflow. If this dependency is missing from your project, you can manually insert one of steps to your workflow using our Workflow Editor - just make sure you place it right after `Run nmp command` or `Run yarn command` package manager Step.

## Code signing

If you want to build an app for iOS or Android you need to upload the platform-specific files into the `Code Signing` tab of the Workflow Editor. You can also generate builds for both platforms which requires uploading all code signing files of the platforms, luckily it's all in one page.

### Signing your iOS project

To sign your iOS project, you have to upload code signing certificates and provisioning profiles depending on the distribution and the code signing type you have set in the `Cordova Archive` and `Ionic Archive` Steps. Let's dive right in!

1. Generate the native Xcode project locally from your Ionic or Cordova project by calling `cordova platform add ios` or `ionic cordova platform add ios`.
2. Use our `codesigndoc` tool to [collect the code signing files](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).
3. Upload the files to [bitrise.io](https://www.bitrise.io/).

   You can do this either on the website UI or with the `codesigndoc` tool itself.

   ![Screenshot](https://yv69yaruhkt48w.preview.forestry.io/img/code-signing/ios-code-signing/provisioning-and-certificate-upload.png)
4. Make sure you have the `Certificate and profile installer` step in your workflow as this Step can download and install the certificates on the virtual machine.
5. Add the `Generate cordova build configuration` step to your Workflow. (This step does all the configuration needed for the next step, which is `Cordova Archive` or `Ionic Archive`.) It **must come after** the `Certificate and profile installer` step.
6. Fill in the required input for the step. Please note that both the `Code Signing Identity` and the `Provisioning Profile` are required inputs for iOS apps even though they are not marked as such.
   * `Build configuration`: you can set it to either `debug` or `release`.
   * `Code Sign Identity`: enter a Developer or a Distribution identity.
   * `Provisioning Profile`: enter the appropriate Provisioning Profile.
   * `Packaging Type`: this controls what type of build is generated by Xcode. Set the type of code signing you need.

   For more information on Ionic/Cordova code signing with Bitrise, check out our [guide](/code-signing/ios-code-signing/ionic-cordova-code-signing/)!

### Signing your Android project

1. For a signed Android project, go to the `Code Signing` tab of your Workflow Editor.
2. Click or drag-and-drop your keystore file on the `Upload file` field of the `ANDROID KEYSTORE FILE` section.

   ![](/img/keystore-file.png)
3. Fill out the displayed three input fields:
   * `keystore password`
   * `keystore alias`
   * `private key password`

     ![](/img/keystore.png)
4. Click `Save metadata`. Bitrise uploads your keystore file and assigns an environment variable (`BITRISEIO_ANDROID_KEYSTORE_URL`) to the download URL (which is a time-limited, read-only download URL) of the file as the value. You can use this URL to download the keystore file during a build in the future. The step will generate the following env vars which will be used at a later step:
   * `$BITRISEIO_ANDROID_KEYSTORE_URL`
   * `BITRISEIO_ANDROID_KEYSTORE_PASSWORD`
   * `$BITRISEIO_ANDROID_KEYSTORE_ALIAS`
   * `$BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD`
5. Add the `Generate cordova build configuration` Step to your workflow if it's not already in it.
6. The required inputs fields for Android (`Keystore`, `Keystore password`, `Alias` and `Password`) are already filled out for you since you have uploaded your keystore file to the `Code Signing` tab and added the metadata at Step 2 and 3. Based on this information, env vars have been generated which are now conveniently used in `Generate cordova build configuration` Step.

## Deploying Ionic/Cordova app

There are a few places to deploy your app but the configuration is slightly different for each of them.

Before deploying your app to any marketplace you need to generate a codesigned .ipa and/or APK so make sure you perform these steps:

1. Add the `Cordova archive` or the `Ionic archive` step to your workflow. (Note that  if you're building for both iOS and Android in one project, and either of your apps fails, the whole `Cordova Archive/Ionic Archive` Step will fail.)
2. Fill in the required inputs.
   * The `Platform` input needs to be set to `device`.
   * The `Build command configuration` input must match the `Build configuration` input of the `Generate cordova build configuration` Step.

   The archive step must come after the `Generate cordova build configuration` step in the workflow.

![](/img/cordova-archive-1.png)

Now that we're ready for deployment, let's see how to publish your iOS and Android projects by adding deployment steps to your workflow!

### Deploying to App Store Connect

1. Add the `Deploy to iTunes Connect - Application Loader` Step to your workflow, after the `Cordova Archive` or `Ionic Archive` Steps but preferably before the `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step.
2. Provide your Apple credentials in the `Deploy to iTunes Connect - Application Loader` Step.

   The Step will need your:
   * Apple ID
   * password or, if you use two-factor authentication on iTunes Connect, your application password.

   Don’t worry, the password will not be visible in the logs or exposed - [that’s why it is marked SENSITIVE](https://yv69yaruhkt48w.preview.forestry.io/builds/env-vars-secret-env-vars#about-secrets).

### Deploying to Google Play Store

Before you start:

* make sure you have [registered to Google Play Store and set up your project](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
* make sure you have set up [Google Play API access](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#set-up-google-play-api-access)

1. In your Bitrise `Dashboard`, go to `Code Signing` tab and upload the service account JSON key into the `GENERIC FILE STORAGE.`
2. Copy the env key which stores your uploaded file’s url. For example: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
3. Add the `Google Play Deploy` step after `Cordova Archive` or `Ionic Archive` Step in your deploy workflow.
4. Fill out the required input fields:

* `Service Account JSON key file path`: This field can accept a remote URL so you have to provide the environment variable which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
* `Package name`: the package name of your Android app
* `Track`: the track where you want to deploy your APK (alpha/beta/rollout/production)

### Deploying to Bitrise

Add the `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step to your workflow. This will upload all your build artifacts into the `APPS & ARTIFACTS` tab of your Build's page.

You can share the generated .ipa or APK with your team members using the build’s URL. You can also notify user groups or individual users that your .ipa or APK has been built.

1. Go to the `Deploy to bitrise.io - Apps, Logs, Artifacts` Step.
2. In the `Notify: User Roles`, add the role so that only those get notified who have been granted with this role. Or fill out the `Notify: Emails` field with email addresses of the users you want to notify. Make sure you set those email addresses as [secret env vars](https://yv69yaruhkt48w.preview.forestry.io/builds/env-vars-secret-env-vars/)! These details can be also modified under `Notifications` if you click the `eye` icon next to your generated .ipa or APK in the `APPS & ARTIFACTS` tab.

Start a build! If your app is properly configured, you can find it deployed to the marketplace of your choice!
