---
title: Screen recording of UI testing with Appium
redirect_from: []
date: 2019-01-29 09:58:48 +0000
published: false

---
[Appium](http://appium.io/) is a popular testing framework to catch defects in native, hybrid, and web apps. You can easily integrate your Appium UI tests into your own Bitrise workflow using our `Script` Step. This way you can have the whole testing screen recorded and can visually verify if your app is doing what it's supposed to do.

In this guide we'll show how to kickstart Appium and run your UI test specified in the `test.js` file, then retrieve the test results and view them in [bitrise.io](https://www.bitrise.io). (Please note that Javascript does not support the in-built screen recording and screen capturing commands so we're using ADB shell commands as a workaround. For all the other languages, check out [Appium's Start Recording Screen](http://appium.io/docs/en/commands/device/recording-screen/start-recording-screen/) guide.)

We will use our `Script` and `Deploy to Bitrise.io` Steps: the `Script` Step executes what you insert in its field and the `Deploy to Bitrise.io` Step delivers your test result to the `DEVICE TESTS` tab of your Build's page. Depending on your script, the test outputs can be, for example; video, screenshots, html and xml reports.

1. Insert the `Script` Step as the first step in your workflow.
2. Click the Step.
3. Insert the following command to the `Script content` input field.

       appium &> $BITRISE_DEPLOY_DIR/logs.txt & disown
       npm test
4. Since screen recoding is not supported through Javascript, we advise you to add the [screen recording](http://adbshell.com/commands/adb-shell-screenrecord) / [screen capturing](http://adbshell.com/commands/adb-shell-screencap) and the[ file retrieving](http://adbshell.com/commands/adb-pull) shell commands to your own `test.js` file.
5. Once you have pulled the test result from the emulator, make sure you move them to the Bitrise deploy directory (`BITRISE_DEPLOY_DIR`).
6. Insert the `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step to your workflow so that it can export your test results to the `APPS & ARTIFACTS` tab on your Build's page.