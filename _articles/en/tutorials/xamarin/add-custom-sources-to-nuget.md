---
changelog:
last_modified_at:
title: Add custom sources to NuGet
redirect_from:
- "/xamarin/add-custom-sources-to-nuget/"
- "/xamarin/add-custom-sources-to-nuget"
menu:
  xamarin:
    weight: 4

---
If you are using third-party NuGet packages in your application, you have to add these sources to your NuGet package sources.

Simply add a new **Script** Step to your workflow with the following bash script as the content:

    #!/bin/bash
    set -ex
    
    nuget sources add -Name NAME_FOR_SOURCE -Source SOURCE_URL

Don't forget to:

* Update the `NAME_FOR_SOURCE` and `SOURCE_URL` parameters.
* Make sure to place the `Script` Step before the `NuGet Restore` Step.

### Custom NuGet source with credentials

If you need to set credentials for your NuGet source you can modify the **Script** above in the following way:

    #!/bin/bash
    set -ex
    
    nuget sources add -Name NAME_FOR_SOURCE -Source SOURCE_URL -UserName NUGET_USERNAME -Password NUGET_PASSWORD

{% include banner.html banner_text="Add sources to NuGet package sources" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}