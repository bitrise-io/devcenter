---
title: Caching Cocoapods
menu:
  caching:
    weight: 2

---
Before you start, make sure you have the latest version of the `Cocoapods Install` step in your workflow.

1. Open your app's `Workflow Editor`.
2. Insert the `Cache:Pull` step after the `Git Clone` but before the `Cocoapods Install` steps.

   **IMPORTANT**: Make sure that your step is version 1.0.0 or newer. With the older versions, you have to manually specify paths for caching.
3. Insert the `Cache:Push` step to the very end of your workflow.

And that is all you have to do! If you wish to use an earlier version of the `Cache` steps, you can find more information [here](https://discuss.bitrise.io/t/how-to-cache-cocoapods-dependencies/193).

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Now you know everything</div>
	<a target="_blank" href="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta"><button class="button">Go to Bitrise now</button></a>
</div>