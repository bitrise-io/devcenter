---
title: Creating a signed .ipa for Xamarin apps
tag:
- xamarin
- ios
- code-signing
- files
summary: You can easily create a signed IPA for your Xamarin app with Bitrise. All
  you need to do is set the relevant inputs of our Xamarin Archive Step!
redirect_from: []
menu:
  ios-code-signing:
    weight: 10

---
You can easily create a signed IPA for your Xamarin app with Bitrise. All you need to do is set the relevant inputs of our `Xamarin Archive` Step!

Before setting up IPA export, make sure that:

* Your code signing files have been collected.
* You have the `Certificate and profile installer` step in your workflow.

{% include message_box.html type="important" title="iOS Auto Provision" content="Automatic provisioning with the `iOS Auto Provision` Step is not supported for Xamarin apps!"%}

If you're all set, proceed to setting up IPA export in your workflow:

1. Make sure that you have the `Xamarin Archive` Step in the app's Workflow Editor and select it.
2. Set the `Xamarin solution configuration` input of the Step to the Xamarin project Configuration you want to use (for example, `Release`).
3. Set the `Xamarin solution platform` input to `iPhone`.

   You can control the code signing type in your Xamarin project by setting the
   code signing configurations in Xamarin Studio.

   ![](/img/xamarin-archive-release-iphone.png)

If you wish to use more than one code signing type (for example, to create both Ad-hoc and App Store signed apps), create more than one `Release` configuration in Xamarin Studio. Set the separate configurations to the types you want to use.

You can `Copy` the existing `Release` configuration in Xamarin Studio, to have an identical base configuration, where you only change the code signing settings. For example, `Copy` the `Release|iPhone` configuration with the name `ReleaseAppStore`, set the code signing to App Store for this `ReleaseAppStore` configuration, and specify this configuration as the `Xamarin solution configuration` input of the `Xamarin Archive` step.

Don't forget to collect and upload the signing files again if you change code signing configurations in your Xamarin project!

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Sign an.ipa for your Xamarin</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>