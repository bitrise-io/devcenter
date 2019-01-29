---
title: Use bitrise.yml from repository
menu:
  tips-and-tricks:
    weight: 10

---
Storing the build configuration (`bitrise.yml`) in your repository can be a great idea.
It has its own PROs and CONs of course, so you have to decide it yourself
whether this solution is a good fit for your project or not.

## Things to keep in mind!

You can find a discussion about what are the advantages and
disadvantages of this approach [on GitHub](https://github.com/bitrise-io/bitrise.io/issues/41).
To highlight a few things to keep in mind if you'd want to store and use
the `bitrise.yml` from your repository:

### Trigger Map is better to be managed on bitrise.io

You can of course store the `trigger_map` (or `Triggers` on the web UI)
in your repository (in `bitrise.yml`), but if you do that you'll lose
the ability to _ignore_ patterns. This is because [bitrise.io](https://www.bitrise.io)
have to evaluate the Trigger map **before** the repository would be cloned
in order to be able to avoid starting a build based on the Trigger map.

The source code is never stored on [bitrise.io](https://www.bitrise.io),
(see [Code Security - Source code](/getting-started/code-security/#source-code) for more information),
so if you store the trigger map in your repository, the only way to check it
is to clone it first. Even if you prepare your `trigger_map` in your repository to ignore
patterns, [bitrise.io](https://www.bitrise.io) will start a build to clone
the repository, before it could abort it.

In contrast, if you specify the Trigger Map on [bitrise.io](https://www.bitrise.io),
you can ignore patterns in a way that it won't even start a build.

### You can't change the build configuration of a commit

If you use the `bitrise.yml` from the repository, that means that when you
rebuild a specific commit, it will use the same `bitrise.yml` every time,
the one stored in the repository for that git commit.

_The only way to change the configuration_ is to checkout the related
branch, change the `bitrise.yml`, commit the changes,
push and start a **new** build (rebuild of a commit won't work,
that will always get the same `bitrise.yml`, the one stored at the commit).

**If you store your build configuration on** [**bitrise.io**](https://www.bitrise.io)
you can always rebuild any commit with a new build configuration,
_the configuration is not tied to the commit / state of the repository_.
You can simply change a parameter and hit "rebuild", the new build
will use the latest configuration from [bitrise.io](https://www.bitrise.io).

### You can't edit the configuration in the Workflow Editor on bitrise.io

The Workflow Editor on [bitrise.io](https://www.bitrise.io) can only be used
to visualize and edit the configuration stored on [bitrise.io](https://www.bitrise.io).

The [offline workflow editor](https://github.com/bitrise-io/bitrise-workflow-editor)
of course can be used, so this is probably not a huge issue - and we're
working on it to make it as streamlined as possible - but might
make it harder to get started (as you have to install the Bitrise CLI
locally).

### Pull Requests can run builds with any custom configuration

When someone sends a Pull Request they can modify the `bitrise.yml`
in your repository any way they like it. A recent trend for example
is to send pull requests which run a bitcoin miner, as long as
that's possible. This can make _your_ builds to queue, until you
abort the related build or it hits the build time limit.

## Example to use bitrise.yml from the repository

There are quite a few ways to accomplish this, as all you need is:

1. Define a "wrapper" build config on [bitrise.io](https://www.bitrise.io),
   which defines how and from where your `bitrise.yml` will be retrieved.
   E.g. you could store the `bitrise.yml` in a [GitHub Gist](https://gist.github.com)
   too, not just in your repository. In this example we'll use the configuration
   from the repository, so the "wrapper" configuration on [bitrise.io](https://www.bitrise.io)
   will define how the repository should be retrieved. Note: this also allows
   more customization, for example if the repository have to be accessed through
   a VPN, you can configure that in the "wrapper" config and it will work.
2. Run the build configuration (`bitrise.yml`) with the [Bitrise CLI](https://www.bitrise.io/cli).
   This is the same runner which runs any other build on the [bitrise.io](https://www.bitrise.io)
   build virtual machines, so it's always preinstalled and ready to be used.

The example here is really simple to setup, should work in most cases (unless
you need a VPN for cloning the repository for example), but **it also requires
you to maintain the Trigger Map on **[**bitrise.io**](https://www.bitrise.io)** instead
of in the repository**, as that is the recommended solution.

Step by step:

1. Create an app on [bitrise.io](https://www.bitrise.io), or if you already have it registered
   open it.
2. Go to the `Workflow` tab to open the Workflow Editor.
3. In the Workflow Editor switch to `bitrise.yml` mode
4. In the `bitrise.yml` mode:
   * If you already have a configuration which you want to use, download the `bitrise.yml` first,
     and save it into the _root_ of your repository.
     _There's a button to quickly download the current_ `_bitrise.yml_`_._
   * Once you're ready to replace your configuration on bitrise.io,
     copy the [bitrise.yml content for bitrise.io](#bitriseyml-content-for-bitriseio) from below and paste
     it into the editor on [bitrise.io](https://www.bitrise.io) (in `bitrise.yml` mode of the editor)
5. Save the changes.

{% include message_box.html type="note" title="After downloading the original bitrise.yml from bitrise.io" content="
The original `bitrise.yml` you downloaded from [bitrise.io](https://www.bitrise.io) most likely includes the steps to retrieve your repository. These steps will be redundant, as you will define how the repository should be accessed in the \"wrapper\" config on [bitrise.io](https://www.bitrise.io), so go ahead and remove the `activate-ssh-key` and `git-clone` steps from it before you would commit it into your repository.
"%}

### bitrise.yml content for bitrise.io

    {% raw %}
    ---
    format_version: 1.4.0
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    trigger_map:
    - push_branch: "*"
      workflow: ci
    - pull_request_target_branch: "*"
      workflow: ci
    
    workflows:
      _run_from_repo:
        steps:
        - activate-ssh-key:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone: {}
        - script:
            title: continue from repo
            inputs:
            - content: |-
                #!/bin/bash
                set -ex
                bitrise run "${BITRISE_TRIGGERED_WORKFLOW_ID}"
      ci:
        after_run:
        - _run_from_repo
    
      another-workflow:
        after_run:
        - _run_from_repo
    {% endraw %}

#### How this works:

This setup splits the build configuration into two parts:

1. The "wrapper" config on [bitrise.io](https://www.bitrise.io) which
   **defines how the repository have to be retrieved** (e.g. through a Git Clone),
   which workflows are exposed for [bitrise.io](https://www.bitrise.io) builds,
   and defines the automatic [Trigger mapping](/webhooks/trigger-map/).
2. Your build configuration (`bitrise.yml`), stored in your repository,
   which **defines what should happen during the builds.**

[This "wrapper" configuration](#bitriseyml-content-for-bitriseio)
defines a common workflow `_run_from_repo`,
which will activate an SSH key (if specified), Git Clone the repository,
and then switch to use the `bitrise.yml` from the repository
by running `bitrise run "${BITRISE_TRIGGERED_WORKFLOW_ID}"`.

This common workflow (`_run_from_repo`) is then used through other workflows, like
`ci` and `another-workflow`, using the `after_run`
[workflow chaining](/bitrise-cli/workflows/#chaining-workflows-and-reusing-workflows)
mechanism. Those workflows do not have any steps, the only thing
the `ci` and `another-workflow` workflows do is running the
common `_run_from_repo` workflow.

The trick is `bitrise run "${BITRISE_TRIGGERED_WORKFLOW_ID}"`.
The `BITRISE_TRIGGERED_WORKFLOW_ID` environment variable is set to the
**"entry"** workflow, **the one which started the build.**
So, by running the `ci` workflow, the `bitrise run "${BITRISE_TRIGGERED_WORKFLOW_ID}"`
command will be the same as `bitrise run "ci"`.

This makes it super simple and quick to expose workflows from your `bitrise.yml` (stored in your
repository) to [bitrise.io](https://www.bitrise.io), all you have to do is:

1. Define the workflow in your `bitrise.yml` (in your repository).
2. Clone the `ci` workflow (or the `another-workflow`) with a name matching the workflow
   in your `bitrise.yml` (in your repository), or create a new empty workflow
   with a matching name and add the `_run_from_repo` as an `after_run` workflow.
   _Note: in the Workflow Editor UI you can quickly clone a workflow by
   selecting the workflow, then clicking the "add new workflow" (_`_+_`_) button._

### Step by step usage guide of the wrapper config:

For example, to add a new `deploy` workflow and to expose it for [bitrise.io](https://www.bitrise.io) builds,
once you [prepared your wrapper config on bitrise.io](#bitriseyml-content-for-bitriseio):

1. Create a `deploy` workflow **in your** `**bitrise.yml**` (in your repository, and don't forget to commit and push
   the `bitrise.yml` changes!)
2. Then create a new workflow with the same name (`deploy`) **on** [**bitrise.io**](https://www.bitrise.io)
3. Make sure that the `deploy` workflow on [bitrise.io](https://www.bitrise.io) has
   the `_run_from_repo` as an `after_run` workflow.
4. Define [Triggers](/webhooks/trigger-map/) for the `deploy` workflow **on** [**bitrise.io**](https://www.bitrise.io)
   if you want to automate the triggering of that workflow.

Following the steps above, for example to run `deploy` for every code push on `master` you should
have a configuration like this **on** [**bitrise.io**](https://www.bitrise.io):

    {% raw %}
    ---
    format_version: 1.4.0
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    trigger_map:
    - push_branch: "master"
      workflow: deploy
    - push_branch: "*"
      workflow: ci
    - pull_request_target_branch: "*"
      workflow: ci
    
    workflows:
      _run_from_repo:
        steps:
        - activate-ssh-key:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone: {}
        - script:
            title: continue from repo
            inputs:
            - content: |-
                #!/bin/bash
                set -ex
                bitrise run "${BITRISE_TRIGGERED_WORKFLOW_ID}"
      deploy:
        after_run:
        - _run_from_repo
    
      ci:
        after_run:
        - _run_from_repo
    
      another-workflow:
        after_run:
        - _run_from_repo
    {% endraw %}

This configuration will run the `deploy` workflow _from your repository_ for every
code push on the `master` branch, the `ci` workflow _from your repository_ for
every code push on other branches as well as for Pull Requests,
and it will never run `another-workflow` automatically, but you will be able
to start manual builds with `another-workflow`, which will invoke
the `another-workflow` workflow _from the_ `_bitrise.yml_` _in your repository_.