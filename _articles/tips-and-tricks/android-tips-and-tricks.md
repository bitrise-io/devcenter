---
title: Android tips and tricks
redirect_from:
- https://devcenter.bitrise.io/android/android-tips-and-tricks/#what-are-gradle-tasks-and-how-can-i-get-the-list-of-available-tasks-in-my-project
- "/android/android-tips-and-tricks/#what-are-gradle-tasks-and-how-can-i-get-the-list-of-available-tasks-in-my-project"
menu:
  tips-and-tricks:
    weight: 1

---
## Gradle Runner vs Android Build

We'd like to shed light on the major differences between our two Android build steps: `Gradle Runner` and `Android Build` Steps. They are both build steps but they are slightly different in their functions. Let's jump right in!

Our `Gradle Runner` Step is the headquarter for all your `gradle tasks`. It runs a single or multiple Gradle task(s) you specify and then copies the generated APK(s) into the Bitrise Deploy Directory (`$BITRISE_DEPLOY_DIR`). This step runs ANY Gradle task (not just building task) that is available in your project's [task list](/tips-and-tricks/android-tips-tricks/#how-to-get-the-list-of-available-gradlew-tasks-in-your-project/). You can run multiple tasks at the same time if you insert the tasks separated with spaces in the `Gradle task to run` input field of the Step.

For example: `assembleDebug` `assembleDebugAndroidTest` where Gradle Runner step will output as many APK paths as many assemble tasks you have set.

Our `Android Build` Step is different from `Gradle Runner` in the sense that it provides a simplified user experience of Android Studio's developing functions: it reflects how you would configure your project in Android Studio. This step is geared towards ONLY building your project, therefore, it cannot perform any other`gradle task` (as opposed to `Gradle Runner`). As a result, you can use `assemble` - related task with this Step.

## About Gradle tasks

