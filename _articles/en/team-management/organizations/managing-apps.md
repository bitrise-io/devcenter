---
title: Managing the apps of Workspaces
tag:
- teams
- orgs
description: Workspaces can own several apps, with different (or the same, if that's
  what you need) groups working on different apps. Apps can be transferred between
  private accounts and Workspace accounts any time, quickly and easily.
redirect_from: []
menu:
  organizations:
    weight: 9

---
Workspaces can own several apps, with different (or the same, if that's what you need) groups working on different apps. Apps can be transferred between private accounts and Workspace accounts any time, quickly and easily.

## Adding new apps to a Workspace

A new app can be added directly to a Workspace. When [adding a new app](/getting-started/adding-a-new-app/), set the Workspace as its owner at the start of the process. 

## Transferring apps to a Workspace

When you create a Workspace, you get a prompt for transferring apps from the account that you are logged in with to the Workspace. However, if you skipped that step, you can do it on our website at any time you wish.

You have two options to transfer app ownership.

* Several apps can be transferred at the same time from the Workspace profile.
* Any given app can be transferred from the app's **Team** tab.

App ownership can be transferred **from** a Workspace to another account on the app's **Team** tab. Only Workspace owners can do this.

### Transferring apps from the Workspace profile

1. Sign in with an account that is a member of the Workspace.
1. In the top right corner, open the account selector dropdown menu. 
1. Find the Workspace you need and click the little gear icon next to its name.
3. On the left, select **Apps** from the menu options.
4. Click the **Transfer apps** button.

   ![{{ page.title }}](/img/add-new-app-org-settings.jpg)
5. Find the apps you wish to transfer and toggle the switch on the right. Once you're done, click **Done**.

### Transferring an app from the Team tab

It can happen that you need to transfer an application on [Bitrise](https://www.bitrise.io) to another user. This can be done in a few seconds by following these quick steps:

1. Login with the **current owner of the app**.
2. Open the app's page and go to the **Team** tab.
3. Make sure the new owner of the app is in the team or add her/him if you need to.
4. Click the **Transfer ownership** button on the top right.

For transferring the ownership, select the new user to transfer the app to:

![{{ page.title }}](/img/transfer-ownership-team-tab.jpg)

The new user can either be another private account or a Workspace.

## Assigning groups to apps

There are two separate ways to assign one or more groups to an app that is owned by a Workspace.

* Assign a group from the **Groups** menu of the Workspace's profile page. This way you can add a group to multiple apps simultaneously. Only Workspace owners can do this!
* Assign a group from the **Team** tab of the app. If the groups you need already exist and you only need to assign groups to a single app, this method works perfectly. Workspace owners and accounts that have an **admin** role on the app's team can do this.

### Assigning a group from the Groups menu

1. Sign in with an account that is an **owner** of the Workspace and open its profile page.
2. Go to your Workspace's profile page: click **Switch Profile** on the top left corner and select the Workspace you need.

   ![{{ page.title }}](/img/switch-profile.jpg)
3. On the left, select **Groups** from the menu options.
4. Choose the group you wish to assign, and click the dropdown menu indicated by the **...** symbol.
5. Click **Assign group to apps**.

   ![{{ page.title }}](/img/assign-group-to-apps.jpg)
6. Find the app(s) you need and select the appropriate role for the group. You can check out the role cheatsheet on any app's **Team** tab.

   ![{{ page.title }}](/img/popup-assign.png)

### Assigning a group from the `Team` tab.

1. Go to the app's page on [bitrise.io](https://www.bitrise.io).
2. Select the **Team** tab.
3. Find the **Add a group from OrgName** menu.

   ![{{ page.title }}](/img/team-management/organization/add-group-org.png)
4. Find the group you wish to add and click the **+** symbol.
5. Select the role for the group.

For rights of roles, check out the Role Cheatsheet!

If there are no groups you can assign to the app in this menu, you will see a grey box telling you **No groups to show**. Clicking the link will take you to your Workspace's `Groups` page where you can create the groups you need, including removing the group from the app.

![{{ page.title }}](/img/team-management/organization/add-group-from-org.png)

From the **Team** tab you can also access all the functions to manage groups. You have to click **MANAGE GROUP** to the right of the group members, and click the action you need in the pop-up window.

![{{ page.title }}](/img/manage-group-change-roles.png)

## Adding contributors to an app

You can add contributors to any application if you have **Admin** or **Owner** right to the app. There are two types of contributors at Bitrise:

* Contributors are Workspace members who can be individually added to an app.
* Outside contributors are not part of a Workspace but can be individually invited to an app of a Workspace.

This means that if you wish to add a Workspace member to an app of the Workspace, all you have to do is add the username/email address of the member under **Add contributors to this app**  on the **Team** page of the app.

{% include message_box.html type="important" title="Enabling the Allow Outside Contributor switch" content="Adding an outside contributor requires enabling the **Allow Outside Contributors** switch on the Workspace's **People** tab which only the Workspace OWNER can do."%} 

{% include message_box.html type="warning" title="Outside contributors and app transfer" content="

If you wish to transfer an app with outside contributors from _Workspace A_ to _Workspace B_, keep these in mind:

* If _Workspace A_ has the **Allow Outside Contributors** switch turned on, and _Workspace B_ DOES NOT, then all outside contributors of _Workspace A_ will be REMOVED as the app is transferred to _Workspace B_.
* If _Workspace A_ and _Workspace B_ both have the **Allow Outside Contributors** switch turned on, then all all outside contributors of _Workspace A_ will be moved to _Workspace B_ as the app is transferred to _Workspace B_.

If you wish to transfer an app with team members to a Workspace, keep these in mind:

* If the _Workspace_ has the **Allow Outside Contributors** switch turned on, all app team members will be moved as outside contributors to the _Workspace_ as the app is transferred to the Org.
* If the _Workspace_ has the **Allow Outside Contributors** switch turned off, all team members of the app will be REMOVED from the app as it is transferred to the _Workspace_.

"%}

Let's see the details!

1. Go to your Workspace's page on [bitrise.io](https://www.bitrise.io).
2. On the left menu bar, select **People**.
3. Toggle the **Allow Outside Contributors** switch to the right. Please note that without enabling this function here, you will not be able to add an outside contributor to your app on the **Team** tab!

   ![{{ page.title }}](/img/enabled-allow-outside-contributor.jpg)
4. On the left menu bar, select **Apps**.
5. Search for or click the app you want to add outside contributors to. (In our example, it is the `android-multiple-test-results-sample` app.)

   ![{{ page.title }}](/img/switch-to-apps-from-people.jpg)

   The **Builds** page appears.
6. Select the **Team** tab.
7. Find the **Add contributors to this app** menu.
8. Enter a username or an email address.

   The email address you enter - if you choose that option - does not have to be associated with an existing Bitrise account.
9. Select a role for the user and then click **Grant Access**.

   For rights of roles, check out the Role Cheatsheet linked above **Grant Access**.

   ![{{ page.title }}](/img/team-management/organization/add-contributors.png)

Bitrise sends an invitation email to the contributor's email address with a link to view the app.

![{{ page.title }}](/img/invitation-email-outside-contributor.jpg)

If all went well, you should see the invited outside contributor at the **People** tab of your Workspace.

![{{ page.title }}](/img/added-outside-contributor.png)

{% include message_box.html type="note" title="Removing outside contributors" content=" You can remove the outside contributor on the **People** tab by clicking the red **x**. Please note that you have to remove all outside contributors if you want to disable the **Outside Contributor** toggle." %}

## Removing a group from an app

1. Go to the app's page on [bitrise.io](https://www.bitrise.io).
2. Select the **Team** tab.
3. Find the group you wish to remove, and click the **MANAGE GROUP** option next to one of the names of the group members.
4. Click **REMOVE FROM APP**. Click **Yes** in the pop-up window.

   ![{{ page.title }}](/img/manage-group-change-roles.png)

{% include banner.html banner_text="Now you know everything" url="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta" button_text="Go to Bitrise now" %}