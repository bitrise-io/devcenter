---
# jp title missing
title: Using the Trigger Map to trigger builds
redirect_from:
- "/webhooks/trigger-map/"
- "/webhooks/trigger-map"
menu:
  triggering-builds:
    weight: 5
    title: Triggering builds with the Trigger map

---

{% include not_translated_yet.html %}

When you register a webhook for an event or for multiple events (for example, for `Code Push` and
for `Pull Request` events), your source code hosting service will call the webhook
every time the related event happens.

On [bitrise.io](https://www.bitrise.io) these webhooks calls are called *triggers*,
and can be mapped to different `Workflows`, or not mapped at all.
If you don't map a trigger to any workflow, then [bitrise.io](https://www.bitrise.io) won't
start a build. If you map it to a workflow, then a build will be started
with the selected workflow.

In the following examples, we'll use a very simple Bitrise configuration (`bitrise.yml`),
which does nothing else just prints the selected workflow's ID:

```yaml
---
format_version: 1.3.0
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
trigger_map:
- push_branch: "*"
  workflow: primary
- pull_request_target_branch: "*"
  pull_request_source_branch: "*"
  workflow: primary
- tag: "*"
  workflow: primary
workflows:
  primary:
    steps:
    - script:
        inputs:
        - content: |-
            #!/bin/bash
            echo "$BITRISE_TRIGGERED_WORKFLOW_ID"
```

{% include message_box.html type="info" title="What is `bitrise.yml`" content=" `bitrise.yml` is the representation of your app's configuration. In the workflow editor, you can edit it in a visual way through the web UI, but you can always switch to `bitrise.yml` mode (left side of the workflow editor) to see the configuration in a YAML format, as well as you can edit the configuration in YAML format too. It's up to you which solution you prefer, the visual web UI or the YAML (`bitrise.yml`) representation, and you can switch between the two any time (the changes you do in the web UI will be reflected in the `bitrise.yml`, and vice versa). 
"%}

The above example `bitrise.yml` will select the `primary` branch for every Code Push (`push_branch: "*"`), Tag Push (`tag: "*"`)
and for every Pull Request (`pull_request_target_branch: "*"` & `pull_request_source_branch: "*"`).

_If you remove the pull request item_ from the `trigger_map` list, then
no pull request will trigger a build anymore. Example:

```yaml
trigger_map:
- push_branch: "*"
  workflow: primary
```

This configuration will start a build with the `primary` workflow for every code push, but for nothing else (for example not for pull requests).

## Components of the `trigger_map`

A `trigger_map` is a _list of filters_, and the `workflow` the given
filters should select in case of a matching trigger.

**Every filter item has to include at least one condition!**

This means that you can't have an item which only specifies the `workflow`,
at least one filter (`push_branch` / `pull_request_source_branch` / `pull_request_target_branch` / `tag`)
has to be specified!

### The available filters:

* `push_branch` : A filter which is matched against Code Push events' "branch" parameter
* `pull_request_source_branch` : A filter which is matched against Pull Request events' "source branch"
  parameter (the branch the pull request was started from)
* `pull_request_target_branch` : A filter which is matched against Pull Request events' "target branch"
  parameter - the branch the pull request will be **merged into**
* `tag` : A filter which is matched against Tag Push events' "tag" (name) parameter
* `pattern` : **DEPRECATED** - this filter was used for both code push and pull request events,
  in combination with `is_pull_request_allowed`. This filter is now deprecated,
  as the new filters allow better control over event mapping.

If you define multiple filters in a single item then **all filters have to match**
in order to select that item's workflow.
For example:

    trigger_map:
    - pull_request_target_branch: "master"
      pull_request_source_branch: "develop"
      workflow: primary

will only select the `primary` workflow if the pull request's source branch is `develop` **AND**
the target branch is `master`.

If you want to specify filters which should be treated separately, for example, to select `primary` for pull requests where the source is `develop`, as well as select
for the ones which target `master`:

    trigger_map:
    - pull_request_target_branch: "master"
      workflow: primary
    - pull_request_source_branch: "develop"
      workflow: primary

One last note, which is hopefully not surprising after the previous example:
you can't mix and match `push_branch`, `tag` and the `pull_request_..` filters **in the same item**.
This would effectively mean that the workflow should be selected
if the event is a Code Push and a Pull Request (or Tag Push) event **at the same time**.
This is simply not possible, source code hosting services send separate
webhooks for Pull Request (pre-merge state), Tags and for Code Push events.
_A single webhook event will never be Code Push, Tag Push and Pull Request at the same time_,
a single webhook is always related to only one type (Code Push, Tag Push or Pull Request).

## One trigger = one build

One trigger can only select a single workflow / can only start a single build.
**The first item which matches the trigger will select the workflow for the build!**

**If you want to run more than one workflow**, you can
[Chaining workflows](/bitrise-cli/workflows/#chaining-workflows-and-reusing-workflows)
after each other. _The workflows chained this way won't run in parallel_,
but the full chain of workflows will be executed, in the order you chain them.

**The order of the items** also matter: if you'd specify a `push_branch: mast` _item **after** a_ `_push_branch: "*"_` item, the `push_branch: master` _would never be selected_
as every code push event would match `push_branch: "*"` first,
and **the first item which matches the trigger will select the workflow for the build!**

## How to build only a single branch

If you want to build only a single branch, for every code push, but for nothing else (no push to
any other branch should trigger a build, nor any pull request or tag), then
all you have to do is to specify a `trigger_map` which does not map anything else
to any workflow, only the branch you want to build.

For example, if you only want to build the `master` branch on code push:

```yaml
trigger_map:
- push_branch: master
  workflow: primary
```

Or if you only want to build `feature/` branches:

```yaml
trigger_map:
- push_branch: feature/*
  workflow: primary
```

Or the two together:

```yaml
trigger_map:
- push_branch: master
  workflow: primary
- push_branch: feature/*
  workflow: primary
```

This configuration will start a build for every code push which happens on
either `master` or on a `feature/` branch, and will use the same workflow for
both (`primary`).

If you want to use a different workflow for your `master` branch, then
all you have to do is to change the `workflow:` for that trigger map item:

```yaml
trigger_map:
- push_branch: master
  workflow: deploy
- push_branch: feature/*
  workflow: primary
```

This configuration will use the workflow `deploy` for every code push on `master`,
and the workflow `primary` for every code push on `feature/` branches,
and **will not start a build for anything else**.

## A very simple, two-workflow CI/CD setup

A base CI/CD setup involves two workflows: one for integration tests,
and one for distribution.

If you have a workflow `primary` for doing the integration tests,
and `deploy` to do the deployment / distribution, and you want to
run the integration test for code pushes and pull requests on every branch
except the `master` branch, which should instead use the `deploy` workflow:

```yaml
trigger_map:
- push_branch: master
  workflow: deploy
- push_branch: "*"
  workflow: primary
- pull_request_target_branch: "*"
  workflow: primary
```

{% include message_box.html type="warning" title="Order of the items matter!" content=" When `bitrise` receives a webhook event (any kind), it'll match it against the app's `trigger_map`. **The first item it matches will select the workflow for the build!**

This means that if you'd specify the `push_branch: master` **after** the `push_branch: \"*\"` item, `master` would never be selected as every code push event would match `push_branch: \"*\"` first!
"%}

## Don't start two builds for pull requests from the same repository

When you start a Pull Request from the same repository (not from a fork,
just from a branch of the repository),
**the source code hosting service will send two webhooks**,
one for the code push and one for the pull request!

{% include message_box.html type="important" title="Pull Request build" content=" Although it might seem like both builds are the same, it most likely isn't! The code push event / build builds the code of the branch, without any merging, etc. It builds the exact same state of the code what you have when you checkout that branch. The Pull Request build on the other hand builds a \"pre-merged\" state of the code. This \"pre-merged\" state is not the final merged version of the code, it only represents a clone of how the code will look like **after** you merged the pull request.
"%}

Whether you want to build both or just one of these in case of a pull request
is up to you and depends on your project's requirements, but with `bitrise`
you can decide whether you want it or not.

{% include message_box.html type="note" title="Pull Request merge is a Code Push" content=" Source code hosting services treat the event of \"merge\" as a code push event. For example if you merge a Pull Request from `feature/a` into `master`, when you merge the PR it will generate a code push to `master`.
"%}

An example to build only the pull request ("pre-merged") events/state,
in addition to deploying `master`:

```yaml
trigger_map:
- push_branch: master
  workflow: deploy
- pull_request_target_branch: "*"
  workflow: primary
```

or if you don't want to start a build for pull requests, only for code push events:

```yaml
trigger_map:
- push_branch: master
  workflow: deploy
- push_branch: "*"
  workflow: primary
```

## Three workflows: test, deploy to staging and deploy to production

Another common CI/CD pattern is to have three workflows:

* A Test workflow, which will run for every pull request, every code push on `feature/` branches etc.,
  to test whether the test can be integrated into a release (branch)
* A Staging deployment workflow, to deploy the app/code to an internal/testing system. Examples:
  * In case of an iOS app this can be, for example, an Ad Hoc signed IPA deployed to HockeyApp, where your tester team can download and test it, or a deploy to iTunes Connect / TestFlight for internal testing.
  * In case of an Android app this can be a deploy to Google Play to a "beta" track.
  * In case of a server code this can be a deploy to, for example, a staging Heroku server.
* A Production deployment workflow, to deploy the app/code into production. Examples:
  * In case of an iOS app this can be an App Store signed IPA deployed to iTunes Connect/TestFlight,
    enabled for "external testing".
  * In case of an Android app this can be a deploy to Google Play as a public update of the app.
  * In case of a server code this can be a deploy to, for example, the production Heroku server.

So, we have three workflows (`primary` (test), `deploy-to-staging` and `deploy-to-production`)
and we'll specify three triggers, to select the right workflow for the right trigger.

There are two similar approaches, depending whether you prefer tags of branches for
production deployment:

### Using Tags to trigger the production deployment

```yaml
trigger_map:
- tag: v*.*.*
  workflow: deploy-to-production
- push_branch: master
  workflow: deploy-to-staging
- push_branch: "*"
  workflow: primary
- pull_request_target_branch: "*"
  workflow: primary
```

This trigger map configuration will trigger a build:

* with the `deploy-to-production` workflow if a new tag (with the format `v*.*.*`,  `v1.0.0`) is pushed
* with the `deploy-to-staging` workflow if a code push happens on the `master` branch (for example, a pull request is merged into the `master` branch)
* with the `primary` workflow for any other branch and for pull requests

### Using a Branch to trigger the production deployment

```yaml
trigger_map:
- push_branch: master
  workflow: deploy-to-production
- push_branch: develop
  workflow: deploy-to-staging
- push_branch: "*"
  workflow: primary
- pull_request_target_branch: "*"
  workflow: primary
```

This trigger map configuration will trigger a build:

* with the `deploy-to-production` workflow if a code push happens on the `master` branch (for example, a git flow release branch merged into `master`)
* with the `deploy-to-staging` workflow if a code push happens on the `develop` branch (for example, a pull request is merged into the `develop` branch)
* with the `primary` workflow for any other branch and for pull requests

## How to build only pull requests

If all you want is to run integration tests for pull requests, and you
don't want to do anything else, then you can use a trigger map configuration
like this:

```yaml
trigger_map:
- pull_request_target_branch: "*"
  workflow: primary
```

This will select the `primary` workflow for every and any pull request,
and will not start a build for anything else.

If you'd only want to build pull requests which are targeted to
be merged into `master`, the configuration would look like this:

```yaml
trigger_map:
- pull_request_target_branch: master
  workflow: primary
```
