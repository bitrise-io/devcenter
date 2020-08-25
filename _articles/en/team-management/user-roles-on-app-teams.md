---
title: User roles on app teams
redirect_from: []
date: '2019-02-18T14:53:53.000+00:00'
tag:
- teams
- orgs
description: 'Roles are very important on Bitrise. They limit what you can and cannot
  do with an application. Roles work on an application basis: the same user can have
  different roles on different applications.'
menu:
  team-management-main:
    weight: 3

---
Roles are very important on Bitrise. They limit what you can and cannot do with an application.

Roles work on an application basis: the same user can have different roles on different applications. As such, Organizations have no inherent "roles", apart from that of the Organization owners: Organizations have groups and different groups can be assigned different roles.

Bitrise has the following roles:

* [Owners](/team-management/user-roles-on-app-teams/#owners)
* [Admins](/team-management/user-roles-on-app-teams/#admins)
* [Developers](/team-management/user-roles-on-app-teams/#developers)
* [Testers/QA](/team-management/user-roles-on-app-teams/#testersqa)

## Owners

There are two types of owners: application owners and Organization owners.

By default, the owner of an application is the account that created the application. This can be either an individual user or an Organization. An owner of an Organization has owner rights to ALL THE APPS owned by the Organization.

Here's the role cheatsheet for owners:

![](/img/owners.png)

Owners have unlimited access to applications. Only owners can destroy apps or [transfer the ownership of apps](/team-management/changing-the-owner-of-an-app/), and only they have access to PAYMENT INFORMATION.

If an Organization owns the app, only the owners of the Organization can transfer or destroy the app.

## Admins

Admins can be assigned to applications, either in groups or individually. Organizations do not have admins: Organization groups can be assigned to applications as admins.

Here's the role cheatsheet for admins:

![](/img/admins.png)

So, for example, an admin cannot delete an application but can invite other members to work on the app. The admin can also give admin rights to other users - however, [they cannot transfer ownership](/team-management/changing-the-owner-of-an-app/) of the app!

## Developers

Developers can be assigned to applications, either in groups or individually. Organizations do not have developers: Organization groups can be assigned to applications as developers.

Here's the role cheatsheet for developers:

![](/img/developers.png)

So, for example, developers cannot change team member roles, add new team members, remove existing team members or create, edit or delete workflows. They can, however, run builds and view build logs.

They have no access to sensitive data such as payment information, access tokens or even webhooks.

## Testers/QA

Testers can be assigned to applications, either in groups or individually. Organizations do not have testers: Organization groups can be assigned to applications as testers.

Here's the role cheatsheet for testers/QA:

![](/img/testers.png)

Testers can only view builds. They cannot access build logs and they cannot modify the app in any way or form.

They have no access to sensitive data such as payment information, access tokens or even webhooks.

## Assigning roles to users

There are two ways to assign roles to users:

* Invite an individual user account to work on the app, and assign it a certain role: we'll cover that in this guide!
* [Assign a group of the Organization that owns the app a certain role](/team-management/organizations/managing-apps/#assigning-groups-to-apps).

Users who have **owner** or **admin** rights to the applications can invite new team members and assign them roles. Let's see how to assign individual users to apps!

1. Open the app's page on Bitrise.
2. Click the **Team** tab.
3. In the **Add users to this app** box, type the username or the email of the user you want to invite.

   ![](/img/add-users.png)

   Note that [the process is the same if the app is owned by an Organization](/team-management/organizations/managing-apps/#adding-contributors-to-an-app) except you will see **Add contributors to this app** above the box where you enter the username or email.
4. Select the role you want to assign.
5. Click **Grant Access**.

{% include banner.html banner_text="Now you know everything" url="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta" button_text="Go to Bitrise now" %}