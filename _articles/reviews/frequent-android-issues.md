---
title: Frequent Android issues-draft
date: 2018-11-21 09:48:53 +0000
redirect_from: []
published: false

---
In this guide we aim to address the most frequent Android error messages and the solution(s) to them.

## Could not find an android package or you have not accepted the license agreements

### Error

You can get following error message when

    > A problem occurred configuring project ':lib'.
       > You have not accepted the license agreements of the following SDK components:
         [Google Repository].
         Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
         Alternatively, to learn how to transfer the license agreements from one workstation to another, go to http://d.android.com/r/studio-ui/export-licenses.html

or

    Could not find com.android.support:appcompat-v7:24.2.0.

### Solution 1

The above error message means that your build requires an Android package which is either not preinstalled yet or outdated. The solution is to install the missing Android package(s) or update the current ones.

1. Add the `Install missing Android SDK components` Step to your workflow.
2. To do that add a `Do anything with Script` Step to your workflow. The step should be before the step where you got the above error or even the very first step in the workflow - with the following content:

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

{% include message_box.html type="info" title="List of preinstalled packages" content=" You can see which packages are preinstalled on GitHub. Feel free to send us a PR if you'd like to add a new preinstalled package!" %}

In most cases you don't need both packages to be updated, so you can try to remove them one by one, but having all three in the script covers most of the cases related to this error.

{% include message_box.html type="note" title="We update the preinstalled Android packages every weekend" content=" So if the error is related to an outdated package, the workaround we describe here can be removed from your build after the weekend update is completed. "%}

### Solution 2

**This is an alternative solution for the license error. Please use the** `Install missing Android SDK components` **step. The section below is kept only for referencing purposes!**

An alternative solution for the `You have not accepted the license agreements of the following SDK components` error message is as printed in the log:

    Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
      Alternatively, to learn how to transfer the license agreements from one workstation to another, go to http://d.android.com/r/studio-ui/export-licenses.html

Let's see the steps:

1. Locate the licenses on your Mac/PC.

   If you have accepted the license agreements on one workstation, but wish to build your projects on a different one, you can export your licenses by copying the accepted licenses folder from the Android SDK Home folder (this should be located at `<android sdk home path>/licenses`) of your current workstation to the Android SDK Home directory of the machine where you now want to build your projects.
2. Create an `android-licenses` directory in the root directory of your git repository.
3. Copy the license files into the `android-licenses` directory.
4. In your Workflow copy the licenses to the right location using a `Do anything with Script` step.
5. Add the `Do anything with Script` step right after the `Git Clone` step (that's when your code is available on the build virtual machine), with the content:

    #!/bin/bash
    # fail if any commands fails
    set -e
    # debug log
    set -x
    
    rsync -avhP ./android-licenses/ "$ANDROID_HOME/licenses/"

This script copies the licenses from the `android-licenses` (from your repository) into the system's Android SDK Home path under `licenses` directory.

For more information on how to how to install additional Android package, check out [this guide](/tips-and-tricks/android-tips-and-tricks/#how-to-install-an-additional-android-sdk-package).