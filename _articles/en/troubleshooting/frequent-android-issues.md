---
title: Frequent Android issues
redirect_from:
- "/android/frequent-android-issues/"
menu:
  troubleshooting:
    weight: 4

---
## Could not find an android package or you have not accepted the license agreements

### Error

    > A problem occurred configuring project ':lib'.
       > You have not accepted the license agreements of the following SDK components:
         [Google Repository].
         Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
         Alternatively, to learn how to transfer the license agreements from one workstation to another, go to http://d.android.com/r/studio-ui/export-licenses.html

or

    Could not find com.android.support:appcompat-v7:24.2.0.

### Solution

**Please use the** `Install missing Android SDK components` **Step. The section below is kept only for referencing purposes!**

The error means that your build requires an Android package which is either not (yet) preinstalled
(_you can see which packages are preinstalled_ [_here, on GitHub_](https://github.com/bitrise-docker/android/blob/master/Dockerfile#L30)_ -
feel free to send us a Pull Request if you'd want to add a new preinstalled package!_),
**or outdated**.

The solution is quite simple, you just have to install/update the related package(s).
To do that add a `Script` step to your workflow -
should be before the step where you get the error, it can be the very first step in the workflow -
with the following content:

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

In most cases you don't need both packages to be updated, so you can try to remove them one
by one, but having all three in the script covers most of the cases related to this error.

{% include message_box.html type="note" title="We update the preinstalled Android packages every weekend" content=" So if the error is related to an outdated package, the workaround we describe here can be removed from your build after the weekend update is completed. "%}

### Alternative solution for the license error

**Please use the** `Install missing Android SDK components` **step. The section below is kept only for referencing purposes!**

An alternative solution for the `You have not accepted the license agreements of the following SDK components`
error, as printed in the log:

    Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
      Alternatively, to learn how to transfer the license agreements from one workstation to another, go to http://d.android.com/r/studio-ui/export-licenses.html

You can find more info at the link printed in the log ([http://d.android.com/r/studio-ui/export-licenses.html](http://d.android.com/r/studio-ui/export-licenses.html)),
but in short this can be done by:

**Locate the licenses on your Mac/PC**:

> If you have accepted the license agreements on one workstation, but wish to build your projects on a different one,
> you can export your licenses by copying the accepted licenses folder from the Android Sdk Home
> folder (this should be located at `<android sdk home path>/licenses`) of your current workstation,
> to the Android Sdk Home directory of the machine where you now want to build your projects.

**Create an** `android-licenses` **directory in the root directory of your git repository**,
and copy the license files into this directory,
then in your Workflow copy the licenses to the right location using a `Script` step.

**Add the** `Script` **step right after the** `Git Clone` **step** (that's when your code is available
on the build virtual machine), with the content:

    #!/bin/bash
    # fail if any commands fails
    set -e
    # debug log
    set -x
    
    rsync -avhP ./android-licenses/ "$ANDROID_HOME/licenses/"

That's all, this script copies the licenses from the `android-licenses` (from your repository)
into the system's Android SDK Home path under `licenses` directory.

## Installing an additional Android package

Please see [this section](/tips-and-tricks/android-tips-and-tricks/#how-to-install-an-additional-android-sdk-package).