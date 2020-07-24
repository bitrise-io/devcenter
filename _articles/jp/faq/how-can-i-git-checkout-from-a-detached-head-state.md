---
changelog: 
last_modified_at: 
tag: []
title: How can I git checkout from a detached head state?
redirect_from: []
description: ''
menu:
  faq:
    weight: 19

---
{% include not_translated_yet.html %}

## Build failures due to detached head

Builds can fail due to many reasons, and one of those is related to how a build is started and how Git works.

If you start a build manually and you only specify a branch, then `git clone` will clone that branch.

If, however, you use webhooks to automatically trigger builds on code changes, a repo host will send the commit hash of the commit which triggered the build webhook and `git-clone` will clone that specific commit. This would put the local git instance into detached head state.

Let's test this locally with a `git checkout COMMITHASH`.

    $ git checkout 6415740f2e73d65eb85969324d6d66f9a36bc70f
    
    Note: checking out '6415740f2e73d65eb85969324d6d66f9a36bc70f'.
    
    You are in 'detached HEAD' state. You can look around, make experimental
    changes and commit them, and you can discard any commits you make in this
    state without impacting any branches by performing another checkout.
    
    If you want to create a new branch to retain commits you create, you may
    do so (now or later) by using -b with the checkout command again. Example:
    
      git checkout -b <new-branch-name>
    
    HEAD is now at 6415740... commit message

As you can see from the command's log, now you are in a detached head state, meaning the head is NOT pointing to the tip of the current branch but to your COMMIT OBJECT. This means you are not on any branch, therefore, you can't push commits to any branch either at this stage. What you can do in a detached head state is:

* Creating commits.
* Checking if tests have successfully run in this code version.

So to be able to commit and push DIRECTLY TO A BRANCH, you'll have to check out a branch first. Let's see how!

## Solution

The above error message suggests a solution for getting back to a branch from the detached head state. You can get back to a branch by simply check out that branch with `git checkout -b BRANCH`. You could also check out that branch (`git checkout BRANCH`) before committing and pushing your changes. Please bear in mind that if you chose this option, you might commit on a different state of the code than what was built/tested during the build.

