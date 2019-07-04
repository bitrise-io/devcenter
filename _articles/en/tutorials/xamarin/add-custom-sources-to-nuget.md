---
title: Add custom sources to NuGet
redirect_from:
- "/xamarin/add-custom-sources-to-nuget/"
- "/xamarin/add-custom-sources-to-nuget"
menu:
  xamarin:
    weight: 4

---
If you are using third-party NuGet packages in your application
you have to add these sources to your NuGet package sources.

Simply add a new `Script` step to your workflow with the following bash script as the content:

    #!/bin/bash
    set -ex
    
    nuget sources add -Name NAME_FOR_SOURCE -Source SOURCE_URL

Don't forget to:

* update the `NAME_FOR_SOURCE` and `SOURCE_URL` parameters
* make sure to place the `Script` step before the `NuGet Restore Step`

### Custom NuGet source with credentials

If you need to set credentials for your NuGet source you can modify the `Script` above in the following way:

    #!/bin/bash
    set -ex
    
    nuget sources add -Name NAME_FOR_SOURCE -Source SOURCE_URL -UserName NUGET_USERNAME -Password NUGET_PASSWORD

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Add sources to NuGet package sources</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>