---
title: Device testing for iOS
date: 2018-10-15 14:21:31 +0000
redirect_from: []
published: false

---
With Bitrise's iOS device testing solution, you can run iOS tests on physical devices without having to set up and register your own devices: you just need to use our dedicated Steps and set the device type(s) on which you want to test your app. There are no limits to using the Step, other than your overall build time limit.

Our device testing solution is based on [Firebase Test Lab](https://firebase.google.com/docs/test-lab/): it uses real, production devices running in a Google data center to test your app. The devices are flashed with updated APIs and have customizable locale settings, allowing you to road-test your app on the hardware and configurations it'll encounter in real-world use.

For iOS apps, Firebase Test Lab runs [XCTest](https://developer.apple.com/documentation/xctest) tests. 

## Enabling Device Testing 

Before you attempt to use any of our Virtual Device Testing Steps, the feature itself must be enabled for your app. 

1. Log in to [bitrise.io](https://app.bitrise.io/). 
2. Select the app on your Dashboard. 
3. Go to the `Settings` tab. 
4. Scroll down to `Device Testing` and toggle `ENABLE UI TESTS ON VIRTUAL DEVICES`. 

That's it! You are now ready to start using our Device Testing solution. 