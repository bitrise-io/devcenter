---
title: Rolling builds
tag:
- builds
- git
- triggers
description: You can cancel running builds or builds on hold automatically. If you turn
  on the Rolling Builds feature, the previous builds of your app can be automatically
  aborted once a new one is started.
redirect_from: []
menu:
  builds-main:
    weight: 14

---
You can cancel running builds or builds on hold - no need to abort them manually! If you turn on the **Rolling Builds** feature, the previous builds of your app can be automatically aborted once a new one is started.

Please note that manual and scheduled builds are also cancelled if you start a new build with the **Rolling builds** option enabled.

{% include message_box.html type="info" title="When is a build aborted?" content="If you trigger a build on a branch where a build is already running, the running build is aborted only if it runs the same Workflow.

For example, if you trigger a build on the **master** branch of your repository with the **deploy** Workflow, it will NOT cancel a build running on the same **master** branch with the **primary** Workflow."%}

You can also set which types of triggered builds you wish to abort. Let's see how!

1. Open your [Dashboard](https://app.bitrise.io/dashboard/builds) and select your app.
2. Select the **Settings** tab from the menubar.
3. Scroll down to the **ENABLE ROLLING BUILDS** option and toggle it.
4. Select the type(s) of builds you wish to abort when a new build is started.

   ![](/img/enable-rolling-builds.png)

* **Pull Requests**: will cancel all previous builds for Pull Requests and all related Pushes.
* **Pushes**: will cancel all previous builds for Pushes to the same branch.
* **Running builds**: will also auto-cancel running builds in addition to on-hold ones.

All done! From now on, you don't have to wait for a triggered build to finish if you do not need it!

<div class="banner">
<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
<div class="deploy-text">Turn on Rolling Builds</div>
<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>
