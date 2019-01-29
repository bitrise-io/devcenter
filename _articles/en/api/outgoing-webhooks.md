---
title: Outgoing Webhooks
menu:
  api:
    weight: 3

---
By setting up outgoing webhooks you can make Bitrise send notifications about specific events to your web service, so you can create custom integrations.

You can set the URL of your web service and select which events should trigger a notification in the Code tab of your app. Currently only build events are supported: a notification is sent when a build starts or finishes.

The event type that triggered the webhook is sent in a custom header:

```
"Bitrise-Event-Type": "build/triggered" # or "build/finished"
```

The recent delivery attempts of a webhook can be found on the Code tab, so you can inspect the sent payload and the given response, and even request a redelivery of a given item. (Please note that Bitrise tries to deliver an item only once, no automatic retry attempts are made: it can be requested manually.)

## Build events

_Note: the available values of the build status parameter can be found at the [build list part of the Bitrise API documentation](/api/v0.1/#get-appsapp-slugbuilds)_

### Build triggered

Custom header:

```
"Bitrise-Event-Type": "build/triggered"
```

Payload example:

```
{
  "build_slug":"1234abcd",
  "build_number":3,
  "app_slug":"abcd1234",
  "build_status":0,
  "build_triggered_workflow":"deploy"
  "git": {
    "provider":"github",
    "src_branch":"feature/branch",
    "dst_branch":"master", # If the build was triggered by a pull request
    "pull_request_id":32, # If the build was triggered by a pull request
    "tag":"v1.0" # If the build was triggered by tag
  }
}
```

### Build finished

Custom header:

```
"Bitrise-Event-Type": "build/finished"
```

Payload example:

```
{
  "build_slug":"1234abcd",
  "build_number":3,
  "app_slug":"abcd1234",
  "build_status":1,
  "build_triggered_workflow":"deploy"
  "git": {
    "provider":"github",
    "src_branch":"feature/branch",
    "dst_branch":master, # If the build was triggered by a pull request
    "pull_request_id":32 # If the build was triggered by a pull request
    "tag":"v1.0" # If the build was triggered by tag
  }
}
```