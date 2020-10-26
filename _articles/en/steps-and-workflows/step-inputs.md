---
changelog: 'Read about the new options for version locking: you can lock a Step to
  either a major or a minor version on the GUI of the Workflow Editor. The Step will
  be automatically updated to the release of your selected major or minor version.'
last_modified_at: '2020-04-02'
title: Step versions and inputs
tag:
- steps
- " workflows"
- env vars
description: You can manually set up what version of a given Step you want to use
  in your builds. You can use different versions in different Workflows.
redirect_from: []
summary: ''
menu:
  steps-workflows-main:
    weight: 5

---
## Managing Step versions

Bitrise Step versions follow semantic versioning: a version number looks like MAJOR.MINOR.PATCH. For example, version 3.2.1 is the first patch of the second minor version of the third major version.

You can use any existing version of a Step in your Workflows, and different versions of the same Step in different Workflows.

### Locking a Step to a major or minor version

On the graphical UI of the Workflow Editor, you can choose between locking a Step to either a major version or a minor version in any of your Workflows. This determines what version of the Step your Workflow will use.

Locking a Step to a version means that your Workflow is automatically updated to use the latest release of the Step’s selected version type, either major or minor, but it won’t get updated if a different major or minor version is released.

* If a Step is locked to a major version, it is automatically updated if a new minor version or a new patch for that major version is released. If a new major version is released, it won’t be updated.
* If a Step is locked to a minor version, it is automatically updated only if a new patch for that minor version is released. If a new minor or major version is released, it won’t be updated.

Let's see an example!

{% include message_box.html type="example" title="Version locking example" content="The Example Step’s current version in the Workflow is 2.3.3. A new minor version comes out: 2.4.0.

* If the Step is locked to major version 2.x.x, the Step is updated to 2.4.0.
* If the Step is locked to minor version 2.3.x, the Step is NOT updated to 2.4.0.

Now let’s say the Example Step gets a new major version: 3.0.0!

In that case, the Step will not be automatically updated either way. If you want to use the new version, you need to lock the Step to either major version 3.x.x or minor version 3.0.x. This way you can be sure that a new update will not break your builds. "%}

To lock a Step to a major or minor version:

1. Open your app’s page on [bitrise.io](http://bitrise.io).
2. Go to the **Workflows** tab to open the Workflow Editor.
3. Select the Workflow in which you want to modify the Step.
4. Click the Step.
5. Next to the name of the current version, open the dropdown menu.

   ![{{ page.title }}](/img/Bitrise_Workflow_editor-1.png)
6. Select the major or minor version you need: for example, 3.x.x sets it to the third major version.

We regularly update our Steps to make sure they are fully equipped for our users’ needs. However, you don’t have to use the latest version if you don’t want to: if an old version is stable and compatible with your build, feel free to continue using that, or roll back to it any time.

### Using a specific Step version

You have the option of using a specific, static Step version. For example, version 3.2.2. This means that no matter what new versions are released for the Step, your Step version will not be updated in the Workflow.

{% include message_box.html type="warning" title="YAML mode only!" content="Please note that you cannot set a specific Step version on the graphical UI: you can only lock the Step to either a major or minor version. Setting a specific Step version is only possible in YAML mode."%}

To set a specific Step version, you need to add that version to the Step reference in your app’s bitrise.yml file:

1. Open your app’s page on [bitrise.io](http://bitrise.io).
2. Go to the **Workflows** tab to open the Workflow Editor.
3. Go to the **bitrise.yml** tab.
4. Find the Workflow and the Step you need.
5. Set the Step version as part of the Step reference:

   workflows:
   primary:
   steps:
   \- activate-ssh-key@4.0.3:

### Using the latest available version of the Step

Locking on to the latest release of a Step means that if a new version of the Step is released, the user's Workflow is updated to use that. This includes automatic update to a new major version, potentially breaking the build. So be careful!

{% include message_box.html type="warning" title="YAML mode only!" content="Please note that you cannot set a specific Step version on the graphical UI: you can only lock the Step to either a major or minor version. Setting a specific Step version is only possible in YAML mode."%}

To make sure your Workflow will always use the latest available version of a given Step, all you have to do is remove any version information from the Step reference in the bitrise.yml file of your app:

1. Open your app’s page on [bitrise.io](http://bitrise.io).
2. Go to the **Workflows** tab to open the Workflow Editor.
3. Go to the **bitrise.yml** tab.
4. Find the Workflow and the Step you need.
5. Make sure the Step has no version information:

   workflows:
   primary:
   steps:
   \- activate-ssh-key:

## Step inputs

Step inputs are the way to configure the Steps for your build. Steps have required inputs that must have a valid value and optional inputs that provide more options to customize your build.

Click on a Step to bring up its input variables on the right of the currently selected workflow. Required inputs are marked as such in the Workflow Editor. If required inputs do not have valid values, the Step will FAIL.

![Adding step input](/img/step-input.png)

Modify a Step input by either:

* Clicking into the input field.
* Clicking the **CHANGE** option next to the input field.

You can use environment variables as Step inputs for any Step. But make sure that the environment variable in question has a valid value for the given input.

### Environment variables as Step inputs

You can use environment variables (env vars) as Step inputs. Bitrise automatically exposes certain environment variables in the build, while others can be set manually.

To use an environment variable as input, click into any input field of a Step and a purple **Insert Variable** button will appear.

![Insert variable](/img/env-var.png)

Click this button and you'll get a full list of [available Environment Variables](/builds/available-environment-variables). You can search this list, and when you find the one you're looking for just click it, and it'll be inserted into the input field for you.

Under every Step input field you can see one of these two indicators:

* **Environment Variables will be replaced in input**,
* or **Environment Variables won't be replaced in input**.

It's the status of the `is_expand` option of the input.
You can change this only in YAML mode (**bitrise.yml** tab of the Workflow Editor).

What does this option do?

* If enabled, it'll replace Environment Variables (for example, `$HOME` or `${HOME}`)
  inside the input text with the Environment Variable's value before it would be passed to the Step.
* If disabled, it won't replace anything in the input text, the whole text will be passed to the Step as it is.

What does this mean? For example, if you have `$HOME` in the input text
and you enable this option, it'll replace every occurrence of `$HOME` in that input
with the value of the `HOME` environment variable
(in this case, the home folder's path, for example, `/Users/[user]` or `/home/[user]`).
If it's disabled then it won't be replaced,
the value you specify for the input will be passed as text (`$HOME`),
and the Step itself might or might not expand the value.

Usually you should leave this option on the default value.

In general, you should not change this option, but if you have to,
you can do that in YML mode, by adding `is_expand: true` or `is_expand: false` to the input's `opts` list.

The only reason to change it is if your input includes the `$` character (in a password for example),
and you want to keep the `$` character in the input, instead of
replacing it with an environment variable.

{% include message_box.html type="important" title="Referencing another environment variable" content=" If you want to reference another environment variable, even if that one's value includes the $ character, you have to enable this option, or else your reference won't work. In such a case, disable this option where you specify the value with `$` in it, and enable the option everywhere else where you reference that Environment Variable."%}

{% include banner.html banner_text="Let's manage Steps in your build!" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your build" %}