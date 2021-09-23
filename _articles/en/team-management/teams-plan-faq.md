---
tag: []
title: Teams plan FAQ
redirect_from:
- "/team-management/teams-plan-trial-faq/"
- "/teams-plan-trial-faq/"
summary: As part of our efforts to introduce a credit-based model, we’re now offering
  a trial on our upcoming Teams plan. Here’s everything you need to know about it!

---
As part of our efforts to introduce a credit-based model, we’re now offering our new Teams plan. You can sign up for a free trial, or subscribe to the full plan. Here’s everything you need to know about it!

## How to sign up for the trial?

[Sign up for Bitrise](/getting-started/signing-up-to-bitrise/), and then create a Workspace. You can only trial the Teams plan on your first Workspace. 

If your account doesn't have a Workspace yet, you are automatically taken to the **Create a new Workspace** page when you log in: 

1. Find the **Workspace name** input field, and add a name.

   ![{{ page.title }}](/img/team-management/organization/create-new-org.png)

1. Click **Create Workspace**. 

Once you're done with setting up the Workspace, your trial will start automatically. 

## If I sign up for a trial, when will it end?

As of now, Teams plan trials are indefinite, there’s no time limit on using it. You can use the Teams plan trial as long as you have credits.

## Can I sign up for the full Teams plan?

Yes, if you are the **owner** of a Workspace. To do so:

1. Log in to Bitrise. 
1. On the **Dashboard**, find the account selector in the top right corner. 
1. Open the dropdown menu, and find the Workspace you want to use.
1. Click the little gear icon next to its name. This will take you to the **Workspace settings** page.
1. On the left, find the **Billing** tab and click it. This will take you to the Workspace's **Billing** page.
1. On the **Billing** page, click **Upgrade to Teams plan** and follow the instructions.
   You'll need to provide payment details. Once the first payment is authorized, your subscription starts immediately.

## What features does the Teams plan have?

Switching to the Teams plan from our credit-based Hobby plan has numerous benefits, including:

* Unlimited private apps.
* Unlimited team members and all the team management features.
* Multiple machines types to choose from.
* Add-ons, such as Test Reports and Ship.

## How do I get credits?

You get 500 credits for the trial. Once you run out, your trial ends.

On the full Teams plan, you get a certain amount of credits each month, depending on your credit tier. If you need more credits, you need to upgrade to a higher credit tier. You can do that on the **Billing** tab of your Workspace.

## Will I lose my unused credits if I switch to a different plan?

It depends on whether you upgrade to a higher credit tier or downgrade to a lower credit tier.

If you upgrade to a higher tier before the end of your current billing cycle, the upgrade happens immediately and a new billing cycle starts right away. When you pay for the new credit tier, we calculate the cost of the time remaining from your previous billing cycle and subtract it from your first charge. For example, if your previous subscription fee was a 100 USD every 30 days and you decide to upgrade to a higher tier with exactly 15 days remaining in the last billing cycle, you’ll be charged the price of the new subscription minus 50 USD when upgrading.

When downgrading to a lower credit tier, it’s very simple: the downgrade happens at the end of the current billing cycle. Until then, you can use all your remaining credits.

## How do I use my credits?

Just trigger a build! Each build will use a certain amount of credits per minute, depending on the [type of stack](/team-management/teams-plan-faq/#do-the-different-machine-types-have-different-credit-costs) you use.

## What happens if I run out of credits?

On a trial of the Teams plan, running out of credits means your trial ends. To keep building, subscribe for the full plan!

In Pay-As-You-Go mode, you can keep running builds and we’re counting the Pay-As-You-Go credits you use up. This incurs additional costs on top of your monthly or annual subscription fee: the cost of running builds in Pay-As-You-Go mode is 1.5 times per credit compared to a regular build. You are billed for this fee separately each month, even if you are on annual subscription. Your monthly Pay-As-You-Go limit is half of the credit amount of your monthly bundle. If you exceed this limit, you won’t be able to run builds any more, though running builds will never be aborted.

For example, if you receive 100 credits each month, and each credit costs 1 USD, your monthly fee is 100 USD. Once you use up all 100 credits, you are switched to Pay-As-You-Go mode. In this mode, you can use up 50 more credits, but each credit costs 1.5 USD so if you reach your Pay-As-You-Go limit, your additional Pay-As-You-Go fee will be 75 USD. If, however, your Pay-As-You-Go fee is only 5 USD or less, you won’t be billed.

If you often go into Pay-As-You-Go mode, we recommend upgrading to a higher credit tier!

## Will a build be aborted if I run out of credits?

No, running builds will never be aborted. You can always finish a running build, even if you exceed your Pay-As-You-Go credit limit.

## How many apps can I have?

On the Teams plan trial, you can have as many apps as you want.

## Do the different machine types have different credit costs?

Yes. Check out the following table to see the different machine types and their credit cost:

{% include message_box.html type="info" title="Hardware generations" content="Please note that for users on the Teams plan, all MacOS-based stacks now run on our Gen 2 hardware, ensuring the highest possible performance!" %}

| Linux machines | Specs | Credit multiplier |
| --- | --- | --- |
| Linux Standard | Ubuntu VM, 2vCPU @2.8GHz, 8GB RAM | 1 credit/min |
| Linux Elite | Ubuntu VM, 4vCPU @2.8GHz, 16GB RAM | 2 credits/min |
| Linux EliteXL (Velocity plan only) | Ubuntu VM 8vCPU @2.8GHz, 32GB RAM | 4 credits/min |

| MacOS machines | Specs | Credit multiplier |
| --- | --- | --- |
| Gen 2 macOS Standard | 4vCPU @3.2GHz 19 GB RAM | 2 credits/min |
| Gen 2 macOS Elite | 8vCPU @3.2GHz 35 GB RAM | 4 credits/min |
| Gen 2 macOS EliteXL | 12vCPU @3.2GHz 54 GB RAM | 6 credits/min |

## How many builds can I run at the same time?

You can run 10 builds on macOS stacks and 30 builds on Linux stacks in parallel.