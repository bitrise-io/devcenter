---
title: SAML-draft
redirect_from: []
date: 2019-02-27 13:46:46 +0000
published: false

---
## What is SAML SSO

Organizations created in Bitrise can log into Bitrise using their own SAML SSO which is a login protocol for easier authentication. All you have to do to is add Bitrise as an application to your own SAML-supporting Identity Provider (IdP) and set some credentials on your organization's `Security` tab on Bitrise.

{% include message_box.html type="important" title="Before connecting SAML SSO to your organization" content=" Make sure:

* you have a SAML-supporting Identity Provider that you can connect Bitrise to as an application.
* your account on Bitrise has an organization. If it doesn't have an organization, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for **existing and brand new organizations** on Bitrise.
* **as with other** [**organization management actions**](/team-management/user-roles-on-app-teams/)**, only the organization owner can set up SALM SSO to a Bitrise organization.** "%}

## Setting up SAML SSO for an existing Bitrise organization

In this tutorial, we describe how you can set up SAML SSO and email organization members on enabling the secure connection.

 1. Go to your organization's `Security` tab on [bitrise.io](https://www.bitrise.io).
 2. Copy the `Single Sign-On URL`.  which you will use in your own Identity Provider's (IdP) site.
 3. Log into your SSO provider.
 4. Add Bitrise as an application using the copied URL at Step 2. You're generating your Single Sign-On (SSO) credentials which you will need in a minute.
 5. Add those SSO credentials to the `Identity provider sign-on URL` and `Certificate` fields on the `Security` tab.
 6. Click the `Configure SSO` button. ![](/img/SSO-page.jpg) All members of your organization will be automatically signed out from Bitrise.
 7. A new account is created which you can confirm in the **verification e-mail** Bitrise sends to the organization members. This email contains a `Sign In via SSO` button or a URL. Click it or copy the link to acknowledge the connection. The email also shows the organization owner's email address (should you need to contact him/her.)

    ![](/img/email-notification.jpg)
 8. The owner (and other members) of this Organization are prompted to sign in to Bitrise again by clicking the `sign In via SSO` button or using the provided URL in the email. If using the latter, make sure you open the link in a _new tab_!
 9. Your SSO provider's page comes up again where you have to provide your Bitrise email address connected to your organization. WARNING: If you provide a **different Bitrise email address which is not related to that particular organization**, you will get the below error message. Log in with the right email address of the organization.![](/img/no-connected-sso-for-this-email-address.png)
10. As a last step, the `Allow "your organization name" to sign you in` page comes up. ![](/img/enable-saml.jpg)

* Click `Authorize` if you trust the **organization/group** to control your Bitrise account-sign in.
* Click `Don't trust` if **...**

If all went well, you will see `Single Sign-On (SSO) is enabled for this organization` message with a `Review Users` and a `Disable SSO` buttons.

* `Review Users` button takes you to the `People` tab from the `Security` tab where you can check your and other org member's SAML SSO status.
* `Disable SSO`button disables SSO for all org members who will be able to sign in with the regular sign-in procedure. ![](/img/disable-saml.jpg)

## Checking your SAML SSO status on Bitrise

Now that you have set up SAML SSO to your organization and the notification emails have been sent out to all org members, you might want to check other org members' SSO status. This is handy because from now on org members are automatically logged out from Bitrise until they enable SSO connection through the `Sign in via SSO` button in the notification email (Step 8).

1. Go to your organization on Bitrise.
2. Click `People` on the left menu.
3. Check your (or other organization members') SAML SSO status under `Members`.

   ![](/img/saml-status.png)

* `SAML SSO IS ENABLED`: secure connection is active.
* `SAML SSO IS DISABLED`: The org member most likely has not enabled SSO connection through the `Sign in via SSO` button in the notification email (Step 8) yet.

If you click the `x` next to a member's name, it removes that member from all groups in that organization and his/her SSO gets disabled automatically. ![](/img/are-you-sure.png)

Outside contributors?

## Logging in via SSO

If SSO has been already added to your organization but you are currently logged out of Bitrise, you can easily log into your org:

1. Click `SAML SSO` on our [login page](https://app.bitrise.io/users/sign_in). 
2. Provide your organization name.

   ![](https://files.nuclino.com/files/f47f03b1-6918-4475-81bd-e940e826b630/Screenshot 2019-02-25 at 9.55.37.png)

You can get the following error message if when you try to sign into Bitrise via SAML.

 something went wrong image

## Logging in if not a Bitrise user yet

Questions:

Owners can:

* configure saml sso for an organization "saml admin"
* disable saml sso for the entire organization
* can invite members to an organization
* As per organization rules, only owners can remove members from an Organization.
* one company - 2 orgs: enable sso for only one and invite users to that one. Or enable for both orgs but then users cannot be shared among the orgs! If someone wants to be part of both orgs, he/she has to create two separate Bitrise accounts and tie them to the respective orgs individually.
* if you work for two companies, you should create two separate accounts on Bitrise to join the SSO secured organizations of the companies.
* saml certificate expires? - contact support!
* Auto-create/register user if it doesnt exist an auto assign to the right organization.  **Does not prevent the user to sign in with an alternative option**, e.g. connecting a GitHub account and signing in with the GitHub account.
* SAML SSO signup/signin should **automatically grant access to the given Organisation that SAML login is tied to**.