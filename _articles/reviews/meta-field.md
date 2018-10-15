---
title: Customizing Workflow Editor
date: 2018-10-09 11:04:33 +0000
redirect_from: []
published: false

---
Any tool, that can edit bitrise.yml, you can use to place custom information/properties to bitrise.yml it being checked by Workflow Editor. Workflow Editor always validates the saved variable and throws an error if there is a syntax error, but with `meta` added, its content is fully ignored by the Workflow Editor validation process. Let's see some use cases when your project can benefit from customization:

1. If you decide to take your own spin on our [open-source Workflow Editor](https://github.com/bitrise-io/bitrise-workflow-editor) and create your own version of it, you can use it **_offline in a team_** (for example, by adding it to your website) **_after having forked it,_** you can do some customization to the environment variables in the `bitrise.yml` tab.  Let's say you want to keep an eye on one of the env vars and when it was last modified and by who, you can place the following meta section to `bitrise.yml` in your own version of Workflow Editor.

       app:
         envs:
         - ASXaS: "`ZX`ZX"
           opts:
             is_expand: false
             meta:
               audit: # used by the Audited Workflow Editor imagenary tool, that works like WFE but saves the modifier and modification date, and displays it
                 last_modified_at: 2018.09.12.
                 last_modifier: Jane Doe

   It will save when `audit` env var was last modified (`last_modified_at`) and by who (`last_modifier`). Of course, this use case works only if your customized tool is shared with your team in your company's intranet or by a software.

   Another use case with meta can be if you want to highlight an env var in your own tool: 

       meta: {
         my_fancy_new_workflow_editor: {
           env_var_background_color: "red"
         }
       }

## Adding meta to bitrise.yml

Our jumping-off point is a standard env var yml which has `KEY` and  `opts` where `opts` contains `title`, `description` and `summary`.

    KEY: "VALUE",
    opts: {
      title: "My env var"
      description: "Description of my env var."
      summary: "Summary of env var."
      ...
    }

Now this structure can be expanded by adding the `meta` section right at the end of your `opts` list so that you can customize the env var to your own liking. Make sure that `meta` is WITHIN the `opts` section and set with a namespace ID!

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