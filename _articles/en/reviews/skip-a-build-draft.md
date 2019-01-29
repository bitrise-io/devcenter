---
title: Skip a build - draft
redirect_from: []
date: 2019-01-18 13:20:16 +0000
published: false

---
Depending on your [settings](/builds/triggering-builds/triggering-builds/), every code change in your repository can trigger Bitrise builds. However, if you need to, you can skip a specific commit or pull request. Skipping means, in this context, that a code change will NOT trigger a build on Bitrise, even if the triggers are set up to do so. 

## Skipping a commit

To make sure a specific commit does not trigger a build, include either `[skip ci]` or `[ci skip]` in the commit message: 

    This is not important, please [skip ci]

    I just changed the README
    
    [ci skip]

{% include message_box.html type="warning" title="Only the head/last commit message is checked!" content="**If you push more than one commit**, only the last (head) commit's message will be checked for the `skip ci` pattern! "%}

If you do want to start a build after all, you have two choices:

* rebase the commit (change the commit message) 
* push another commit.

{% include message_box.html type="note" title="Push an empty commit" content=" Git allows to create and push empty commits. If you want to build a skipped build you can do `git commit --allow-empty -m \"I decided to run this\"` on the related branch and push the commit."%}

## Skipping a Pull Request

Pull Requests are treated as (virtual) commits themselves, where the commit message is the title + description of the Pull Request**.** It is not the commit messages of the individual commits that make up the PR! 

If you want to skip a pull request, you have to include the `skip ci` pattern in the Pull Request's title or description, and not in the commit's message!

**Once you decide to not to skip the Pull Request / more commits in the pull request** you can simply remove the `skip ci` pattern from the Pull Request's title or description. This should automatically trigger a new build with the latest commit, and all future commits of the PR will be built too (unless you add a `skip ci` pattern again).