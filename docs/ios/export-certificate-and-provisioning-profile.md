The Provisioning Profile(s) and Code Signing Identity (.p12 Certificate) are
crucial part of the development process.
The Provisioning Profile contains application related data,
the list of devices that can run the given application, the connected Certificates and many more.

The Code Signing Identity (.p12 Certificate) contains information about the developer
and makes it possible to sign the application. Both of these files are needed to build your application,
test them on devices or upload them to the AppStore.

## Export with `codesigndoc`

The easiest way to get the required code signing files
is to use our [codesigndoc](https://github.com/bitrise-tools/codesigndoc) tool.

It supports both Xcode and Xamarin projects, and can be installed and run
with a single line of command in Terminal:
[https://github.com/bitrise-tools/codesigndoc#one-liner](https://github.com/bitrise-tools/codesigndoc#one-liner)

Once it's done you'll have all the required files exported, ready for upload.

## Manually exporting Provisioning Profiles

1. Visit the [Apple Developer Portal](https://developer.apple.com/) - use your AppleID to login.
1. Once you're signed in, select the [Certificates, IDs & Profiles](https://developer.apple.com/account/ios/certificate/) section
1. Find the Provisioning Profile you need,
   select it and click download (the file extension is `.mobileprovision`
   in case of an iOS Provisioning Profile, and `.provisionprofile` in case of a macOS application Provisioning Profile)
1. To upload it to your app on [bitrise.io](https://www.bitrise.io)
    * open your app on [bitrise.io](https://www.bitrise.io)
    * select the `Workflow` tab
    * in the Workflow Editor, on the left side, select the `Code signing & Files` option
    * here you can upload your Provisioning Profiles and your Code Signing Identities (`.p12` Certificate)

## Manually exporting and uploading the Certificate (.p12 Identity)

### To request/create a signing certificate

1. Request a Certificate from `Xcode.app`'s `Accounts` section in `Preferences`,
   or from the [Apple Developer Portal](https://developer.apple.com/) manually.

### Download signing certificate from the Apple Developer Portal

1. Visit the [Certificates, IDs & Profiles](https://developer.apple.com/account/ios/certificate/) section
   of the Apple Developer Portal.
1. Choose `Certificates` on the left side
1. Select the Certificate and click download (the file extension is `.cer`)
1. Open the file once the download is finished
1. This will open the certificate in your `Keychain Access.app`

### Export the certificate (.p12 identity)

1. Open `Keychain Access.app`
1. On the left side, select `My Certificates`
1. Right click on the certificate you want to exported
1. Select "Export .." in the menu

_Note: you can select more than one certificate at the same time, then right
click and select "Export ..." - this will export all the certificates
into a __single `.p12` file__!_

To upload the .p12 signing certificate file to your app on [bitrise.io](https://www.bitrise.io):

* open your app on [bitrise.io](https://www.bitrise.io)
* select the `Workflow` tab
* in the Workflow Editor, on the left side, select the `Code signing & Files` option
* here you can upload your Provisioning Profiles and your Code Signing Identities (`.p12` Certificate)

!!! note "More information about how iOS code signing works"
    For more information about how iOS code signing works, please
    check the [iOS/Code Signing](/ios/code-signing/) page.
