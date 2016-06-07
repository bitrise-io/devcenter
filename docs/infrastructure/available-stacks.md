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

## Available stacks

### OS X

### Xcode 7.3, on OS X 10.11

*Current stack status: `Stable`*.

`Xcode 7.3.1`, installed on OS X 10.11 (El Capitan).

*You can find the repository we use to set this environment up at:* [https://github.com/bitrise-io/osx-box-bootstrap](https://github.com/bitrise-io/osx-box-bootstrap).

*You can find the System Report (pre-installed tool versions list) of this stack at:* [https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/osx-xcode-7.3.log](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/osx-xcode-7.3.log)

### Xcode 7.2, on OS X 10.11

`Xcode 7.2.1` installed on OS X 10.11.2

*Current stack status: `LTS`*.

*You can find the repository we use to set this environment up at:* [https://github.com/bitrise-io/osx-box-bootstrap](https://github.com/bitrise-io/osx-box-bootstrap).

*You can find the System Report (pre-installed tool versions list) of this stack at:* [https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/osx-xcode-7.2.log](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/osx-xcode-7.2.log)

### Xcode 6.4, on OS X 10.11

*Current stack status: `LTS`*.

*You can find the repository we use to set this environment up at:* [https://github.com/bitrise-io/osx-box-bootstrap](https://github.com/bitrise-io/osx-box-bootstrap).

*You can find the System Report (pre-installed tool versions list) of this stack at:* [https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/osx-xcode-6.4.log](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/osx-xcode-6.4.log)

### Xamarin Stable with Xcode 7.3, on OS X 10.11

Pretty much the same as `Xcode 7.3, on OS X 10.11`, with the latest Xamarin Stable channel and additional, pre-installed Xamarin tools.

*You can find the repository we use to set this environment up at:* [https://github.com/bitrise-io/osx-box-bootstrap](https://github.com/bitrise-io/osx-box-bootstrap).

*You can find the System Report (pre-installed tool versions list) of this stack at:* [https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/osx-xamarin-stable.log](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/osx-xamarin-stable.log)

### Xamarin Beta with Xcode 7.3, on OS X 10.11

Pretty much the same as `Xcode 7.3, on OS X 10.11`, with the latest Xamarin Beta channel and additional, pre-installed Xamarin tools.

*You can find the repository we use to set this environment up at:* [https://github.com/bitrise-io/osx-box-bootstrap](https://github.com/bitrise-io/osx-box-bootstrap).

*You can find the System Report (pre-installed tool versions list) of this stack at:* [https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/osx-xamarin-beta.log](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/osx-xamarin-beta.log)

### Xamarin Alpha with Xcode 7.3, on OS X 10.11

Pretty much the same as `Xcode 7.3, on OS X 10.11`, with the latest Xamarin Alpha channel and additional, pre-installed Xamarin tools.

*You can find the repository we use to set this environment up at:* [https://github.com/bitrise-io/osx-box-bootstrap](https://github.com/bitrise-io/osx-box-bootstrap).

*You can find the System Report (pre-installed tool versions list) of this stack at:* [https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/osx-xamarin-alpha.log](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/osx-xamarin-alpha.log)

### Linux

### Docker based setup, with pre-cached base and Android Docker images

*Current stack status: `Stable`*.

You can find the Android specific docs at [Android guides](doc:android-beta).
The environment is described at [Android/Docker environment & what's pre-installed](doc:android-environment-whats-pre-installed).

*You can find the System Report (pre-installed tool versions list) of this stack at:* [https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/docker-based-android-setup.log](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/docker-based-android-setup.log)
