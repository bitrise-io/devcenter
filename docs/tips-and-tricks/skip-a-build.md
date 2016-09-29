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
