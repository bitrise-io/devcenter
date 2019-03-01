---
# jp title missing
title: Workflow Editor doesn't load
menu:
  troubleshooting:
    weight: 3

---

{% include not_translated_yet.html %}

If Workflow Editor doesn't load for you, chances are your `bitrise.yml` or a workflow which you have configured crashes the Workflow Editor's UI.

If you face the above issue please first:

1. [contact us](https://www.bitrise.io/contact) so we can fix the issue in the UI code
2. then you can fix the `bitrise.yml` through our API

## Managing bitrise.yml with the API

Use a simple `curl` call to **download** and to **upload** an app's configuration or `bitrise.yml` to [bitrise.io](https://www.bitrise.io). You can find an example of how the API works on [GitHub](https://github.com/bitrise-io/bitrise/blob/master/_examples/experimentals/upload_download_bitrise_io/bitrise.yml).

Before you start:

* Make sure you have a Personal Access Token which you can generate on your [account's security tab](https://www.bitrise.io/me/profile#/security).

1. Download the `bitrise.yml` with an [API call](/api/v0.1/#get-appsapp-slugbitriseyml). You will get a response in YML format.
2. Save the `bitrise.yml` into a file and modify it locally.
3. Upload the `bitrise.yml` with [another API call](/api/v0.1/#post-appsapp-slugbitriseyml) to [bitrise.io](https://www.bitrise.io). Make sure the path to your fixed or modified `bitrise.yml` is correctly set! You will get a response in JSON format.
