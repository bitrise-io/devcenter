---
title: Running your first build - draft
redirect_from: []
tag: []
summary: ''
published: false

---
To run a Bitrise build locally, you need two things:

1. The Bitrise CLI - here's our [installation guide](/bitrise-cli/installation/).
2. A build configuration: that is, a `bitrise.yml` file. Read more about it [in our guide](https://devcenter.bitrise.io/bitrise-cli/basics-of-bitrise-yml/).

If you use [bitrise.io](https://www.bitrise.io), you can download your app's `bitrise.yml` from there: open the Workflow Editor of the app on [bitrise.io](https://www.bitrise.io), under the `bitrise.yml` section.

If you want to create a `bitrise.yml` yourself, simply create a `bitrise.yml` file in the root of your project. You can use this as the base content of the `bitrise.yml`:

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    app:
      envs:
      - MY_NAME: My Name
    
    workflows:
      test:
        steps:
        - script@1.1.3:
            inputs:
            - content: echo "Hello ${MY_NAME}!"

This defines an Environment Variable with your name and a workflow called `test`. Now let's see how to run this build!

1. Open the Terminal or some other Command Line Interface app.
2. Go to the directory where you saved the `bitrise.yml` file.
3. Run `bitrise run` with the name of the workflow you defined in the file.

       bitrise run test

That's it! Your first build is running with the Bitrise CLI!