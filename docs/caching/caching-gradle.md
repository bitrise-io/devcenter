Before you start, make sure you have the latest version of the `Android Build` step in your workflow.

1. Open your app's `Workflow Editor`.

1. Insert the `Cache:Pull` step after the `Git Clone` but before the `Android Build` steps.

    !!! note "Step version"
        Make sure that your step is version 1.0.0 or newer. With the older versions, you have to manually specify paths for caching.

1. Insert the `Cache:Push` step to the very end of your workflow.

And you're done!
