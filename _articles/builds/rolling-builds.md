---
title: Rolling builds
menu:
  builds:
    weight: 4

---
You can cancel running builds or builds on hold - no need to abort them manually! If you turn on the **Rolling Builds** feature, you can automatically abort the previous builds of your app once a new one is started.

Please note that manual and scheduled builds are also cancelled if you start a new build with the `Rolling builds` option enabled.

Also, builds running on the same branch will be cancelled even if they run different workflows!

{% include message_box.html type="important" title="Bitrise Start Build step" content=" This step allows users to trigger a different workflow as one of the steps of a given workflow. Unfortunately, if the Rolling Builds feature is enabled, the triggered workflow will cancel the previous workflows. "%}

You can also set which types of triggered builds you wish to abort. Let's see how!

1. Open your `Dashboard` on [bitrise.io](https://www.bitrise.io) and select your app.
2. Select the `Settings` tab from the menubar.
3. Scroll down to the `ENABLE ROLLING BUILDS` option and toggle it.

   ![Rolling Builds](/img/getting-started/rolling-builds.png)
4. Select the type(s) of builds you wish to abort when a new build is started.
   * `Pull Requests`: will cancel all previous builds for Pull Requests and all related Pushes
   * `Pushes`: will cancel all previous builds for Pushes to the same branch
   * `Running builds`: will also auto-cancel running builds in addition to on-hold ones

And done! From now on, you don't have to wait for a triggered build to finish if you do not need it!