---
title: Registering a test device
menu:
  testing:
    weight: 1

---
## Register an iOS device using Safari

The most comfortable way to register your iOS test device on [bitrise.io](https://www.bitrise.io) is to open [bitrise.io](https://www.bitrise.io) with Safari so that we can open your device's Settings and create a temporary profile to get your Unique Device Identifier (UDID). This way you don't have to look for it and manually copy/paste it.

 1. Open Safari in **non-incognito mode** on your iOS device and log into [bitrise.io](https://www.bitrise.io).
 2. Go to your `Profile`.
 3. Tap `Account Settings`.
 4. Tap `Test devices` on the left.
 5. Tap `Register this device`.
 6. In the pop-up window, Tap `Allow` so that [bitrise.io](https://www.bitrise.io) can show your configuration profile.
 7. Tap `Install` when the `Install Profile` dialog appears.
 8. Enter your devices's passcode.
 9. Tap `Install` on the `Install Profile` again.
    Now you can see your UDID and your iOS device name in the `Register device` dialog.
10. Tap `Register device`.
11. Register this test device to the [Apple Developer Portal](https://developer.apple.com/) with the correct provisioning profile added to your device or use our [Auto Provisioning](/code-signing/ios-code-signing/ios-auto-provisioning) step with enabling profile generation.

If you go back to `Test devices`, you can see the registered device:

![Screenshot](/img/adding-a-new-app/ios-device.jpg)

You can delete the registered device any time if you click on the `x` icon.

## Register a test device manually

1. Go to your `Profile` on [bitrise.io](https://www.bitrise.io).
2. Click `Test devices` on the left.
3. Click on `Register manually`.
4. In the `Register device` dialog, fill out the `Title` field and the `Identifier` field with your device's UDID.
5. Hit `Register Device`.

   You can **get your UDID** if you plug your device into a computer, and open iTunes. Under `Summary`, you should see a Serial Number. If you click on it, it will reveal your device's `UDID` which you can paste into the `Identifier` field on our [Test Devices](https://www.bitrise.io/me/profile#/test_devices).
6. Register this test device to the [Apple Developer Portal](https://developer.apple.com/) with the correct provisioning profile added to your device or use our [Auto Provisioning](/code-signing/ios-code-signing/ios-auto-provisioning) step with enabling profile generation.

Now you can see your registered test device under [Registered test devices](https://www.bitrise.io/me/profile#/test_devices).

You can remove this registered device any time if you click the orange `x` icon.