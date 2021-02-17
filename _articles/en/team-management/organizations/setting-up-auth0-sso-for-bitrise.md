---
tag: []
title: Setting up Auth0 SSO for Bitrise
redirect_from: []
summary: ''
published: false

---
{% include message_box.html type="important" title="SAML SSO with Org Elite and Velocity plans" content="Please note that SAML SSO is only available for an Org with the [Org Elite and Velocity plans](https://www.bitrise.io/pricing). If you try to set up SAML SSO to an Org that has an [Org Standard subscription](https://www.bitrise.io/pricing/teams), the **Single Sign-On** tab will appear on the left menu bar in your **Account Settings** but you won’t be able to use it. Click **Upgrade to Org Elite** in the pop-up window to use SAML SSO in your Org.

Since the SAML SSO feature is tied to the Org Elite and Velocity plans, if you decide to downgrade, you will lose this feature. All Org members will receive an email about the downgrade and you’ll have two weeks to re-upgrade to the Org Elite plan if you wish to use SAML SSO in your Org again.

"%}

## Before you start

Before connecting SAML SSO to your Organization, make sure:

* An Azure AD administrator who is logged into Azure AD is at hand.
* Your account on Bitrise has an Org with [Org Elite or Velocity plan](https://www.bitrise.io/pricing). If it doesn’t have an Org, go ahead and [create one](https://bitrise.atlassian.net/team-management/organizations/creating-org/). Setting up SAML SSO is the same for existing and brand new Orgs on Bitrise.
* As with other [Org management actions](https://bitrise.atlassian.net/team-management/organizations/members-organizations/), only the Org owner can set up SAML SSO to a Bitrise Org.

## Navigating to the Single Sign-On page of Bitrise

If you are an Org owner on Bitrise, you will have to use the **Single Sign-On** tab to set up a SAML SSO connection between Azure AD provider and your Bitrise Org.

1. On your Bitrise [Dashboard](https://app.bitrise.io/dashboard/builds) click your avatar, then click [**Account settings**](https://app.bitrise.io/me/profile#/overview) in the dropdown.![](/img/ssopage1.png)
2. The **Overview** page displays all the Orgs you’re a member of. Select the Org where you wish to set up the SAML SSO connection.![](/img/overview.png)
3. On the left menu bar, click the **Single Sign-On** tab which will take you to the **Enable Single Sign-On** page.![](/img/sso3.png)

## Setting up SAML SSO connection between Auth0 and Bitrise

You first create a regular web application for Bitrise on Auth0, enable it and then there are two ways to retrieve app specific SAML SSO connection data from Auth0. We will show you both ways!

### Creating Bitrise as a web application on Auth0

1. Log into [Auth0](https://auth0.com/ "https://auth0.com/") as an admin.
2. Click **Applications** on the left menu bar and then the **+ Create Application**s button on the right hand side of the **Applications** page.

   ![](blob:https://bitrise.atlassian.net/fd08819c-6b74-44fd-910f-c730bcfb8530#media-blob-url=true&id=8f43bde2-cc18-40a0-846a-035c50c590fe&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=Applications.jpg&size=200492&width=2252&height=882)
3. On the **Create application** window, type Bitrise in the **Name** field. In the **Choose application type** select **Regular Web Applications**, and click the **Create** button.

![](blob:https://bitrise.atlassian.net/0d15abbf-1bd8-4009-bec5-1a6129cc26c3#media-blob-url=true&id=65002b1e-b9f4-4406-b834-2f80b576d997&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=choose-app-type.jpg&size=255709&width=2231&height=1440)

3\. You are landing on your newly created Bitrise app’s **Quick Start** page. Click the **Addons** tab. Toggle the **SAML2 WEB APP**’s switch to the right. This will take to to the **Addon: SAML2 WEB APP** page automatically.

![](blob:https://bitrise.atlassian.net/6e2d5b42-aef9-459d-bd3b-0085e8fee267#media-blob-url=true&id=a6af7399-f256-4874-99a5-a454a52a1c8d&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=addonstab.jpg&size=289786&width=2231&height=1440)

4\. Copy the **Single Sign-On URL** from Bitrise and paste it into the **Application Callback URL** field on the **Settings** tab of the **Addon: SAML2 WEB APP** page. Scroll down to the bottom of the **Addon: SAML2 WEB APP** page and hit **ENABLE**.

![](blob:https://bitrise.atlassian.net/19f48bd7-b124-4ba3-aecb-614c1e346404#media-blob-url=true&id=ad8e3b74-0b34-445e-a35d-b6f8b057086c&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=singlesignonurl.jpg&size=136123&width=1118&height=745)

![](blob:https://bitrise.atlassian.net/16bc6c14-5946-4c53-8b45-5ac6d650f233#media-blob-url=true&id=50200c62-37ef-4ef3-a973-113c8c2887bc&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=addonsurl.jpg&size=239977&width=2231&height=1326)

![](blob:https://bitrise.atlassian.net/0e986c95-8e25-4953-b71a-4ef3dd58a347#media-blob-url=true&id=d8e546a1-ec54-4ef9-ba6a-2f124bfaf853&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=clickenable.jpg&size=166477&width=2218&height=712)

5\. Once your changes are saved, close the page to get back to the **Addons** page where you can see the switch turned on.

![](blob:https://bitrise.atlassian.net/3c0bea6f-dbc1-4fcf-802f-f5052fe8164d#media-blob-url=true&id=2da0d76e-e072-4697-b893-70b2cd0ae109&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=switchturnedon.jpg&size=283547&width=2231&height=1326)

6\. Continue with retrieving \[SAML SSO information from Auth0(link)\] to populate the required fields on the **Single Sign On** page of Bitrise.

### Retrieving SAML SSO information from Auth0’s

There are two pages to visit to retrieve SAML SSO information from Auth0: the **Usage** and the **Settings** page.

#### Usage page

Once you have enabled Bitrise as a web application on Auth0, it’s time to grab the certificate and the Identity provider’s unique login URL to finish up the SAML configuration on Bitrise.

1\. Go to **Application**, then select the **Addons** tab to find your enabled Bitrise app.

2\. Click the **SAML2 WEB APP** web app and select the **Usage** tab. Click on the **Download Auth0 certificate** link next to the **Identity Provider Certificate** label. Open the downloaded certificate file and copy its content into the **Certificate** field of Bitrise. Go back to Auth0 and copy paste the **Identity Provider Login URL** into Bitrise’s **Identity provider sign-on URL**.

![](blob:https://bitrise.atlassian.net/5b98c973-bbfa-487b-bde3-8fcb2031b34b#media-blob-url=true&id=23ac1782-25da-4c9d-99df-2205fa1b1ab1&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=usage.jpg&size=261695&width=2231&height=1440)

![](blob:https://bitrise.atlassian.net/8ddd82ff-818a-4b9a-81dc-6b953f71bb55#media-blob-url=true&id=115e6069-762a-4714-bf3a-fa2c5d478826&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=auth0configuresso.jpg&size=216904&width=2258&height=1246)

3\. Click **Configure SSO** button on Bitrise.

4\. Now you can close the dialog on Auth0.

#### Settings page

Once you have enabled Bitrise as a web application on Auth0, it’s time to grab the certificate and the Identity provider’s unique login URL to finish up the SAML configuration on Bitrise.

1. Click **Bitrise** as web application on the **Applications** page. You’re automatically taken to the **Settings** page.

   ![](blob:https://bitrise.atlassian.net/39a8124d-c264-47b0-966c-8b5b8fbace48#media-blob-url=true&id=e178257c-b968-4302-bf45-95317265a04a&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=settingsbitrise.jpg&size=240745&width=2218&height=1352)

2\. Scroll down to the bottom of the page to **Show Advanced Settings** and click it.

![](blob:https://bitrise.atlassian.net/d0c5af1b-217c-48d3-8e8e-e6c0340951ac#media-blob-url=true&id=2a141e5c-3a33-47af-be7a-5e6099b78db0&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=advancedsettings.jpg&size=162264&width=2231&height=658)

3\. Click the **Certificate** tab. You can get the Certificate content in three ways: Copy it from the **Signing Certificate** field, click the **Copy to clipboard** icon in the upper right corner of the field or click the **DOWNLOAD CERTIFICATE** button.

![](blob:https://bitrise.atlassian.net/6fb4f8e1-dec4-4b33-b350-0cad9e052aa8#media-blob-url=true&id=1b49fcc3-6afc-484a-9383-d91fea20a00b&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=certificate.jpg&size=289078&width=2231&height=1440)

4\. Paste the Certificate content into Bitrise’s **Certificate** field.

5\. Click on the **Endpoints** tab of Auth0 and copy or click the **Copy to clipboard** icon and paste the URL in the **Identity provider sing-on URL** field of Bitrise.

![](blob:https://bitrise.atlassian.net/2d9a99d1-807a-4abe-bb84-2dfe90fb28b7#media-blob-url=true&id=1c7c9a6f-0ec6-4600-a36b-b918fee40ee4&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=endpoints.jpg&size=181076&width=2231&height=892)

![](blob:https://bitrise.atlassian.net/8ddd82ff-818a-4b9a-81dc-6b953f71bb55#media-blob-url=true&id=115e6069-762a-4714-bf3a-fa2c5d478826&collection=contentId-870482008&contextId=870482008&mimeType=image%2Fjpeg&name=auth0configuresso.jpg&size=216904&width=2258&height=1246)

6\. Hit **Configure SSO** on Bitrise.