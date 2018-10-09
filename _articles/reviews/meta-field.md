---
title: 'Meta field '
date: 2018-10-09 11:04:33 +0000
redirect_from: []
published: false

---
You can create your unique customization for any step input or env var yml if you add `meta` to `opts` in your yml. In this guide, we unveil the secrets of this handy feature by using an env var as our example. 

Our jumping-off point is a standard env var yml which has a `KEY` and an `opts` where `opts` contains `title`, `description` and `summary`.

    KEY: "VALUE",
    opts: {
      title: "My env var"
      description: "Description of my env var, which is long."
      summary: "Summary of env var."
      ...
    }

Now this structure can be expanded by adding the `meta` section right at the end of your `opts` list so that you can customize the env var yml to your own liking. Make sure that `meta` is WITHIN the `opts` section. The format you need to use is the following:

    KEY: "VALUE",
    opts: {
      title: "My env var"
      description: "Description of my env var, which is long."
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

Set a namespace ID to your meta so that the namespace can mark the customized block in your bitrise.yml.editor.  An example:

    meta: {
      my_fancy_new_workflow_editor: {
        env_var_background_color: "red"
      }
    }

Any customization you set in `meta` will only replicate to your own yml.editor as a custom parameter and **will not be present in the standard Workflow Editor**. The reason for this, even though Workflow Editor normally validates the saved variable and throws an error if there is a syntax error, but with `meta` added, its content is fully ignored by the Workflow Editor validation process. 