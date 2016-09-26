## Technical note

Ruby GEMs are installed into a single directory by default. You can get the location of this directory
with `gem environment gemdir`. If you want to change this directory you can set the `$GEM_HOME` environment variable,
this will be picked up by `gem install` and it'll install the GEMs to the location specified by `$GEM_HOME`.

Now that you know where the Ruby GEMs are stored you can easily cache the directory. As in any other previous case you need two steps:

1. put the `Cache:Pull` step after the `Git Clone`
2. put the `Cache:Push` step to the very end of the Workflow
3. You can now just select the `Cache:Push` step and add the Ruby GEM home directory to the Cache Paths input.

!!! warning
    You can't just add `gem environment gemdir` to the input as you can only reference
    Environment Variables in the inputs directly,
    and `$GEM_HOME` is not set by default on the Bitrise.io VMs.

There are two simple solutions for this issue:

* Set `GEM_HOME` as an App Env Var to, let's say, `$HOME/.gem`.
* Add a `Script step` to your workflow and set the `$GEM_HOME` environment variable there

The second option is usually more error proof as you don't change the location of gem home,
you just set the environment variable to the path where it's located.

## Example workflow
```yml
example:
  steps:
  - script:
      title: GEM_HOME
      inputs:
      - content: |-
          #!/bin/bash
          set -ev

          envman add --key GEM_HOME --value "$(gem environment gemdir)"
  - git-clone: {}
  - cache-pull: {}

  # ... Add your steps here.
  # You can `gem install` Ruby gems with Script steps here too,
  # just make sure it's between the `cache-pull` and `cache-push` steps.

  - cache-push:
      inputs:
      - cache_paths: |-
          $GEM_HOME
```
