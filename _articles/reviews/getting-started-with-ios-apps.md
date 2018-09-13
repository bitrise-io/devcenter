---
title: Getting started with iOS apps
date: 2018-09-12 15:27:42 +0000
redirect_from: []
published: false

---
## Adding an iOS app

 1. Click the `+` sign on the top menu bar and select `Add app`.
 2. On the Create new App page, choose the account you wish to add the app to.
 3. Set the privacy of the app to either `Private` or `[Public](/getting-started/adding-a-new-app/public-apps)` and click `Next`.
 4. Select the Git hosting service that hosts your repository, then find and select your repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/connecting-your-repository).
 5. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/).
 6. Type the name of the branch that includes your project's configuration - master, for example - then click `Next`.
 7. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them. In the case of an iOS app, we're looking for your Xcode Project (`.xcodeproj`) or Xcode Workspace (`.xcworkspace`) path.

    **IMPORTANT**: the validation will fail if you do not have a SHARED scheme in your project. You can still point Bitrise manually to your Xcode scheme but if it's shared, we automatically detect it for you.
 8. Select the .ipa export method. You can modify this later - for now, select `development`. You should see your:
    * Project or Workspace path
    * Scheme name
    * ipa export method
    * iOS stack
 9. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository. This also kicks off your first build - click the message and it will take you to the build page.
10. Test.

## Running Xcode tests

Once you created your app, the first build will run based on the automatically created **primary** workflow. You can check it out in the app's [Workflow Editor](/getting-started/getting-started-workflows): click the app's name on your Dashboard then click the `Workflow` tab.

The `primary` workflow of an iOS app includes the two [Steps](/getting-started/getting-started-steps) you need to run your Xcode tests, and view their results on [bitrise.io](https://bitrise.io):

* `Xcode Test for iOS`
* `Deploy to Bitrise.io`

{% include message_box.html type="note" title="Code signing files" content="Running Xcode tests and deploying their results to Bitrise do not require any code signing files. So don't worry about them just yet!"%}

The `Xcode Test for iOS` step runs the pre-defined Xcode tests. It has a default configuration that does not need to be modified: if the tests are written correctly, they will work. You can find the same configuration options in Xcode, too.

The `Deploy to Bitrise.io` will deploy the following to the logs and [apps & artifacts](/builds/build-artifacts-online/) page of the build:

* your Xcode test results
* your raw `xcodebuildoutput` log.

## Code signing

To install and test the app on other physical devices, you will need to create and export an .ipa file. This requires setting up code signing. In the example, we'll be exporting an .ipa with the `development` export method: you cannot upload such an app to Testflight but you can test it, for example, on the devices of your internal testers. 

You will need: 

- the automatically created `deploy` workflow
- an iOS Development certificate (a .p12 certificate file)
- a __Development__ type Provisioning Profile

1. Enable the `Automatically manage signing` option in Xcode and generate an .ipa locally. This will generate the required code signing files, too. 	

1. Collect and upload the code signing files with [the codesigndoc tool](/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).

	The tool can also upload your code signing files to Bitrise - we recommend doing so! Otherwise, upload them manually: enter the Workflow Editor and select the `Code signing` tab, then upload the files in their respective fields.
    
1. Go to your app's Workflow Editor, and select the `deploy` workflow in the `WORKFLOW` dropdown menu in the top left corner. 

1. Check the `Select method for export` input of the `Xcode Archive & Export for iOS` Step. By default, it should be the `$BITRISE_EXPORT_METHOD` environment variable.