## How iOS code signing works (Xcode 7 & Xcode 8 manual code signing mode)

iOS apps require code signing for every action/output which generates an app (`.ipa`) meant to
run on a physical iOS device.

When you create and export an Archive (`.ipa`) of your app Xcode will sign it automatically,
based on the **Code Signing** settings you have in your Xcode project. There are, however,
a couple of things you have to know about how Xcode selects the code signing
files (unless you set a specific Identity and/or Provisioning Profile).

If you have a Code Signing configuration in your Xcode project like this one:

![Recommended iOS Code Signing configuration in Xcode](/img/ios/recommended-ios-code-signing-settings.png)

where you don't set a specific Identity and Provisioning Profile, Xcode will
select the ones which match the following points:

* For the **Release** configuration it'll search for a Distribution Identity/Certificate
* For the **Debug** configuration it'll search for a Development Identity/Certificate
* The Provisioning Profile has to match with the **team ID** and with the **bundle ID** you set
  in your Xcode project settings.

This means that even if you have a Distribution Identity/Certificate available in the system,
if Xcode can't find a related Provisioning Profile which matches the *team ID* __and__ the *bundle ID*
you'll get an error like this when you try to archive the project:

```
Code Sign error: No code signing identities found: No valid signing identities (i.e. certificate and private key pair) matching the team ID ‘...’ were found.
```

This means that to be able to Archive your project you have to provide both a Certificate (`.p12` Identity file)
and a Provisioning Profile which matches:

