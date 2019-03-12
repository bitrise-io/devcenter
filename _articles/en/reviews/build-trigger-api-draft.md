---
title: 'Triggering and aborting builds - draft '
redirect_from: []
date: 2019-01-16 15:45:49 +0000
published: false

---
You can trigger and abort builds with the Bitrise API. You can define parameters for the build like what `branch`, `tag` or _git commit_ to use and what _build message_ to present on the Build's details page.

## Triggering a new build

To trigger a new build with the Bitrise API, call the `/apps/{APP-SLUG}/builds` endpoint. You need to specify an app slug and at least one build parameter out of three in a JSON object:
- a git tag or git commit hash
- a branch
- a workflow ID  

The JSON object must also contain a `hook_info` object with a `type` key and `bitrise` as the value of the key. 

Here's a minimal sample JSON body which specifies _master_ as the value of the `branch` parameter:

    {
      "hook_info": {
        "type": "bitrise",
      },
      "build_params": {
        "branch": "master"
      }
    }

And here's an example curl request: 

``` bash
curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds" -d '{"hook_info":{"type":"bitrise"},"build_params":{"branch":"master"}}'
```

In the above example, we triggered a build of the app's `master` branch. 

{% include message_box.html type="note" title="Authorization" content="All examples in this guide use the `https://api.bitrise.io/v0.1/apps/APP-SLUG/builds` endpoint. This endpoint can only be authorized with a Personal Access Token!"%}

