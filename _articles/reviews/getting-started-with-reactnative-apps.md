---
title: Getting started with ReactNative apps
date: 2018-09-27 13:04:45 +0000
redirect_from:
- "/builds/troubleshooting/"
menu:
  getting-started:
    weight: 12
published: false

---
This guide describes how to set up, configure and deploy your React Native project to its own distribution platform using Bitrise in no time! When configuring your workflow, keep in mind that your React Native repo consists of an Android and an iOS project so all configs should be done as you would normally do in the case of your Android and iOS app development. After having run a React Native build, first an Android, then an iOS build gets built. If your organization has more than one concurrency, you can have Android and iOS run simultaneously.

## Before setting up a React Native project

Make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. If you haven't signed up yet, here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) to do that.

## Add a React Native project on bitrise.io

In this tutorial, we're using `[sample-apps-react-native-ios-and-android](https://github.com/bitrise-samples/sample-apps-react-native-ios-and-android)` sample app.

1. Log into [bitrise.io](https://www.bitrise.io).
2. Click `Add a new app`.
3. Select the privacy setting of your app: `private` or `[public](/getting-started/adding-a-new-app/public-apps/)`.
4. Select the Git hosting service that hosts your repository, then find and select your own repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/connecting-a-repository/).
5. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](https://devcenter.bitrise.io/getting-started/adding-a-new-app/setting-up-ssh-keys/).
6. Type the name of the branch that includes your project’s configuration - master, for example, - then click `Next`.
7. At `Validating repository`, Bitrise runs an automatic repository scanner to set up the best configuration for your project, which includes stack selection and workflow setup. In the case of a React Native project, you should see `React Native` as the selected **project type and** `**android**` **as** . If the scanner fails and the project type is not selected automatically, you can [configure your project manually](https://devcenter.bitrise.io/getting-started/adding-a-new-app/setting-up-configuration#manual-project-configuration). You can select the variant, the project path and the scheme name in the drop down fields.
   * `Select variant for building` - select a variant that suits your project. Pick `Select All Variants`for  to build all variants.

     ![](/img/select-variant-for-building.jpg)
   * `Project (or Workspace) path` - Select your Xcode project or Xcode Workspace path.
   * `Select Scheme name` - Select a scheme name. The scanner validation will fail if you do not have a SHARED scheme in your  project. You can still point Bitrise manually to your Xcode scheme but  if it’s shared, we automatically detect it for you. [Read more about schemes and the possible issues with them!](https://devcenter.bitrise.io/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found).

     ![Project build configuration](/img/select_scheme_name.jpg "Project build")
   * ipa export method?  - az ios-nel ki kell valasztani.
8. At `Webhook setup`, register a Webhook so that Bitrise can automatically start a build every time you push code into your repository.

{% include message_box.html type="note" title="Settings tab" content=" These settings can be later modified at the `Settings` page of your app, except for the stack, which you can alter at the `Stack` tab of your Workflow Editor." %}

You have successfully set up your React Native project on [bitrise.io](https://www.bitrise.io)! Your first build gets kicked off automatically on the primary workflow. You can check the generated reports of the primary workflow on the `APPS & ARTIFACTS` tab of Build's page.

## Install dependencies

You might wonder how dependencies (javascript and native ones) are installed to your project. We've got you covered!

### Javascript dependencies

If Bitrise scanner has successfully scanned your project, `Run npm command` or `Run yarn command` steps will be included in your workflow.

In `Run npm command`, type `install` in the `npm command with arguments to run` input field so that it can add javascript dependencies to your project. `Run yarn command` can install javascript dependencies automatically to your project without you having to configure the step manually.

### Native dependencies

Our `Install missing Android tools` step installs the missing native dependencies  for your Android project - luckily this steps is by default included in your workflow.

You have the option to use a dependency manager for your iOS projects as well if you add our `Run CocoaPods install` step to your workflow as this step is not part of the workflow by default.

## Code signing your React Native project

Your React Native app consists of two projects. Both projects must be properly code signed to be able to upload them to their respective marketplaces. If you click on the `Code Signing` tab of the Workflow Editor, luckily all iOS and Android code signing fields are displayed in one page for you to conveniently and quickly upload the necessary files. 

Let's see the process step by step!

### Code sign your Android project

1. Select the `deploy` workflow at the `WORKFLOW` dropdown menu in the top left corner of your apps' Workflow Editor.
2. Go to the `Code Signing` tab.
3. Drag-and-drop your keystore file to the `ANDROID KEYSTORE FILE` field.
4. Fill out the `Keystore password`, `Keystore alias`, and `Private key password` fields and click `Save metadata`.

   You should have these already at hand as these are included in your keystore file which is generated in Android Studio prior to uploading your app to Bitrise. For more information on keystore file, click [here](https://developer.android.com/studio/publish/app-signing). With this information added to your Code Signing tab, our `Sign APK step` (by default included in your Android deploy workflow) will take care of signing your apk so that it’s ready for distribution!

{% include message_box.html type="info" title="More information on Android code signing" content=" Head over to our [Android code signing guide](https://devcenter.bitrise.io/code-signing/android-code-signing/android-code-signing-procedures/) to learn more about your code signing options!"%}

With this the Android chunk of code signing is done!

![](/img/android-code-signing-react.png)

### Code sign your iOs project

Code signing procedures depend on what you wish to do with the exported .ipa. Would you like to test it on a registered device or would you like to deploy it to Testflight? 

To **install and test the app on other physical devices**, you will need to create and export an .ipa file. This requires setting up code signing. In the example, we’ll be exporting an .ipa with the `development` export method: you cannot upload such an app to Testflight but you can test it, for example, on the devices of your internal testers.

{% include message_box.html type="note" title="Automatic provisioning" content="
The example procedure described here uses manual provisioning, with the `Certificate and profile installer`Step. However, Bitrise also supports [automatic provisioning](https://devcenter.bitrise.io/code-signing/ios-code-signing/ios-auto-provisioning/) but it is not in the scope of this guide.
"%}

You will need:

* the automatically created `deploy` workflow
* an iOS **Development** certificate (a .p12 certificate file)
* a **Development** type Provisioning Profile

1. Set the code signing type of your project in Xcode to either manual or automatic (Xcode managed), and generate an .ipa locally.
2. Collect and upload the code signing files with [the codesigndoc tool](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).

   The tool can also upload your code signing files to Bitrise - we recommend doing so! Otherwise, upload them manually: enter the Workflow Editor and select the `Code signing` tab, then upload/drag-and-drop the files in their respective fields.
3. Go to your app’s Workflow Editor, and select the `deploy` workflow in the `WORKFLOW`dropdown menu in the top left corner.
4. Check that you have the `Certificate and profile installer` Step in your workflow. It must be before the `Xcode Archive & Export for iOS` Step (you can have other Steps between the two, like `Xcode Test for iOS`).
5. Check the `Select method for export` input of the `Xcode Archive & Export for iOS`Step. By default, it should be the `$BITRISE_EXPORT_METHOD` environment variable. This variable stores the export method you selected when creating the app. If you selected `development` back then, you don’t need to change the input. Otherwise, manually set it to `development`.

   ![Export method env var](https://devcenter.bitrise.io/img/export-method-envvar.png)
6. [Start a build](https://devcenter.bitrise.io/builds/starting-builds-manually/).

If you uploaded the correct code signing files, the `Certificate and profile installer` Step should install your code signing files and the `Xcode Archive & Export for iOS` Step should export an .ipa with the development export method. If you have the `Deploy to Bitrise.io`Step in your workflow, you can find the .ipa on the `Apps & Artifacts` tab of the build page.

{% include message_box.html type="info" title="About iOS code signing" content=" iOS code signing is often not this simple - read more about how [iOS code signing works on Bitrise](https://devcenter.bitrise.io/code-signing/ios-code-signing/code-signing)!"%}

## Deploy your project

There are two things to take care of to deploy your React Native project:

* setting the `app-store` for export method
* adding the respective `deploy` step to your workflow, for example, \`Google Play Deploy\`. 

If you set up your code signing files and created an .ipa for your internal testers, it is time to **involve external testers and then to publish your iOS app to the App Store**. Let’s see how!To deploy to Testflight and to the App Store, you will need more code signing files:

* an iOS **Distribution** Certificate
* an **App Store** type Provisioning Profile

 1. On your local machine, set up App Store code signing for your project in Xcode, and export an App Store .ipa. If this fails locally, it will definitely fail on Bitrise, too!
 2. Collect and upload the code signing files with [the codesigndoc tool](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).
 3. Go to the app’s Workflow Editor and create a [new workflow](https://devcenter.bitrise.io/getting-started/getting-started-workflows/): click the `+ Workflow` button, enter the name of your new workflow and in the **BASED ON** dropdown menu, select `deploy`. This way the new workflow will be a copy of the basic `deploy` workflow.
 4. Set the `Select method for export` input of the `Xcode Archive & Export for iOS` Step to `app-store`.

    ![App store export](https://devcenter.bitrise.io/img/app-store-export.png)

    If you wish to distribute your app to external testers without uploading the app to Testflight, select `ad-hoc`. In that case, skip the next steps in the guide: you only need the `Deploy to Bitrise.io` Step in your workflow.
 5. Add the `Deploy to iTunes Connect - Application Loader` Step to your workflow, after the `Xcode Archive & Export for iOS` Step but preferably before the `Deploy to Bitrise.io` Step.
 6. Provide your Apple credentials in the `Deploy to iTunes Connect - Application Loader` Step.

    The Step will need your:
    * Apple ID
    * password or, if you use two-factor authentication on iTunes Connect, your application password.

    Don’t worry, the password will not be visible in the logs or exposed - [that’s why it is marked SENSITIVE](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars#about-secrets).
 7. Make sure you are in sync with Google Play Store! Learn how to
    * [register to Google Play Store and set up your project](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
    * set up [Google Play API access](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#set-up-google-play-api-access)
 8. In your Bitrise `Dashboard`, go to `Code Signing` and upload the service account JSON key into the `GENERIC FILE STORAGE.`
 9. Copy the env key which stores your uploaded file’s url.

    For example: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
10. Go back to the `Google Play Deploy` step in your Workflow Editor.\`
11. Fill out the required input fields as follows:
    * `Service Account JSON key file path`: This field can accept a remote URL so you have to provide the environment variable which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
    * `Package name`: the package name of your Android app
    * `Track`: the track where you want to deploy your APK (alpha/beta/rollout/production)

And that’s it! Start a build - if everything went well, you should see your app on Testflight. From there, you can distribute it to external testers or release it to the App Store.Configure your workflow

The `Run npm command` step should be set to `install` and can be inserted anywhere before `Xcode Archive & Export for iOS` or the `Android Build` steps. Make sure the `Working directory` input field is set to the directory where your React Native project is located. If it's stored elsewhere, set that path here or use our `Change working directory` step which will replace the old directory path to the new one in your workflow.

An example of a React Native YML

    yml
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    project_type: react-native
    trigger_map:
    - push_branch: "*"
      workflow: primary
    - pull_request_source_branch: master
      workflow: primary
      pull_request_target_branch: master
    workflows:
      deploy:
        steps:
        - activate-ssh-key@3.1.1:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - script@1.1.5:
            title: Do anything with Script step
        - npm@0.9.1:
            inputs:
            - command: install
        - install-missing-android-tools@2.1.1: {}
        - android-build@0.9.4:
            inputs:
            - project_location: "$PROJECT_LOCATION"
            - module: "$MODULE"
            - variant: "$BUILD_VARIANT"
        - certificate-and-profile-installer@1.9.3: {}
        - xcode-archive@2.4.8:
            inputs:
            - project_path: "$BITRISE_PROJECT_PATH"
            - scheme: "$BITRISE_SCHEME"
            - export_method: "$BITRISE_EXPORT_METHOD"
            - configuration: Release
        - deploy-to-bitrise-io@1.3.12: {}
      primary:
        steps:
        - activate-ssh-key:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - virtual-device-testing-for-android@1.0.3: {}
        - script@1.1.5:
            title: Do anything with Script step
        - npm@0.9.1:
            inputs:
            - command: install
        - npm@0.9.1:
            inputs:
            - command: test
        - deploy-to-bitrise-io: {}

## Test your project

You can use React Native's built in testing method, called `jest`. Add another `Run nmp command` step to your workflow, WHERE?, and instead of `install`, type `test` in the `npm command with arguments to run` input field.

unit ?

ui test?

Testfairy vs Testflight ?

## Deploy to Bitrise

You can generate an .ipa file with the `Xcode Archive` step and an apk file with the `Android Build` step. Then `Deploy to Bitrise` step deploys your generated .ipa and apk to [bitrise.io](https://www.bitrise.io) so that you can share the project with your team members using the project's URL.

deploy a xamarin app - about deployment