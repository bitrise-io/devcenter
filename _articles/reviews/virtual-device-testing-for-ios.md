---
title: Device testing for iOS
date: 2018-10-15 14:21:31 +0000
redirect_from: []
published: false

---
With Bitrise's iOS device testing solution, you can run iOS tests on physical devices without having to set up and register your own devices: you just need to use our dedicated Steps and set the device type(s) on which you want to test your app. There are no limits to using the Step, other than your overall build time limit.

Our device testing solution is based on [Firebase Test Lab](https://firebase.google.com/docs/test-lab/): it uses real, production devices running in a Google data center to test your app. The devices are flashed with updated APIs and have customizable locale settings. You can find the resulting logs, videos and screenshots on Bitrise.

For iOS apps, Firebase Test Lab runs [XCTest](https://developer.apple.com/documentation/xctest) tests.

## Enabling Device Testing

Before you attempt to use any of our Virtual Device Testing Steps, the feature itself must be enabled for your app.

1. Log in to [bitrise.io](https://app.bitrise.io/).
2. Select the app on your Dashboard.
3. Go to the `Settings` tab.
4. Scroll down to `Device Testing` and toggle `ENABLE UI TESTS ON VIRTUAL DEVICES`.

That's it! You are now ready to start using our Device Testing solution.

## Running device tests for iOS apps

To run device tests with our Firebase Test Lab solution, you will need to add two Steps to your workflow:

* `Build for Xcode Testing`
* `iOS Device Testing`

The `Build for Xcode Testing` performs xcodebuild's `build-for-testing` action: it builds the tests defined in your iOS project's [Xcode scheme](https://developer.apple.com/library/archive/featuredarticles/XcodeConcepts/Concept-Schemes.html). The Step exports a .zip file that contains your test directory (by default, it's _Debug-iphoneos_) and the `xctestrun` file. 

The `iOS Device Testing` Step takes the path to this .zip file - exported as an Environment Variable - as input to run your tests and export the test results to Bitrise.

1. Check that you [enabled Device Testing](/testing/virtual-device-testing-for-ios/#enabling-device-testing) for the app. 
2. 