Manage your code signing files on [bitrise.io](https://www.bitrise.io). With manual provisioning, you can collect your Provisioning Profiles and .p12 certificates with our [codesigndoc](https://github.com/bitrise-tools/codesigndoc) tool and then upload them manually or by using the tool.

!!! info "Xcode Automatically manage signing option"
    We support using Xcode's
    _Automatically manage signing_ option, introduced in Xcode 8, with your project. In this case, create an IPA of the desired type on your local machine to let Xcode generate the required profiles and then codesigndoc can collect these. If your project changes and Xcode re-generates the profiles, you will need to re-upload these profiles to Bitrise as well.

If you collected all the necessary files with the codesigndoc tool, proceed to uploading them and setting up your workflow. In this example, we'll be uploading the code signing files manually - however, you can do this with the codesigndoc tool, too!

1. Open your app on your `Dashboard`.

1. Select the `Workflow Editor` tab.

1. Select the `Code Signing` tab.

1. Make sure that the Provisioning Profile files and the .p12 files are uploaded. If not, add them in the `Add Provisioning Profile(s)` and the `Add the private key (.p12) for signing` fields, respectively.

    ![Uploading certificates and Provisioning Profiles](/img/code-signing/ios-code-signing/provisioning-and-certificate-upload.png)

    !!! info "Provisioning Profile file extensions"
        For a MacOS project, the Provisioning Profile file extension is `.provisionprofile`; for an iOS project, the file extension is `.mobileprovision`.

1. Make sure you have the `Certificate and profile installer` step in your app's Workflow. You can check it on the `Workflow` tab of the `Workflow Editor`.

    Please note that these steps must be __BEFORE__ the steps that archive and export your project (for example, `Xcode Archive & Export for iOS`) in your workflow.

    ![Certificate and profile installer step in your workflow](/img/code-signing/ios-code-signing/workflow-with-cert-prof-inst.png)

!!! tip "Troubleshooting: missing Distribution signing files"
    If `codesigndoc` does not pick up one or more distribution .p12 files and/or Provisioning Profile(s),
    you can export those manually (.p12 from `Keychain Access` app, Provisioning Profiles from
    [Apple Developer Portal](https://developer.apple.com/)), just like you would when you
    transfer these files between Macs.

    But __even if `codesigndoc` does not find
    all the files, you should upload all the files collected by `codesigndoc`!__
    The base files collected by `codesigndoc` are essential for your project's
    code signing: without those it's not possible to create a signed IPA
    for the project!
