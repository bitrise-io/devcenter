---
title: Running Detox tests on Bitrise
redirect_from: []
date: '2019-03-01T12:43:19.000+00:00'
tag: []
description: ''
summary: ''
menu:
  testing-main:
    weight: 20

---
Detox is a gray box end-to-end tests and automation library for mobile apps built with React Native. It supports both iOS and Android apps. If you have a React Native app on Bitrise, you can run Detox tests.

To see an example configuration, check out [our sample app](https://github.com/bitrise-samples/sample-project-react-native)!

## Before you start

Running Detox requires:

* A Mac with a macOS (El Capitan 10.11 or newer version).
* Xcode 8.3 or newer version with Xcode command line tools.
* A working React Native app.

[Install and set up Detox for your project](https://github.com/wix/detox/blob/master/docs/Introduction.GettingStarted.md#getting-started). You will need to install Homebrew, Node.js and applesimutils, as well as the Detox command line tools. Add Detox to your project and then create and run Detox tests locally. If you have an Android app, go through [this guide](https://github.com/wix/Detox/blob/master/docs/Introduction.Android.md) after the initial setup process.

Once you are done, you can test your Detox-configured project on Bitrise.

## Running a Detox test

1. Create a [release device configuration]() inside `package.json` under the `detox` section.

   **Example:**

       "detox": {
        "configurations": {
          "ios.sim.debug": {
            "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/SampleProjectReactNative.app",
            "build": "xcodebuild -project ios/SampleProjectReactNative.xcodeproj -scheme SampleProjectReactNative -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build -UseNewBuildSystem=NO",
            "type": "ios.simulator",
            "name": "iPhone 8"
          },
          "ios.sim.release": {
            "binaryPath": "ios/build/Build/Products/Release-iphonesimulator/SampleProjectReactNative.app",
            "build": "xcodebuild -project ios/SampleProjectReactNative.xcodeproj -scheme SampleProjectReactNative -configuration Release -sdk iphonesimulator -derivedDataPath ios/build -UseNewBuildSystem=NO",
            "type": "ios.simulator",
            "name": "iPhone 8"
          }
        },
2. On [bitrise.io](https://app.bitrise.io/), go to your project and open the Workflow Editor.
3. Switch to the Workflow you want to use.
4. Add a **Run npm command** Step to your Workflow.
5. Add the Detox install command to the **The npm command with arguments to run** input:

       install -g detox-cli
6. Install a test runner.

   For example, [our sample app](https://github.com/bitrise-samples/sample-project-react-native) uses `mocha`, installed with the `yarn` Step. To install yarn dependencies, just set the **The yarn command to run** input's value to `install`.
7. Add a **Script** Step to install the necessary utilities and then run Detox.

       #!/bin/bash
       
       # applesimutils is a collection of utils for Apple simulators
       brew tap wix/brew
       brew install applesimutils
       
       # we are building and testing a release device configuration
       detox build --configuration ios.sim.release
       detox test --configuration ios.sim.release --cleanup

   You can, of course, put each of these commands in separate Script Steps, for the sake of modularity.
8. Run a build!

If the build fails, check out our example `bitrise.yml` file:

    ---
    workflows:
      primary:
        steps:
        - activate-ssh-key: {}
        - git-clone:
            inputs:
            - clone_depth: ''
            title: Git Clone Repo
        - yarn@0.0.8:
            inputs:
            - command: install
        - npm@1.0.1:
            inputs:
            - command: install -g detox-cli
            title: Install Detox CLI
        - script@1.1.5:
            inputs:
            - content: |-
                #!/bin/bash
                brew tap wix/brew
                brew install applesimutils
                
                detox build --configuration ios.sim.release
                detox test --configuration ios.sim.release --cleanup
            title: Detox - Build and Test Release App
        - deploy-to-bitrise-io@1.3.18: {}

## Troubleshooting Detox tests

If you run into issues with using Detox on Bitrise, we recommend trying to rebuild the entire Detox package before running the test.

To do so, run the following command in your Bitrise build:

```bash
npm rebuild detox
```

If your Detox tests still fail or hang, contact our support!

{% include banner.html banner_text="Let's run some Detox tests" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}