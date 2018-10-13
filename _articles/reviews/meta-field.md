---
title: Customizing Workflow Editor
date: 2018-10-09 11:04:33 +0000
redirect_from: []
published: false

---
You can customize env vars **_only env vars at the moment?_** using `meta` **_section_** without it being checked by Workflow Editor. Workflow Editor always validates the saved variable and throws an error if there is a syntax error, but with `meta` added, its content is fully ignored by the **_Workflow Editor validation process - even if offline?_**. Let's see some use cases when your project can benefit from customization:

1. If you decide to take your spin on our open-source Workflow Editor and fork it to your own repository use it **_offline in a team_**, you can do some customization to the environment variables of an app you are writing there. Add a `meta` section to `opts` to WHAT/Workflow?
2. You can also customize **_env vars on bitrise.io's bitrise.yml_** to manipulate, for example, the background of an env var. Add `meta` to `opts` in  **_bitrise.yml.editor_** to customize how env vars appear on your Workflow Editor. `meta` works like a container that holds any custom properties that is **not by default part** of any Workflow Editor. **_How the rest of Workflow Editor' UI looks is maintained by Bitrise._**

## Adding meta to bitrise.yml

Our jumping-off point is a standard env var yml which has `KEY` and  `opts` where `opts` contains `title`, `description` and `summary`.

    KEY: "VALUE",
    opts: {
      title: "My env var"
      description: "Description of my env var."
      summary: "Summary of env var."
      ...
    }

Now this structure can be expanded by adding the `meta` section right at the end of your `opts` list so that you can customize the env var to your own liking. Make sure that `meta` is WITHIN the `opts` section and set a namespace ID!

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

As you can see above, you can add as many custom settings/properties to your `meta` section as you wish by adding another **_namespace ID_** and key to env vars. As an example, if you wanted to set red background for your env vars in your project, you'd add the following `meta` section to your `opts`.

    meta: {
      my_fancy_new_workflow_editor: {
        env_var_background_color: "red"
      }
    }

As another example, if you wanted to keep an eye on the changed env vars of your project and see when they were last updated, you could add the following `meta` to your env vars `opts` list.

    {
      MY_ENV_VAR: "value"
      opts: {
        title: "My env var"
        description: "Description of my env var."
        meta: {
          my_forked_workflow_editor: {
            last_modified: "2018.10.11.16:16"
          }
        }
      }
    }

## Adding meta to your offline Workflow Editor

Make sure you have [Bitrise CLI installed](/bitrise-cli/installation/) on your local computer.

1. Run `bitrise setup`.
2. `cd` into a directory where you have your bitrise.yml.
3. Run `bitrise :workflow-editor` to add it as a plugin to your installed Bitrise CLI. You should have your app locally on your computer along with the bitrise.yml created. Then you can go ahead and modify its workflow/s as you wish.