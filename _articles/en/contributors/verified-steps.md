---
tag:
- " contributors"
- " bitrise.yml"
- " workflows"
- steps
title: Verified Steps
changelog: Learn how to get a Verified Step badge on your Step once you have shared
  it in our Bitrise Step Library.
last_modified_at: '2020-05-19T22:00:00.000+00:00'
redirect_from: []
summary: Learn how to get a Verified Step badge on your Step once you have shared
  it in our Bitrise Step Library.
menu:
  contributors-main:
    weight: 8

---
## What are Verified Steps?

A Step contains the code that performs a specific build task. Bitrise has over 300 Steps in its [Step Library (StepLib)](https://github.com/bitrise-io/bitrise-steplib) which third party companies or open source teams can enrich with Steps based on their services/tools. This means they have full power to roll out updates to the Step while Bitrise maintains an overlaying control to ensure service quality and security.

A Verified Step means that the owner of a service or tool or an open source team guarantees secure, maintained, consistent, and high-quality performance for any Bitrise user. Our official Bitrise Steps are maintained by us, whereas our Community Steps are maintained by the community. It’s easy to decide which type a Step falls into on our GUI.

* Verified Steps are labeled with a blue badge in [Bitrise](http://bitrise.io/).
* Official Bitrise Steps are labeled with a green badge.
* Community created Steps do not have any badge.

![{{ page.title }}](/img/verifiedsteplist.jpg)

In this guide we explain how to get your Step verified by Bitrise.

{% include message_box.html type="important" title="Requirements" content="

* For company owned services and tools: Your company must be the owner of the service or tool used by the Step to apply for the Verified badge.
* For open-source services or tools: If you are a member of an open source or other informal team, please confirm with the rest of the team that you may sign this for yourself and that it applies to the Steps you are submitting for the team.
* Your Step must comply with our [Service Level Agreement](/contributors/verified-steps/#service-level-agreement-for-verified-step-authors).
* Your Step must have its own Step icon.
* You must include a Workflow Recipe to a Step to become a Verified Step.

We strongly recommend that you consult with our [Step development](/contributors/create-your-own-step/) guidelines before creating a Step."%}

### What is a Workflow Recipe?

A Workflow Recipe is a template that anyone submitting a Step to Bitrise must put together when applying for the Verified Step badge. You can develop a Step and decide not to include a Workflow Recipe, but to turn your Step into a Verified one, you have to submit a Workflow Recipe as well.

Workflow Recipes are published on [Bitrise](http://bitrise.io) where our Bitrise community can learn how the Verified Step can be used in a specific setup.

Should you have questions, please turn to our partnership team at [partners@bitrise.io](mailto:partnerships@bitrise.io).

## Promoting your Verified Step

As part of the Verified Step Program, you must commit to taking part in one or more than one of the following co-marketing activities:

* In-app messaging.
* Dedicated co-branded email campaign, or newsletter mention.
* Blog post content.
* How-to article, documentation, or help center page.
* Social media activities.
* Webinars or virtual events.
* Podcasts.
* Events (panels, fireside chats, video testimonials, or sponsorship).
* Case study/whitepaper/ebook/ (shared research, testimonials, co-writing a chapter, publishing on each others' blogs).
* Video content posted on our public YouTube channel.
* Joint PR campaigns.

These co-marketing opportunities enable you to increase your product’s content generation output, grow  go-to-market plans, and help to drive integration adoption.

You can consult with your Bitrise Partner Manager ([partners@bitrise.io](mailto:partnerships@bitrise.io)) to confirm which co-marketing activities you can do, clarifying what level of involvement you will want to do based on your marketing plans. There can be many interested in a single co-marketing event so your involvement is managed on a first-come, first-serve basis.

## Applying for a Verified badge

1. Create the Step based on our [Step development guideline](https://devcenter.bitrise.io/contributors/create-your-own-step/). The Step’s repository MUST be on GitHub.
2. Share your Step in our [bitrise-steplib](https://github.com/bitrise-io/bitrise-steplib) and fill out the New Pull Request Checklist.
3. When the **CLAassistant** prompts you, sign our Contributor License Agreement. Until this is not completed, merging is blocked on the PR.

   ![{{ page.title }}](/img/cla.jpg)

   ![{{ page.title }}](/img/checklist.jpg)
4. Please fill out our [Partnership Form](https://bitrise.typeform.com/to/YnY8KftK)!

Once you submitted the form, our Partner Management Team will contact you within 5 business days to discuss the rest of the process.

If at any stage of the process you wonder what happens with a Step candidate that is already covered by another Step in our StepLib, head over to [How do we go about Step duplications](/contributors/verified-steps/#how-do-we-go-about-step-duplications)?

## Service level agreement for Verified Step authors

Anyone can contribute to a Verified Step which is already part of our StepLib by creating an issue or a pull request (PR). The Verified Step author has to manage the contribution (for example, issue, PR, or any maintenance such as third-party system changes) from start to finish. Bitrise monitors open issues and PRs created for Verified Steps and contacts the Verified Step authors if those contributions are not handled. If the Verified Step author fails to manage the contribution as described in our Contributor License Agreement and this SLA, Bitrise withdraws the Verified badge from the Step. This is to ensure Verified Steps in our StepLib are always of high quality and meet Bitrise users' expectations.

### Managing contributions

The following guidelines aim to help Verified Step authors categorize contributions. The Verified Step author is responsible for any contribution made to the Verified Step. The Verified Step author acknowledges the contribution by adding a label an estimated time to perform the fix, and merge the PR. There are four labels the author can use to categorize the type of contribution:

* `critical-bug` label means that the current feature set has abnormal behavior, which blocks users from using the Step and there is no workaround to fix the issue. This critical bug must be fixed by the author.
* `bug` label means that the current feature set has abnormal behavior, which does not block users from using the Step and there is a workaround for the issue. This bug must be fixed by the author.
* `feature-request` label means that a new feature or Step is being requested. The Verified Step author can decide if the feature is worth implementing.
* `maintenance` label means improving the Step’s source code in a way that it does not add new features or potential bugs to the Step. The Verified Step author can decide whether the feature is worth implementing or not.
* `rejected` label means the contribution which gets rejected by the Verified Step author must be closed within the first response time, that is 5 business days. When rejecting a contribution, the Verified Step author has to provide an explanation to the contributor within the first response time.
* `accepted` contribution means that the given: critical-bug, bug, feature, maintenance will be fixed/merged within the given resolution time.

First response time means that there is a 5 day window during which the Verified Step author should respond to the contribution with the accepted or rejected labels.

Resolution time means a certain amount of business days during which the contribution (issue or PR) should be completed by the Verified Step author.

| Type | First response time | Resolution time |
| --- | --- | --- |
| critical-bug | 5 business days | 10 business days |
| bug | 5 business days | 15 business days |
| feature-request | 5 business days | 20 business days |
| maintenance | 5 business days | 20 business days |

## How do we go about Step duplications?

In general we try to keep our StepLib streamlined and avoid Step duplications for the same build task. Here you can find some questions and answers when it comes to any potential Step duplications.

* _I was going to submit a Step and apply for the Verified badge, but found out there was an official Bitrise Step for the same build task in the StepLib. What should I do?_

Submit your Step and go through the application process. Once your application is completed, we deprecate the official Bitrise Step and our users can use your new Verified Step.

* _I was going to submit a Step and apply for the Verified badge, but found out there was a Community Step for the same build task. What should I do?_

Submit your Step and go through the application process. Your new Verified Step and the Community Step will be both available in our StepLib.

* _I was going to submit a Community Step but found out there was a Verified Step for the same build task. What should I do?_

If a Verified Step is already available in our StepLib, we reject Community Step submission for the same build task to avoid Step duplication. We offer to the Community Step developer to work on future updates of the already existing Verified Step.