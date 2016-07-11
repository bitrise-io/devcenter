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
