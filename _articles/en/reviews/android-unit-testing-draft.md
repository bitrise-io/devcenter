---
tag: []
title: Android unit testing - draft
redirect_from: []
summary: ''
published: false

---
## Running a unit test

Unit tests are useful if you want to verify individual code blocks, catch bugs or prevent crashes as early as possible.

This tutorial tells you how to run a unit test against your app and how to generate test reports using your primary workflow.

Luckily, your Android primary workflow already contains the **Android Unit Test** and the **Android Lint** steps which are responsible for performing unit test on your build.

{% include message_box.html type="note" title="Using custom steps/scripts" content=" If you use custom steps or scripts, our **Deploy to Bitrise.io** Step by default deploys files/build artifacts from the `$BITRISE_DEPLOY_DIR` directory, so make sure that you move the generated app there, or set the deploy directory or the file path input of the step to point to the location of the files/build artifacts. Please note, that if the specified path is a directory, then every file in that directory will be deployed. If there are subdirectories in the specified directory, they won't get uploaded! You can upload a directory's content recursively, if you use the **Compress** option, which will compress the whole directory including every subdirectory. And finally, if you specify a file path, then only the specified file will get deployed. "%}

## Generating and checking test results

You can check your Android unit test results on the **Test Reports** page. The **Android Unit Test** Step generates and exports unit test reports into the `$BITRISE_DEPLOY_DIR` folder. Then the **Deploy to Bitrise.io** Step exports those reports from the `$BITRISE_DEPLOY_DIR` folder to the respective build's **Test Reports** tab. You can view or download those reports to your local computer. (The **Android Lint** Step generates the test results in the same way but exports them to the **APPS & ARTIFACT** tab of the build that ran the tests.)

Check out the unit test results on the **Test Reports** page. This includes:

* Test results xml
* Screenshots of test cases

To view the test results:

1. Click the **Builds** tab of the app and select the build that ran the tests.
2. Under the build status, click **See more** next to the **Test reports** label.

This takes you to the **Test Reports** page. Check out our [Test Reports guide](https://devcenter.bitrise.io/testing/test-reports/) to find out more about using it to analyze your test results.


{% include message_box.html type="note" title="Check your logs in the case of failed builds" content="If your build has failed running, click on **Download logs**. In the last lines of your Step log, you can view the error message and fix the error accordingly. If you're done, commit your changes to your repository, and a new build should start automatically.  "%}