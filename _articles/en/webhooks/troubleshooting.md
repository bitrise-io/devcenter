---
title: Webhook Troubleshooting
menu:
  webhooks:
    weight: 18

---
## bitrise.io/hooks versus hooks.bitrise.io

Please note that a new trigger feature (like [skip ci](https://bitrise-io.github.io/devcenter/tips-and-tricks/skip-a-build/) or tag based triggering) is only available if you use the new `hooks.bitrise.io` webhook URL! We used to have an open source `bitrise.io/hooks` endpoint for webhooks, but every new project registered should now get the new `hooks.bitrise.io` webhook URL automatically.

If you registered your app on [bitrise.io](https://www.bitrise.io) a while ago (especially before September 2016) you should check the webhook URL registered on the git hosting service you use (for example, GitHub, Bitbucket, etc.). 

If your webhook would still be a `bitrise.io/hooks` URL, please replace it with the new `hooks.bitrise.io/` URL - you can find this on the `Code` tab of your app!

## Debugging

What happens with webhooks related to un-mapped branches?

You can't limit webhooks by branch in most of the source code hosting services. [Bitrise](https://www.bitrise.io) will still receive a webhook call for every code push of other branches, but it won't start a build unless it finds a matching filter in the `trigger_map`, which specifies a `workflow` to be selected for the build. This is also true if you use the **Build Trigger API** directly.

This means that if you think a given event should have started a build but it did not:

1. You should check your Bitrise `Activity` page to find out why it failed to trigger a build. You can see all the ignored calls on your [Activity page on bitrise.io](http://www.bitrise.io/activity).

   An ignored build call entry in the Activity list looks like this:

       Build trigger failed: trigger-pattern (push_branch:) (pr_source_branch:prtest/t1) (pr_target_branch:develop) did not match any defined workflow in trigger_map
       PROJECT-NAME - Run triggered with params: push-branch: , pr-source-branch: prtest/t1, pr-target-branch: develop, but no matching workflow found
2. You should check the webhook history of your source code hosting service (for example, GitHub, Bitbucket, etc.).

   Bitrise returns the reason to the source code hosting service, so if your service has a webhook history, you can see the reason why a given webhook failed to trigger a build!

   Here is an example for a response returned by Bitrise

       {"success_responses":[],"failed_responses":[{"status":"error","message":"trigger pattern did not match

Note that these detailed responses are only generated if you use the new [hooks.bitrise.io](https://hooks.bitrise.io) webhook URL!

## Local debugging

You can also test which workflow will be selected for a trigger using our [open source, Bitrise CLI](https://www.bitrise.io/cli).

To simulate a **code push**, you can run:

    bitrise trigger-check --push-branch master

To simulate a **Pull Request**, you can run:

    bitrise trigger-check --pr-source-branch=feature/a --pr-target-branch=master

To simulate a **tag push**, you can run:

    bitrise trigger-check --tag 1.0.0

For **more information and options,** run:

    bitrise trigger-check --help