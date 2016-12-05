## Every input, output and parameter is an Environment Variable

Every step input, step output, secret environment variable, app environment variable and workflow environment variable
(basically every input and variable in your build config) is an environment variable.

There's nothing special about how Bitrise handles environment variables,
__these are regular environment variable, with the same rules and restrictions as any other environment variable.__

To highlight a couple of technical details:

### The value of an Environment Variable can only be a String

Environment Variables can only hold `String` values. Even if you set a number or bool, like `1` or `true` as
the value of the Environment Variable, that will be a string.

### Parent process can't access  Environment Variables exposed by child processes

Parent process(es) can't access Environment Variables exposed by child processes.

For example, if you run a `my_bash_script.sh` in your Terminal with `bash my_bash_script.sh`,
and `my_bash_script.sh` sets an environment variable with `export MY_VAR=the-value`,
you won't be able to access `MY_VAR` in your Terminal after the script is finished,
`MY_VAR` will only be available in `my_bash_script.sh` __and__ in the processes / scripts
started by `my_bash_script.sh`.

In terms of Bitrise CLI this means that if you `export MY_VAR=...` in a Script step,
`MY_VAR` won't be available in subsequent steps. This is true for the steps too,
regardless of which language the step is written in.

Bitrise CLI includes a mechanism for exposing environment variables from Steps
so that subsequent Steps can also access it, through the Bitrise CLI tool
called [envman](https://github.com/bitrise-io/envman).

To set an environment variable in your script or in your step to make that
available in other steps too, you have to do that through `envman`.

A simple example:

```
envman add --key MY_TEST_ENV_KEY --value 'test value for test key'
```

You can find more examples in [envman's README](https://github.com/bitrise-io/envman),
and in the [Expose an Environment Variable and use it in another Step](/tips-and-tricks/expose-environment-variable) guide.


## Priority of inputs / environment variables

WIP
