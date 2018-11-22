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

The above error messages mean that your build requires an Android package which is either not installed or outdated. You also have to take care of accepting those licenses for the SDK tools. We recommend you to use our Android dependency manager step and our `Do anything with Script` Step. Let's see how!

1. Create an `android-licenses` directory in the root directory of your git repository.
2. Copy the license files into this directory from your computer.
3. Add a `Do anything with Script` Step after the `Git Clone Repository` Step.
4. Add the script to the `Script content` input field.

    As an example:

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

In most cases you don't need both packages to be updated, so you can try to remove them one by one, but having all three in the script covers most of the cases related to this error.

### Solution 2

This is an alternative solution for the license error. Please use the `Install missing Android SDK components` step. The section below is kept only for referencing purposes!

An alternative solution for the `You have not accepted the license agreements of the following SDK components` error message, that comes from Gradle and the Android tools, is as printed in the log:

    Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
      Alternatively, to learn how to transfer the license agreements from one workstation to another, go to http://d.android.com/r/studio-ui/export-licenses.html