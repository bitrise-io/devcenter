Storing the build configuration (`bitrise.yml`) in your repository can be a great idea.
It has its own PROs and CONs of course, so you have to decide it yourself
whether this solution is a good fit for your project or not.

## Things to keep in mind!

You can find a discussion about what are the advantages and
disadvantages of this approach [on GitHub](https://github.com/bitrise-io/bitrise.io/issues/41).
To highlight a few things to keep in mind if you'd want to store and use
the `bitrise.yml` from your repository:

### Trigger Map is better to be managed on bitrise.io

You can of course store the `trigger_map` (or `Triggers` on the web UI)
in your repository (in `bitrise.yml`), but if you do that you'll lose
the ability to _ignore_ patterns. This is because [bitrise.io](https://www.bitrise.io)
have to evaluate the Trigger map __before__ the repository would be cloned
in order to be able to avoid starting a build based on the Trigger map.

The source code is never stored on [bitrise.io](https://www.bitrise.io),
(see [Code Security - Source code](/getting-started/code-security/#source-code) for more information),
so if you store the trigger map in your repository, the only way to check it
is to clone it first. Even if you prepare your `trigger_map` in your repository to ignore
patterns, [bitrise.io](https://www.bitrise.io) will start a build to clone
the repository, before it could abort it.

In contrast, if you specify the Trigger Map on [bitrise.io](https://www.bitrise.io),
you can ignore patterns in a way that it won't even start a build.

### You can't change the build configuration of a commit

If you use the `bitrise.yml` from the repository, that means that when you
rebuild a specific commit, it will use the same `bitrise.yml` every time,
the one stored in the repository for that git commit.

_The only way to change the configuration_ is to checkout the related
branch, change the `bitrise.yml`, commit the changes,
push and start a __new__ build (rebuild of a commit won't work,
that will always get the same `bitrise.yml`, the one stored at the commit).

__If you store your build configuration on [bitrise.io](https://www.bitrise.io)__
you can always rebuild any commit with a new build configuration,
_the configuration is not tied to the commit / state of the repository_.
You can simply change a parameter and hit "rebuild", the new build
will use the latest configuration from [bitrise.io](https://www.bitrise.io).


## Example to use bitrise.yml from the repository

There are quite a few ways to accomplish this, as all you need is:

1. Define a "wrapper" build config on [bitrise.io](https://www.bitrise.io),
   which defines how and from where your `bitrise.yml` will be retrieved.
   E.g. you could store the `bitrise.yml` in a [GitHub Gist](https://gist.github.com)
   too, not just in your repository. In this example we'll use the configuration
   from the repository, so the "wrapper" configuration on [bitrise.io](https://www.bitrise.io)
   will define how the repository should be retrieved. Note: this also allows
   more customization, for example if the repository have to be accessed through
   a VPN, you can configure that in the "wrapper" config and it will work.
1. Run the build configuration (`bitrise.yml`) with the [Bitrise CLI](https://www.bitrise.io/cli).
   This is the same runner which runs any other build on the [bitrise.io](https://www.bitrise.io)
   build virtual machines, so it's always preinstalled and ready to be used.

The example here is really simple to setup, should work in most cases (unless
you need a VPN for cloning the repository for example), but __it also requires
you to maintain the Trigger Map on [bitrise.io](https://www.bitrise.io) instead
of in the repository__, as that is the recommended solution.
