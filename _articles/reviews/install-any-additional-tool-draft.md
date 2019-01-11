---
title: Install Any Additional Tool - draft
redirect_from: []
date: 2019-01-09 15:23:55 +0000
published: false

---
If you need something you can't find a Step for, you can always install and use tools with scripts or Script steps. Add a `Script` step to your Workflow, and either write your script there, or run a script from your repository. Passwordless `sudo` is enabled in all of our build virtual machines, so you can freely use `sudo` if you need it. **We will show you how to do both!**

Once you have a working script, **you can also transform it into a Step** and optionally share it with others (through our StepLib). You can find a template and a README about Step creation at our [Github page](https://github.com/bitrise-core/bitrise-plugins-step/tree/master/create/templates).

## Adding a Script Step to a workflow

1. Click your app on the right side of your [Dashboard](https://app.bitrise.io/dashboard/builds).
2. Click `Workflow` tab to open the Workflow Editor (on the `Workflow` tab -> click `Manage Workflows`)
3. Select a workflow in the `WORKFLOW` menu.

   ![](/img/workflow-menu.png)
4. Once, you have your workflow, click the `+` sign to insert a Step at that position from our Step Library.
5. In the `Search steps` bar, search for "script" and click on the `Script` Step . This will add the Step to your workflow.
6. Click the Step and write your script into the `Script content`  input field.

{% include message_box.html type="info" title="About workflows" content="
Check out our [guide on Workflows](/getting-started/getting-started-workflows/) to find out what else you can do with your workflow.
"%}

## Running a script from a repo with Script Step

If you want to run a script from your repository, you can run it from this Script Step. Paths are relative to your repository's root. For example, if you have a **Bash script** at `path/to/script.sh` you can run it with the following command added to the `Script content` input field:

    bash ./path/to/script.sh

Or in a more robust form which is better if you want to extend the content later:

    #!/bin/bash
    set -ex
    bash ./path/to/script.sh

{% include message_box.html type="note" title="set -ex" content="
The `set -ex` line is recommended for every multi-line Bash script to make your scripts easier to debug. "%}

You can of course run non-Bash scripts too, for example, a **Ruby script**:

    #!/bin/bash
    set -ex
    ruby ./path/to/script.rb

### Examples

At this point you already have the Script step in your Workflow, and you just have to write the script to install the dependency. How do you do that? Exactly the same way you would on your own Mac / Linux, in your Terminal / Command Line!

#### `brew` on macOS

For example, to install `cmake` with a script step, on macOS, using `brew`:

    #!/bin/bash
    set -ex
    brew install cmake

Actually, the whole Script content could be as short as:

    brew install cmake

Which is exactly how you would use `brew` on your Mac, but you'll most likely add more content to the Script step sooner or later; the first example is a more future proof Bash script template.

#### `apt-get` on Linux

For example, to install `cmake` with a script step, on Linux, using `apt-get`:

    #!/bin/bash
    set -ex
    sudo apt-get install -y cmake

Don't forget the `-y` flag for `apt-get`! If you don't add the `-y` (yes) flag to the `apt-get` command, `apt-get` will present a prompt which you have to accept or deny manually. This is not a problem on your own Linux machine, but in a CI environment you can't provide manual input for `apt-get`. To prevent this issue, and to auto accept the prompt, just use the `-y` flag, as shown in the example.

## Advanced option: use `deps` in `bitrise.yml`

Instead of installing your tool inside the Script step, you can use the `deps` option of the `bitrise.yml`. If you declare `deps` _for a given Step_, the [Bitrise CLI](https://github.com/bitrise-io/bitrise) will check if that tool is installed, and will install it for you if required.

{% include message_box.html type="note" title="Available dependency managers" content=" This method is the preferred way of handling (step) dependencies, as the Bitrise CLI will not (re)install the specified tool(s) if it's already available. That said, there are tools which are not available in the supported dependency managers, or you need a version of the tool which is not available in the dependency manager. In those cases you should simply install the tool inside the Script, as described above. "%}

An example, installing `cmake` with either `apt-get` (where `apt-get` is available), or with `brew` (on macOS):

    deps:
      brew:
      - name: cmake
      apt_get:
      - name: cmake

A minimal `bitrise.yml` for demonstration:

    format_version: 1.2.0
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        steps:
        - script:
            deps:
              brew:
              - name: cmake
              apt_get:
              - name: cmake
            inputs:
              - content: |-
                  #!/bin/bash
                  set -ex
                  which cmake

{% include message_box.html type="info" title="Advanced tip" content=" If you want to declare a dependency which might be available from another source (not through the package manager), then you might also want to declare the related `binary name`. If that matches the package name (like in case of `cmake`) this is completely optional, but in case the package does not match the binary name you can declare it with `bin_name`. An example is AWS CLI, where the package name in both package managers is `awscli`, but the binary itself is `aws`." %}

A minimal `bitrise.yml` for demonstration:

    format_version: 1.3.0
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        steps:
        - script:
            deps:
              brew:
              - name: awscli
                bin_name: aws
              apt_get:
              - name: awscli
                bin_name: aws
            inputs:
              - content: |-
                  #!/bin/bash
                  set -ex
                  which aws

## Conditional execution

Additionally, you can use Environment Variables in your scripts too. As an example, using the `PR` environment variable (but you can use any [Available Environment Variable](/faq/available-environment-variables/), like the ones exposed by previous steps in the Workflow), to run different scripts in case of a Pull Request and a non Pull Request build:

    #!/bin/bash
    set -ex
    
    if [[ "$PR" == "true" ]] ; then
      echo "=> Pull Request mode/build!"
      bash ./path/to/in-case-of-pull-request.sh
    else
      echo "=> Not Pull Request mode/build!"
      bash ./path/to/not-pull-request.sh
    fi

Note: if you **don't** want to run any part of the Step/script based on a variable (like `$PR`), you don't have to implement the check in the script. You can use the`run_if` expression in the `bitrise.yml` directly to declare in which case(s) the Step should run. Additionally, `run_if` can be added to any step, not just to Script steps. You can find more information about `run_if` expressions in [this guide](/tips-and-tricks/disable-a-step-by-condition/#run-a-step-only-if-the-build-failed).