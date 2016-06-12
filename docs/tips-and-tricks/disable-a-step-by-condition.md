## Disable a Step

If you don't want to remove the Step from your Workflow and you don't want to duplicate the Workflow either (which is the preferred way if you want to experiment with new things; you can just create a "backup" clone of your original Workflow) then you can simply disable a Step by specifying `run_if: false` .

Example:

```
- script:
    run_if: false
    inputs:
    - content: |-
        #!/bin/bash
        echo "This will never run, because of run_if:false"
```

## Run a Step only if the Build failed

*To do this you have to switch to `bitrise.yml` mode (open the Workflow Editor on bitrise.io -> left side: click on `bitrise.yml` to switch to the interactive `bitrise.yml` editor).*

You have to add two properties to the Step you **only** want to run when the Build failed (at that point, when the Step would run):

* `is_always_run: true` (this enables the Step to be considered to run even if a previous Step failed)
* `run_if: .IsBuildFailed` (you can find more examples of the `run_if` template at: [https://github.com/bitrise-io/bitrise/blob/master/_examples/experimentals/templates/bitrise.yml](https://github.com/bitrise-io/bitrise/blob/master/_examples/experimentals/templates/bitrise.yml)).

An example `script` step, which will only run if the Build failed:

```
- script:
    is_always_run: true
    run_if: .IsBuildFailed
    inputs:
    - content: |-
        #!/bin/bash
        echo "Build Failed!"
```

!!! note "A **run_if** can be any valid **Go** template"
    A `run_if` can be any valid [Go template](https://golang.org/pkg/text/template/), as long as it evaluates to `true` or `false` (or any of the String representation, e.g. `"True"`, `"t"`, `"yes"` or `"y"` are all considered to be `true`). If the template evaluates to `true` the Step will run, otherwise it won't.

An example `run_if` to check a **custom environment variable** (you
can expose environment variables from your scripts too,
using [envman](https://github.com/bitrise-io/envman/)):

```
run_if: |-
  {{enveq "CUSTOM_ENV_VAR_KEY" "test value to test against"}}
```

This `run_if` will skip the step in every case when the value of `CUSTOM_ENV_VAR_KEY`
is not `test value to test against`.