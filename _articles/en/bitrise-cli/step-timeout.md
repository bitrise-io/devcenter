---
changelog:
last_modified_at:
title: Setting a time limit for Steps
tag:
- cli
- steps
description: Ensure that your builds do not exceed the time limit by setting up Step
  timeout for Steps that might cause builds to hang.
redirect_from: []
menu:
  bitrise-cli-main:
    weight: 25

---
Ensure that your builds do not exceed the time limit by setting up Step timeout for Steps that might cause builds to hang.

A Step timeout, defined in seconds, sets a maximum time a Step is allowed to run. If the Step exceeds that limit, the Workflow moves on to the next step. This is useful if, for example, your builds hang for not immediately obvious reasons - you can set timeouts for the Step or Steps which are suspected to have caused the problem.

1. Find the step in the `bitrise.yml` file.

   Don't forget you can edit the `bitrise.yml` file of your project on [bitrise.io](https://www.bitrise.io): open the `Apps` page, select your app, click the `Workflow Editor` tab then click `bitrise.yml`.
2. Add a `timeout` property before the other step inputs.

**Example**:

``` yaml
- xcode-test@1.18.14:
     timeout: 120
     inputs:
     - project_path: "$BITRISE_PROJECT_PATH"
     - scheme: "$BITRISE_SCHEME"
```

And you're done! In our example, the `xcode-test` Step will abort after 120 seconds. Check the build logs to see what caused the Step to exceed the limit.

{% include banner.html banner_text="Now you know everything" url="https://app.bitrise.io/dashboard/builds" button_text="Go to Bitrise now" %}