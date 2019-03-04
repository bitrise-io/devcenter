---
title: SAML-draft
redirect_from: []
date: 2019-02-27 13:46:46 +0000
published: false

---
## What is SAML SSO

Organizations created in Bitrise can log into Bitrise using their own SAML SSO provider to authenticate themselves with. All you have to do to is add Bitrise as an application to your own SAML-supporting Identity Provider (IdP) and set some credentials on your organization's `Security` tab on Bitrise. Once SSO is set up, you can log into Bitrise with a click of a button without having to worry about your user credentials.

SAML SSO sign in process does not rule out the possibility of signing for example via your GitHub account.


{% include message_box.html type="important" title="Before connecting SAML SSO to your organization" content=" Make sure:

* you have a SAML-supporting Identity Provider that you can connect Bitrise to as an application.
* your account on Bitrise has an organization. If it doesn't have an organization, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for **existing and brand new organizations** on Bitrise.
* **as with other** [**organization management actions**](/team-management/user-roles-on-app-teams/)**, only the organization owner can set up SALM SSO to a Bitrise organization.** "%}

## Setting up SAML SSO for an existing Bitrise organization

In this tutorial, we describe how you can set up SAML SSO and invite organization members to set up their connection.

 1. Go to your organization's `Security` tab on [bitrise.io](https://www.bitrise.io).
 2. Copy the `Single Sign-On URL`. You will need this to add Bitrise as an app at your SSO provider's site.
 3. Log into your own SSO provider.
 4. Add Bitrise as an application using the copied URL at Step 2. You're generating your Single Sign-On (SSO) credentials which you will need in a minute on Bitrise.
 5. Add the generated SSO credentials to the `Identity provider sign-on URL` and `Certificate` fields on the `Security` tab.
 6. Click the `Configure SSO` button.
    ![](/img/SSO-page.jpg)
    All members of your organization will be automatically signed out from Bitrise.
 7. A new account is created which you can confirm in the **verification e-mail** Bitrise (letsconnect@bitrise.io) sends to all organization members. This email contains a `Sign In via SSO` button or a URL. Click it or copy the link to acknowledge the connection. The email also shows the organization owner's email address (should you need to contact him/her.)

    ![](/img/email-notification.jpg)
 8. The owner (and other members) of this Organization are prompted to sign into Bitrise again by clicking the `Sign In via SSO` button or using the provided URL in the email. If using the latter, make sure you open the link in a _new tab_!
 9. Your SSO provider's page comes up again where you have to provide your Bitrise email address connected to your organization. WARNING: If you provide a **different Bitrise email address which is not related to that particular organization**, you will get the below error message. Log in with the right email address of the organization.![](/img/no-connected-sso-for-this-email-address.png)
10. As a last step, the `Allow "your organization name" to sign you in` page comes up. ![](/img/enable-saml.jpg)

* Click `Authorize` if you trust the **organization/group** to control your Bitrise account-sign in.
* Click `Don't trust` if **...**

If all went well, you will see `Single Sign-On (SSO) is enabled for this organization` message with a `Review Users` and a `Disable SSO` buttons.

* `Review Users` button takes you to the `People` tab from the `Security` tab where you can check your and other org member's SAML SSO status.
* `Disable SSO`button disables SSO for all org members who will be able to sign in with the regular sign-in procedure. ![](/img/disable-saml.jpg)


disable saml sso for the entire organization
* can invite members to an organization


## Checking your SAML SSO status on Bitrise

Now that you have set up SAML SSO for your organization and the `Single Sign-On has been enabled` notification emails have been sent out to all org members, you might want to check other org members' SSO status.

1. Go to your organization on Bitrise.
2. Click `People` on the left menu.
3. Check your (or other organization members') SAML SSO status under `Members`.

   ![](/img/saml-status.png)

* `SAML SSO IS ENABLED`: secure connection is active.
* `SAML SSO IS DISABLED`: The org member most likely has not enabled SSO connection through the `Sign in via SSO` button in the notification email he/she  (Step 8) yet.

If you click the `x` next to a member's name, it removes that member from all groups in that organization and his/her SSO gets disabled automatically. ![](/img/are-you-sure.png)

Outside contributors?

## Logging in via SSO with a Bitrise account

If SSO connection has been already added to your organization but you are currently logged out of Bitrise, you can easily log into your org:

1. Click `Login via SSO` on our [login page](https://app.bitrise.io/users/sign_in).
image login via sso
You will be redirected to the `Initiate Single Sign-on page`.
2. Provide your organization name.
3. Click `Continue to log in`.
You will be redirected to your own SSO provider's page.
4.  Provide your email address associated with the organization in Bitrise.
You will be redirected to our **Authorization** page...?

## Logging in via SSO without a Bitrise account

1. Find the email you got from Bitrise (letsconnect@bitrise.io) in your mailbox. With this one, we can auto-register you on Bitrise, create and account and assign you to the right organization.
2. Click `Sign In via SSO` or copy the provided URL in a new tab to acknowledge the connection.
You will be redirected to your SAML SSO provider's page.
3. Provide your Bitrise email address.
You will be redirected to our `Almost there...` page.
4. Provide your username. You will have to use this username on Bitrise.
5. Provide the organization name?
6. Click `Finish Signing Up`.
- billing?
 something went wrong image

## Quick tips
Here are some scenarios you want to consider before setting up SSO for your organization/s.
- As with organizations in general, only organization owners can remove members from an organization. They can disable SSO for one or all org members.
- Do you have a company with two organizations and wondering how to set up SSO on Bitrise? We advise you to enable SSO to only one of the organizations and invite team members to that one. If you enable SSO for both organizations, org members cannot be shared among organizations! If an org member wishes to be part of both organizations, he/she has to create two separate Bitrise accounts and tie them to the respective orgs.
- If you work for two separate companies, you should create two separate accounts on Bitrise to join those organizations.
- My SAML certificaiton has expired. What can I do?
