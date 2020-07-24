---
changelog: 
last_modified_at: 
title: API
redirect_from: "/jp/api/v0.1/"
menu:
  main:
    identifier: api-main
    weight: 30

---
{% include not_translated_yet.html %}

Welcome to the Bitrise API! Many of the features that you are used to on our website and with our CLI are available via the API, too. It lets you integrate various systems and services with our CI/CD service for an efficient pipeline.

{% include message_box.html type="warning" title="The API is work-in-progress" content=" The API is work-in-progress: we will add new endpoints and possibly update the existing ones in the future. "%}

You can track the progress of the API: [join the discussion](https://discuss.bitrise.io/t/bitrise-api-v0-1-work-in-progress/1554)! Follow it and get notified about new endpoints and changes, we announce those there.

Feel free to contribute! If you want to request a new API feature or a new endpoint, [you can do so!](http://discuss.bitrise.io/t/bitrise-public-api/37)

{% include message_box.html type="info" title="Bitrise API endpoint documentation" content="Check out the [Bitrise API endpoint reference documentation](https://api-docs.bitrise.io/) to see all currently available endpoints and their parameters!"%}

## API domain/host and versioning

The Bitrise API's host is: [https://api.bitrise.io/](https://api.bitrise.io/ "https://api.bitrise.io/")

Every endpoint except the root one is versioned. The version has to be included in the URL right after the host.

Example: [https://api.bitrise.io/v0.1/me](https://api.bitrise.io/v0.1/me "https://api.bitrise.io/v0.1/me") (requires authentication)

Right now we have only one version, `v0.1`.

There's no long term compatibility promise for `v0.1`, although we try to do our best to not to break anything unless we have to. Once we're happy with `v0.1` we'll "freeze" it as `v1.0`, for which we'll provide long term support.