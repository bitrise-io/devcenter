---
title: Getting started with Android apps
date: 2018-09-21 08:47:45 +0000
redirect_from: []
published: false

---
## Adding an Android app to bitrise.io

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to \[bitrise.io\]([https://www.bitrise.io](https://www.bitrise.io)) and can access your Bitrise account. If you haven't signed up yet, here are [4 ways](\[https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise\]) to connect your Bitrise account to your account on a Git service provider. "%}

1. Log into bitrise.io.
2. On your Dashboard, click `+ Add new app`.
3. On the `Create new App` page, choose the account your wish to add the app to.
4. Set the privacy of the app to either Private or [Public](/getting-started/adding-a-new-app/public-apps) and click `Next`.
5. Select the Git hosting service that hosts your repository, then find and select your repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/index/).
6. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/).
7. Type the name of the branch that includes your project's configuration - master, for example, - then click `Next`.
8. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them.
   * Bitrise Scanner selects the module of your project by default.  If there are more modules to choose from in the `Module` list, select a module that works best for your project.
   * Select a variant for **building** (you can `Select All Variants` which will generate all variants in APPS & ARTIFACTS) and for **testing**.
9. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository. This also kicks off your first build on the primary workflow - click the message and it will take you to the build page. The first build does not generate an apk yet, however, you can already check out the project's logs on the Build's page.

An example of an **Android primary workflow**:

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

As you can see in this workflow, there is no Android Build step that would build your project and Sign APK step is missing as well, hence this workflow is only a jumping off-point for you to test your project on code level - no UI testing at this stage.

Let's see how an **Android deploy workflow** looks like!

1. Select the `deploy` workflow in Workflow Editor.
2. Go to the Code Signing tab of your Workflow Editor.
3. Drag-and-drop your keystore file to the `ANDROID KEYSTORE FILE` field.
4. Fill out the `Keystore password`, `Keystore alias`, and `Private key password` fields and `Save metadata`. You should have these already at hand as these are included your keystore file which is generated in Android Studio prior to uploading your app to Bitrise. More information on the keystore file [here](https://developer.android.com/studio/publish/app-signing). With this information added to your Code Signing tab, our `Sign APK step` (by default included in your Android deploy workflow) will take care of signing your apk so that it's ready for distribution!
5. Go back to your Build's page and click `Start/Schedule a build`.
6. Select `deploy` in the Basic tab of `Build configuration` pop-up window.

Here is an example of a build generated with deploy workflow:

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
        - google-play-deploy@1.5.1: {}
        - deploy-to-bitrise-io@1.3.15:
            inputs:
            - notify_user_groups: testers
        - cache-push@2.0.5: {}

{% include message_box.html type="important" title="Order of the steps matter!" content="

* Right after our `Do anything with Script` step, the `Install missing Android SDK components` will take care of installing the missing Android SDK components that your project might be lacking.
* `Change Android versionCode and versionName` step must be inserted BEFORE the `Android Build`step as the former makes sure you will upload the the build with the right version code to your app's marketplace.
* Android Lint and Android Unit Test steps must be inserted BEFORE the `Android Build` step to test your code and debug before building your build.
* `Sign APK` step must be AFTER the `Android Build` step as this builds your project so that you have an apk ready to be signed with the `Sign APK` step. Make sure that this step is BEFORE any deploy step (which distributes your apk to a marketplace) so that you can upload an authorized project."%}

## Deploying to bitrise.io and to a marketplace

### Deploying to bitrise.io

If your app is deployed to bitrise.io, it means that you can share the generated apk with your team members using the buil's URL. You can also check out the apk in the APPS & ARTIFACTS tab on your Build's page.

### Deploying to marketplace

If you add `Google Play Deploy` step to your workflow (before the `Cache Push` step), your signed apk will get uploaded to the playstore.

{% include message_box.html type="important" title="Make sure you are in sync with Google Play Store" content="

* [Register to Google Play Store and set up your project](/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
* Set up [Google Play API access](/tutorials/deploy/android-deployment/#set-up-google-play-api-access)
* In your Bitrise Dashboard, go to Code Signing and upload the service account JSON key into the `GENERIC FILE STORAGE.`
* Copy the env key which stores your uploaded file’s url.

  For example: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
* Go back to the Google Play Deploy step in your Workflow Editor.
* Fill out the required input fields as follows:
  * `Service Account JSON key file path`:  This field can accept a remote URL so you have to provide the  environment which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
  * `Package name`: the package name of your Android app
  * `Track`: the track where you want to deploy your APK (alpha/beta/rollout/production)"%}

{% include message_box.html type="note" title="Other deploy steps you can add to your workflow" content="Click the `+` sign on the left side of your Workflow to add a new step to your workflow and select another deploy step from our collection, for example, `Appetize.io deploy` or `Amazon Device Farm File Directory`.  "%}

You're ready to deploy!

.