---
tag:
- monitoring
- trace
- ios
- android
title: Analyzing your app's performance with Trace
redirect_from: []
summary: Once you have the Trace SDK installed in your app, Bitrise's Trace add-on
  will provide real time monitoring for your app's performance across its entire install
  base.
menu:
  monitoring-main:
    weight: 3

---
[Once you have the Trace SDK](/monitoring/getting-started-with-trace/#installing-trace) installed in your app, Bitrise's Trace add-on will provide real time monitoring for your app's performance across its entire install base. You can track a wide variety of different metrics, all from the end users' perspective, to make sure that your app is performing as it should.

## Application performance overview

Log in to Trace and click **Overview** on the left to get to the Trace dashboard. On this page, you can check the performance of your apps over a selected period of time. This serves to give you a view on the shifts and trends in the app’s performance.

The data is displayed in separate widgets, with each widget focusing on a different metric. Depending on how often you wish to check in on your apps, you can select one of the supported digest views:

* **Daily**: The day-to-day performance of the app over the last two weeks.
* **Weekly**: A weekly performance summary of the app over the last 12 weeks.
* **Monthly**: A monthly performance summary of the app over the last 12 months.

![](/img/trace_dashboard_overview.png)

The available metrics are:

* **Live users**: The number of users/devices that have been using the app in the last five minutes.
* **Active users**: The total number of users that used the app over the period.
* **New users:** The proportion of new users that have started using the app.
* **User events**: The total number of different users events (page loads, network requests, and so on) performed.
* **Crash-free sessions**: The percentage of crash-free sessions. This is calculated by dividing the number of crashed user sessions with the number of all user sessions over the selected period of time.  
  ![](/img/trace_crash_free_sessions.png)
* **Cold start-up latency**: How long it takes for the app to launch on users' devices.
* **Version adoption**: The percentage of the different versions of the app used during the selected period of time.
* **Session duration**: The average duration of users' sessions with the app. A metric designed to measure engagement.

## Analyzing application performance in detail

For deeper analysis of your application performance, you need the **Performance** page of Trace. The primary purpose of the Performance page is to give you an overview of the performance of your app across the app’s entire install base.

![The Trace performance page](/img/Bitrise_-_Trace.png)

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

![Available session properties](/img/Bitrise_-_Trace-2.png)

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

![{{ page.title }}](/img/Bitrise_-_Trace-3.png)

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

![The performance details page](/img/Bitrise_-_Trace-4.png)

At the top of the page, you can see the metric inspector: it is a chart that displays the metric’s data over the specified time period, which you can set in the dropdown menu found in the top right corner.  Apply filters and sorting to narrow down your analysis of any issues.

Below the metric inspector, you’ll see detailed breakdowns of all session properties, such as app version, country, network carrier, and so on. For each breakdown you can see a plot for each item of that property. To put it in simpler terms: in the **App versions** breakdown of, say, the **Network errors** metric, you will see plots for the network errors of each app version that is tracked by Trace. You can easily create a plot analysis:

1. Find the breakdown you need (for example, **App versions**).
2. Click the specific plot you need (for example, version 2.6.30).  
   This will apply a session filter. It is the same as setting the same filter in the **Session filter** bar at the top of the page.

![Using the Session filter](/img/Bitrise_-_Trace-5.png)

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