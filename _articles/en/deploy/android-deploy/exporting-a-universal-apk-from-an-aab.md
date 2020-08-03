---
tag:
- gradle
- android
- deploy
title: Exporting a universal APK from an AAB
redirect_from: []
summary: ''
menu:
  android-deploy:
    weight: 8

---
You can test an Android app on a test device even if the generated artifact is an App Bundle (`.aab`). With the **Export Universal APK** Step you can export a universal APK from the App Bundle, sign it with a keystore (or debug keystore), and deploy the APK to your test device before releasing the app to the Google Play Store.

## Configuring the Step

Configuring this Step is super simple:

1. Insert the **Export Universal APK** Step after the **Android Build** Step in your Workflow.
2. The **Android App Bundle path** input field is automatically filled out by the output of the previous build Step.
3. The **Keystore URL** is automatically filled out based on the uploaded keystore file on the **Code Signing** tab.
4. If you have already uploaded a keystore file to the **Code Signing** tab, the **Keystore alias**, **Keystore password**, and **Private key password** inputs are already populated with secret Environment Variables.
5. You can override the default Bundletool version if you need a specific one but make sure you use the [correct version](https://github.com/google/bundletool/releases "https://github.com/google/bundletool/releases").
6. Run your Workflow.

The Export Universal APK Step exports the APK to the `$BITRISE_APK_PATH` Environment Variable which the next Steps can pick up, or the Ship add-on if the **Deploy to Bitrise.io** Step is included in your Workflow.