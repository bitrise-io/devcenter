---
changelog: 
last_modified_at: 
title: Restore NuGet packages
redirect_from:
- "/xamarin/restore-nuget-packages"
menu:
  xamarin:
    weight: 2

---
To restore your [NuGet](https://www.nuget.org/) packages, simply go to the app on [bitrise.io](https://www.bitrise.io), and select the **Workflow** tab to open the Workflow Editor.

Add the **NuGet Restore** Step to your workflow, after the **Git Clone** Step. By default, the Step will use the same solution file that you have provided when you added your app, but you can simply modify it if you need to.

{% include banner.html banner_text="Restore your NuGet packages with Bitrise" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}