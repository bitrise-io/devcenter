---
title: Managing Organization members
tag:
- teams
- orgs
description: 'Organizations can have multiple Groups. Groups form the "backbones"
  of Organizations: they contain the members of the Organizations, they can be assigned
  to different applications owned by the Organizations.'
redirect_from: []
summary: ''
menu:
  organizations:
    weight: 7

---
Organizations can have multiple **Groups**. Groups are the "backbone" of Organizations: they contain the members of the Organizations, they can be assigned to different applications owned by the Organizations, with different roles assigned to the different groups. Being a member of an organization means being a member of one of the groups belonging to the Organization.

For example, let's say the organization called _TestOrg_ owns an app called _TestApp_. _TestOrg_ has the following groups:

* **Group Alpha** - they are assigned to _TestApp_ with an **Admin** role. Members of this group can assign other groups to the app or add outside contributors, change app settings, manage roles and workflows.
* **Group Beta** - they are assigned to _TestApp_ with a **Developer** role. Members of this group can run builds, view build logs and view builds.
* **Group Gamma** - they are assigned to _TestApp_ with a **Tester / QA** role. They can only view builds.

{% include message_box.html type="important" title="Organization groups and roles" content="Please note that Organization groups have no inherent roles at all. A group can have multiple different roles on different apps. Even if an Organization group is called **Admin**, it doesn't have the **Admin** role on any app by default and you can assign them to apps with other roles, too. "%}

## Creating groups for Organizations

1. Sign in with an account that is an **owner** of the Organization and open its profile page.
2. Go to your organization's profile page: click **Switch Profile** on the top left corner and select the organization you need.

   ![Switching profile to select an Organization](/img/switchprofile.jpg)
3. On the left, select **Groups** from the menu options.
4. Find the **Create new Group** section at the top.

   ![{{ page.title }}](/img/enter-group-name.jpg)
5. Enter a group name in the **Enter Group name** field, and click **Create**.

## Adding members to Organizations

In practice, adding members to an organization means adding members to a group belonging to an organization. Once you have the groups you need for your organization, adding members to them is very simple.

1. Sign in with an account that is an **owner** of the organization and open its profile page.
2. Go to your organization's profile page: click **Switch Profile** on the top left corner and select the organization you need.

   ![Switching profile to select an Organization](/img/switchprofile.jpg)
3. On the left, select **Groups** from the menu options.
4. Find the group you need and click the **+** sign to the right of the name of the group.

   ![Adding a member to an Org on the Group tab](/img/addinggroupmember.jpg)
5. Enter a username or an email address.
   * If you enter a username, the system will suggest existing Bitrise users that at least partially match your input. Click the user you wish to invite.
   * If you enter an email address, click the **Enter** symbol on the right to send the invitation.
6. From the **Team** tab you can also access all the functions to manage groups. You simply have to click **MANAGE GROUP** to the right of the group members.![Managing a group from the Team tab](/img/managegroup.jpg)
7. Click the action you need in the pop-up window, including removing the group from the app.![Managing a group](/img/managegroupmembers.jpg)

## Removing members from Organizations

Members can be removed from the entire organization or from one of the groups belonging to an organization. In practice, this means that a single member can be removed from working on any of the apps belonging to the organization or only from selected apps.

### Removing group members

1. Sign in with an account that is an **owner** of the organization and open its profile page.
2. Go to your organization's profile page: click **Switch Profile** on the top left corner and select the Organization you need.![Switching profile to select an Organization](https://app.forestry.io/sites/mpxzvqn7ysfysw/body-media//img/switchprofile.jpg)
3. On the left, select **Groups** from the menu options.
4. Find the group and the group member you are looking for, and click the little **x** in the red square on the right of the username of the member.![Removing a group member from an Org](/img/remomember.jpg)

### Removing members from the entire Organization

Removing members from the entire organization removes them from all the groups they are part of in the organization and they can no longer work on any of the apps unless they are invited back, either as a group member or as an outside contributor.

1. Sign in with an account that is an **owner** of the organization and open its profile page.
2. Go to your organization's profile page: click **Switch Profile** on the top left corner and select the organization you need.![Switching profile to select an Organization](https://app.forestry.io/sites/mpxzvqn7ysfysw/body-media//img/switchprofile.jpg)
3. On the left, select **People** from the menu options.
4. Find the member you are looking for, and click the little **x** in the red square on the right of the username of the member.![Removing members from an Org](/img/removeorg.jpg)
5. In the pop-up window, click **Yes**.

   This way you can remove yourself from the organization. You will lose all access rights you had to the organization. Only click **Yes** in the pop-up window if you are certain you wish to do this.

   ![Confirming the removal of an Org member](/img/removegreatmember.jpg)

## Deleting groups

1. Sign in with an account that is an **owner** of the organization and open its profile page.
2. Go to your organization's profile page: click **Switch Profile** on the top left corner and select the organization you need.

   ![Switching profile to select an Organization](https://app.forestry.io/sites/mpxzvqn7ysfysw/body-media//img/switchprofile.jpg)
3. On the left, select **Groups** from the menu options.
4. Choose the group you wish to delete, and click the dropdown menu indicated by the **...** symbol.
5. Click **Delete group** then click **Yes** in the pop-up window.

{% include banner.html banner_text="Manage your organization members" url="https://app.bitrise.io/me/profile#/overview" button_text="Go to your profile page" %}