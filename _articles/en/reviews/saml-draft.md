---
title: SAML-draft
redirect_from: []
date: 2019-02-27 13:46:46 +0000
published: false

---
## What is SAML SSO

Organizations created in Bitrise can log into or sign up to Bitrise using their own SAML SSO provider. All you have to do to is add Bitrise as an application to your own SAML SSO provider and enable the connected SAML SSSO.

Please note that signing in via SAML SSO does not inhibit you from signing in, for example, via your GitHub account to Bitrise.

{% include message_box.html type="important" title="Before connecting SAML SSO to your organization" content=" Make sure:

* you have a SAML SSO provider that you can connect Bitrise to as an application.
* your account on Bitrise has an organization. If it doesn't have an organization, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for **existing and brand new organizations** on Bitrise.
* as with other [organization management actions](/team-management/user-roles-on-app-teams/), only the organization owner can set up SAML SSO to a Bitrise organization. "%}

## Setting up SAML SSO for an existing Bitrise organization

In this tutorial, we describe how you can set up SAML SSO and invite organization members to set up their connections.

1. Go to your organization's `Security` tab on [bitrise.io](https://www.bitrise.io).
2. Copy the `Single Sign-On URL`. You will need this to add Bitrise as an app on your SAML SSO provider's site.
3. Log into your own SAML SSO provider.
4. Add Bitrise as an application using the copied Single Sign-On URL. You're generating your Single Sign-On (SSO) credentials here which you will need in a minute on Bitrise.
5. Add the generated SSO credentials to the `Identity provider sign-on URL` and `Certificate` fields on the `Security` tab.
6. Click the `Configure SSO` button. ![](/img/SSO-page.jpg)

If've you've completed the steps, organization members should get a verification email about SAML SSO connected to the respective organization.

## Enabling SAML SSO

Now SAML SSO has been set up to the organization but individual org members have to enable SAML SSO on their part.

1. Bitrise sends a **verification e-mail** to all organization members. This email contains a `Sign In via SSO` button and a URL. Organization members are prompted to sign in to Bitrise by clicking the `Sign In via SSO` button or using the provided URL in the email.

   ![](/img/saml-step-up-enabling-missing.jpg) The email also shows the organization owner's email address (should you need to contact him/her.)
2. You are redirected to your SAML SSO provider's site where you have to provide your email address associated with your Bitrise organization.

   WARNING: If you provide a **different Bitrise email address which is not related to that particular organization**, you will get the below error message. Log in with the right email address of the organization.

   ![](/img/no-connected-sso-for-this-email-address.jpg)
3. You're directed to the the `Allow "your organization name" to sign you in` page.
   * Click `Authorize` if you trust the organization to control your Bitrise account-sign in process.
   * Click `Don't allow` if the invitation email is from an untrusted source.![](/img/enable-saml.jpg)

If all went well, you will see `Single Sign-On (SSO) is enabled for this organization` message with the `Review Users` and the `Disable SSO` buttons.

* `Review Users` takes you from the `Security` tab to the `People` tab where you can check org member's SAML SSO status.
* `Disable SSO` disables SAML SSO for all org members. They will be able to sign in with the regular sign-in procedure. Please note that an individual org member can only be disabled at your own SAML SSO provider's site.![](/img/disable-saml.jpg)

## Checking your SAML SSO status on Bitrise

Now that you have set up SAML SSO for your organization, you can check if other org members have enabled their SAML SSO.

1. Go to your organization on Bitrise.
2. Click `People` on the left menu.
3. Check your (or other organization members') SAML SSO status under `Members`.

   ![](/img/saml-status.png)

* `SAML SSO IS ENABLED`: login via SSO is enabled
* `SAML SSO IS DISABLED`: The org member most likely has not enabled SSO connection through the `Sign in via SSO` button. To enable it, follow the instructions in the verification email you got from Bitrise.

## Disabling SAML SSO in an organization

You can disable an established SAML SSO for your organization with a simple click.

1. Go to the `Security` tab of your organization.
2. Click `Disable SSO`.

   A confirmation pop-up appears where you can confirm/cancel your action. Please note that by clicking the `Disable SSO` button, you will disable SAML SSO for all organization members. Once it's done, organization members will be able to log in through their normal Bitrise credentials.

![](/img/disable-sso.png)

Please note if you click the `x` next to an org member's name, it will only remove that person from the organization but his/her SAML SSO is still to be revoked. You can revoke it in your SAML SSO provider's site.

![](/img/disbale-sso-enabled-status.png)

## Logging in via SSO with a Bitrise account

If SSO connection has been already added to your organization and you are currently logged out of Bitrise, you can easily log into your organization.

1. Click `Login via SSO` on our [login page](https://app.bitrise.io/users/sign_in). ![](/img/login-via-sso.jpg) You will be redirected to the `Initiate Single Sign-on page`.
2. Provide your organization name.
3. Click `Continue to log in`. You will be redirected to your own SSO provider's page.
4. Provide your email address associated with the organization in Bitrise and follow your SAML SSO provider's instructions.

If all goes well, you land on our Dashboard.

## Logging in via SSO without a Bitrise account

If you do not have a Bitrise account yet and an organization owner invites you to his/her organization via email, you can easily sign up to Bitrise and connect to the respective organization! Our `Sign In via SSO` email is organization-specific so you're just a couple of clicks away from signing up to Bitrise and accessing the right organization!

1. Find the invitation email you got from Bitrise (letsconnect@bitrise.io) in your mailbox.

   (If you received an URL instead of an email from the org owner, have no fear! Opening the link in a new tab will take you to your own SAML SSO provider's site.)
2. Click `Sign In via SSO` or copy the provided URL in a new tab to acknowledge the connection. You will be redirected to your own SAML SSO provider's site.
3. Provide your email address. (It should be the same email address where you received the invitation.)
4. Follow your SAML SSO provider's instructions.
5. You will be redirected to our `Almost there...` page.
6. Provide a username you wish to use in Bitrise.
7. Click `Finish Signing Up` to complete your sign up.

If all goes well, you land on our Dashboard.

## Expired SAML SSO certificates

If your SAML SSO certificate has expired and you cannot log into Bitrise through SAML SSO, we advise you to contact our Support team, who will be happy to assist you!