
## Step reference

A step reference from the example `bitrise.yml` above:

```
- script@1.1.3:
```

1. the StepLib source
1. the Step ID
1. the Step Version

Step reference format: `- StepLibSource::StepID@StepVersion:`

__From the three components only Step ID is required (e.g. `- script:`).__
This example item could alternatively be written as `- https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:`,
to include all three components of the step reference.

If the Version is not defined, the latest version of the step will be used.

If the StepLib Source is not defined, the `default_step_lib_source` will be used.

So, if `default_step_lib_source` is set to `https://github.com/bitrise-io/bitrise-steplib.git`,
and the latest version of the Script step is `1.1.3`, all the following references
will mean the exact same thing:

- `- https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:`
- `- script@1.1.3:`
- `- https://github.com/bitrise-io/bitrise-steplib.git::script:`
- `- script:`

But, if a new version of the `script` step is released (e.g. `2.0.0`)
and you don't include the `@1.1.3` version reference component,
new builds will use the "latest version at the time".
For this reason, it's usually a good idea to specify the version of the step,
so that your build does not break accidentally when a breaking change
is introduced in a new version of the step.
