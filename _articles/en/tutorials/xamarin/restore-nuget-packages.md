---
title: Restore NuGet packages
redirect_from:
- "/xamarin/restore-nuget-packages"
menu:
  xamarin:
    weight: 2

---
To restore your [NuGet](https://www.nuget.org/) packages,
simply go to the app on [bitrise.io](https://www.bitrise.io),
and select the `Workflow` tab to open the Workflow Editor.

Add the `NuGet Restore` step to your workflow, after the `Git Clone` step. By default the step will use the same solution file that you have provided when you added your app, but you can simply modify it if you need to.

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Restore your NuGet packages with Bitrise</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>