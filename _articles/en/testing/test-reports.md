---
title: Test Reports
redirect_from: []
tag:
- testing
- ios
- " android"
- " firebase"
- test-reports
summary: Test Reports allows you to view all your test results in a convenient way.
  Use our testing Steps, and all your test results will be deployed to the same directory.
  From there, Test Reports can process them and display them in a way that's easy
  to read and analyze.
menu:
  testing-main:
    weight: 1

---
Test Reports allows you to view all your test results in a convenient way.

Use our testing Steps, and all your test results will be deployed to the same directory. From there, Test Reports can process them and display them in a way that's easy to read and analyze.

## Test Reports overview

You can run both UI tests and unit tests on Bitrise and with Test Reports , you can view the results of the different test types on the same page.

Test Reports can read and display test results that are in either of two formats:

* plist
* JUnit XML

You can use Test Reports with four of our testing Steps:

* **Xcode Test for iOS**
* **Android Unit Test**
* **iOS Device Testing**
* **Virtual Device Testing for Android**

These Steps will run the tests defined in your repository and then store the output in an Environment Variable. The **Deploy to Bitrise.io** Step will do the rest: it can read the results and send it to Test Reports.

{% include message_box.html type="info" title="Testing guides" content="Check out our testing guides to read more about how to use these Steps on Bitrise:

* [Android unit testing](https://devcenter.bitrise.io/testing/android-run-a-unit-test/)
* [Device testing for Android](/testing/device-testing-for-android/)
* [Device testing for iOS](/testing/device-testing-for-ios/)
* [Running Xcode Tests](/testing/running-xcode-tests/) "%}

{% include message_box.html type="important" title="Using custom Script Steps" content="You can use custom Script Steps to export test results to Test Reports. Read the details in our [Exporting from custom Script Steps to Test Reports](/testing/exporting-to-test-reports-from-custom-script-steps/) guide."%}

## Configuring Test Reports

Test Reports doesn't require any sort of complicated configuration. All you need is to have tests in your repository, and two Steps in your Workflow.

{% include message_box.html type="warning" title="Deploy to Bitrise.io version" content="The **Deploy to Bitrise.io** Step must be of version 1.4.1 or newer - older versions of the Step do NOT support Test Reports."%}

1. Add tests to your app's repository.
2. Add the appropriate testing Steps to your Workflow. For example, if you have an iOS project, you can use the **Xcode Test for iOS** Step to run Xcode tests.
3. Make sure you have the **Deploy to Bitrise.io** Step in your Workflow.
4. Run your build.

And that's it! Once the build is finished, you will be able to view your test reports.

## Checking test results

Test Reports display the most important information about all the tests you ran on the **Test Summary** tab. You will see all the tests you ran, their duration, and their results. You can also click on the tabs of the individual tests to see their details.

To access the result of a particular test:

1. Open your app's page on Bitrise.
2. Click the **Builds** tab and select the build that ran the tests.
3. Under the build status, click **See more** next to the **Test reports** label.

   ![](/img/android-test-test_-_build__20__ce39bf96fc9f7668__-_Bitrise.png)
4. On the **Test Summary** tab, find the test you want to check.

   Alternatively, on the top bar, click the tab of the test set you want to check out.

   To filter tests based on their results, open the menu on the top right, which is set to **All** by default.

   ![](/img/Test_add-on-3.png)
5. Click **Test cases** to see the details.

   UI tests are grouped according to device while unit tests are grouped according to test cases.

You will find:

* The total number of tests you ran, as well as the ratio of successful and failed tests.
* The duration of each individual test (both unit tests and UI tests).
* In the case of UI tests, the orientation and the locale of the device.

![](/img/Test_add-on-4.png)

You can check, depending on the test type:

* Individual test cases
* Performance data
* Videos
* Screenshots
* Test artifacts
* Logs

As noted above, this depends on test type, too: for unit tests, you won't see screenshots or videos, of course.

### Downloading files

Every file can be downloaded from Test Reports: that includes screenshots, videos, or APK  and IPA files.

1. Open a test set.
2. On the left menu, click a tab that contains files.

   For example, **Test Artifacts**.

   ![](/img/Test_add-on-5.png)
3. Click **Download** next to the file name.

   If you want to download all files available on the tab, click **Download All Files**.

<div class="banner">
<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
<div class="deploy-text">Let's view your build's Test Reports</div>
<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>