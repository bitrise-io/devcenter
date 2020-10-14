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
{% include message_box.html type="important" title="Beta feature" content="Please note that this feature is still in beta phase! You can sign up for the beta [here](https://www.bitrise.io/add-ons/trace-mobile-monitoring)!"%}

Trace is a Bitrise add-on designed to monitor your applications from the perspective of its end users. It comes with out-of-the-box performance monitoring, giving you insight into how the app is performing across the entire install base.

{% include message_box.html type="important" title="iOS apps only" content="For now, Trace is only supported for iOS apps. "%}

## Accessing Trace on Bitrise

To access the Trace add-on on Bitrise:

1. Open an app on Bitrise.
2. Go to the **Add-ons** tab.
3. Click **Go to add-on**.

However, to actually use Trace and being able to gather data from it, you'll need the Trace SDK installed to your app.

## Installing Trace

Trace works by installing the Trace SDK to your application during the Bitrise build process. You can do this manually - using CocoaPods or the Swift Package Manager - on any device to test it, and once you’re ready to automate your process, you can simply use our dedicated Step on Bitrise.

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

If all went well, Trace will track application data. Let’s talk about how to analyze that data that Trace provides!"%}

## Analyzing application performance

The first stop for analyzing performance is the **Performance** page of Trace. The primary purpose of the Performance page is to give you an overview of the performance of your app across the app’s entire install base.

![](/img/Bitrise_-_Trace.png)

You can check the performance of your apps in three distinct categories of metrics on the **Performance** page:

* Application stability metrics: they show how reliable your app is.
* Application responsiveness metrics: they show how quickly the app responds to user interaction.
* Application consumption metrics: they show how much resources your app needs to run.

On the **Performance** page, you can check all these metrics, and break them down based on various properties, such as device type, operating system, network carrier, and so on. Read on to find out about the specific metrics, and how to take advantage of Trace’s analysis features.

### Application stability metrics

Trace tracks three stability-related metrics:

* Crashes: how many fatal errors the app has reported.
* Errors: how many non-fatal errors have been generated.
* Network errors: how many network request errors have been generated.

### Application responsiveness metrics

Trace tracks three responsiveness-related metrics:

* Cold start latency: how long the app takes to load when it is already running in the background.
* Warm start latency: how long the app takes to be ready when returning to the foreground from a background state.
* Network request latency: how long network requests made by the app take to complete.

### Application consumption metrics

Trace tracks three metrics related to what an application consumes:

* CPU: this the total CPU usage of the the app across all cores.
* Memory: the total number of bytes of memory actively used by the app.
* Request count: this is the number of network requests being made by the app.

### Filtering and sorting metrics

On the Trace **Performance** page, you can:

* Filter the tracked sessions to focus only on certain session types in your analysis.
* Get a breakdown of the metrics with sorting them based on certain properties.
* Set a data range for the metrics you want to view.

Various session properties are available for filtering, including:

* App version: The version of the application.
* Country: The country the session originated from.
* OS version: The version of the device’s operating system.
* Device type: The type of device on which the session ran.
* Network: The type of network the app is connected from.
* Carrier: The cellular carrier for the device.

![](/img/Bitrise_-_Trace-2.png)

You can filter for any and all of these. For example, you can set the **Country** filter to **United States** and the **Device** filter to **iPhone X**. This means that Trace will show the metrics collected from users in the United States who use your app on an iPhone X.

By default, no filter is active: the metrics of all sessions monitored by Trace are displayed on the **Performance** page. To set a filter:

1. Click on the filter bar below the **Performance** heading.  
   By default, this bar displays **All sessions**.
2. Choose the filters you need.

You can also group the individual metrics based on the above categories. Grouping means getting a breakdown of the metric based on the selected category. To do so:

1. Find the metric you need; for example, **App Error Rate**.
2. To the right of the name of the metric, open the dropdown menu.
3. Choose the category you need.  
   For example, if you select **Device**, you will see the app error rate, grouped by device type.

![](/img/Bitrise_-_Trace-3.png)

You can also set a date range for the available metrics. To do so:

1. Click the date range dropdown menu in the top right (by default, it says **Last** **24 Hours**).
2. Choose the date range you need.

### Checking the details of a metric

To check any of the metrics:

1. Go to the **Performance** page.
2. Find the metric you need.
3. Click **Details** to go to the **Performance details** page.

### Analyzing performance details

The **Performance details** page gives you a full breakdown of any selected metric. You can apply the same filtering and sorting to the sessions as on the **Performance** page, and set a date range the same way.

![](/img/Bitrise_-_Trace-4.png)

At the top of the page, you can see the metric inspector: it is a chart that displays the metric’s data over the specified time period, which you can set in the dropdown menu found in the top right corner.  Apply filters and sorting to narrow down your analysis of any issues.

Below the metric inspector, you’ll see detailed breakdowns of all session properties, such as app version, country, network carrier, and so on. For each breakdown you can see a plot for each item of that property. To put it in simpler terms: in the **App versions** breakdown of, say, the **Network errors** metric, you will see plots for the network errors of each app version that is tracked by Trace. You can easily create a plot analysis:

1. Find the breakdown you need (for example, **App versions**).
2. Click the specific plot you need (for example, version 2.6.30).  
   This will apply a session filter. It is the same as setting the same filter in the **Session filter** bar at the top of the page.

![](/img/Bitrise_-_Trace-5.png)

And that’s it: now every breakdown will show data related to only the selected plot (in our example, app version 2.3).

### Analyzing sessions

Performance metrics in themselves give no indication to what the users of the apps did in a specific session. For example, the app crash rate shows the number of crashes but doesn’t give you any context to the crashes themselves, and how the users triggered them. To do so, you need to use the **Session Explorer** page.

The **Session Explorer** shows the specific details of what happened during a user session as well as details about the environment on which the session occurred, all vital in locating and reproducing a problem. The data includes all important session properties, such as app version, device type, OS version, network type, and carrier, as well as the duration of the session and a user journey. The user journey shows what parts of the app the user viewed and interacted with and the duration of the interactions.

To check out individual sessions:

1. Go to the **Performance** page in Trace.
2. Select a metric - for example, **App Crash Rate** -, and click **Details**.
3. In the top right corner, click **See User Sessions**.
4. Set a date range for the sessions you want to see - for example, 24 hours.
5. Navigate between the different user sessions with the in the top right.
6. To see a user journey in detail, scroll down to the **User Journey** section, and click **Show All**.

{% include banner.html banner_text="Monitor your apps with Trace" url="https://www.bitrise.io/add-ons/trace-mobile-monitoring?utm_source=devcenter&utm_medium=bottom_cta" button_text="Sign up for the beta" %}