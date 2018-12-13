---
title: Running your first build
menu:
  bitrise-cli:
    weight: 5

---
To run your Bitrise build you only need two things:

1. The Bitrise CLI - [installation guide](/bitrise-cli/installation/)
1. A build configuration (`bitrise.yml`)

Once you have the Bitrise CLI installed (just run `bitrise setup` to validate
the installation) you just have to create the `bitrise.yml` build configuration,
and you're ready to go!

If you use [bitrise.io](https://www.bitrise.io), you can download your app's `bitrise.yml` right from
[bitrise.io](https://www.bitrise.io), and run the build locally. The `bitrise.yml` can be found
in the Workflow Editor of the app on [bitrise.io](https://www.bitrise.io), under the `bitrise.yml` section.

If you want to create a `bitrise.yml` yourself, simply create a `bitrise.yml` file
in the root of your project. You can use this as the base content of `bitrise.yml`:

```yaml
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
```

To run this build open your Terminal / Command Line, `cd` into the directory where
you saved the `bitrise.yml`, and run: `bitrise run test`.

That's all, you just ran your first build with the Bitrise CLI!

Read on to learn more about how the Bitrise CLI and the `bitrise.yml` configuration works,
you'll be able to compose and run complex builds in no time!