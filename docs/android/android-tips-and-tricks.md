## What are Gradle tasks and how can I get the list of available tasks in my project?

A `gradle` task is a process you can run with `gradle`.
You can run these tasks by running `gradle TASK-TO-RUN` in your Command Line / Terminal.

A standard Android Gradle project includes a lot of tasks by default, things like:

* `androidDependencies - Displays the Android dependencies of the project.`
* `assemble - Assembles all variants of all applications and secondary packages.`
* `assembleAndroidTest - Assembles all the Test applications.`
* `clean - Deletes the build directory`

You can get the base task list by calling `gradle tasks` in your Android app's directory,
or to see all the available tasks you can call `gradle tasks --all`.

Running `gradle tasks` you'll get a list of available Gradle tasks in the format:

```
$ gradle task

:tasks

------------------------------------------------------------
All tasks runnable from root project
------------------------------------------------------------

Android tasks
-------------
androidDependencies - Displays the Android dependencies of the project.
signingReport - Displays the signing info for each variant.
sourceSets - Prints out all the source sets defined in this project.

Build tasks
-----------
assemble - Assembles all variants of all applications and secondary packages.
assembleAndroidTest - Assembles all the Test applications.
assembleDebug - Assembles all Debug builds.
assembleRelease - Assembles all Release builds.
...
```

You can run any of the tasks on bitrise from a `Script` step by calling `gradle task-name-to-run` (for example: `gradle assemle`)
or by using our `Gradle Runner` step ([https://github.com/bitrise-io/steps-gradle-runner](https://github.com/bitrise-io/steps-gradle-runner))
and specifying the task as the value of the `gradle_task` input.

__Instead of running `gradle` directly, you should run the gradle commands through `gradlew` (the Gradle Wrapper)!__
The `Gradle Runner` step does this, and as you can see it in the related input description of the step:

> Using a Gradle Wrapper (gradlew) is strongly suggested, as the wrapper is what makes sure
> that the right Gradle version is installed and used for the build.
> 
> __You can find more information about the Gradle Wrapper (gradlew),
> and about how you can generate one (if you would not have one already)__
> in the official guide at: [https://docs.gradle.org/current/userguide/gradle_wrapper.html](https://docs.gradle.org/current/userguide/gradle_wrapper.html).


## How to install an additional Android SDK package

All you have to do is to add a `Script` step to your workflow,
and use `android update sdk` to install the additional SDKs or packages you want to.

As an example, to install the Android SDK v18 and the related `build-tools` v18.0.1,
you can add a `Script` step (can be the very first step in the Workflow)
with the following content:

```
#!/bin/bash
# fail if any commands fails
set -e
# debug log
set -x

# write your script here
echo y | android update sdk --no-ui --all --filter android-18 | grep 'package installed
echo y | android update sdk --no-ui --all --filter build-tools-18.0.1 | grep 'package installed
```

*The `echo y | ` prefix is really important.
If you miss to include this your build will hang waiting for your input,
to accept the license agreements presented during an Android SDK / package install.*

**You can get the full list of available packages** by running:
`android list sdk --no-ui --all --extended`. You can run this on your own machine if you have `android` in your `$PATH`.

!!! note
    You should only install the Android tools which are *not* yet installed.
    Calling `android update` for an already installed tool might fail if it can't create a backup -
    which is the case if you use the default `Docker` file system driver (`aufs`).

    _This issue does not affect builds running on [bitrise.io](https://www.bitrise.io),
    as the filesystem driver for `docker` is set to `btrfs` instead of the default `aufs`._

    You can check all the pre-installed tools in the official Bitrise Android Dockerfile:
    [https://github.com/bitrise-docker/android/blob/master/Dockerfile](https://github.com/bitrise-docker/android/blob/master/Dockerfile)


## Enable Gradle debug options

If your Gradle build fails and you can't find any information in the logs you can try to call it with
`--stacktrace --debug` flags (ex: `gradle ... --stacktrace --debug`) to get more detailed logs.

In most cases `--stacktrace` should be enough, and the `Gradle Runner` step includes
this flag by default.


## Run a bitrise Android build on your Mac/PC, with Docker

You can run your build on your Mac/PC, inside the same `docker` container you use on [bitrise.io](https://www.bitrise.io),
to fully test your build in an identical environment! You can find the detailed guide here:
[How to run your build locally in Docker](/docker/run-your-build-locally-in-docker/)


## Memory (RAM) limit

You can specify the amount allowed RAM for the JVM by adding two __Environment Variables__ to your Workflow,
e.g. as `App Env Var`s:

* `GRADLE_OPTS: '-Dorg.gradle.jvmargs="-Xmx2048m -XX:+HeapDumpOnOutOfMemoryError"'`
* `_JAVA_OPTIONS: "-Xms512m -Xmx1024m"`

This method can be used to limit the allowed RAM the Gradle JVM process can use,
which can be useful in case there's not enough RAM available in the system.


## Emulators

You can use our Android emulator steps to create & boot emulators:
[http://www.bitrise.io/integrations#?filter=emulator](http://www.bitrise.io/integrations#?filter=emulator).

First you have to create an emulator with a `Create Android emulator` step,
where you can set the Android version and a couple of other parameters for the new emulator,
then you can boot this emulator with the `Start Android emulator` step,
which makes sure that the emulator is booted and ready for subsequent steps.


### Emulator with Google APIs

To create an Android Emulator with Google APIs,
you can use the following code snippet instead of the `Create Android emulator` step:

```
#!/bin/bash
set -ex

echo y | android update sdk --no-ui --all --filter addon-google_apis-google-21

echo y | android update sdk --no-ui --all --filter sys-img-armeabi-v7a-google_apis-21

echo no | android create avd --force --name YOUR_EMULATOR_NAME --target "android-21" --abi "google_apis/armeabi-v7a"
```

**Note about Android SDK versions:** at this time there are lots of known issues reported for Android Emulators
with Android SDK version 22 & 23 when combined with Google Play services
(see [1](http://stackoverflow.com/questions/32856919/androidstudio-emulator-wont-run-unless-you-update-google-play-services)
and [2](https://code.google.com/p/android/issues/detail?id=176348)).
The script above creates an emulator with SDK version 21, which should work properly with Google Play services.

*There are possible workarounds for newer versions
(see [1](http://stackoverflow.com/questions/34329363/app-wont-run-unless-you-update-google-play-services-with-google-maps-api-andr)
and [2](http://stackoverflow.com/questions/33114112/app-wont-run-unless-you-update-google-play-services)),
but that requires some customization in your project.*


## Installing / Using Java version X

!!! note "Java 8 is now pre-installed"
    Java 8 is now the pre-installed Java version on the Bitrise.io Linux Stack.
    This section is kept here for future reference, in case you'd need another Java version.

_If you'd need a Java / JDK version which is not preinstalled on the Android stacks,
you can follow this guide to install it. This example will install Java/JDK 8,
please adapt it to the version you need._

If your build requires JDK 8, you can install and activate it with a `Script` step:

```
#!/bin/bash
set -ex

add-apt-repository -y ppa:openjdk-r/ppa
apt-get update -qq
apt-get install -y openjdk-8-jdk
update-java-alternatives -s /usr/lib/jvm/java-1.8.0-openjdk-amd64
echo "done"
```

That's all, just add the `Script` step to the Workflow with the content above,
and start a new build. _This `Script` step can be the very first step in the Workflow,
as it does not depend on anything else._
