---
title: Running tests in the Visual Studio App Center
redirect_from:
- "/xamarin/run-your-tests-in-the-app-center"
menu:
  testing-main:
    weight: 18

---
Upload and schedule tests on the Visual Studio App Center for your apps. The following testing frameworks are available:

* Appium.
* Espresso.
* Calabash.
* Xamarin.UITest.
* XCUITest.

1. In the Workflow Editor, [add](/getting-started/getting-started-workflows/) the **App Center upload and schedule tests** Step to your Workflow.

   The Step has multiple required inputs. You can find the value of these inputs by setting up your test on the Visual Studio App Center.
2. Log in to the App Center.
3. [Prepare your test for upload](https://docs.microsoft.com/en-us/appcenter/test-cloud/preparing-for-upload/).
4. Create an [App Center](https://appcenter.ms/apps) project.
5. Navigate to **Test runs** tab and start a **New test run**:
   * Select the devices you want to test your app on.
   * Configure the test run:  choose a test series, a system language and a test framework.
   * On the **Submit** tab you will find every required input for the step in the **Upload and schedule test** section.
   * Click on `Done`.
6. On Bitrise, open the Workflow Editor and fill in the required inputs of the Step. You will need to:
   * Get an API token.
   * Set a target app.
   * Set a test framework - you can see the available options.
   * Add the device selection slug.
   * Add the name of the test series.
   * Set the system locale (for example, _en_US_) for the test run.
   * Set the path to an application file, either .ipa or .apk.
   * Set the path to a test directory. Use the appropriate directory for the chosen test framework.

{% include banner.html banner_text="Now you know everything" url="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta" button_text="Go to Bitrise now" %}