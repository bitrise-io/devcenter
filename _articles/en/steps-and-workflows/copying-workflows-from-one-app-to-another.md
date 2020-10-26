---
last_modified_at: 
tag:
- workflows
- steps
- bitrise.yml
title: Copying Workflows from one app to another
redirect_from: []
description: If you have a lot of apps, you might not want to spend time with setting
  up Workflows for each and every one of them separately, especially if there’s little
  difference between the Workflows you want to run for them. If so, the easiest thing
  to do is to simply copy an existing Workflow.
menu:
  steps-workflows-main:
    weight: 19

---
If you have a lot of apps, you might not want to spend time with setting up Workflows for each and every one of them separately, especially if there’s little difference between the Workflows you want to run for them. If so, the easiest thing to do is to simply copy an existing Workflow.

{% include message_box.html type="important" title="YAML mode only" content="Copying a Workflow to another app is only possible in YAML mode. [You can create a new Workflow based on an existing one](/steps-and-workflows/creating-workflows/) but only for the same app."%}

## Copying a Workflow on the website

You can copy a Workflow from any `bitrise.yml` file, including your local files. To copy an existing Workflow from one Bitrise app to another on our website:

1. Go to your Dashboard.
2. Find and open the app from which you want to copy the Workflow.
3. Go to the **Workflows** tab and then the **bitrise.yml** tab.
4. Select the Workflow you want and copy it.

   ![{{ page.title }}](/img/copy-workflow.png)
5. Open the app you want to copy it to.
6. Go to the **Workflows** tab and then the **bitrise.yml** tab.
7. Paste the Workflow under the \`workflows\` component.