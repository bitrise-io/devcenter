---
title: Steps in YAML
redirect_from:
- "/bitrise-cli/steps/"
- "/bitrise-cli/steps"
menu:
  bitrise-cli:
    weight: 8

---
## What is a Step

A Step encapsulates a "build task": the code to perform that task, the inputs/parameters
you can define for the task, and the outputs the task generates.

For example the `Git Clone` (id: `git-clone`) step performs a "git clone"
of the specified repository, with the inputs you (or the system) specify (e.g.
the branch, tag or commit to clone, the local path where the clone should happen, etc.).

From a technical perspective a Step is a semver **versioned** repository
which includes the _code_ of the Step and the _interface_ definition of the Step.

The _step interface definition_ (`step.yml`) includes information like the dependencies of the step,
the inputs and outputs of the step, the title and description of the step;
and other properties like the issue tracker / support URL, or
the filter properties which define when the step should be performed or skipped
and whether a failed step should mark the build as failed.

From a configuration perspective all you have to know about Bitrise Steps
is how you can include and configure them in your build configuration (`bitrise.yml`).

To include a Step you have to reference it by a [Step reference ID](#step-referenceid-format)
in the `steps:` list of a Workflow.

An example, with a single `script` step, which will be executed when you run `bitrise run test`:

```yaml
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script:
```

{% include message_box.html type="note" title="List of available steps (step IDs)" content="

You can list all the available steps in the main Bitrise StepLib by running `bitrise step-list`, or by checking [the main Bitrise Steplib repository](https://github.com/bitrise-io/bitrise-steplib/tree/master/steps)."%}

Once you include a step in your build configuration (`bitrise.yml`),
you can specify configurations for the step. The most common thing
you'll do is to specify values for the step's inputs.
You can do this with the `inputs:` list property of the step,
defining the _key_ of the input and the _value_ you want to set.

For example, to specify a simple script to perform for the `script` step,
you can specify a value for the `script` step's `content` input.
(_Note: you can list all the inputs of a step with_ `bitrise step-info STEP-ID`)

Let's do a simple "Hello World" script, using the `script` step:

```yaml
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script@1.1.3:
        inputs:
        - content: "echo 'Hello World!'"
```

When you run the `test` workflow of this configuration with `bitrise run test`
you'll now see that the `script` step prints the text `Hello World` in its log:

    +------------------------------------------------------------------------------+
    | (0) script@1.1.3                                                             |
    +------------------------------------------------------------------------------+
    | id: script                                                                   |
    | version: 1.1.3                                                               |
    | collection: https://github.com/bitrise-io/bitrise-steplib.git                |
    | toolkit: bash                                                                |
    | time: 2016-12-07T17:05:17+01:00                                              |
    +------------------------------------------------------------------------------+
    |                                                                              |
    Hello World!
    |                                                                              |
    +---+---------------------------------------------------------------+----------+
    | ✓ | script@1.1.3                                                  | 0.30 sec |
    +---+---------------------------------------------------------------+----------+

If the step doesn't have any required inputs you don't have to specify an input,
and of course you can specify values for as many inputs as you want to.

For example the `script` step can run Ruby scripts too, not just Bash scripts.
To do this, in addition to specifying the script in the `content` input
you also have to specify the "runner" input:

```yaml
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script@1.1.3:
        inputs:
        - content: "puts 'Hello Ruby!'"
        - runner_bin: ruby
```

Step input values are always **string** / text values, as the input id/key and the value
are passed to the step as environment variables
([more information](/bitrise-cli/most-important-concepts/#every-input-output-and-parameter-is-an-environment-variable)),
and the value can be multi line too, using the standard YAML multi line format.
An example multi line Bash script:

```yaml
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script@1.1.3:
        inputs:
        - content: |
            #!/bin/bash
            set -ex
            var_to_print='Hello World!'
            echo "${var_to_print}"
```

{% include message_box.html type="important" title="Indentation in YAML" content="Indentation in the YAML format is very important!
You should use two-spaces indentation, and you can't use tabs to indent!

If you use a multi line value, like the one above, it's important that you
have to _indent the value with two spaces_, compared to the key!"%}

You can change other properties of the step too, not just the inputs.
For example, if you want to "force" run the step even if a previous step fails,
you can set the `is_always_run` property to `true`:

```yaml
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script@1.1.3:
        is_always_run: true
        inputs:
        - content: "puts 'Hello Ruby!'"
        - runner_bin: ruby
```

or if you want to specify a better, more descriptive title for the step,
you can use the `title` property:

```yaml
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script@1.1.3:
        title: Print Hello Ruby
        is_always_run: true
        inputs:
        - content: "puts 'Hello Ruby!'"
        - runner_bin: ruby
```

### The Step data you define in bitrise.yml - your diff!

You might already suspect it after the examples above:
the step data / infos you specify in the `bitrise.yml` are the parameters
of the step **you want to change** / overwrite.

If you don't specify any input or other step property, only the step (reference/iD),
that means that the step should run with the default values (defined by the step's developer).

You could also think about this as a `diff`. The step defines values for the step interface
properties, and in the `bitrise.yml` you define a `diff`, the things you want to change
and the values to change to.

Let's go through the example above:

```yaml
    - script@1.1.3:
        title: Print Hello Ruby
        is_always_run: true
        inputs:
        - content: "puts 'Hello Ruby!'"
        - runner_bin: ruby
```

The `- script@1.1.3:` line selects the step, and the properties you define after this
(with an indentation!)
are the things you want to overwrite.

To see the step's raw interface definition you can check it in the step library.
In these examples we always use the [main Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib).
The step interface definitions can be found in the StepLib's
[steps directory](https://github.com/bitrise-io/bitrise-steplib/tree/master/steps).

The [step.yml file in this directory is the step's interface definition](https://github.com/bitrise-io/bitrise-steplib/blob/master/steps/script/1.1.3/step.yml).

You can see all the properties defined for this version of the step.
Now, if you check our example above, all we did is to
change the `title` property (from `Script` to `Print Hello Ruby`),
the `is_always_run` property (from `false` to `true`)
and two inputs of the step, `content` (from a default, example script content)
and `runner_bin` (from `/bin/bash` to `ruby`).

All other properties you can see in the step version's `step.yml` will be read
from the `step.yml`, you don't have to define those. You only have to define
**the things you want to change**, compared to the values specified for the step
in the step's interface definition (`step.yml`).

## Step reference/ID format

A step reference from the example `bitrise.yml` above:

    - script@1.1.3:

1. the StepLib source
2. the Step ID
3. the Step Version

Step reference format: `- StepLibSource::StepID@StepVersion:`

**From the three components only Step ID is required (for example,**`script`**).**
This example item could alternatively be written as `- https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:`,
to include all three components of the step reference.

If the Version is not defined, the latest version of the step will be used.

If the StepLib Source is not defined, the `default_step_lib_source` will be used.

So, if `default_step_lib_source` is set to `https://github.com/bitrise-io/bitrise-steplib.git`,
and the latest version of the Script step is `1.1.3`, all the following references
will mean the exact same thing:

* `- https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:`
* `- script@1.1.3:`
* `- https://github.com/bitrise-io/bitrise-steplib.git::script:`
* `- script:`

But, if a new version of the `script` step is released (e.g. `2.0.0`)
and you don't include the `@1.1.3` version reference component,
new builds will use the "latest version at the time".
For this reason, it's usually a good idea to specify the version of the step,
so that your build does not break accidentally when a breaking change
is introduced in a new version of the step.

### Special step sources

There are two special step sources:

* `git::`
* and `path::`

When you use one of these sources, the step won't be identified through
a Step Library, but through the ID data you specify.

For example, the `script` step's github is at: `https://github.com/bitrise-io/steps-script`.
To reference the `script` step directly through a git reference,
you can use the `git::` source, the step's git clone URL,
and the branch or tag in the repository.

Example, to reference the `1.1.3` version tag of the script step's repository:

    - git::https://github.com/bitrise-io/steps-script.git@1.1.3:

In general, **whenever you can use a step version through a Step Library,
you should do that**, instead of using the `git::` source type,
because features like _local step caching_ or _network caching_ / alternative
download URLs are only supported for steps shared in a StepLib.

But this type of referencing allows certain things you can't get through
a StepLib. For example the `git::` source type can be used for not-yet-published or
work-in-progress states of a step.
If you [develop your own Step](/bitrise-cli/create-your-own-step/) you can use
this `git::` source type to test your step _before you would publish it_
in a StepLib.

Example:

    - git::https://github.com/bitrise-io/steps-script.git@BRANCH-OR-TAG:

`BRANCH-OR-TAG` of course have to be a branch or tag which does exist in
the step's repository. For example, if you develop your own Step
and you work on a `soon-to-be-released` branch, you can
use that state of the step with:

    - git::https://github.com/bitrise-io/steps-script.git@soon-to-be-released:

The second special source is `path::`, which works in a similar way,
except for **local paths**, and it requires no version information.

A good example for this is, again, when you create and work on your own
Step, you can run the state of the Step (step's code) directly on your Mac/PC,
without even pushing it to the step's repository.

Both absolute and relative (relative to the `bitrise.yml`!) local paths are supported, so you can:

    - path::/path/to/my/step:

as well as:

    - path::./relative/path:

During step development it's a best practice to have a `bitrise.yml` directly
in the step's repository, for unit and ad hoc testing. In this case _the current directory is the step directory_,
and the step can be referenced with:

    - path::./:

_This can also be used if you want to include your build steps in your app's source code._
For example if you store the `script` step's code in your source code repository,
under the `steps/script` directory, you can run the version included in your source code
repository with:

    - path::./steps/script: