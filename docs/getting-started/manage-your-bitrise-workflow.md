To start editing your workflow you first have to open it
in the **Workflow Editor** on Bitrise.io:

1. Log in on [Bitrise.io](https://www.bitrise.io/) and select your app on the Dashboard
2. Select the `Workflow` tab

This is your app's __Workflow Editor__. You can change, delete, add and reorder steps here. Don't forget to `Save` or you can `Discard` changes on the top right._

## Change a step

Select the step you want to change from the list on the left side.
You can change the selected Step's inputs and other configs on the right side.

!!! note
    Steps are executed top-to-bottom, you can reorder them with __Drag and Drop__.


## Upgrade a Step to the latest version

When a new version is available for a Step in your Workflow, you can update it in two ways: 

1. Click the orange dot, our update indicator in the top right of the Step's icon to upgrade the Step to the latest available version
1. Or select the Step and in the right side's `Version` section update to the new version manually.

In the dropdown you can set a Step to __always latest__. In this case we'll always update it without further notice.

_Your settings / provided input values for the Step will be kept for the new version._

![Update steps in Workflow Editor](/img/getting-started/update-steps.png)


## Remove a step

Select the step on the left side and click on the **trash can** on the right side or delete it at the bottom of the step.

## Add a new step

If you want to **add a new Step** to the Workflow,
just click the `+` between the Steps you want the new one to be.

![Add step button in Workflow Editor](/img/getting-started/add-your-first-step.png)

This will show you a list of available Steps in our __Step Library__.
You can search and filter these steps if you want to, or just browse through the collection.
Clicking the Step will add it to your Workflow and then all you have to do is fill in its required inputs
(on the right side you'll see which inputs are required - marked with an orange border).

You can also clone a Step by clicking the __Clone icon__ on the right side and then you can __Drag and Drop__ it to its place. 


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
You can search this list, and when you find the one you're looking for just click it,
and it'll be inserted into the input field for you.


### Environment Variable replace mode

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
(in this case, the home folder's path, e.g. `/Users/[user]` or `/home/[user]`).
If it's disabled then it won't be replaced,
the value you specify for the input will be passed as text (`$HOME`),
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
