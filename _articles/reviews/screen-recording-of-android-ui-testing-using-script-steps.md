---
title: Screen recording of Android UI testing using Script Steps
redirect_from: []
date: 2019-01-14 12:57:07 +0000
published: false

---
You can create screen/recruit recording to capture Android UI testing running on your app.

You will need three Script Steps performing different phases of the testing procedure:

* that starts screen recording on Emulator
* one that runs the Android UI test on Emulator
* one that stops the screen recording and gets the logs or videos from the Emulator.

Let's see how to put together a workflow!

1. Add the first `Script` Step to your workflow from the StepLib by clicking the `+` sign. We're renaming it as `Start screenrecording`.
2. Insert the following command to the `Script content` input field.

        
       $ANDROID_HOME/platform-tools/adb shell "screenrecord /sdcard/video.mp4" &> $BITRISE_DEPLOY_DIR/logs.txt &
       disown

   ![](/img/empty-script-content.png)
3. Add the second `Script` Step from the StepLib by clicking the `+` sign after the `Start Screenrecording`. This step will perform UI testing so let's rename it as `Run UI tests` Step. Add your script into the `Script content` input field.
4. Add the third `Script` Step (called `Stop Screenrecording and get file from emulator` Step) from the StepLib by clicking the `+` sign after the `Run UI tests`. This Step stops the screen recoding and gets the recording or the logs from the Emulator. Add the following script to the `Script content` input field. 

       $ANDROID_HOME/platform-tools/adb shell "killall -INT screenrecord"
       sleep 10
       $ANDROID_HOME/platform-tools/adb pull /sdcard/video.mp4 $BITRISE_DEPLOY_DIR/video.mp4