---
tag:
- teams
- org
- security
- sso
title: Setting up Idaptive SAML SSO for Bitrise
redirect_from: []
summary: ''
menu:
  organizations:
    weight: 22

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on [Idaptive](https://www.idaptive.com/ "https://www.idaptive.com/").

{% include message_box.html type="important" title="SAML SSO with Org Elite and Velocity plans" content="Please note that SAML SSO is only available for an Org with the [Org Elite and Velocity plans](https://www.bitrise.io/pricing). If you try to set up SAML SSO to an Org that has an [Org Standard subscription](https://www.bitrise.io/pricing/teams), the **Single Sign-On** tab will appear on the left menu bar in your **Account Settings** but you won’t be able to use it. Click **Upgrade to Org Elite** in the pop-up window to use SAML SSO in your Org.

Since the SAML SSO feature is tied to the Org Elite and Velocity plans, if you decide to downgrade, you will lose this feature. All Org members will receive an email about the downgrade and you’ll have two weeks to re-upgrade to the Org Elite plan if you wish to use SAML SSO in your Org again.

"%}

## Before you start

* As with other [Org management actions](/team-management/organizations/members-organizations/), only the Org owner can set up SAML SSO to a Bitrise Org.
* You must be logged into your Admin Portal on [Idaptive](https://www.idaptive.com/) to set up Bitrise as a SAML SSO app and establish the connection between Bitrise and Idaptive. If you are using the **User Portal**, **Switch to** **Admin Portal** by clicking your avatar on Idaptive.

![{{ page.title }}](/img/step1.jpg)

* Your account on Bitrise has an Org with [Org Elite or Velocity plan](https://www.bitrise.io/pricing). If it doesn’t have an Org, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for existing and brand new Orgs on Bitrise.

## Navigating to the Single Sign-On page of Bitrise

If you are an Org owner on Bitrise, you will have to use the **Single Sign-On** tab to set up a SAML SSO connection between your Idaptive and your Bitrise Org.

1. On your Bitrise [Dashboard](https://app.bitrise.io/dashboard/builds) click your avatar, then click [**Account settings**](https://app.bitrise.io/me/profile#/overview) in the dropdown. ![](/img/account-settings-dropdown.jpg)
2. The **Overview** page displays all the Org you’re a member of. Select the Org where you wish to set up the SAML SSO connection.![](/img/overview-tab.jpg)
3. On the left menu bar, click the **Single Sign-On** which will take you to the **Enable Single Sign-On** page.![](/img/enable-single-sign-on-1.jpg)
4. Continue with Getting configuration information from Idaptive.

## Getting configuration information from Idaptive

 1. Log into Idaptive as an Admin.
 2. Go to **Apps,** then to **Web Apps**. Click the **Add Web Apps** button on the right.![{{ page.title }}](/img/step2.png)
 3. On the **Custom** tab and select **SAML**, and click **Add**. On the **Add Web App** popup hit **Yes**. **Close** the window. You will be automatically directed to the **Settings** page.

    ![{{ page.title }}](/img/step3.png)
 4. Add Bitrise to the **Name** and **Application ID** fields on the **Settings** page and click **Save**.

    ![{{ page.title }}](/img/step-name.jpg)

    ![{{ page.title }}](/img/step4b.jpg)
 5. Click **Trust** on the left menu bar and select the **Manual configuration** under **Identity Provider Configuration**.
 6. Click the **Signing Certificate** dropdown and download the certificate. Open it with a text editor so that you can copy the full content of the certificate.

    ![{{ page.title }}](/img/download.jpg)
 7. Insert it in the **Certificate** text box on the **Single Sign On page** of Bitrise.
 8. Copy the **Single Sign On URL** from **Trust** page of Idaptive. Insert it on the **Identity provider sign-on URL** field on the **Single Sign On page** of Bitrise.
 9. While on the **Single Sign On page** of Bitrise, copy the Single Sign-On URL and click **Configure SSO**.

    ![{{ page.title }}](/img/configure-sso.jpg)
10. Now let’s head back to Idaptive! Under **Service Provider Configuration** click **Manual Configuration**. Type **Bitrise** in the **SP Entity ID / Issuer / Audience** and paste the **Single Sing-On URL** from Bitrise to the **Assertion Consumer Service (ACS) URL** on Idaptive.

    ![{{ page.title }}](/img/manual-config.jpg)
11. Scroll down to **NameID Format** and select **emailAddress**. Click **Save**.

    ![{{ page.title }}](/img/name-id.jpg)
12. Go to **Permissions** and click the **Add** button. In the **Select User, Group, or Role** popup, type the user name you want to add to the SAML app. Select it and hit **Add**. Save your changes. This will change the status of your Bitrise SAML app to **Deployed**.

    ![{{ page.title }}](/img/step10.png)
13. Continue with Authorizing SAML SSO.

## Authorizing SAML SSO

Now that the Org owner has set up SAML SSO, everyone in the Org has to authorize SAML SSO before logging in to their Org via SAML SSO.

1. Make sure you’re logged into Bitrise in the usual way. Use the same browser window to continue.
2. Bitrise sends a verification e-mail to all Org members. By clicking the **Log In via SAML SSO** button or using the provided URL, organization members can authorize themselves for SAML SSO login. The email also shows the Org owner’s email address (in case you would need to contact them.) Click the **Log In via SAML SSO** button or copy-paste the URL to a NEW TAB of the same browser.![](/img/email-samlssso.jpg)
3. You’re directed to Bitrise to **Allow “Organization name” to sign you in** page.
   * Click **Authorize** if you trust the Organization to control your Bitrise account sign-in process.  
     If you’re already logged in Idaptive, you’ll be automatically taken to your Bitrise Dashboard.  
     If you’re not, you’ll be prompted to log into Idaptive, and then taken to your Bitrise Dashboard.
   * Click **Don’t Allow** if the invitation email is from an untrusted source.

     ![SAML SSO in Organizations](https://devcenter.bitrise.io/img/enable-saml.jpg)

     Note that if you are using a different non-matching email address, you will get the below error message. Make sure you log in with the right email address both on Bitrise, as well as on your SSO provider site.![](/img/noconnectedsamlsso.png)

If all went well, you should be landing on our Bitrise Dashboard.

## What's next?

Learn how you can:

* [Check out Org member’s SAML SSO statuses](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) once the connection is up.
* [Invite new members with SAML SSO.](/team-management/organizations/saml-sso-in-organizations/#inviting-new-org-members-with-saml-sso)
* [Enforce SAML SSO login](/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-an-organization) to the Org once all Org members have authorized their SAML SSO connection to the Org.
* [Log into your Org](/team-management/organizations/saml-sso-in-organizations/#logging-in-via-saml-sso-with-a-bitrise-account) now that SAML SSO is set up.
* Disable SAML SSO on an Org.