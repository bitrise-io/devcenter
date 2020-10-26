---
title: Scheduling your builds
redirect_from:
- "/builds/scheduling-builds/"
- "/builds/scheduling-builds"
tag:
- builds
- triggers
description: You can schedule your builds to run automatically at a specific time
  of the week so that you can check your logs when it's most convenient for you.
menu:
  builds-main:
    weight: 10

---
You can schedule your builds to run automatically at a specific time of the week so that you can check your logs when it's most convenient for you.

## Scheduling a build

How to schedule a build on Bitrise:

1. Go to your [Dashboard](https://app.bitrise.io/dashboard) and click on the project whose build you want to schedule.
2. Click on **Start/Schedule a Build**.
3. In the **Build configuration** pop-up window, toggle the switch to the right to enable **Schedule this build** feature.

   ![{{ page.title }}](/img/basic-build-config-1.jpg)
4. Set the hour and minute in the `HH/MM` field.
5. On the timeline, select the day(s) when you want your build to run.

   ![{{ page.title }}](/img/basic-build-config-scheduled-1.jpg)
6. Check and fill out the rest of the input fields if necessary. You can schedule your build in the advanced version of the **Build configuration** window too.
7. Click **Schedule Build** at the bottom of the pop-up window.

{% include message_box.html type="info" title="Conflicting input" content="Using the Advanced option, you have access to additional options for your build: you can enter a git tag or a commit hash. If, for example, you specify a commit hash, you will notice that the Git Tag option disappears. This ensures that you cannot enter conflicting input values.

If you specify a commit hash and a branch where that commit does not exist (for example, **master**), Bitrise will find the branch that does have the given commit (for example, **testing**) and run a build with that branch. "%}

That's it! Now you can enjoy the comfort of your automated build!

## Managing a scheduled build

If you have one or more regularly scheduled builds, you can:

* Edit their configuration.
* Trigger them manually at any time.
* Temporarily disable them.
* Permanently delete them. 

{% include collapse.html title="Editing a scheduled build" content="To change the configuration of a regularly scheduled build:

1. Go to the **Builds** tab of your app. 
2. On the top, you should see a list of your scheduled builds.
3. Click **Show scheduled**.

   ![](/img/android-test-test_-_Bitrise.png)
4. Click the little gear icon to open the settings menu.
5. Click **Edit scheduled build**. 
6. Make the changes you want and click **Save changes**." %}

{% include collapse.html title="Triggering a scheduled build manually" content="To immediately trigger a scheduled build:

1. Go to the **Builds** tab of your app. 
2. On the top, you should see a list of your scheduled builds.
3. Click **Show scheduled**.

   ![](/img/android-test-test_-_Bitrise.png)
4. Click **Trigger now**." %}

{% include collapse.html title="Disabling a scheduled build" content="To temporarily disable a regularly scheduled build:

1. Go to the **Builds** tab of your app. 
2. On the top, you should see a list of your scheduled builds.
3. Click **Show scheduled**.

   ![](/img/android-test-test_-_Bitrise.png)
4. Toggle the **Enabled** option. 

   The build will not run until you enable it again." %}

{% include collapse.html title="Deleting a scheduled build" content="To permanently delete a regularly scheduled build:

1. Go to the **Builds** tab of your app. 
2. On the top, you should see a list of your scheduled builds.
3. Click **Show scheduled**.

   ![](/img/android-test-test_-_Bitrise.png)
4. Click the little gear icon to open the settings menu.
5. Click **Delete** and then click **Delete** again when prompted for confirmation." %}

{% include banner.html banner_text="Let's schedule a build!" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}