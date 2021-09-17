---
title: Workspace FAQ
tag:
- orgs
- " faq"
- teams
description: Workspaces are used to seamlessly manage bigger teams and members
  inside a company. It is a place to gather all the people working on each of your
  company's apps and delegate them through creating different groups.
redirect_from: []
menu:
  faq:
    weight: 22

---
## What is a Workspace on Bitrise?

Workspaces are used to seamlessly manage bigger teams and members inside a company. It is a place to gather all the people working on each of your company's apps and delegate them through creating different groups.

## How do I create a new Workspace?

Just go to your [account settings page](https://www.bitrise.io/me/profile#/overview), scroll down and click on the green `New organization` button at the bottom left. A popup will appear to guide you through the process.

## How do I add an app to a Workspace?

First, you have to be added to at least one `Group` of the Workspace. Then, go to the [Add new app page](https://www.bitrise.io/apps/add) and select the Workspace in the **dropdown at the top left**.

You can change this throughout the process of adding the app, or after you finished adding the app, changing the owner is possible through [transferring ownership](/faq/how-to-change-the-owner-of-an-app/).

## How do I migrate/transfer my existing apps to a Workspace?

Once you've created a Workspace, you can transfer any of your apps to it by going to the `Team` tab of the app you want to transfer, and clicking the **Transfer ownership** button at the top right.

## What are "Owners" inside a Workspace?

Workspaces can have more than one Owner. Owners can **manage billing**, **delete apps** and **change the billing email**, create, delete and assign **groups** to apps.

## What can "Members" of a Workspace do?

Members are displayed on the **People** tab of the Workspace's page. One can be added as a member by including them in a group on the **Groups** tab. These members have the option to add apps to the Workspace and view a list of all of the Workspace's apps on the **Apps** tab. Members can only access a Workspace's app, if they are granted access to the app directly or through a `Group`, in respect of their assigned role (Admin, Developer or Tester).

## What are groups good for?

A group is basically a wrapper for members. By creating groups, Owners and Admins can add multiple members to each app's team at once, making it faster and easier to setup new projects on Bitrise. It also make it faster to reassign, remove and change role of multiple members.

Each group is handled as one entity on the app's `Team` tab. They can be added to an app's team, the group's role can be set, and by removing the Group from the app's Team you can revoke the access of every member of that group from the app. It's not possible however to add or delete individual members of a group there, only on the Org's page.

_All members of a group have the same role when assigned to an app._

## What's the difference between a Team and a Workspace?

Teams are handled per app, Workspaces are handled globally.

A Team of a Workspace's app can contain members invited directly or through the groups assigned to them. Team members with a direct role can only access the app they were invited to and can't add an app to the Workspace. Members of a Team always have a role assigned to them (Admin, Developer or Tester).

## Who are the Outside contributors?

[Outside contributors](/team-management/organizations/managing-apps/#adding-contributors-to-an-app) are members of an app's Team with a direct role, invited only to an app of a Workspace and not to the Workspace itself.

## Can I have multiple Workspaces?

One user can have as many Workspaces as they like, but each Workspace has to have an active Pro subscription to be able to run builds.

## Can I have multiple Pro subscriptions?

Yes. Each account can subscribe to Pro for their personal account and for as many Workspaces as needed.

## What if I cancel my Pro plan for a Workspace?

After the Pro plan expires, builds can't be started for apps owned by the Workspace.

## Can I remove someone from all of my Workspace's apps?

If you are an Owner of a Workspace, you can remove members and contributors on the Org's `People` tab, with one click. Owners can also remove someone from a group on the `Groups` tab. In this case the user will be removed from all apps' team that the group is assigned to.

## Where can I change the avatar for my Workspace?

Once you are on your Workspace page, click on the avatar, and you'll see a popup to change the color scheme of it. We'll add custom avatar support a bit later.

{% include banner.html banner_text="Let's go to your Workspace" url="https://app.bitrise.io/me/profile#/overview" button_text="Go to your profile page" %}