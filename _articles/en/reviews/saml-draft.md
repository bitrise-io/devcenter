---
title: SAML SSO in organizations
redirect_from: []
date: 2019-02-27 13:46:46 +0000
published: false

---
Organization members can log into/sign up to Bitrise using their own SAML SSO provider's system. Once enforcing SAML SSO, organizations will be able to apply the security guidelines of their SAML SSO provider when accessing their own Bitrise organization. 

{% include message_box.html type="important" title="Before connecting SAML SSO to your organization" content=" Make sure:

* you have an IdP that you can connect Bitrise to as an application.
* your account on Bitrise has an organization. If it doesn't have an organization, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for **existing and brand new organizations** on Bitrise.
* as with other [organization management actions](ht/team-management/organizations/members-organizations/), only the organization owner can set up SAML SSO to a Bitrise organization. "%}

## Setting up SAML SSO for a Bitrise organization

In this tutorial, we describe how you can set up SAML SSO and invite organization members to set up their connections.

1. Go to your organization's `Security` tab on [bitrise.io](https://www.bitrise.io).
2. Copy the `Single Sign-On URL`. You will need this to add Bitrise as an app on your SAML SSO provider's site.
3. Log into your own SAML SSO provider.
4. Add Bitrise as an application using the copied Single Sign-On URL. You're generating your Single Sign-On (SSO) credentials here which you will need in a minute on Bitrise.
5. Add the generated SSO credentials to the `Identity provider sign-on URL` and `Certificate` fields on the `Security` tab.
6. Click the `Configure SSO` button. ![](/img/SSO-page.jpg)

If've you've completed the steps, organization members should get a verification email about SAML SSO connected to the respective organization.

## Enabling SAML SSO

Now that the organization owner has set up SAML SSO, org members and the owner have to enable SAML SSO before logging into their org through SAML SSO.

1. Bitrise sends a **verification e-mail** to all organization members. This email contains a `Sign In via SSO` button and a URL. Organization members are prompted to sign in to Bitrise by clicking the `Sign In via SSO` button or using the provided URL in the email.

   ![](/img/saml-step-up-enabling-missing.jpg)

   The email also shows the organization owner's email address (should you need to contact him/her.)
2. You are redirected to your SAML SSO provider's site where you have to provide your email address associated with your Bitrise organization.

   If you provide a **different Bitrise email address on your IdP's site which is not related to that particular organization**, you will get the below error message. Log in with the **right email address of the organization**.

   ![](/img/no-connected-sso-for-this-email-address.jpg)
3. You're directed to the the `Allow "your organization name" to sign you in` page.

* Click `Authorize` if you trust the organization to control your Bitrise account-sign in process. Note that once you click `Authorize`, SAML SSO gets enforced on the organization and you'll **only be able access this account via SAML SSO authentication**.
* Click `Don't allow` if the invitation email is from an untrusted source.![](/img/enable-saml.jpg)

If all went well, you should be landing on our Dashboard.

## Checking SAML SSO statuses on Bitrise

Now that the organization owner has set up SAML SSO for the organization and all org members (including the owner) have enabled their SAML SSO, everyone in the org can check their SAML SSO statuses. There are some extra features that only the org owner can access so we will show what org members and the org owner can see.

### Organization owner

1. Go to your organization's profile page.
2. Click `Security` on the left menu. This `Security` tab is **only available for the org owner**!

   You will see the `Review Users` and the `Disable SSO` buttons:

   ![/img/disable-saml.jpg](https://app.forestry.io/sites/yv69yaruhkt48w/body-media//img/disable-saml.jpg)

   `Disable SSO` disables SAML SSO for all org members. They will be able to sign in with the regular sign-in procedure. Please note that an individual org member can only be disabled at your own SAML SSO provider's site.

   `Review Users` takes you from the `Security` tab to the `People` tab where you can check the org member's SAML SSO status.

   ![](/img/peopletab-org-owner.png)

* `SAML SSO IS ENABLED`: Login via SAML SSO is enabled
* `SAML SSO IS DISABLED`: The org member has not enabled SSO connection through the `Sign in via SSO` button. To enable it, the org member has to follow the instructions in the verification email from Bitrise.

### Organization members

1. Go to your organization's profile page.
2. Click `People` on the left menu.
3. Check your (or other organization members') SAML SSO status under `Members`.

   ![](/img/people-org-members.jpg)

* `SAML SSO IS ENABLED`: Login via SAML SSO is enabled
* `SAML SSO IS DISABLED`: The org member has not enabled SSO connection through the `Sign in via SSO` button. To enable it, the org member has to follow the instructions in the verification email from Bitrise.

## About SAML SSO enforcement

Enforcing SAML SSO on your organization provides an extra layer of security: you can enforce your own security guidelines to your Bitrise organization (for example, password format requirements, two-factor authentication). This will make SAML SSO the only way to log in/sing up to the organization. If you invite more org members to a SAML-enforced organization, they'll have to enable their SAML SSO connection first to join the organization.

### Enforcing SAML SSO on an organization

Once all org members have enabled their SAML SSO related to the organization, the owner can enforce SAML SSO on the organization.

1. Go to your organization's `Security` tab.
2. Toggle the switch to the right to enforce SAML SSO.

![](/img/enforce-saml-sso.png)

### When can't you enforce SAML SSO on your organization?

In some cases the org owner cannot enforce SAML SSO on the organization. This is related to org members who have not enabled their SAML SSO connection yet. The use cases to consider: 

* An org member fails to enable SAML SSO on his part:  The owner can remove the org member from the organization and complete the enforcement process for the rest of the organization. 
* An org member tried to enable SAML SSO with another organization: The owner can send the login URL to the org member who can follow the instructions to enable SAML SSO to the right organization.

![](/img/cant-enforce-saml-sso.png)


## Logging in via SSO with a Bitrise account

If SSO connection has been already added to your organization and you are currently logged out of Bitrise, you can easily log into your organization.

1. Click `Login via SSO` on our [login page](https://app.bitrise.io/users/sign_in). ![](/img/login-via-sso.jpg)
2. You will be redirected to the `Initiate Single Sign-on page`.
3. Provide your organization name.
4. Click `Continue to log in`. You will be redirected to your own SSO provider's page.
5. Provide your email address associated with the organization in Bitrise and follow your SAML SSO provider's instructions.

## Logging in via SSO without a Bitrise account

If you do not have a Bitrise account yet and an organization owner invites you to his/her organization via email, you can easily sign up to Bitrise and connect to the respective organization! Our `Sign In via SSO` email is organization-specific so you're just a couple of clicks away from signing up to Bitrise and accessing the right organization!

1. Find the invitation email you got from Bitrise (letsconnect@bitrise.io) in your mailbox.

   (If you received an URL instead of an email from the org owner, have no fear! Opening the link in a new tab will take you to the `Almost there...` page. Follow the instructions. You will receive a confirmation email from Bitrise which will include a link to finish the sign-up procedure.)
2. Click `Sign In via SSO` or copy the provided URL in a new tab to acknowledge the connection. You will be redirected to your own SAML SSO provider's site.
3. Provide your email address. (It should be the same email address where you received the invitation.)
4. Follow your SAML SSO provider's instructions.
5. You will be redirected to our `Almost there...` page.
6. Provide a username you wish to use in Bitrise.
7. Click `Finish Signing Up` to complete your sign up.

If all goes well, you land on our Dashboard.

## Disabling SAML SSO in an organization

Organization owners can disable an established SAML SSO for your organization with a click of a button on the `Security` tab. Please note that if you delete someone from the IdP, you have to delete that org member from Bitrise as well.

### Disabling an organization's SAML SSO

1. Go to the `Security` tab of your organization.
2. Click `Disable SSO`.

   A confirmation pop-up appears where you can confirm/cancel your action. Please note that by clicking the `Disable SSO` button, you will **disable SAML SSO for all organization members**. Once it's done, organization members will be able to log in through their normal Bitrise credentials.

![](/img/disable-sso.png)

### Disabling one org member's SAML SSO

Please note if you click the `x` next to an org member's name removes that person from the organization but his/her SAML SSO is yet to be disabled.

1. Go to your IdP's site.
2. Disable the org member. Please note that if you fail to do this, the org member will able to re-authenticate again to Bitrise using the IDP connection.

![](/img/disbale-sso-enabled-status.png)

## Expired SAML SSO certificates

If your SAML SSO certificate has expired and you cannot log into Bitrise through SAML SSO, we advise you to contact our Support team, who will be happy to assist you!

**In what case can this happen?**

**Can also the IDP / org owner help in this case?**