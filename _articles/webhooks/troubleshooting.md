---
title: Webhook Troubleshooting
menu:
  webhooks:
    weight: 11

---
First of all, if you registered your app on [bitrise.io](https://www.bitrise.io) a while ago (especially
if before 2016 Sept.) you should check the webhook URL registered on the git hosting service you use (GitHub, Bitbucket, ...).

__New trigger feature__ (like [skip ci](https://bitrise-io.github.io/devcenter/tips-and-tricks/skip-a-build/) or tag based triggering)
__are only available if you use the new `hooks.bitrise.io` webhook URL!__

_Initially we had a non open source `bitrise.io/hooks` endpoint for webhooks,
but every new project registered should now get the new `hooks.bitrise.io` webhook URL automatically._

__If your webhook would still be a `bitrise.io/hooks` URL, please replace it with the new `hooks.bitrise.io/` URL - you can find this on the `Code` tab of your app!__

__Debugging - what happens with webhooks related to un-mapped branches__

You can't limit Webhooks by branch in most of the source code hosting services,
so [bitrise.io](https://www.bitrise.io) will still receive a webhook call for every code push of other branches,
but it won't start a build unless it finds a matching filter in the `trigger_map`,
which specifies a `workflow` to be selected for the build.
_This is also true if you use the __Build Trigger API__ directly._

You can see all the ignored calls on your [Activity page on bitrise.io](http://www.bitrise.io/activity).
This means that if you think a given event should have started a build but it did not,
you should check your `Activity` page (or your source code hosting service's Webhook history - more info a bit below)
to find out why it did not trigger a build.

An ignored build call entry in the Activity list looks like:

```
Build trigger failed: trigger-pattern (push_branch:) (pr_source_branch:prtest/t1) (pr_target_branch:develop) did not match any defined workflow in trigger_map
PROJECT-NAME - Run triggered with params: push-branch: , pr-source-branch: prtest/t1, pr-target-branch: develop, but no matching workflow found
```

__Bitrise also returns the reason to the source code hosting service__ (the service which sent the webhook, e.g. GitHub) too,
so if your service has a webhook history (e.g. GitHub, Bitbucket, ...)
you can see the reason why a given webhook did not trigger a build there too!

Simply open the webhook history on your source code hosting service,
and check the response Bitrise returned. It will be something like:

```
{"success_responses":[],"failed_responses":[{"status":"error","message":"trigger pattern did not match any defined mapping: Run triggered with params: push-branch: , pr-source-branch: prtest/t1, pr-target-branch: develop, but no matching workflow found","service":"bitrise","slug":"...","build_slug":"","build_number":0,"build_url":"","triggered_workflow":""}]}
```

___These detailed responses are only generated if you use
the new [hooks.bitrise.io](https://hooks.bitrise.io) webhook URL!__
Initially we had a non open source `bitrise.io/hooks` endpoint
for webhooks, but every new project registered should now get the new
`hooks.bitrise.io` webhook URL automatically. If your webhook
would still be a `bitrise.io/hook` URL, please replace it with the new
`hooks.bitrise.io/` URL - you can find this on the `Code` tab of your app!_

## Local debugging

You can also test which workflow will be selected for a trigger
using our [open source, Bitrise CLI](https://www.bitrise.io/cli).

To simulate a code push, you can run:

```
bitrise trigger-check --push-branch master
```

To simulate a Pull Request, you can run:

```
bitrise trigger-check --pr-source-branch=feature/a --pr-target-branch=master
```

To simulate a tag push, you can run:

```
bitrise trigger-check --tag 1.0.0
```

For more information and options run:

```
bitrise trigger-check --help
```