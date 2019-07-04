---
title: Steps in YAML
redirect_from:
- "/bitrise-cli/steps/"
- "/bitrise-cli/steps"
tag:
- steps
- workflows
- bitrise.yml
- cli
summary: 'A Step encapsulates a "build task": the code to perform that task, the inputs
  and parameters you can define for the task, and the outputs the task generates.'
menu:
  bitrise-cli-main:
    weight: 15

---
## What is a Step

A Step encapsulates a "build task": the code to perform that task, the inputs and parameters you can define for the task, and the outputs the task generates.

For example the `Git Clone` Step performs a `git clone` of the specified repository, with the specified inputs, such as the branch or the commit to clone.

From a technical perspective, a Step is a semver **versioned** repository which includes the _code_ of the Step and the _interface_ definition of the Step.

The _step interface definition_ is defined in the `step.yml` file for every Step. It includes:

* The dependencies of the Step.
* The inputs and outputs of the Step.
* The title and description of the Step.
* Properties such as the issue tracker or support URL, or certain filter properties.

To include a Step in your `bitrise.yml` configuration, you have to reference it by a [Step reference ID](#step-referenceid-format) in the `steps:` list of a Workflow.

Let's see an example with a single `script` Step, which will be executed when you run `bitrise run test`:

```yaml
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
workflows:
  test:
    steps:
    - script:
```

{% include message_box.html type="note" title="List of available Steps (Step IDs)" content="

You can list all the available Steps in the main Bitrise StepLib by running `bitrise step-list`, or by checking [the main Bitrise Steplib repository](https://github.com/bitrise-io/bitrise-steplib/tree/master/steps)."%}

Once you include a Step in your build configuration (`bitrise.yml`), you can specify configurations for the Step. The most common thing you'll do is to specify values for the step's inputs. You can do this with the `inputs:` list property of the Step, defining the _key_ of the input and the _value_ you want to set.

For example, to specify a simple script to perform for the `script` Step, you can specify a value for the `script` Step's `content` input. (_Note: you can list all the inputs of a step with_ `bitrise step-info STEP-ID`)

Let's do a simple "Hello World" script, using the `script` Step:

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

```yaml
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
workflows:
  test:
    steps:
      inputs:
      - content: "echo 'Hello World!'"
```

When you run the `test` workflow of this configuration with `bitrise run test` you'll now see that the `script` Step prints the text `Hello World` in its log:

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

If the Step doesn't have any required inputs you don't have to specify an input. You can specify values for as many inputs as you want to.

For example, the `script` Step can run Ruby scripts too, not just Bash scripts. To do this, in addition to specifying the script in the `content` input you also have to specify the "runner" input:

```yaml
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
workflows:
  test:
    steps:
      inputs:
      - content: "puts 'Hello Ruby!'"
      - runner_bin: ruby
```

Step input values are always **string** / text values, as the input id/key and the value are passed to the Step as environment variables ([more information](/bitrise-cli/most-important-concepts/#every-input-output-and-parameter-is-an-environment-variable)). The value can be multiline too, using the standard YAML multiline format. An example multiline Bash script:

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

{% include message_box.html type="important" title="Indentation in YAML" content="Indentation in the YAML format is very important! You should use two-spaces indentation, and you can't use tabs to indent!

If you use a multiline value, like the one above, it's important that you have to _indent the value with two spaces_, compared to the key!"%}

You can change other properties of the Step as well. For example, if you want to "force" run the step even if a previous step fails, you can set the `is_always_run` property to `true`:

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

If you want to specify a better, more descriptive title for the Step, you can use the `title` property:

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

### Step data in the bitrise.yml file

The Step data and information you specify in the `bitrise.yml` file are the parameters of the step **you want to change**, compared to the Step's default definition.

To see the Step's raw interface definition you can check it in the step library. In these examples we always use the [main Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib). The Step interface definitions can be found in the StepLib's [steps directory](https://github.com/bitrise-io/bitrise-steplib/tree/master/steps).

The [step.yml file in this directory is the Step's interface definition](https://github.com/bitrise-io/bitrise-steplib/blob/master/steps/script/1.1.3/step.yml).

If you don't specify any input or other Step property in the `bitrise.yml` configuration, only the Step (reference/ID), the Step will run with the default values as defined by the Step's developer in the interface definition.

You could also think about this as a `diff`. The Step defines values for the Step interface properties, and in the `bitrise.yml` you define a `diff`: the things you want to change and the values to change to.

Let's go through the example above:

        - script@1.1.3:
            title: Print Hello Ruby
            is_always_run: true
            inputs:
            - content: "puts 'Hello Ruby!'"
            - runner_bin: ruby

The `- script@1.1.3:` line selects the Step, and the properties you define after this are the things you want to overwrite.

In this example, all we did is changing the `title` property (from `Script` to `Print Hello Ruby`), the `is_always_run` property (from `false` to `true`) and two inputs of the Step: `content` and `runner_bin` (from `/bin/bash` to `ruby`).

All other properties you can see in the Step version's `step.yml` will be read from the `step.yml`, you don't have to define those. You only have to define **the things you want to change**, compared to the values specified for the step in the Step's interface definition (`step.yml`).

## Step reference/ID format

A Step reference can contain three components:

1. The StepLib source
2. The Step ID
3. The Step Version

Step reference format: `- StepLibSource::StepID@StepVersion:`

**From the three components only the Step ID is required.** For example, `- script:`. This example item could alternatively be written as `- https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:`, to include all three components of the step reference.

If the Version is not defined, the latest version of the step will be used.

If the StepLib Source is not defined, the `default_step_lib_source` will be used.

For example, if `default_step_lib_source` is set to `https://github.com/bitrise-io/bitrise-steplib.git`, and the latest version of the Script step is `1.1.3`, all the following references will mean the exact same thing:

* `- https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:`
* `- script@1.1.3:`
* `- https://github.com/bitrise-io/bitrise-steplib.git::script:`
* `- script:`

But, if a new version of the `script` Step is released and you don't include the `@1.1.3` version reference component, new builds will use the "latest version at the time". As such, we generally recommend using a specified version of the Step. That way your build won't break accidentally if a breaking change is introduced in a new version of the Step.

### Special Step sources

There are two special Step sources:

* `git::`
* and `path::`

When you use one of these sources, the Step won't be identified through a Step Library but through the ID data you specify.

#### The git:: source

The `git::` source is the repository of the Step on your git hosting provider. The `script` Step's GitHub source is: `https://github.com/bitrise-io/steps-script`. To reference the `script` Step directly through a git reference, you can use the `git::` source, the Step's git clone URL, and the branch or tag in the repository.

To reference the `1.1.3` version tag of the script Step's repository:

    - git::https://github.com/bitrise-io/steps-script.git@1.1.3:

In general, **whenever you can use a Step version through a Step Library, you should do that**, instead of using the `git::` source type. Features like local step caching, network caching, or alternative download URLs are only supported for Steps shared in a StepLib.

But this type of referencing allows certain things you can't get through a StepLib. For example, the `git::` source type can be used for not-yet-published or work-in-progress states of a Step. If you [develop your own Step](/bitrise-cli/create-your-own-step/) you can use this `git::` source type to test your step before you publish it in a StepLib.

For example:

    - git::https://github.com/bitrise-io/steps-script.git@BRANCH-OR-TAG:

`BRANCH-OR-TAG` has to be a branch or tag which does exist in the step's repository. If you develop your own Step and you work on a `soon-to-be-released` branch, you can use that state of the Step with:

    - git::https://github.com/bitrise-io/steps-script.git@soon-to-be-released:

#### The path:: source

The second special source is `path::`, which works in a similar way to `git::`, except for **local paths**, and it requires no version information.

A good example for this is, again, when you create and work on your own Step, you can run the state of the Step (the Step's code) directly on your Mac/PC, without even pushing it to the Step's repository.

Both absolute and relative (relative to the `bitrise.yml`!) local paths are supported. The relative path is relative to the folder containing the `bitrise.yml` file.

    - path::/path/to/my/step:
    
    - path::./relative/path:

During Step development it's a best practice to have a `bitrise.yml` directly in the Step's repository, for unit and ad-hoc testing. In this case the current directory is the Step directory, and the Step can be referenced with:

    - path::./:

This can also be used if you want to include your build Steps in your app's source code. For example, if you store the `script` Step's code in your source code repository, under the `steps/script` directory, you can run the version included in your source code repository with:

    - path::./steps/script:

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Now you know everything</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to Bitrise now</button></a>
</div>