[Gradle tasks](https://docs.gradle.org/current/userguide/tutorial_using_tasks.html) are an integral part of Gradle build script. You can use any task that is defined in gradle build files where tasks are either specified by you or available by default based on your project. You can run these available tasks with the `gradlew TASK-TO-RUN` command in your Command Line / Terminal.

Here is a list of the most common default tasks of an Android Gradle project:

* `androidDependencies` - displays the Android dependencies of the project.
* `assemble` - assembles all variants of all applications and secondary packages.
* `assembleAndroidTest` - assembles all the Test applications.
* `clean` - deletes the build directory.

{% include message_box.html type="info" title="About Gradle Wrapper" content=" At Bitrise we use `gradlew` (Gradle Wrapper) which helps update your project by installing the needed Gradle version specific to your project. Check out [Gradle's official documentation](https://docs.gradle.org/current/userguide/gradle_wrapper.html) about Gradle Wrapper and how you can generate one!" %}

### Getting the list of available Gradlew tasks in your project

To get the basic task list, call `gradlew tasks` in your Android app's directory. When running `gradlew tasks`, you'll get a list of **available and most frequently** used `gradle tasks` in this format:

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

To see **all the available tasks listed** in your task list, call `./gradlew tasks --all`.

### Running Gradle task with our Steps

You can run `gradle tasks` on Bitrise using `Do anything with our Script` Step, `Gradle Runner` and `Android Build` Steps.

#### Do anything with Script step

1. Insert the Step anywhere in your workflow.
2. Run any task by calling `./gradlew task-name-to-run` in the Script input field (for example: `./gradlew assemble`).
3. Make sure the right executor type is selected to run your script in the `Execution with / runner binary` input field of the `Config` section.

#### Gradle Runner Step

As a minimum input, make sure you fill out the following two input fields:

1. Specify the task that is available in your task list as the value of the `Gradle task to run` step input.
2. If you use our scanner to upload your project to [bitrise.io](https://www.bitrise.io/), the `gradlew file path` input field gets automatically filled out with the respective path in the Step. Otherwise make sure you fill it out manually and make sure to add a relative path to the repository root, for example: `./gradlew` or `./sub/dir/gradlew` (if it is a subdirectory).

![](/img/gradle-runner-gradlew.png)

#### Android Build Step

This Step can only perform building-related `gradle tasks`. If you wish to run other type of `gradle tasks`, please use our `Gradle Runner` Step.

1. Add the Step after the testing steps but before the code signing Step in your deploy workflow.
2. Set the required `Project Location` input field to reflect the root directory of your project.

## How to install an additional Android SDK package

You can update your Android SDK package or install missing dependencies either using our `Install missing Android SDK components` Step or `Do anything with Script step` where installing the respective package requires a little manual coding.

### Automatic installation of Android SDKs and dependencies

We suggest using our `Install missing Android SDK components` Step to install dependencies and missing Android SDK components for your Android project:

1. Provide the required NDK version in the `NDK Revision` input field. Leave this input empty if you are not using NDK in your project.

![](/img/android-ndk.png)

The Step runs the `gradlew dependencies` command and prints out a list of dependencies and SDK components that are relevant to your project. Then the Step takes care of installing them.

### Manual installation of Android SDKs

As an alternative to the `Install missing Android SDK components` Step you can manually install the missing Android SDKs as well.

{% include message_box.html type="important" title="When to use `Do anything with our Script step`" content=" Please only use the `Do anything with Script step` solution if you really need an alternative to the `Install missing Android SDK components Step`, as you'll have to **manually** update the `Script content` if the Android tools change. "%}

Before you start:

* Make sure you have the Android `sdkmanager` installed to your local computer. For more information on `sdkmanager`, check out this [guide](https://developer.android.com/studio/command-line/sdkmanager).

1. Add `Do anything with Script step` (can be the very first step) to your workflow.
2. Add the required platform and build-tools version to the `Script content`. In this example, we're installing the Android SDK v18 and the related `build-tools` with v18.0.1.

       #!/bin/bash
       #fail if any commands fails
       set -e
       #debug log_
       set -x
       #write your script here
       sdkmanager "platforms;android-18"
       sdkmanager "build-tools;18.0.1"

You can check the full list of available packages (including obsolete packages) that you have already installed by running an `sdk` task:

1. Run `sdkmanager --list --include_obsolete --verbose` command. You can run this command on your own machine if you have `$ANDROID_HOME/tools/bin` in your `$PATH`.  If not, then you can run it with `/PATH/TO/ANDROID-SDK-HOME/tools/bin/sdkmanager ...`.

## Enabling Gradle debug options

If your Gradle build fails, we recommend you to first check your build's log in the `APPS & ARTIFACTS` tab.

If you're still lost, you can call `--stacktrace --debug` flags (for example, `gradle ... --stacktrace --debug`) to get more detailed logs.

In most cases `--stacktrace` should be enough, and the `Gradle Runner` Step includes this flag by default.

![](/img/stacktrace.png)

## Running a bitrise Android build on your Mac/PC with Docker

You can run your build on your Mac/PC inside the same `docker` container you use on [bitrise.io](https://www.bitrise.io) to fully test your build in an identical environment! You can find the detailed guide here: [How to run your build locally in Docker](/docker/run-your-build-locally-in-docker/)

## Memory (RAM) limit

You can specify the amount allowed RAM for the Java Virtual Machine (JVM) by adding two environment variables to your workflow.

For example:

* `GRADLE_OPTS: '-Dorg.gradle.jvmargs="-Xmx2048m -XX:+HeapDumpOnOutOfMemoryError"'`
* `JAVA_OPTIONS: "-Xms512m -Xmx1024m"`

You can limit the allowed RAM the Gradle JVM process uses. This is useful if there's not enough RAM available in the system.

## Emulators

You can use our Android emulator Steps such as `AVD Manager` and `Wait for Emulator` to create and boot Android emulators. Let's see how!

{% include message_box.html type="important" title="`AVD Manager` vs `Do anything with Script step`" content=" Instead of using `Do anything with Script step` to create an Android emulator, please use  `AVD Manager` Step! There are simply too many edge cases to cover relating to our script Step, as well as the commands and working configurations change quite frequently. "%}

1. Add `AVD manager` Step to your workflow. It can be one of the first steps in your workflow.
2. Set the following required input fields in the step: `Device Profile`, `Android API level`, and `OS Tag`.

   ![](/img/avd-manager.png)

   The Emulator needs some time to boot up. The earlier you place the Step in your workflow, the more tasks (cloning or caching) you can complete in your workflow before the emulator starts working.
3. Add the `Wait for Emulator` Step to your workflow. This step acts a shield preventing the `AVD Manager` to kick in. Make sure you add it BEFORE the step with which you want to use the `AVD Manager`. In our example, we are using `Wait for Android emulator` Step to only start the Android Virtual Device FROM the `Gradle Runner - UI test` Step onwards.

   ![](/img/wait-for-android-emu.png)

## Installing / Using Java version X

{% include message_box.html type="note" title="Java 8 is now pre-installed" content=" Java 8 is now the pre-installed Java version on the [bitrise.io](https://www.bitrise.io/) Linux Stack. This section is kept here for future reference, in case you'd need another Java version. "%}

If you need a Java or JDK version which is not preinstalled on the Android stacks, you can follow this guide to install it. This example will install Java/JDK 8 with a `Do anything with Script step`, feel free to adapt it to the version you need.

1. Add the `Do anything with Script step` to your workflow with the content below:

       #!/bin/bash
       set -ex
       
       add-apt-repository -y ppa:openjdk-r/ppa
       apt-get update -qq
       apt-get install -y openjdk-8-jdk
       update-java-alternatives -s /usr/lib/jvm/java-1.8.0-openjdk-amd64
       echo "done"
2. Start a new build. This `Script` Step can be the very first step in the Workflow, as it does not depend on anything else.