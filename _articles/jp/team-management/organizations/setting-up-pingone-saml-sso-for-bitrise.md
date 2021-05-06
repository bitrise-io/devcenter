---
changelog:
last_modified_at:
tag: []
title: Setting up Ping Identity SSO for Bitrise
redirect_from: []
description: ''

---

{% include not_translated_yet.html %}

This guide provides step-by-step instructions on setting up Bitrise as a SAML SSO application in [Ping Identity](https://www.pingidentity.com/en/trials.html).

This requires:

* A PingOne administrator who is logged into [PingOne](https://admin.pingone.com/web-portal/login).
* A Bitrise Organization owner who is logged into his/her Bitrise Organization.
* The Bitrise Organization must have an [Org Elite subscription](https://www.bitrise.io/pricing/teams).

## Adding Bitrise to Ping Identity

 1. Click **APPLICATIONS** on the top bar of [PingOne](https://admin.pingone.com/web-portal/login).
 2. On **My Applications** tab, make sure **SAML** is selected. Click the **Add Application** drop-down and select **New SAML Application**.

    ![{{ page.title }}](/img/new-saml-application-pingone.jpg)
 3. At **Application Details,** fill out the required fields and click **Continue to Next Step**.

    ![{{ page.title }}](/img/appdetailspage-pingone.jpg)
 4. At **Application Configuration**, leave the **I have the SAML configuration** selected. Fill out the following:
    * **Assertion Consumer Service (ACS)** field: Insert the **Single Sign-On URL** link here from your Bitrise Organization’s **Single Sign-On** tab.

    ![{{ page.title }}](/img/enable-single-signon.jpeg)
    * **Entity ID field**: Type `Bitrise`.
    * **Signing**: Click the **Sign Response** option.

      Here is an overview of the above settings: ![{{ page.title }}](/img/appconfig-requiredfields-bitrise.jpg)
 5. Continue to the next step.
 6. At **SSO Attribute Mapping**, you don’t have to change anything, proceed to the next step.
 7. At **Group Access**, add the group/s to your application. These groups will be able to access Bitrise through SAML SSO. Continue to the next step.

    ![{{ page.title }}](/img/group-access-pingone.jpg)
 8. At the **Review Setup** page, you can doublecheck the details you provided in the previous steps. Make sure you download the following files from this review page:
    * Click **Download** to get the **Signing Certificate** and **SAML Metadata** files.

      ![{{ page.title }}](/img/review-setup-pingone-downloadsaml.jpg)
 9. Click **Finish**.
10. Let’s open the two files.
    * Copy the entire content of the **SAML Metadata** file and paste it in the **Certificate** field of your Bitrise **Enable Single Sign-On** page.
    * Open the **Signing Certificate** file and copy the `HTTP-POST` `SingleSignOnService Location` link and paste it in the **Identity provider sign-on URL** field on Bitrise.

      ![{{ page.title }}](/img/Idp-certificate-bitrise.jpg)
11. Click **Configure SSO** on Bitrise.

Now you have set up SAML SSO on your Bitrise Organization. All there is left to do is [enable](/team-management/organizations/setting-up-pingone-saml-sso-for-bitrise/#enabling-saml-sso) it.

## Enabling SAML SSO

Once the Organization owner has set up the connection between the SAML SSO provider and the Organization, Bitrise [sends an email to all Organization members](/getting-started/signing-up-to-bitrise/#signing-up-with-sso).

1. Make sure you’re logged into Bitrise in the usual way. Use the same browser window to continue.
2. Find the email from Bitrise ([letsconnect@bitrise.io](mailto:letsconnect@bitrise.io)). You can click the **Sign In via SSO** button or copy-paste the URL to a NEW TAB of the same browser.

   ![{{ page.title }}](/img/sso-email-bitrise.jpg)
3. Click **Authorize**.

You should be landing on the Organization’s Dashboard. From now on, you can use the [Log in via SSO](https://app.bitrise.io/initiate-saml-sign-in) function to access your Organization on Bitrise.

You can check which Organization member has switched from the usual login flow to the SAML SSO one if you [check their statuses](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) on the **People** page. Once all in, you can [enforce SAML SSO](/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-an-organization) as the only gateway to the Organization.

{% include message_box.html type="note" title="SAML SSO on Bitrise" content=" If you’d like to learn more about SAML SSO on Bitrise, check out our SAML SSO in organizations guide. "%}

{% include banner.html banner_text="Set up PingOne SSO" url="https://app.bitrise.io/me/profile#/overview" button_text="Go to your organization" %}