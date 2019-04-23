---
title: Okta
redirect_from: []
date: 2019-04-23 08:56:13 +0000
published: false

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on [okta](https://www.okta.com/).

This requires:

* an okta administrator who is logged into okta
* a Bitrise organization owner who is logged into the his/her Bitrise organization (with [Org Elite subscription](https://www.bitrise.io/pricing/teams))

## Adding Bitrise to okta

Bitrise is not integrated to okta as an application so first you have to add it to okta, then you can set up SAML SSO on the newly added app.

 1. Log into okta and click `Admin`.

    ![](/img/add-apps-okta.png)
 2. On your Dashboard click `Add Applications` under `Shortcuts`.

    ![](/img/okta-shortcuts.png)
 3. Click the green `Create New App` button.

    ![](/img/okta-create-new-app.png)

    The `Create a New Application Integration` screen is displayed.
 4. Select `SAML 2.0` option at `Sing on method` and click `Create`.

    ![](/img/okta-create-new-app-pop-up.png)
 5. At `General Settings` type Bitrise into the `App name` field. (Optionally, you can add an app logo if you wish.) Click `Next`.

    ![](/img/okta-general-settings.png)
 6. Head over to your Bitrise organization and click the `Single Sign On` tab on the left menu.
 7. Click the `Copy Link` button to copy the Single Sign-On URL.

    ![](/img/okta-bitrise-config.png)
 8. Head back to okta's `SAML Settings` and paste the copied URL to the `Single sign on URL` input field.
 9. Type Bitrise at the `Audience URI (SP Entity ID)`.

    You can download the Okta certificate file now and paste its content in the `Certificate` field on your Bitrise org's `Single Sign On` page. Even easier if you leave it for a later step as you will need the `Identity provider sign-on URL` from okta which you can only fetch at a later step.

    ![](/img/saml-settings-okta.jpg)
10. Click `Next`.
11. Select the answer at Feedback as best it suits your organization. Hit `Finish`.

Congrats! Bitrise has been successfully added to okta as an app.

## Configuring Bitrise as a SAML app

1. Click the `Assignments` tab of your Bitrise app.

   Here you can assign Bitrise to all individual people or groups as well. Make sure you assign Bitrise to all who will access Bitrise org through SAML.

   ![](/img/okta-assign-user.png)
2. Click the `Sign-On` tab of your Bitrise app. You will see that SAML setup is not yet completed. Click `View Setup Instructions`.

   ![](/img/view-setup-instructions.png)
   The `How to Configure SAML 2.0 for Bitrise application` page summarizes all the information you need to set up the SAML connection between Bitrise and okta.

   ![](/img/configure-bitrise-okta.jpg)
3. Copy the `Identity Provider Single Sign-On URL` and paste it in your Bitrise org's `Identity provider sign-on URL`.
4. If you haven't inserted the Certificate yet into the respective field of your Bitrise org, you can copy the certificate and paste it the respective field of your Bitrise org.
5. Click `Configure SSO`.

## Enabling SAML SSO on Bitrise

To enable your own SAML SSO connection to the Bitrise org / org where saml has been setup.

1. Check your mailbox (one associated with your Bitrise account) for an email notification from Bitrise (sent by `letsconnect@bitrise.io`).
2. Click `Sign In via SSO`. This will take you to an authorization page where you have to click `Authorize` if you trust the organization.

If all went well, you should be on your Dashboard. If you go to the `Groups` tab the organization, you can see that you are automatically added as a SAML user. All org members, who enable SAML SSO, will appear here automatically.

Please note that at this stage, SAML SSO has not been enforced as the sole gateway to the organization. You can only enforce it if all org members have completed the enablement steps. You can check each org member's status (enabled or disabled) if you click the `Review Users` button on the org's `Single Sign-On` tab.

## Enforcing SAML SSO on the organization

To be able to sign into Bitrise exclusively via SAML SSO, you have to [enforce SAML on the organization](https://devcenter.bitrise.io/team-management/organizations/saml-sso-in-organizations/#about-saml-sso-enforcement). Mind you! You can only enforce SAML SSO on the org, if **all org** members have enabled their SAML SSO connection.

1. Toggle the `Enforce SAML SSO` switch to the right on the `Single Sign On` tab of the org.
2. Click `Save Changes`.

From now on, org members will be able to log in exclusively via SAML SSO.

![](https://devcenter.bitrise.io/img/enforce-sso.png)

{% include message_box.html type="note" title="SAML SSO on Bitrise" content="
If you’d like to learn more about SAML SSO on Bitrise, check out our [SAML SSO in organizations](https://devcenter.bitrise.io/team-management/organizations/saml-sso-in-organizations/) guide.
"%}