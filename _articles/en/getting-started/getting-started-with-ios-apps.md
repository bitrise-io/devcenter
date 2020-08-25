---
last_modified_at: '2020-02-20'
title: Getting started with iOS apps
date: '2018-09-12T15:27:42.000+00:00'
redirect_from: []
tag:
- deploy
- getting-started
- ios
- code-signing
description: 'Go through the procedure of adding an iOS app on Bitrise from start
  to finish, from adding the app to deploying it. Learn about Xcode testing and code
  signing. '
summary: ''
menu:
  getting-started-main:
    weight: 23

---
Developing for iOS is not always easy - our aim is to make it as simple as possible for you! In this guide, we'll walk you through how to add an iOS app to [Bitrise](https://app.bitrise.io/users/sign_in), how to run Xcode tests, manage your code signing files, and deploy the app to [bitrise.io](https://www.bitrise.io) and to the App Store.

## Adding an iOS app

{% include video.html embed_url="https://www.youtube.com/embed/xa4kUQtT2NU" %}

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git provider. "%}

1. Click the **+** sign on the top menu bar and select **Add app**, which takes you to the [**Create New App**](https://app.bitrise.io/apps/add) page.
2. Choose the account you wish to add the app to.
3. Set the privacy of the app to either Private or [Public](/getting-started/adding-a-new-app/public-apps) and click **Next**.
4. Select the Git provider service that hosts your repository, then find and select your repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/connecting-a-repository).
5. When prompted to set up repository access, click **No, auto-add SSH key**.

   Read more about [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/).
6. Type the name of the branch that includes your project's configuration - master, for example - then click **Next**.
7. Wait while Bitrise is validating your project.

   We look for your configuration files and set up your app based on them. In the case of an iOS app, we're looking for your Xcode Project (`.xcodeproj`) or Xcode Workspace (`.xcworkspace`) path. Note that the validation will fail if you do not have a SHARED scheme in your project. You can still point Bitrise manually to your Xcode scheme but if it's shared, we automatically detect it for you. [Read more about schemes and the possible issues with them!](/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found)
8. Select the .ipa export method. You can modify this later - for now, select **development**.

   ![](/img/ios-scanner-1.png)

   Once you clicked it, you should see your:
   * Project or Workspace path.
   * Scheme name.
   * ipa export method.
   * iOS stack.
9. Register a [webhook](/webhooks/index/) when prompted so that Bitrise can start a build automatically when code is pushed to your repository, or a pull request is created. This also kicks off your first build - click the message and it will take you to the build page.

## Running Xcode tests

