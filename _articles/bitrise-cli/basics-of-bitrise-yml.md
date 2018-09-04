---
title: Basics of bitrise.yml
menu:
  bitrise-cli:
    weight: 6

---
A bare minimal `bitrise.yml` is as simple as:

```yaml
format_version: 5
```

This configuration is valid, everything else is optional, but does not include anything to execute,
there's nothing to `run`.

A minimal configuration which you can `bitrise run`:

```yaml
format_version: 5
workflows:
  test:
```

This configuration can be executed with `bitrise run test`, and the `bitrise` CLI
won't give you any errors, but of course there's still nothing declared to do.

Let's continue with our example from the previous guide,
which executes a single Script step when you run it with `bitrise run test`,
and talk about what's what in the configuration:

```yaml
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
```

A quick walk through of this sample configuration:

- `format_version` : this property declares the minimum Bitrise CLI format version.
  You can get your Bitrise CLI's supported highest format version with: `bitrise version --full`.
  If you set the `format_version` to `5` that means that Bitrise CLI versions which
  don't support the format version `5` or higher won't be able to run the configuration.
  This is important if you use features which are not available in older Bitrise CLI versions.
- `default_step_lib_source` : specifies the source to use when no other source is defined for a step.
  Read more about it in the `- script@1.1.5:` step description.
- `project_type` : defines your source project's type. For example, `android`, `ios`, `xamarin`, and so on
- `app` - `envs` : the `app: envs:` section specifies Environment Variables which will be available for
  every build, every workflow, every step.
- `workflows` : the workflows section is the collection of separate build configurations
  which you can run with `bitrise run WORKFLOWID`.
  In this example the only workflow is `test`, which you can perform with `bitrise run test`.
  If you'd have a second workflow called `main`, you could run both `bitrise run test` and `bitrise run main`.
- `steps:` : the list of steps which should be executed when the workflow is performed.
  In this example the `test` workflow includes only a single `script` step. If more than one
  step is declared, the steps are performed one by one, after each other.
- `- script@1.1.5:` : a step (reference) to perform. This reference does not have a "StepLib Source" declaration,
  which means that the `default_step_lib_source` will be used as the StepLib Source.
  For more information check the [Step reference section of the Steps guide](/bitrise-cli/steps/#step-reference).
- `inputs:` : the inputs you want to specify for the given step.
  A step can have many inputs,
  but _you only have to specify those in the `bitrise.yml` which you want to set/overwrite._
  For more information see the [Steps documentation](/bitrise-cli/steps).
- `- content:` : the input we want to set. In this example we only wanted to specify the Content
  of the Script step, all other inputs are irrelevant.
- `echo "Hello ${MY_NAME}!"` : this is the __value__ we specified for the `content` input.

Read on to learn more about how you can use multiple workflows,
define multiple steps to execute for a given workflow and for
more advanced concepts. You'll be able to define your perfect automation
configuration in no time!