---
title: Android tips & tricks-draft
date: 2018-11-05 11:20:50 +0000
redirect_from: []
published: false

---
## Gradle Runner vs Android Build

In the following section, we'd like to give you a few use cases when to use our `Gradle Runner` and `Android Build` Steps and what the major differences are.

`Gradle Runner` Step: more complex Step which is based on Gradle tasks. You can use this step to run any gradle task (link) that is available in your task list. More on how to call task list, here. You can run multiple tasks at the same time if you insert the tasks separated with space in the `Gradle task to run` input field. For example: `assembleDebug` `assembleDebugAndroidTest` where Gradle Runner step will output as many APK paths as many assemble tasks you have set.

`Android Build` Step: provides a simplified user experience of Android Studio. This step reflects the configuration of your project in Android Studio. This step is geared towards building your project it cannot perform any other Gradle task. You can have any `assemble` - related task performed by this Step.

## About Gradle tasks

[Gradle tasks](https://docs.gradle.org/current/userguide/tutorial_using_tasks.html) are integral part of Gradle build script. They perform actions that are needed to build a project. You can use any task that is defined in gradle build files - either defined by you or available by default. You can run all the available tasks by running `gradlew TASK-TO-RUN` in your Command Line / Terminal.

Here is a list of the most common default tasks of an Android Gradle project:

* `androidDependencies` - displays the Android dependencies of the project.
* `assemble` - assembles all variants of all applications and secondary packages.
* `assembleAndroidTest` - assembles all the Test applications.
* `clean` - deletes the build directory.

At Bitrise we use and run gradlew. users project has a `gradlew` which means when you generate a new android project Gradle has a given version and gradle wrapper puts this version Gradle version into my project.

### How to get the list of available Gradlew tasks in your project

To get the basic task list, call `gradlew tasks` in your Android app's directory. When running `gradlew tasks`, you'll get a list of available Gradle tasks in this format:

    $ ./gradlew tasks
    
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

To see all the available tasks listed in your task list, call ./`gradlew tasks --all`.

### Run Gradle task with our Steps

You can run any of the Gradle tasks on Bitrise either using `Do anything with our Script` Step and `Gradle Runner` Steps.

* Run any task by calling `./gradlew task-name-to-run` in the Script input field of `Do anything with our Script` Step (for example: `./gradlew assemble`). You're free to insert this step anywhere in your workflow where it works best for you.

![](/img/gradle-runner-gradlew.png)

* You can use our `Gradle Runner` Step and specify the task that is available in your task list (when you called call ./`gradlew tasks --all before you have the task list)` as the value of the step input. If you've been using our scanner to upload your project to bitrise.io, the `gradlew file path` input field gets filled out automatically with the respective path, otherwise make sure you fill it out manually!

## How to install an additional Android SDK package

You can update your Android SDK package or install missing dependencies either using our `Install missing Android SDK components` Step or i_nstalling the respective package manually._

### Automatic installation of Android SDKs and dependencies

We suggest you to use our `Install missing Android SDK components` Step to install dependencies and missing Android SDK components for your Android project:

1. Provide the required NDK version in the `NDK Revision` input field. Leave this input empty if you are not using NDK in your project.

The Step runs the `gradlew dependencies` command and prints out a list of dependencies and SDK components that are relevant to your project. Then the Step installs all them.

![](/img/android-ndk.png)

### Manual installation of Android SDKs?

As an alternative to `Install missing Android SDK components` you can manually install the missing Android SDKs as well.

{% include message_box.html type="important" title="When to use the Script Step" content=" Please only use the `Do anything with Script` step solution if you really need an alternative to the `Install missing Android SDK components Step` , as you'll have to manually update the `Script content` if the Android tools change. "%}

Before you start:

* Make sure you have the Android `sdkmanager` installed to your local computer. For more information on `sdkmanager`, check out Android Studio's [guide](https://developer.android.com/studio/command-line/sdkmanager).

1. Add `Do anything with Script step` (can be the very first step) to your workflow.
2. Add the required platform and build-tools version to the `Script content`. In this example, we're installing the Android SDK v18 and the related `build-tools` v18.0.1

       #!/bin/bash
       #fail if any commands fails
       set -e
       #debug log_
       set -x
       #write your script here
       sdkmanager "platforms;android-18"
       sdkmanager "build-tools;18.0.1"

You can check the full list of available packages (including obsolete packages) that you have already installed by running an `sdk` task:

1. Run `sdkmanager --list --include_obsolete --verbose` command.
   You can run this command on your own machine if you have `$ANDROID_HOME/tools/bin` in your `$PATH`.  If not, then you can run it with `/PATH/TO/ANDROID-SDK-HOME/tools/bin/sdkmanager ...`.

## Enable Gradle debug options

If your Gradle build fails, we recommend you to check your build's log in the `APPS & ARTIFACTS` tab.

If you're lost, you can call `--stacktrace --debug` flags (for example, `gradle ... --stacktrace --debug`) to get more detailed logs.

In most cases `--stacktrace` should be enough, and the `Gradle Runner` step includes this flag by default.

![](/img/stacktrace.png)

## Run a bitrise Android build on your Mac/PC with Docker

You can run your build on your Mac/PC inside the same `docker` container you use on [bitrise.io](https://www.bitrise.io) to fully test your build in an identical environment! You can find the detailed guide here: [How to run your build locally in Docker](/docker/run-your-build-locally-in-docker/)

## Memory (RAM) limit

You can specify the amount allowed RAM for the Java Virtual Machine (JVM) by adding two environment variables to your workflow.

For example:

* `GRADLE_OPTS: '-Dorg.gradle.jvmargs="-Xmx2048m -XX:+HeapDumpOnOutOfMemoryError"'`
* `JAVA_OPTIONS: "-Xms512m -Xmx1024m"`

You can limit the allowed RAM the Gradle JVM process uses, which is useful if there's not enough RAM available in the system.

## Emulators

You can use our Android emulator [steps](http://www.bitrise.io/integrations) to create and boot Android emulators. Let's see how!

{% include message_box.html type="important" title="`AVD Manager` vs `Do anything with Script step`" content=" Instead of using `Do anything with Script step` to create an Android emulator, please use  `AVD Manager` Step! There are simply too many edge cases to cover relating to our script step, as well as the commands and working configurations change quite frequently. "%}

1. Add `AVD manager` Step to your workflow. It can be one of the first steps in your workflow.
2. Set the following required input fields in the step: `Device Profile`, `Android API level`, and `OS Tag`.

	![](/img/avd-manager.png)

	When this Step runs, it takes time for the emulator to boot up. The earlier you place the 	step, the more tasks (cloning, caching) you can complete in your workflow before the emulator starts working.

3. Add the `Wait for Emulator` Step to your workflow. Make sure you add it before a step you want to use the Android Virtual Device with. In our example, we are using `Wait for Android emulator` step to run the virtual device from the `Gradle Runner - UI test` Step onwards. 

![](/img/wait-for-android-emu.png)

3\. (set the device, api level and opi inputs) **one of the firs steps of your workflow. when this runs, an emulator starts booting, the earlier yu start it the more tasks you can perform before emulator starts working. (cloning, caching pulling, ect) so when im getting to the point that i want to use emulator i need to add the wait for android emulator step. after wait for emulaor step add the step you want to use the emulator with.**
4\. Set the Android version in the `Target platform of the new AVD` Step input field. **ORHER INPUTS?**
5\. Add the `Start Android emulator` Step to boot the new emulator.
6\. **Set the input ....**

## Installing / Using Java version X

{% include message_box.html type="note" title="Java 8 is now pre-installed" content=" Java 8 is now the pre-installed Java version on the Bitrise.io Linux Stack. This section is kept here for future reference, in case you'd need another Java version. "%}

If you'd need a Java or JDK version which is not preinstalled on the Android stacks, you can follow this guide to install it. This example will install Java/JDK 8 with a `Do anything with Script step`, feel free to adapt it to the version you need.

1. Add the `Do anything with Script step` to your workflow with the content below:

       #!/bin/bash
       set -ex
       
       add-apt-repository -y ppa:openjdk-r/ppa
       apt-get update -qq
       apt-get install -y openjdk-8-jdk
       update-java-alternatives -s /usr/lib/jvm/java-1.8.0-openjdk-amd64
       echo "done"
2. Start a new build. This `Script` step can be the very first step in the Workflow, as it does not depend on anything else.