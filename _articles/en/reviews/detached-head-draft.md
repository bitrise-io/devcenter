---
tag: []
title: detached head draft
redirect_from: []
summary: ''
published: false

---
Build failures can stem from how a build is started and how git works.

If you start a build manually and you only specify a branch, then `git-clone` will clone that branch.

But if you use webhooks to automatically trigger builds on code changes, [bitrise.io](https://www.bitrise.io/) will send the **commit hash** of the commit which triggered the build and **Git Clone** will clone that specific commit.

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

## About detached HEAD

In the case of the `detached HEAD` state, you can't commit and push directly without checking out a branch first. As the above log message describes, you can create commits, but if you’re not on a branch (`detached HEAD` is not a branch) you won’t be able to push the commits.

### Solution

The git log actually includes the solution for the issue too. You can get back to a branch by `git checkout -b BRANCH`. You could also `git checkout BRANCH` before committing and pushing changes. Please bear in mind that if you chose this option, you might commit on a different state of the code than what was built/tested during the build.

{% include message_box.html type="example" title="Example" content="Imagine the following use case: you push code to `feature/a`, which starts a build on [bitrise.io](https://www.bitrise.io/) with that specific commit. Then you quickly push another commit to `feature/a` which starts another build. If the second commit lands before the first build would get to do a `git checkout BRANCH`, then `git checkout feature/a` might point to the second commit instead of the first one, as `feature/a` now has a new commit. You can fix this by doing `git checkout -b my_temp_bump_branch` and then `git merge` the `my_temp_bump_branch` into the source branch (which was `feature/a` in this example).

When it comes to `git checkout` in general, you also have to be careful which branch you check out. For example, if the build was started by `feature/a`, you should check out that branch instead of a hardcoded one (for example, a master branch). Learn how to get the build’s branch through the `BITRISE_GIT_BRANCH` [env var](/builds/available-environment-variables/)."%}

### Testing git checkout locally

A webhook triggered build (when a commit hash is available) is similar to doing a

    git checkout COMMITHASH

while if the build is started without a commit hash, only with a branch parameter, that’s similar to

    git checkout BRANCH

You can test both on your own Mac and see what you have to do to make the tool you use  work with the `git checkout COMMITHASH` case.

{% include message_box.html type="important" title="Skipping a commit" content="If you push back the generated version bump commit, and you have a webhook which starts a build on [bitrise.io](https://www.bitrise.io/) for code changes, that push will also start a build, leading to a potential infinite build cycle! You can fix this by using the [Skip CI](/builds/triggering-builds/skipping-a-given-commit-or-pull-request/#skipping-a-commit) feature and skip the auto-generated commit."%}

## Incrementing the version number 

### Manually in the code

You can bump the version number manually, treating it just like any other code change (creating a Pull Request too), as we believe version numbers should mean something and are part of the code. In this case we use the `BITRISE_BUILD_NUMBER` as the build number in the app, which does not require committing it into the code and this way you can link every build of the app to the build on [bitrise.io](https://www.bitrise.io).

{% include message_box.html type="note" title="Managing version and build numbers" content=" iOS apps have both a version number and a build number info. You can manage the version number manually, and set the build number automatically, to the `BITRISE_BUILD_NUMBER`, for example, with the [Set Xcode Project Build Number](https://www.bitrise.io/integrations/steps/set-xcode-build-number) Step. "%}

This solution is the easiest to setup and manage, and it’s probably the best for app type projects and projects where you do periodic releases (weekly, monthly, …), but you don’t do multiple daily production deploys.

### Using git tags for versioning

If you don't want to store the version in the code directly, you can use git tags for versioning, which does not require a commit to be pushed, only `git tag x.x.x && git push origin tags/x.x.x` (this is mainly for web projects with continuous deployment, where a version number wouldn’t mean much in the code.)

## Auto-generating a commit

Or when we do auto-generate a commit for the version bump we use Skip CI to not to trigger another build. But we only do this after careful configuration, and we usually don’t start with this setup. To do this we also use GitHub’s protected branches feature enabling pretty much every protection feature they have (for example, that every Pull Request have to be up to date with “master” before it could be merged) and carefully configuring the flow (who can push to where, required code reviews, etc.). Once configured this can work really well for continuous delivery (e.g. we use this for the main bitrise.io server), but the configuration takes quite some time and experimenting, to allow your team to deploy frequently and without worrying, while ensuring code consistency.

* This or the tag based solution are usually required when you do production deploys multiple times a day, as there you most likely don’t really care about the meaning of the version number, it’s more for identification and less for declaring (external) compatibility (\~SemVer 1), users usually can’t even see this version number. We ensure external compatibility (e.g. the API) through tests, and that does not require SemVer type versioning. We use this type of versioning for our bitrise.io web servers (which we do CI/CD on bitrise.io of course), where it’s quite common to have 10+ daily production releases.