---
tag: []
title: bitrise.yml size limitation notes
redirect_from: []
summary: ''
published: false

---
## bitrise.yml size limitation

If you edit your workflow on bitrise.io (either in Workflow Editor or on the bitrise.yml tab) and your bitrise.yml exceeds its size limitation, the UI will display the following warning once you try to save your changes: 

    Error saving! Error saving app config: Validation failed: App config validation 784: unexpected token at 'Argument list too long - bin/bitrise

![](/img/yml-size-limit.png)

{% include message_box.html type="warning" title=".yml size limitations" content="Please note that bitrise.yml cannot exceed 200KB and a bitrise.secrets.yml cannot exceed 100KB on the UI."%}

Here are a couple of workarounds to reduce a long `bitrise.yml`:

* You could separate your project into two apps.
* You could keep the `bitrise.yml` file in the project repository and use it with Bitrise CLI. This way you will not bump into any limitation as the size limitation only affects the `bitrise.yml` on the UI.
* We don't recommend using Environment Variables as configuration files. If the Env Var is not a short key - value pair but a long script, we suggest you store it in a file in your project repository and upload the file to the UI (to Generic File Storage?).
* Move scripts (especially the long ones) into their repository, and use our Script Runner Step to execute the scripts based the defined path.