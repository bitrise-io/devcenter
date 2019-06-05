---
title: Basics of bitrise.yml
tag:
- cli
- bitrise.yml
- steps
- workflows
summary: The configuration format of the Bitrise CLI is referred to as bitrise.yml.
  This is the expected file name the configuration should be saved with.
redirect_from: []
menu:
  bitrise-cli-main:
    weight: 8

---
The configuration format of the `Bitrise CLI` is referred to as `bitrise.yml`. This is the expected file name the configuration should be saved with.

A bare minimal `bitrise.yml` is as simple as:

    format_version: 5

The above configuration is valid but does not include anything to execute with `run`.

A minimal configuration which you can `bitrise run`:

    format_version: 5
    workflows:
      test:

The above configuration can be executed with `bitrise run test`. The Bitrise CLI won't give you any errors, but there's still nothing declared to do.

Let's continue with the example from our [Steps in YAML guide](/bitrise-cli/steps/#what-is-a-step), which executes a single Script Step when you run it with `bitrise run test`.

    format_version: 5
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    project_type: android
    app:
      envs:
      - MY_NAME: My Name
    workflows:
      test:
        steps:
        - script@1.1.5:
            inputs:
            - content: echo "Hello ${MY_NAME}!"

A quick walk through of this sample configuration:

* `format_version` : declares the minimum Bitrise CLI format version. Get your Bitrise CLI's supported highest format version with `bitrise version --full`.

  NOTE: If you set the `format_version` to `5` that means that Bitrise CLI versions which don't support the format version `5` or higher won't be able to run the configuration. This is important if you use features which are not available in older Bitrise CLI versions.
* `default_step_lib_source` : specifies the source to use when no other source is defined for a Step. Find out more in the `- scrip``_@1.1.5: _`step description below.
* `project_type` : defines your source project's type (for example, `android`, `ios`, `xamarin`).
* `app` - `envs` : specifies the env vars which will be available for every build, workflow and step.
* `workflows` : is the collection of separate build configurations which you can run with `bitrise run WORKFLOWID`.

  In our example the only workflow is `test`, which you can perform with `bitrise run test`. If you'd have a second workflow called `main`, you could run both `bitrise run test` and `bitrise run main`.
* `steps` : lists the [steps](/bitrise-cli/steps/) which should be executed when the workflow is performed.

  In our example the `test` workflow includes only a single `script` Step. If multiple Steps are declared, they are performed one by one.
* `script@1.1.5` : a Step (reference) to perform. This reference does not have a "StepLib Source" declaration, which means that the `default_step_lib_source` will be used as the StepLib Source. For more information, check out our guide on [Step reference/ID format](/bitrise-cli/steps/#step-referenceid-format).
* `inputs` : specifies Step inputs.

  NOTE: A Step can have many input. Specify only those input in the bitrise.yml which you want to set or overwrite. Check out our [Step input guide](/bitrise-cli/step-inputs/).
* `content` : the input you want to set.

  In our example, we specified the content of the Script Step.
* `echo "Hello ${MY_NAME}!"` : this is the **value** we specified for the `content` input.

Find out more on how you can define [multiple Steps](/bitrise-cli/steps/) and use [multiple workflows](/bitrise-cli/workflows/). You'll be able to define your perfect automation configuration in no time!