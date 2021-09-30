---
last_modified_at: 
tag:
- steps
- " contributors"
- " bitrise.yml"
- workflows
title: Sharing Steps with all Bitrise users
redirect_from: []
summary: If you think your Step can be of use to others, you can share it! You can
  do it manually, using the bitrise share command. If you created the Step with the
  Step plugin, you can run the share-this-step Workflow in your Step's directory.
menu:
  contributors-main:
    weight: 5
    title: Sharing your Steps with all Bitrise users

---
If you think your Step can be of use to others, you can share it! Before doing so, however, please check that there are no other Steps that solve the same problem. You can check:

* In the list of [released Steps](https://www.bitrise.io/integrations/steps).
* In the list of [open pull requests](https://github.com/bitrise-io/bitrise-steplib/pulls) in our StepLib.
* In the list of [closed pull requests](https://github.com/bitrise-io/bitrise-steplib/pulls?q=is%3Apr+is%3Aclosed) in our StepLib.

If you find a Step which is missing a particular feature, please try to contribute to it before developing or sharing a brand new Step for that feature. You can use our [Integrations page](https://www.bitrise.io/integrations/steps) to search for Steps in the Bitrise StepLib. By clicking the GitHub source button on a given Step's page you will be taken to the Step's repository, where you can submit a feature request or open a pull request.

Also, please keep in mind that shared Steps must be actively maintained and they must be open to contributors.

## Sharing a new Step

The sharing process is relatively straightforward - but please make sure to go through the process carefully when sharing a new Step.

{% include message_box.html type="important" title="The bitrise share command" content="During Step development, you can get help anytime by simply running bitrise share. This will print a short guide on sharing."%}

There are two ways to share a Step:

* You can do it manually, using the `bitrise share` command.
* If you created the Step with the Step plugin, you can run the `share-this-step` Workflow in your Step's directory.

### Before you start

Before you start, make sure that:

* Your Step is in a public Git repository.
* The step.yml file contains a support_url property which points to a valid issue tracker (for example, the **Issues** page of your Step's GitHub repository).
* The step.yml file contains a source_code_url property which points to the correct Git URL of your repository.

{% include message_box.html type="important" title="Sharing more than one Step" content="Sharing more than one Step - that is, adding more than one new step.yml file to the Bitrise StepLib - must be done in separate pull requests! You cannot open a pull request that contains more than one new Step!"%}

If you're ready, go ahead with your preferred sharing process!

### Sharing with the bitrise share command

1. Fork the [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib.git) repository.
2. Prepare your forked StepLib locally for sharing:

       $ bitrise share start -c <https://github.com/[your-username]/bitrise-steplib.git>
3. Add the Step version tag to your Step's repository.
4. Add the Step to your forked StepLib repository:

       $ bitrise share create --tag [step-version-tag] --git [step-git-uri].git --stepid [step-id]
5. Optionally, perform a complete health check on your forked StepLib:

       $ bitrise share audit -c <https://github.com/[your-username]/bitrise-steplib.git>
6. Review your Step's step.yml file, and if you're happy with it, finish the share process:

       $ bitrise share finish

   This commits and pushes the step.yml file to the forked StepLib repository.
7. Open a pull request in the official [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib.git) repository.

### Sharing with the share-this-step Workflow

The share-this-step Workflow is included in the bitrise.yml file that the Step plugin automatically generates when you create a new Step with it. Using it, sharing a Step is incredibly easy:

1. Fork the [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib.git) repository.
2. Set the required Workflow Environment Variables as app level Environment Variables in the bitrise.yml file:

       app:
         envs:
         - BITRISE_STEP_ID:
         - BITRISE_STEP_VERSION:
         - BITRISE_STEP_GIT_CLONE_URL:
         - MY_STEPLIB_REPO_FORK_GIT_URL:
3. Run the share-this-step Workflow in the Bitrise CLI:

       $ bitrise run share-this-step

### Fixing issues in a StepLib pull request

Once you submitted your Step version to the StepLib, wait for the Bitrise team to review it. If we ask for changes:

1. Close the pull request.
2. Delete the share branch from your fork of the Bitrise StepLib.
3. Fix the issues in the Step repository.
4. Add a new version tag to the commit that contains your fixes in the Step repository.
5. Run the [share process](/contributors/sharing-steps-with-all-bitrise-users/#sharing-a-new-step) again.

Hopefully, after fixing the issues, we’ll be able to merge your pull request and release your Step to the public!

## Abandoned Steps

If you are a Step maintainer, you should be reachable within a reasonable timeframe if anyone submits an issue or a pull request to your Step. If we try to contact you several times regarding an important fix/update in your Step and you refuse to answer for several weeks we might deprecate, remove or replace your Step in the collection! Abandoned Steps can be a threat for those who use it, please keep this in mind if you decide to share your Step with others!

The repository and issue tracker must not be removed, as there are permanent links to it included in the step.yml that is in the Bitrise StepLib. If they are removed, already shared Step versions will continue to function as they are also shared on a Bitrise managed file hosting service during the share process. A new version of the step may be released, managed by Bitrise.

If you shared a Step but you're no longer able or willing to maintain it, please create a GitHub issue in this repository: [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib)

## Reporting Step issues

If you're a user of a Step which has critical (security or functionality) issues, please create a ticket in the Step's Issue Tracker. Every Step declares the preferred way of reporting issues with the `support_url` attribute.

If you don't get a response from the Step's maintainer for an extended period (for more than a couple of weeks) please create a GitHub issue in this repository: [https://github.com/bitrise-io/bitrise-steplib](https://github.com/bitrise-io/bitrise-steplib "https://github.com/bitrise-io/bitrise-steplib")  and we'll try to resolve the issue, following the Abandoned Step policy. Please be patient and keep in mind that everyone who contributes to this collection does so to help you by providing a Step for you to use!