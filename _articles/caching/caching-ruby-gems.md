---
title: Caching Ruby Gems
menu:
  caching:
    weight: 5

---
Ruby Gems are installed into a single directory by default. You can get the location of this directory with gem environment gemdir. If you want to change this directory you can set the `$GEM_HOME` environment variable, this will be picked up by gem install and it’ll install the Gems to the location specified by `$GEM_HOME`.

__IMPORTANT__: You cannot simply add `gem environment gemdir` to the input of your Cache steps. You can only reference Environment Variables in the inputs directly, and $GEM_HOME is not set by default on the Bitrise.io VMs.

1. Open your app's `Workflow Editor`.

1. Add a `Script` step to your workflow.

1. Set the `$GEM_HOME` environment variable in the `Script` step.

        - script:
            title: Set GEM_HOME env var
            inputs:
            - content: |-
                #!/bin/bash
                set -ev
                envman add --key GEM_HOME --value "$(gem environment gemdir)"

1. Insert the `Cache:Pull` step after the `Git Clone` but before the `Android Build` steps.

    {% include message_box.html type="note" title="Step version" content="
Make sure that your step is version 1.0.0 or newer.
"%}

1. Insert the `Cache:Push` step to the very end of your workflow.

And you're done!