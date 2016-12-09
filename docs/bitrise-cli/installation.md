Installing the Bitrise CLI is super simple.

The Bitrise CLI is distributed as a single binary, so
you just have to download this binary file, make it executable,
and run `bitrise setup` to download all the core plugins
and tools required for running a build.

_If you'd forget to run `bitrise setup` that's not an issue either,
the first time you run `bitrise run` it will perform the `setup`
if it was not performed for the current version of the CLI yet.
`bitrise setup` can be called any time to validate the CLI installation._

Upgrading the CLI works exactly the same way: just download the
new binary (overwrite the previous binary), make it executable
and run `bitrise setup` (or the next `bitrise run` will run it
automatically).

You can download the release binary on GitHub from the CLI's
[releases](https://github.com/bitrise-io/bitrise/releases) page.
Every release includes copy paste ready `curl` commands
to install the specific version.

The CLI is also available in [brew](http://brew.sh/) on macOS, so it can be installed with

```
brew update && brew install bitrise
```

if you have Homebrew installed on your Mac.

You can find more information about the installation in the
[Install and Setup section of the CLI's README](https://github.com/bitrise-io/bitrise#install-and-setup).
