
## Searching for errors and issues in Xcode generated output

_This applies only to the raw, unfiltered output of Xcode.
If you can't find the error reason in the logs make sure to switch the `Output Tool` option
of the Xcode ... step to `xcodebuild` (Xcode's Command Line Tool), which will
result in a quite verbose output, but will include everything the way it's produced by
Xcode's command line build tool (`xcodebuild`). All of the official Bitrise Xcode steps
have an `Output Tool` input with a `xcodebuild` option._

You should search for `error:` in the Xcode logs, in 99% of the cases that'll be the one which causes your issues.

If that doesn't work you should also search for `warning:`, in rare cases Xcode doesn't print an `error:` even if it fails.

If you have the logs on your own machine then you can run something like this in your Terminal:

```
grep --color 'error:' my.log
grep --color 'warning:' my.log
```


## Xcode Scheme not found

The first thing you should check if you can't see your Xcode project's scheme
during setup, or if you get a `The project named "Foo" does not contain a scheme named "Bar"` error during build,
is your Xcode project settings.

* Check if the desired Scheme is shared
* When you share your scheme the Xcode project changes. Don't forget to **commit** and to **push** your changes!
* If the related validation is still running on Bitrise abort it and try to run it again.

![Xcode shared scheme](/img/ios/xcode-shared-scheme.png)

**Don't forget to commit & push the changes** if you just enabled the Shared option!
This change should be reflected in your `git` repository,
under you project / workspace
(which is actually a directory, just seems like a file in Finder):
`*.xcodeproj OR *.xcworkspace/xcshareddata/xcschemes/SchemeName.xcscheme`.

If you still can't see the desired Scheme,
try to look into your `.gitignore` file and check if you are ignoring the config files of your Xcode project.


## `ld: library not found for -lPods-...`

### Error:

```
ld: library not found for -lPods-...
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

### Solution:

Most likely you use Cocoapods but you specified the Xcode project (.xcodeproj) file
instead of the Workspace (`.xcworkspace`) file. Go to your App's **Workflow tab** on Bitrise,
click **Manage Workflows**, click **App Environments** and change the `BITRISE_PROJECT_PATH` item.
This will change the default Project Path configuration for every workflow.

**If it worked before** and the `BITRISE_PROJECT_PATH` did not solve the issue,
then check your App's other environments - the project file path might be overwritten by a Workflow environment variable,
or you might have specified a Project Path for the related Xcode step directly.


## Works in local but not on Bitrise.io

_An example error: `ld: file not found ...`_

First of all restart your Xcode and try a new build.

If it doesn't help try a **clean build** in Xcode.

If no error was displayed, try resetting your simulator(s).

Another problem could be your CocoaPods version.
Try updating your CocoaPods with the `[sudo] gem install cocoapods` command.
Also make sure that your `Podfile.lock` is **committed into your repository**,
as that's the file which describes the exact Pod versions you use.
*Without this Bitrise might download newer versions of Pods than the ones you use.*

If there's still no error try deleting the `Pods` folder in your project and run the `pod install` command again.

Finally, if none of the above helped, or you get an error with `ld: file not found` on Bitrise,
and the path contains `DerivedData`, with no other error message, like this:

```
ld: file not found: /Users/vagrant/Library/Developer/Xcode/DerivedData/...
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

Try deleting the Xcode local cache. After that the error should be reproducible on your local machine.

You can delete the local Xcode cache using your Terminal:

```
rm -rf ~/Library/Developer/Xcode/DerivedData
```


## Step hangs (times out after a period without any logs)

Check whether the scripts you use trigger any GUI prompts or popups, or wait for any user input.
If a script waits for any user input it can cause the build to hang.

Most frequent sources of this issue:

* `Xcode` (command line tools) might hang if you try to build a Scheme which is not marked as **shared**.
  Usually it hangs right after you start any `xcodebuild` command (e.g. `xcodebuild -list` or `xcodebuild .. archive`).
    * __Solution__: Please make sure that you marked the Scheme as **shared**,
      and that you actually committed & pushed it into your repository.
      For more information please follow this guide: [Xcode scheme not found](#xcode-scheme-not-found).
* Your script tries to access an item in the OS X Keychain and the item is configured to
  ask for permission before access (this is the default type of Access Control configuration
  if you add an item - for example a password - to Keychain)
* You try to use a script or tool which requires permissions where OS X presents a popup
  for acceptance (for example an `osascript`). You can use a workaround to allow the tool,
  without manual interaction by the user, for example by using [https://github.com/jacobsalmela/tccutil](https://github.com/jacobsalmela/tccutil).
    * For example to add `osascript` to the allowed OS X Accessibility list you can call **tccutil** from
      your script (don't forget to include it in your repository or download on-the-fly): `sudo python tccutil.py -i /usr/bin/osascript`
    * You can download the script from GitHub directly, for example: `wget https://raw.githubusercontent.com/jacobsalmela/tccutil/master/tccutil.py`.
* It can also be **something in your app's code**.
  An example: one of our user had a simple **popup in the app, presented only at the first start of the app**.
  Once the popup was dismissed, the fact was stored in the app's local storage, and the popup was not shown anymore.
  They did dismiss the popup on their iOS Simulator, but on Bitrise every build runs in a brand new,
  clean environment, which means that the simulator is in the same state as if you'd hit __"Reset Content and Settings"__ in the iOS Simulator's menu.
    * __Solution__: try to clean out the simulator/emulator before you'd run the tests on your Mac/PC, to simulate the "first run" experience.

It might also be that the build does not hang, **it just doesn't generate any log output**.
This can happen for various reasons;
you can find an example in case of an [iOS library project](https://github.com/bitrise-samples/xcodebuild-piped-output-issue-reproduction).

## CocoaPods frameworks signing issue

When you get an error something like this:

```
=== CLEAN TARGET Pods-Xxxxxxxxx OF PROJECT Pods WITH CONFIGURATION Release ===

Check dependencies
[BEROR]Code Sign error: No code signing identities found: No valid signing identities (i.e. certificate and private key pair) matching the team ID “(null)” were found.
[BEROR]CodeSign error: code signing is required for product type 'Framework' in SDK 'iOS 8.1'
```

This error is related to how CocoaPods expects code signing configurations for __frameworks__.

### Solution 1: make sure that you upload/include/install a wildcard development provisioning profile

Usually this issue does not happen on your local Mac, and this is the reason why it does not:
When Xcode performs an initial code signing (when it compiles the framework projects)
it requires a certificate and provisioning profile which can be used for
signing the CocoaPods framework projects.

On your Mac you most likely have your own Development certificate and
__Wildcard__ team provisioning profile, which is enough for Xcode to do the
initial code signing for the framework projects.

So, Solution #1 is exactly this, upload these (Development identity/certificate (.p12)
and the Team __wildcard__ provisioning profile) to [bitrise.io](https://www.bitrise.io),
and Xcode will work the same way as it does on your Mac.
It'll do an initial code signing with the development signing files,
and then it'll resign the archive when it exports the final IPA.


### Solution 2: modifying code signing settings through `Podfile`

One of our beloved user sent us the following fix for this problem.
You should add the following script as a `Post script` to your `Podfile`:

```
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['EXPANDED_CODE_SIGN_IDENTITY'] = ""
      config.build_settings['CODE_SIGNING_REQUIRED'] = "NO"
      config.build_settings['CODE_SIGNING_ALLOWED'] = "NO"
    end
  end
end
```

You can find a related CocoaPods issue and discussion at:
[https://github.com/CocoaPods/CocoaPods/issues/4331](https://github.com/CocoaPods/CocoaPods/issues/4331)

You can also find possible solutions at CocoaPod's official GitHub issues page,
like this one: [https://github.com/CocoaPods/CocoaPods/issues/3063](https://github.com/CocoaPods/CocoaPods/issues/3063).


## Installing an Enterprise app: `Untrusted Enterprise Developer`

If you try to install an Enterprise distribution signed app you might get a
popup when you try to run the app the first time, with the title **Untrusted Enterprise Developer**.

![iOS Untrusted Enterprise Developer popup](/img/ios/ios-untrusted-enterprise-developer.png)

Starting with iOS 9 there's no option to "Trust" the developer right from the popup.

You can Trust the developer and enable the app to run in iOS Settings:

1. Open the Settings app on your iPhone or iPad
2. Select the `General` category
3. Select the `Profile` option
    * starting with iOS 9.2 the option was renamed to `Device Management` instead of `Profile`
4. Tap on the Enterprise App option related to the app (the one mentioned in the popup)
5. Tap the `Trust "The Developer's Name"` button
6. A popup will appear, tap on `Trust` again

You should now be able to run the app, and any other Enterprise app from the same developer.


## No dSYM found

A couple of services require the dSYM to be present for deployment but you might have disabled the dSYM generation in your Xcode project.

### Solution:

To generate debug symbols (dSYM) go to your `Xcode Project's Settings -> Build Settings -> Debug Information Format` and set it to *DWARF with dSYM File*.


## Invalid IPA: get-task-allow values in the embedded .mobileprovision don't match your binary

**Solution:** Generate a new Certificate on the Apple Developer portal, **not** in Xcode.

Another solution might be: make sure you have the proper Signing Identity and Provisioning Profile
in Xcode project settings for both the target and for the project.


## No identity found

You uploaded the correct *Provisioning Profile* and *Certificate* pair,
if you check the identity hash it matches with the one you can see in your Keychain,
but you still get an error like:

```
22...D11: no identity found
```

**Solution:**

You probably have a configuration in your Xcode project settings which specifies
which keychain should be used for the build,
your scheme might include something like `--keychain /../../xxx.keychain` code signing flag
and a `CODE_SIGN_KEYCHAIN` variable set in the *.pbxproj*.

_This might happen if you migrate your Xcode Bot based setup into Bitrise._

To fix the issue you have to remove the keychain selection configurations from your
Xcode project settings.


## No mobileprovision_path found / No embedded.mobileprovision found in ...

Error: `No embedded.mobileprovision found in ...`

Or: `No mobileprovision_path found`


### Possible solution 1: `Skip Install` Xcode Settings

If you get this error in the Xcode Archive step you should check your Xcode Projects settings. Most likely you have the `Skip Install` option set to `YES`.

This should only be used for iOS frameworks, **for iOS apps this should be set to `NO`**.

You can find the official documentation at:
[https://developer.apple.com/library/ios/technotes/tn2215/_index.html](https://developer.apple.com/library/ios/technotes/tn2215/_index.html)
- under the *Xcode successfully archived my application, but the Archives Organizer does not list my archive* section.

### Possible solution 2: `Installation Directory` Xcode Settings

**Another cause of the issue can be** if you (or a tool you use) modifies
the `Build Setting -> Deployment -> Installation Directory` settings in your Xcode Project.
This can result in an `.xcarchive` where your app is not generated
into the canonical `Products/Applications` folder, but instead into a `Products/Users/USERNAME/...` folder,
including the full absolute path of an intermediate build.

**Solution:** Please make sure that the `Installation Directory` option is set to `$(LOCAL_APPS_DIR)`
(the default value when you generate a new iOS Xcode Project) or `/Applications`
(which is the default value of `$(LOCAL_APPS_DIR)`) in your Xcode Project settings,
and that no build tool you use modifies this option.

*Huge thanks to **Antje**, who reported this solution!*


## Duplicated Schemes

This is quite rare, but worth checking.
If you have multiple Schemes in your Xcode Project or Workspace with the **exact same name**,
when your project is built with Xcode's Command Line Tools Xcode will select one of these Schemes/Configurations,
__randomly__. This can result in random build success / failure,
and if you check the Raw Xcode output you'll see something like this:
`xcodebuild: error: Scheme YOUR_DUPLICATED_SCHEME is not currently configured for the test action` when it fails.

This might also happen if you use CocoaPods and one of your Pods have the same name as your project.

In any way you can debug this by listing the available Schemes with Xcode's command line tool.
In your project's directory run: `xcodebuild -workspace ./path/to/workspace/file -list` - or if you use a project file
instead of a workspace file: `xcodebuild -project ./path/to/project/file -list`.
There should be no duplicated Scheme in the printed list.
You can run this command on your Mac and on bitrise.io too (just add it to a Script step), and ideally you should see the same list.


## System dialog blocks the tests to run

_(huge thanks to [@AronI](https://github.com/AronI) who reported this issue and the solution)_

Error:

```
2016-09-08 07:30:34.535 XCTRunner[6174:22447] Running tests...\
07:30:35.399 XCTRunner[6174:22454] _XCT_testBundleReadyWithProtocolVersion:minimumVersion: reply received\
07:30:35.403 XCTRunner[6174:22453] _IDE_startExecutingTestPlanWithProtocolVersion:16\
2016-09-08 07:30:46.670 XCTRunner[6174:22447] Failed to background test runner within 10.0s.\
** TEST FAILED **\
\
}
```

Solution:

> So to put it simply my problem was my UI Tests were failing.

The steps leading to the failure were the following:

1. Unit tests run and pass. However a few of the unit tests are FBSnapshotTestCase tests
   which are kind of UI Tests but are still kept in the unit test bundle.
   They launch the app and compare screens with reference images of the screen.
2. When a FBSnapshot TestCase is run it launches the app and launches
   a system alert dialog asking the user for permission for push notifications
   (this is just something that's done in the AppDelegate in my app every fresh install).
3. When the UITests start the permissions dialog is still visible and overlaying the screen. 
4. The application tries to access some XCUIElements but fails because of the overlaying permissions dialog and eventually fails  

I resolved this by adding a check in the AppDelegate
(where we fire the permissions dialog) if we are running in unit test mode
and only asking for permissions when not running unit tests:

```
let unitTestMode = NSProcessInfo.processInfo().environment["XCTestConfigurationFilePath"] != nil
if !unitTestMode {
// IMPORTANT: Only ask permission for push notifications (or any notifications) when not running unit tests.
// The reason for doing this is that it's causing a build failure when the CI runs unit and UI tests.
// The build failure happens like this: 
// 1. FBSnapshotTestCase unit tests run and open the application
// 2. The application asks user for the permission to enable push notifications
// 3. FBSnapshotTestCase finish but the permissions dialog is still visible
// 4. UITests start with the permissions dialog overlaying the screen
// 5. UITest doesn't know what the hell is going on and eventually fails because the dialog is blocking everything

// 6.  BUILD FAILURE 

askForNotificationPermission()
}
```

> This is probably a pretty big edge case but just wanted to report this to you if someone might encounter this problem sometime.
> Hopefully this will come to use to someone.
