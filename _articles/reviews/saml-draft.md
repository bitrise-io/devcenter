---
title: SAML-draft
redirect_from: []
date: 2019-02-27 13:46:46 +0000
published: false

---
## What is SAML SSO

You can sign up to Bitrise and log into an organization using your company SAML system. Auto-create/register user if it does not exist with that email yet and auto assign to the related Organisation.

{% include message_box.html type="note" title="Connecting via Github" content=" Does not prevent the user to sign in with an alternative option, for example, connecting a GitHub account and signing in with the GitHub account. "%}

calls for enhanced security

adds an extra layer of security

it requires you to verify your identity

## Setting up SAML SSO for your organization (existing)

Before you start setting up SAML SSO, make sure:

* Your account has an organization. If it doesn't have an organization, go ahead and create one. Learn how to [create an organization](https://devcenter.bitrise.io/team-management/organizations/creating-org/).
* **Only the organization owner can set up SAM SSO to a Bitrise organization.**
* You have an SAML-supporting identity provider that your company uses.

1. Go to your organization's Security tab on bitrise.io.
2. Copy the Single Sign-On URL which you will use in your own Identity Provider's (IdP) site.

   ![](/img/SSO-page.jpg)
3. Log into your Identity Provider (IdP) and add Bitrise as an application based on the copied URL at Step 2. You will generate your Single Sign-On (SSO) credentials here.
4. Add the Single Sign-On credentials to the `Identity provider sign-on URL` and `Certificate`
   fields.
5. Click the `Configure SSO` button. All members of your organization will be automatically signed out from Bitrise.
6. Bitrise sends a notification e-mail which contains the credentials of the Organization's SSO provider. This email also shows the organization owner with his/her email address, if you needed to contact the owner for more information.
7. Members of this Organization will be prompted to sign in again by clicking the `sign In via SSO` button or using the provided URL.

You can check SAML SSO status of the organization owner and other organization members on the `People` tab of your organization. If all went well, you will see `Single Sign-On (SSO) is enabled for this organization` with a `Review Users` and a `Disable SSO` buttons.

* `Review Users`: check the list of users who are registered to this SSO.

## How to disable SAML SSO

You can disable SAML SSO using the `Disable SSO` button on the Security tab of your organization's page. Once this is done, all Organization members will be able to sign in with the regular sign-in procedure.

![](/img/disable-saml.jpg)

* image on sso has been enabled/disabled email notification + what disabling means via email?

Outside contributors?
Remove username from your SSO provider?
Who is a SAML admin? \[short q&a\]

### Joining Bitrise via invitation email

If the Organization owner has connected an , you should have received a notification email from Bitrise which invites you to click the `Sign In via SSO` button or open the provided URL in a new tab.

1. Click the `Sign In via SSO` button or open the provided URL in a new tab.
2. In the next window, you can confirm if you want to allow your Organization to sign you in. If you do, click `Authorize`.

{% include message_box.html type="note" title="There is no connected SSO for this email address" content=" If you have provided the different email address than..., you will be notified in the `There is no connected SSO for this email address pop-up window`. Image. You can log in with the right account associated with your SSO. " %}

Error message `Something went wrong when tried to log in via SAML SSO`

## How to sign in with an existing SSO service?

Open below link in a new tab:

Copy the content of  "Signature Certificate" certificate (on the bottom of the page).

Insert it into the "Certificate" field (Organization's Security page).

Insert  below URL  into the "Identity provider sign-on URL:" field:

Click the "Configure SSO" button.

Owners can:

* configure saml sso for an organization
* Note that only owners can remove members from an Organization.
* disable saml soo for an organization
* can invite members to an organization