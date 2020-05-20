---
changelog: 
last_modified_at: 
tag:
- caching
- carthage
- ios
- builds
title: Caching Carthage dependencies
redirect_from: []
description: ''
menu:
  caching:
    weight: 11

---
{% include not_translated_yet.html %}

Carthage is a dependency manager for macOS and iOS: builds your dependencies and provides you with binary frameworks. On Bitrise, we have a dedicated Step to handle Carthage dependencies in your build, and of course you can cache these dependencies. 

## Configuring Carthage caching 

To cache Carthage dependencies:

1. Make sure you have the **Bitrise.io Cache:Pull** and **Bitrise.io Cache:Push** Steps in your Workflow.
1. Set the **Carthage command to run** input of the **Carthage** Step to `bootstrap`. 
1. Go to the **Bitrise.io Cache:Push** Step and find the **Cache paths** input. 
1. On a new line, add the path to your `Carthage directory` and indicate that it should be cached if the `Cartfile.resolved` changes: 

    `./Carthage -> ./Cartfile.resolved`

{% include message_box.html type="note" title="Carthage directory path" content="If your Carthage directory is not in the root of your repository, specify the path to the Carthage directory and to `Cartfile.resolved` relative to the root of the repository." %}