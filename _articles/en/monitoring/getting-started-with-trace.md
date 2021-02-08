---
tag:
- trace
- add-ons
- devops
- monitoring
- deploy
- ios
title: Getting started with Trace
redirect_from: "/trace/getting-started/"
description: Trace is a Bitrise add-on designed to monitor your applications from
  the perspective of its end users. It comes with out-of-the-box performance monitoring,
  giving you insight into how the app is performing across the entire install base.
menu:
  monitoring-main:
    weight: 2

---
Trace is a Bitrise add-on designed to monitor your applications from the perspective of its end users. It comes with out-of-the-box performance monitoring, giving you insight into how the app is performing across the entire install base.

## Accessing Trace on Bitrise

To access the Trace add-on on Bitrise:

1. Open an app on Bitrise.
2. Go to the **Add-ons** tab.
3. Click **Go to add-on**.

However, to actually use Trace and being able to gather data from it, you'll need the Trace SDK installed to your app.

## Installing Trace

Trace works by installing the Trace SDK to your application during the Bitrise build process. You can do this manually - using CocoaPods or the Swift Package Manager for iOS, or Gradle for Android - on any device to test it, and once you’re ready to automate your process, you can simply use our dedicated Step on Bitrise.

### Installing Trace for iOS

{% include message_box.html type="important" title="Xcode version requirement" content="To add Trace to your iOS app, you must use Xcode 11.5 or higher! Trace is not compatible with older versions of Xcode. "%}

