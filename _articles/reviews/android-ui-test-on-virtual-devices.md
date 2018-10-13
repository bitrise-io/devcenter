---
title: Android UI test on virtual devices
date: 2018-10-13 08:39:08 +0000
redirect_from: []
published: false

---
## Enable UI tests on virtual devices

Turn on `Device Testing` on the app's `Settings` tab.

1. Toggle the switch to the right.
2. Add the Virtual Device Testing step to your primary workflow.
3. Check results from the build's page under `APPS & ARTIFACTS`.

   ![](/img/android-vdt-turn-on.jpg)

## Modify your primary workflow

1. Add `Gradle Runner` Step after testing steps before the deploy tests. 
2. Add an extra task; `assembleDebugAndroidTest`, to the `Gradle task to run` step input field.
3. Add '[BETA] Virtual Device Testing for Android` Step after `Gradle Runner` Step.