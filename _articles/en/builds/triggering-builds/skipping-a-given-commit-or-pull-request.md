---
changelog:
last_modified_at:
title: Skipping a given commit or Pull Request
redirect_from:
- "/tips-and-tricks/skip-a-build/"
date: '2019-01-18T17:09:42.000+00:00'
tag:
- git
- builds
- pull request
- triggers
description: " If you need to, you can skip a specific commit or pull request. Skipping
  means, in this context, that a code change will NOT trigger a build on Bitrise,
  even if the triggers are set up to do so."
menu:
  triggering-builds:
    weight: 13

---
Depending on your [settings](/builds/triggering-builds/triggering-builds/), every code change in your repository can trigger Bitrise builds. However, if you need to, you can skip a specific commit or pull request. Skipping means, in this context, that a code change will NOT trigger a build on Bitrise, even if the triggers are set up to do so.

## Skipping a commit

To make sure a specific commit does not trigger a build, include either `[skip ci]` or `[ci skip]` in the commit message:

    This is not important, please [skip ci]

Or:

    I just changed the README
    
    [ci skip]

{% include message_box.html type="warning" title="Only the head/last commit message is checked!" content="If you push more than one commit, only the last (head) commit's message will be checked for the `skip ci` pattern! "%}

If you do want to start a build after all, you have two choices:

* Rebase the commit (change the commit message).
* Push another commit.

{% include message_box.html type="note" title="Push an empty commit" content=" Git allows to create and push empty commits. If you want to build a skipped build you can do `git commit --allow-empty -m \"I decided to run this\"` on the related branch and push the commit."%}

## Skipping a Pull Request

Pull Requests are treated as (virtual) commits themselves, where the commit message is the title + description of the pull request. It is not the commit messages of the individual commits that make up the pull request!

If you want to skip a pull request, you have to include the `skip ci` pattern in the pull request's title or description, and not in the commit's message!

Once you decide to not to skip the pull request / more commits in the pull request, you can simply remove the `skip ci` pattern from the pull request's title or description. This should automatically trigger a new build with the latest commit, and all future commits of the pull request will be built too (unless you add a `skip ci` pattern again).

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Skip a commit or pull request</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>