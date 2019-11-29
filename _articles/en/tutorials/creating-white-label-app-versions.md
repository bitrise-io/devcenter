---
tag: []
title: Creating white label app versions
redirect_from: []
summary: ''
published: false

---
This guide explains how to create different versions of your while label project and build all or just one version by chaining Workflows and setting differences in Environment Variables.

In this article we’re building three individual versions (red, green, white) of our white label project.

What you’ll need for this setup:

* A main Workflow that runs each version-specific Workflows.
* One or more version-specific Workflow/s where you can set all the parameters that distinguish your versions from each other.
* A [utility Workflow](/bitrise-cli/workflows/#utility-workflows) that you can reuse multiple times tucked before or after Workflows.

## Prepping Workflows of a white label app

1. [Add your app](getting-started/adding-a-new-app/) to Bitrise in the usual way.
2. Click your app on the [Dashboard](https://app.bitrise.io/dashboard/builds) and go to **Workflows**.
3. Next to **WORKFLOW**, click **+ Workflow** to create your main Workflow.
4. Add a new Workflow based on an **Empty Workflow**. In this example, our main Workflow is called **allcolor**. This Workflow will respond to triggers and start running your other Workflows in the chain. Now onto the version-specific Workflow creation.
5. Click **+ Workflow** to create your version-specific Workflow. Keep adding as many Workflows as many different versions you wish to create.
6. Click the **Env Vars** tab and add your version-specific parameters to each Workflow you’ve just created. As you can see in this image we’re adding Workflow Environment Variables to our **green**, **red** and **white** Workflows but leaving **allcolor** intact.

   ![](/img/workflow-spec-env.jpeg)
7. Go back to the **Workflows** tab and click **Workflow** to create your utility Workflow. Make sure you give a name that starts with an underscore, for example, **_runner**, otherwise Bitrise CLI will not treat it as a utility Workflow. With this little trick, you can reuse the same Workflow as many times as you need it by chaining it after or before another Workflow.
8. Add Steps to your utility Workflow.

   In this example, we’re adding a **Script** Step which will inherit the Environment Variable from the Workflows and print out the value in the build log.

   ![](/img/white-label-script.jpg)

## Chaining Workflows

Now that we have a bunch of Workflows ready, it’s time to chain them together in the right order.

1. Select your main Workflow (**allcolor** in this example) that is responsive to triggers.
2. Click **Add Workflow after** and select the version-specific Workflow and hit **Done**.
3. Click **Add Workflow after** again and add the utility Workflow right after the version-specific Workflow. Keep adding Workflows depending on how many versions you’d like to build. In this guide, we’re adding 3 different types of Workflows after **allcolor** where each Workflow is followed by the same utility Workflow.

   ![](/img/add-workflow-aftercolor.png)

This is what the setup looks like on the **Workflows** tab.

![](/img/whitelabel-chained-workflows.jpg)

1. Go back to your Build’s page and click **Start/Schedule a build**.
2. In the Build configuration pop-up window, select your main Workflow under Workflow. This will kickstart your chained Workflows and build the app versions of your white label app.

In our simple example, here is the output of the chained Workflows:

![](/img/white-label-app-logoverview.jpg)

{% include message_box.html type="note" title="Parallel running Workflows" content="If you add the Bitrise Start Build Step to your main Workflow, it will run all your Workflows parallel, whereas without the Step your Workflows will run consecutively."%}

Some more info: [Secrets and Env Vars](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/), [About parallel builds](https://devcenter.bitrise.io/builds/triggering-builds/trigger-multiple-workflows/)