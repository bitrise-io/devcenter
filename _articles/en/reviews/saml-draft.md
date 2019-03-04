---
title: SAML-draft
redirect_from: []
date: 2019-02-27 13:46:46 +0000
published: false

---
## What is SAML SSO

Organizations created in Bitrise can log into Bitrise using their own SAML SSO provider to authenticate themselves with. All you have to do to is add Bitrise as an application to your own SAML-supporting Identity Provider (IdP) and set some credentials on your organization's `Security` tab on Bitrise. Once SSO is set up, you can log into Bitrise with a click of a button without having to worry about your user credentials.

bitrise along with easier / quicker login.

SAML SSO sign in process does not rule out the possibility of signing for example via your GitHub account.

{% include message_box.html type="important" title="Before connecting SAML SSO to your organization" content=" Make sure:

* you have a SAML-supporting Identity Provider that you can connect Bitrise to as an application.
* your account on Bitrise has an organization. If it doesn't have an organization, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for **existing and brand new organizations** on Bitrise.
* **as with other** [**organization management actions**](/team-management/user-roles-on-app-teams/)**, only the organization owner can set up SAML SSO to a Bitrise organization.** "%}

## Setting up SAML SSO for an existing Bitrise organization

In this tutorial, we describe how you can set up SAML SSO and invite organization members to set up their connection.

1. Go to your organization's `Security` tab on [bitrise.io](https://www.bitrise.io).
2. Copy the `Single Sign-On URL`. You will need this to add Bitrise as an app at your SSO provider's site.
3. Log into your own SSO provider.
4. Add Bitrise as an application using the copied URL at Step 2. You're generating your Single Sign-On (SSO) credentials which you will need in a minute on Bitrise.
5. Add the generated SSO credentials to the `Identity provider sign-on URL` and `Certificate` fields on the `Security` tab.
6. Click the `Configure SSO` button.
   ![](/img/SSO-page.jpg)

## Enabling SAML SSO

1. Bitrise sends a **verification e-mail** to all organization members. The email contains a `Sign In via SSO` button and a URL. Organization members are prompted to sign in to Bitrise by clicking the `Sign In via SSO` button or using the provided URL in the email.

   ![](/img/saml-step-up-enabling-missing.jpg)
   The email also shows the organization owner's email address (should you need to contact him/her.)
2. Your 're redirected to your SAML SSO provider's site where you have to provide your email address associated with your organization. WARNING: If you provide a **different Bitrise email address which is not related to that particular organization**, you will get below error message. Log in with the right email address of the organization.
   ![](/img/no-connected-sso-for-this-email-address.png)
3. You're directed to the the `Allow "your organization name" to sign you in` page comes up.
   * Click `Authorize` if you trust the **organization/group** to control your Bitrise account-sign in.
   * Click `Don't trust` if the invitation email is from an untrusted source and you receive an email from an untrusted source (cannot take control over your account.
     ![](/img/enable-saml.jpg)

If all went well, you will see `Single Sign-On (SSO) is enabled for this organization` message with the `Review Users` and the `Disable SSO` buttons.

* `Review Users` takes you from the `Security` tab to the `People` tab where you can check org member's SAML SSO status.
* `Disable SSO` disables SAML SSO for all org members. They will be able to sign in with the regular sign-in procedure. Please note that an individual org member can only be disabled at your own SAML SSO provider's site.![](/img/disable-saml.jpg)

## Invite

## Checking your SAML SSO status on Bitrise

Now that you have set up SAML SSO for your organization, you can check if other org members have enabled their SAML SSO yet.

1. Go to your organization on Bitrise.
2. Click `People` on the left menu.
3. Check your (or other organization members') SAML SSO status under `Members`.

   ![](/img/saml-status.png)

* `SAML SSO IS ENABLED`: login via SSO is enabled
* `SAML SSO IS DISABLED`: The org member most likely has not enabled SSO connection through the `Sign in via SSO` button sent out in the verification email.

If you click the `x` next to a member's name, it removes that member from all groups in that organization and his/her SSO gets disabled automatically.  Zoli enable > new pop up.![](/img/are-you-sure.png)

## Logging in via SSO with a Bitrise account

If SSO connection has been already added to your organization and you are currently logged out of Bitrise, you can easily log into your org:

1. Click `Login via SSO` on our [login page](https://app.bitrise.io/users/sign_in).
   ![](/img/login-via-sso.jpg)
   You will be redirected to the `Initiate Single Sign-on page`.
2. Provide your organization name.
3. Click `Continue to log in`.
   You will be redirected to your own SSO provider's page.
4. Provide your email address associated with the organization in Bitrise and follow your SAML SSO provider's instructions.

If all goes well, you land on our Dashboard. 

## Logging in via SSO without a Bitrise account

If you do not have a Bitrise account yet and an organization owner invites you to his/her org via email, you can easily sign up to Bitrise and connect to the respective organization! Our `Sign In via SSO` email is organization specific so you're just a couple of clicks away from signing up to Bitrise and accessing the right organization!

1. Find the invitation email you got from Bitrise (letsconnect@bitrise.io) in your mailbox. (If you received an URL instead of an email from the org owner, have no fear! Opening the link in a new tab will take you to your own SAML SSO provider's site.) 
2. Click `Sign In via SSO` or copy the provided URL in a new tab to acknowledge the connection. You will be redirected to your own SAML SSO provider's site.
3. Provide your email address. (It should be the same email address where you received the invitation.) Follow your SAML SSO provider's instructions.
4. You will be redirected to our `Almost there...` page.
5. Provide a username you wish to use in Bitrise.
6. Click `Finish Signing Up` to complete your sign up.

If all goes well, you land on our Dashboard. 

## Quick tips

* in two orgs and both have enabled sso, create two separate accounts to them.
* My SAML **certification has expired**. What can I do? contact support.

  SAML SSO