---
tag: []
title: bitrise.yml size limitation - draft
redirect_from: []
summary: ''
published: false

---
## bitrise.yml size limitation

If you edit your Workflow on [bitrise.io](https://www.bitrise.io/) (either in Workflow Editor or on the **bitrise.yml** tab) and your `bitrise.yml` exceeds its size limitation, the UI will display the following warning upon trying to save your changes:

    Error saving! Error saving app config: Validation failed: App config validation 784: unexpected token at 'Argument list too long - bin/bitrise

![](/img/yml-size-limit.png)

{% include message_box.html type="warning" title=".yml size limitations" content="Please note `bitrise.yml` cannot exceed 200KB and a `bitrise.secrets.yml` cannot exceed 100KB on the UI."%}

Here are a few workarounds to reduce a long `bitrise.yml`:

* You could separate your project into two apps.
* You could keep the `bitrise.yml` file in the project repository and use it with the Bitrise CLI. This way you will not bump into any limitation as the size limitation only affects the `bitrise.yml` modified on the UI.
* We generally don't recommend using Environment Variables as configuration files. If, however, the Env Var is not a short key - value pair but a long script, we suggest you store it in a file in your project repository or upload it to the [Generic File Storage](/tutorials/how-to-use-the-generic-file-storage/#uploading-files-to-generic-file-storage-on-bitriseio).
* Move scripts (especially the long ones) into their repository, and use our Script Runner Step to execute the scripts based the defined path.