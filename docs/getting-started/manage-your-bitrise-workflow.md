To start editing your workflow you first have to open it
in the **Workflow Editor** on Bitrise.io:

1. Open your App's page on [Bitrise.io](https://www.bitrise.io/)
2. Select the `Workflow` tab

This is your app's __Workflow Editor__. You can change, delete and add steps here.

## Change a step

Select the step here (in the Workflow Editor), on the left side.
You can change the selected Step's inputs and other configs on the right side.

!!! note
    Steps are executed top-to-bottom, you can reorder them with __Drag and Drop__.


## Upgrade a Step to the latest version

When a new version is available for a Step in your Workflow,
you can update the Step to the new version by selecting the Step in the Workflow Editor and

1. Click the orange "update indicator" icon, to upgrade the Step to the latest available version
1. Or select the new version manually, on the right side, where you can see the step's details (`Version` section).

_Your settings / provided input values for the Step will be kept for the new version, and you can
also discard the change, by clicking the `Discard` button on the left side._


## Remove a step

Select the step on the left side and click on the **trash can** button on the right side.

## Add a new step

Click on the `+` sign at the left side to add or insert a new step.

Once you clicked the `+` sign you'll see a list of available steps on the right side.
You can select a filter (ex: `deploy`) to show only a group of the available steps.

Once you selected the step you want to add, just click on the **Add to Workflow** button.
The new step will be selected automatically,
and all you have to do is fill in its required inputs
(on the right side you'll see which inputs are required - marked with an orange border).

## Create a new Workflow

To create a new Workflow just click on the `+` sign __at the top, where your workflows are listed.__


!!! note "You can create as many workflows for an app as you like."
    Using multiple workflows can be beneficial in case you want to do different
    things based on which *branch* you push new code.
    To see how you can control what event should *trigger*
    which *workflow*, see: [Control what to build when, with the Trigger Map](/webhooks/trigger-map/)

New workflows are created as a copy of the active workflow when you click the `+` button.

__You can delete the current active workflow__ with the orange `Delete` button
at the top right corner of the workflow area.

## Step inputs

### Inserting Environment Variables into Step inputs

Click into any input field of a Step and a green `Insert Variable` button will appear.
Click this button and you'll get a full list of available Environment Variables.
You can search in this list, and when you find the one you're looking for just click it,
and it'll be inserted into the input field for you.


### Environment Variable replace mode

Under every Step input field you can see one of these two indicators:

- `Environment Variables will be replaced in input`
- or `Environment Variables won't be replaced in input`

It's the status of the `is_expand` option of the input.
*You can change this only through in YAML mode (`bitrise.yml` mode of the editor - left side).*

What does this option do?

* If **enabled** it'll replace Environment Variables (e.g. `$HOME` or `${HOME}`)
  inside the input text with the Environment Variable's value **before** it would be passed to the Step.
* If **disabled** it won't replace anything in the input text, the whole text will be passed to the Step "as-it-is".

**What does this mean?** For example, if you have `$HOME` in the input text
and you enable this option, it'll replace every occurrence of `$HOME` in that input
with the value of the `HOME` environment variable
(in this case, the home folder's path, e.g. `/Users/[user]` or `/home/[user]`).
If it's disabled then it won't be replaced,
the value you specify for the input will be passed as the text `$HOME`,
and *the Step itself might or might not expand* the value.

__Usually you should leave this option on the default value, the one defined by the Step for the input__.

In general you should *not* change this option, but if you have to,
you can do that in YML mode, by adding `is_expand: true` or `is_expand: false` to the input's `opts` list. Example:

```
- some_input: My Value
  opts:
    is_expand: false
```

#### A practical example / guideline

As a general guideline, this option should almost always be **enabled**,
unless you have a specific reason to disable it.

**What can be a reason to disable it?** There's pretty much only a single reason:
if your input includes the `$` character (in a password for example),
and you want to keep the `$` character in the input, instead of
replacing it with an environment variable.

If you have this expand option enabled and you have a password like `pas$word`
it'll most likely result in `pas` after the value expansion,
because there's no `$word` environment variable available (unless you defined it somewhere).
There might be other cases when you explicitly want to include the `$` character in the input,
in these cases you should disable the expand option.

*__Note__: if you want to reference another environment variable,
even if that one's value includes the `$` character, you have to **enable** this option,
or else your reference won't work.
__In a case like this you should disable this option where you specify the value__ with `$` in it,
and enable the option everywhere else, where you reference that environment variable.*
