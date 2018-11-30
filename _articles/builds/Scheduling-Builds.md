---
title: Scheduling your builds
redirect_from:
- "/builds/scheduling-builds/"
- "/builds/scheduling-builds"
menu:
  builds:
    weight: 3

---
You can schedule your builds to run automatically at a specific time of the week so that you can check your logs when it's most convenient for you.

Follow the steps to see how you can set it up for your next build!

1. Log into [bitrise.io](https://www.bitrise.io).
2. Go to your `Dashboard` and click on the project whose build you want to schedule.
3. Click on `Start/Schedule a Build`.
4. In the `Build configuration` pop-up window, toggle the switch to the right to enable `Schedule this build` feature.

   ![Screenshot](/img/scheduling-builds/disabled-build-scheduling.png)
5. Set the hour and minute in the `HH/MM` field.
6. On the timeline, click on the day(s) when you want your build to run.

   ![Screenshot](/img/scheduling-builds/selected-builds.png)
7. Check and fill out the rest of the input fields if necessary. You can schedule your build in the advanced version of the `Build configuration` window too.
8. Click `Schedule Build` at the bottom of the pop-up window.

{% include message_box.html type="info" title="Conflicting input" content="Using the Advanced option, you have access to additional options for your build: you can enter a git tag or a commit hash. If, for example, you specify a commit hash, you will notice that the Git Tag option disappears. This ensures that you cannot enter conflicting input values. 

If you specify a commit hash and a branch where that commit does not exist (for example, **master**), Bitrise will find the branch that does have the given commit (for example, **testing**) and run a build with that branch. "%} 

Now you're back on your `Builds` board and you can see your scheduled build.

If you click on `Show scheduled`, you can edit/delete your schedules, disable build scheduling by toggling the switch to the left, or immediately trigger the build by clicking on the `Trigger now` button.

![Screenshot](/img/scheduling-builds/scheduled-build.png)

That's it! Now you can enjoy the comfort of your automated build!