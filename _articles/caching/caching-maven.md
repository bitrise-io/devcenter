---
title: Caching Maven
menu:
  caching:
    weight: 4

---
1. Open your app's `Workflow Editor`.

1. Insert the `Cache:Pull` step after the `Git Clone` but before the `Android Build` steps.

    !!! note "Step version"
        Make sure that your step is version 1.0.0 or newer.

1. Insert the `Cache:Push` step to the very end of your workflow.

1. In the `Ignore Paths from change check` input of the step, enter `$HOME/.m2`.

And you're done!