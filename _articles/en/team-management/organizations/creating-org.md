---
title: Creating Organizations
tag:
- teams
- orgs
description: You can create and manage Organizations on bitrise.io to manage entire
  teams quickly and effectively. You can set up multiple groups within an Organization
  for different apps.
redirect_from: []
menu:
  organizations:
    weight: 2

---
You can create and manage **Organizations** on [bitrise.io](https://www.bitrise.io) to manage entire teams quickly and effectively. You can set up multiple groups within an Organization for different projects - for example, you can have a _Developer_ group and a _Tester_ group assigned to different apps. You can also set roles for your group: these roles determine the access rights provided to members of the group.

To run builds as an Organization, you need to subscribe to an **Organization** plan.

## Creating an Organization

No need for lengthy preparation when you wish to create an Organization on Bitrise: all you really need is an existing Bitrise account - this will be the default owner of the Organization - and an Organization name. You can set up everything else later!

1. Log in to [bitrise.io](https://www.bitrise.io).
2. On the top menu bar, find the **+** symbol and click it.

   ![Screenshot](/img/team-management/organization/add-org.png)
3. Choose **Add Organization** from the dropdown menu.

   Alternatively, you can create a new Organization from:
   * your **Account settings** page: find the **+ New Organization** option under **ORGANIZATION** on the left.
4. In the pop-up window, enter the name and the billing email of your Organization, and click **Create**. By default, your invoices will be sent to the billing email you set here.

   ![](/img/create-new-org.png)

   Please note that you will NOT be able to create an Organization if the domain part of your email address contains uppercase letters.
   * org@example.com will work.
   * org@Example.com will NOT work!
5. Provide your billing information.

   You can skip this step and provide these details at a later date. Only the owner(s) of an Organization can modify these.

   Note that you need to subscribe to an Organization plan to be able to run builds.
6. Transfer apps to your Organization.

   You can skip this step and transfer your apps or add new apps to your Organization at any time.

   ![](/img/transfer-apps-test.png)
7. In the pop-up window, click **Check billing** to immediately set up a subscription plan. You can also add your billing information here.

   ![](/img/check-billing.png)

   Alternatively, click **OK** to finish creating your Organization.

And that's it! You can start inviting people to your Organization!

{% include banner.html banner_text="Let's create an Organization on Bitrise! " url="https://app.bitrise.io/dashboard/builds" button_text="Add Organization " %}