{% include message_box.html type="example" title="Quick example" content="Imagine the following use case: you push code to `feature/a`, which starts a build on [bitrise.io](https://www.bitrise.io/) with that specific commit. Then you quickly push another commit to `feature/a` which starts another build. If the second commit lands before the first build would get to do a `git checkout BRANCH`, then `git checkout feature/a` might point to the second commit instead of the first one, as `feature/a` now has a new commit. You can fix this by doing first a `git checkout -b my_temp_bump_branch` and then `git merge` the `my_temp_bump_branch` into the source branch (which was `feature/a` in this example).

When it comes to `git checkout` in general, you also have to be careful which branch you check out. For example, if the build was started by `feature/a`, you should check out that branch instead of a hardcoded one (for example, a master branch). Learn how to get the build’s branch through the `BITRISE_GIT_BRANCH` [Env Var](/builds/available-environment-variables/)."%}

### Testing git checkout locally

Let's try out the above locally.

A build triggered by a webhook (when a commit hash is available) is similar to doing a

    git checkout COMMITHASH

This is how the build log will look like

    - RepositoryURL: git@github.com:zoltan-baba/sample-apps-react-native-ios-and-android.git
    - CloneIntoDir: /Users/vagrant/git
    - Commit: 4d31f45eb2db037f0143f509872a619f9aac8c09
    - Tag: 
    - Branch: testing
    - BranchDest: 
    - PRID: 0
    - PRRepositoryURL: 
    - PRMergeBranch: 
    - ResetRepository: false
    - CloneDepth: 0
    - BuildURL: https://app.bitrise.io/build/349008b006272cac
    - BuildAPIToken: [REDACTED]
    - UpdateSubmodules: true
    - ManualMerge: true
    git "init"
    Initialized empty Git repository in /Users/vagrant/git/.git/
    git "remote" "add" "origin" "git@github.com:zoltan-baba/sample-apps-react-native-ios-and-android.git"
    git "fetch"
    Warning: Permanently added 'github.com,192.30.253.113' (RSA) to the list of known hosts.
    From github.com:zoltan-baba/sample-apps-react-native-ios-and-android
     * [new branch]      master     -> origin/master
     * [new branch]      testing    -> origin/testing
    git "checkout" "4d31f45eb2db037f0143f509872a619f9aac8c09"

If the build is started without a commit hash, only with a branch parameter, that’s similar to:

    git checkout BRANCH
    
    - RepositoryURL: git@github.com:BanyikAnna/sample-apps-react-native-ios-and-android.git
    - CloneIntoDir: /Users/vagrant/git
    - Commit: 
    - Tag: 
    - Branch: master
    - BranchDest: 
    - PRID: 0
    - PRRepositoryURL: 
    - PRMergeBranch: 
    - ResetRepository: false
    - CloneDepth: 0
    - BuildURL: https://app.bitrise.io/build/0be5f085fb1d8d4d
    - BuildAPIToken: [REDACTED]
    - UpdateSubmodules: true
    - ManualMerge: true
    git "init"
    Initialized empty Git repository in /Users/vagrant/git/.git/
    git "remote" "add" "origin" "git@github.com:BanyikAnna/sample-apps-react-native-ios-and-android.git"
    git "fetch" "origin" "master"
    Warning: Permanently added 'github.com,140.82.114.3' (RSA) to the list of known hosts.
    From github.com:BanyikAnna/sample-apps-react-native-ios-and-android
     * branch            master     -> FETCH_HEAD
     * [new branch]      master     -> origin/master
    git "checkout" "master"

You can test both on your own machine and see what you have to do to make the tool you use  work with the `git checkout COMMITHASH` case.

## Version number management

Managing version numbers is important if you'd like to deploy an app to a marketplace. In this section we'll give you some tips on how to go about incrementing your build's version number if your branch is currently on a detached head state.

### Incrementing the version number manually

This solution is the easiest to set up and manage, and works best for app type projects and projects where you release periodically (for example, weekly, monthly), but you don’t do multiple daily production deploys.

You can bump the version number manually, treating it just like any other code change. In this case, we use the `BITRISE_BUILD_NUMBER` Env Var as the build number in the app, which does not require committing it into the code and this way you can link every build of the app to the build on [bitrise.io](https://www.bitrise.io).

{% include message_box.html type="note" title="Managing version and build numbers for iOS" content=" iOS apps have both a VERSION NUMBER and a BUILD NUMBER info. You can manage the version number manually, and [set the build number automatically](/builds/build-numbering-and-app-versioning/#setting-the-cfbundleversion-and-cfbundleshortversionstring-of-an-ios-app), to the `BITRISE_BUILD_NUMBER`, for example, with the [Set Xcode Project Build Number](https://www.bitrise.io/integrations/steps/set-xcode-build-number) Step. "%}

### Using git tags for versioning

If you don't want to store the version in the code, you can use git tags for versioning. It doesn't require a commit to be pushed, only `git tag x.x.x && git push origin tags/x.x.x`.

This method suits web projects with continuous deployment the most, where a version number wouldn’t mean much in the code.

### Auto-generating a commit

As discussed above, you cannot push code if you are in detached head state. In this case you can auto-generate a commit to increase the version number AND use our [Skip CI](/builds/triggering-builds/skipping-a-given-commit-or-pull-request/) feature which will prevent a build from being triggered.

{% include message_box.html type="important" title="Skipping a commit" content="If you push back the generated version bump commit, and you have a webhook which starts a build on [bitrise.io](https://www.bitrise.io/) for code changes, that push will also start a build, leading to a potential infinite build cycle! You can fix this by using the [Skip CI](/builds/triggering-builds/skipping-a-given-commit-or-pull-request/#skipping-a-commit) feature and skip the auto-generated commit."%}

{% include message_box.html type="warning" title="Careful with auto-generating a commit" content="We recommend careful configuration, for example, who can push to where, required code reviews, before applying this method. You can also use GitHub’s protected branches feature enabling every protection feature they have (for example, every Pull Request has to be up to date with the master branch before it could be merged). Once properly configured, this solution can work really well for continuous delivery. On the downside, please note, the configuration takes quite some time and effort while ensuring code consistency."%}