---
title: Skipping Steps
menu:
  steps-workflows:
    weight: 4

---
You can skip certain Steps in your Bitrise build. There is no point in running, for example, a unit test Step if the previous Step failed to build your app.

Of course, there are examples when it's better to run a Step even if the previous Step failed. For example, if the `Bitrise.io Cache:Pull` Step fails, there is no reason not to run the next Step - in fact, if the next Step is one that installs dependencies then it's a very bad idea to skip that Step if pulling the cache is unsuccessful.

This guide walks you through on how to skip a given Step that has been set to run even if the previous Step failed.

   ![Run if previous step failed](/img/run-if-prev-version.png)

1. Open your app by clicking on the app's name on your [Dashboard](https://app.bitrise.io/dashboard).
2. Click the `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.
3. Select the workflow you need in the `WORKFLOW` dropdown menu on the top left.
4. Click the Step you want to skip.
5. On the right, use the toggle to disable the `Run if previous Step failed` option.
