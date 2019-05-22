---
title: Test reports - draft
redirect_from: []
published: false

---
Test reports allows you to view all your test results in a convenient way!

Use our testing Steps - for example, `Xcode Test for iOS`, `Android Unit Test` or `iOS Device Testing` - or your own custom scripts, and all your test results will be deployed to the same directory. From there, Test Reports can read and display them in a way that's easy to read and analyze.

## Test Reports overview

You can run both UI tests and unit tests on Bitrise and with Test Reports , you can view the results of the different types of tests on the same page.

Test Reports can read and display test results that are in either of two formats:

* plist
* JUnit XML

To use Test Reports, you have to make sure your test results, in either of these formats, are deployed in the designated deploy directory. From there, the `Deploy to Bitrise.io` Step will do the rest: it can read the results and send it to Test Reports!

## Configuring Test Reports

Test Reports requires no complicated configuration: you just need to opt in and make sure that the testing Steps deploy their output to the correct directory.

1. Add tests to your project.
2. Add the appropriate testing Steps to your Workflow. For example, if you have an iOS project, you can use the `Xcode Test for iOS` Step to run Xcode tests. You can also use any custom Script Step that runs tests!
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
1. On the left menu, click a tab that contains files. 

   For example, **Test Artifacts**.
1. 