* the type of the configuration you set in your Xcode project settings under the **Code Signing** section (Distribution or Development)
* the Provisioning Profile has to match both the *bundle ID* __and__ the *team ID* set in the Xcode project settings
* and **the two files have to be compatible with each other** (you
can check this on the [Apple Developer Portal](https://developer.apple.com/account/ios/certificate) - select a Provisioning Profile,
click **Edit**, there you can see the Certificates which are allowed to use that specific Provisioning Profile)

There can be multiple Certificates/Identities and Provisioning Profiles installed on the system,
the only thing what matters for Xcode when it tries to sign the app is to find a Certificate/Identity and
Provisioning Profile pair which fulfills all the requirements listed above.

!!! note "How to export your iOS Code Signing files"
    If you need help with exporting your iOS Code Signing files, you can find
    a step-by-step guide with screenshots [on our old DevCenter](https://bitrise.readme.io/docs/provprofile-cert-export).


## How to make the process easier, more manageable? (Xcode 7 & Xcode 8 manual code signing mode)

### Using Export Options (available for Xcode 7+ and Xcode Archive step v1.9.1+)

Since the `1.9.1` version of the `Xcode Archive` step you can set Xcode "export options"
directly through the step!

The thing you have to know about Xcode's Export Options or how archiving works
when you do it from `Xcode.app` on your Mac:

1. When you click "Archive" in Xcode first it creates an Xcode "archive" file (directory),
   and __it signs the archive with the code signing files set in your Xcode project settings__!
1. Then, when the Xcode "Organizer" window appears and you click "Export..." and
   select an "export method" (App Store, Ad Hoc, Enterprise or Development Deployment)
   __Xcode does re-sign__ the archive with the final code signing files appropriate for the
   export method you selected.

This means that if you want to do the same on any Mac (e.g. on [bitrise.io](https://www.bitrise.io) virtual machines)
__you'll need the code signing files for the final app/IPA__ (e.g. App Store or Ad Hoc distribution certificate and provisioning profile)
__and additionally the code signing files used for the initial signing__ (usually Development certificate and provisioning profile)!

To do the same on [bitrise.io](https://www.bitrise.io) all you have to do is:

1. Upload all the certificates and provisioning profiles, including the ones required for the initial
   code signing (usually your Development certificate and provisioning profile for the project).
1. Open the Workflow Editor on [bitrise.io](https://www.bitrise.io), select the `Xcode Archive` step,
   and make sure its version is at least `1.9.1`
1. Go to the step's `Select method for export` input, and set it to the "export method" you want to use,
   just like you would in Xcode's Organizer.
   _Note: you can add more than one `Xcode Archive` step to your workflow, if you want to create
   e.g. both an Ad Hoc and an App Store signed app/IPA in the same build/workflow!_
1. Click `Save` in the Workflow Editor

That's all. Run a new build and you're done ;)


### Full manual / full control

There's an important "trick" which can make your code signing process much easier
(if you don't or can't use the Xcode 7+ Export Options - as described in the previous section):
Xcode (Xcode's Command Line Tool, `xcodebuild`) has a command line parameter to
override the Identity and Provisioning Profile configurations set in Xcode project settings!

The `CODE_SIGN_IDENTITY` parameter can be used to override the **Code Signing Identity**,
while the `PROVISIONING_PROFILE` parameter can be used to override the **Provisioning Profile** configuration
for any `xcodebuild` command (e.g. Archive).

Both our `Xcode Archive` and `Xcode Analyze` steps include two related inputs,
`Force code signing with Identity` and `Force code signing with Provisioning Profile`.
The value you provide for these inputs will be passed to `xcodebuild`
as `CODE_SIGN_IDENTITY` and `PROVISIONING_PROFILE`.

**Now, the important bit, that can make your life much easier** (especially if you generate an iOS app with
multiple, different code signing configuration (e.g. if you want to generate both an Ad-Hoc and
an App Store signed `ipa`)):

!!! note "Setting a specific Identity will make Xcode ignore other search parameters!"
    If you set the Identity to `iPhone Distribution` Xcode will search for a matching Provisioning
    Profile which fulfills all the other criteria (team ID and bundle ID),
    while **if you provide the full ID of the Identity** like `iPhone Distribution: My Company`
    Xcode will **ignore** everything else and will use that specific Identity (if it can
    find it in the system)!

This means that even if the Provisioning Profile has a different *team ID* set, just by
specifying the Identity's full ID, Xcode will pick the Provisioning Profile
which is compatible with the Identity, it won't check the *team ID* parameter!

This makes iOS code signing (in most cases) much easier, as all you have to do is:

* Make sure that you set the Provisioning Profile configuration *in your Xcode project settings* to "Automatic",
  or else you'll have to override this configuration too (to be able to use different Provisioning Profiles)
* You should set the Identity configuration *in your Xcode project settings* to a generic category like
  "iPhone Developer" or "iPhone Distribution" (this is more like a best practice, to make the life of
  developers easier, *not a requirement if you override the configuration*)
* __And the last piece is__: set the `Force code signing with Identity` input of Xcode Archive and
  Xcode Analyze to the **full ID of the Identity** (something like: `iPhone Distribution: My Company`)

**With this setup you don't have to change your code signing configuration in your Xcode project**,
you only have to specify the configuration in your Bitrise workflow, and you can specify
different code signing configuration for every Xcode step if you want to!

!!! note "Where to get these IDs?"
    If you use our **Certificate and profile installer** step then you can find the IDs in the step's
    log. It prints the ID of every identity and provisioning profile it downloads
    and installs successfully. You can copy-paste that ID directly into the
    ***Force code signing with Identity*** (ID looks like: `iPhone Distribution: My Company (Xyz)`),
    and if you need it, into the ***Force code signing with Provisioning Profile***
    (ID looks like: `xyz045x4-6143-4e5a-a94a-3fe3aec96eb3`) input fields.

**Usually it's enough to specify only the Identity ID** for the build, the compatible Provisioning Profile
will be selected by Xcode automatically. Not setting the Provisioning Profile has the advantage
that if you have to update the Provisioning Profile you won't have to update your
Bitrise configuration with the new profile's ID, as long as the Provisioning Profile is
compatible with the Identity you set. But if you'd need to control exactly
which Provisioning Profile should be used for a given step, you can use
the `Force code signing with Provisioning Profile` input of the steps.
*This can be useful if you want to use multiple Distribution Provisioning Profiles
in a single build, **e.g. to create both an Ad-Hoc and an App Store signed app.***
