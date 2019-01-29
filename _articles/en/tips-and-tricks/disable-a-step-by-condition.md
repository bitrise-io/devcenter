---
title: Enable/Disable a step (optionally, based on a condition)
menu:
  tips-and-tricks:
    weight: 6

---
## Disable a Step

If you don't want to remove the Step from your Workflow and you don't want to duplicate the Workflow either (which is the preferred way if you want to experiment with new things; you can just create a "backup" clone of your original Workflow) then you can simply disable a Step by specifying `run_if: false`.

An example:

    - script:
        run_if: false
        inputs:
        - content: |-
            #!/bin/bash
            echo "This will never run, because of run_if:false"

## Run a Step only in CI environment, skip it for local builds

This is quite similar to how you [completely disable a step](#disable-a-step), but instead of specifying `false` as the `run_if` expression, you specify `.IsCI`, which will only be true in CI mode.

This method can be useful to debug builds locally, where you don't want to run
specific steps on your own Mac/PC. Lots of Steps have this `run_if` flag set by default,
for example the `Git Clone` step is configured with `run_if: .IsCI` in the step's
default configuration (`step.yml`), because the most common use case when you
run a build locally is that you already have the code on your Mac/PC
and so you don't want to do a `Git Clone`. Of course you can change the `run_if`
property of any step, so you can specify a `run_if: true` for the `Git Clone`
step if you want to run it locally too.

{% include message_box.html type="note" title="Enable CI mode" content=" CI mode can be enabled on your own Mac/PC by setting the `CI` environment to `true` (e.g. with `export CI=true` in your Bash Terminal), or by running `bitrise run` with the `--ci` flag: `bitrise --ci run ...`. "%}

## Run a Step only if the Build failed

_To do this you have to switch to `bitrise.yml` mode (open the Workflow Editor on bitrise.io -> left side: click on `bitrise.yml` to switch to the interactive `bitrise.yml` editor)._

You have to add two properties to the Step you **only** want to run when
the Build failed (at that point, when the Step would run):

* `is_always_run: true` (this enables the Step to be considered to run even if a previous Step failed)
* `run_if: .IsBuildFailed` (you can find more examples of the `run_if` template at: [https://github.com/bitrise-io/bitrise/blob/master/_examples/experimentals/templates/bitrise.yml](https://github.com/bitrise-io/bitrise/blob/master/_examples/experimentals/templates/bitrise.yml)).

An example `script` step, which will only run if the Build failed:

    - script:
        is_always_run: true
        run_if: .IsBuildFailed
        inputs:
        - content: |-
            #!/bin/bash
            echo "Build Failed!"

{% include message_box.html type="note" title="A **run_if** can be any valid **Go** template" content="
A `run_if` can be any valid [Go template](https://golang.org/pkg/text/template/), as long as it evaluates to `true` or `false` (or any of the String representation, e.g. `\"True\"`, `\"t\"`, `\"yes\"` or `\"y\"` are all considered to be `true`). If the template evaluates to `true` the Step will run, otherwise it won't.
"%}

An example `run_if` to check a **custom environment variable** (you
can expose environment variables from your scripts too,
using [envman](https://github.com/bitrise-io/envman/)):

    {% raw %}
    run_if: |-
     	{{enveq "CUSTOM_ENV_VAR_KEY" "test value to test against"}}
    {% endraw %}    

This `run_if` will skip the step in every case when the value of `CUSTOM_ENV_VAR_KEY`
is not `test value to test against`.