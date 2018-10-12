---
title: Customizing Workflow Editor
date: 2018-10-09 11:04:33 +0000
redirect_from: []
published: false

---
If you decide to take your very own spin on our open-source Workflow Editor and use it **_offline in a team_**, you can do some customization to the environment variables of an app you are writing there. You can add `meta` to `opts` in your **_bitrise.yml.editor_** to customize how env vars appear on your offline Workflow Editor. `meta` works like a container that holds any custom properties  that is **not by default part** of any Workflow Editor.

Our jumping-off point is a standard env var yml which has `KEY` and  `opts` where `opts` contains `title`, `description` and `summary`.

    KEY: "VALUE",
    opts: {
      title: "My env var"
      description: "Description of my env var."
      summary: "Summary of env var."
      ...
    }

Now this structure can be expanded by adding the `meta` section right at the end of your `opts` list so that you can customize the env var yml to your own liking. Make sure that `meta` is WITHIN the `opts` section and set a namespace ID!

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

As you can see above, you can add as many custom settings/properties to your `meta` section as you wish by adding another namespace ID and key to env vars. As an example, if you wanted to set red background for your env vars in your project, you'd add the following `meta` section to your `opts`.

    meta: {
      my_fancy_new_workflow_editor: {
        env_var_background_color: "red"
      }
    }

Workflow Editor always validates the saved variable and throws an error if there is a syntax error, but with `meta` added, its content is fully ignored by the Workflow Editor validation process.