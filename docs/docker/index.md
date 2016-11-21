[Docker](https://www.docker.com/) is an ideal tool to create, use and share custom environments,
as well as to provide a lightweight way to do builds in emphemeral environments (where
the environment is destroyed after the build, and a new one is created when the next build starts).

Unfortunately Docker can only be used to __run__ Linux __guest__ systems right now,
and since Windows Server 2016 it's now possible to run Windows docker containers (guest system)
but only from Windows Server 2016 and on Windows 10 with Anniversary Update.

Docker can be installed on Linux, macOS and Windows, but the environment (container)
it runs can only be Linux (and Windows, on Windows Server 2016 and on Windows 10 with Anniversary Update).
Linux containers (guest) can run on all platforms where you can install `docker` (Linux, Windows, macOS, ...).

_This is why our Android/Linux environment is provided as a docker image, but not our macOS Stacks._

Our Linux/Android stacks have full `docker` support, which means that you can run
any `docker` command during the build, and when a build runs on a Linux/Android
stack, the build actually runs inside a docker container (but, for security,
every Linux/Android build gets its own Virtual Machine too, in which the build
runs in a docker container).

_It is possible to set a custom docker image for your builds if you select the Linux/Android
stack, on the app's Bitrise.io page, on the `Settings` tab,
__but in most cases you should not change this image__,
instead you should run `docker` commands yourself during the build, e.g. using a `Script` step._

For more Docker related information see the sub sections.
