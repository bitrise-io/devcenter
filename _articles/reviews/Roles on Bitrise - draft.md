---
title: Roles on Bitrise - draft
redirect_from: []
date: 2019-02-13 15:21:14 +0000
published: false

---
Roles are very important on Bitrise. They limit what you can and cannot do with an application. 

Roles work on an application basis: the same user can have different roles on different applications. As such, organizations have no inherent "roles": organizations have groups and different groups can be assigned different roles. 

Bitrise has the following roles:

* owners
* admins
* developers
* testers/QA

### Owners

There are two types of owners: **application owners** and **organization owners**. 

By the default, the owner of an application is the account that created the application. This can be either an individual user or an organization. **An owner of an organization has owner rights to all the apps owned by the organization.** 

Owners have unlimited access to applications. Only owners can destroy apps or transfer the ownership of apps, and only they have access to payment information. 

If an organization owns the app, only the owners of the organization can transfer or destroy the app. 

### Admins

Admins can be assigned to applications, either in groups or individually. Organizations do not have admins: organization groups can be assigned to applications as admins. 

Here's the role cheatsheet for admins:

![](/img/admins.png)

So, for example, an admin cannot delete an application but can invite other members to work on the app. The admin can also give admin rights to other users - however, they cannot transfer ownership of the app! 

### Developers 

Developers can be assigned to applications, either in groups or individually. Organizations do not have developers: organization groups can be assigned to applications as developers. 

Here's the role cheatsheet for developers:

![](/img/developers.png) 

So, for example, developers cannot change team member roles, add new team members, remove existing team members or create, edit or delete workflows. They can, however, run builds and view build logs. 

They have no access to sensitive data such as payment information, access tokens or even webhooks. 

### Testers/QA

Testers can be assigned to applications, either in groups or individually. Organizations do not have testers: organization groups can be assigned to applications as testers. 

Here's the role cheatsheet for testers/QA:

![](/img/testers.png)

Testers can only view builds. They cannot access build logs and they cannot modify the app in any way or form. 

They have no access to sensitive data such as payment information, access tokens or even webhooks. 