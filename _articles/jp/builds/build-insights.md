---
tag: []
title: Build Insights
redirect_from: []
summary: ''
menu:
  builds-main:
    weight: 38

---
{% include not_translated_yet.html %}

Build Insights is a monitoring tool that allows you to track metrics detailing the performance of your Bitrise builds. Track your metrics on app-, Workflow-, and Step-level and use the data to optimize your builds. With the Insights tool, we are targeting three main areas:

* **Stability:** Which errors have the highest impact on your builds?
* **Velocity:** Which area should you focus on to improve the speed of your builds?
* **Usage:** Which Steps and Workflows take the most time in your builds?

## Getting started with Insights

Insights constantly tracks the performance of all the apps of your Workspaces. You can get aggregated build data of all your apps on the Workspace’s Insights dashboard and you can view the list of apps belonging to that Workspace, allowing you to get to the detailed metrics of each app.

To get to your Insights dashboard:

1. Log in to your Bitrise account.
2. In the top right corner, open the account selector dropdown menu and select a Workspace.
3. On the header, click **Insights**. This takes you to the Insights dashboard of the selected Workspace.

### The Insights dashboard

On the dashboard, you can see aggregated build data of the selected Workspace. You have access to two main categories of metrics: build stats and build usage. Both display the aggregated metrics of all the Workspace’s apps for the [selected timeframe](/builds/build-insights/#viewing-data-from-a-specific-timeframe).

![](/img/bitrise_-_mobile_continuous_integration_and_delivery_-_ios___android_build_automation.png)

You can switch between Workspaces at any time: in the top right corner, open the account selector dropdown menu and select a Workspace.

The **Build stats** section displays metrics such as average successful build time, total build count, or build usage.

The **Build usage** section allows you to view credit usage (for credit-based accounts) or build time usage (for concurrency-based accounts). You can choose between viewing the cumulative data, or interval-based data (for example, credit usage per each week throughout the last 8 weeks).

### Getting the data of a specific app

On the Insights dashboard, choose an app to view its metrics.

1. Find the app. You can either:
   1. Search for the app’s name in the search bar.
   2. Scroll down to the **Apps** section and find the app there.
2. Click the app’s name.

![](/img/bitrise_-_mobile_continuous_integration_and_delivery_-_ios___android_build_automation.png)

## Viewing data from a specific timeframe

By default, all Insights pages display your metrics on a weekly basis from the last 4 weeks. Modify the basis and timeframe by opening the respective dropdown menu in the top right of the page, and selecting the options you need.

![](/img/bitrise_-_mobile_continuous_integration_and_delivery_-_ios___android_build_automation.png)

You can choose to view the data on an hourly, daily, weekly, or monthly basis, and you can either select from pre-defined timeframes or set a custom timeframe.

## App overview

Opening an app’s build monitoring in Insights takes you to the **Overview** page where you can see your app’s main metrics, build trends, and an overview of Workflow performance.

* In the **App stats** section, you can find the main build metrics for all builds of the app, regardless of Workflow.
* The **Successful build time** graph display how much time the app’s successful builds took on average.
* The **Build usage** section allows you to view credit usage (for credit-based accounts) or build time usage (for concurrency-based accounts). You can choose between viewing the cumulative data, or interval-based data (for example, credit usage per each week throughout the last 8 weeks).
* The **Latest builds** section displays the latest builds of the app individually, with the colors indicating their final status: green builds are successful, red builds are failed. Click on any individual build to view its build log.

  ![](/img/bitrise_-_mobile_continuous_integration_and_delivery_-_ios___android_build_automation.png)
* In the **Workflows** section, you can find the main build metrics for each Workflow of the app.

For more details and definitions of the metrics shown in the App overview page, see [Available metrics](/builds/build-insights/#available-metrics).

## Analyzing Workflow performance

To look at the performance data of each Workflow separately, scroll down to the **Workflows** section and click the Workflow you want to see.

![](/img/bitrise_-_mobile_continuous_integration_and_delivery_-_ios___android_build_automation.png)

On the Workflow page, you can see the same metrics as on the [App overview](/builds/build-insights/#app-overview) page but filtered for the Workflow in question. You can also get detailed data on all the latest builds of that Workflow, and their aggregated metrics.

In the **Steps** section, you can check the build metrics for each Step of the Workflow separately.

For the details and definitions of the metrics shown on a given Workflow’s page, see [Available metrics](/builds/build-insights/#available-metrics) and [Latest builds](/builds/build-insights/#latest-builds).

## Available metrics

### Basic build metrics

The following metrics are available on app-, Workflow, and Step level as well:

* **Success rate:** The rate of successful builds, or the rate at which a given Workflow or Step ran successfully. For example, if a **Script** Step finished successfully six times out of ten in a given Workflow, its success rate is 60%. Please note that success rate is calculated using completed runs. Aborted builds or skipped Steps do not count towards this metric.
* **Number of builds:** The total number of builds started.
* **Typical build time:** The median time of a successful build. In the case of Steps, the median time it took to successfully run the Step.
* **Top build time:** The 95th percentile of build times of successful builds. In other words, the slowest 5% of successful builds. In the case of Steps, it indicates the slowest 5% of successful runs of the Step.
* **Build usage:** For concurrency-based accounts, it is the total time spent building, or running a given Step. For credit-based accounts, it’s the amount of credits used while building, or while running a given Step.
* **Latest builds**: Displays the final status of the last ten builds. In the case of Steps, it shows the final status of a given Step in the last ten builds. Click on any individual build to view its build log.

### Successful build time

The **Successful build time** graph is available on both the **App overview** page and on any specific Workflow’s page. It displays how much time your successful builds took.

* On the **App overview** page, the graph displays builds on your app’s default branch and compares the build times to builds run on other branches, if there were any. You can view either the typical successful build time, or the top successful build time, which means the slowest 5% of successful builds.
* On a specific Workflow’s page, the graph displays builds that ran using that particular Workflow. As on the **App overview** page, you can view either the typical successful build time, or the top successful build time, which means the slowest 5% of successful builds.

### Latest builds

The **Latest builds** graph is available on the app overview page and on the page of a specific Workflow: it shows all latest builds - [depending on your selected timeframe](/builds/build-insights/#viewing-data-from-a-specific-timeframe) - that ran and the final statuses of that build. A red build is a failed build, a green build is a successful build.

You can check each of the builds individually to find out:

* When the build ran.
* The build’s duration.
* The build trigger (either webhook or manual).
* The stack type (for example, Linux).
* The machine type (for example, Elite).

If you click on the colour bar representing a given build, you will be taken to the build log of that build.