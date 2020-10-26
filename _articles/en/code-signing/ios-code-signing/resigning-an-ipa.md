---
title: Signing an .ipa with multiple code signing identities
tag:
- code-signing
- ios
- xcode
- app-store
description: During the development of your iOS app you will need multiple types of
  distributions for different purposes, such as internal testing or deployment to
  the App Store. The good news is that this does not require setting up two separate
  workflows on bitrise.io.
redirect_from: []
menu:
  ios-code-signing:
    weight: 12

---
During the development of your iOS app you will need multiple types of distributions for different purposes, such as internal testing or deployment to the App Store. The good news is that this does not require setting up two separate workflows on [bitrise.io](https://www.bitrise.io).

## Before you start

Before you start, you need to:

* Upload different types of .p12 certificates (for example, developer and distribution certificates).
* Upload the associated provisioning profiles (or managing them automatically with the **iOS Auto Provisioning** Step).

If all your code signing files are in place, proceed to setting up your Workflow. 

## Re-signing an .ipa file

In this example we'll be setting up a Workflow to create two signed .ipa files: one with the `development` and one with the `app-store` export method.

1. Make sure you have the **Xcode Archive & Export for iOS** Step in your Workflow.

   Please note that this Step must come AFTER either the **Certificate and profile installer** or the **iOS Auto Provisioning** Step in your Workflow.
2. In the list of input variables, navigate to **Select method for export** and select **development** from the dropdown menu.

   ![{{ page.title }}](/img/development-select-method-for-export.png)
3. Add the **Export iOS and tvOS Xcode archive** Step to your Workflow.
4. In the list of input variables, navigate to **Select method for export** and select **app-store** from the dropdown menu.

   ![{{ page.title }}](/img/app-store-export-method-2.png)

And you're done! Feel free to add multiple **Export iOS and tvOS Xcode archive** Steps to your Workflows to create multiple different signed .ipa files if necessary.

{% include banner.html banner_text="Sign multiple .ipa files" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}