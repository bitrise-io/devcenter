By setting up outgoing webhooks you can make Bitrise send notifications about specific events to your web service, so you can create custom integrations.

You can set the URL of your web service and select which events should trigger a notification in the Code tab of your app. Currently only build events are supported: a notification is sent when a build starts or finishes.

The event type that triggered the webhook is sent in a custom header:

```
"Bitrise-Event-Type": "build/triggered" # or "build/finished"
```

Some data of the build is sent in the payload:

```
{
  "build_slug":"1234abcd",
  "build_number":3,
  "app_slug":"abcd1234",
  "git": {
    "provider":"github",
    "src_branch":"feature/branch",
    "dst_branch":master, # If the build was triggered by a pull request
    "pull_request_id":32 # If the build was triggered by a pull request
  }
}
```

The recent delivery attempts of a webhook can be found on the Code tab, so you can inspect the sent payload and the given response, and even request a redelivery of a given item. (Bitrise attempts to deliver an item once unless requested manually.)
