---
title: Starting parallel builds with a single trigger
menu:
  triggering-builds:
    weight: 6

---
If you have more than one concurrency, you can run more than one build simultaneously. And since we want to make life as easy for you as possible, these builds can be started automatically, with a single trigger. Let's go through how it works!

In the example, we have three workflows of a single app set up to run at the same time. Let's call these workflows `Trigger`, `Building` and `Testing`. The workflow called `Trigger` will be triggered by a pull request, and then the workflow will trigger `Building` and `Testing` which will run simultaneously.

All workflows run on separate, "clean" Virtual Machines. They can also run on different types of stacks: to choose the stack for any workflow, enter the `Workflow Editor` of the app and select the `Stack` tab.

If any of the builds fail, the build will be considered a failed build. If the build is triggered by a webhook, Bitrise will send a summarized build result to the Git hosting provider. If **any** of the parallel builds fail, a failed status will be reported.

**What you need**:

* a Personal Access Token
* a Secret Environment Variable storing the token
* the `Bitrise Start Build` step
* the `Bitrise Wait for Build` step

1. Create a **Personal Access Token** for your user.

   Go to `Account settings` and select the `Security` option on the left side. Click the `Generate new` button.

   ![Access token](/img/getting-started/triggering-builds/generate-token.png) **IMPORTANT**: Make sure to copy the code once it is generated. You will not be able to see it again!
2. Create a Secret Environment Variable on the `Secrets` tab of the app's `Workflow Editor` and add the token as its value.

   ![Secret env](/img/getting-started/triggering-builds/secret_token.png)
   Feel free to use any key you wish for the secret. We recommend something simple like `$ACCESS_TOKEN`.
3. Add the `Bitrise Start Build` step to the `Trigger` workflow.

   **IMPORTANT:** The `Bitrise Start Build` step will set an environment variable to all builds it starts: `$SOURCE_BITRISE_BUILD_NUMBER`. This means that all builds of the app started by this step will have the same build number despite running with different workflows.
4. Add the secret env storing your personal access token to the `Bitrise Access Token` input of the step: click the `Insert variable` button and choose the key you created.

   ![Secret env](/img/getting-started/triggering-builds/access-token-input.png)
5. Find the `Workflows` input of the step, and add `Building` and `Testing` to it.

   ![Workflows input](/img/getting-started/triggering-builds/workflows-input.png)
6. Add the `Bitrise Wait for Build` step as the **last step** of the `Trigger` workflow.

   **IMPORTANT:** The step checks statuses of the builds defined in the step. The builds are defined in the `Build slugs` input: the slugs are the output of the `Bitrise Start Build` step. As long as the builds defined by the slugs are running, the step will hold the build it is running in. The build will fail if any of the builds included in the step fail.
7. Add the secret env storing your personal access token to the `Bitrise Access Token` input of the step: click the `Insert variable` button and choose the key you created.

   ![Secret env](/img/getting-started/triggering-builds/access-token-input.png)

And you are done! Once you trigger the `Trigger` workflow, the `Bitrise Start Build` step of the workflow will trigger two more builds running simultaneously. If those two builds are successful, the `Bitrise Wait for Build` step lets the first build finish. A single status report is sent to the git hosting provider, regardless whether the build is successful or not.