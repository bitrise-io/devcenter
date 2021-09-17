---
tag:
- credit
- credit-based
title: Comparing credit-based and concurrency-based plans
redirect_from: []
summary: Credit-based plans offer significant quality-of-life improvements and a more
  streamlined experience over concurrency-based plans.

---
Up until now, almost all Bitrise subscriptions have been concurrency-based. [Concurrencies](/builds/builds-index/#build-concurrency) dictate how many builds you can run at the same time on Bitrise: the more concurrencies you have, the more simultaneous builds you can run. To scale up, you had to purchase more concurrencies or risk having time-critical builds being stuck in a queue.

As of August 2021, you can no longer sign up for a concurrency-based subscription plan as a new user on Bitrise. All new accounts are credit-based accounts: after [signing up](https://app.bitrise.io/users/sign_up), you can run builds using credits. You receive credits every month in credit bundles, the amount depending on your subscription plan.

{% include message_box.html type="info" title="Hobby plan and Teams plan" content="For more information about our Hobby plan and Teams plan, the two latest additions to our credit-based model, check out their relevant FAQs and our pricing page: 

* [Hobby plan FAQ](/team-management/credit-based-hobby-plan-faq/)
* [Teams plan FAQ](/team-management/teams-plan-faq/)
* [Pricing](https://www.bitrise.io/pricing/)"%}

In this article, we’ll go through the most significant differences between the everyday experience of these different subscription models. First, let’s see a quick comparison - and then dive into the details below!

| Features | Concurrency-based | Credit-based |
| --- | --- | --- |
| Build timeout | Up to 90 minutes | Up to four hours |
| Concurrency limitations | 1-20 | 5-80 |
| Machine type/compute options | The plan defines the machine type | Choose between options on a Workflow level |
| Resource usage monitoring | No monitoring | Credit overview and detailed usage |

## Machine type selector

**Concurrency-based plans**: On the older, concurrency-based plans, you could not select a machine type: the subscription itself defined it. If you were on the WorkspaceElite or the Enterprise plans, your builds used the Elite machines. On any other plan, your builds used the Standard machines.

**Credit-based plans**: On credit-based plans, you can select the machine type that fits your needs best, even on a Workflow level to manage your builds as cost-effectively as possible. For example, you can use our fastest Gen2 Elite machines for your time-critical builds but opt for the Standard machines for builds with lower priority.

![](/img/machine_selector.png)

## Concurrency limitations

**Concurrency-based plans**: To be able to run multiple builds simultaneously, you had to buy at least the WorkspaceStandard subscription, and increasing available concurrencies increased your costs as well. And once your team really starts growing, you will run into a shortage of concurrencies again and again.

**Credit-based plans**: Even the Hobby plan allows up to 5 concurrent builds. That number goes up to 30 on the Teams plan and as high as 80 on the Velocity plan (on Linux machines). If you have the credits, your builds will never have to wait for another build to finish first.

## Build timeout

**Concurrency-based plans**: On the old Developer and WorkspaceStandard/Elite plans, you had up to 90 minutes of build time, depending on the number of concurrencies.

**Credit-based plans**: Your build times out after 90 minutes… on the Hobby plan! On any paid credit-based plan, you can build for at least three and a half hours, and possibly much more if you choose our Enterprise-level offerings.

## Resource usage

**Concurrency-based plans**: On concurrency-based plans, tracking your usage isn’t necessarily crucial: you are limited by the constraints of your plan, not by the available resources.

**Credit-based plans**: On Teams and Velocity plans, being aware of your credit usage is absolutely critical. Our aim is to make this as easy as possible for you: on your account’s **Overview** tab, you can always see the current credit balance and the next billing date. You can also check out and export your detailed credit usage report at any time.

![](/img/credit_overview.png)

## Summary

To sum it up: on a credit-based plan, you can:

* Select the machine type on a Workflow level to ensure optimal cost-effectiveness for your builds.
* Build for as long as four hours.
* Forget about having to worry about concurrencies.
* Monitor your credit usage at all times.

If you’re interested in our credit-based subscription plans, [sign up for Bitrise](https://app.bitrise.io/users/sign_up "https://app.bitrise.io/users/sign_up") today or [book a demo](https://www.bitrise.io/contact?utm_source=website&utm_medium=devcenter&utm_campaign=contact "https://www.bitrise.io/contact?utm_source=website&utm_medium=devcenter&utm_campaign=contact") with us.