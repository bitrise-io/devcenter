---
# jp title missing
title: Customizing bitrise.yml
date: 2018-10-31 09:27:26 +0000
redirect_from: []
menu:
  bitrise-cli:
    weight: 13

---

{% include not_translated_yet.html %}

Any tool that can edit `bitrise.yml` can add custom properties to it. This way you can add special properties or notes to your env vars, or even try new configurations of your workflow in `bitrise.yml`. All  you have to add is add a  `meta` field and a namespace label with key and value to the right place.

The format you should use is the following:

    KEY: "VALUE",
    opts: {
      title: "My env var"
      description: "Description of my env var."
      summary: "Summary of env var."
      ...
      meta: {
        custom_namespace_id_1: {
          key1: "value1",
          key2: "value2",
          ...
        }
        custom_namespace_id_2: {
          ...
        }
    }

Let's see some use cases when you would benefit from customizing `bitrise.yml` to your own liking:

* If you decide to take your spin on our [open-source Workflow Editor](https://github.com/bitrise-io/bitrise-workflow-editor) and create your own version of it, first you have to fork it! Then you can use it (for example, by adding it to your website) and customize the environment variables (env vars) in the `bitrise.yml` tab. Let's say you want to keep an eye on one of the env vars: when it was last modified and by who. You can place the following `meta` section in `bitrise.yml` to your own version of Workflow Editor.

       app:
         envs:
         - ASXaS: "`ZX`ZX"
           opts:
             is_expand: false
             meta:
               audit: # used by the Audited Workflow Editor imagenary tool, that works like WFE but saves the modifier and modification date, and displays it
                 last_modified_at: 2018.09.12.
                 last_modifier: Jane Doe

Of course this use case works only if your customized tool is shared with your team in your company's own intranet or if it's handled by some software.

* Another use case with `meta` can be if you want to add background color to an env var in your own tool:

       meta: {
         my_fancy_new_workflow_editor: {
           env_var_background_color: "red"
         }
       }
* You can see `meta` in action on [bitrise.io](https://www.bitrise.io/) as well. For example, when you select a different stack for your workflow than the default stack. Just click Workflow Editor on the UI and pick another stack type for your workflow/s in the `Stacks` tab. This way you can test (only in the UI) how your workflow runs in the new Stack.

![](/img/stack-os.png)

If you head back to the `bitrise.yml` tab, a `bitrise.io meta` is added to the deploy workflow:

    {% raw %}
    workflows:
      deploy:
        steps:
        - activate-ssh-key@4.0.3:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - script@1.1.5:
            title: Do anything with Script step
        - npm@0.9.1:
            inputs:
            - command: install
        - install-missing-android-tools@2.2.0:
            inputs:
            - gradlew_path: "$PROJECT_LOCATION/gradlew"
        - android-build@0.9.5:
            inputs:
            - project_location: "$PROJECT_LOCATION"
            - module: "$MODULE"
            - variant: "$BUILD_VARIANT"
        - certificate-and-profile-installer@1.10.1: {}
        - xcode-archive@2.4.14:
            inputs:
            - project_path: "$BITRISE_PROJECT_PATH"
            - scheme: "$BITRISE_SCHEME"
            - export_method: "$BITRISE_EXPORT_METHOD"
            - configuration: Release
        - deploy-to-bitrise-io@1.3.15: {}
        meta:
          bitrise.io:
            stack: osx-xcode-10.1.x
    {% endraw %}

Since this meta is only interpreted on [bitrise.io](https://www.bitrise.io/) and not locally or on Bitrise CLI, it is categorized by a `bitrise.io` namespace (where the stack is the key and `linux-docker-android-lts` is the value). Workflow Editor always validates the saved variable and throws an error if there is a syntax error, but with `meta` added, its content is fully ignored by the Workflow Editor validation process.
