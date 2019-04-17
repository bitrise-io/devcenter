---
title: Workflows in YAML - draft
redirect_from: []
date: 2019-04-16 08:55:28 +0000
published: false

---
A workflow is a collection of steps, environment variables, and other configurations for a single `bitrise run`.

## Defining a workflow

The only requirement for a workflow is an ID. As an example, in this configuration we declared one workflow with the ID `test`.

    format_version: 1.3.1
    workflows:
      test:

You can define multiple workflows and run a specific workflow with `bitrise run WORKFLOWID`. Below configuration contains two workflows, `first` and `second`, so you can execute both `bitrise run first` and `bitrise run second`.

    format_version: 1.3.1
    workflows:
      first:
      second:

{% include message_box.html type="note" title="Available workflow list" content=" You can list all the available workflows in a `bitrise.yml` by running `bitrise run` or `bitrise workflows` in the directory of the `bitrise.yml`. "%}

## Adding steps to a workflow

To add steps to a workflow simply include `steps:` and then add the step(s).

For example, here is how to run two script steps after each other:

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        steps:
        - script:
            title: First step
        - script:
            title: Second step

When you run `bitrise run test`, the Bitrise CLI will run the two script steps one by one, starting with the `First step` and then continuing with the `Second step`.

{% include message_box.html type="info" title="Build steps" content=" To learn more about Build Steps, check out the [Steps in YAML](/bitrise-cli/steps/) guide." %}

## Defining workflow specific parameters / environment variables

Besides steps you can also specify environment variables for every workflow.

The environment variables you specify for a given workflow is used when the workflow is executed and is available for every step in the workflow.

Here is an example for defining two environment variables (`ENV_VAR_ONE` and `ENV_VAR_TWO`) for the `test` workflow:

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        envs:
        - ENV_VAR_ONE: first value
        - ENV_VAR_TWO: second value

## Chaining workflows and reusing workflows

It's also possible to chain workflows to run one or more workflow before and/or after a specific workflow.

Example workflow for chaining five workflows:

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
    
      send-notifications:
        steps:
        # send notifications
    
      setup:
        steps:
        # setup steps to run
    
      test:
        before_run:
        - setup
        envs:
        - IS_TEST: "true"
        steps:
        # test steps to run
    
      ci:
        before_run:
        - test
        after_run:
        - send-notifications
    
      deploy:
        before_run:
        - test
        steps:
        # steps to deploy
        after_run:
        - send-notifications

Based on the above example, if you run:

* `bitrise run send-notifications` : only the steps of the `send-notifications` workflow will be executed
* `bitrise run setup` : only the steps of the `setup` workflow will be executed
* `bitrise run test` : first the steps of the `setup` workflow will be executed, then the steps declared in `test` workflow
* `bitrise run ci`: will execute the steps of the workflows, in the following order:
  1. `setup`
  2. `test`
  3. `ci` (the `ci` workflow doesn't have any steps, but that's not an issue, it just means that no step will be executed here, the build will continue with the next workflow in the chain)
  4. `send-notifications`
* `bitrise run deploy`: will execute the steps of the workflows, in the following order:
  1. `setup`
  2. `test`
  3. `deploy`
  4. `send-notifications`

**This means that you can define what a** `**setup**` **and** `**test**` **should do in your project only once, in the** `**setup**` **and** `**test**` **workflows, and then you can resuse those in other workflows. There's no need to duplicate steps between workflows.**

**When you chain workflows, technically it's the same as if you'd create one workflow which would include all steps from all the workflows chained after each other. This means that, for example, one step's outputs will be available for every other step which is executed after that step during the build, regardless of whether the other step is in the same or in another workflow. If a step is executed after another one during the build, it can access the outputs of the previous steps. Just like if both steps would be in a single workflow.**

{% include message_box.html type="info" title="Chaining workflows on the UI" content="
Learn more about how to[ chain workflows together](/getting-started/getting-started-workflows/#chaining-workflows-together) on the UI.
"%}

### Note about workflow environment variables

Workflow specific environment variables are made accessible **when the workflow is executed**. These environment variables are available for workflows executed **after** that workflow, _but_ **not in the ones executed before** that workflow.

For example, if you `bitrise run ci`, the `IS_TEST` environment variable **won't** be available in the `setup` workflow, as that runs _before_ the `test` workflow. `IS_TEST` will be available for the steps in `test`, `ci` and `send-notifications` workflows.

This is true even if the workflow doesn't have any steps. This can be utilized if you want to create generic workflows, which can do different things based on environment variables, and you specify those environment variables through a "wrapper" workflow.

For example:

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
    
      generic-build:
        steps:
        # steps which depend on `BUILD_TYPE` environment variable
    
      build-alpha:
        envs:
        - BUILD_TYPE: alpha
        after_run:
        - generic-build
    
      build-beta:
        envs:
        - BUILD_TYPE: beta
        after_run:
        - generic-build

As you can see neither `build-alpha` nor `build-beta` workflows have any steps. Instead the steps are defined in `generic-build`, but when you `bitrise run build-alpha` the `BUILD_TYPE` environment variable will be set to `alpha`, while if you `bitrise run build-beta`, the `BUILD_TYPE` environment variable will be set to `beta`.

As discussed above workflow defined environment variables are only available in the workflow it defines, and in the ones **executed after** that workflow. In the example above, `generic-build` is included as `after_run` workflow, so the `BUILD_TYPE` environment variable will be available in the steps of `generic-build`. But if you'd use `before_run` instead of `after_run`, that would mean that technically the steps of `generic-build` are processed and executed before processing the `build-alpha` or `build-beta` workflows, so the `BUILD_TYPE` environment variable would not be available in the step of `generic-build`.

## Utility workflows

Utility workflows help you organize your workflows more efficiently.

If you chain workflows together, you might quickly end up with tons of small, reusable workflows. Finding the right workflow might get a bit tricky. This is when utility workflows come in handy. The Bitrise CLI supports a small notation, called utility workflows.

A utility workflow is a workflow whose ID starts with an underscore character, for example, `_setup`.

You can find utility workflows at the end of the workflow list if you run `bitrise run` or `bitrise workflows`, and **utility workflows can't be executed directly with a** `bitrise run` **command**.

These workflows can still be referenced in `before_run`and `after_run`.  and **there's absolutely no other difference compared to a regular workflow**.

Using the above example with five workflows (`ci`, `deploy`, `send-notifications`, `setup` and `test`), if you run `bitrise run`  in the directory of the `bitrise.yml`without specifying a workflow, you'll get list of all five workflows:

    The following workflows are available:
     * ci
     * deploy
     * send-notifications
     * setup
     * test
    
    You can run a selected workflow with:
    $ bitrise run WORKFLOW-ID

You most likely don't want to run `setup`, `test` nor `send-notifications` by itself, only through `ci` or `deploy`. If you prefix those with an underscore character to make them utility workflows, the `bitrise run` output will better highlight which workflows are meant to be executed directly:

    The following workflows are available:
     * ci
     * deploy
    
    You can run a selected workflow with:
    $ bitrise run WORKFLOW-ID
    
    
    The following utility workflows are defined:
     * _send-notifications
     * _setup
     * _test
    
    Note about utility workflows:
     Utility workflow names start with '_' (example: _my_utility_workflow).
     These workflows can't be triggered directly, but can be used by other workflows
     in the before_run and after_run lists.

{% include message_box.html type="info" title="Full list of available properties" content="
You can find the complete list of available properties in the [bitrise.yml format specification / reference](https://github.com/bitrise-io/bitrise/blob/master/_docs/bitrise-yml-format-spec.md) docs of the CLI.
"%}