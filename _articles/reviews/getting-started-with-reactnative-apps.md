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
This guide describes how to set up, configure and deploy your React Native project to its own distribution platform using Bitrise in no time!

## Before setting up a React Native project

Make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. If you haven't signed up yet, here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) to do that.

## Set up a React Native project on bitrise.io

In this tutorial, we're using `[sample-apps-react-native-ios-and-android](https://github.com/bitrise-samples/sample-apps-react-native-ios-and-android)` sample app.

1. Log into [bitrise.io](https://www.bitrise.io).
2. Click `Add a new app`.
3. Select the privacy setting of your app: `private` or `[public](/getting-started/adding-a-new-app/public-apps/)`.
4. Select the Git hosting service that hosts your repository, then find and select your own repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/connecting-a-repository/).
5. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](https://devcenter.bitrise.io/getting-started/adding-a-new-app/setting-up-ssh-keys/).
6. Type the name of the branch that includes your project’s configuration - master, for example, - then click `Next`.
7. At `Validating repository`, Bitrise runs an automatic repository scanner to set up the best configuration for your project, which includes stack selection and workflow setup. In the case of a React Native project, you should see `React Native` as the selected **project type**. If the scanner fails and the project type is not selected automatically, you can [configure your project manually](https://devcenter.bitrise.io/getting-started/adding-a-new-app/setting-up-configuration#manual-project-configuration). 
   * `Select variant for building` - select a variant that suits your project. Pick `Select All Variants `for  to build all variants.

     ![](/img/select-variant-for-building.jpg)
   * `Project (or Workspace) path` - Select your Xcode project or Xcode Workspace path.
   * `Select Scheme name` - Select a scheme name. The scanner validation will fail if you do not have a SHARED scheme in your  project. You can still point Bitrise manually to your Xcode scheme but  if it’s shared, we automatically detect it for you. [Read more about schemes and the possible issues with them!](https://devcenter.bitrise.io/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found).

     ![](/img/select_scheme_name.jpg) 

{% include message_box.html type="note" title="Settings tab" content=" These settings can be later modified at the `Settings` page of your app, except for the stack, which you can alter at the `Stack` tab of your Workflow Editor." %}

1. At `Webhook setup`, register a Webhook so that Bitrise can automatically start a build every time you push code into your repository.

You have successfully set up your React Native project on [bitrise.io](https://www.bitrise.io). Let's continue!

## Install dependencies

You might wonder how dependencies (javascript and native ones) are installed to your project. We've got you covered!

### Javascript dependencies

If Bitrise scanner has successfully scanned your project, `Run npm command` or `Run yarn command` steps will be included in your workflow. In `Run npm command`, type `install` in the `npm command with arguments to run` input field so that it can add javascript dependencies to your project. `Run yarn command` can install javascript dependencies automatically to your project without you having to configure the step.

### Native dependencies

Our `Install missing Android tools` step installs native dependencies for your Android project - luckily this steps is by default included in your workflow.

You have the option to use a dependency manager for your iOS projects as well if you add our `Run CocoaPods install` step to your workflow as this step is not part of the workflow by default.

## Configure your workflow

When configuring your workflow, keep in mind that your React Native repo consists of an Android and an iOS project so all configs should be done as you would normally do in the case of your Android and iOS app development.  This means that there is an Android and an iOS app in the same repo.

When running a React Native build, first an Android, then an iOS build will get built. If your org has more than one concurrency, you can have Android and iOS run simultaneously.

* Make sure your code signing is completed correctly.
  For more information, check out our step-by-step guides:
  * [iOS code code signing](https://devcenter.bitrise.io/code-signing/ios-code-signing/code-signing/)
  * [Android code signing](https://devcenter.bitrise.io/code-signing/android-code-signing/android-code-signing-procedures/)
* The `Run npm command` step should be set to `install` and can be inserted anywhere before `Xcode Archive & Export for iOS` or the `Android Build` steps. Make sure the `Working directory` input field is set to the directory where your React Native project is located. If it's stored elsewhere, set that path here or use our `Change working directory` step which will replace the old directory path to the new one in your workflow.

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

## Deploy to your app's marketplace

[Deploy to iTunes Connect - Application Loader](https://www.bitrise.io/integrations/steps/deploy-to-itunesconnect-application-loader)`and`[Google Play Deploy](https://www.bitrise.io/integrations/steps/google-play-deploy) steps take care of the swift deplopment of your .ipa or apk packages.