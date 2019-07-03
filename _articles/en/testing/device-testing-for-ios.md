---
title: Device testing for iOS
date: '2018-10-17T10:31:27.000+00:00'
tag:
- testing
- ios
- firebase
summary: 'With Bitrise''s iOS device testing solution, you can run iOS tests on physical
  devices without having to set up and register your own devices: you just need to
  use our dedicated Steps and set the device type(s) on which you want to test your
  app. '
redirect_from: []
menu:
  testing-main:
    weight: 11

---
With Bitrise's iOS device testing solution, you can run iOS tests on physical devices without having to set up and register your own devices: you just need to use our dedicated Steps and set the device type(s) on which you want to test your app. There are no limits to using the Step, other than your overall build time limit.

Our device testing solution is based on [Firebase Test Lab](https://firebase.google.com/docs/test-lab/): it uses real, production devices running in a Google data center to test your app. The devices are flashed with updated APIs and have customizable locale settings. You can find the resulting logs, videos and screenshots on Bitrise.

For iOS apps, Firebase Test Lab runs [XCTest](https://developer.apple.com/documentation/xctest) tests. Find the list of the available devices [here](https://firebase.google.com/docs/test-lab/ios/available-testing-devices).

{% include message_box.html type="note" title="Limitations" content="You might be limited by your overall build time. Also note that a single build can contain only one **iOS Device Testing** Step, performing one type of test. This is because Bitrise sends the build slug to Firebase Test Lab. Sending the same build slug results in a `Build already exists` error." %}

## Running device tests for iOS apps

To run device tests with the Firebase Test Lab solution, you will need to add two Steps to your Workflow:

* **Xcode Build for testing for iOS**
* **iOS Device Testing**

{% include message_box.html type="note" title="Beta status" content="Please note that currently, both Steps are in beta phase. They are already stable and work well but we're working on improving them!"%}

The **Xcode Build for testing for iOS** performs the `xcodebuild` command's `build-for-testing` action: it builds the tests defined in your iOS app's [Xcode scheme](https://developer.apple.com/library/archive/featuredarticles/XcodeConcepts/Concept-Schemes.html). The Step exports a .zip file that contains your test directory (by default, it's `Debug-iphoneos`) and the `xctestrun` file.

To use this Step, you will need code signing files for the test app: we recommend [using codesigndoc to export the necessary files]()!

The **iOS Device Testing** Step takes the path to this .zip file - exported as an Environment Variable - as input to run your tests and export the test results to Bitrise.

1. Check that you [enabled Device Testing](/testing/device-testing-for-ios/#enabling-device-testing) for the app.
2. Add the **Xcode Build for testing for iOS** Step to your Workflow.

   Note that it should come AFTER the **Certificate and profile installer** Step.

   ![](/img/xcode-build-for-test.png)
3. In the **Scheme name** input, set the Xcode Scheme you want to use. By default, the value of the input is the `$BITRISE_SCHEME` [Environment Variable](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/) which is stored when your app is created.

   By default, the scheme defines which configuration - for example, Debug or Release - will be used. In the **Configuration name** input, you can define the configuration type manually.
4. Set a destination option for `xcodebuild` in the **Device destination** input of the Step.

   The default value is `generic/platform=ios`. For the available values, call `man xcodebuild` on your local machine and check the `Destinations` section of the printout.
5. Add the **iOS Device Testing** Step to the Workflow.

   The Step has to come after the **Xcode Build for testing for iOS** Step.

   ![](/img/test-devices-1.png)
6. In the **Test devices** input field, specify the devices on which you want to test the app.

   Find the list of the available devices [here](https://firebase.google.com/docs/test-lab/ios/available-testing-devices).
7. Make sure you have the **Deploy to Bitrise.io** Step in your Workflow, with version 1.4.1 or newer.

   With the older versions of the Step, you won't be able to check your results on the **Test Reports** page!
8. Start a build!

If all goes well, you should be able to view your results on the Build page.

## Checking the device test results

Check out the test results of your device tests on the **Test Reports** page. You can view the results of the tests run on each device, and check the details of each test case. This includes:

* Test cases
* Video
* Screenshots
* Logs
* Files generated

To view the test results:

1. Click the **Builds** tab of the app and select the build that ran the tests.
2. Under the build status, click **See more** next to the **Test reports** label.

This takes you to the **Test Reports** page. Check out our [Test Reports guide](/testing/test-reports/) to find out more about using it to analyze your test results.

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Test an iOS device with Bitrise</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>