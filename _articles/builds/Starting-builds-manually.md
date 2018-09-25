---
title: Starting builds manually
date: 2018-09-25 13:58:51 +0000
menu:
  builds:
    weight: 1

---
Starting a build manually on Bitrise takes literally two clicks - if you leave everything on the default settings. If you do not wish to do that, or at least want to be sure what the default settings are, read on! We'll walk you through the process.

1. Log in to Bitrise and go to the [Dashboard](https://app.bitrise.io/dashboard).

1. Select the app you wish to build.

1. Click `Start/Schedule a Build`.

![Start a build](/img/start-build.png)

At this point, the __Build configuration__ window opens and you are presented with two tabs near the top of the window:

- __Basic__
- __Advanced__

{% include message_box.html type="note" title="Scheduling builds" content="The `Schedule this build` option allows you to configure builds to be triggered at specific times. Read more in [our guide](/builds/scheduling-builds/)."%}

### Basic configuration

If you choose `Basic` in the __Build configuration__ window, you have three options to configure:

![Basic config window](/img/basic-config-window.png)

- __Branch__: The Git branch that you wish to build. Make sure to type the name of the branch correctly, otherwise the build will fail. You can only enter a single branch. If a pull request to your repository is made from a forked branch, type the name of that branch to run a build of the pull request.

{% include message_box.html type="important" title="Pull request build" content="Starting a build of a pull request's branch is NOT the same as a pull request build. The manually started build of a pull request branch will only build the state of the code on that branch. An automatically triggered pull request build, however, builds the state of the code as it will look like once you merged the pull request."%}
    

- __Message__: The build message. Please note that entering the git commit message of a specific commit does __not__ trigger a build of that commit!

- __Workflow__: This is an optional setting. You can select the workflow you wish to run. By default, it is based on the trigger map: for example, if you wish to run the `test` branch, and the `test` branch is configured in the trigger map to trigger the `testing` workflow. You can configure the trigger map either [on the website](/builds/triggering-builds/trigger-code-push) or [directly in the bitrise.yml of the app](/builds/triggering-builds/trigger-map).

### Advanced configuration

If you choose `Advanced` in the __Build configuration__ window, you have all the options available with `Basic`, and a few more:

![Advanced config window](/img/advanced-window1.png)

- __Git Tag__: Builds a particular branch or commit that is tagged with the Tag you enter.

- __Commit Hash__: Copy a specific commit's hash here to build that particular commit. This option can even send a build status update to your git hosting service.

- __Custom Environment Variables__: Set up a custom Environment Variable that is used in the build. You can enable the `Replace variables in input?` option: this replaces the Environment Variables in your input with the assigned value. You need to do this if your custom variable references other Environment Variables.

- __Generated cURL command__: Based on the options you set in the Build configuration window, we provide an automatically generated cURL command. This can be copied and pasted, and you can run it on any platform that has cURL installed.