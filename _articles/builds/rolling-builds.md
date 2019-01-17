---
title: Rolling builds
menu:
  builds:
    weight: 4

---
You can cancel running builds or builds on hold - no need to abort them manually! If you turn on the **Rolling Builds** feature, you can automatically abort the previous builds of your app once a new one is started.

Please note that manual and scheduled builds are also cancelled if you start a new build with the `Rolling builds` option enabled.

{% include message_box.html type="info" title="When is a build aborted?" content="If you trigger a build on a branch where a build is already running, the running build is aborted only if it runs the same workflow.

For example, if you trigger a build on the **master** branch of your repository with the **deploy** workflow, it will NOT cancel a build running on the same **master** branch with the **primary** workflow."%} 

You can also set which types of triggered builds you wish to abort. Let's see how!

1. Open your `Dashboard` on [bitrise.io](https://www.bitrise.io) and select your app.
2. Select the `Settings` tab from the menubar.
3. Scroll down to the `ENABLE ROLLING BUILDS` option and toggle it.

![Rolling Builds](/img/getting-started/rolling-builds.png)
4\. Select the type(s) of builds you wish to abort when a new build is started.

* `Pull Requests`: will cancel all previous builds for Pull Requests and all related Pushes
* `Pushes`: will cancel all previous builds for Pushes to the same branch
* `Running builds`: will also auto-cancel running builds in addition to on-hold ones

And done! From now on, you don't have to wait for a triggered build to finish if you do not need it!