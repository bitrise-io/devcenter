---
# jp title missing
title: Managing the apps of organizations
menu:
  organizations:
    weight: 7

---

{% include not_translated_yet.html %}

Organizations can own several apps, with different (or the same, if that's what you need) groups working on different apps. Apps can be transferred between private accounts and organization accounts any time, quickly and easily.

## Adding new apps to an organization

A new app can be added directly to an organization. You can do this either from the organization's `Account settings` page or from the Dashboard of an account that is a member of the organization.

1. Get to the `Create New App` page.

   There are three options to get there:
   * On the top menu bar, find the `+` symbol and click it, then click the `Add App` option.

     ![Screenshot](/img/team-management/organization/add-org.png)
   * Open the `Dashboard` on [bitrise.io](https://www.bitrise.io), open the dropdown menu above your app list and select your organization. Click the `+ Add new app` button.

     ![Screenshot](/img/team-management/organization/add-new-app-org.png)
   * Open the `Account settings` page of your organization, and click the `Apps` option on the menu on the left. Click the `Add new app` button.
2. On `Create New App` page, make sure that the organization account is selected in the dropdown menu.

   ![Screenshot](/img/team-management/organization/add-app-screen.png)
3. Proceed with adding a new app as usual! It will be owned by the organization.

## Transferring apps to an organization

When you create an organization, you get a prompt for transferring apps from the account that you are logged in with to the organization. However, if you skipped that step, you can do it on our website at any time you wish.

You have two options to transfer app ownership.

* Several apps can be transferred at the same time from the organization profile.
* Any given app can be transferred from the app's `Team` tab.

App ownership can be transferred **from** an organization to another account on the app's `Team` tab. Only organization owners can do this.

### Transferring apps from the organization profile

1. Sign in with an account that is a member of the organization and open the account's profile page.
2. Go to your organization's profile page: click `Switch Profile` on the top left corner and select the organization you need.

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. On the left, select `Apps` from the menu options.
4. Click the `Transfer apps` button.

   ![Screenshot](/img/team-management/organization/transfer-app-org.png)
5. Find the apps you wish to transfer and toggle the switch on the right. Once you're done, click `Done`.

### Transferring an app from the Team tab

It can happen that you need to transfer an application on [Bitrise](https://www.bitrise.io) to another user. This can be done in a few seconds by following these quick steps:

1. Login with the **current owner of the app**.
2. Open the app's page and go to the `Team` tab.
3. Make sure the new owner of the app is in the team or add her/him if you need to.
4. Click the `Transfer ownership` button on the top right.

For transferring the ownership, select the new user to transfer the app to:

![Screenshot](/img/team-management/transfering-ownership.png)

The new user can either be another private account or an organization.

## Assigning groups to apps

There are two separate ways to assign one or more groups to an app that is owned by an organization.

* **Assign a group from the** `**Groups**` **menu of the organization's profile page**. This way you can add a group to multiple apps simultaneously. Only **organization owners** can do this!
* **Assign a group from the** `**Team**` **tab of the app**. If the groups you need already exist and you only need to assign groups to a single app, this method works perfectly. Organization owners and accounts that have an **admin** role on the app's team can do this.

### Assigning a group from the `Groups` menu.

1. Sign in with an account that is an **owner** of the organization and open its profile page.
2. Go to your organization's profile page: click `Switch Profile` on the top left corner and select the organization you need.

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. On the left, select `Groups` from the menu options.
4. Choose the group you wish to assign, and click the dropdown menu indicated by the `...` symbol.
5. Click `Assign group to apps`.

   ![Screenshot](/img/team-management/organization/assign-group-to-apps.png)
6. Find the app(s) you need and select the appropriate role for the group. You can check out the role cheatsheet on any app's `Team` tab.

   ![Screenshot](/img/team-management/organization/assign-group-popup.png)

### Assigning a group from the `Team` tab.

1. Go to the app's page on [bitrise.io](https://www.bitrise.io).
2. Select the `Team` tab.
3. Find the `Add a group from <OrgName>` menu.

   ![Screenshot](/img/team-management/organization/add-group-org.png)
4. Find the group you wish to add and click the `+` symbol.
5. Select the role for the group.

For rights of roles, check out the Role Cheatsheet!

If there are no groups you can assign to the app in this menu, you will see a grey box telling you `No groups to show`. Clicking the link will take you to your organization's `Groups` page where you can create the groups you need, including removing the group from the app.

![Screenshot](/img/team-management/organization/add-group-from-org.png)

From the `Team` tab you can also access all the functions to manage groups. You simply have to click `MANAGE GROUP` to the right of the group members, and click the action you need in the pop-up window.

![Screenshot](/img/team-management/organization/team-group-popup.png)

## Adding outside contributors to an app

You can add outside contributors to any application if you have `Admin` or `Owner` right to the app. If an organization owns the app, the outside contributor does not have to be part of the organization, of course.

1. Go to the app's page on [bitrise.io](https://www.bitrise.io).
2. Select the `Team` tab.
3. Find the `Add outside contributors to this app` menu.

   ![Screenshot](/img/team-management/organization/add-contributors.png)
4. Enter a username or an email address.

   The email address you enter - if you choose that option - does not have to be associated with an existing Bitrise account.
5. Select a role for the user and then click `Grant Access`.

   For rights of roles, check out the Role Cheatsheet!

## Removing a group from an app

1. Go to the app's page on [bitrise.io](https://www.bitrise.io).
2. Select the `Team` tab.
3. Find the group you wish to remove, and click the `MANAGE GROUP` option next to one of the names of the group members.
4. Click `REMOVE FROM APP`. Click `Yes` in the pop-up window.

   ![Screenshot](/img/team-management/organization/team-group-popup.png)
