If you want to skip a specific commit, to not to start a build,
all you have to do is to include either `[skip ci]` or `[ci skip]`
in the commit message.

For example, the commit message:

```
This is not important, please [skip ci]
```

won't start a build, nor will:

```
I just changed the README

[ci skip]
```


!!! warning "Only the head/last commit message is checked!"
    __If you push more than one commit__, only the last ("head") commit's
    message will be checked for the skip ci pattern!

If you'd decide that you still want to start a build you'll have to
either rebase that commit (e.g. just change its commit message), or push another commit.

!!! note "You can push an empty commit"
    Git allows to create and push empty commits, so if you'd decide that you
    still want to build a skipped build you can do `git commit --allow-empty -m "I decided to run this"`
    on the related branch and push the commit.

## Pull Requests

Skip CI works for Pull Requests too, but a little bit differently, due to how Pull Requests are
handled on the git source code hosting services.

In short, what you have to know is that Pull Requests are virtual/temporary "commits" / "branches".
In case of GitHub there's actually a pull request related "virtual branch" (ref), which, if you know
its name, you can `fetch` through `git` (if you add the related `refs/` to your git `fetch` config).
This "branch" (ref) is also removed / made unaccessible after you close the pull request.
Other services like Bitbucket doesn't even create this virtual branch / ref, the pull request is just
a virtual data but can't be accessed through `git` directly.

!!! note "What's the commit message of a Pull Request?"
    In any case this means that __the Pull Request itself__ is treated as a (virtual) commit,
    where __the commit message is the title + description of the Pull Request__ and
    not the commit(s) of the pull request!

This means that, __if you want to skip a pull request__, you have to include the Skip CI
pattern __in the Pull Request's title or description__, and not in the commit's message!

__Once you decide to not to skip the Pull Request / more commits in the pull request__
you can simply remove the
Skip CI pattern from the Pull Request's title or description, which should automatically
trigger a new build with the latest commit, and all future commits of the pull request
will be built too (unless you add a Skip CI pattern again).
