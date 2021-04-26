---
last_modified_at: '2020-03-25'
title: SAML SSO in Organizations
date: '2019-03-08T09:49:06.000+00:00'
redirect_from: []
tag:
- teams
- orgs
- security
- SSO
description: Organization members can log into or sign up to Bitrise using their own
  SAML SSO provider's system. With SAML SSO, Organizations will be able to apply the
  security guidelines of their SAML SSO provider when accessing their Bitrise Organization.
summary: ''
changelog: ''
menu:
  organizations:
    weight: 16

---
{% include video.html embed_url="https://www.youtube.com/embed/0LvV5E14Z4c" %}

Organization members can log in to a Bitrise Organization (Org) using their own SAML SSO provider’s system. With SAML SSO, Orgs will be able to apply the security guidelines of their SAML SSO provider when accessing their Bitrise Organization.

{% include message_box.html type="important" title="SAML SSO with Org Elite and Velocity plans" content="Please note that SAML SSO is only available for an Org with the [Org Elite and Velocity plans](https://www.bitrise.io/pricing). If you try to set up SAML SSO to an Org that has an [Org Standard subscription](https://www.bitrise.io/pricing/teams), the **Single Sign-On** tab will appear on the left menu bar in your **Account Settings** but you won’t be able to use it. Click **Upgrade to Org Elite** in the pop-up window to use SAML SSO in your Org.

Since the SAML SSO feature is tied to the Org Elite and Velocity plans, if you decide to downgrade, you will lose this feature. All Org members will receive an email about the downgrade and you’ll have two weeks to re-upgrade to the Org Elite plan if you wish to use SAML SSO in your Org again.

"%}

## Before you start

Before connecting SAML SSO to your Organization, make sure:

* You have a SAML SSO provider (Identity Provider) that you can connect Bitrise to and the administrator to the SAML SSO provider is at hand.
* Your account on Bitrise has an Org with [Org Elite or Velocity plan](https://www.bitrise.io/pricing). If it doesn’t have an Org, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for existing and brand new Orgs on Bitrise.
* As with other [Org management actions](/team-management/organizations/members-organizations/), only the Org owner can set up SAML SSO to a Bitrise Org.

## Navigating to the Single Sign-On page of Bitrise

If you are an Org owner on Bitrise, you will have to use the **Single Sign-On** tab to set up a SAML SSO connection between your SAML SSO provider and your Bitrise Org.

1. On your Bitrise [Dashboard](https://app.bitrise.io/dashboard/builds) click your avatar, then click [**Account settings**](https://app.bitrise.io/me/profile#/overview) in the dropdown.
   ![](/img/account-settings-dropdown.jpg)
2. The **Overview** page displays all the Orgs you’re a member of. Select the Org where you wish to set up the SAML SSO connection.![](/img/overview-tab.jpg)
3. On the left menu bar, click the **Single Sign-On** which will take you to the **Enable Single Sign-On** page.
4. Continue with [setting up SAML SSO for your Org on Bitrise](/team-management/organizations/saml-sso-in-organizations/#setting-up-saml-sso-for-a-bitrise-organization).

{% include message_box.html type="info" title="Specific guides about connecting Bitrise to a SAML SSO provider" content="Bitrise can be connected to a bunch of SAML SSO providers. Check out our detailed guides on how to set them up:

* [Setting up Azure AD SSO for Bitrise](/team-management/organizations/setting-up-azure-ad-sso-for-bitrise/)
* [Setting up Google SSO for Bitrise](/team-management/organizations/setting-up-google-sso-for-bitrise/)
* [Setting up Idaptive SAML SSO for Bitrise](/team-management/organizations/setting-up-idaptive-saml-sso-for-bitrise/)
* [Setting up Okta SSO for Bitrise](/team-management/organizations/setting-up-okta-sso-for-bitrise/)
* [Setting up OneLogin SSO for Bitrise](/team-management/organizations/setting-up-onelogin-sso-for-bitrise/)
* [Setting up Ping Identity SSO for Bitrise](/team-management/organizations/setting-up-pingone-saml-sso-for-bitrise/)"%}

## Setting up SAML SSO for a Bitrise Organization

In this tutorial, we describe how Org owners can set up their SAML SSO and invite Org members to set up their own connections.

1. Go to your Org’s **Enable Single Sign-On** page on [bitrise.io](https://www.bitrise.io/).
2. Copy the **Assertion Consumer Service URL (ACS URL)** by clicking on the **Copy Link** button. You will need this URL to add Bitrise on your SAML SSO provider’s site.
3. Log in to your own SAML SSO provider.
4. Add Bitrise using the copied **Assertion Consumer Service URL (ACS URL)**. You’re generating your Single Sign-On (SSO) credentials here which you will need in a minute on Bitrise.
5. Add the generated SSO credentials to the **SAML SSO provider Single Sign-On URL (SSO URL)** and **SAML SSO provider certificate** fields on the **Enable** **Single Sign-On** page.
6. Click the **Configure SSO** button.

If you've completed the steps, you and Org members should get a verification email about SAML SSO connected to the respective Organization.

## Authorizing SAML SSO

Now that the Org owner has set up SAML SSO, everyone in the Org has to authorize SAML SSO before logging in to their Org via SAML SSO.

1. Make sure you’re logged into Bitrise in the usual way. Use the same browser window to continue.
2. Bitrise sends a verification e-mail to all Org members. By clicking the **Log In via SAML SSO** button or using the provided URL, organization members can authorize themselves for SAML SSO login. The email also shows the Org owner’s email address (in case you would need to contact them.) Click the **Log In via SAML SSO** button or copy-paste the URL to a NEW TAB of the same browser.![](/img/email-samlssso.jpg)
3. You’re directed to Bitrise to **Allow “Organization name” to sign you in** page.
   * Click **Authorize** if you trust the Organization to control your Bitrise account sign-in process.  
     If you’re already logged in to your SAML SSO provider, you’ll be automatically taken to your Bitrise Dashboard.  
     If you’re not, you’ll be prompted to log in on your SAML SSO provider’s site, and then taken to your Bitrise Dashboard.
   * Click **Don’t Allow** if the invitation email is from an untrusted source.

     ![SAML SSO in Organizations](https://devcenter.bitrise.io/img/enable-saml.jpg)

     Note that if you are using a different non-matching email address, you will get the below error message. Make sure you log in with the right email address both on Bitrise, as well as on your SSO provider site.![](/img/noconnectedsamlsso.png)

If all went well, you should be landing on our Bitrise Dashboard. As an Org owner, you might want to check how Org members are progressing with their SAML SSO connection: [check Org member’s SAML SSO statuses ](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise)or [invite new members to the Org](/team-management/organizations/saml-sso-in-organizations/#inviting-new-org-members-with-saml-sso).

## Inviting new Org members with SAML SSO

Once SAML SSO is set up on an Org, you can invite new members to your Org using SAML SSO.

Before you start:

* Make sure the new member is already a group member in your SAML SSO provider.
* Make sure the email address associated with the new member is the one that is registered in your SAML SSO provider and you use the same on Bitrise as well.

1. Go to your SAML SSO Org on Bitrise and click the **Groups** tab.
2. Find the **SAML users** section and click the **+** sign to add a new member.
3. Enter their email address and click the arrow icon. This will add the member to the SAML user’s list and Bitrise automatically sends out our SAML invitation instructions to the new member.
4. You can keep adding new users using the same method or finish the addition(s) by clicking the **Done** button.![](/img/addingnewsamlgroup.jpeg)![](/img/email.jpeg)

Until the new member does not go through the invitation process, you will see a **REINVITE** button next to their name on the **Groups** page. If they fail to sign up via SAML SSO and their invitation times out, you can resend the invitation by clicking this button. Once they successfully sign up, the button disappears.

### Joining a SAML SSO Org on Bitrise as a new member

If a Bitrise Org owner invites you to an Org, you should get an email invitation to join the Org via SAML SSO. Let’s see how!

1. Go to your mailbox and find our email titled **Saml invitation instructions**.
2. Click the **Sign in via SSO** button or copy the provided URL and paste it into a new browser. Our **Almost there** page appears.
3. Provide a **Username** you would like to use in your Bitrise Org. Please use only letters, numbers, underscores (_), dashes (-) and dots (.) in your username. The **Email** field is non-editable.
4. Click the **Finish Sign** up button. If all went well, you’re landing on Bitrise and can add your first app.![](/img/almostthere.jpeg)

## Checking SAML SSO statuses on Bitrise

Now that the Organization owner has set up SAML SSO for the Org, all Org members (including the Org owner) can check their other Org member’s SAML SSO statuses on the **People** tab.

{% include message_box.html type="note" title="Accessing the **Single Sign-On** tab" content="Please note that the **Single Sign-On** tab is only available for the Org owner. "%}

### About SAML SSO statutes

There are two kinds of SAML SSO statutes on Bitrise.

* **SAML SSO IS ENABLED:** Login via SAML SSO is enabled.
* **SAML SSO IS DISABLED:** The Org member has not enabled the SAML SSO connection yet. To enable it, the Organization member has to follow the instructions in the verification email from Bitrise.

#### If you are an Org member

1. Go to your Organization’s profile page.
2. Click the **People** tab on the left menu to check the Organization member’s SAML SSO status.
   ![](/img/samlstatusorgmember.jpeg)

#### If you are an Org owner

1. Go to your Org’s profile page.
2. Click the **Group** tab on the left menu and look for the SAML users group, where you can check and manage your SAML users.
3. Alternatively, click the **People** tab on the left menu to check the Organization member’s SAML SSO status, such as Org members can do.  
   You can also navigate to this page from the **Single Sign-On** page by clicking on the **Review Users** buttons.![](/img/org-owner-single-sign-on.jpg)

Org owners have the right to delete an Org member from an Org by clicking the cross next to the member’s name on the **People** tab.

## Enforcing SAML SSO on an Organization

Enforcing SAML SSO on your Org provides an extra layer of security: you can enforce your own security guidelines to your Bitrise Org (for example, password format requirements, two-factor authentication).

{% include message_box.html type="warning" title="Enforced SAML SSO" content="Please note that enforcing SAML SSO in your Org makes SAML SSO the only way for logging in/signing up to the Org."%}

1. Go to your Organization's **Single Sign On** tab.
2. Toggle the switch to the right to enforce SAML SSO.
3. Click **Save Changes**.

### Turning SAML SSO enforcement on

To enforce SAML SSO on an Org in Bitrise, all Org members have to first enable their SAML SSO related to their Org, then the owner can enforce SAML SSO on the Org with a simple toggle.

1. Go to your Org’s **Single Sign-On** tab.
2. Toggle the switch to the right to enforce SAML SSO.
3. Click **Save Changes**.

Now Org members can only log in via SAML SSO.![](/img/saml-sso-enforced.jpg)

{% include message_box.html type="note" title="Adding a Bitrise user to an Org with enforces SSO" content="If you wish to add a Bitrise user (who is not a member in your Org) to your Org with enforced SSO, then we recommend that the Org admin turns the enforced SSO off and [invites the user to the Org](/team-management/organizations/saml-sso-in-organizations/#inviting-new-org-members-with-saml-sso). The invited Bitrise user has to go through the [invitation process and enable SSO connection](/team-management/organizations/saml-sso-in-organizations/#joining-a-saml-sso-org-on-bitrise-as-a-new-member). Once that is done, the Org admin can turn the Enforce SSO switch back on."%}

### Can’t enforce SAML SSO on your Organization?

An Org owner cannot enforce SAML SSO on the Org if Org members have not enabled their SAML SSO connection yet or they enabled SAML SSO with another Org.

Please note that you cannot be a member in two SAML SSO Org on Bitrise.![](/img/cantenforce.png)

## Logging in via SAML SSO with a Bitrise account

If the SAML SSO connection has been already added to your Org and you have enabled your SAML SSO connection too, you can easily log in to your Org without having to use a password and email address.

1. Click **Login via SSO** on our [login page](https://app.bitrise.io/users/sign_in). ![{{ page.title }}](/img/login-via-sso.jpg)
2. You will be redirected to the **Initiate Single Sign-On page**.
3. Provide your Org name in the **Bitrise Organization’s Name** field.![](/img/initiate-single-sign-on.jpg)
4. Click **Continue with SSO** to log in.
   * If you’re logged in on your SSO provider site, you will be automatically landing on your Bitrise Dashboard.
   * If you’re logged out on your SSO provider site, you will be redirected there to log in. After the successful login, you will be redirected to your Bitrise dashboard.

{% include message_box.html type="info" title="Expired SAML SSO certificate" content=" If your SAML SSO certificate has expired, and you cannot log into Bitrise through SAML SSO, you can contact our Support team to help you log in. "%}

## Disabling an Organization's SAML SSO

The Single Sign-On page is available for Org owners only. There you can see the red Disable SSO button. If you disable SAML SSO, Org members will be able to sign in with the regular sign-in procedure.

1. Go to the **Single Sign-On** tab of your Org.
2. Click **Disable SSO**.

   A confirmation pop-up appears where you can confirm/cancel your action. Please note that by clicking the **Disable SSO** button, you will disable SAML SSO for all Organization members. Once it's done, Org members will be able to log in through their normal Bitrise credentials.![](/img/disable-samlsso.jpg)

{% include message_box.html type="note" title="How to disable when SAML SSO is enforced?" content="If SAML SSO has been enforced on the Org before, you have to first toggle the **Enforce SAML SSO** toggle to the left and then click the **Disable SSO** button."%}
![](/img/saml-sso-enforced-1.jpg)

You will receive an **SSO has been disabled** email from Bitrise (letsconnect@bitrise.io) which confirms the disabled SAML SSO for the Organization.

![](/img/samlssodisabledemail.png)

### Disabling one Organization member's SAML SSO

If you are on Org owner, you can disable an Org member’s SAML SSO connection to the Org on Bitrise.

There are three ways for Org owners to disable a member from the SAML SSO Org:

* Remove the user from the SAML users group by clicking the red **x** symbol next to the name on the Groups tab.
* Remove the user from the Org.
* Remove the user from the SAML SSO provider which means the user would not be able to log in with SAML SSO any more.

{% include banner.html banner_text="Let's configure SAML SSO to your Organization!" url="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta" button_text="Go to your Organization" %}