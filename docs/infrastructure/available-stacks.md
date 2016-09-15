The Stack indicates the virtual machine version that we will use to run your build. After adding your application to Bitrise we will detect the best image, but you can simply change it to a different one on the `Settings` tab of your app.

![Screenshot](/img/infrastructure/stack_selector.png)

## Stack status types

| Type | Description |
|---|---|
| Experimental  | Internal, expected to change, and eventually moved to `Preview`. |
| Preview | Public, users with a related beta flag can access it. Might change or moved to `Beta`. |
| Beta | Public beta, might change if there's a regression, otherwise will become `Stable` |
| Stable | Generally available and expected to be supported for the foreseeable future. |
| LTS | Same as Stable, except it has a specific remove date and no changes will be made to the stack until the removal date (except only really crucial changes, which affect security for example). |

## Stack prepare types

| Type | Description |
|---|---|
| Pre-Booted | If a Stack is available as pre-booted, and there's enough pre-booted machines with that Stack configuration, your build can start right away, without waiting for the build environment to boot. In case there's no more available pre-booted machine with that Stack configuration, your build will start on an `On-Demand` configuration. |
| On-Demand | If a Stack is available as on-demand configuration and there's no (available) pre-booted configuration for the Stack, our system will have to create a virtual machine for your selected configuration when your build starts. This means that your build will be in `preparing environment` state while the related Virtual Machine is created & booted. For an OS X configuration the boot process usually takes about 1-2 minutes - we're working on improving this. *The prepare time (of course) is not counted into the build time, it won't affect how long your build can run.* |

## What's preinstalled

Every time we create or update a Stack we create a "System Report" for it too.
The System Reports include the list of preinstalled tools and their version on the stack.
The System Report scripts are also open source, so if you want to run it yourself,
or you want to add another tool / system check, feel free to send us a pull request!

You can find every available stack's System Report on GitHub: [https://github.com/bitrise-io/bitrise.io/tree/master/system_reports](https://github.com/bitrise-io/bitrise.io/tree/master/system_reports)
