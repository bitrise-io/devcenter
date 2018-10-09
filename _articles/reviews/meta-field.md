---
title: Customizing Workflow Editor
date: 2018-10-09 11:04:33 +0000
redirect_from: []
published: false

---
You can create unique customization for a step input or an env var if you add `meta` section to `opts` in your bitrise.yml.editor. `meta` works like a container that holds any custom-specific properties (such as background color or labels above step inputs)  that is **not by default part** of any Workflow Editor. In this guide, we unveil the secrets of this handy feature by using an env var as our example. 

Our jumping-off point is a standard env var yml which has a `KEY` and an `opts` where `opts` contains `title`, `description` and `summary`.

    KEY: "VALUE",
    opts: {
      title: "My env var"
      description: "Description of my env var."
      summary: "Summary of env var."
      ...
    }

Now this structure can be expanded by adding the `meta` section right at the end of your `opts` list so that you can customize the env var yml to your own liking. Make sure that `meta` is WITHIN the `opts` section!

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

As you can see above, you can add as many custom settings/properties to your `meta` section as you wish by adding another namespace ID key and env vars.

Set a namespace ID to your meta so that the namespace can mark the customized section in your bitrise.yml.editor. As an example, if you wanted to set red background for your env vars in your project, you'd add the following `meta` section to your `opts`. 

    meta: {
      my_fancy_new_workflow_editor: {
        env_var_background_color: "red"
      }
    }

Any customization you set in `meta` will only replicate to your own bitrise.yml.editor as a custom parameter and **will not be present in the standard Workflow Editor**. The reason for this is, even though Workflow Editor always validates the saved variable and throws an error if there is a syntax error, but with `meta` added, its content is fully ignored by the Workflow Editor validation process. 