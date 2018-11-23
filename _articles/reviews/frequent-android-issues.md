---
title: Frequent Android issues-draft
date: 2018-11-21 09:48:53 +0000
redirect_from: []
published: false

---
In this guide we aim to address the most frequent Android error messages and the solution(s) to them.

## "Could not find an android package" or "you have not accepted the license agreements"

### Error

    > A problem occurred configuring project ':lib'.
       > You have not accepted the license agreements of the following SDK components:
         [Google Repository].
         Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
         Alternatively, to learn how to transfer the license agreements from one workstation to another, go to http://d.android.com/r/studio-ui/export-licenses.html

or

    Could not find com.android.support:appcompat-v7:24.2.0.

### Solution 1

The above error messages mean that your build requires an Android package which is either not installed or outdated. You also have to take care of accepting those licenses agreements for the SDK tools. If the accepted license agreements and/or SDK components are missing from your project, you won't be able to build your project.

We advise you to use our `Install missing Android SDK components` and add it to your workflow. Make sure you insert this Step right before any build or test step and those steps rely on the outcome of the dependency Step. If you keep getting the same error messages despite using our `Install missing Android SDK` Step, have a look at **Solution 2** below.

### Solution 2

This solution uses our `Do anything with Script` Step. Let's see how!

1. Create an `android-licenses` directory in the root directory of your git repository.
2. Copy the license files into this directory from your computer.
3. Add a `Do anything with Script` Step **after** the `Git Clone Repository` Step.
4. Add the script to the `Script content` input field, for example.

       #!/bin/bash
       
       # fail if any commands fails
       
       set -e
       
       # debug log
       
       set -x
       
           
       
       # For newer Android SDK:
       
       sdkmanager "extras;android;m2repository"
       
       sdkmanager "extras;google;m2repository"
       
           
       
       # For older Android SDK:
       
       echo y | android update sdk --no-ui --all --filter extra-android-m2repository | grep 'package installed'
       
       echo y | android update sdk --no-ui --all --filter extra-google-m2repository | grep 'package installed'

{% include message_box.html type="info" title="List of preinstalled packages" content=" You can see which packages are preinstalled on [GitHub](https://github.com/bitrise-docker/android/blob/master/Dockerfile#L30). Feel free to send us a PR if you'd like to add a new preinstalled package! We update the preinstalled Android packages every weekend so if the error is related to an outdated package, the workaround we describe here can be removed from your build after the weekend update is completed. " %}

**In most cases you don't need both packages to be updated, so you can try to remove them one by one, but having all three in the script covers most of the cases related to this error.**

## "Cannot start android emulator"

[https://discuss.bitrise.io/t/cannot-start-android-emulator-no-error-message/4103](https://discuss.bitrise.io/t/cannot-start-android-emulator-no-error-message/4103 "https://discuss.bitrise.io/t/cannot-start-android-emulator-no-error-message/4103")

### Error

You got the above error message because either one or both of our `Create Android emulator` or `Start Android emulator` Steps has not been properly set.

### Solution

We advise you to use `AVD Manager` Step instead of having to set the `Create Android emulator` and `Start Android emulator` Steps individually. `AVD Manager` performs all the other two steps, meaning it creates and starts the emulator at the same time. If you want to control when the emulator should kick in, use our `Wait for Android emulator` Step. Check out our guide on [Emulators](/tips-and-tricks/android-tips-and-tricks/#emulators) for more information!

## "Could not find intellij-core.jar"

If you experience the following error message, it is most likely related to jcenter. You most likely have started using a more recent version of Gradle but your project has not been updated accordingly.

    Could not resolve all files for configuration ‘:classpath’.
    Could not find intellij-core.jar (com.android.tools.external.com-intellij:intellij-core:26.0.1).
    Searched in the following locations:
    https://jcenter.bintray.com/com/android/tools/external/com-intellij/intellij-core/26.0.1/intellij-core-26.0.1.jar 5

### Solution

Resolve the issue by editing the repository section of your `build.gradle` in the root of your repository so that `google()` is the first entry there.

As an example:

    repositories {
      google()
      mavenCentral()
      jcenter()
    }

## "Could not download project dependency"

### Error

The error is related to a temporary network issue at Bitray/jcenter.

### Solution

Since the issue is not related to Bitrise, we advise you to:

1. Check [Bintray jcenter](https://status.bintray.com/history)'s service status page.
2. Wait until the issue is resolved on their side.
3. Rebuild your project.

## "Keystore file ' /root/keystores/.jks' not found for signing config"

### Error

The `Sign APK` Step prints the above error message out if you have not uploaded your keystore file to the `ANDROID KEYSTORE FILE` section of the `Code Signing` tab.

### Solution

1. Upload your keystore file to the `ANDROID KEYSTORE FILE` field.
2. Set your `keystore password`, `keystore alias`, and `private key password`.
3. Rebuild your project.

Check out our [Android code signing guide](/code-signing/android-code-signing/android-code-signing-procedures/) for more information.

## "Signature mismatching" and "Invalid"

### Error

The "Signature mismatching" error implies that the app apk and the test apk have not been matched with their right variant

### Solution 

In Gradle Runner Step, you can use the `APK file include filter` and the `Test APK file include filter` step input fields to filter which apk should match with that particular filter.

### Error 

If you see the invalid error in your build log, you most probably will see a completely blank Dashboard of your app ( you cannot see any test results) You have to use the same  troubleshooting process as described above.

In Gradle Runner Step, you can use the `APK file include filter` and the `Test APK file include filter` step input fields to filter which apk should match with that particular filter.