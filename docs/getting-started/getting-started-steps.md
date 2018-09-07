Steps represent a block of script execution with predefined input and output variables. [Read more about Steps in the Bitrise CLI section](/bitrise-cli/steps).

Steps can be managed directly from the [Workflow Editor](/getting-started/getting-started-workflows). In the Workflow Editor, you can:

- Add and remove Steps in workflows
- Rearrange the order of Steps in any workflow
- Specify the version of the Step you wish to run in a given workflow
- Specify the inputs of the Steps you need
- Set a Step to run only if the previous Step succeeded.

### Add a new step

You can add any Step to your workflow - there are absolutely no restrictions. Please note that this means that it's possible to add a Step specific to, for example, iOS apps to a workflow of an Android app. Always make sure you only add the relevant Steps to your workflow!

1. Open your app by clicking on the app's name on your [`Dashboard`](https://app.bitrise.io/dashboard).

1. Click the `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.

1. Select the workflow you need in the `WORKFLOW` dropdown menu on the top left.  

1. Click the `+` symbol between two Steps to insert a Step at that position.

![Add step button in Workflow Editor](/img/getting-started/add-your-first-step.png)

This will show you a list of available Steps in our __Step Library__.
You can search and filter these steps: enter a search expression in the `Search steps` field and set the platform on the right of the field. Note that by default, you will only see the Steps that are relevant to the platform of your project: click `ALL` to search within all the available Steps.

Clicking the Step will add it to the selected workflow. Don't forget to save the workflow when you are done!

!!! note "Cloning steps"
    You can also clone a Step by clicking the __Clone icon__ on the right side and then you can __Drag and Drop__ it to its place.

### Remove a step

1. Open your app by clicking on the app's name on your [`Dashboard`](https://app.bitrise.io/dashboard).

1. Click the `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.

1. Select the workflow you need in the `WORKFLOW` dropdown menu on the top left.

1. Click the Step you want to remove.

1. Click the trash bin icon on the right.

1. Click Save.

### Managing Step versions

If a Step has an orange dot on it, it indicates you do not have the latest version of that Step in your workflow. You have two options to modify the version:

- Clicking the orange dot automatically upgrades the Step to the latest version.

- Click on the Step then find the `Version` menu on the right. Open the dropdown menu and select the version you need. If you select `always latest`, the Step will always run the latest version available in our Step library.

![Update steps in Workflow Editor](/img/getting-started/update-steps.png)

### Step inputs

Click on a Step to bring up its input variables on the right of the currently selected workflow. Steps have required and optional inputs: required inputs are marked as such in the Workflow Editor. __If required inputs do not have valid values, the step will fail__.

![Required input](/img/getting-started/step-inputs.png)

Modify a Step input by either:

- clicking into the input field
- clicking the `CHANGE` option next to the input field

You can use environment variables as Step inputs for any Step. But make sure that the environment variable in question has a valid value for the given input.

### Environment variables as Step inputs

Click into any input field of a Step and a green `Insert Variable` button will appear.

![Insert variable](/img/getting-started/insert-variable.png)

Click this button and you'll get a full list of [available Environment Variables](/builds/available-environment-variables). You can search this list, and when you find the one you're looking for just click it, and it'll be inserted into the input field for you.

Under every Step input field you can see one of these two indicators:

- `Environment Variables will be replaced in input`
- or `Environment Variables won't be replaced in input`

It's the status of the `is_expand` option of the input.
*You can change this only in YAML mode (`bitrise.yml` tab of the editor).*

What does this option do?

* If **enabled** it'll replace Environment Variables (e.g. `$HOME` or `${HOME}`)
  inside the input text with the Environment Variable's value **before** it would be passed to the Step.
* If **disabled** it won't replace anything in the input text, the whole text will be passed to the Step "as-it-is".

**What does this mean?** For example, if you have `$HOME` in the input text
and you enable this option, it'll replace every occurrence of `$HOME` in that input
with the value of the `HOME` environment variable
(in this case, the home folder's path, for example, `/Users/[user]` or `/home/[user]`).
If it's disabled then it won't be replaced,
the value you specify for the input will be passed as text (`$HOME`),
and *the Step itself might or might not expand* the value.

__Usually you should leave this option on the default value__.

In general you should *not* change this option, but if you have to,
you can do that in YML mode, by adding `is_expand: true` or `is_expand: false` to the input's `opts` list.

The only reason to change it is if your input includes the `$` character (in a password for example),
and you want to keep the `$` character in the input, instead of
replacing it with an environment variable.

!!! note
    If you want to reference another environment variable, even if that one's value includes the $ character, you have to __enable__ this option, or else your reference won't work. In such a case, __disable this option where you specify the value with $ in it__, and enable the option everywhere else where you reference that environment variable.

### Skipping Steps

There is no point in running, for example, a unit test Step if the previous Step failed to build your app. Therefore, you can easily tell Bitrise to not even try: set up any Step to be skipped if the previous Step failed.

Of course, there are examples when it's better to run a Step even if the previous Step failed. For example, if the `Bitrise.io Cache:Pull` Step fails, there is no reason not to run the next Step - in fact, if the next Step is one that installs dependencies then it's a very bad idea to skip that Step if pulling the cache is unsuccessful.

This guide walks you through on how to skip a given Step that has been set to run even if the previous Step failed.

1. Open your app by clicking on the app's name on your [`Dashboard`](https://app.bitrise.io/dashboard).

1. Click the `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.

1. Select the workflow you need in the `WORKFLOW` dropdown menu on the top left.

1. Click the Step you want to skip.

1. On the right, use the toggle to disable the `Run if previous Step failed` option.

    ![Run if previous failed](/img/getting-started/run-if-failed.png)
