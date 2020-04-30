---
changelog:
last_modified_at:
title: Protecting your code signing files
menu:
  ios-code-signing:
    weight: 16

---
## Protected mode

You can set your code signing files to **Protected** mode: this means they cannot be downloaded from your [bitrise.io](https://www.bitrise.io) account. Your builds will be able to use these protected files, of course. But if you make the file protected, no one will be able to reveal it and the only way to overwrite it is by deleting the current one and creating a new one.

## Configuring protected mode

1. Select your app on your **Dashboard**.
2. Go to the **Workflow** tab to open the **Workflow Editor**.
3. Go to the **Code Signing** tab.
4. Locate the file you wish to make protected and open the dropdown menu.

   ![Make code signing files protected](/img/code-signing/ios-code-signing/provisioning-and-certificate-protect.png)
5. Select the **Make protected** option.

   A pop-up window will warn you that this change is irreversible once you confirm it. You do not need to separately save your changes.

Once you are done, your only option in the file's dropdown menu will be **Delete**.

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Protect your code signing files</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>