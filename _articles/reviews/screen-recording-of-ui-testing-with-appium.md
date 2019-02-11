---
title: Screen recording of UI testing with Appium
redirect_from: []
date: 2019-01-29 09:58:48 +0000
published: false

---
[Appium](http://appium.io/) is a popular testing framework to catch defects in native, hybrid, and web apps. You can easily integrate your Appium UI tests into your own Bitrise workflow using our Script Step and have the whole testing screen recorded. 

In this guide we're demonstrating a test workflow with a script written in JS (but you've got other language options as well; check out Appium's [Example Usage](http://appium.io/docs/en/commands/device/recording-screen/start-recording-screen/))

The only trick is to use our `Script` and `Deploy to Bitrise.io` Steps:

* `Script` Step executes the UI test/s
* `Deploy to Bitrise.io` Step delivers your test result to the `APPS & ARTIFACTS` tab of your Build's page.

Depending on your script, you can get video, screenshots, html reports or xmls as test outputs.

With the recorded video, you can visually verify if your app is doing what it's supposed to do.

catch errors

uncover defects

from user's point of view