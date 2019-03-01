---
title: Exporting code signing files without codesigndoc
menu:
  ios-code-signing:
    weight: 11

---
### Exporting certificates using Xcode

1. Start Xcode
2. Select Xcode > Preferences from the navigation bar.
3. At the top of the window select `Accounts`.
4. Select your Apple ID and your team from the right side bar, then click on `View Details...`.
5. A dialog will appear where you will see your code signing identities and the provisioning profiles.
6. Select the certificates and choose `Export` from the pop-up menu.
   ![Export certificate](/img/code-signing/ios-code-signing/xcode_export_certificate.png)
7. Enter a filename in the Save As dialog. You can set a password and a verification to store it securely, but it's not necessary.
8. Xcode will export the requested certificate in .p12 format.

### Exporting manually

1. Start Keychain Access.
2. On the top left sidebar select `login` and on the bottom left select `My Certificates`.
3. This will list all your installed certificates and the associated private key.
4. Select the one that you would like to export and choose `Export` from the pop-up menu.
   ![Export certificate](/img/code-signing/ios-code-signing/keychain_access_export.png)
5. Enter a filename in the Save As dialog. You can set a password and a verification to store it securely, but it's not necessary.
6. Keychain Access will export the requested certificate in .p12 format.

## Exporting Provisioning Profiles

### Exporting using Xcode

1. Start Xcode.
2. Select Xcode > Preferences from the navigation bar.
3. At the top of the window select `Accounts`.
4. Select your Apple ID and your team from the right side bar, then click on `View Details...`.
5. A dialog will appear where you will see your code signing identities and the provisioning profiles.
6. Locate the profile that you are looking for under Provisioning Profiles.
7. If you don't have it installed on the system, click on the `Download` button next to it.
8. Choose `Show in finder` from the pop-up menu, that will show you the installed provisioning profile for you.

### Exporting manually

1. Go to [https://developer.apple.com](https://developer.apple.com) and log in.
2. Select Certificates, Identifiers & Profiles from the left sidebar
3. Navigate to Provisioning Profiles > All
4. Find the Provisioning Profile you are looking for from the list or use the search to filter.
5. Click on the selected Provisioning Profile, this will expand the details.
6. If its status is invalid, you can click on the `Edit` button and save again.
7. Click on the `Download` button to download it and double click to install on your macOS.

{% include message_box.html type="note" title="Locate your Provisioning Profiles" content=" You can also locate all installed Provisioning Profiles at the following path: `~/Library/MobileDevice/Provisioning Profiles/`.
"%}

\[^1\]: Screenshots from https://developer.apple.com/support