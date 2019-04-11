---
title: Use bitrise.yml from repository draft
redirect_from: []
date: 2019-04-10 12:22:43 +0000
published: false

---
It is possible to store the build configuration ( that is, your app's `bitrise.yml` file) in your repository. The approach has its pros and cons; let's go through how to do it and why you'd want to do it!

## Configuring Bitrise to run a bitrise.yml from your repository

You can, of course, simply use the Bitrise CLI to locally run your builds. You just need to set up a `bitrise.yml` file and use `bitrise run` to run the workflow or workflows you want. 

In the following examples, we'll discuss the **other** way: we'll define a "wrapper" configuration which will then run the build on Bitrise, using a `bitrise.yml` stored in your repository. 

### Setting up a wrapper configuration

A wrapper config means setting up a `bitrise.yml` configuration on [bitrise.io](https://www.bitrise.io/): this configuration defines how the actual `bitrise.yml` file you want to use will be retrieved from the repository. 

The wrapper configuration will contain an automatically triggered workflow, and another one that will tell Bitrise to continue the build from the repository. To make this work, we take advantage of a `Script` Step and the `$BITRISE_TRIGGERED_WORKFLOW_ID` environment variable. This environment variable is automatically set to the workflow that triggered the build: if we have a workflow with the same name defined in the `bitrise.yml` file that is stored in the repository, we can run that workflow. 

In our example, we'll use:

* A trigger map where the `ci` workflow is triggered by code push to the `master` branch.
* 
* A workflow called `run_from_repo` to tell Bitrise to continue the build from the repository.
* A workflow called `ci` with an `after_run` attribute set to the `run_from_repo` workflow. 

In this example, a code push will trigger the `ci` workflow, which in turn triggers the `run_from_repo` workflow. The `run_from_repo` runs a `Script` Step which runs the `bitrise run ci` command in the repository. Let's do it! 

1. Open your app on [bitrise.io](https://www.bitrise.io).
2. Open the Workflow Editor and go the `bitrise.yml` tab.
3. Set up a trigger map that automatically triggers a specific workflow.

       ---
       format_version: 1.4.0
       default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
        
       trigger_map:
       - push_branch: "*"
         workflow: ci
       - pull_request_target_branch: "*"
         workflow: ci
4. Set up the workflow that is triggered by the trigger map.

   This workflow must have an `after_run` attribute that points to another workflow. 

       ci:
         after_run:
         - run_from_repo
5. Set up the workflow that is triggered by the `after_run` attribute. 

   This workflow must have:
   - A `Git Clone` Step to clone your repository. 
   - A `Script` Step with the command `bitrise run "${BITRISE_TRIGGERED_WORKFLOW_ID}`. 
   
   ```
   workflows:
      run_from_repo:
        steps:
        - activate-ssh-key:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone: {}
        - script:
            title: continue from repo
            inputs:
            - content: |-
                #!/bin/bash
                set -ex
                bitrise run "${BITRISE_TRIGGERED_WORKFLOW_ID}"
                
    ```



Of course, this only works if the `bitrise.yml` file in your repository does have a `ci` workflow. Let's see the details of that!

### Adding a bitrise.yml to your repo

Your `bitrise.yml` must have a workflow that is also defined in the wrapper config. To be more precise, it must contain all the workflows that are defined in the trigger map of the wrapper config, which is stored on bitrise.io. 

This `bitrise.yml` file does not need its own trigger map: the previously set up wrapper configuration will take care of triggering the appropriate workflows. 

1. Create a `bitrise.yml` file. 
   
   No need to build it from scratch: you can edit and download your app's `bitrise.yml` configuration on the `bitrise.yml` tab of the Workflow Editor. 
1. Define all the workflows that are present in the trigger map of the wrapper configuration. 

   For example, if your wrapper configuration's trigger map triggers a `ci` workflow on code push and a `deploy` workflow on a pull request, you need to have both in your file, with the same name. 
1. Add all the Steps you want. 
   
   Note that at his point your repository's SSH key will have been activated and the repository itself cloned on Bitrise. Do not add these Steps to your workflows as they are unnecessary. 
1. Commit the file to your repository. 

## Potential issues of storing the bitrise.yml in the repository

The approach of storing your `bitrise.yml` file in your repository, and running your builds based on that configuration has its disadvantages. We'll discuss a few potential pitfalls of this.  

- The Trigger Map is better to be managed on bitrise.io.
- You can't change the build configuration of a specific commit.
- You can't edit the configuration in the online Workflow Editor. 
- Any Pull Request can run builds with its own custom configuration. 

### Trigger Map is better to be managed on bitrise.io

You can of course store the `trigger_map` (or `Triggers` on the web UI) in your repository (in `bitrise.yml`), but if you do that you'll lose the ability to _ignore_ patterns. This is because [bitrise.io](https://www.bitrise.io) have to evaluate the Trigger map **before** the repository would be cloned in order to be able to avoid starting a build based on the Trigger map.

The source code is never stored on [bitrise.io](https://www.bitrise.io), (see [Code Security - Source code](/getting-started/code-security/#source-code) for more information), so if you store the trigger map in your repository, the only way to check it is to clone it first. Even if you prepare your `trigger_map` in your repository to ignore patterns, [bitrise.io](https://www.bitrise.io) will start a build to clone the repository, before it could abort it.

In contrast, if you specify the Trigger Map on [bitrise.io](https://www.bitrise.io), you can ignore patterns in a way that it won't even start a build.

### You can't change the build configuration of a commit

If you use the `bitrise.yml` from the repository, that means that when you rebuild a specific commit, it will use the same `bitrise.yml` every time, the one stored in the repository for that git commit.

_The only way to change the configuration_ is to checkout the related branch, change the `bitrise.yml`, commit the changes, push and start a **new** build (rebuild of a commit won't work, that will always get the same `bitrise.yml`, the one stored at the commit).

**If you store your build configuration on** [**bitrise.io**](https://www.bitrise.io) you can always rebuild any commit with a new build configuration, _the configuration is not tied to the commit / state of the repository_. You can simply change a parameter and hit "rebuild", the new build will use the latest configuration from [bitrise.io](https://www.bitrise.io).

### You can't edit the configuration in the Workflow Editor on bitrise.io

The Workflow Editor on [bitrise.io](https://www.bitrise.io) can only be used to visualize and edit the configuration stored on [bitrise.io](https://www.bitrise.io).

The [offline workflow editor](https://github.com/bitrise-io/bitrise-workflow-editor) of course can be used.

### Pull Requests can run builds with any custom configuration

When someone sends a Pull Request they can modify the `bitrise.yml` in your repository any way they like it. A recent trend for example is to send pull requests which run a bitcoin miner, as long as that's possible. This can make _your_ builds to queue, until you abort the related build or it hits the build time limit.

## Template bitrise.yml for your wrapper configuration

    {% raw %}
    ---
    format_version: 1.4.0
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    trigger_map:
    - push_branch: "*"
      workflow: ci
    - pull_request_target_branch: "*"
      workflow: ci
    
    workflows:
      _run_from_repo:
        steps:
        - activate-ssh-key:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone: {}
        - script:
            title: continue from repo
            inputs:
            - content: |-
                #!/bin/bash
                set -ex
                bitrise run "${BITRISE_TRIGGERED_WORKFLOW_ID}"
      ci:
        after_run:
        - _run_from_repo
    {% endraw %}