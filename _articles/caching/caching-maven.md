---
title: Caching Maven
menu:
  caching:
    weight: 4

---
1. Open your app's `Workflow Editor`.
2. Insert the `Cache:Pull` step after the `Git Clone` but before the `Android Build` steps.

   **IMPORTANT**: Make sure that your step is version 1.0.0 or newer.
3. Insert the `Cache:Push` step to the very end of your workflow.
4. In the `Ignore Paths from change check` input of the step, enter `$HOME/.m2`.

And you're done!