Once you created your app, the first build will run based on the automatically created **primary** workflow. You can check it out in the app's [Workflow Editor](/getting-started/getting-started-workflows): click the app's name on your [Dashboard](https://app.bitrise.io/dashboard/builds) then click the **Workflow** tab.

{% include message_box.html type="important" title="Test targets" content="If your app does not have test targets defined, the primary workflow will be the only automatically created workflow and it will NOT include the **Xcode Test for iOS** Step. "%}

If you have test targets defined, the **primary** workflow of an iOS app includes the two [Steps](/getting-started/getting-started-steps) you need to run your Xcode tests, and view their results on [bitrise.io](https://bitrise.io):

* **Xcode Test for iOS**
* **Deploy to Bitrise.io**

{% include message_box.html type="note" title="Code signing files" content="Running Xcode tests and deploying their results to Bitrise do not require any code signing files. So don't worry about them just yet!"%}

The **Xcode Test for iOS** Step runs the pre-defined Xcode tests. It has a default configuration that does not need to be modified: if the tests are written correctly, they will work. You can find the same configuration options in Xcode, too.

{% include message_box.html type="note" title="Check your Stack" content="We recommend checking that the stack selected for your app has the same Xcode version you used to build the app.

For example, if your simulator test fails with 'Ineligible destinations for the <your-app-scheme> scheme', then make sure the Xcode version in the Stack tab is correct.

You can read more about our stacks in the [Available stacks](/infrastructure/available-stacks/) guide.
"%}

The **Deploy to Bitrise.io** Step will deploy the following to the **Logs** and [**APPS & ARTIFACTS**](/builds/build-artifacts-online/) tab of the build:

* Your Xcode test results.
* Your raw `xcodebuildoutput` log.

The **Deploy to Bitrise.io** Step also exports the results of the **Xcode Test for iOS** Step to the [Test Reports](/testing/test-reports/) add-on. 

## Code signing and exporting an .ipa

To install and test the app on other physical devices, you will need to create and export an .ipa file. This requires setting up code signing. In the example, we'll be exporting an .ipa with the **development** export method: you cannot upload such an app to Testflight but you can test it, for example, on the devices of your internal testers.

{% include message_box.html type="note" title="Automatic provisioning" content=" The example procedure described here uses manual provisioning, with the **Certificate and profile installer** Step. However, Bitrise also supports [automatic provisioning](/code-signing/ios-code-signing/ios-auto-provisioning/) but it is not in the scope of this guide.
"%}

You will need:

* the automatically created **deploy** workflow.
* an iOS **Development** certificate (a .p12 certificate file).
* a **Development** type Provisioning Profile.

1. Set the code signing type of your project in Xcode to either manual or automatic (Xcode managed), and generate an .ipa locally.
2. Collect and upload the code signing files with [the codesigndoc tool](/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).

   The tool can also upload your code signing files to Bitrise - we recommend doing so! Otherwise, upload them manually: enter your [app's](https://app.bitrise.io/dashboard/builds) Workflow Editor and select the **Code signing** tab, then upload the files in their respective fields.
3. Go to your [app's](https://app.bitrise.io/dashboard/builds) Workflow Editor, and select the **deploy** workflow in the **WORKFLOW** dropdown menu in the top left corner.
4. Check that you have the **Certificate and profile installer** Step in your workflow. It must be before the **Xcode Archive & Export for iOS** Step (you can have other Steps between the two, like **Xcode Test for iOS**).
5. Check the **Select method for export** input of the **Xcode Archive & Export for iOS** Step. By default, it should be the `$BITRISE_EXPORT_METHOD` Environment Variable (Env Var). This Env Var stores the export method you selected when creating the app. If you selected **development** back then, you don't need to change the input. Otherwise, manually set it to **development**.

   ![](/img/export-method.png)
6. [Start a build](/builds/starting-builds-manually/).

If you uploaded the correct code signing files, the **Certificate and profile installer** Step should install your code signing files and the **Xcode Archive & Export for iOS** Step should export an .ipa with the development export method. If you have the **Deploy to Bitrise.io** Step in your Workflow, you can find the .ipa on the **APPS & ARTIFACTS** tab of the build page.

iOS code signing is often not this simple - read more about how [iOS code signing works on Bitrise](/code-signing/ios-code-signing/code-signing)!

## Deploying to TestFlight and the App Store

If you set up your code signing files and created an .ipa for your internal testers, it is time to involve external testers and then to publish your iOS app to the App Store. Let's see how!

To deploy to Testflight and to the App Store, you will need more code signing files:

* An iOS **Distribution** Certificate.
* An **App Store** type Provisioning Profile.

1. On your local machine, set up App Store code signing for your project in Xcode, and export an App Store .ipa.

   If this fails locally, it will definitely fail on Bitrise, too!
2. Collect and upload the code signing files with [the codesigndoc tool](/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).
3. Go to the [app's](https://app.bitrise.io/dashboard/builds) Workflow Editor and create a [new workflow](/getting-started/getting-started-workflows/): click the **+ Workflow** button, enter the name of your new workflow and in the **BASED ON** dropdown menu, select **deploy**.

   This way the new workflow will be a copy of the basic **deploy** workflow.
4. Set the **Select method for export** input of the **Xcode Archive & Export for iOS** Step to **app-store**.

   ![](/img/app-store-export-method-1.png)

   If you wish to distribute your app to external testers without uploading the app to Testflight, select **ad-hoc**. In that case, skip the next steps in the guide: you only need the **Deploy to Bitrise.io** Step in your Workflow.
5. Add the **Deploy to iTunes Connect - Application Loader** Step to your workflow, after the **Xcode Archive & Export for iOS** Step but preferably before the **Deploy to Bitrise.io** Step.
6. Provide your Apple credentials in the **Deploy to iTunes Connect - Application Loader** Step.

   The Step will need your:
   * Apple ID.
   * Password or, if you use two-factor authentication on iTunes Connect, your application password.

   Don't worry, the password will not be visible in the logs or exposed - [that's why it is marked SENSITIVE](/builds/env-vars-secret-env-vars#about-secrets).

And that's it! [Start a build](/builds/Starting-builds-manually/) - if everything went well, you should see your app on Testflight. From there, you can distribute it to external testers or release it to the App Store.

{% include banner.html banner_text="Let's add an iOS app" url="https://app.bitrise.io/apps/add" button_text="Go to Bitrise now" %}