---
title: Setting up Azure AD SSO for Bitrise
redirect_from: []
date: 2019-04-12 09:31:39 +0000
published: false

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on Azure AD.

{% include message_box.html type="note" title="Azure AD administrator account" content=" Please note that you must have an Azure AD **administrator** account to add Bitrise as a SAML app. "%}

## Getting configuration information from Azure AD

 1. Log into Azure AD.
 2. In the search bar, search for `Enterprise applications`.
 3. Click `All applications` under `Manage` on the left menu.
    ![](/img/azure-enterprise-application-1.jpg)
 4. Click `+ New Application` to add a new app to your account/organization.
 5. On the `Add an application` page, click the `Non-gallery application` icon.
    Since Bitrise is not a selectable item in Azure AD's gallery, you'll have to add it manually.
 6. Type `Bitrise `in the `Name` field.

    ![](/img/bitrise-added-as-an-app.png)
 7. Click the blue `Add` button at the bottom of the page.

    You'll land on the Overview page of the added app.
 8. Select `Users and groups` to add at least one user to the app. 
 9. Select a user from the list or add an external user by typing his/her email address.

    Note that you can always remove a selected member by clicking the ...remove users from the users tab.
10. Click `Select` at the bottom of the page.
11. Click `Assign` at the bottom of the page.

    You can see the list of added users:

    ![](/img/added-user.png)