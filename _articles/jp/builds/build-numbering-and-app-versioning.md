---
# jp title missing
title: Build numbering and app versioning
redirect_from:
- "/builds/build-numbering-and-app-versioning/builds/build-numbering-and-app-versioning"
menu:
  builds:
    weight: 8

---

{% include not_translated_yet.html %}

All Bitrise builds have a build number. The first build of your app is, by default, number 1, and the build number gets incremented with each build. You can get a build's Bitrise build number on the website, as well as via the `$BITRISE_BUILD_NUMBER` environment variable. This variable can be used in any step or script where you need the Bitrise build number for any reason.

You can also take care of your app's versioning automatically, using Bitrise. We have two steps to do it for you - [read more here!](builds/build-numbering-and-app-versioning#Set-up-app-versioning-automatically-on-Bitrise)

## Change the build number of your build

Set the build number manually on the website. This is useful if, for example, you migrated to Bitrise from some other service where your app already had several builds. This way you do not have to start from 1!

Open your app and go to its `Settings` tab.

![build numbering](/img/builds/build-numbering.png)

Under `YOUR NEXT BUILD NUMBER WILL BE`, the number of your next build will be displayed (unsurprisingly). This number is incremented automatically whenever a new build is triggered but here you can also set it manually.

Please note that the build number must be either 0 or a positive integer. Negative numbers are not accepted. You can, however, set any number you have already used.

## Set up app versioning automatically on Bitrise

Track the version of your app in its git repository by modifying the file containing the essential information about the app (for example, the `Info.plist` file for iOS apps and the `AndroidManifest.xml` file for Android apps).

Bitrise has two steps to do this for you. These two steps can insert the Bitrise build number or some other specified number into their respective files:

* `Set Android Manifest Version Code and Name` for Android apps.
* `Set Xcode Project Build Number` for iOS apps.

Both steps accept either numbers (integers and/or numeric strings) or environment variables in their relevant inputs. By default, both use the `$BITRISE_BUILD_NUMBER` environment variable as their default value for the build number.

### Setting the `versionCode` and the `versionName` of an Android app

For an Android app, the `versionCode` setting is used as an internal version number, to determine if a build of the app is more recent than another build. The `versionName` setting is a string used as the version number shown to users.

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

```yaml
- Version Code: $BITRISE_BUILD_NUMBER
- Version Code Offset: 6
- Version Name: 1.0.5
```

The value of `$BITRISE_BUILD_NUMBER` (which equals 5 in our example) will be added to the `Version Code Offset` value. As such, `android:versionName` value will be set to 1.0.5 (11), indicating it's the 11th build of the 1.0.5 version of your app.

#### iOS example

Let's say you have an app and you are about to run its fifth build on Bitrise. You wish to offset the Build Number by 6 as the app had six builds before starting to use Bitrise. The following configuration is used:

```yaml
- Build Number: $BITRISE_BUILD_NUMBER
- Build Number Offset: 6
- Version Number: 1.1
```

The value of `$BITRISE_BUILD_NUMBER` (which equals 5 in our example) will be added to the `Build Number Offset` value. As such, `CFBundleShortVersionString` will be set to 1.1 (11), indicating it's the 11th build of the 1.1 version of your app.
