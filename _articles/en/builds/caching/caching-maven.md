---
title: Caching Maven
menu:
  caching:
    weight: 6

---
1. Open your app's `Workflow Editor`.
2. Insert the `Cache:Pull` step after the `Git Clone` but before the `Android Build` steps.

   **IMPORTANT**: Make sure that your step is version 1.0.0 or newer.
3. Insert the `Bitrise.io Cache:Push` step to the very end of your workflow.
4. In the `Cache paths` input of the step, enter `$HOME/.m2`.

And you're done!

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Now you know everything</div>
	<a target="_blank" href="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta"><button class="button">Go to Bitrise now</button></a>
</div>