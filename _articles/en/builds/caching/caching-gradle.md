---
changelog:
last_modified_at:
title: Caching Gradle
menu:
  caching:
    weight: 4

---
Before you start, make sure you have the latest version of the **Android Build** Step in your workflow.

1. Open your app's **Workflow Editor**.
2. Insert the **Cache:Pull** Step after the **Git Clone** but before the **Android Build** Steps.

   IMPORTANT: Make sure that your step is version 1.0.0 or newer. With the older versions, you have to manually specify paths for caching.
3. Insert the **Cache:Push** Step to the very end of your Workflow.

And you're done!

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Now you know everything</div>
	<a target="_blank" href="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta"><button class="button">Go to Bitrise now</button></a>
</div>