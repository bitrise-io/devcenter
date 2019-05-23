---
title: Test reports - draft
redirect_from: []
published: false

---
Test reports allows you to view all your test results in a convenient way.

Use our testing Steps, and all your test results will be deployed to the same directory. From there, Test Reports can read and display them in a way that's easy to read and analyze.

## Test Reports overview

You can run both UI tests and unit tests on Bitrise and with Test Reports , you can view the results of the different types of tests on the same page.

Test Reports can read and display test results that are in either of two formats:

* plist
* JUnit XML

You can use Test Reports with four of our testing Steps:

* **Xcode Test**
* **Android Unit Test**
* **iOS Device Testing**
* **Virtual Device Testing for Android**

These Steps will run the tests defined in your repository and then store the output in an Environment Variable. The **Deploy to Bitrise.io** Step will do the rest: it can read the results and send it to Test Reports.

## Configuring Test Reports

Test Reports doesn't require any sort of complicated configuration. All you need is to have tests in your repository, and two Steps in your Workflow.

{% include message_box.html type="important" title="Device testing with Firebase" content="We have two Steps that use the Firebase Test Lab for device testing: iOS Device Testing and Virtual Device Testing for Android. These Steps also deploy their test results to Test Reports but you need to opt into using them first: on the Settings tab of your app, go to the Device Testing option and set the toggle to enabled.

Read more about device testing on Bitrise in the [Device testing for iOS](/testing/device-testing-for-ios/) and the [Device testing for Android](/testing/device-testing-for-android/) guides."%} 

1. Add tests to your app's repository.
2. Add the appropriate testing Steps to your Workflow.
   For example, if you have an iOS project, you can use the `Xcode Test for iOS` Step to run Xcode tests.
3. Make sure the Step sends its output - the test results - to the appropriate deploy directory.
4. Make sure you have the `Deploy to Bitrise.io` Step in your Workflow.

For more information on our testing Steps, check out our testing guides:

* [iOS device testing](https://devcenter.bitrise.io/testing/device-testing-for-ios/)
* [Android device testing](https://devcenter.bitrise.io/testing/device-testing-for-android/)
* [Android unit testing](https://devcenter.bitrise.io/testing/android-run-a-unit-test/)

And that's it! Once the build is finished, you will be able to view your test reports.

### Checking test results

Test Reports display the most important information about all the tests you ran on the `Test Summary` tab.

To access the results:

1. Open the Test Report add-on
2. On the `Test Summary` tab, find the test you want to check.

   Alternatively, on the top bar, click the tab of the test set you want to check out.
3. Click `Test cases` to see the details.

You will find:

* The total number of tests you ran, as well as the ratio of successful and failed tests.
* The duration of each individual test (both unit tests and UI tests).
* In the case of UI tests, the orientation and the locale of the device.

UI tests are grouped according to device while unit tests are grouped according to test cases. Accessing their results, however, works the same way. The test results can be found either on the `Test Summary` tab or the individual tab of the test type you ran. You can check, depending on the test type:

* Individual test cases
* Performance data
* Videos
* Screenshots
* Test artifacts
* Logs

As noted above, this depends on test type, too: for unit tests, you won't see screenshots or videos, of course.

Every file can be downloaded and saved:

1. Open a test set.
2. On the left menu, click a tab that contains files.

   For example, **Test Artifacts**.
3. 