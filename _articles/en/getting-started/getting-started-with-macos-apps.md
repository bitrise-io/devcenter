---
title: Getting started with MacOS apps
date: 2018-11-16 11:51:09 +0000
menu:
  getting-started:
    weight: 15

---
In this guide, we'll walk you through how to add a MacOS app to Bitrise, how to run Xcode tests, manage your code signing files and deploy the app to bitrise.io and to the App Store.

## Adding a MacOS app

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io/) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider. "%}

1. Click the `+` sign on the top menu bar and select `Add app`.
2. On the Create new App page, choose the account you wish to add the app to.
3. Set the privacy of the app to either Private or [Public](https://app.forestry.io/getting-started/adding-a-new-app/public-apps) and click `Next`.
4. Select the Git hosting service that hosts your repository, then find and select your repository that hosts the project. Read more about [connecting your repository](https://app.forestry.io/getting-started/adding-a-new-app/connecting-your-repository).
5. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](https://app.forestry.io/getting-started/adding-a-new-app/setting-up-ssh-keys/).
6. Type the name of the branch that includes your project's configuration - master, for example - then click `Next`.
7. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them.

   **IMPORTANT**: the validation will fail if you do not have a SHARED scheme in your project. You can still point Bitrise manually to your Xcode scheme but if it's shared, we automatically detect it for you. [Read more about schemes and the possible issues with them!](https://app.forestry.io/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found)
8. Select the export method. You can modify this later - for now, select `development`.

   ![](/img/project-build-config-macos.png)

   Once you clicked it, you should see your:
   * Project or Workspace path
   * Scheme name
   * export method
   * MacOS stack
9. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository, or a pull request is created. This also kicks off your first build - click the message and it will take you to the build page.

## Running Xcode tests

Once you created your app, the first build will run based on the automatically created **primary** workflow. You can check it out in the app's [Workflow Editor](https://app.forestry.io/getting-started/getting-started-workflows): click the app's name on your Dashboard then click the `Workflow` tab.

{% include message_box.html type="important" title="Test targets" content="If your app does not have test targets defined, the primary workflow will be the only automatically created workflow and it will NOT include the `Xcode Test for Mac` Step. "%}

If you have test targets defined, the `primary` workflow of a MacOS app includes the two [Steps](https://app.forestry.io/getting-started/getting-started-steps) you need to run your Xcode tests, and view their results on [bitrise.io](https://bitrise.io/):

* `Xcode Test for Mac`
* `Deploy to Bitrise.io`

{% include message_box.html type="note" title="Code signing files" content="Running Xcode tests and deploying their results to Bitrise do not require any code signing files. So don't worry about them just yet!"%}

The `Xcode Test for Mac` step runs the pre-defined Xcode tests. It has a default configuration that does not need to be modified: if the tests are written correctly, they will work. You can find the same configuration options in Xcode, too.

The `Deploy to Bitrise.io` will deploy the following to the `Logs` and [Apps & Artifacts](https://app.forestry.io/builds/build-artifacts-online/) tab of the build:

* your Xcode test results
* your raw `xcodebuildoutput` log.

## Code signing and exporting a MacOS app

To install and test the app on other physical devices, you will need to create and export an .app or .pkg file. This requires setting up code signing. In the example, we'll be exporting an app with the `development` export method: you cannot upload such an app to Testflight but you can test it, for example, on the devices of your internal testers.

{% include message_box.html type="note" title="Automatic provisioning" content=" The example procedure described here uses manual provisioning, with the `Certificate and profile installer` Step. However, Bitrise also supports [automatic provisioning](https://app.forestry.io/code-signing/ios-code-signing/ios-auto-provisioning/) but it is not in the scope of this guide. "%}

You will need:

* the automatically created `deploy` workflow
* a **Development** certificate (a .p12 certificate file)
* a **Development** type Provisioning Profile. For a MacOS project, the file extension of the provisioning profile is _.provisionprofile_.

1. Set the code signing type of your project in Xcode to either manual or automatic (Xcode managed), and generate the package file locally.
2. Collect and upload the code signing files with [the codesigndoc tool](https://app.forestry.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).

   The tool can also upload your code signing files to Bitrise - we recommend doing so! Otherwise, upload them manually: enter the Workflow Editor and select the `Code signing` tab, then upload the files in their respective fields.
3. Go to your app's Workflow Editor, and select the `deploy` workflow in the `WORKFLOW` dropdown menu in the top left corner.
4. Check that you have the `Certificate and profile installer` Step in your workflow. It must be before the `Xcode Archive for Mac` Step (you can have other Steps between the two, like `Xcode Test for Mac`).
5. Check the `Export method` input under the `app/pkg export configs` input group of the `Xcode Archive for Mac` Step.

   If you selected `development` when you added the app to Bitrise, you don't need to change the input. Otherwise, manually set it to `development`.

   ![/img/macos-archive.png](https://app.forestry.io/sites/yv69yaruhkt48w/body-media//img/macos-archive.png)
6. [Start a build](https://app.forestry.io/builds/starting-builds-manually/).

If you uploaded the correct code signing files, the `Certificate and profile installer` Step should install your code signing files and the `Xcode Archive for Mac` Step should export an .app or .pkg file with the development export method. If you have the `Deploy to Bitrise.io` Step in your workflow, you can find the binary package file on the `Apps & Artifacts` tab of the build page.

## Deploying to the App Store

If you set up your code signing files and created an .app or .pkg file for your internal testers, it is time to involve external testers and then to publish your MacOS app to the App Store. Let's see how!

{% include message_box.html type="note" title="Developer ID" content="If you want to distribute your app outside the App Store, you can sign it with [a Developer ID](https://developer.apple.com/support/developer-id/). This method is not in the scope of this guide but on Bitrise, it works the same way: you just need to upload the appropriate code signing files."%}

To deploy to the App Store, you will need more code signing files:

* a **Mac App** **Distribution** Certificate
* a **Mac** **Installer Distribution** certificate

1. On your local machine, set up App Store code signing for your project in Xcode, and export an .app or .pkg file. If this fails locally, it will definitely fail on Bitrise, too!
2. Collect and upload the code signing files with [the codesigndoc tool](https://app.forestry.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).
3. Go to the app's Workflow Editor and create a [new workflow](https://app.forestry.io/getting-started/getting-started-workflows/): click the `+ Workflow` button, enter the name of your new workflow and in the **BASED ON** dropdown menu, select `deploy`. This way the new workflow will be a copy of the basic `deploy` workflow.
4. Set the `Export Method` input of the `Xcode Archive for Mac` Step to `app-store`.

   You can export multiple binaries with different export methods: use the `Export macOS Xcode archive` Step in your workflow.
5. Add the `Deploy to iTunes Connect - Application Loader` Step to your workflow, after the `Xcode Archive for Mac` Step but preferably before the `Deploy to Bitrise.io` Step.
6. Provide your Apple credentials in the `Deploy to iTunes Connect - Application Loader` Step.

   The Step will need your:
   * Apple ID
   * password or, if you use two-factor authentication on iTunes Connect, your application password.

   Don't worry, the password will not be visible in the logs or exposed - [that's why it is marked SENSITIVE](https://app.forestry.io/builds/env-vars-secret-env-vars#about-secrets).

And that's it! Start a build - if everything went well, you should see your app on Testflight. From there, you can distribute it to external testers or release it to the App Store.