
## Could not find an android package or you have not accepted the license agreements

### Error

```
> A problem occurred configuring project ':lib'.
   > You have not accepted the license agreements of the following SDK components:
     [Google Repository].
     Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
     Alternatively, to learn how to transfer the license agreements from one workstation to another, go to http://d.android.com/r/studio-ui/export-licenses.html
```

or

```
Could not find com.android.support:appcompat-v7:24.2.0.
```

### Solution

The error means that your build requires an Android package which is either not (yet) preinstalled
(_you can see which packages are preinstalled [here, on GitHub](https://github.com/bitrise-docker/android/blob/master/Dockerfile#L30) -
feel free to send us a Pull Request if you'd want to add a new preinstalled package!_),
__or outdated__.

The solution is quite simple, you just have to install/update the related package(s).
To do that add a `Script` step to your workflow -
should be before the step where you get the error, it can be the very first step in the workflow -
with the following content:

```
#!/bin/bash
# fail if any commands fails 
set -e 
# debug log 
set -x

# write your script here 
echo y | android update sdk --no-ui --all --filter extra-android-support | grep 'package installed' 
echo y | android update sdk --no-ui --all --filter extra-android-m2repository | grep 'package installed'
echo y | android update sdk --no-ui --all --filter extra-google-m2repository | grep 'package installed' 
```

In most cases you don't need all three packages to be updated, so you can try to remove them one
by one, but having all three in the script covers most of the cases related to this error.


!!! note "We update the preinstalled Android packages on every weekend"
    so if the error is related to an outdated package, the workaround
    we describe here can be removed from your build after that weekend's update.
