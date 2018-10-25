---
title: Getting started with Ionic/Cordova apps
date: 2018-10-25 07:01:54 +0000
redirect_from: []
published: false

---
## Add a Ionic/Cordova app to Bitrise

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io/) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider."%}

 1. Log into [bitrise.io](https://www.bitrise.io/).
 2. On your Dashboard, click `+ Add new app`.
 3. On `Create new App` page, choose the account your wish to add the app to.
 4. Set the privacy of the app to either private or [public](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/public-apps) and click `Next`.
 5. Select the Git hosting service that hosts your repository, then find and select your own repository that hosts the project. Read more about [connecting your repository](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/connecting-a-repository/).
 6. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/setting-up-ssh-keys/).
 7. Type the name of the branch that includes your project’s configuration - `master`, for example, - then click `Next`.
 8. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them.
 9. At `Project Build configuration`, you can select which platform to build your app for. You can select:
    * iOS
    * Android
    * iOS and Android (where the Android build gets built first)

    ![](/img/select-platform-cordova.jpg)
    
    ![](/img/select-platform-ionic.jpg)
10. **Select scheme name? Select export method? \[ad-hoc, dev...\]**
11. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository. This also kicks off your first build on the primary workflow - click the message and it will take you to the build page. The first build does not generate an APK and an .ipa yet, however, you can already check out the project’s logs on the Build’s page.

An example of primary workflow:

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

## Dependencies

`Run npm command` Step is by default part of your primary and deploy workflows. This step takes care of installing all Javascript dependencies listed in your app's `package.json` file. Make sure you have `the nmp command with arguments to run` field should be set to `install`.

**Any other? Platform specific?**

## Testing Ionic/Cordova apps

[Unit testing](https://docs.microsoft.com/en-us/visualstudio/cross-platform/tools-for-cordova/debug-test/basic-tests-with-jasmine?view=toolsforcordova-2017) is performed by `Karma Jasmine Test Runner` step which is right after `Run nmp command` dependency installer.

**UI testing?**

## Code signing

If you want to build an app for iOS or Android you need to upload the platform-specific files into the `Code Signing` tab of the Workflow Editor. You can also generate builds for both platforms which requires uploading all code signing files of the platforms. We will show you how!

{% include message_box.html type="note" title="Automatic provisioning" content=" The example procedure described here uses manual provisioning, with the `Certificate and profile installer`Step. However, Bitrise also supports [automatic provisioning](https://yv69yaruhkt48w.preview.forestry.io/code-signing/ios-code-signing/ios-auto-provisioning/) but it is not in the scope of this guide." %}

### Signing your iOS project

1. Generate the native Xcode project locally from your Ionic or Cordova project by calling `cordova platform add ios` or `ionic cordova platform add ios`.
2. Use our `codesigndoc` tool to [collect the code signing files](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).
3. Upload the files to [bitrise.io](https://www.bitrise.io/).

   You can do this either on the website UI or with the `codesigndoc` tool itself.

   ![Screenshot](https://yv69yaruhkt48w.preview.forestry.io/img/code-signing/ios-code-signing/provisioning-and-certificate-upload.png)
4. Make sure you have the `Certificate and profile installer` step in your workflow.
5. Add the `Generate cordova build configuration` step to your Workflow. It **must come after** the `Certificate and profile installer` step.
6. Fill in the required input for the step. Please note that both the `Code Signing Identity` and the `Provisioning Profile` are required inputs for iOS apps even though they are not marked as such.

   **!\[Screenshot\]**
   * `Build configuration`: you can set it to either `debug` or `release`.
   * `Code Sign Identity`: enter a Developer or a Distribution identity.
   * `Provisioning Profile`: enter the appropriate Provisioning Profile.
   * `Packaging Type`: this controls what type of build is generated by Xcode. Set the type of code signing you need.

### Signing your Android project

1. For a signed Android project, go to the `Code Signing` tab of your Workflow Editor.
2. Click or drag-and-drop your keystore file on the `Upload file` field of the `ANDROID KEYSTORE FILE` section.

   ![Screenshot](https://yv69yaruhkt48w.preview.forestry.io/img/android-code-signing/upload-file.png)
3. Fill out the displayed three input fields:
   * `keystore password`
   * `keystore alias`
   * `private key password`

   ![Screenshot](https://yv69yaruhkt48w.preview.forestry.io/img/android-code-signing/three-fields.png)
4. Click on `Save metadata`. The  step will receive your uploaded files. Bitrise uploads your keystore file and assigns an environment variable (`BITRISEIO_ANDROID_KEYSTORE_URL`) to the download URL (which is a time-limited, read-only download URL) of the file as the value. You can use this URL to download the keystore file during a build in the future. The  step will generate the following env vars which will be used at a later step:
   * `$BITRISEIO_ANDROID_KEYSTORE_URL`
   * `BITRISEIO_ANDROID_KEYSTORE_PASSWORD`
   * `$BITRISEIO_ANDROID_KEYSTORE_ALIAS`
   * `$BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD`
5. Add the `Generate cordova build configuration` Step to your workflow if it's not already in it.
6. The required inputs fields for Android (`Keystore`, `Keystore password`, `Alias` and `Password`) are already filled out for you since you have uploaded your keystore file to the `Code Signing` tab and added the metadata at Step 2 and 3. Based on this information, env vars have been generated which are now conveniently used in `Generate cordova build configuration` Step.

## Deploying Ionic/Cordova app 

1. Add the `Cordova archive` or the `Ionic archive` step to your workflow. **Or Both?**
2. Fill in the required inputs.
   * The `Platform` input needs to be set to: `device`.
   * The `Build command configuration` input must match the `Build configuration` input of the `Generate cordova build configuration` step.

   This step must come after the `Generate cordova build configuration` step in the workflow.

### Deploying to Bitrise

Add the `Deploy to Bitrise.io` Step to your workflow. This will upload all your build artifacts into the APPS & ARTIFACTS tab of your Build's page.

### Deploying to an App Store

Here is a glimpse of an Ionic deploy workflow:

    deploy:
        steps:
        - activate-ssh-key:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone: {}
        - script:
            title: Do anything with Script step
        - npm:
            inputs:
            - command: install
        - karma-jasmine-runner: {}
        - generate-cordova-build-configuration: {}
        - ionic-archive:
            inputs:
            - platform: "$IONIC_PLATFORM"
            - target: emulator
        - deploy-to-bitrise-io: {}

And a Cordova deploy workflow:

      deploy:
        steps:
        - activate-ssh-key@4.0.3:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - script@1.1.5:
            title: Do anything with Script step
        - certificate-and-profile-installer@1.10.1: {}
        - npm@0.9.1:
            inputs:
            - command: install
        - karma-jasmine-runner@0.9.1: {}
        - generate-cordova-build-configuration@0.9.6: {}
        - cordova-archive@1.1.1:
            inputs:
            - platform: "$CORDOVA_PLATFORM"
            - target: emulator
        - deploy-to-bitrise-io@1.3.15: {}