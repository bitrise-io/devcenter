---
title: Skip a build - draft
redirect_from: []
date: 2019-01-18 13:20:16 +0000
published: false

---
You can skip a specific commit or pull request on Bitrise easily. Skipping means, in this context, that a code change will NOT trigger a build on Bitrise. 

## Skipping a commit

To make sure a specific commit does not trigger a build, include either `[skip ci]` or `[ci skip]` in the commit message: 

    This is not important, please [skip ci]

    I just changed the README
    
    [ci skip]

{% include message_box.html type="warning" title="Only the head/last commit message is checked!" content="**If you push more than one commit**, only the last (head) commit's message will be checked for the skip ci pattern! "%}

If you do want to start a build after all, you have two choices:

* rebase the commit (change the commit message) 
* push another commit.

{% include message_box.html type="note" title="Push an empty commit" content=" Git allows to create and push empty commits. If you want to build a skipped build you can do `git commit --allow-empty -m \"I decided to run this\"` on the related branch and push the commit."%}

## Skipping a Pull Request

Skip CI works for Pull Requests too, but a little bit differently, due to how Pull Requests are handled on the git source code hosting services.

In short, what you have to know is that Pull Requests are virtual/temporary "commits" / "branches". In case of GitHub there's actually a pull request related "virtual branch" (ref), which, if you know its name, you can `fetch` through `git` (if you add the related `refs/` to your git `fetch` config). This "branch" (ref) is also removed / made unaccessible after you close the pull request. Other services like Bitbucket doesn't even create this virtual branch / ref, the pull request is just a virtual data but can't be accessed through `git` directly.

{% include message_box.html type="note" title="What's the commit message of a Pull Request?" content=" In any case this means that **the Pull Request itself** is treated as a (virtual) commit, where **the commit message is the title + description of the Pull Request** and not the commit(s) of the pull request! "%}

This means that, **if you want to skip a pull request**, you have to include the Skip CI pattern **in the Pull Request's title or description**, and not in the commit's message!

**Once you decide to not to skip the Pull Request / more commits in the pull request** you can simply remove the Skip CI pattern from the Pull Request's title or description, which should automatically trigger a new build with the latest commit, and all future commits of the pull request will be built too (unless you add a Skip CI pattern again).