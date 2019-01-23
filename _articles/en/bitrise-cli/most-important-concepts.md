---
title: Most important concepts
redirect_from:
- "/bitrise-cli/most-important-concepts.md"
menu:
  bitrise-cli:
    weight: 15

---
## Every input, output and parameter is an Environment Variable

Every step input, step output, secret environment variable, app environment variable and workflow environment variable
(basically every input and variable in your build config) is an environment variable.

There's nothing special about how Bitrise handles environment variables,
__these are regular environment variable, with the same rules and restrictions as any other environment variable.__

To highlight a couple of technical details:

### The value of an Environment Variable can only be a String

Environment Variables can only hold `String` values. Even if you set a number or bool, like `1` or `true` as
the value of the Environment Variable, that will be a string.

### Parent process can't access  Environment Variables exposed by child processes

Parent process(es) can't access Environment Variables exposed by child processes.

For example, if you run a `my_bash_script.sh` in your Terminal with `bash my_bash_script.sh`,
and `my_bash_script.sh` sets an environment variable with `export MY_VAR=the-value`,
you won't be able to access `MY_VAR` in your Terminal after the script is finished,
`MY_VAR` will only be available in `my_bash_script.sh` __and__ in the processes / scripts
started by `my_bash_script.sh`.

In terms of Bitrise CLI this means that if you `export MY_VAR=...` in a Script step,
`MY_VAR` won't be available in subsequent steps. This is true for the steps too,
regardless of which language the step is written in.

Bitrise CLI includes a mechanism for exposing environment variables from Steps
so that subsequent Steps can also access it, through the Bitrise CLI tool
called [envman](https://github.com/bitrise-io/envman).

To set an environment variable in your script or in your step to make that
available in other steps too, you have to do that through `envman`.

A simple example:

```
envman add --key MY_TEST_ENV_KEY --value 'test value for test key'
```

You can find more examples in [envman's README](https://github.com/bitrise-io/envman),
and in the [Expose an Environment Variable and use it in another Step](/tips-and-tricks/expose-environment-variable) guide.


## Availability order of environment variables

Environment variables are available __after__ the environment variable
is "processed".

There are a few environment variables [exposed by the Bitrise CLI itself](/faq/available-environment-variables/#exposed-by-the-bitrise-cli),
those are available from the start (e.g. `BITRISE_SOURCE_DIR` and `BITRISE_TRIGGERED_WORKFLOW_ID`).

All other environment variables are "processed" / made available _as the build progresses._

There are two types of environment variables which are processed and
made available before the workflow would be executed:
[Secrets](/bitrise-cli/secrets/) and `App Env Vars` (`app: envs:` in the [bitrise.yml](/bitrise-cli/basics-of-bitrise-yml/)).

After these, the processing of the specified Workflow starts, and the
[environment variables specified for that Workflow](/bitrise-cli/workflows/#define-workflow-specific-parameters-environment-variables)
are made available. If the workflow has before or after workflows, when
a specific workflow is processed (right before the first step of the workflow would run)
the workflow's environment variables are processed and made available.

Step inputs are also environment variables;
those are exposed only for the specific step, and right before the Step would start.

Last but not least Step outputs are exposed by the specific step,
so those are available for subsequent steps __after the Step finishes__.

__The environment variable processing order:__

1. [Bitrise CLI exposed environment variables](/builds/available-environment-variables/#exposed-by-the-bitrise-cli)
1. [Secrets](/bitrise-cli/secrets/)
1. One-off environment variables specified for the build through the [Build Trigger API](/api/build-trigger)
1. `App Env Vars` (`app: envs:` in the [bitrise.yml](/bitrise-cli/basics-of-bitrise-yml/))
1. [Workflow environment variables](/bitrise-cli/workflows/#define-workflow-specific-parameters-environment-variables)
1. Step inputs
1. Step outputs

__So, why does the processing order matter?__

An environment variable is only available __after__ it is processed and made available.
__When you reference or use an environment variable, you can only reference/use those which are already processed!__

A couple of examples:

- In the value of a `Secret` environment variable,
  you can use environment variables exposed by Bitrise CLI,
  but you can't use any other environment variable (App Env Vars, Workflow Env Vars, ...),
  as those are not processed when secrets are processed.
- In the value of an `App Env Var`, you can use environment variables
  from `Secrets` as well as the Bitrise CLI exposed ones, but you can't use Workflow Env Vars,
  nor Step inputs.
- In a `Workflow environment variable` you can use all the above (`Secrets`, `App Env Vars`,
  Bitrise CLI exposed env vars).
- And finally, in step input values, you can use all other environment variables,
  including the workflow's environment variables, as well as the outputs
  of steps which run before the specific step.

### Environment variables of chained workflows

Once an environment variable of a workflow is processed and made available,
it is available everywhere else during the build. This means that other workflows
of the chain __can__ use the environment variables of a workflow which is performed __before__
the specific workflow, similar to Step outputs, which are available for every
other step __after__ the step (which generates the outputs) completes.

You can find more information about environment variable availability
of Workflow env vars in chained workflows in the
[Workflows: Note about workflow environment variables](/bitrise-cli/workflows/#note-about-workflow-environment-variables)
documentation.