---
title: Managing Organization members
tag:
- teams
- orgs
description: 'Organizations can have multiple Groups. Groups form the "backbones"
  of Organizations: they contain the members of the Organizations, they can be assigned
  to different applications owned by the Organizations.'
redirect_from: []
menu:
  organizations:
    weight: 7

---
Organizations can have multiple **Groups**. Groups are the "backbone" of Organizations: they contain the members of the Organizations, they can be assigned to different applications owned by the Organizations, with different roles assigned to the different groups. Being a member of an organization means being a member of one of the groups belonging to the organization.

For example, let's say the organization called _TestOrg_ owns an app called _TestApp_. _TestOrg_ has the following groups:

* **Senior Developers** - they are assigned to _TestApp_ with an **Admin** role. Members of this group can assign other groups to the app or add outside contributors, change app settings, manage roles and workflows.
* **Developers** - they are assigned to _TestApp_ with a **Developer** role. Members of this group can run builds, view build logs and view builds.
* **Testers** - they are assigned to _TestApp_ with a **Tester / QA** role. They can only view builds.

## Creating groups for Organizations

1. Sign in with an account that is an **owner** of the organization and open its profile page.
2. Go to your organization's profile page: click **Switch Profile** on the top left corner and select the organization you need.

   ![](/img/switch-profile-2.jpg)
3. On the left, select **Groups** from the menu options.
4. Find the **Create new Group** section at the top.

   ![](/img/enter-group-name.jpg)
5. Enter a group name in the **Enter Group name** window, and click **Create**.

## Adding members to Organizations

In practice, adding members to an organization means adding members to a group belonging to an organization. Once you have the groups you need for your organization, adding members to them is very simple.

1. Sign in with an account that is an **owner** of the organization and open its profile page.
2. Go to your organization's profile page: click **Switch Profile** on the top left corner and select the organization you need.

   ![](/img/switch-profile-2.jpg)
3. On the left, select **Groups** from the menu options.
4. Find the group you need and click the **+** sign to the right of the name of the group.

   ![Screenshot](/img/team-management/organization/group-name.png)
5. Enter a username or an email address.
   * If you enter a username, the system will suggest existing Bitrise users that at least partially match your input. Click the user you wish to invite.
   * If you enter an email address, click the **Enter** symbol on the right to send the invitation.

   ![](/img/test-group.jpg)
6. From the **Team** tab you can also access all the functions to manage groups. You simply have to click **MANAGE GROUP** to the right of the group members, and click the action you need in the pop-up window, including removing the group from the app.

   ![](/img/test-group-manage-group.png)

## Removing members from Organizations

Members can be removed from the entire organization or from one of the groups belonging to an organization. In practice, this means that a single member can be removed from working on any of the apps belonging to the organization or only from selected apps.

### Removing group members

1. Sign in with an account that is an **owner** of the organization and open its profile page.
2. Go to your organization's profile page: click **Switch Profile** on the top left corner and select the organization you need.

   ![](/img/switch-profile-2.jpg)
3. On the left, select **Groups** from the menu options.
4. Find the group and the group member you are looking for, and click the little **x** in the red square on the right of the username of the member.

   ![](/img/test-group-remove.jpg)

### Removing members from the entire Organization

Removing members from the entire organization removes them from all the groups they are part of in the organization and they can no longer work on any of the apps unless they are invited back, either as a group member or as an outside contributor.

1. Sign in with an account that is an **owner** of the organization and open its profile page.
2. Go to your organization's profile page: click **Switch Profile** on the top left corner and select the organization you need.

   ![](/img/switch-profile-1.jpg)
3. On the left, select **People** from the menu options.
4. Find the member you are looking for, and click the little **x** in the red square on the right of the username of the member.

   ![](/img/organization-remove-owner.jpg)
5. In the pop-up window, click **Yes**.

   This way you can remove yourself from the organization. You will lose all access rights you had to the organization. Only click **Yes** in the pop-up window if you are certain you wish to do this.

   ![](/img/are-you-sure-owner-remove.jpg)

## Deleting groups

1. Sign in with an account that is an **owner** of the organization and open its profile page.
2. Go to your organization's profile page: click **Switch Profile** on the top left corner and select the organization you need.

   ![](/img/switch-profile-2.jpg)
3. On the left, select **Groups** from the menu options.
4. Choose the group you wish to delete, and click the dropdown menu indicated by the **...** symbol.
5. Click **Delete group** then click **Yes** in the pop-up window.

{% include banner.html banner_text="Manage your organization members" url="https://app.bitrise.io/me/profile#/overview" button_text="Go to your profile page" %}