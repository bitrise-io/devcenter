---
changelog:
last_modified_at:
title: Caching Ruby Gems
menu:
  caching:
    weight: 8

---
Ruby gems are not cached by default on the bitrise.io virtual machines. Ruby gems are installed into a location depending on the current `rbenv` version. The version can be checked by running `rbenv version`. 

You can get the location of this directory with `gem environment gemdir`. However, it is not enough to cache this directory as `rbenv` sets up link to ruby version specific gems: the whole ruby version specific directory - for example, `/Users/vagrant/.rbenv/versions/2.5.3` - has to be cached. 

It is not recommended to set the value of the `$GEM_HOME` Enviroment Variable, as this can result in installed gems not being found.

1. Open your app's **Workflow Editor**.
2. Add a **Script** Step to your workflow.
3. Set the `$GEM_CACHE_PATH` Environment Variable in the **Script** Step.

        - script:
            title: Set GEM_CACHE_PATH env var
            inputs:
            - content: |-
                #!/bin/bash
                set -ex
                RBENV_DIR="`cd $(rbenv which ruby)/../..;pwd`"
                echo "Gem cache directory: $RBENV_DIR"
                envman add --key GEM_CACHE_PATH --value $RBENV_DIR
4. Insert the **Cache:Pull** Step after the **Git Clone** but before the **Android Build** Steps.
5. Insert the **Cache:Push** Step to the very end of your Workflow.
6. Open the input `Cache paths` of the Step **Cache:Push** and add `$GEM_CACHE_PATH` in a new line as an additional cache dir.

And you're done!

<div class="banner">
<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
<div class="deploy-text">Now you know everything</div>
<a target="_blank" href="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta"><button class="button">Go to Bitrise now</button></a>
</div>