{% include collapse.html title="Installing Trace using Cocoapods" content="Before adding Trace to your apps on Bitrise, try it out first. We’ll walk you through the process using a sample app - but of course you can use any of your own repositories instead of our sample!

In this example, we’re going to use CocoaPods to install the Trace SDK. Let’s see how!

Please note that once you installed Trace, it can take up to an hour for it to start process your data - until then you won’t see any data on your Trace dashboard.

 1. Clone the app and go to its directory on your machine:

        $ git clone https://github.com/bitrise-io/BookStore-iOS.git
        $ cd BookStore-iOS/
 2. Open the Podfile of the app and add the Trace SDK to it:

        # Podfile
        
        target 'YOUR_TARGET_NAME' do
          pod 'BitriseTrace'
        end 
 3. Install the SDK by running `pod install`.  
    If you’ve done everything right, the **Pod installation complete!** message should appear.
 4. Open Trace on Bitrise: go to your app, click the **Add-ons** tab, find Trace, and click **Go to Add-on**.
 5. In the top-right, click **Getting started**.
 6. Find the **Download Config file** step, and click **Download**.
 7. Open your app in Xcode:

        $ open BookStore.xcworkspace/ 
 8. Add the `bitrise_configuration.plist` file to your app by dragging and dropping it to the root of the project.

    ![](/img/trace-6.png)
 9. If prompted to choose from different options for adding the files, choose your project - BookStore in our example -, and click **Finish**.

    ![](/img/trace-7.png)
10. Build and run the app in a simulator or on a device." %}

{% include collapse.html title="Installing Trace with the Swift Package Manager" content="The Swift Package Manager (SPM) is a tool for managing the distribution of Swift code. It’s integrated with the Swift build system to automate the process of downloading, compiling, and linking dependencies. You can use the SPM to install the Trace SDK.

The installation process has three stages:

1. [Adding the `bitrise_configuration.plist` file to your Xcode project](/monitoring/getting-started-with-trace/#adding-the-config-file-to-your-app).
2. [Initializing the Trace SDK with the SPM](/monitoring/getting-started-with-trace/#initializing-the-sdk).
3. [Configuring your Xcode project to be able to run Trace](/monitoring/getting-started-with-trace/#configuring-your-xcode-project-to-run-trace).

#### Adding the config file to your app

To use Trace on Bitrise, you need to have a `bitrise_configuration.plist` file in your Xcode project.

1. On your own machine, clone the repository of your app, and enter its directory.  
   In this example we’re using a sample app; you can use that, too, to try out Trace, or you can replace it with your own app.

   ```  
   git clone git@github.com:bitrise-io/iosCCC.git
   
   cd iosCCC/  
   ```
2. Open Trace on Bitrise: go to your app, click the **Add-ons** tab, find Trace, and click **Go to Add-on**.
3. In the top-right, click **Getting started**.
4. Find the **Download Config file** step, and click **Download**.
5. Open your app in Xcode.
6. Add the bitrise_configuration.plist file to the Xcode project by dragging and dropping it to the root of the project.

When done, proceed to initializing the SDK.

#### Initializing the SDK

After [adding the `bitrise_configuration.plist` file to your Xcode project](/monitoring/getting-started-with-trace/#adding-the-config-file-to-your-app), you need to add Trace to the Swift Package Manager.

1. Go to **File** > **Swift Packages** > **Add Package Dependency**.
2. Enter the repository URL: [https://github.com/bitrise-io/trace-cocoa-sdk.git](https://github.com/bitrise-io/trace-cocoa-sdk.git).

   ![](/img/choose-package-repository.png)

When done, proceed to adding Other Linker Flags to application target and creating a Trace object in code.

#### Configuring your Xcode project to run Trace

After [adding the `bitrise_configuration.plist` file to your Xcode project](/monitoring/getting-started-with-trace/#adding-the-config-file-to-your-app), and [adding Trace to the Swift Package Manager](/monitoring/getting-started-with-trace/#initializing-the-sdk), you need a couple more things to make Trace work:

* Add Other Linker Flags to application target.
* Create a Trace object in code.

1. In Xcode, select your project in the **Project Navigator**.
2. Under the **Targets** heading in the sidebar, select the application target.
3. In the tab bar at the top of that window, open the **Build Settings** panel.
4. Search for Other Linker Flags or OTHER_LDFLAGS and enter the following:

       -ObjC -l z -l c++
5. In the Xcode project, start the SDK by creating a Trace object:

       import SwiftUI
       import Trace
       
       @main
       struct App: SwiftUI.App {
         @StateObject var viewModel = AppViewModel()
         private let trace = Trace.shared
       }   
6. Build and run the app in a simulator or on a device.
   "%}

{% include collapse.html title="Installing Trace with a Bitrise Step" content="On Bitrise itself, installing Trace is simple: you only need to add the **Add Trace SDK** Step to your Workflow. The Step must come before the application’s binary itself is built. For example, if you build an iOS app, the Step must come before the **Xcode Archive & Export for iOS** Step.

To install Trace:

1. Open the Workflow Editor of your app.
2. Open the Workflow you use to build the app.
3. Add the **Add Trace SDK** Step before the Step that builds your’s app binary.
4. Check that the **Project (or Workspace) path** and the **Scheme name** input values are both correct.  
   By default, both values are Environment Variables which are created and stored at the creation of the app.
5. Run a build!

If all went well, Trace will track application data."%}

Once you have the SDK installed, all you need to do is deploy the apps for your users, and watch the data coming in. [Let’s talk about how to analyze that data that Trace provides!](/monitoring/analyzing-your-apps-data-with-trace/)

### Installing Trace for Android 

You can install the Trace SDK for Android apps in two ways: you can either do it using Gradle in Android Studio, or simply by adding our dedicated Step to your Workflow.

{% include collapse.html title="Installing Trace with Gradle" content="To install Trace with Gradle, you’ll need to:

* Add the bitrise-addons-configuration.json file to your app.
* Initialize the Trace SDK.

#### Adding the config file to your app

To use Trace on Bitrise, you need to have a `bitrise-addons-configuration.json` file in your Android project.

1. Open Trace on Bitrise: go to your app, click the **Add-ons** tab, find Trace, and click **Go to Add-on**.
1. In the top-right, click **Getting started**.
1. Find the Download Config file step, and click **Download**.
1. On your own device, open Android Studio and place the file in the root of your project.

#### Initializing the Trace SDK

To start using the Trace SDK, you need to initialize it in your Gradle project. 

1. Open the build.gradle file in the root of your project.
1. Locate the dependencies block inside the buildscript block and add the following:
   ```
   classpath 'io.bitrise.trace.plugin:trace-gradle-plugin:[latestVersion]'
   ```
   Please note that [latestversion] is used as a placeholder here. Replace it with the version number of latest version of the Trace SDK, for example, 0.0.3. You can find the latest released version here: [Trace SDK](https://repo1.maven.org/maven2/io/bitrise/trace/trace-sdk/).
1. Open the build.gradle file in your application module.
1. Add the following after the other apply plugin statements:
   ```
   apply plugin: 'io.bitrise.trace.plugin' 
   ```
1. Staying in the application module of the build.gradle file, add the following dependency:
   ```
   implementation 'io.bitrise.trace:trace-sdk:[latestVersion]'
   ```

That’s it. Now you can run your project in Android Studio. The first build will take several minutes longer than usual because the Trace SDK is applying the plug-in. 

"%}

{% include collapse.html title="Installing Trace with a Bitrise Step" content="On Bitrise itself, installing Trace is simple: you only need to add the **Add Trace SDK Android** Step to your Workflow. The Step must come before the application’s binary itself is built. For example, if you build an Android app, the Step must come before the Step that builds your APK or AAB file, such as the **Android Build** or the **Gradle Runner** Step.

To install Trace:

1. Open the Workflow Editor of your app.
1. Open the Workflow you use to build the app.
1. Add the Add Trace SDK Step before the Step that builds your’s app binary.
1. Check that the Project (or Workspace) path and the Scheme name input values are both correct.
   By default, both values are Environment Variables which are created and stored at the creation of the app.
1. Run a build!

If all went well, Trace will track application data.
"%}

Once you have the SDK installed, all you need to do is deploy the apps for your users, and watch the data coming in. [Let’s talk about how to analyze that data that Trace provides!](/monitoring/analyzing-your-apps-data-with-trace/)

{% include banner.html banner_text="Monitor your apps with Trace" url="https://www.bitrise.io/add-ons/trace-mobile-monitoring?utm_source=devcenter&utm_medium=bottom_cta" button_text="Check out Trace now" %}