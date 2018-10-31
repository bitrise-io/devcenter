---
title: Build logs
date: 2018-10-31 10:43:57 +0000
menu:
  builds:
    weight: 12

---
Build logs allow users to analyze their builds and find out what went wrong - and what went right! On Bitrise, build logs are easily accessible, they can be viewed on the website in their entirety or they can be downloaded to view them on your own device.

### Finding a build log

When you run a build, a build log is generated automatically. Every build has its own log, with its own unique build log URL. The build log URL contains the build slug: a hexadecimal identifier for a specific build.

{% include message_box.html type="note" title="Assisting Bitrise Support" content="When Bitrise Support asks for your build logs, the best thing to do is send the build URL."%}

1. Log in to Bitrise and click on your app on the Apps page.
2. Click the `Builds` tab.
3. Select the build you want to check out.
4. Find the log under the `LOGS` tab.

   ![](/img/build-logs.png)

{% include message_box.html type="info" title="Opening the full log" content="If you have a longer build log then by default, only the end of the log is displayed. Click the bar on the top of the log to expand."%}

### Contents of a build log

All Bitrise build logs have the same basic structure. When opening a full log, under the Bitrise logo you will find:

* the version of the Bitrise CLI that ran the build
* the name of the workflow that was run (for example, primary)

Below this basic information, you will see every Step that was ran as part of the build. For each Step, Bitrise displays:

* the name and version of the Step
* the running time of the Step
* a printout of the Step's commands and their results, including highlighted error messages
* whether the Step passed or failed

![](/img/log-start.png)

Check your build log carefully when a build fails. Error messages are usually highlighted in red on Bitrise. For failed Steps, an exit code is displayed next to their names. This can tell you more about why the particular Step failed.

### Downloading a build log

If you need to send your build logs to people who do not have access to the app on Bitrise, or you want to store your logs in your own archives, you can simply download the log file from Bitrise.

{% include message_box.html type="warning" title="Log security" content="Please note that your build log can contain sensitive information! Make sure to check its contents before downloading the log file and sending it out to anyone. We recommend using [Secrets](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/#about-secrets) to make sure nothing sensitive appears in build logs."%}

1. Log in to Bitrise and click on your app on the Apps page.
2. Click the `Builds` tab.
3. Select the build you want to check out.
4. Find the log under the `LOGS` tab.
5. Click the `Download Logs` button.

### Deleting a build log

If necessary, you can delete the logs of any build on Bitrise. It can be handy if, for example, you do not want new team members to see potentially sensitive information that is displayed in previous logs.

Not all team members are authorized to delete logs: only those with either **Admin** or **Owner** role in the team can do it. 

{% include message_box.html type="info" title="Deletion is final" content="Be aware that you cannot undo deleting a log. Once you delete it, there is no way to recover the log file."%}

![](/img/confirm-delete.png)

1. Log in to Bitrise and click on your app on the Apps page.
2. Click the `Builds` tab.
3. Select the build you want to check out.
4. Find the log under the `LOGS` tab.
5. Click the `Delete Logs` button.
6. In the pop-up window, click `Yes`.