---
title: Frequent iOS issues
redirect_from:
- "/ios/frequent-ios-issues/"
- "/ios/frequent-ios-issues/#works-in-local-but-not-on-bitriseio"
- "#works-in-local-but-not-on-bitriseio"
menu:
  troubleshooting:
    weight: 5

---
## Searching for errors and issues in Xcode generated output

{% include message_box.html type="note" title="Xcode output" content="The solutions presented here apply only to the raw, unfiltered output of Xcode. Every official Bitrise Xcode step has an `Output Tool` input with an `xcodebuild` option. If you can't find the error reason in the logs, make sure to switch the `Output Tool` option of any Xcode Step you use to `xcodebuild` (Xcode's Command Line Tool). This results in a verbose output but will include everything the way it's produced by `xcodebuild`. "%}

Search for `error:` in the Xcode logs: in 99% of the cases the error message covers the reason for your issues.

If that doesn't work, search for `warning:`. In rare cases Xcode doesn't print an `error:` even if it fails.

If you have the logs on your own machine, then you can run something like this in your Terminal:

    grep --color 'error:' my.log
    grep --color 'warning:' my.log

## Xcode Scheme not found

If you can't see your Xcode project's scheme during setup, or if you get a `The project named "Foo" does not contain a scheme named "Bar"` error during build, **check your Xcode project settings.**

* Check if the desired Scheme is shared - Bitrise only works with shared schemes.
* When you share your scheme, the Xcode project changes. Don't forget to **commit** and to **push** your changes!
* If the related validation is still running on Bitrise, abort it and try to run it again.

![Xcode shared scheme](/img/ios/xcode-shared-scheme.png)

**Don't forget to commit & push the changes** if you just enabled the Shared option! This change should be reflected in your `git` repository, under you project / workspace (which is actually a directory, just seems like a file in Finder): `*.xcodeproj OR *.xcworkspace/xcshareddata/xcschemes/SchemeName.xcscheme`.

If you still can't see the desired Scheme, look into your `.gitignore` file and check if you are ignoring the config files of your Xcode project.

## CocoaPods (missing) dependency issue

### Error

    ld: library not found for -lPods-...
    clang: error: linker command failed with exit code 1 (use -v to see invocation)

OR:

    no such module '...'

### Solution

The problem, usually, is that you use Cocoapods but you specified the Xcode project (`.xcodeproj`) file instead of the Workspace (`.xcworkspace`) file.

1. Go to your App's **Workflows** tab on Bitrise.
2. Click **Env Vars** and change the `BITRISE_PROJECT_PATH` item. This will change the default Project Path configuration for every workflow.

**If it worked before** and the `BITRISE_PROJECT_PATH` did not solve the issue, then check your App's other environment variables. The project file path might be overwritten by a Workflow environment variable, or you might have specified a Project Path for the related Xcode step directly.

## Fastlane Export Issue

