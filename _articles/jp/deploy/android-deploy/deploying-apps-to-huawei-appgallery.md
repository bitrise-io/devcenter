---
tag: []
title: Deploying apps to Huawei AppGallery
redirect_from: []
summary: ''

---
You can deploy your Android apps to [Huawei AppGallery ](https://appgallery.huawei.com/)via a verified Bitrise Step called **Deploy to Huawei App Gallery**. The Step can be used to deploy any APK file that you build on Bitrise.

## Before using the Deploy to Huawei AppGallery Step

Before you start using the **Deploy to Huawei App Gallery** Step to deploy your apps, you need to do a couple of things:

* [Manually upload the first APK of the app to Huawei AppGallery using the website interface on AppGallery Connect.](https://developer.huawei.com/consumer/en/doc/distribution/app/agc-create_app)
* [Create a team-level API client on AppGallery Connect](https://developer.huawei.com/consumer/en/doc/distribution/app/appgallerykit-createapiclient).

![](/img/huawei_api.png)

The Step will need:

* The App ID of the app.
* The Client ID of the API client.
* The Key generated for the API client.

## Configuring deployment to Huawei AppGallery

To successfully deploy your app to Huawei AppGallery, you need a Workflow that:

* Builds and [signs an APK file](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-apk-step/).
* Includes the **Deploy to Huawei App Gallery** Step to deploy the app.

If you did not [manually upload your first APK to Huawei AppGallery](https://developer.huawei.com/consumer/en/doc/distribution/app/agc-create_app) or you did not [create a team-level API client on AppGallery Connect](https://developer.huawei.com/consumer/en/doc/distribution/app/appgallerykit-createapiclient), you won’t be able to deploy the app!

If you are not familiar with how to successfully build an Android app on Bitrise, check out our documentation: [Getting started with Android apps](/getting-started/getting-started-with-android-apps/).

To configure the **Deploy to Huawei App Gallery Step**:

1. Open the Workflow Editor on Bitrise.
2. Go to the Workflow that you want to use for deploying the app.
3. Add the **Deploy to Huawei App Gallery** Step after the Steps that build and sign your APK.

   ![](/img/huawei_step.png)
4. Open the **Config** input group.
5. Fill in the required inputs.
   * **File path**: If you used a Step that automatically exports the `BITRISE_APK_PATH` Environment Variable after building your APK, leave this unchanged. The **Android Build** Step is such a Step, for example.
   * **File name**: The unique name of the APK file. This name will be used when uploading to the AppGallery Connect.
   * **App ID**: The identified can be found in the **App information** section on AppGallery Connect.
   * **Client ID**: The API client ID generated on AppGallery Connect.
   * **Key**: The key generated with the API client on AppGallery connect.

Take a look at the following bitrise.yml file to see an example configuration that uses the **Deploy to Huawei AppGallery** Step to deploy an app.

    workflows:
      deploy:
        steps:
         - activate-ssh-key@4:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4: {}
        - cache-pull@2: {}
        - install-missing-android-tools@2:
            inputs:
            - gradlew_path: "$PROJECT_LOCATION/gradlew"
        - gradle-runner@1.9:
            inputs:
            - gradle_file: "$GRADLE_BUILD_FILE_PATH"
            - gradle_task: assembleRelease
            - gradlew_path: "$GRADLEW_PATH"
        - sign-apk@1.7: {}
        - deploy-to-bitrise-io@1: {}
        - cache-push@2: {}
        - appgallery-deploy@0:
            inputs:
            - huawei_client_id: 'XXX'
            - huawei_client_secret: "$CLIENT_SECRET"
            - huawei_app_id: 'YYY'  

Run a build! If all goes well, you should see your app on Huawei AppGallery.