---
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
summary: ''
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

## Exiting a build triggered by draft PR

When you use the [draft PR function of GitHub](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#draft-pull-requests), Bitrise inserts a `GITHUB_PR_IS_DRAFT` Environment Variable into the build Environment Variable list. If this Env Var is available in your build Env Var list, its value is always set to `true`.

You can spot the `GITHUB_PR_IS_DRAFT` Env Var in your build and abort the build immediately to save concurrencies/credits in two ways:

- If you insert below script command into a **Script** Step, the command will catch the draft PR Env Var if it is defined and the build will fail.

    #!/usr/bin/env bash
    # fail if any commands fails
    set -e
    # debug log
    set -x
    
    if [[ -z "${GITHUB_PR_IS_DRAFT}" ]]; then
         echo 'Not a draft PR'
    else
         exit 1
    fi

- If you wish to rather run an empty green build super quickly, we recommend that you insert this script `run_if: '{{enve _"GITHUB_PR_IS_DRAFT" ""}}' to each Step in your Workflow to skip the Steps.

    workflow1:
        steps:
        - script@1:
            run_if: '{{enveq "GITHUB_PR_IS_DRAFT" ""}}'
            inputs:
            - content: |-
                #!/usr/bin/env bash
                # fail if any commands fails
                set -e
                # debug log
                set -x

{% include banner.html banner_text="Skip a commit or pull request" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}