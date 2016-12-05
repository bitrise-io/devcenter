You can expose Environment Variables from one Step,
to make it available for every other Step performed after the Step during the build.
An example might be that you want to generate a
release note which you want to use in a message or deploy step.
Exposing environment variables is really easy,
you just have to use [envman](https://github.com/bitrise-io/envman/) if you want to make it available for every other Step.

A very simple example might be:

```
envman add --key MY_RELEASE_NOTE --value "This is the release note"
```

You can call `envman` in any Step, including a script step,
or even in your own script (stored in your repository) if you call it from a `bitrise` build.

Envman can be used in a couple of ways.
You can specify the value as the `--value` parameter (you can see this in the previous example),
pipe the value:

```
echo 'hi' | envman add --key MY_RELEASE_NOTE
```

or read the value from a file:

```
envman add --key MY_RELEASE_NOTE --valuefile ./some/file/path
```

*You can read more about how `envman` can
be used on it's [GitHub page](https://github.com/bitrise-io/envman/).*

!!! warning "Env Var value size limit"
    Environment Variable values set through `envman` are limited to 10KB by default.
    This is done in order to prevent issues with common tools.
    Different tools have different environment size constraints,
    e.g. `Bash` will start to fail on OS X once the environments set
    exceed ~120KB (**in total, not a single variable!**).

    For larger data you should use files or other solutions,
    and use environment variables to point to the file / to the
    ID or location of where the data is stored.

Once the environment variable is exposed you can use it like
any other environment variable. In `bash` you can reference
the previous example environment as: `$MY_RELEASE_NOTE`.

You can of course use these exposed environment variables in the inputs of other Steps.
For example the **HockeyApp Deploy** step has a `notes` input,
you can reference the previous example variable by inserting `$MY_RELEASE_NOTE` into the input,
like: `The Release Note: $MY_RELEASE_NOTE`,
which will be resolved as `The Release Note: This is the release note` (if you used
the first example to set the value of `MY_RELEASE_NOTE`).

A simple example, exposing the release note and then using it in another `Script step`,
and in a `Slack step`:

```
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
        - message: "Release Notes: $MY_RELEASE_NOTE"
```


## Copy an environment variable to another key

If you want to expose the value of an environment variable to be accessible
through another environment variable key, you can simply expose the value with a new key.

For example, if you want to copy the value of the `BITRISE_BUILD_NUMBER` environment variable
and make it available under the environment variable key `MY_BUILD_NUMBER`, you just have to
read the current value and expose it under the new key.

To modify the first example here, which exposed a fix value:

```
envman add --key MY_RELEASE_NOTE --value "This is the release note"
```

simply reference/read the value of the other environment variable in the `envman add ...` command.

To expose the value of `BITRISE_BUILD_NUMBER` under the key `MY_BUILD_NUMBER`:

```
envman add --key MY_BUILD_NUMBER --value "${BITRISE_BUILD_NUMBER}"
```

After this, subsequent steps can get the value of `BITRISE_BUILD_NUMBER` from the
`MY_BUILD_NUMBER` environment variable.

_Note: if you change the value of `BITRISE_BUILD_NUMBER` after this, the
value of `MY_BUILD_NUMBER` won't be modified, that will still hold the original value!_


## Overwrite an Environment Variable if another one is set

E.g. if a custom environment variable is set through the Build Trigger API.

The best way to do this, to make sure that no matter what, you overwrite the other env var,
is to use a Script step, as described above, and check whether the custom env var is set.

As an example, if you want to overwrite the `PROJECT_SCHEME` environment variable,
if, let's say, a `API_PROJECT_SCHEME` env var is set, just drop in a `Script` step (can be the very first one
in the workflow), with the content:

```
#!/bin/bash
set -ex
if [ ! -z "$API_PROJECT_SCHEME" ] ; then
  envman add --key PROJECT_SCHEME --value "$API_PROJECT_SCHEME"
fi
```

This script will check whether the `API_PROJECT_SCHEME` env var is defined,
and if it is, then its value will be assigned to the `PROJECT_SCHEME` environment variable,
overwriting the original value of `PROJECT_SCHEME`.


### Alternative solution: use Workflow Env Vars

Alternatively you can set environment variables for Workflows too.
The Env Vars you set for a workflow will overwrite the env var
if defined as an App Env Var or Secret Env Var.

An example workflow which defined an environment variable, and then runs another workflow
which can use those env vars:

```
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
```

If you run the `deploy-alpha` workflow, that will set the `ENV_TYPE` env var to `alpha`,
then it will run the `_deploy` workflow, which can use that environment variable -
in this example it will simply print its value (the printed text will be: `ENV_TYPE: alpha`).
