---
title: SAML-draft
redirect_from: []
date: 2019-02-27 13:46:46 +0000
published: false

---
## What is SAML SSO

Organizations created in Bitrise can log into Bitrise using their own SAML SSO system (easier user management, secure). All you have to do to is add Bitrise as an application to your own SAML-providing Identity Provider (IdP) and set some credentials on your organization's `Security` tab on Bitrise.

Auto-create/register user if it does not exist with that email yet and auto assign to the related Organization.

{% include message_box.html type="note" title="Connecting via Github" content=" Does not prevent the user to sign in with an alternative option, for example, connecting a GitHub account and signing in with the GitHub account. "%}

calls for enhanced security

adds an extra layer of security

it requires you to verify your identity

{% include message_box.html type="important" title="Before connecting SAML SSO to your organization" content="
Make sure you have the following already checked out:
* you have an SAML-supporting Identity Provider that you can connect Bitrise to as an application.
* your account on Bitrise has an organization. If it doesn't have an organization, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for **existing and brand new organizations** on Bitrise.
* **as with other** [**organization management actions**](/team-management/user-roles-on-app-teams/)**, only the organization owner can set up SALM SSO to a Bitrise organization.**
"%}

## Setting up SAML SSO for an existing Bitrise organization

In this tutorial, we describe how you can set up SAML SSO and email organization members on enabling the secure connection.
 1. Go to your organization's `Security` tab on [bitrise.io](https://www.bitrise.io).
 2. Copy the `Single Sign-On URL`.  which you will use in your own Identity Provider's (IdP) site.
 3. Log into your SSO provider.
 4. Add Bitrise as an application using the copied URL at Step 2. You're generating your Single Sign-On (SSO) credentials which you will need in a minute.
 5. Add those SSO credentials to the `Identity provider sign-on URL` and `Certificate` fields on the `Security` tab.
 6. Click the `Configure SSO` button.
    ![](/img/SSO-page.jpg)
    All members of your organization will be automatically signed out from Bitrise.
 7. Bitrise sends a **notification e-mail** to the organization owner and the organization members as well. This email contains:
    * the credentials of the Organization's SSO provider (Sign In  via SSO or the provided URL)
    * the the organization owner's email address (should you need to contact him/her.)

    ![](/img/email-notification.jpg)
 8. The owner (and other members) of this Organization are be prompted to sign in to Bitrise again by clicking the `sign In via SSO` button or using the provided URL in the email. If using the URL, make sure you open it in a _new tab_!
 9. Your SSO provider's page comes up again where you have to provide your Bitrise email address connected to your organization. WARNING: If you provide a **different Bitrise email address which is not related to that particular organization**, you will get the below error message. Log in with the right email address of the organization.![](/img/no-connected-sso-for-this-email-address.png)
10. As a last step, the `Allow "your organization name" to sign you in` page comes up.
    ![](/img/enable-saml.jpg)

* Click `Authorize` if you trust the **organization/group** to control your Bitrise account-sign in.
* Click `Don't trust` if **...**

If all went well, you will see `Single Sign-On (SSO) is enabled for this organization` message with a `Review Users` and a `Disable SSO` buttons.

* `Review Users` button takes you to the `People` tab from the `Security` tab where you can check your and other org member's SAML SSO status.
* `Disable SSO`button disables SSO for all org members who will be able to sign in with the regular sign-in procedure.
  ![](/img/disable-saml.jpg)

## Checking your SAML SSO status on Bitrise

Now that you have set up SAML SSO to your organization and the notification emails have been sent out to all org members, you might want to check other org members' SSO status. This is handy because from now on org members are automatically logged out from Bitrise until they enable SSO connection through the `Sign in via SSO` button in the notification email (Step 8).

1. Go to your organization on Bitrise.
2. Click `People` on the left menu.
3. Check your (or other organization members') SAML SSO status under `Members`.

   ![](/img/saml-status.png)

{% include message_box.html type="info" title="What does the `x` mean?" content="
If you click the `x` next to a member's name, it removes that member from all groups in that organization.
![](/img/are-you-sure.png)
"%}

Outside contributors?

## Signing in via SAML

You can get the following error message if when you try to sign into Bitrise via SAML.

image something went wrong

Not a bitrise user>

Owners can:

* configure saml sso for an organization "saml admin"
* disable saml sso for the entire organization
* can invite members to an organization
* As per organization rules, only owners can remove members from an Organization.