---
title: Most important concepts
redirect_from:
- "/bitrise-cli/most-important-concepts.md"
tag:
- env vars
- steps
- secrets
- cli
- bitrise.yml
description: To understand Bitrise in depth, there are a few key concepts that must
  be kept in mind. These are immutable and crucial to the way we do things.
summary: ''
menu:
  bitrise-cli-main:
    weight: 3

---
To understand Bitrise in depth, there are a few key concepts that must be kept in mind. These are immutable and crucial to the way we do things.

## Every input, output and parameter is an Environment Variable

Every input and variable in your build configuration is an environment variable. For example:

* Step inputs.
* Step outputs.
* Secrets.
* App Environment Variables.
* Workflow Environment Variables.

There's nothing special about how Bitrise handles environment variables. These are all regular environment variables, with the same rules and restrictions as any other environment variable.

Of course, there are some technical details that should be kept in mind. We'll go over some of them.

### The value of an Environment Variable can only be a String

Environment Variables can only hold `String` values. Even if you set a number or bool, like `1` or `true` as the value of the Environment Variable, it will be considered a string.

### Parent processes can't access Environment Variables exposed by child processes

Parent process(es) can't access Environment Variables exposed by child processes.

For example, you run a script in your Terminal:

    bash my_bash_script.sh

Let's say this script sets a variable called `MY_VAR`:

    export MY_VAR=the-value

Once the script is finished, you won't be able to access `MY_VAR` in your Terminal. It is only available in the script and in the processes or scripts started by the script.

This means that if you use `export MY_VAR=...` in a Script Step, `MY_VAR` won't be available in subsequent Steps. This is true for other Steps too, regardless of which language the Step is written in.

The Bitrise CLI includes a mechanism for exposing environment variables from Steps so that subsequent Steps can also access it, through the Bitrise CLI tool called [envman](https://github.com/bitrise-io/envman).

A simple example:

    envman add --key MY_TEST_ENV_KEY --value 'test value for test key'

You can find more examples in [envman's README](https://github.com/bitrise-io/envman), and in the [Expose an Environment Variable and use it in another Step](/tips-and-tricks/expose-environment-variable) guide.

## Availability order of environment variables

Environment Variables are available after the environment variable is processed.

There are Environment Variables [exposed by the Bitrise CLI itself](/builds/available-environment-variables/#exposed-by-the-bitrise-cli). These are available from the start: for example, `BITRISE_SOURCE_DIR` and `BITRISE_TRIGGERED_WORKFLOW_ID`.

All other Environment Variables are processed and made available as the build progresses.

The processing order is this:

1. Environment Variables exposed by the Bitrise CLI.
2. [Secrets](/bitrise-cli/secrets/): processed before a Workflow starts.
3. One-off Environment Variables specified for the build through our API.
4. App Environment Variables.
5. Workflow Environment Variables: when the processing of the specified Workflow starts, the [Environment Variables specified for that Workflow](/bitrise-cli/workflows/#defining-workflow-specific-parameters-and-environment-variables) are made available.

   If the workflow has workflows [chained before or after it](https://devcenter.bitrise.io/getting-started/getting-started-workflows/#chaining-workflows-together), the environment variables of the chained workflows are processed and made available right before the first step of the workflow would run.
6. Step inputs: they are exposed for each Step, right before the Step would start.
7. Step outputs: they are exposed by the specific Step, so those are available for subsequent Steps after the Step finishes.

### Why does the processing order matter?

An Environment Variable is only available after it is processed and made available. You can only reference/use Environment Variables that are already processed!

* In the value of a `Secret` Environment Variable, you can use Environment Variables exposed by Bitrise CLI, but you can't use any other Environment Variable (App Env Vars, Workflow Env Vars, and so on), as those are not processed when Secrets are processed.
* In the value of an `App Env Var`, you can use environment variables from `Secrets` as well as the Bitrise CLI exposed ones, but you can't use Workflow Env Vars or Step inputs.
* In a `Workflow environment variable` you can use all the above (`Secrets`, `App Env Vars`, Bitrise CLI exposed env vars).
* In step input values, you can use all other Environment Variables, including the Workflow's Environment variables, as well as the outputs of Steps which run before the specific Step.

### Environment variables of chained workflows

Once an Environment Variable of a Workflow is processed and made available, it is available everywhere else during the build. This means that other Workflows of the chain **can** use the Environment Variables of a Workflow which is performed before the specific Workflow, similar to Step outputs, which are available for every other step after the Step that generates the outputs completes.

You can find more information about Environment Variable availability of Workflow Env Vars in chained Workflows in the [Workflows: Note about workflow environment variables](/bitrise-cli/workflows/#about-workflow-environment-variables) documentation.

{% include banner.html banner_text="Now you know everything" url="https://app.bitrise.io/dashboard/builds" button_text="Go to Bitrise now" %}