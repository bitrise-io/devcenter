---
title: Screen recording of UI testing with Appium
redirect_from: []
date: 2019-01-29 09:58:48 +0000
published: false

---

[Appium](http://appium.io/) is a popular testing framework for native, hybrid, and web apps. You can easily integrate your Appium user interface tests in your own Bitrise workflow to verify if the app is actually doing what it's supposed to do. and have all the test results at your fingertips on [bitrise.io](https://www.bitrise.io). The only trick is to use our Script and Deploy to Bitrise.io Steps for two reasons:

* to execute the UI test/s 
* to deliver your test result to the `APPS & ARTIFACTS` tab of your Build's page. 

In this guide we're demonstrating a test workflow performing UI screen recording. Our template script written in Javascript but you've got other options as well; check out Appium's [Example Usage](http://appium.io/docs/en/commands/device/recording-screen/start-recording-screen/). Depending on your script, you can get video, screenshots, html reports or xmls as test outputs.

With the recorded video, you can visually verify if your app is free of defects (toast message example)

catch errors

uncover defects

from user's point of view