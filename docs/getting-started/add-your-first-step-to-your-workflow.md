Once you register an app you can start to modify it's Workflow,
to customize how a build should work.

To edit your App's Workflow you should open the `Workflow Editor`:

1. Select your App on [bitrise.io](https://www.bitrise.io)
2. Select the `Workflow` tab

Once you're in the Workflow Editor you can see the list of Steps which are already in your Workflow.

## Add a new Step to the Workflow

If you want to **add a new Step** to the Workflow,
just click the `+` sign button between the Steps.

![Add step button in Workflow Editor](/img/getting-started/add-new-step-button-in-workflow-editor.png)

This will show you a list of available Steps in our __Step Library__.
You can search and filter these steps if you want to, or just browse through the collection.

Adding a Step is as easy as clicking the `Add to Workflow` button
in this Step Library popup.

You can __Drag and Drop__ to reorder your list of Steps. During a build,
steps will be executed one by one, in top-to-bottom order.

Once you're happy with your Workflow you should click the `Save` button on the left side.
That's all, your next build will automatically use the current saved Workflow!

!!! note "Multiple Workflows"
    You can create as many workflows as you like, and then
    specify which one to use for which build trigger event in the `Triggers` section
    of the Workflow Editor.
    You can read more about Triggers and workflow selection in the
    [Control what to build when, with the Trigger Map](/webhooks/trigger-map/) guide.