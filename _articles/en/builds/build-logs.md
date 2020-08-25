---
title: Build logs
date: '2018-10-31T10:43:57.000+00:00'
tag:
- builds
- troubleshooting
description: 'Build logs allow users to analyze their builds and find out what went
  wrong - and what went right! On Bitrise, build logs are easily accessible: they
  can be viewed on the website in their entirety or they can be downloaded to view
  them on your own device.'
redirect_from: []
summary: ''
menu:
  builds-main:
    weight: 30

---
Build logs allow users to analyze their builds and find out what went wrong - and what went right! On Bitrise, build logs are easily accessible: they can be viewed on the website in their entirety or they can be downloaded to view them on your own device.

## Finding a build log

When you run a build, a build log is generated automatically. Every build has its own log, with its own unique build log URL. The build log URL contains the build slug: a hexadecimal identifier for a specific build.

{% include message_box.html type="note" title="Assisting Bitrise Support" content="When Bitrise Support asks for your build logs, the best thing to do is send the build URL."%}

1. Log in to Bitrise and click on your app on the Apps page.
2. Click the **Builds** tab.
3. Select the build you want to check out.
4. Find the log under the **LOGS** tab.

   ![](/img/logs.jpg)

{% include message_box.html type="info" title="Opening the full log" content="If you have a longer build log then by default, only the end of the log is displayed. Click the bar on the top of the log to expand."%}

## Contents of a build log

All Bitrise build logs have the same basic structure. When opening a full log, under the Bitrise logo you will find:

* The version of the Bitrise CLI that ran the build.
* The name of the workflow that was run (for example, primary).

Below this basic information, you will see every Step that was ran as part of the build. For each Step, Bitrise displays:

* The name and version of the Step.
* The running time of the Step.
* A printout of the Step's commands and their results, including highlighted error messages.
* Whether the Step passed or failed.

![](/img/log-start.png)

Check your build log carefully when a build fails. Error messages are usually highlighted in red on Bitrise. For failed Steps, an exit code is displayed next to their names. This can tell you more about why the particular Step failed.

## Following a build log live

You can check the log of a build live - that is, while the build is running. What's more, you can even follow the log as the build is happening. That means that as the build progresses, the log will automatically scroll to the new sections as they appear. 

To do so:

1. Start a build.
2. Go to the build's page.
3. Scroll down to the log.
4. Click **Follow**.

![](/img/ios-multiple-test-results-sample_-_build__34__629950ad554e4cc9__-_bitrise.png)

To stop following, you just need to manually navigate anywhere within the log. You can restart following any time. 

## Downloading a build log

If you need to send your build logs to people who do not have access to the app on Bitrise, or you want to store your logs in your own archives, you can simply download the log file from Bitrise.

{% include message_box.html type="warning" title="Log security" content="Please note that your build log can contain sensitive information! Make sure to check its contents before downloading the log file and sending it out to anyone. We recommend using [Secrets](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/#about-secrets) to make sure nothing sensitive appears in build logs."%}

1. Log in to Bitrise and click on your app on the Apps page.
2. Click the **Builds** tab.
3. Select the build you want to check out.
4. Find the log under the **LOGS** tab.
5. Click the **Download Logs** button.

## Deleting a build log

If necessary, you can delete the logs of any build on Bitrise. It can be handy if, for example, you do not want new team members to see potentially sensitive information that is displayed in previous logs.

Not all team members are authorized to delete logs: only those with either **Admin** or **Owner** role in the team can do it.

{% include message_box.html type="info" title="Deletion is final" content="Be aware that you cannot undo deleting a log. Once you delete it, there is no way to recover the log file."%}

![](/img/build-logs-are-you-sure-1.png)

1. Log in to Bitrise and click on your app on the Apps page.
2. Click the **Builds** tab.
3. Select the build you want to check out.
4. Find the log under the **LOGS** tab.
5. Click the **Delete Logs** button.
6. In the pop-up window, click **Yes**.

{% include banner.html banner_text="View your build logs" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}