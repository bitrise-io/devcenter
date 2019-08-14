---
tag: []
title: bitrise.yml size limitation notes
redirect_from: []
summary: ''
published: false

---
If you get the above error message when editing your workflow, it means the bitrise.yml size is too large. 

    Error saving! Error saving app config: Validation failed: App config validation 784: unexpected token at 'Argument list too long - bin/bitrise

Here are the actual size limitations:

* `bitrise.yml`'s max size is 200KB
* `bitrise.secrets.yml`'s max size is 100KB

Here are a couple of workarounds to reduce a long `bitrise.yml`.

* Separating a project into two apps.
* Keeping the .yml in the repository.
* Never use Environment Variables as configuration files, store it in the repo or upload it as a file.
* Move scripts (especially long scripts) into their repo, and use the script runner step to use them based on path.