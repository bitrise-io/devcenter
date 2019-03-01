---
# jp title missing
title: Setting a time limit for steps
menu:
  bitrise-cli:
    weight: 12

---

{% include not_translated_yet.html %}

Ensure that your builds do not exceed the time limit by setting up step timeout for steps that might cause builds to hang.

A step timeout, defined in seconds, sets a maximum time a step is allowed to run. If the step exceeds that limit, the workflow moves on to the next step. This is useful if, for example, your builds hang for not immediately obvious reasons - you can set timeouts for the step or steps which are suspected to have caused the problem.

1. Find the step in the `bitrise.yml` file.

    Don't forget you can edit the `bitrise.yml` file of your project on [bitrise.io](https://www.bitrise.io): open the `Apps` page, select your app, click the `Workflow Editor` tab then click `bitrise.yml`.

1. Add a `timeout` property before the other step inputs.

__Example__:
``` yaml
- xcode-test@1.18.14:
     timeout: 120
     inputs:
     - project_path: "$BITRISE_PROJECT_PATH"
     - scheme: "$BITRISE_SCHEME"
```

And you're done! In our example, the `xcode-test` step will abort after 120 seconds. Check the build logs to see what caused the step to exceed the limit.
