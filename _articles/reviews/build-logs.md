---
title: Build logs
date: 2018-10-09 13:27:12 +0000
redirect_from: []
published: false

---
Build logs allow users to analyze their builds and find out what went wrong - and what went right! On Bitrise, build logs are easily accessible, they can be viewed on the website in their entirety or they can be downloaded to view them on your own device. 

### Finding a build log

When you run a build, a build log is generated automatically. Every build has its own log, with its own unique build log URL. The build log URL contains the build slug: a hexadecimal identifier for a specific build. 

1. Log in to Bitrise and click on your app on the Apps page.
2. Click the `Builds` tab. 
3. Select the build you want to check out.
4. Find the log under the `LOGS` tab. 

{% include message_box.html type="info" title="Opening the full log" content="By default, only the end of the log is displayed. Click the bar on the top of the log to expand."%} 

### Contents of a build log

All Bitrise build logs have the same basic structure. When opening a full log, under the Bitrise logo you will find:

* the version of the Bitrise CLI that ran the build
* information about what modes Bitrise ran the build in (for example, CI mode)