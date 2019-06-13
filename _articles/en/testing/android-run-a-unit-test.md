---
title: Android unit test
tag:
- android
- testing
summary: Run Android unit tests on Bitrise. Find out how to generate test reports
  from your unit tests, what Steps you can use. Learn about using custom script content
  to run tests.
redirect_from: []
menu:
  testing-main:
    weight: 13

---
## Running a unit test

Unit tests are useful if you want to verify individual code blocks, catch bugs or prevent crashes as early as possible.

This tutorial tells you how to run a unit test against your app and how to generate test reports using your primary workflow.

Luckily, your Android primary workflow already contains the **Android Unit Test** Step which is responsible for performing unit test on your build.

{% include message_box.html type="note" title="Using custom steps/scripts" content=" If you use custom steps or scripts, our **Deploy to Bitrise.io** Step by default deploys files/build artifacts from the `$BITRISE_DEPLOY_DIR` directory, so make sure that you move the generated app there. Alternatively, set the deploy directory or the file path input of the step to point to the location of the files/build artifacts. Please note, that if the specified path is a directory, then every file in that directory will be deployed. If there are subdirectories in the specified directory, they won't get uploaded! You can upload a directory's content recursively, if you use the **Compress** option, which will compress the whole directory including every subdirectory. And finally, if you specify a file path, then only the specified file will get deployed. "%}

{% include message_box.html type="note" title="Check your logs in the case of failed builds" content="If your build has failed running, click on **Download logs** on your Build's page. In the last lines of your Step log, you can view the error message and fix the error accordingly. If you're done, commit your changes to your repository, and a new build should start automatically.  "%}

## Generating and checking test results

You can check your Android unit test results on the **Test Reports** page. The **Android Unit Test** Step generates and exports unit test reports into the `$BITRISE_TEST_DEPLOY_DIR` folder. Then the **Deploy to Bitrise.io** Step exports those reports from the `$BITRISE_TEST_DEPLOY_DIR` folder to the respective build's **Test Reports** page where you can view the test results.

{% include message_box.html type="warning" title="Step versions supporting Test Reports" content=" The **Deploy to Bitrise.io** Step must be of version 1.4.1 or newer and the **Android Unit Test** Step must be of version 0.10.0 or newer since older versions of the Steps do NOT support Test Reports. "%}

To view the test results on the **Test Reports** page:

1. Click the **Builds** tab of the app and select the build that ran the tests.
2. Under the build status, click **See more** next to the **Test reports** label.

Check out our [Test Reports guide](https://devcenter.bitrise.io/testing/test-reports/) to find out more about using it to analyze your test results.