_This section was contributed by_ [_@kwoylie_](https://github.com/kwoylie)_, and applies if you have a_ `Gemfile` _in your repository and you use the_ `fastlane` _step which uses the_ `Gemfile` _automatically if present._

### Error

`Gemfile` content was:

    gem "fastlane", "1.104.0"
    gem "gym", "1.10.0"
    gem "badge", "0.5.0"
    gem "CFPropertyList","2.3.3"
    gem "sqlite3", "1.3.11"

Fastlane, with xcpretty disabled, produced the following error on Bitrise:

    $/usr/bin/xcrun /usr/local/lib/ruby/gems/2.3.0/gems/gym-1.10.0/lib/assets/wrap_xcodebuild/xcbuild-safe.sh -exportArchive -exportOptionsPlist '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/gym_config20161003-2206-1f0vw3k.plist' -archivePath /Users/vagrant/Library/Developer/Xcode/Archives/2016-10-03/App\ 2016-10-03\ 05.57.17.xcarchive -exportPath '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/gym_output20161003-2206-wjhjai'
    + xcodebuild -exportArchive -exportOptionsPlist /var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/gym_config20161003-2206-1f0vw3k.plist -archivePath '/Users/vagrant/Library/Developer/Xcode/Archives/2016-10-03/App 2016-10-03 05.57.17.xcarchive' -exportPath /var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/gym_output20161003-2206-wjhjai
    2016-10-03 06:01:58.299 xcodebuild[5284:14924] [MT] IDEDistribution: -[IDEDistributionLogging _createLoggingBundleAtPath:]: Created bundle at path '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/App_2016-10-03_06-01-58.298.xcdistributionlogs'.
    2016-10-03 06:01:59.596 xcodebuild[5284:14924] [MT] IDEDistribution: Step failed: <IDEDistributionThinningStep: 0x7f868c80f810>: Error Domain=IDEDistributionErrorDomain Code=14 "No applicable devices found." UserInfo={NSLocalizedDescription=No applicable devices found.}
    error: exportArchive: No applicable devices found.
    
    Error Domain=IDEDistributionErrorDomain Code=14 "No applicable devices found." UserInfo={NSLocalizedDescription=No applicable devices found.}
    
    ** EXPORT FAILED **
    [06:01:59]: Exit status: 70
    [06:01:59]: 2016-10-03 13:01:58 +0000 [MT] Running step: IDEDistributionSigningAssetsStep with <IDEDistributionContext: 0x7f868c51ed70; archive(resolved)='<IDEArchive: 0x7f868c4af8d0>', distributionTask(resolved)='2', distributionMethod(resolved)='<IDEDistributionMethodEnterprise: 0x7f868c202a00>', teamID(resolved)='(null)'>
    	Chain (2, self inclusive):
    	<IDEDistributionContext: 0x7f868c51ed70; archive = '(null)', distributionMethod='<IDEDistributionMethodEnterprise: 0x7f868c202a00>', teamID='(null)'>
    	<IDEDistributionContext: 0x7f868c4b0e70; archive = '<IDEArchive: 0x7f868c4af8d0>', distributionMethod='(null)', teamID='(null)'>
    </IDEDistributionContext: 0x7f868c51ed70>

This error is misleading: it looks like it might be a code signing error or some configuration issue with fastlane. But if you look further into the error, you may see the following:

    2016-10-03 13:01:58 +0000 [MT] Running /Applications/Xcode.app/Contents/Developer/usr/bin/ipatool '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/IDEDistributionThinningStep.s1x' '--json' '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/ipatool-json-filepath-RUCdRR' '--info' '--toolchain' '/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr' '--platforms' '/Applications/Xcode.app/Contents/Developer/Platforms'
    2016-10-03 13:01:58 +0000  ruby 2.0.0p648 (2015-12-16 revision 53162) [universal.x86_64-darwin15]
    2016-10-03 13:01:59 +0000  /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/definition.rb:181:in `rescue in specs': Your bundle is locked to json (1.8.3), but that version could not be found in any of the sources listed in your Gemfile. If you haven't changed sources, that means the author of json (1.8.3) has removed it. You'll need to update your bundle to a different version of json (1.8.3) that hasn't been removed in order to install. (Bundler::GemNotFound)
    	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/definition.rb:175:in `specs'
    	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/definition.rb:235:in `specs_for'
    	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/definition.rb:224:in `requested_specs'
    	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/runtime.rb:118:in `block in definition_method'
    	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/runtime.rb:19:in `setup'
    	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler.rb:99:in `setup'
    	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/setup.rb:20:in `<top (required)>'
    	from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
    	from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
    2016-10-03 13:01:59 +0000 [MT] /Applications/Xcode.app/Contents/Developer/usr/bin/ipatool exited with 1
    2016-10-03 13:01:59 +0000 [MT] ipatool JSON: (null)

What happens is that fastlane reverts back to the Mac OS system's Ruby for exporting. But the system Ruby doesn't have json 1.8.3 installed.

### Solution

Add a `Script` step to run the following:

    sudo /usr/bin/gem install bundler

This will install bundler on the system Ruby and when the fastlane plugin calls bundle install, then system Ruby will also install the neccessary dependencies.

## The build works in local but not on bitrise.io

### Error

_Example:_ `_ld: file not found ..._`

### Solution

Go through the following steps. After every step, check if it solved your issue.

1. Restart your Xcode and try a new build.
2. Try a **clean build** in Xcode.
3. Try resetting your simulator(s).
4. If you use Cocoapods, try updating it:

       [sudo] gem install cocoapods

   Also make sure that your `Podfile.lock` is **committed into your repository**. The file describes exactly what versions of Pods you use. _Without this file Bitrise might download newer versions of Pods than the ones you use._
5. Try deleting the `Pods` folder in your project and run the `pod install` command again.

If none of the above helped, try deleting the Xcode local cache. After that the error should be reproducible on your local machine.

You can delete the local Xcode cache using your Terminal:

    rm -rf ~/Library/Developer/Xcode/DerivedData

## A Step hangs

If a Step times out after a period without any logs, check if the scripts you use trigger any GUI prompts or popups, or wait for any user input. If a script waits for any user input, it can cause the build to hang.

Most frequent sources of this issue with an iOS project:

* Trying to build a Scheme which is not marked as **shared**. Usually, it hangs right after you start any `xcodebuild` command (for example, `xcodebuild -list` or `xcodebuild .. archive`).
  * **Solution**: Make sure that you marked the Scheme as **shared**, and that you actually committed & pushed it into your repository.
* Your script tries to access an item in the OS X Keychain and the item is configured to ask for permission before access (this is the default type of Access Control configuration if you add an item - for example a password - to Keychain)
* You try to use a script or tool which requires permissions where OS X presents a popup for acceptance (for example an `osascript`). You can use a workaround to allow the tool, without manual interaction by the user. For example, try using [https://github.com/jacobsalmela/tccutil](https://github.com/jacobsalmela/tccutil).
  * For example, to add `osascript` to the allowed OS X Accessibility list, you can call **tccutil** from your script (don't forget to include it in your repository or download on-the-fly): `sudo python tccutil.py -i /usr/bin/osascript`
  * You can download the script from GitHub directly. For example: `wget https://raw.githubusercontent.com/jacobsalmela/tccutil/master/tccutil.py`.
* It can also be **something in your app's code**. An example: one of our users had a simple **popup in the app, presented only at the first start of the app**. Once the popup was dismissed, the fact was stored in the app's local storage, and the popup was not shown anymore. They did dismiss the popup on their iOS Simulator, but on Bitrise every build runs in a brand new, clean environment, which means that the simulator is in the same state as if you'd hit **"Reset Content and Settings"** in the iOS Simulator's menu.
  * **Solution**: try to clean out the simulator/emulator before running tests on your Mac/PC, to simulate the "first run" experience.

Occasionally, a build **just doesn't generate any log output**. This can happen for various reasons; you can find an example in case of an [iOS library project](https://github.com/bitrise-samples/xcodebuild-piped-output-issue-reproduction).

## CocoaPods frameworks signing issue

This error is related to how CocoaPods expects code signing configurations for **frameworks**.

### Error

    === CLEAN TARGET Pods-Xxxxxxxxx OF PROJECT Pods WITH CONFIGURATION Release ===
    
    Check dependencies
    [BEROR]Code Sign error: No code signing identities found: No valid signing identities (i.e. certificate and private key pair) matching the team ID “(null)” were found.
    [BEROR]CodeSign error: code signing is required for product type 'Framework' in SDK 'iOS 8.1'

### Solution 1: a wildcard development provisioning profile

When Xcode performs an initial code signing (when it compiles the framework projects), it requires a certificate and provisioning profile which can be used for signing the CocoaPods framework projects.

On your Mac, you most likely have your own Development certificate and **Wildcard** team provisioning profile, which is enough for Xcode to do the initial code signing for the framework projects.

So upload these (Development identity/certificate (.p12) and the Team **wildcard** provisioning profile) to [bitrise.io](https://www.bitrise.io). Xcode will do an initial code signing with the development signing files, and then it'll resign the archive when it exports the final IPA.

### Solution 2: modifying code signing settings through `Podfile`

One of our beloved users sent us the following fix for this problem. Add the following script as a `Post script` to your `Podfile`:

    post_install do |installer|
      installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
          config.build_settings['EXPANDED_CODE_SIGN_IDENTITY'] = ""
          config.build_settings['CODE_SIGNING_REQUIRED'] = "NO"
          config.build_settings['CODE_SIGNING_ALLOWED'] = "NO"
        end
      end
    end

You can find a related CocoaPods issue and discussion at: [https://github.com/CocoaPods/CocoaPods/issues/4331](https://github.com/CocoaPods/CocoaPods/issues/4331 "https://github.com/CocoaPods/CocoaPods/issues/4331")

You can also find possible solutions at CocoaPod's official GitHub issues page, like this one: [https://github.com/CocoaPods/CocoaPods/issues/3063](https://github.com/CocoaPods/CocoaPods/issues/3063 "https://github.com/CocoaPods/CocoaPods/issues/3063").

## Installing an Enterprise app: `Untrusted Enterprise Developer`

If you try to install an Enterprise distribution signed app you might get a popup when you try to run the app the first time, with the title **Untrusted Enterprise Developer**.

![iOS Untrusted Enterprise Developer popup](/img/ios/ios-untrusted-enterprise-developer.png)

Starting with iOS 9, there's no option to "Trust" the developer right from the popup.

You can Trust the developer and enable the app to run in iOS Settings:

1. Open the Settings app on your iPhone or iPad.
2. Select the `General` category.
3. Select the `Profile` option.
   * starting with iOS 9.2 the option was renamed to `Device Management` instead of `Profile`
4. Tap on the Enterprise App option related to the app (the one mentioned in the popup).
5. Tap the `Trust "The Developer's Name"` button.
6. A popup will appear, tap on `Trust` again.

You should now be able to run the app, and any other Enterprise app from the same developer.

## No dSYM found

A couple of services require debug symbols (dSYM) to be present for deployment but dSYM generation might have been disabled in your Xcode project.

### Solution

To generate dSYM, go to your `Xcode Project's Settings -> Build Settings -> Debug Information Format` and set it to _DWARF with dSYM File_.

## Invalid IPA

### Error

Invalid IPA: get-task-allow values in the embedded `.mobileprovision` don't match your binary.

### Solution

Generate a new Certificate on the Apple Developer portal, **not** in Xcode.

Another possible solution: make sure you have the proper Signing Identity and Provisioning Profile in Xcode project settings for both the target and for the project.

## No identity found

### Error

You uploaded the correct _Provisioning Profile_ and _Certificate_ pair, if you check the identity hash it matches with the one you can see in your Keychain, but you still get an error like:

    22...D11: no identity found

### **Solution**

You probably have a configuration in your Xcode project settings which specifies which keychain should be used for the build, your scheme might include something like `--keychain /../../xxx.keychain` code signing flag and a `CODE_SIGN_KEYCHAIN` variable set in the _.pbxproj_.

_This might happen if you migrate your Xcode Bot based setup into Bitrise._

To fix the issue you have to remove the keychain selection configurations from your Xcode project settings.

## No mobileprovision_path found / No embedded.mobileprovision found in ...

### Error

`No embedded.mobileprovision found in ...`

Or: `No mobileprovision_path found`

### Solution 1: `Skip Install` Xcode Settings

If you get this error in the Xcode Archive step, you should check your Xcode Projects settings. Most likely you have the `Skip Install` option set to `YES`.

This should only be used for iOS frameworks! **For iOS apps this should be set to** `NO`.

You can check out [the official documentation](https://developer.apple.com/library/ios/technotes/tn2215/_index.html). Look up the _Xcode successfully archived my application, but the Archives Organizer does not list my archive_ section.

### Solution 2: `Installation Directory` Xcode Settings

If something modifies the `Build Setting -> Deployment -> Installation Directory` settings in your Xcode Project, it can result in an `.xcarchive` where your app is not generated into the canonical `Products/Applications` folder, but instead into a `Products/Users/USERNAME/...` folder, including the full absolute path of an intermediate build.

**Solution:** Make sure that the `Installation Directory` option is set to `$(LOCAL_APPS_DIR)` (the default value when you generate a new iOS Xcode Project) or `/Applications` (which is the default value of `$(LOCAL_APPS_DIR)`) in your Xcode Project settings, and that no build tool you use modifies this option.

_Huge thanks to **Antje**, who reported this solution!_

## Duplicated Schemes

If you have multiple Schemes in your Xcode Project or Workspace with the **exact same name**, Xcode will select one of these Schemes/Configurations **randomly** when building your project. This can result in random build success / failure, and if you check the raw Xcode output, you'll see something like this: `xcodebuild: error: Scheme YOUR_DUPLICATED_SCHEME is not currently configured for the test action` when it fails.

This can also happen if you use CocoaPods and one of your Pods have the same name as your project.

To debug this, list the available Schemes with Xcode's command line tool. In your project's directory, run:

    xcodebuild -workspace ./path/to/workspace/file -list

If you use a project file instead of a workspace file, run this:

    xcodebuild -project ./path/to/project/file -list

There should be no duplicated Scheme in the printed list. To run this command on [bitrise.io](https://www.bitrise.io/), add it to a Script step. Compare the results after running it both on your computer and on [bitrise.io](https://www.bitrise.io/): the lists should be identical.

## System dialog blocks the tests to run

_(huge thanks to_ [_@AronI_](https://github.com/AronI) _who reported this issue and the solution)_

Error:

    2016-09-08 07:30:34.535 XCTRunner[6174:22447] Running tests...\
    07:30:35.399 XCTRunner[6174:22454] _XCT_testBundleReadyWithProtocolVersion:minimumVersion: reply received\
    07:30:35.403 XCTRunner[6174:22453] _IDE_startExecutingTestPlanWithProtocolVersion:16\
    2016-09-08 07:30:46.670 XCTRunner[6174:22447] Failed to background test runner within 10.0s.\
    ** TEST FAILED **\
    \
    }

1. Unit tests run and pass. However, a few of the unit tests are FBSnapshotTestCase tests which are kind of UI Tests but are still kept in the unit test bundle. They launch the app and compare screens with reference images of the screen.
2. When a FBSnapshot TestCase is run, it launches the app and launches a system alert dialog asking the user for permission for push notifications (this is just something that's done in the AppDelegate in my app at every fresh install).
3. When the UITests start, the permissions dialog is still visible and overlaying the screen.
4. The application tries to access some XCUIElements but fails because of the overlaying permissions dialog and eventually fails.

Solution:

I resolved this by adding a check in the AppDelegate (where we fire the permissions dialog) if we are running in unit test mode and only asking for permissions when not running unit tests:

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