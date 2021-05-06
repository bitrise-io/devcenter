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
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on [G Suite](https://workspace.google.com/).

{% include message_box.html type="important" title="SAML SSO with Org Elite and Velocity plans" content="Please note that SAML SSO is only available for an Org with the [Org Elite and Velocity plans](https://www.bitrise.io/pricing). If you try to set up SAML SSO to an Org that has an [Org Standard subscription](https://www.bitrise.io/pricing/teams), the **Single Sign-On** tab will appear on the left menu bar in your **Account Settings** but you won’t be able to use it. Click **Upgrade to Org Elite** in the pop-up window to use SAML SSO in your Org.

Since the SAML SSO feature is tied to the Org Elite and Velocity plans, if you decide to downgrade, you will lose this feature. All Org members will receive an email about the downgrade and you’ll have two weeks to re-upgrade to the Org Elite plan if you wish to use SAML SSO in your Org again.

"%}

## Before you start

Before connecting SAML SSO to your Organization, make sure:

* You have a Google administrator account where you can add Bitrise as a SAML app. The G Suite administrator can help setting up SAML SSO on G Suit.
* Your account on Bitrise has an Org with [Org Elite or Velocity plan](https://www.bitrise.io/pricing). If it doesn’t have an Org, go ahead and [create one](/team-management/organizations/creating-org/).
* As with other [Org management actions](/team-management/organizations/members-organizations/), only the Org owner can set up SAML SSO to a Bitrise Org.

## Navigating to the Single Sign-On page of Bitrise

If you are an Org owner on Bitrise, you will have to use the **Single Sign-On** tab to set up a SAML SSO connection between your SAML SSO provider and your Bitrise Org.

1. On your Bitrise [Dashboard](https://app.bitrise.io/dashboard/builds) click your avatar, then click [**Account settings**](https://app.bitrise.io/me/profile#/overview) in the dropdown. ![](/img/account-settings-dropdown.jpg)
2. The **Overview** page displays all the Orgs you’re a member of. Select the Org where you wish to set up the SAML SSO connection.![](/img/overview-tab.jpg)
3. On the left menu bar, click the **Single Sign-On** which will take you to the **Enable Single Sign-On** page.![](/img/enablesinglesignon.jpg)
4. Continue with [Getting configuration information from Google](/team-management/organizations/setting-up-google-sso-for-bitrise/#getting-configuration-information-from-g-suite-and-bitrise).

## Getting configuration information from G Suite and Bitrise

 1. Sign into your Google Admin Console.
 2. Select **Apps** on the **Admin Console** page.![](/img/googleadmin-apps.jpg)
 3. On the Apps page, click **SAML apps**.![](/img/appsamlapp.jpg)
 4. On the **Web and mobile apps** page, click the **Add apps** button, and select the **Add custom SAML app** option from the dropdown.![](/img/addappsaml.jpg)
 5. On the App details page add `Bitrise` as your app name. Please note it must be `Bitrise` as no other format is accepted. Click **Continue**.![](/img/addappname.jpg)
 6. On the **Getting Identity Provider details** page:
    * Copy the **SSO URL** and paste it on the **SAML SSO provider Single Sing-On URL (SSO URL)** on Bitrise.
    * Copy the whole content of the **Certificate** field and paste it in the **SAML SSO provider certificate** field of Bitrise. You can upload the **Certificate** from your local computer too.![](/img/identityproviderdetails.jpg)![](/img/enablesinglesignon.jpg)
 7. While you are in Bitrise, click the **Copy Link** button to copy the **Assertion Consumer Service URL (ACS URL)**. We will need it on G Suite in a second. Let's NOT click the **Configure SSO** button just now!
 8. Let’s head back to the **Getting Identity Provider details** page of G Suite. Click **Continue**.
 9. On the **Service provider details** page:
    * Paste the **Assertion Consumer Service URL (ACS URL)** of Bitrise in the **ACS URL** field on G Suite. (Remember, we got the link at Step 7.)
    * Type `Bitrise` in the **Entity ID** field. Please note it must be `Bitrise` as no other format is accepted.
    * Tick the **Signed response** checkbox under **START URL (optional)**.
    * Click **CONTINUE**.![](/img/serviceproviderdetails.jpg)
10. Click the **Configure SSO** button on Bitrise.
11. On G Suite's **Attribute mapping** page, click **Finish** - you do not have to configure anything here.

## Enabling Bitrise app for a group or an organizational unit

All there is left to do on G Suite is to enable the newly created Bitrise app for a group or organization of your choice.

1. Go to the **Web and mobile apps** page on G Suite and select **Bitrise** from the **Apps** list.
2. Click **User access** to get to the **Service status** page.
3. Select **ON for everyone** and hit **Save**.![](/img/useraccess.jpg)

## What’s next?

Learn how you can [log into your Org now that SAML SSO is set up](/team-management/organizations/saml-sso-in-organizations/#logging-in-via-saml-sso-with-a-bitrise-account).

You might wan to [check out Org member’s SAML SSO statuses](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) once the connection is up.

You might want to [enforce SAML SSO login to the Org](/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-an-organization) once all Org members have authorized their SAML SSO connection to the Org.

Disabling SAML SSO is very simple - [learn how.](/team-management/organizations/saml-sso-in-organizations/#disabling-an-organizations-saml-sso)

{% include banner.html banner_text="Set up Google SSO!" url="https://app.bitrise.io/me/profile#/overview" button_text="Go to your Organization" %}