---
title: Device testing for iOS
date: 2018-10-17 10:31:27 +0000
menu:
  testing:
    weight: 4

---
With Bitrise's iOS device testing solution, you can run iOS tests on physical devices without having to set up and register your own devices: you just need to use our dedicated Steps and set the device type(s) on which you want to test your app. There are no limits to using the Step, other than your overall build time limit.

Our device testing solution is based on [Firebase Test Lab](https://firebase.google.com/docs/test-lab/): it uses real, production devices running in a Google data center to test your app. The devices are flashed with updated APIs and have customizable locale settings. You can find the resulting logs, videos and screenshots on Bitrise.

For iOS apps, Firebase Test Lab runs [XCTest](https://developer.apple.com/documentation/xctest) tests. Find the list of the available devices [here](https://firebase.google.com/docs/test-lab/ios/available-testing-devices).

{% include message_box.html type="note" title="Limitations" content="You might be limited by your overall build time. Also note that a single build can contain only one `iOS Device Testing` Step, performing one type of test. This is because Bitrise sends the build slug to Firebase Test Lab. Sending the same build slug results in a _Build already exists_ error." %}

## Enabling Device Testing

Before you attempt to use any of our Virtual Device Testing Steps, the feature itself must be enabled for your app.

1. Log in to [bitrise.io](https://app.bitrise.io/).
2. Select the app on your Dashboard.
3. Go to the `Settings` tab.
4. Scroll down to `Device Testing` and toggle `ENABLE UI TESTS ON VIRTUAL DEVICES`.

![](/img/settings-device-testing.png)

That's it! You are now ready to start using our Device Testing solution.

## Running device tests for iOS apps

To run device tests with the Firebase Test Lab solution, you will need to add two Steps to your workflow:

* `Xcode Build for testing for iOS`
* `iOS Device Testing`

{% include message_box.html type="note" title="Beta status" content="Please note that currently, both Steps are in beta phase. They are already stable and work well but we're working on improving them!"%}

The `Xcode Build for testing for iOS` performs _xcodebuild_'s `build-for-testing` action: it builds the tests defined in your iOS project's [Xcode scheme](https://developer.apple.com/library/archive/featuredarticles/XcodeConcepts/Concept-Schemes.html). The Step exports a .zip file that contains your test directory (by default, it's _Debug-iphoneos_) and the `xctestrun` file.

The `iOS Device Testing` Step takes the path to this .zip file - exported as an Environment Variable - as input to run your tests and export the test results to Bitrise.

1. Check that you [enabled Device Testing](/testing/device-testing-for-ios/#enabling-device-testing) for the app.
2. Add the `Xcode Build for testing for iOS` Step to your workflow.

   Note that it should come AFTER the `Certificate and profile installer` Step.

   ![](/img/xcode-build-for-test.png)
3. In the `Scheme name` input, set the Xcode Scheme you want to use. By default, the value of the input is the `$BITRISE_SCHEME` [Environment Variable](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/) which is stored when your app is created.

   By default, the scheme defines which configuration - for example, Debug or Release - will be used. In the `Configuration name` input, you can define the configuration type manually.
4. Set a destination option for _xcodebuild_ in the `Device destination` input of the Step.

   The default value is `generic/platform=ios`. For the available values, call `man xcodebuild` on your local machine and check the `Destinations` section of the printout.
5. Add the `iOS Device Testing` Step to the workflow.

   The Step has to come after the `Xcode Build for testing for iOS` Step.

   ![](/img/ios-device-testing.png)
6. In the `Test devices` input field, specify the devices on which you want to test the app.

   Find the list of the available devices [here](https://firebase.google.com/docs/test-lab/ios/available-testing-devices).
7. Optionally, you can download all the files generated in the test run: under the `Debug` input group, set the `Download files` input to `true`.
8. Start a build!

If all goes well, you should be able to view your results on the Build page.

## Checking the device test results

Check out the test results of your device tests on the Build page of your app. You can view the results of the tests run on each device, and check the details of each test case. This includes:

* test cases
* video
* screenshots
* logs
* files generated during the test

![](/img/test-results.png)

1. Go to the `Build` tab of the app.
2. Go to the `DEVICE TESTS` tab.
3. Check out the test results per device.