---
title: Getting started with Android apps
date: 2018-09-21 08:47:45 +0000
redirect_from:
- "/getting-started/Getting-started-with-Android-apps/"
- "/getting-started/Getting-started-with-android-apps/"
- "/getting-started/getting-started-with-Android-apps/"
menu:
  getting-started:
    weight: 11

---
In this guide, we'll walk you through how to add an Android app to Bitrise, what primary and deploy workflows can do, and finally how to test and deploy your app to [bitrise.io](https://www.bitrise.io/) and to the App Store.

* [Adding an Android app to bitrise.io](/getting-started/getting-started-with-android-apps/#add-an-android-app-to-bitriseio)
* [Dependencies](/getting-started/getting-started-with-android-apps/#dependencies)
* [Testing your project](/getting-started/getting-started-with-android-apps/#testing-your-project)
* [Deploying your project](/getting-started/getting-started-with-android-apps/#deploying-your-project)

## Adding an Android app to bitrise.io

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider. "%}

1. Log into [bitrise.io](https://www.bitrise.io/).
2. On your Dashboard, click `+ Add new app`.
3. On `Create new App` page, choose the account you wish to add the app to.
4. Set the privacy of the app to either Private or [Public](/getting-started/adding-a-new-app/public-apps) and click `Next`.
5. Select the Git hosting service that hosts your repository, then find and select your own repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/connecting-a-repository/).
6. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/).
7. Type the name of the branch that includes your project's configuration - master, for example, - then click `Next`.
8. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them.
   * Bitrise Scanner selects the module of your project by default.  If there are more modules to choose from in the `Module` list, select a module that works best for your project.
   * Select a variant for **building** (you can `Select All Variants` which will generate all variants in `APPS & ARTIFACTS`) and select a variant for **testing** too.
9. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository. This also kicks off your first build on the primary workflow - click the message and it will take you to the build page. The first build does not generate an apk yet, however, you can already check out the project's logs on the Build's page.

An example of an **Android primary workflow**:

    {% raw %}  
    primary:
        steps:
        - activate-ssh-key@4.0.3:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - cache-pull@2.0.1: {}
        - script@1.1.5:
            title: Do anything with Script step
        - install-missing-android-tools@2.2.0:
            inputs:
            - gradlew_path: "$PROJECT_LOCATION/gradlew"
        - android-lint@0.9.4:
            inputs:
            - project_location: "$PROJECT_LOCATION"
            - module: "$MODULE"
            - variant: "$TEST_VARIANT"
        - android-unit-test@0.9.3:
            inputs:
            - project_location: "$PROJECT_LOCATION"
            - module: "$MODULE"
            - variant: "$TEST_VARIANT"
        - deploy-to-bitrise-io@1.3.15: {}
        - cache-push@2.0.5: {}
    {% endraw %}

As you can see in this workflow, there is no `Android Build` step that would build your project and our `Sign APK` step is missing as well, hence this workflow is only a jumping off-point for you to test your project on code level.

Let's see how an **Android deploy workflow** looks like!

1. Select the `deploy` workflow in Workflow Editor.
2. Go to the `Code Signing` tab of your Workflow Editor.
3. Drag-and-drop your keystore file to the `ANDROID KEYSTORE FILE` field.
4. Fill out the `Keystore password`, `Keystore alias`, and `Private key password` fields and `Save metadata`. You should have these already at hand as these are included in your keystore file which is generated in Android Studio prior to uploading your app to Bitrise. More information on the keystore file [here](https://developer.android.com/studio/publish/app-signing). With this information added to your Code Signing tab, our `Sign APK step` (by default included in your Android deploy workflow) will take care of signing your apk so that it's ready for distribution! Head over to our [Android code signing guide](/code-signing/android-code-signing/android-code-signing-procedures/) to learn more about your code signing options!
5. Go back to your Build's page and click `Start/Schedule a build`.
6. Select `deploy` in the Basic tab of `Build configuration` pop-up window.

Here is an example of a deploy workflow:

    {% raw %}
    deploy:
        - activate-ssh-key@4.0.3:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - cache-pull@2.0.1: {}
        - script@1.1.5:
            title: Do anything with Script step
        - install-missing-android-tools@2.2.0:
            inputs:
            - gradlew_path: "$PROJECT_LOCATION/gradlew"
        - change-android-versioncode-and-versionname@1.1.1:
            inputs:
            - build_gradle_path: "$PROJECT_LOCATION/$MODULE/build.gradle"
        - android-lint@0.9.4:
            inputs:
            - project_location: "$PROJECT_LOCATION"
            - module: "$MODULE"
            - variant: "$TEST_VARIANT"
        - android-unit-test@0.9.3:
            inputs:
            - project_location: "$PROJECT_LOCATION"
            - module: "$MODULE"
            - variant: "$TEST_VARIANT"
        - android-build@0.9.5:
            inputs:
            - project_location: "$PROJECT_LOCATION"
            - module: "$MODULE"
            - variant: "$BUILD_VARIANT"
        - sign-apk@1.2.3:
            run_if: '{{getenv "BITRISEIO_ANDROID_KEYSTORE_URL" | ne ""}}'
        - deploy-to-bitrise-io@1.3.15:
            inputs:
            - notify_user_groups: testers
        - cache-push@2.0.5: {}
    {% endraw %}

{% include message_box.html type="important" title="Order of the steps matter!" content="

* To cache Gradle dependencies, keep the `Bitrise.io Cache:Pull` step as the first and the `Bitrise.io Cache:Push` step as the very last step in your workflow!
* Right after our `Do anything with Script` step, the `Install missing Android SDK components` will take care of installing the missing Android SDK components that your project might be lacking.
* `Change Android versionCode and versionName` step must be inserted BEFORE the `Android Build`step as the former makes sure you will upload the build with the right version code and version name to your app's marketplace.
* `Android Lint` and `Android Unit Test` steps must be inserted BEFORE the `Android Build` step to test your code and debug before building your build.
* `Sign APK` step must be AFTER the `Android Build` step as the latter builds your project so that you have an apk ready to be signed with the `Sign APK` step. Make sure that this step is BEFORE any deploy step so that you can upload an authorized project."%}

## Dependencies

Luckily, our `Android Build` step, which is by default part of your deploy workflow, takes care of all the dependencies which you have listed in your `build.gradle` file and installs them for your project.

## Testing your project

As you can see in the above Android workflows, the `Android Lint` and `Android Unit Test` steps are by default included in your workflow.

For UI testing, add our `beta Virtual Device Testing for Android` step to **run Android UI tests on virtual devices**. Available test types - make sure you select one!

* instrumentation
* robo
* gameloop

If you selected instrumentation, don't forget to set **Test APK path** under the **Instrumentation Test** group as well.

{% include message_box.html type="info" title="More testing steps to choose from" content=" Click the `+` sign on the left side of your Workflow and select another `TEST` step from our collection."%}

## Deploying your project

### Deploying to bitrise.io

This step uploads all the artifacts related to your build into the[ APPS & ARTIFACTS ](/builds/build-artifacts-online/)tab on your Build's page.

You can share the generated apk with your team members using the build's URL. You can also notify user groups or individual users that your apk has been built.

1. Go to the `Deploy to bitrise.io` step.
2. In the `Notify: User Roles`, add the role so that only those get notified who have been granted with this role. Or fill out the `Notify: Emails` field with email addresses of the users you want to notify. Make sure you set those email addresses as [secret env vars](/builds/env-vars-secret-env-vars/)! These details can be also modified under `Notifications` if you click the `eye` icon next to your generated apk in the `APPS & ARTIFACTS` tab.

### Deploying to marketplace

If you add `Google Play Deploy` step to your workflow (after the `Sign APK` step), your signed apk will get uploaded to a marketplace of your choice.

1. Make sure you are in sync with Google Play Store! Learn how to
   * [register to Google Play Store and set up your project](/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
   * set up [Google Play API access](/tutorials/deploy/android-deployment/#set-up-google-play-api-access)
2. In your Bitrise `Dashboard`, go to `Code Signing` and upload the service account JSON key into the `GENERIC FILE STORAGE.`
3. Copy the env key which stores your uploaded file’s url.

   For example: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
4. Go back to the `Google Play Deploy` step in your Workflow Editor.
5. Fill out the required input fields as follows:
   * `Service Account JSON key file path`:  This field can accept a remote URL so you have to provide the environment variable which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`: the package name of your Android app
   * `Track`: the track where you want to deploy your APK (alpha/beta/rollout/production)

{% include message_box.html type="info" title="Other deploy steps you can add to your workflow" content="Click the `+` sign on the left side of your Workflow and select another `DEPLOY` step from our collection, for example, `Appetize.io deploy` or `Amazon Device Farm File Directory`, if you wish. "%}

That's all! Start or schedule a build and share the URL with external testers or distribute your app on an app store of your choice!