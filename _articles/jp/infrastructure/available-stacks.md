---
# jp title missing
title: Available Stacks
redirect_from:
- "/docs/available-stacks"
menu:
  infrastructure:
    weight: 1

---

{% include not_translated_yet.html %}

The Stack indicates the virtual machine version that we will use to run your build.
After adding your application to Bitrise we will select an appropriate Stack for it.
Change it in the `Stacks` tab of the Workflow Editor.

![](/img/stack-selector.png)

After selecting the Stack you want to use, you'll see a short description of the stack with an additional link to learn more about that specific Stack (e.g. to see what tools are preinstalled, and which versions, on the selected Stack).

{% include message_box.html type="important" title="Make sure you hit the `Save` button" content=" The Stack won't be used until you click the `Save` button!
"%}

## Stack status types

| Type | Description |
| --- | --- |
| Stable | Generally available and expected to be supported for the foreseeable future. Updated when an update for the Stack's primary tool is available. Example: when Xcode 7.3.1 was released, the Xcode 7.3 stack was updated to have 7.3.1 instead of 7.3(.0). In case of Xamarin stacks, the Xamarin updates are applied weekly, during the weekends. |
| LTS (Long Term Support) | No changes (updates) will be made to the stack, except for absolutely crucial changes (for example which affect security), and Bitrise CLI tool updates. Preinstalled tool versions will remain the same, until the Stack is removed from our collection. |

## Stack prepare types

| Type | Description |
| --- | --- |
| Pre-Booted | If a Stack is available as pre-booted, and there's enough pre-booted machines with that Stack configuration, your build can start right away, without waiting for the build environment to boot. In case there's no more available pre-booted machine with that Stack configuration, your build will start on an On-Demand configuration. |
| On-Demand | If a Stack is available as on-demand configuration and there's no (available) pre-booted configuration for the Stack, our system will have to create a virtual machine for your selected configuration when your build starts. This means that your build will be in preparing environment state while the related Virtual Machine is created & booted. For a macOS configuration the boot process usually takes about 1 - 1.5 minutes. The prepare time (of course) is not counted into the build time, it won't affect how long your build can run. |

## What's preinstalled

Every time we create or update a Stack we create a "System Report" for it too.
The System Reports include the list of preinstalled tools and their version on the stack.
The System Report scripts are also open source, so if you want to run it yourself
or you want to add another tool / system check, feel free to send us a pull request!

You can find every available stack's System Report on [GitHub](https://github.com/bitrise-io/bitrise.io/tree/master/system_reports).
