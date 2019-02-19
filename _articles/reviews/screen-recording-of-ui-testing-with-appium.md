---
title: Screen recording of UI testing with Appium
redirect_from: []
date: 2019-01-29 09:58:48 +0000
published: false

---
[Appium](http://appium.io/) is a popular testing framework to catch defects in native, hybrid, and web apps. You can easily integrate your Appium UI tests into your own Bitrise workflow using our `Script` Step. This way you can have the whole testing screen recorded and can visually verify if your app is doing what it's supposed to do.

In this guide we're demonstrating a test workflow with an Appium test written in JS which calls an ADB shell command (but you've got other language options as well -  check out Appium's [Example Usage](http://appium.io/docs/en/commands/device/recording-screen/start-recording-screen/)) And why in JS? Well, JS solution does not support the in-built screen recording command so we had to come up with a workaround. Let's see!

The only trick here is to use our `Script` and `Deploy to Bitrise.io` Steps: `Script` Step executes your UI test/s and the `Deploy to Bitrise.io` Step delivers your test result to the `DEVICE TESTS` tab of your Build's page.

Depending on your script, the test outputs can be:

* video
* screenshots
* html reports
* xmls reports

Here is an example app for you: