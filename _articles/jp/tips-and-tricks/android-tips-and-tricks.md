---
# jp title missing
title: Android tips and tricks
redirect_from:
- "/android/android-tips-and-tricks/#what-are-gradle-tasks-and-how-can-i-get-the-list-of-available-tasks-in-my-project"
menu:
  tips-and-tricks:
    weight: 1
---
## Gradle タスクとは何で、どうすれば自分のプロジェクトで利用可能なタスクの一覧を取得できますか？

`gradle` タスクとは、あなたが `gradle` で実行することのできる処理のことです。
コマンドラインやターミナルで `gradle 実行するタスク` を実行することでこれらのタスクを実行することができます。

標準的な Android の Gradle プロジェクトにはデフォルトでたくさんのタスクが含まれています。たとえば:

* `androidDependencies - プロジェクトの Android の依存関係を表示します。`
* `assemble - 全てのアプリケーションと第二のパッケージの全てのバリアントを組み立てます。`
* `assembleAndroidTest - 全てのテストアプリケーションを組み立てます。`
* `clean - ビルドディレクトリを削除します。`

Android アプリのディレクトリで `gradle tasks` を実行することで基本タスクの一覧を取得することができ、
`gradle tasks --all` を呼び出すことで全ての利用可能なタスクを確認することができます。

`gradle tasks` を実行すると、利用可能な Gradle タスクの一覧を次のようなフォーマットで取得できます:

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

`Script` ステップで `gradle 実行するタスク名` (例: `gradle assemble`) を呼び出すか、
`Gradle Runner` ステップ ([https://github.com/bitrise-io/steps-gradle-runner](https://github.com/bitrise-io/steps-gradle-runner)) で
`gradle_task` 入力値としてタスクを指定することで任意のタスクを bitrise 上で実行することができます。

`**gradle**` **を直接実行する代わりに、** `**gradlew**` **(Gradle ラッパー) を使用するべきです！**
`Gradle Runner` ステップはこれを行い、ステップの関連する入力説明でそれを見ることができます:

> Using a Gradle Wrapper (gradlew) is strongly suggested, as the wrapper is what makes sure
> that the right Gradle version is installed and used for the build.
>
> **You can find more information about the Gradle Wrapper (gradlew),
> and about how you can generate one (if you would not have one already)**
> in the official guide at: [https://docs.gradle.org/current/userguide/gradle_wrapper.html](https://docs.gradle.org/current/userguide/gradle_wrapper.html).

## How to install an additional Android SDK package

**The preferred way to do this is to use the** `**Install missing Android tools**`** step.
Please only use a Script solution if you really have to, as you'll have to update
the Script if the Android tools change (which did happen).**

All you have to do is to add a `Script` step to your workflow,
and use the Android `sdkmanager` tool to install the additional packages you want to.

As an example, to install the Android SDK v18 and the related `build-tools` v18.0.1,
you can add a `Script` step (can be the very first step in the Workflow)
with the following content:

    #!/bin/bash
    # fail if any commands fails
    set -e
    # debug log
    set -x
    
    # write your script here
    sdkmanager "platforms;android-18"
    sdkmanager "build-tools;18.0.1"

**You can get the full list of available packages** by running:
`sdkmanager --list --include_obsolete --verbose`.
You can run this on your own machine if you have `$ANDROID_HOME/tools/bin` in your `$PATH`.
If not then you can run it with `/PATH/TO/ANDROID-SDK-HOME/tools/bin/sdkmanager ...`.

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

You can specify the amount allowed RAM for the JVM by adding two **Environment Variables** to your Workflow,
e.g. as `App Env Var`s:

* `GRADLE_OPTS: '-Dorg.gradle.jvmargs="-Xmx2048m -XX:+HeapDumpOnOutOfMemoryError"'`
* `_JAVA_OPTIONS: "-Xms512m -Xmx1024m"`

This method can be used to limit the allowed RAM the Gradle JVM process can use,
which can be useful in case there's not enough RAM available in the system.

## Emulators

You can find and use our Android emulator steps to create & boot emulators:
[http://www.bitrise.io/integrations](http://www.bitrise.io/integrations).

First you have to create an emulator with a `Create Android emulator` step,
where you can set the Android version and a couple of other parameters for the new emulator,
then you can boot this emulator with the `Start Android emulator` step,
which makes sure that the emulator is booted and ready for subsequent steps.

### Emulator with Google APIs

**Instead of using a Script step to create an android emulator please use the** `**Create Android emulator**`** step!
There are simply too many edge cases to cover here, as well as the commands and working configurations change quite frequently.**

_The section below is kept here for referencing purposes, and might be outdated._

**Note about Android SDK versions:** at this time there are lots of known issues reported for Android Emulators
with Android SDK version 22 & 23 when combined with Google Play services
(see [1](http://stackoverflow.com/questions/32856919/androidstudio-emulator-wont-run-unless-you-update-google-play-services)
and [2](https://code.google.com/p/android/issues/detail?id=176348)).
The script above creates an emulator with SDK version 21, which should work properly with Google Play services.

_There are possible workarounds for newer versions
(see _[_1_](http://stackoverflow.com/questions/34329363/app-wont-run-unless-you-update-google-play-services-with-google-maps-api-andr)
_and_ [_2_](http://stackoverflow.com/questions/33114112/app-wont-run-unless-you-update-google-play-services)_),
but that requires some customization in your project._

## Installing / Using Java version X

{% include message_box.html type="note" title="Java 8 is now pre-installed" content=" Java 8 is now the pre-installed Java version on the Bitrise.io Linux Stack. This section is kept here for future reference, in case you'd need another Java version. "%}

_If you'd need a Java / JDK version which is not preinstalled on the Android stacks,
you can follow this guide to install it. This example will install Java/JDK 8,
please adapt it to the version you need._

If your build requires JDK 8, you can install and activate it with a `Script` step:

    #!/bin/bash
    set -ex
    
    add-apt-repository -y ppa:openjdk-r/ppa
    apt-get update -qq
    apt-get install -y openjdk-8-jdk
    update-java-alternatives -s /usr/lib/jvm/java-1.8.0-openjdk-amd64
    echo "done"

That's all, just add the `Script` step to the Workflow with the content above,
and start a new build. _This_ `_Script_`_ step can be the very first step in the Workflow,
as it does not depend on anything else._
