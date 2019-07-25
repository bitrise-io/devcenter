---
tag: []
title: detached head draft
redirect_from: []
summary: ''
published: false

---
It’s not related to users at all, it’s related to how you start the build and to how `git` works.

If you start a manual build and you **only** specify a **branch**, then **Git Clone** will clone that branch.

But if you use webhooks to automatically trigger builds on code changes, [bitrise.io 5](https://www.bitrise.io/) will send the **commit hash** of the commit which triggered the build and **Git Clone** will “clone” that specific commit.

You can test this locally, if you do `git checkout COMMITHASH` you’ll get:

    $ git checkout 6415740f2e73d65eb85969324d6d66f9a36bc70f
    
    Note: checking out '6415740f2e73d65eb85969324d6d66f9a36bc70f'.
    
    You are in 'detached HEAD' state. You can look around, make experimental
    changes and commit them, and you can discard any commits you make in this
    state without impacting any branches by performing another checkout.
    
    If you want to create a new branch to retain commits you create, you may
    do so (now or later) by using -b with the checkout command again. Example:
    
      git checkout -b <new-branch-name>
    
    HEAD is now at 6415740... commit message
    

Now, the thing about the `detached HEAD` state is that you **can’t commit & push directly**, without checking out a branch first. You can create commits, but if you’re not on a branch (`detached HEAD` is not a branch, in this state you’re not on any branch) you won’t be able to push the commit.

The git log actually includes the solution for the issue too: you can “get back to a branch” by `git checkout -b BRANCH`. Alternatively you could `git checkout BRANCH` **before** commit & push, to switch to a branch **before** you’d do your changes. **Beware**, if you do this you might commit on a different state of the code than what was build/tested during the build!

Imagine this: you push code to `feature/a`, which starts a build on [bitrise.io 5](https://www.bitrise.io/) **with that specific commit**, then you quickly push another commit to `feature/a` which starts another build. If the second commit lands before the first build would get to do a `git checkout BRANCH`, then `git checkout feature/a` might actually point to the second commit instead of the first one, as `feature/a` now has a new commit! You could possibly fix this by doing `git checkout -b my_temp_bump_branch` and then `git merge` the `my_temp_bump_branch` into the source branch (`feature/a` in the example).

You also have to be careful which branch you checkout, e.g. if the build was started by `feature/a` you should checkout that branch and not a hardcoded one (e.g. master)! You can get the build’s branch through the `BITRISE_GIT_BRANCH` env var ([http://devcenter.bitrise.io/faq/available-environment-variables/](http://devcenter.bitrise.io/faq/available-environment-variables/ "http://devcenter.bitrise.io/faq/available-environment-variables/")[ 7](http://devcenter.bitrise.io/faq/available-environment-variables/)).

In any case, this is how `git` works, so you can test this locally too. A webhook triggered build (when a commit hash is available) is similar to doing a

    git checkout COMMITHASH
    

while if the build is started without a commit hash, only with a branch parameter, that’s similar to

    git checkout BRANCH
    

You can test both on your own Mac and see what you have to do to make the tool you use to work with the `git checkout COMMITHASH` case.

**One more important note:** if you push back the generated version bump commit and you have a webhook which starts a build on [bitrise.io 5](https://www.bitrise.io/) for code changes, **that push will also start a build**, leading to a potential infinite build cycle! You can fix this by using the [Skip CI 32](http://devcenter.bitrise.io/tips-and-tricks/skip-a-build/) feature, to skip this auto generated commit.