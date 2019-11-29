---
tag: []
title: Creating white label app versions
redirect_from: []
summary: ''
published: false

---
This guide explains how to create different versions of your while label project and build all or just one version by chaining workflows and setting differences in Environment Variables.

In this article we’re building three individual versions (g_reen_, _red_ and _white)_ of our white label project.

What you’ll need for this setup:

* A main workflow that responds to any triggers, for example, push or pull.
* One or more version-specific workflow/s where you can set all the parameters that distinguish your versions from each other.
* A [utility workflow](/bitrise-cli/workflows/#utility-workflows) that you can reuse multiple times tucked before or after workflows.

## Prepping workflows of a white label app

1. [Add your app](getting-started/adding-a-new-app/) to Bitrise in the usual way.
2. Click your app on the [Dashboard](https://app.bitrise.io/dashboard/builds) and go to **Workflows**.
3. Next to **WORKFLOW**, click **+ Workflow** to create your main workflow.
4. Add a new workflow based on an **Empty workflow**. In this example, our main workflow is called **allcolor**. This workflow will respond to triggers and start running your other workflows in the chain. Now onto the version-specific workflow creation.
5. Click **+ Workflow** to create your version-specific workflow. Keep adding as many workflows as many different versions you wish to create.
6. Click the **Env Vars** tab and add your version-specific parameters to each workflow you’ve just created. As you can see in this image we’re adding Workflow Environment Variables to our **green**, **red** and **white** workflows but leaving **allcolor** intact.

   ![](/img/workflow-spec-env.jpeg)
7. Go back to the **Workflows** tab and click **Workflow** to create your utility workflow. Make sure you give a name that starts with an underscore, for example, **_runner**, otherwise Bitrise CLI will not treat it as a utility workflow. With this little trick, you can reuse the same workflow as many times as you need it by chaining it after or before another workflow.
8. Add Steps to your utility workflow.

   In this example, we’re adding a **Script** Step which will inherit the Environment Variable from the workflows and print out the value in the build log.

   ![](/img/white-label-script.jpg)

## Chaining workflows

Now that we have a bunch of workflows ready, it’s time to chain them together in the right order.

1. Select your main workflow (**allcolor** in this example) that is responsive to triggers.
2. Click **Add Workflow after** and select the version-specific workflow and hit **Done**.
3. Click **Add Workflow after** again and add the utility workflow right after the version-specific workflow. Keep adding workflows depending on how many versions you’d like to build. In this guide, we’re adding 3 different types of workflows after **allcolor** where each workflow is followed by the same utility workflow.

   ![](/img/add-workflow-aftercolor.png)

This is what the setup looks like on the **Workflows** tab.

![](/img/whitelabel-chained-workflows.jpg)

1. Go back to your Build’s page and click **Start/Schedule a build**.
2. In the Build configuration pop-up window, select your main workflow under Workflow. This will kickstart your chained workflows and build the app versions of your white label app.

In our simple example, here is the output of the chained workflows:

![](/img/white-label-logview.jpg)

{% include message_box.html type="note" title="Parallel running workflows" content="If you add the Bitrise Start Build Step to your main workflow, it will run all your workflows parallel, whereas without the Step your workflows will run consecutively."%}