---
tag: []
title: Verified Steps
changelog: ''
last_modified_at: 
new_article: false
redirect_from: []
summary: ''
published: false

---
## What are Verified Steps?

A Step contains the code that performs a specific build task. Bitrise has over 200 Steps in its Step Library (StepLib) which third party companies can enrich with Steps based on their services/tools. This means they have full power to roll out updates to the Step while Bitrise maintains an overlaying control to ensure service quality and security.

A Verified Step means that the service’s or tool’s owner guarantees secure, maintained, consistent, and high-quality performance for any Bitrise user. Our official Bitrise Steps are maintained by us, whereas our Community Steps are maintained by the community. It’s easy to decide which type a Step falls into on our GUI.

* Verified Steps are labeled with a blue badge in [bitrise.io](http://bitrise.io/ "http://bitrise.io").
* Official Bitrise Steps are labeled with a green badge.
* Community created Steps do not have any badge.

In this guide we explain how to get your Step verified by Bitrise.

{% include message_box.html type="important" title="Requirements" content="

* Your company must be the owner of the service or tool used by the Step to apply for the Verified badge.
* Your Step must comply with our \[Service Level Agreement (SLA)\](link missing).

We strongly recommend that you consult with our [Step development ](https://devcenter.bitrise.io/contributors/create-your-own-step/ "https://devcenter.bitrise.io/contributors/create-your-own-step/")guidelines before creating a Step."%}

## Applying for a Verified badge

1. Create the Step based on our [Step development guideline](https://devcenter.bitrise.io/contributors/create-your-own-step/ "https://devcenter.bitrise.io/contributors/create-your-own-step/"). The Step’s repository must be on GitHub.
2. Share your Step in our bitrise-steplib.
Connect your account to preview links.
3. Open a new StepLib PR.
4. When the CLAassistant prompts, you sign our Contributor License Agreement. Until this is not completed, merge is blocked on the PR.
5. Send an email to [letsconnect@bitrise.io](mailto:letsconnect@bitrise.io "mailto:letsconnect@bitrise.io") to contact our Partner Management Team. In your email provide a brief summary on what specific problem your service solves, and how many customer you have on Bitrise.

If at any stage of the process you wonder what happens with a Step candidate that is already covered by another Step in our StepLib, keep reading.