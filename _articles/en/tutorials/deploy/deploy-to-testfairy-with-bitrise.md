---
title: Deploy to TestFairy with Bitrise
menu:
  deployment-tutorials:
    weight: 5

---
If you are looking for a deployment service that also gives you lots of insights
about your application, then [TestFairy](https://www.testfairy.com/) is a great service to check out.

# What is TestFairy?

When testing apps in the crowd, you never know what exactly was tested and what exactly went wrong on the client side.
TestFairy solves this problem by providing a video of everything that happened on the mobile device,
including detailed internal metrics such as CPU, memory, GPS, network, logs, crash reports, and a lot more.
To get these insights on iOS you need to [integrate their iOS SDK into your app](http://docs.testfairy.com/iOS_SDK/Integrating_iOS_SDK.html).

# Upload your app to TestFairy through Bitrise

To deploy your app on the TestFairy platform you just simply need to add the `TestFairy` step
to your app's workflow (on [bitrise.io](https://www.bitrise.io)).

![Deploy to TestFairy step in a Workflow](/img/tutorials/deploy/testfairy_workflow-editor.png)

The only required parameter you have to add is your API Key on TestFairy.
To get it you should navigate to your [account preferences](https://app.testfairy.com/settings/) on TestFairy
and find the key under your API Key menu.

{% include message_box.html type="note" title="Email notifications and Auto update" content=" You can also enable or disable the email notifications and set the tester groups you would like to notify. There's an option to make your users always upgrade to the latest build by enabling Auto update in the step, and you can also start recording video and set the length of it."%}

# Ready to go!

There's nothing else you need to do,
simply work on your awesome app and we ensure your app is automatically deployed to TestFairy every time you update your code.