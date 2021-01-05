---
title: Setting up Google SSO for Bitrise
redirect_from: []
date: '2019-03-28T11:18:49.000+00:00'
tag:
- teams
- org
- security
- sso
description: Learn how to set up Bitrise as a SAML SSO app on Google, enable SAML
  SSO and enforce it on your Bitrise Organization.
changelog: ''
summary: ''
menu:
  organizations:
    weight: 17

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on G Suite.

{% include message_box.html type="important" title="SAML SSO with Org Elite and Velocity plans" content="Please note that SAML SSO is only available for an Org with the [Org Elite and Velocity plans](https://www.bitrise.io/pricing). If you try to set up SAML SSO to an Org that has an [Org Standard subscription](https://www.bitrise.io/pricing/teams), the **Single Sign-On** tab will appear on the left menu bar in your **Account Settings** but you won’t be able to use it. Click **Upgrade to Org Elite** in the pop-up window to use SAML SSO in your Org.

Since the SAML SSO feature is tied to the Org Elite and Velocity plans, if you decide to downgrade, you will lose this feature. All Org members will receive an email about the downgrade and you’ll have two weeks to re-upgrade to the Org Elite plan if you wish to use SAML SSO in your Org again.

"%}

## Before you start

Before connecting SAML SSO to your Organization, make sure:

* You have a Google administrator account where you can add Bitrise as a SAML app.
* Your account on Bitrise has an Org with [Org Elite or Velocity plan](https://www.bitrise.io/pricing). If it doesn’t have an Org, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for existing and brand new Orgs on Bitrise.
* As with other [Org management actions](/team-management/organizations/members-organizations/), only the Org owner can set up SAML SSO to a Bitrise Org.

## Navigating to the Single Sign-On page of Bitrise

If you are an Org owner on Bitrise, you will have to use the **Single Sign-On** tab to set up a SAML SSO connection between Google G Suite and your Bitrise Org.

1. On your Bitrise [Dashboard](https://app.bitrise.io/dashboard/builds) click your avatar, then click [**Account settings**](https://app.bitrise.io/me/profile#/overview) in the dropdown. ![](/img/account-settings-dropdown.jpg)
2. The **Overview** page displays all the Orgs you’re a member of. Select the Org where you wish to set up the SAML SSO connection.![](/img/overview-tab.jpg)
3. On the left menu bar, click the **Single Sign-On** which will take you to the **Enable Single Sign-On** page.![](/img/enable-single-sign-on-1.jpg)
4. Continue with [Getting configuration information from Google](/team-management/organizations/setting-up-google-sso-for-bitrise/#getting-configuration-information-from-google).

## Getting configuration information from G Suite and Bitrise

 1. Sign into your Google Admin Console.
 2. Select **Apps** on the **Admin Console** page.
 3. On the Apps page, click **SAML apps**.
 4. On the **Web and mobile apps** page, click the **Add apps** button, and select the **Add custom SAML app** option from the dropdown.
 5. On the App details page add Bitrise as your app name. Please not it must be Bitrise as other format is accepted. Click **Continue**.
 6. On the **Getting Identity Provider details** page: 
	- Copy the **SSO URL** and paste it on the **Identity Provider Sign-on URL** on Bitrise. 
	- Copy the whole content of the **Certificate** field and paste it in the **Certificate** field of Bitrise.
 7. While you are in Bitrise, click the **Copy Link** button to copy the **Single Sign-On URL**. We will need it on G Suite in a second.
 8. Click the **Configure SSO** button on Bitrise.
 9. Let’s head back to the **Getting Identity Provider details** page of G Suite. Click **Continue**.
10. On the **Service provider details** page:
	- Paste the **Single Sign-On URL** of Bitrise in the **ACS URL** field on G Suite. (Remember, we got the link at Step 7.)
	- Type Bitrise in the **Entity ID** field. Please note it must be Bitrise as no other format is accepted.
	- Tick the **Signed response** checkbox under **START URL (optional)**.
	- Click **CONTINUE**.
11. On the **Attribute mapping** page click **Finish** - you do not have to configure anything here.

## Configuring SAML SSO on Bitrise

1. Go back to Bitrise.
2. Click **Account Settings**.
3. Click the Organization you want to add SAML SSO.
4. Click the Organization's **Single Sign On** button on the left.
5. Paste the SSO URL to the **Identity provider sign-on URL** field. (Remember, you've copied this URL from the **Google IdP Information** window in your Google Admin Console).

   Paste the content of the downloaded certificate to the **Certificate** field.

   ![{{ page.title }}](/img/sso-saml-page.jpg)
6. Click the **Copy Link** button under **Single Sign-On URL** or copy the URL manually.

   You will need this in a minute in your Google Admin Console.
7. Click **Configure SSO**. Now let's head back to your Goodgle Admin Console.

## Finishing setting up Bitrise as a SAML app on Google

1. In your Google Admin Console you should see the **Basic information for your Custom App** window.
2. Add a name to the **Application Name** field. (It can be any name.)

   ![{{ page.title }}](/img/basic-info.png)
3. Click **Next**.
4. In the **Service Provider Details** window, do the following:
   * Paste the copied **Single Sign-On** URL from Bitrise's **Single Sign On** (Step 6 [above](/team-management/organizations/setting-up-google-sso-for-bitrise/#configuring-saml-sso-on-bitrise)) tab to the **ASC URL** field.
   * Type **Bitrise** to the **Entity ID** field. This time it must be Bitrise!
   * Tick the **Signed Response** box.

   ![{{ page.title }}](/img/service-provider-detail.jpg)
5. Click **Next** to proceed to the **Attribute Mapping** window.
6. Click **FINISH**.

   If all went well, this is what you should see:

   ![{{ page.title }}](/img/setup-complete.png)

## Enabling Bitrise as a SAML app on Google

1. Click **EDIT SERVICE**.

   ![{{ page.title }}](/img/turn-on-bitrise-in-console.png)
2. On the **Service Status** page, select your Organization unit on the left.
3. Click **ON** to enable Bitrise's service status.

   ![{{ page.title }}](/img/service-status.png)
4. Make sure you’re logged into Bitrise in the usual way. Use the same browser window to continue.
5. Bitrise sends a verification e-mail to all Organization members. This email contains a **Sign In via SSO** button and a URL. Organization members are prompted to sign in to Bitrise by clicking the **Sign In via SSO** button or using the provided URL.

   The email also shows the Organization owner's email address (should you need to contact them.) Click the **Sign In via SSO** button or copy-paste the URL to a NEW TAB of the same browser.

   ![{{ page.title }}](/img/saml-invitation-authentication.jpg)

   Below error message only appears if you’ve been trying to access the Authorization page in a Safari browser.

       Error: The CORS policy for this site does not allow access from the specified Origin....

   As a workaround, we suggest you to copy the URL and paste it in a new tab. It will work! For all other browser types, you should be safely landing to the **Authorization** page.
6. On the **Allow "Organization name" to sign you in** window, click **Authorize** if you trust the Organization.

   You should be landing on your Organization's Bitrise Dashboard. You can check on the **Groups** tab who has been added to the org as a SAML user.

   ![{{ page.title }}](/img/gorups-saml.jpg)

Congrats! You have successfully enabled the SAML connection! Since SAML SSO has not been enforced on your org yet, you can log in via SAML SSO or with your Bitrise credentials.

If you click **Account settings** and select the **Single Sign-On** tab from the left menu, you should see SAML SSO is enabled for your Organization. Once all Organization members have enabled their SAML SSO connection, you can [enforce SAML SSO on the whole organization with a simple toggle](/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-an-organization).

{% include message_box.html type="note" title="Signing up to Bitrise with SAML SSO" content=" If you’d like to learn more about SAML SSO on Bitrise, in particular, how to sign up to Bitrise with an Organization's SAML SSO, check out our [SAML SSO in organizations guide](/team-management/organizations/saml-sso-in-organizations/#signing-up-to-bitrise-with-saml-sso). "%}

{% include banner.html banner_text="Set up Google SSO!" url="https://app.bitrise.io/me/profile#/overview" button_text="Go to your Organization" %}