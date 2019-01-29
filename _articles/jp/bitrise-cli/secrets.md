---
# jp title missing
title: Secrets
menu:
  bitrise-cli:
    weight: 14

---

{% include not_translated_yet.html %}

Secrets can be accessed and used in a similar way as App Env Vars,
the main difference is that **secrets are not stored as part of the build configuration**.

When you run a build locally, with the Bitrise CLI, the secrets are read from
a `.bitrise.secrets.yml` file, which is expected to be in the same directory
where the `bitrise.yml` is, and where you run the `bitrise run` command.

If you want to store your secrets somewhere else, you can specify
the location of the secrets file with the `--inventory` flag of the `bitrise run` command,
e.g. `bitrise run my-workflow --inventory /path/to/secrets.yml`.

{% include message_box.html type="warning" title="Make sure to `gitignore` your secrets file" content="
As a best practice, you should always make sure that the `.bitrise.secrets.yml` is added to your `.gitignore`, so that it will never be committed into your repository! The best is if you `gitignore` everything that starts with `.bitrise`, which can be done by adding the line: `.bitrise*` to your `.gitignore` file. "%}

The format of the secrets YAML file is really simple. It has to include
a root `envs:` item and then the list of environment variables.

Example:

```yaml
envs:
- SECRET_ENV_ONE: first secret value
- SECRET_ENV_TWO: second secret value
```

The environment variables defined in the secrets file can be used
just like any other environment variable, so, if you save the above
example into a `.bitrise.secrets.yml` file, and you have a `bitrise.yml`
file in the same directory with the content:

```yaml
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script@1.1.3:
        inputs:
        - content: |
            #!/bin/bash
            echo "SECRET_ENV_ONE: ${SECRET_ENV_ONE}"
            echo "SECRET_ENV_TWO: ${SECRET_ENV_TWO}"
```

You can just `bitrise run test` in the directory, and you'll see that the Script
step will print the values specified in the secrets file:

    ...
    +------------------------------------------------------------------------------+
    | (0) script@1.1.3                                                             |
    +------------------------------------------------------------------------------+
    | id: script                                                                   |
    | version: 1.1.3                                                               |
    | collection: https://github.com/bitrise-io/bitrise-steplib.git                |
    | toolkit: bash                                                                |
    | time: 2016-12-08T18:45:19+01:00                                              |
    +------------------------------------------------------------------------------+
    |                                                                              |
    SECRET_ENV_ONE: first secret value
    SECRET_ENV_TWO: second secret value
    |                                                                              |
    +---+---------------------------------------------------------------+----------+
    | ✓ | script@1.1.3                                                  | 0.32 sec |
    +---+---------------------------------------------------------------+----------+
    ...

As Secrets are the first environment variables processed when you execute
a `bitrise run` command, you can use the environment variables everywhere in
your `bitrise.yml`, for example in `App Env Vars` (`app: envs:` in the [bitrise.yml](/bitrise-cli/basics-of-bitrise-yml/)),
[Workflow environment variables](/bitrise-cli/workflows/#define-workflow-specific-parameters-environment-variables)
and Step inputs too.

## Secret filtering with Bitrise CLI

Bitrise CLI automatically filters your secret env vars and prints `[REDACTED]` with newlines after the key so that the secret env vars are NOT VISIBLE in the build log. This applies to both **private and public apps**.

{% include message_box.html type="warning" title="Build configuration custom env vars are exposed" content="
You can specify an env var you wish to overwrite in your workflow if you click `Start/Schedule a Build` for your build   and select the `Advanced` option in the `Build configuration` pop-up window. Note that any env var you set in `Custom Environment Variables (optional)` section **will not be handled as secret env vars** hence they'll be will be visible in the build logs! You can also check them in `Build parameters` if you click `More details` on your build's page! "%}

For more information on secrets, check out our [Secrets and Env Vars](/builds/env-vars-secret-env-vars/) section.
