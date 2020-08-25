---
title: Exposing Env Vars and using them in another Step
menu:
  tips-and-tricks:
    weight: 12

---
In this guide we show you:

* How to expose Environment Variables (Env Vars) and use them.
* How to copy Env Vars to another key.
* How to overwrite Env Vars.
* How to embed Env Vars in other Env Vars.

## Exposing Environment Variables with envman

You can expose Env Vars from one Step and make it available for every other Step performed after the Step during the build. You can use [envman](https://github.com/bitrise-io/envman/) to manage Env Vars.

Here is a simple example:

    envman add --key MY_RELEASE_NOTE --value "This is the release note"

You can call `envman` in any Step, including a script step, or even in your own script (stored in your repository) if you call it from a `bitrise` build.

You can specify the value as the `--value` parameter (you can see this in the previous example). Pipe the value as shown here:

      echo 'hi' | envman add --key MY_RELEASE_NOTE

You can also read the value from a file:

      envman add --key MY_RELEASE_NOTE --valuefile ./some/file/path

{% include message_box.html type="warning" title="Env var value size limit" content=" Note that env var values set through `envman` are limited to **10KB** by default in an effort to prevent issues with common tools. Different tools have different environment size constraints. For example, `Bash` will start to fail on OS X once the environments set exceed \~120KB (in total, not a single variable). **For larger data**, however, you should use files or other solutions, and use environment variables to point to the file, to the ID, or to the location of the stored data. "%}

## Using exposed Environment Variables

Once the Env Var is exposed, you can use it like any other Env Var. For example, in Bash you can reference the previous environment example as `$MY_RELEASE_NOTE`.

You can use these exposed Env Vars in the inputs of other Steps as well. For example, the `HockeyApp Deploy` Step has a `notes` input field where you can reference the previous example variable.

Insert `$MY_RELEASE_NOTE` into the input like so: `The Release Note: $MY_RELEASE_NOTE`, which will be resolved as `The Release Note: This is the release note` (if you used the first example to set the value of `MY_RELEASE_NOTE`).

Here is another example where we're exposing the release note and then using it in another `Script` and in a `Send a Slack message` Step.

    format_version: 1.1.0
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      example:
        steps:
        - script:
            inputs:
            - content: |
                #!/bin/bash
                envman add --key MY_RELEASE_NOTE --value "This is the release note"
        - script:
            inputs:
            - content: |
                #!/bin/bash
                echo "My Release Note: $MY_RELEASE_NOTE"
        - slack:
            inputs:
            - channel: ...
            - webhook_url: ...
            - message: "Release Note: $MY_RELEASE_NOTE"

## Copying an environment variable to another key

If you want to expose the value of an Env Var to be accessible through another env var key, you can simply expose the value with a new key. For example, if you want to copy the value of the `BITRISE_BUILD_NUMBER_` Env Var and make it available under the Env Var key `MY_BUILD_NUMBER`, you just have to read the current value and expose it under the new key.

To modify the first example here, which exposed a fix value:

      envman add --key MY_RELEASE_NOTE --value "This is the release note"

You can simply reference/read the value of the other Environment Variable in the `envman add ...` command.

To expose the value of `BITRISE_BUILD_NUMBER` under the key `MY_BUILD_NUMBER`:

      envman add --key MY_BUILD_NUMBER --value "${BITRISE_BUILD_NUMBER}"

After this, subsequent Steps can get the value of `BITRISE_BUILD_NUMBER` from the `MY_BUILD_NUMBER` Env Var. If you change the value of `BITRISE_BUILD_NUMBER` after this, the value of `MY_BUILD_NUMBER` won't be modified, it will still hold the original value!

## Overwriting an Environment Variable if another one is set

The best way to overwrite an Env Var is to use a Script Step as described above and check if the custom Env Var is set.

As an example, if you want to overwrite the `PROJECT_SCHEME` env var and an `API_PROJECT_SCHEME` Env Var is set, insert a `Script` Step in the Workflow (can be the first Step) with this content:

    #!/bin/bash
    set -ex
    if [ ! -z "$API_PROJECT_SCHEME" ] ; then
      envman add --key PROJECT_SCHEME --value "$API_PROJECT_SCHEME"
    fi

This script will check whether the `API_PROJECT_SCHEME` Env Var is defined, and if it is, its value will be assigned to the `PROJECT_SCHEME` Environment Variable, overwriting the original value of `PROJECT_SCHEME`.

### Using Workflow Environment Variables

Alternatively, you can set Env Vars for Workflows too. The Env Vars you set for a Workflow will overwrite the Env Var if defined as an app Env Var or [secret env var](/builds/env-vars-secret-env-vars/#about-secrets/).

Here is an example Workflow which defines an Env Var, and then runs another Workflow that can use those Env Vars:

    workflows:
    
      deploy-alpha:
        envs:
        - ENV_TYPE: alpha
        after_run:
        - _deploy
    
      _deploy:
        steps:
        - script:
            inputs:
            - content: |
                #!/bin/bash
                echo "ENV_TYPE: $ENV_TYPE"

If you run the `deploy-alpha` Workflow, that will set the `ENV_TYPE` Env Var to `alpha`, then it will run the `deploy` Workflow, which can use that Env Var. In this example, it will simply print its value (the printed text will be: `ENV_TYPE: alpha`).

{% include banner.html banner_text="Check out your build's Env Vars" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}