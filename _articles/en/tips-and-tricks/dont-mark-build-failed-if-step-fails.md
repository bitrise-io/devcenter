---
title: Don't mark the Build as failed if a given step would fail (ignore the error
  of the Step)
menu:
  tips-and-tricks:
    weight: 13

---
_To do this you have to switch to_ `_bitrise.yml_` _mode (open the Workflow Editor on bitrise.io -> left side: click on_ `_bitrise.yml_` _to switch to the interactive_ `_bitrise.yml_` _editor)._

All you have to do is: add an `is_skippable: true` flag to the Step.

An example `script` step which, although fails, it won't "break" the build:

    - script:
        is_skippable: true
        inputs:
        - content: |-
            #!/bin/bash
            echo "Failing Step."
            exit 1
            # exit 1 would mark this step as Failed, but it won't break the Build
            #  because of the is_skippable: true flag / property

You can find more examples on [GitHub](https://github.com/bitrise-io/bitrise/blob/fec3772ee2287d6e405d908fb9b42367a5751b43/_examples/tutorials/errors-force-run-and-skippable/bitrise.yml).

{% include banner.html banner_text="Skip Step errors" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}