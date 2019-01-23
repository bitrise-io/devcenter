---
# jp title missing
title: Workflows in YAML
redirect_from:
- "/bitrise-cli/workflows/"
- "/bitrise-cli/workflows"
menu:
  bitrise-cli:
    weight: 7

---

{% include not_translated_yet.html %}

A workflow is a collection of steps, environment variables,
and other configurations for a single `bitrise run`.

The only requirement for a workflow is an ID.

```yaml
format_version: 1.3.1
workflows:
  test:
```

In this configuration we declared one workflow, with the ID `test`.
You can define as many workflows as you want to, and run a specific
workflow with `bitrise run WORKFLOWID`.

```yaml
format_version: 1.3.1
workflows:
  first:
  second:
```

This configuration contains two workflows, `first` and `second`,
so you can execute both `bitrise run first` and `bitrise run second`.

{% include message_box.html type="note" title="Available workflow list" content="
You can list all the available workflows in a `bitrise.yml` by running `bitrise run` or `bitrise workflows` in the directory of the `bitrise.yml`. "%}

## Adding steps to a workflow

To add steps to a workflow simply include `steps:` and then the list of steps.
For example to run two script steps after each other:

```yaml
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script:
        title: First step
    - script:
        title: Second step
```

When you you run `bitrise run test`, the Bitrise CLI will run the two
script steps one by one, starting with `First step` and then
continuing with `Second step`.

_To learn more about Build Steps, check the_ [_Steps_](/bitrise-cli/steps) _section._

## Defining workflow specific parameters / environment variables

In addition to steps, you can also specify environment variables
for every workflow.

The environment variables you specify for a given workflow will be used
when the workflow is executed and will be available for every step
in the workflow.

An example, defining two environment variables (`ENV_VAR_ONE` and `ENV_VAR_TWO`)
for the `test` workflow:

```yaml
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    envs:
    - ENV_VAR_ONE: first value
    - ENV_VAR_TWO: second value
```

## Chaining workflows and reusing workflows

It's also possible to "chain" workflows, to run one or more workflow
before and/or after a specific workflow.

An example:

```yaml
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
```

In the above example, if you run:

* `bitrise run send-notifications` : only the steps of the `send-notifications` workflow will be executed
* `bitrise run setup` : only the steps of the `setup` workflow will be executed
* `bitrise run test` : first the steps of the `setup` workflow will be executed,
  then the steps declared in `test` workflow
* `bitrise run ci`: will execute the steps of the workflows, in the following order:
  1. `setup`
  2. `test`
  3. `ci` (the `ci` workflow doesn't have any steps, but that's not an issue, it just means
     that no step will be executed here, the build will continue with the next workflow in the chain)
  4. `send-notifications`
* `bitrise run deploy`: will execute the steps of the workflows, in the following order:
  1. `setup`
  2. `test`
  3. `deploy`
  4. `send-notifications`

This means that you can define what a `setup` and `test` should do
in your project only once, in the `setup` and `test` workflows,
and then you can resuse those in other workflows.
There's no need to duplicate steps between workflows.

When you chain workflows, technically it's the same as if you'd create
one workflow which would include all steps from all the workflows
chained after each other. This means that, for example,
one step's outputs will be available for
every other step which is executed after that step during the build,
regardless of whether the other step is
in the same or in another workflow; if a step is executed
after another one during the build, it can access the outputs
of the previous steps. Just like if both steps would be in a single workflow.

### Note about workflow environment variables

Workflow specific environment variables are made accessible
**when the workflow is executed**, and are available for workflows
executed _after_ that workflow, _but not in the ones executed before_ that workflow.

Using the example above, if you `bitrise run ci`,
the `IS_TEST` environment variable **won't** be available in the `setup`
workflow, as that runs _before_ the `test` workflow,
but the environment variable **will** be available for the steps in `test`, `ci` and
`send-notifications` workflows.

This is true even if the workflow doesn't have any steps.
This can be utilized if you want to create generic workflows,
which can do different things based on environment variables,
and you specify those environment variables through a "wrapper" workflow.

Example:

```yaml
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
```

`build-alpha` nor `build-beta` has any steps, the steps are defined in `generic-build`,
but when you `bitrise run build-alpha` the `BUILD_TYPE` environment variable will be set to `alpha`,
while if you `bitrise run build-beta`  the `BUILD_TYPE` environment variable will be set to `beta`.

**Important:** as noted above, workflow defined environment variables are
only available in the workflow it defines it, and the ones **executed after** that workflow.
In the example above `generic-build` is included as `after_run` workflow,
so the `BUILD_TYPE` environment variable will be available in the steps of `generic-build`.
But if you'd use `before_run` instead of `after_run`, that would mean that technically
the steps of `generic-build` are processed and executed before processing
the `build-alpha` or `build-beta` workflows, so the `BUILD_TYPE` environment
variable would not be available in the step of `generic-build`.

## Utility workflows

Utility workflows are just a small trick to help you organize your workflows.

If you rely on workflow chaining, you might quickly have tons of small,
reusable workflows. Finding the right workflow might get tricky.

To help with this, the Bitrise CLI supports a small notation called
"utility workflows".

A workflow is considered as a utility workflow if it's ID starts
with an underscore character (for example, `setup`).

Utility workflows are listed at the end of the workflow list if you
run `bitrise run` or `bitrise workflows`, and
**utility workflows can't be executed directly with a** `bitrise run` **command**.

These workflows can still be referenced in `before_run` and `after_run`
lists of course, and **there's absolutely no other difference
compared to a regular workflow**.

Using the above example where there were five workflows
(`ci`, `deploy`, `send-notifications`, `setup` and `test`),
if you run `bitrise run` in the directory of the `bitrise.yml`
(just `bitrise run`, without specifying a workflow)
you'll get a single list of all five workflows:

    The following workflows are available:
     * ci
     * deploy
     * send-notifications
     * setup
     * test
    
    You can run a selected workflow with:
    $ bitrise run WORKFLOW-ID

You most likely don't want to run `setup`, `test` nor `send-notifications`
by itself, only through `ci` or `deploy`, so if you prefix those
with an underscore character to make them utility workflows,
the `bitrise run` output will better highlight which workflows
are meant to be executed directly:

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

## Full spec / list of available properties

You can find the complete list of available properties in the
[bitrise.yml format specification / reference](https://github.com/bitrise-io/bitrise/blob/master/_docs/bitrise-yml-format-spec.md)
docs of the CLI.
