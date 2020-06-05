---
title: Caching Maven
menu:
  caching:
    weight: 6

---
1. Open your app's **Workflow Editor**.
2. Insert the **Cache:Pull** step after the `Git Clone` but before the `Android Build` steps.

   IMPORTANT: Make sure that your step is version 1.0.0 or newer.
3. Insert the **Bitrise.io Cache:Push** Step to the very end of your Workflow.
4. In the **Cache paths** input of the step, enter `$HOME/.m2`.

And you're done!

{% include banner.html banner_text="Now you know everything" url="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta" button_text="Go to Bitrise now" %}