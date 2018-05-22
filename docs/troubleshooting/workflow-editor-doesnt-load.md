This can happen if you modified the `bitrise.yml` / workflow configuration in a way which crashes the Workflow Editor UI.

If this would happen please [contact us](https://www.bitrise.io/contact) so we can fix the issue in the UI code,
then you can fix the `bitrise.yml` through our API.

You can find an example of how the API works [on GitHub](https://github.com/bitrise-io/bitrise/blob/master/_examples/experimentals/upload_download_bitrise_io/bitrise.yml).
In short, you can use a simple `curl` call to download & to upload an app's config / `bitrise.yml` to [bitrise.io](https://www.bitrise.io).

With the Bitrise API you can download the `bitrise.yml` from [bitrise.io](https://www.bitrise.io) even if it breaks the Workflow Editor UI,
fix it locally and then upload the fixed `bitrise.yml` with another API call. For this all you need is a Personal Access Token, which you can generate on your [account's security tab](https://www.bitrise.io/me/profile#/security).

To download the `bitrise.yml` please check the [related section of the Bitrise API documentation](/api/v0.1/#get-appsapp-slugbitriseyml).

Save the `bitrise.yml` into a file, fix it, then you can upload it with another `curl` call.

To upload the `bitrise.yml` please also follow the [related part of the Bitrise API documentation](/api/v0.1/#post-appsapp-slugbitriseyml).

_Note: make sure that you set the right `path/to/bitrise.yml` - specify the path of
the `bitrise.yml` file where you saved the fixed `bitrise.yml`!_
