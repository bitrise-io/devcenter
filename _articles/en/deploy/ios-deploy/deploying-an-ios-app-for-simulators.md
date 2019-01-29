---
title: Deploying an iOS app for simulators
date: 2018-11-10 14:34:02 +0000
menu:
  ios-deploy:
    weight: 5

---
You can build and deploy your iOS application to a simulator, to show it off in a browser, for example. On Bitrise, we have [a dedicated Step](https://www.bitrise.io/integrations/steps/xcode-build-for-simulator) to build for a simulator: the `Xcode build for simulator` Step runs the `xcodebuild` command with an iOS simulator destination and generates an .app file.

The .app file can be run on any simulator. On Bitrise, we have a Step to upload your app to Appetize.io: the `Appetize.io deploy` Step. With this Step, you can deploy your app so you can run it in a browser.

To build the app for a simulator, you do not need code signing files!

### Building an app for a simulator

1. Log in and open the app's Workflow Editor.
2. Add the `Xcode build for simulator` Step to your workflow.

   The Step should be after the Steps that install dependencies, such as `Run Cocoapods install`.
3. Fill in the required inputs for the Step.

   ![](/img/build-for-simulator.png)
   * **Project (or Workspace) path**: the path to your project's `.xcodeproj` or `.xworkspace` file. By default, this is stored in an Environment Variable when you add your app to Bitrise.
   * **Scheme name**: the Xcode scheme of your project. By default, this is stored in an Environment Variable when you add your app to Bitrise.
   * **Simulator**: the type of device you want to run the app on. Set it exactly as it appears in the device selection menu in Xcode.
   * **OS version**: the version of device operating system you want to run the app on. The default value is `latest`.
   * **Platform**: the platform you want to run the app on. The default value is `iOS`. Make sure that the values of the Simulator input and the Platform input are compatible: for example, if you set Simulator to `Apple TV 1080p`, set Platform to `tvOS`.

The Step will produce the following outputs:

* `BITRISE_APP_DIR_PATH`: the path to the generated .app file.
* `BITRISE_APP_DIR_PATH_LIST`: the path to the generated .app file and the paths to every dependent target app. The paths are separated with the `|` character.
* `BITRISE_XCODE_BUILD_RAW_RESULT_TEXT_PATH`: the path to the log file of the raw build results.

### Deploying the app to Appetize.io

An .app file built with our `Xcode build for simulator` Step works with just about any simulator. But if you want to easily and quickly integrate it to a simulator that allows you to run your app in a browser, we recommend using the `Appetize.io deploy` Step. It uploads your app to Appetize.io and provides a public URL to use the app in a browser.

1. Request an Appetize.io API token.
2. Log in and open the app's Workflow Editor.
3. Add and configure the `Xcode build for simulator` Step to your workflow.
4. Add the `Appetize.io deploy` Step to your workflow.

   ![](/img/appetize-deploy.png)
5. Add the Appetize.io API token to the `Appetize.io token` input.
6. Enter the path to the .app file to the `Application path` input. The easiest solution is to use the `BITRISE_APP_DIR_PATH_LIST` Environment Variable that is an output of the `Xcode build for simulator` Step. Optionally, you can also enable verbose logging for more efficient debugging.

The `Appetize.io deploy` Step will produce one output: the `APPETIZE_APP_URL` Environment Variable. it is a public URL where you can access your app. Enjoy showing it off!