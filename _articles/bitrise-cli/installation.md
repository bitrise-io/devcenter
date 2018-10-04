---
title: Installing and updating the Bitrise CLI
menu:
  bitrise-cli:
    weight: 2

---
Installing the Bitrise CLI is super simple. It is distributed as a single binary which you can acquire in several ways. All you need to do is download it and make it executable. Let's see how!

### Installing the Bitrise CLI with curl

1. Run the following command in a bash shell:

    ``` bash
    curl -fL https://github.com/bitrise-io/bitrise/releases/download/1.21.0/bitrise-$(uname -s)-$(uname -m) > /usr/local/bin/bitrise
    ```
    You can check the latest release of the Bitrise CLI on its [releases](https://github.com/bitrise-io/bitrise/releases) page.

1. Make the downloaded binary executable:

    ``` bash
    chmod +x /usr/local/bin/bitrise
    ```

1. Run `bitrise setup`. This will verify if everything that is required for Bitrise to run is installed and available. If you skip this, the CLI will perform the setup anyway the first time you call `bitrise run`.

In any case, `bitrise setup` can be called at any time to validate the installation.

### Installing the Bitrise CLI with Homebrew

If you have the `Homebrew` package manager installed on your Mac, you can use it to install the Bitrise CLI!

1. Open the `Terminal` app on your Mac and run:

    ``` bash
    brew update && brew install bitrise
    ```

1. Run `bitrise setup`. This will verify if everything that is required for Bitrise to run is installed and available. If you skip this, the CLI will perform the setup anyway the first time you call `bitrise run`.

### Updating the Bitrise CLI

Updating the Bitrise CLI is super easy, and it doesn't matter if you installed it with Homebrew or from the GitHub release.

Simply run `bitrise update` - that's it! The CLI checks for updates once every day and notifies you as soon as there is a new version.