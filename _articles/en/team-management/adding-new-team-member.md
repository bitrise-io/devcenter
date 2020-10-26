---
title: Adding a new team member to an app
tag:
- teams
- orgs
- apps
description: |-
  Once you have your app set up, you can start inviting team members! You can select multiple roles for the new members, like: admin, developer, and qa/tester.
  Different roles have different permissions that you can read more about below.
redirect_from: "/team-management/index/"
menu:
  team-management-main:
    weight: 3

---
Once you have your app set up, you can start inviting team members! You can select multiple roles for the new members, like: **admin**, **developer**, and **qa/tester**.

{% include message_box.html type="note" title="Roles and permissions" content="Check out the different roles and permissions in [our guide to the roles on Bitrise](/team-management/user-roles-on-app-teams/)."%}

To invite a team member:

1.  Go to the **Team** tab on your application's page. 
2. In the **Add users to the app** section, type their email address.   
   If they are not registered on Bitrise we will send out an invitation email for them. 
3. Before granting access to a new user, select their role.
4. Click **Grant access**.

{% include message_box.html type="warning" title="Inviting team members" content=" You need to be the app's **owner** or an **admin** to be able to add new team members to your app.
"%}

![{{ page.title }}](/img/grant-access.png)

**Owners** and **admins** can change the roles of other members by clicking **Change role** next to the member's name.

![{{ page.title }}](/img/change-role.png)

{% include banner.html banner_text="Invite a team member to your app's Team " url="https://app.bitrise.io/dashboard/builds" button_text="Go to your Dashboard" %}