---
title: Creating your own Bitrise project scanner
date: 2018-11-27 14:30:32 +0000
redirect_from: []
published: false

---
The project scanner is a tool that identifies the given project's type and generates a basic Bitrise configuration. Each supported project type has its own scanner: these scanners are stored as separate packages.

When adding a new project on the website or initializing a project on your own machine, the [bitrise-init](https://github.com/bitrise-core/bitrise-init) tool iterates through every scanner, calls the scanner interface methods on each of them and collects their outputs. Based on these outputs, a basic configuration is generated.

The possible workflows are described in a scan result model, such as this:

```
options:
  DETECTED_PLATFORM_1: OptionModel
  DETECTED_PLATFORM_2: OptionModel
  ...

configs:
  DETECTED_PLATFORM_1:
    CONFIG_NAME_1: ConfigModel
    CONFIG_NAME_2: ConfigModel
    ...
  DETECTED_PLATFORM_2:
    CONFIG_NAME_1: ConfigModel
    CONFIG_NAME_2: ConfigModel
    ...
  ...

warnings:
  DETECTED_PLATFORM_1:
  - "warning message 1"
  - "warning message 2"
  ...
  DETECTED_PLATFORM_2:
  - "warning message 1"
  - "warning message 2"
  ...
 ```
 
- Every platform scanner writes its possible options, configurations and warnings into this model. These will be translated into step input values by choosing the desired values for the given options. 

- Every option chain’s last option selects a configuration. 

- Warnings display the issues with the given project setup.