---
title: Android tips & tricks-draft
date: 2018-11-05 11:20:50 +0000
redirect_from: []
published: false

---
## Gradle Runner vs Android Build

In the following section, we'd like to give you a few use cases when to use our `Gradle Runner` and `Android Build` Steps and what the major differences are.

`Gradle Runner` Step: more complex, can be used to run any gradle related tasks, it performs whatever task you input. can run any gradle task

* **Config**

  Optional path to the gradle build file to use
  Gradle task to run
  gradlew file path
* **Export Config**

  APK, TEST APK, Mapping file include filter input fields
* **Debug**

  Set the additional cache
  Additional options for gradle call

`Android Build` Step: android steps are alsmost same as gradle runner but here you need to config this step as you config your project in android studio. more a reflection of configuration/development  of android studio UI. you can only build with this step, can only work with assemble beginning tasks. Lint-lint kezdetu task, unit testnel a test kezdeto taskokat.

* **Project location Module Variant**
* **Option**

  APK location pattern
  Set the level of cache
  Additional Gradle Arguments

## when running more tasks at the same time - gradle runner task inputba tobbet is fel tudok vinni: \``l debug assembedebug android test``

gradle runner outputs two apk paths in this case and can be used in virtual device testing.

android build - simlpler ux.

## About Gradle tasks

[Gradle tasks](https://docs.gradle.org/current/userguide/tutorial_using_tasks.html) are integral part of Gradle build script. They perform actions that are needed to build a project. Y**ou can define tasks specific to your project or use the default ones (any takss can be used that are defined in  in gradle build files).** A `gradle` task is a process you can run with `gradle` **command?**. You can run these tasks by running `gradle TASK-TO-RUN` in your Command Line / Terminal. (all tasks can be run not just the defaults but whichever are listed in the file above)

A most common Android Gradle project includes a lot of tasks by default such as:

* `androidDependencies` - displays the Android dependencies of the project.
* `assemble` - assembles all variants of all applications and secondary packages.
* `assembleAndroidTest` - assembles all the Test applications.
* `clean` - deletes the build directory.

at bitrise we use and run gradlew. users project has a `gradlew` which means when you generate a new android project Gradle has a given version and gradle wrapper puts this version Gradle version into my project.

### How to get the list of available Gradlew tasks in your project

To get the basic task list, call `gradlew tasks` in your Android app's directory. When running `gradlew tasks`, you'll get a list of available Gradle tasks in the format:

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

To see all the available tasks, call ./`gradlew tasks --all`.

### Run Gradle task with our Steps

You can run any of the Gradle tasks on Bitrise either using `Do anything with our Script` Step, `Gradle Runner` or `Android Build` Step.

* You can run any of the tasks on Bitrise by using our `Script` step and calling ./`gradlew task-name-to-run` i**n the Script input field.** (for example: ./`gradlew assemble`). **sample**

![](/img/script-field.png)

* You can use our `Gradle Runner` or `Android Build` Steps and specify the task that is available in your task list (when you called call ./`gradlew tasks --all before you have the task list)` as the value of the step input.

![](/img/gradlew-gradle-task.png)

if using scanner for uploading project, the gradlew path is automatically filled in, otherwise provide the path manually.

You can find more information about the Gradle Wrapper (gradlew) and how you can generate one (if you have not done it already) in the [official guide](https://docs.gradle.org/current/userguide/gradle_wrapper.html).

## How to install an additional Android SDK package

You can update your current Android SDK package either using our Step or installing the respective package manually.

**Advantages of Install missing Android SDK components:**

**Advantages of Do anything with Script step:**

### Automatic installation of Android SDKs

We suggest you to use our `Install missing Android SDK components` Step to **install dependencies and missing Android SDK components** for your Android project. The Step runs the `gradlew dependencies` **to only print out the lst of dependencies that influence my project**. if found, the step installs all the missing ones.  the Provide the required NDK version in the `NDK version` input field and let the step take care of installation!

![](/img/android-ndk.png)

### Manual installation of Android SDKs?

You can manually install the missing Android SDKs as well if you **why would they? if any issue with the step, you can try.As an alternative, you can** 

Before you start:

* Make sure you have the Android `sdkmanager` installed to your local computer. For more information on `sdkmanager`, check out Android Studio's [guide](https://developer.android.com/studio/command-line/sdkmanager).

1. Add a `Do anything with Script step` to your workflow.
2. Use the Android `sdkmanager` tool to install the additional packages you need.

{% include message_box.html type="important" title="When to use the Script Step" content="
Please only use the `Do anything with Script step` solution if you really have to **WHEN does that happen?**, as you'll have to manually update the `Script content` if the Android tools change. "%}

As an example, if you wanted to install the Android SDK v18 and the related `build-tools` v18.0.1, follow the steps:

1. Add the `Do anything with Script step` (c**an be the very first step in your workflow)**
2. Type the following content:

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

In most cases `--stacktrace` should be enough, and the `Gradle Runner` step includes this flag by default. **why calling it if you can type it in the debug section of Gradle Runner?**

![](/img/stacktrace.png)

## Run a bitrise Android build on your Mac/PC with Docker

You can run your build on your Mac/PC, inside the same `docker` container you use on [bitrise.io](https://www.bitrise.io), to fully test your build in an identical environment! You can find the detailed guide here: [How to run your build locally in Docker](/docker/run-your-build-locally-in-docker/)

## Memory (RAM) limit

You can specify the amount allowed RAM for the Java Virtual Machine by adding two **Environment Variables** to your Workflow, for example, as `App Env Var`s:

* `GRADLE_OPTS: '-Dorg.gradle.jvmargs="-Xmx2048m -XX:+HeapDumpOnOutOfMemoryError"'`
* `JAVA_OPTIONS: "-Xms512m -Xmx1024m"`

This method can be used to limit the allowed RAM the Gradle JVM process can use, which can be useful in case there's not enough RAM available in the system.

## Emulators

You can use our Android emulator [steps](http://www.bitrise.io/integrations) to create and boot Android emulators. Let's see how!

{% include message_box.html type="important" title="`Create Android emulator` vs `Do anything with Script step`" content=" Instead of using `Do anything with Script step` to create an Android emulator, please use  `Create Android emulator` step! There are simply too many edge cases to cover here, as well as the commands and working configurations change quite frequently. "%}

1. Add `AVD manager` Step to your workflow. (set the device, api level and opi inputs) **one of the firs steps of your workflow. when this runs, an emulator starts booting, the earlier yu start it the more tasks you can perform before emulator starts working. (cloning, caching pulling, ect) so when im getting to the point that i want to use emulator i need to add the wait for android emulator step. after wait for emulaor step add the step you want to use the emulator with.**
2. Set the Android version in the `Target platform of the new AVD` Step input field. **ORHER INPUTS?**
3. Add the `Start Android emulator` Step to boot the new emulator.
4. **Set the input ....**

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