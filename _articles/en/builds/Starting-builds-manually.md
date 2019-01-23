---
title: Starting builds manually
date: 2018-09-25 13:58:51 +0000
redirect_from:
- "/builds/triggering-builds/starting-builds-manually/"
- "/builds/starting-builds-manually/"
menu:
  builds:
    weight: 2

---
Starting a build manually on Bitrise takes literally two clicks - if you leave everything on the default settings. If you do not wish to do that, or at least want to be sure what the default settings are, read on! We'll walk you through the process.

1. Log in to Bitrise and go to the [Dashboard](https://app.bitrise.io/dashboard).
2. Select the app you wish to build.
3. Click `Start/Schedule a Build`.

![Start a build](/img/start-build.png)

At this point, the **Build configuration** window opens and you are presented with two tabs near the top of the window:

* **Basic**
* **Advanced**

{% include message_box.html type="note" title="Scheduling builds" content="The `Schedule this build` option allows you to configure builds to be triggered at specific times. Read more in [our guide](/builds/scheduling-builds/)."%}

### Basic configuration

If you choose `Basic` in the **Build configuration** window, you have three options to configure:

![Basic config window](/img/basic-config-window.png)

* **Branch**: The Git branch that you wish to build. Make sure to type the name of the branch correctly, otherwise the build will fail. You can only enter a single branch. If a pull request to your repository is made from a forked branch, type the name of that branch to run a build of the pull request.

{% include message_box.html type="important" title="Pull request build" content="Starting a build of a pull request's branch is NOT the same as a pull request build. The manually started build of a pull request branch will only build the state of the code on that branch. An automatically triggered pull request build, however, builds the state of the code as it will look like once you merged the pull request."%}

* **Message**: The build message. Please note that entering the git commit message of a specific commit does **not** trigger a build of that commit!
* **Workflow**: This is an optional setting. You can select the workflow you wish to run. By default, it is based on the trigger map: for example, if you wish to run the `test` branch, and the `test` branch is configured in the trigger map to trigger the `testing` workflow. You can configure the trigger map either [on the website](/builds/triggering-builds/trigger-code-push) or [directly in the bitrise.yml of the app](/builds/triggering-builds/trigger-map).

### Advanced configuration

If you choose `Advanced` in the **Build configuration** window, you have all the options available with `Basic`, and a few more:

![Advanced config window](/img/advanced-window1.png)

* **Git Tag**: Builds a particular branch or commit that is tagged with the Tag you enter.
* **Commit Hash**: Copy a specific commit's hash here to build that particular commit. This option can even send a build status update to your git hosting service.
* **Custom Environment Variables**: Set up a custom Environment Variable that is used in the build. You can enable the `Replace variables in input?` option: this replaces the Environment Variables in your input with the assigned value. You need to do this if your custom variable references other Environment Variables.
* **Generated cURL command**: Based on the options you set in the Build configuration window, we provide an automatically generated cURL command. This can be copied and pasted, and you can run it on any platform that has cURL installed.

{% include message_box.html type="info" title="Conflicting input" content="If, for example, you specify a commit hash, you will notice that the Git Tag option disappears. This ensures that you cannot enter conflicting input values. 

If you specify a commit hash and a branch where that commit does not exist (for example, **master**), Bitrise will find the branch that does have the given commit (for example, **testing**) and run a build with that branch. "%}