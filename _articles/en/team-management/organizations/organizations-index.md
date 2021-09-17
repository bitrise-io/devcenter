---
last_modified_at: 
tag:
- orgs
- team-management
title: Workspaces
redirect_from: []
description: The purpose of Workspaces is to make it easier to manage several people
  working on different apps on Bitrise. Workspaces can own an unlimited number
  of apps, and Workspace owners can assign Workspace members to work on different
  apps as they see fit.
menu:
  team-management-main:
    identifier: organizations
    weight: 10

---
{% include creditbased.html %}

A Workspace is an environment that allows you to manage your Bitrise apps and the team members working on the apps. You can create multiple Workspaces, and you can be invited to Workspaces by other Bitrise users. 

- [Create your own Workspace](/team-management/organizations/creating-org/).
- [Get invited to an existing Workspace](/team-management/organizations/members-organizations/).

To be able to add apps and run builds, you either need a Workspace or you need to [get added as an outside contributor to an app's team](/team-management/organizations/managing-apps/#adding-contributors-to-an-app).

{% include legacy_users.html %}

Workspace membership is based on groups: Workspace owners [can create groups and decide which members belong to which groups](/team-management/organizations/members-organizations/). A given group can be assigned to work on an app: all members of the same group will have the same level of access to the app.

Workspaces can take advantage of [SAML Single Sign-On](/team-management/organizations/saml-sso-in-organizations/): we have guides for setting it up with several major identity providers.

{% include message_box.html type="important" title="Workspace pricing" content="Workspaces are a premium feature. To learn more about pricing, visit our [Pricing page](https://bitrise.io/pricing/)."%}