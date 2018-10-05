---
title: Run your tests in the Visual Studio App Center
redirect_from:
- "/xamarin/run-your-tests-in-the-app-center"
menu:
  testing:
    weight: 2

---
Upload and schedule tests on the Visual Studio App Center for your projects. The following testing frameworks are available:

* Appium
* Espresso
* Calabash
* Xamarin.UITest
* XCUITest

In the Workflow Editor [add](/getting-started/getting-started-workflows/)
the `App Center upload and schedule tests` step to your workflow.

The step has multiple required inputs. Find the value of these inputs by setting up your test on the Visual Studio App Center.

1. [Prepare your test for upload.](https://docs.microsoft.com/en-us/appcenter/test-cloud/preparing-for-upload/)
2. Create an [App Center](https://appcenter.ms/apps) project.
3. Navigate to `Test runs` tab and start a `New test run`:
   * Select the devices you want to test your app on.
   * Configure the test run:  choose a test series, a system language and a test framework.
   * **On the** `**Submit**` **tab you will find every required input for the step in the** `**Upload and schedule test**` **section**.
   * Click on `Done`.