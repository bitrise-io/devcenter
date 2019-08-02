---
title: Caching Ruby Gems
menu:
  caching:
    weight: 8

---
Ruby Gems are installed into a single directory by default. You can get the location of this directory with gem environment gemdir. If you want to change this directory, you can set the `$GEM_HOME` environment variable, this will be picked up by gem install and it’ll install the Gems to the location specified by `$GEM_HOME`.

{% include message_box.html type="info" title="How to reference Environment variables in input fields" content=" You cannot simply add `gem environment gemdir` to the input of your Cache Steps. You can only reference Environment Variables in the inputs directly, and `$GEM_HOME` is not set by default on the bitrise.io VMs. "%}

1. Open your app's **Workflow Editor**.
2. Add a **Script** Step to your workflow.
3. Set the `$GEM_HOME` Environment Variable in the **Script** step.

        - script:
            title: Set GEM_HOME env var
            inputs:
            - content: |-
                #!/bin/bash
                set -ev
                envman add --key GEM_HOME --value "$(gem environment gemdir)"
4. Insert the **Cache:Pull** Step after the **Git Clone** but before the **Android Build** Steps.

   IMPORTANT: Make sure that your Step is version 1.0.0 or newer.
5. Insert the **Cache:Push** Step to the very end of your Workflow.

And you're done!

<div class="banner">
<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
<div class="deploy-text">Now you know everything</div>
<a target="_blank" href="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta"><button class="button">Go to Bitrise now</button></a>
</div>