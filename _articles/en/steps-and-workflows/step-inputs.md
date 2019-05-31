---
title: Step versions and inputs
tag:
- steps
- " workflows"
- env vars
summary: You can manually set up what version of a given Step you want to use in your
  builds. You can use different versions in different Workflows.
redirect_from: []
menu:
  steps-workflows-main:
    weight: 5

---
## Managing Step versions

Use any existing version of a Step in your workflows. You can use different versions of the same Step in different workflows. 

We regularly update our Steps to make sure they are fully equipped for our users' needs. However, you don't have to use the latest version if you don't want to: if an old version is stable and compatible with your build, feel free to continue using that, or roll back to it any time.

If a Step has an orange dot next to its name in the Workflow Editor, it indicates you do not have the latest version of that Step in your workflow.

You have two options to modify the version:

* Click on the orange dot to automatically upgrade the Step to the latest version.
* Click on the Step then find the `Version` menu on the right. Open the dropdown menu and select the version you need. If you select `always latest`, the Step will always run the latest version available in our Step library.

![Managing step versions](/img/update-version-1.png)

## Step inputs

Step inputs are the way to configure the Steps for your build. Steps have required inputs that must have a valid value and optional inputs that provide more options to customize your build.

Click on a Step to bring up its input variables on the right of the currently selected workflow. Required inputs are marked as such in the Workflow Editor. **If required inputs do not have valid values, the Step will fail**.

![Adding step input](/img/step-input.png)

Modify a Step input by either:

* clicking into the input field
* clicking the `CHANGE` option next to the input field

You can use environment variables as Step inputs for any Step. But make sure that the environment variable in question has a valid value for the given input.

### Environment variables as Step inputs

You can use environment variables (env vars) as Step inputs. Bitrise automatically exposes certain environment variables in the build, while others can be set manually.

To use an environment variable as input, click into any input field of a Step and a purple `Insert Variable` button will appear.

![Insert variable](/img/env-var.png)

Click this button and you'll get a full list of [available Environment Variables](/builds/available-environment-variables). You can search this list, and when you find the one you're looking for just click it, and it'll be inserted into the input field for you.

Under every Step input field you can see one of these two indicators:

* `Environment Variables will be replaced in input`
* or `Environment Variables won't be replaced in input`

It's the status of the `is_expand` option of the input.
_You can change this only in YAML mode (_`_bitrise.yml_` _tab of the editor)._

What does this option do?

* If **enabled** it'll replace Environment Variables (for example, `$HOME` or `${HOME}`)
  inside the input text with the Environment Variable's value **before** it would be passed to the Step.
* If **disabled** it won't replace anything in the input text, the whole text will be passed to the Step "as-it-is".

**What does this mean?** For example, if you have `$HOME` in the input text
and you enable this option, it'll replace every occurrence of `$HOME` in that input
with the value of the `HOME` environment variable
(in this case, the home folder's path, for example, `/Users/[user]` or `/home/[user]`).
If it's disabled then it won't be replaced,
the value you specify for the input will be passed as text (`$HOME`),
and _the Step itself might or might not expand_ the value.

**Usually you should leave this option on the default value**.

In general you should _not_ change this option, but if you have to,
you can do that in YML mode, by adding `is_expand: true` or `is_expand: false` to the input's `opts` list.

The only reason to change it is if your input includes the `$` character (in a password for example),
and you want to keep the `$` character in the input, instead of
replacing it with an environment variable.

{% include message_box.html type="important" title="Referencing another environment variable" content=" If you want to reference another environment variable, even if that one's value includes the $ character, you have to **enable** this option, or else your reference won't work. In such a case, **disable this option where you specify the value with $ in it**, and enable the option everywhere else where you reference that environment variable."%}