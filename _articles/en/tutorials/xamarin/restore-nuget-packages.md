---
title: Restore NuGet packages
redirect_from:
- "/xamarin/restore-nuget-packages"
menu:
  xamarin:
    weight: 2

---
To restore your [NuGet](https://www.nuget.org/) packages,
simply navigate to the app on [bitrise.io](https://www.bitrise.io),
and select the `Workflow` tab to open the Workflow Editor.

Add the `NuGet Restore` step to your workflow, after the `Git Clone` step.
By default the step will use the same solution file that you have provided when you added your app,
but you can simply modify it if you need to.