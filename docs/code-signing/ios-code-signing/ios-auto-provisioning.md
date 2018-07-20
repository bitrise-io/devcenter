Manage your code signing files on [bitrise.io](https://www.bitrise.io). You can use iOS automatic provisioning to automatically generate the required Provisioning Profiles for your project.

With automatic provisioning, the `iOS Auto Provision` step will manage the Provisioning Profiles. You only have to upload the .p12 certificate files manually to [bitrise.io](https://www.bitrise.io).

!!! warning "Upload all signing certificates for your project"
    We strongly recommend uploading __BOTH__ the development and distribution signing certificates for your project. Without the different types of certificates, you will not be able to generate different types of signed IPAs.

Before setting up automatic provisioning in your workflow, make sure that:

* you collected the required files with [codesigndoc](https://github.com/bitrise-tools/codesigndoc). You can also upload the distribution and development certificates with the tool!
* you have at least __Admin__ role in the developer portal team.
* [your Apple Developer account is connected to bitrise.io](/signing-up/connecting-apple-dev-account).
* Apple Developer Portal integration to your Bitrise project is enabled.

!!! info "Xcode Automatically manage signing option"
    The `iOS Auto Provision` step can automatically manage profiles even if the iOS project uses Xcode's
    _Automatically manage signing_ option, introduced in Xcode 8. The step can detect if the provided iOS
    project uses _Automatically manage signing_ option or not. Then it will download the Xcode managed profiles which are needed to sign your project and
    will install them together with the provided certificates.

Once you are ready, proceed to uploading your files and setting up your workflow:

1. Open your app on your `Dashboard`.

1. Select the `Workflow Editor` tab.

1. Select the `Code Signing` tab.

1. Make sure you have the .p12 certificate files uploaded. If not, add the .p12 files in the `Add the private key (.p12) for signing` field.

    ![Uploading certificates and Provisioning Profiles](/img/code-signing/ios-code-signing/provisioning-and-certificate-upload.png)

    !!! info "Provisioning Profile file extensions"
        For a MacOS project, the Provisioning Profile file extension is `.provisionprofile`; for an iOS project, the file extension is `.mobileprovision`.

1. Make sure that you do __NOT__ have the `Certificate and profile installer` step in your Workflow. If you have both `iOS Auto Provision` and `Certificate and profile installer` steps in your Workflow, your build will fail.

1. Add the `iOS Auto Provision` step to your app's Workflow. You can check it on the `Workflow` tab of the `Workflow Editor`.

    Please note that this step must come __AFTER__ any dependency installer step in your workflow, such as `Run CocoaPods install` or `Carthage`. Make sure that you do __NOT__ modify your Xcode project between the `iOS Auto Provision` and the `Xcode Archive & Export for iOS` steps. For example, do not change the bundle ID after the `iOS Auto Provision` step.

    ![iOS Auto Provisioning in your workflow](/img/code-signing/ios-code-signing/workflow-with-auto-prov.png)  

1. Fill the required inputs of the step.
    * `The Developer Portal team id` - find this on the [Membership Details page of your Apple Developer Portal account](https://developer.apple.com/account/#/membership)
    * `Distribution type` - make sure its value matches the value of the `Select method for export` input in the `Xcode Archive & Export for iOS step`.
    * `Scheme` - you can restrict which targets to process.

!!! hint "Troubleshooting: missing Distribution signing files"
    If `codesigndoc` does not pick up one or more distribution .p12 files,
    you can export those manually from the `Keychain Access` app, just like you would when you
    transfer these files between Macs.

    But __even if `codesigndoc` does not find
    all the files, you should upload all the files collected by `codesigndoc` - except the Provisioning Profile files!__
    The base files collected by `codesigndoc` are essential for your project's
    code signing: without those it's not possible to create a signed IPA
    for the project!