{% include message_box.html type="note" title="Interactive cURL call configurator" content="You can find an interactive cURL call configurator by clicking on the `Start/Schedule a build` button on your app's [bitrise.io](https://www.bitrise.io) page and switching to `Advanced` mode in the popup. At the bottom of the popup you can find a `curl` call, based on the parameters you specify in the popup. 

**Note that this call uses the** `app.bitrise.io` **URL and the app's build trigger token, as opposed to the personal access token shown in the examples in this guide. All other parameters, however, work the same way.**"%}

In the example, we passed this JSON payload as a string: to be precise, as a JSON object serialized to a string.

You can also pass it as an object (for example, if you want to call it from JavaScript). To do so, include a root `payload` element or, alternatively, set the JSON object as the value of the `payload` POST parameter.

Here's a jQuery example using the `payload` parameter:

    $.post("https://api.bitrise.io/app/APP-SLUG/builds/", {
        "payload":{
            "hook_info":{
                "type":"bitrise",
            },
            "build_params":{
                "branch":"master"
            }
        }
    })

You can specify several different build parameters when triggering a build. The parameters should be set in the `build_params` object: let's go through some of the possible configurations!

### Setting a branch, commit, or tag to build

You can set Git-specific parameters in your call. The `branch` parameter specifies the source branch to be built. This is either the branch of the git commit or, in the case of a Pull Request build, the source branch of the Pull Request.

``` bash
curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds" -d '{"hook_info":{"type":"bitrise"},"build_params":{"branch":"master"}}'
```

You can also build a specific git commit or even a git tag: you just need to set either the commit hash or the tag in the `build_params` object. You can also set a commit message for the build with the `commit_message` parameter.

``` bash
curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds" -d '{"hook_info":{"type":"bitrise"},"build_params":{"commit_hash":"0000ffffeeeee", "commit_message":"testing"}}'
```

{% include message_box.html type="note" title="Git Clone - parameter priority" content=" If you provide a `tag`, the `branch` parameter will be ignored by the `Git Clone` step. 

If you provide a `commit_hash` parameter then both the `tag` and the `branch` parameters will be ignored. 

The ignored parameters will still be logged and they will be available for steps and they will be visible on the Build's details page but the `Git Clone` Step will use the the most specific parameter for checkout."%}

### Setting parameters for Pull Request builds

For a Pull Request build, use the `branch_dest` parameter to set up the destination or target branch of the Pull Request. The PR will be merged into this branch but before that, Bitrise will build your app based on how the code would look like after merging. 

``` bash
curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds" -d '{"hook_info":{"type":"bitrise"},"build_params":{"branch_dest":"master"}}'
```

If your git provider supports it, you can also use the `pull_request_merge_branch` parameter to build the pre-merge branch of the PR. In that case Bitrise will build your app based on the branch of the PR itself, without taking the destination branch into account. 

#### Bitrise-specific parameters:

* `workflow_id`: (string): Force the use of the specified workflow ID. If not defined then the workflow will be selected based on the project's [Trigger Map configuration](/webhooks/trigger-map/).
* `environments` (array of objects): See the [Specify Environment Variables](#specify-environment-variables) section for more info about the `environments` objects.
* `skip_git_status_report` (bool): Skip sending build status to the connected git provider.

#### Pull Request specific parameters:

* `branch_dest` (string): Used only for Pull Request builds: the destination/target branch of the Pull Request. The PR will be merged into this branch.
* `pull_request_id` (int): Pull Request ID on the source code hosting system (for example, the PR number on GitHub).
* `pull_request_repository_url` (string): repository url from where the Pull Request is sent. For example, if the PR is created from a fork this should be the fork's URL.
* `pull_request_merge_branch` (string): the pre-merge branch, **if the source code hosting system supports & provides** the pre-merged state of the PR on a special "merge branch" (ref).
  Example: `pull/12/merge`.
* `pull_request_head_branch` (string): the Pull Request's "head branch" (`refs/`). This special git `ref` should point to the **source** of the Pull Request. Supported by GitHub and GitLab.
  Example: `pull/12/head` (github) / `merge-requests/12/head` (gitlab).

### Specifying Environment Variables

You can define additional environment variables for your build.

[Be aware that Environment Variables have a priority order!](/bitrise-cli/most-important-concepts/#availability-order-of-environment-variables). These additional variables will be handled with priority between `Secrets` and `App Env Vars`, which means that you can not overwrite environment variables defined in your build configuration (for example, App Env Vars), only Secrets. 

This parameter must be an **array of objects**, and every item of the array must include at least a `mapped_to` property. This must contain:

- The key of the Environment Variable.
- The value of the Environment Variable.

{% include message_box.html type="note" title="Replacing Env Var names" content="By default environment, variable names inside values will be replaced in triggered build by actual value from the target environment. This behavior can be disabled by setting `is_expand` flag to `false`."%}

Example:

    "environments":[
      {"mapped_to":"API_TEST_ENV","value":"This is the test value","is_expand":true},
      {"mapped_to":"HELP_ENV","value":"$HOME variable contains user's home directory path","is_expand":false},
    ]

### Setting a workflow for the build

By default, the workflow for your build will be selected based on the content of `build_params` and your app's [Trigger Map](/webhooks/trigger-map/). This is the same as how [Webhooks](/webhooks/) select the workflow for the build automatically, based on the Trigger Map.

With the API, you can however **overwrite** this selection and specify exactly which workflow you want to use.

Add a `workflow_id` parameter to your `build_params` and specify the workflow you want to use for that specific build. Here's an example call where we specify the `deploy` workflow: 

    curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds" -d '{"hook_info":{"type":"bitrise"},"build_params":{"branch":"master","workflow_id":"deploy"},"triggered_by":"curl"}'

## Aborting a build

You can abort running builds, and set the reason for aborting, as well as specify if email notifications should be sent about the build. 

To simply abort the build, call the `/apps/APP-SLUG/builds/BUILD-SLUG/abort` endpoint. The only required parameters are the app slug and the build slug. 

```bash
curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds/BUILD-SLUG/abort"
```

### Setting an abort reason 

You can set a reason for aborting the build by using the `abort_reason` parameter. This parameter takes a string and it will show up on your app's build page. 

```bash
curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds/BUILD-SLUG/abort" -d '{"abort_reason": "aborted for a reason"}'
```

Normally, aborted builds count as failed builds. Use the `abort_with_success` parameter to abort a build but still count it as a successful one. Your git provider will show the build as successful. 

```bash
curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds/BUILD-SLUG/abort" -d '{"abort_with_success": true}'
```

### Cancelling email notifications 

Depending on your app settings, Bitrise might send an email notification when a build is aborted. If you do not want a notification, set the `skip_notification` parameter to `true`. 

```bash
curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds/BUILD-SLUG/abort" -d '{"skip_notification": true}'
```