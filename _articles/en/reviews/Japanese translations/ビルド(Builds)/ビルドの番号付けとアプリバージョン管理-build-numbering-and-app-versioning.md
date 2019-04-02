---
title: ビルドの番号付けとアプリバージョン管理(Build numbering and app versioning)
redirect_from: []
date: 2019-04-02 14:40:06 +0000
published: false

---
All Bitrise builds have a build number. The first build of your app is, by default, number 1, and the build number gets incremented with each build. You can get a build's Bitrise build number on the website, as well as via the `$BITRISE_BUILD_NUMBER` environment variable. This variable can be used in any step or script where you need the Bitrise build number for any reason.

全てのBitriseビルドにはビルド番号が存在します。あなたのアプリの最初のビルドの場合、デフォルトで１番となっており、ビルドが行われるにつれ番号も増えていきます。ウェブサイト上でBitriseビルド番号の取得ができ、 `$BITRISE_BUILD_NUMBER` の環境変数からでも取得が可能です。この変数はBitriseビルド番号が必要になるステップやスクリプトで使用されます。

You can also take care of your app's versioning automatically, using Bitrise. We have two steps to do it for you - [read more here!](builds/build-numbering-and-app-versioning#Set-up-app-versioning-automatically-on-Bitrise)

アプリのバージョン管理を自動的に行うこともBitriseでは可能です。２つのステップがあるので、[ここ](builds/build-numbering-and-app-versioning#Set-up-app-versioning-automatically-on-Bitrise)をお読みください！

## Change the build number of your build　ビルド番号の変更

Set the build number manually on the website. This is useful if, for example, you migrated to Bitrise from some other service where your app already had several builds. This way you do not have to start from 1!

ウェブサイトで手動によるビルド番号の設定を行ってください。アプリが他サービス上ですでにビルドが複数回行なわれていて、Bitriseへ移動させる際に有効です。この方法で１番からスタートすることはありません！

Open your app and go to its `Settings` tab.

アプリを開いて`Settings`タブへ進みます。

![build numbering](/img/builds/build-numbering.png)

Under `YOUR NEXT BUILD NUMBER WILL BE`, the number of your next build will be displayed (unsurprisingly). This number is incremented automatically whenever a new build is triggered but here you can also set it manually.

`YOUR NEXT BUILD NUMBER WILL BE`の下に、次に行われるビルド番号が表示されます。この番号は新しいビルドが行われるごとに自動的に増えていきますが、手動で変更することができます。

Please note that the build number must be either 0 or a positive integer. Negative numbers are not accepted. You can, however, set any number you have already used.

ビルド番号は０もしくは正の整数でなくてはなりません。負の数は受け付けられないのでご注意ください。すでに使用した番号をもう一度使用することは可能です。

## Set up app versioning automatically on Bitrise　Bitrise上でアプリバージョン管理のセットアップ

Track the version of your app in its git repository by modifying the file containing the essential information about the app (for example, the `Info.plist` file for iOS apps and the `AndroidManifest.xml` file for Android apps).

アプリに関する重要な情報が含まれるファイルの修正をすることでgitレポジトリ内のアプリバージョンを追跡することができます。（例：iOS アプリの場合の`Info.plist`ファイル、Androidアプリの場合の`AndroidManifest.xml`ファイル）

Bitrise has two steps to do this for you. These two steps can insert the Bitrise build number or some other specified number into their respective files:

Bitriseには２種類のステップがあり、Bitriseビルド番号や他の特定の番号をそれぞれのファイルへ挿入することができます。

* `Set Android Manifest Version Code and Name` for Android apps.
* `Set Xcode Project Build Number` for iOS apps.
* `Set Android Manifest Version Code and Name` （Androidアプリの場合）
* `Set Xcode Project Build Number` （iOSアプリの場合）

Both steps accept either numbers (integers and/or numeric strings) or environment variables in their relevant inputs. By default, both use the `$BITRISE_BUILD_NUMBER` environment variable as their default value for the build number.

ステップの両方において、番号（整数もしくは数字列）もしくは環境変数の使用が可能です。デフォルトでは、`$BITRISE_BUILD_NUMBER` 環境変数をビルド番号のデフォルト値として使用しています。

### Setting the `versionCode` and the `versionName` of an Android app　Androidアプリの`versionCode`と`versionName`の設定

For an Android app, the `versionCode` setting is used as an internal version number, to determine if a build of the app is more recent than another build. The `versionName` setting is a string used as the version number shown to users.

Androidアプリでは、内部のバージョン番号として`versionName`設定が使用されており、アプリのビルドが他のビルドよりも新しいかどうかを確かめるのに用いられます。`versionName`設定はユーザーへ表示されるバージョン番号として使用される

For in-depth information about Android versioning, please check out [the Android developer guide on the subject](https://developer.android.com/studio/publish/versioning).

1. Add the `Set Android Manifest Version Code and Name` step to your Workflow.
2. Set the file path to the `AndroidManifest.xml` file in the `AndroidManifest.xml file path` input.
3. Add a value in the `Version Code` input. This sets the `android:versionCode` attribute to the specified value in the `AndroidManifest.xml` file. The default value is the `$BITRISE_BUILD_NUMBER` environment value.
4. Add a value in the `Version Name` input. This will set the `android:versionName` attribute to the specified value in the `AndroidManifest.xml` file.

![Set android version](/img/builds/set-android-version.png)

### Setting the `CFBundleVersion` and `CFBundleShortVersionString` of an iOS app

For an iOS app, the value of the `CFBundleVersion` key ("_Bundle version_" in Xcode) is the **build number** of the app while the value of the `CFBundleShortVersionString` key ("_Bundle versions string_, short" in Xcode) is the **version number** of the app.

For in-depth information about iOS versioning, including the functions of the `CFBundleVersion` and the `CFBundleShortVersionString` keys, please check out [this Apple technical note](https://developer.apple.com/library/archive/technotes/tn2420/_index.html); you can also look up the [summary of most important keys](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html).

1. Add the `Set Xcode Project Build Number` step to your Workflow.
2. Set the file path to the `Info.plist` file in the `Info.plist file path` input.
3. Add a value in the `Build Number` input. This sets the `CFBundleVersion` key to the specified value in the `Info.plist` file. The default value is the `$BITRISE_BUILD_NUMBER` environment value.
4. Optionally, add a value in the `Version Number` input. This will set the `CFBundleShortVersionString` key to the specified value in the `Info.plist` file. This input is not required.

![Set iOS version](/img/builds/set-ios-version.png)

### Offsetting the build version

You can also offset your App's build version numbers if you handled version tracking in a different way before for the same app: all you need to do is setting the value which should be added to the build number. The value can be either a "fixed" integer value or an environment variable.

To offset your version number by your Bitrise build number every time a build is triggered, use the `$BITRISE_BUILD_NUMBER` environment variable:

* For Android apps, find the `Version Code Offset` input of the `Set Android Manifest Version Code and Name` step and set `$BITRISE_BUILD_NUMBER` as its value. The value of the variable will be added to the value specified in the `Version Code` input.
* For iOS apps, find the find the `Build Number Offset` input of the `Set Xcode Project Build Number` step and set `$BITRISE_BUILD_NUMBER` as its value. The value of the variable will be added to the value specified in the `Build Number` input.

#### Android example

Let's say you have an app and you are about to run its fifth build on Bitrise. You wish to offset the Build Number by 6 as the app had six builds before starting to use Bitrise. The following configuration is used:

    - Version Code: $BITRISE_BUILD_NUMBER
    - Version Code Offset: 6
    - Version Name: 1.0.5

The value of `$BITRISE_BUILD_NUMBER` (which equals 5 in our example) will be added to the `Version Code Offset` value. As such, `android:versionName` value will be set to 1.0.5 (11), indicating it's the 11th build of the 1.0.5 version of your app.

#### iOS example

Let's say you have an app and you are about to run its fifth build on Bitrise. You wish to offset the Build Number by 6 as the app had six builds before starting to use Bitrise. The following configuration is used:

    - Build Number: $BITRISE_BUILD_NUMBER
    - Build Number Offset: 6
    - Version Number: 1.1

The value of `$BITRISE_BUILD_NUMBER` (which equals 5 in our example) will be added to the `Build Number Offset` value. As such, `CFBundleShortVersionString` will be set to 1.1 (11), indicating it's the 11th build of the 1.1 version of your app.