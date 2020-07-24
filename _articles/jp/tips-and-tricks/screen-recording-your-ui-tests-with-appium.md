---
changelog: 
last_modified_at: 
tag: []
title: Screen recording your UI tests with Appium
redirect_from: []
description: ''
menu:
  tips-and-tricks:
    weight: 17

---
{% include not_translated_yet.html %}
  
[Appium](http://appium.io/) is a popular testing framework to catch defects in native, hybrid, and web apps. You can easily integrate your Appium UI tests into your own Bitrise workflow using our `Script` Step. This way you can have the whole testing screen recorded and can visually verify if your app is doing what it's supposed to do.

In this guide we'll show how to kickstart Appium and run your UI test specified in the `test.js` file, then retrieve the test results and view them on [bitrise.io](https://www.bitrise.io).

{% include message_box.html type="note" title="ADB workaround for Javascript" content="Javascript does not support the in-built screen recording and screen capturing commands so we're using ADB shell commands as a workaround. For all the other languages, check out [Appium's Start Recording Screen](http://appium.io/docs/en/commands/device/recording-screen/start-recording-screen/) guide."%}

We will use our `Script` and `Deploy to Bitrise.io` Steps. Here is why:

* the `Script` Step executes what you insert in its input field
* the `Deploy to Bitrise.io` Step delivers your test result to the `APPS & ARTIFACTS` tab of your Build's page.

Let's put this all together!

1. Insert the `Script` Step as the first Step in your workflow.
2. Click the Step.
3. Insert the following command to the `Script content` input field.

       appium &> $BITRISE_DEPLOY_DIR/logs.txt & 
       disown
       npm test

   You will find the above mentioned logs.txt file in the Bitrise deploy directory (`BITRISE_DEPLOY_DIR`). This logs.txt file contains the outputs of the Appium server. With the help of the `Deploy to Bitrise.io` Step you will be able to download this file from the `APPS & ARTIFACTS` tab.
4. Since screen recoding is not supported through Javascript, we advise you to add the [screen recording](http://adbshell.com/commands/adb-shell-screenrecord) / [screen capturing](http://adbshell.com/commands/adb-shell-screencap) and the[ file retrieving](http://adbshell.com/commands/adb-pull) shell commands to your own `test.js` file.
5. Once you have pulled the test results (which in this case can be videos and screenshots) from the emulator, make sure you move them to the Bitrise deploy directory (`BITRISE_DEPLOY_DIR`).
6. Insert the `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step to your workflow so that it can export your test results to the `APPS & ARTIFACTS` tab on your Build's page.
7. Start a build!

If all went well, you should be able to view the generated test results on the `APPS & ARTIFACTS` tab of your Build's page.