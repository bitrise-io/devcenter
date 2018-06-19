When you've registered an app you can start modifying its Workflow,
that is to customize how a build should work.

To edit your App's Workflow you should open the `Workflow Editor`:

1. After [logging in](https://www.bitrise.io), select your App on your [Dashboard](https://www.bitrise.io/dashboard)
2. Select the `Workflow` tab

In the Workflow Editor you can see a preset list of Steps based on your app we added to your Workflow.

## Add a new Step to the Workflow

If you want to **add a new Step** to the Workflow,
just click the `+` sign button between the Steps you want the new one to be.

![Add step button in Workflow Editor](/img/getting-started/add-your-first-step.png)

This will show you a list of available Steps in our __Step Library__.
You can search and filter these steps if you want to, or just browse through the collection.
Clicking the Step will add it to your Workflow.

You can __Drag and Drop__ to reorder your list of Steps. During a build,
steps will be executed one by one, in top-to-bottom order.

Once you're happy with your Workflow Save it on the top right!
That's all, your next build will automatically use the current, __saved__ Workflow!

!!! note "Multiple Workflows"
    You can create as many workflows as you like, and then
    specify which one to use for which build trigger event in the `Triggers` section
    of the Workflow Editor.
    You can read more about Triggers and workflow selection in the
    [Control what to build when, with the Trigger Map](/webhooks/trigger-map/) guide.
