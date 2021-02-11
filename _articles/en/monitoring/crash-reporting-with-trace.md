---
tag:
- trace
- ios
- android
- monitoring
title: Crash reporting with Trace
redirect_from: []
summary: 'Trace’s crash reporting feature helps you understand and prioritize the
  issues within your app. Trace provides crash reporting by default: all you need
  to do to make it work is to install Trace properly. '

---
Trace’s crash reporting feature helps you understand and prioritize the issues within your app. Trace provides crash reporting by default: all you need to do to make it work is to install the Trace SDK to your app. 

Within Trace itself, the **Crashes** page shows all crashes, the number of affected users, the affected app versions, and the last time these crashes were observed.

Trace will group your crash reports based on the exception details, so that you can clearly see the different issues being reported by your app. For each issue, we report the number of users that are affected by this problem, so that you can prioritize the critical issues.

## Finding a crash report

To check a crash report:

1. Go to the **Crashes** page in Trace.  
   ![The Crashes page in Trace](/img/trace-crashes.png)
2. Optionally, filter the reports by status (open or closed) or date range to find the relevant crashes easier.
3. Click on the crash report you need.

Clicking on a crash report takes you to the crash details view which displays all the relevant information about a crash.

## The crash details view

The crash details shows you plenty of information about any given crash:

* The first and last occurrence of the given crash type.
* The number of occurrences.
* The number of affected users.

The main body of the page shows the details of an individual instance of a crash report. You can inspect each instance by paging through them using the navigation buttons at the top.

![The crash details view in Trace](/img/trace-crash-details.png)

The provided details include:

* Device session properties: they help to understand the environment in which the crash occurred. The properties include app version, device type, and device OS version.
* Exception details and stack trace: they tell you exactly what happened and give your the module, file, and line number of the crash.
* Run-time thread states: the state of the other run-time threads of the app and their stack traces give more details about what was going on at the point the crash occurred.