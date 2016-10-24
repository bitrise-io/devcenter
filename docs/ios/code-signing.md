## How iOS code signing works - if you use Xcode 8 automatic code signing

_If you're interested in all of the details, you should check this year's
[WWDC video which covers the code signing changes](https://developer.apple.com/videos/play/wwdc2016/401/).
We'll focus more on the basics and issue resolution here._

In short, Xcode 8's automatic code signing works this way:

1. When you do an Archive in Xcode, either in Xcode.app or on a CI server / through Xcode's command line tool (`xcodebuild`)
   it first creates an archive __signed with development code signing__.
1. Then, when you specify the distribution method (export method) it __resigns the archive with distribution signing__.

![Xcode Organizer - export method selector popup](/img/ios/xcode-organizer-export-method.png)

This means that if you want to create for example an App Store signed IPA,
on the Mac (e.g. on the [bitrise.io](https://www.bitrise.io) virtual machine)
you have to have __both a Wildcard, Team / Development AND the App Store
distribution certificates and provisioning profiles__!

!!! note "Collecting all of these might take quite a bit of time"
    but fortunately our updated [codesigndoc](https://github.com/bitrise-tools/codesigndoc)
    can now collect all of these files for you, __automatically__!

So, __is this automatic code signing worth all of this trouble__?
Should you instead opt to use manual code signing in Xcode 8?

In general using Automatic code signing is a good idea, and you should
migrate to it (as Apple suggests this is the new way, how you should do
code signing in the future) if you can.

__Is it worth the trouble?__ Well, __the good thing about Automatic code signing__
is that once you collected all the code signing files
__it's incredibly easy to use these files / to select the right file(s) during your build!__

All you need to do is specifying the "export method" (`app-store`, `ad-hoc`, etc.)
in the `Xcode Archive` step, and that's all! __Xcode will select the right certificate
and provisioning profiles automatically__, based on your project's
Team and Bundle ID (if the signing files are available in the system of course ;) )!

__Compare this with the previous solution__, where you had to either create multiple Schemes
in Xcode to be able to control where to use which code signing settings,
or you had to specify "Force Identity / Provisioning Profile" options,
which could lead to even more trouble when not configured properly.
In Xcode 8 automatic code signing you don't have to (actually, you can't)
mess with these configurations, initial code signing is always performed
with Development code signing, and Xcode resignes the IPA during export
based on the "export method".

And, __it works the same way on [bitrise.io](https://www.bitrise.io) too__!
Once you've uploaded all the required signing files (e.g. with [codesigndoc](https://github.com/bitrise-tools/codesigndoc)),
all you have to do is to set the `export method` option
of the `Xcode Archive` step to the option you want to use.
__That's all!__

This is the same as what you do when you create/export an iOS app archive
from Xcode.app - _the `Xcode Archive` step just runs Xcode's command line tool_.
There's no "magic" here, `Xcode Archive` just passes the export options
to Xcode, and Xcode creates the archive and IPA the same way it does on your Mac!


### Migrating your Bitrise configuration to Automatic code signing

First of all, you should upgrade your steps in your Workflow
to the latest versions - especially the `Certificate and profile installer`
and the `Xcode Archive` steps - as there are a couple of features
only available in the latest versions.

The second step is to __remove every previous, now incompatible code signing input
from the `Xcode Archive` step__.
In general you should try to __reset every code signing related input option of the `Xcode Archive` step__,
e.g. "Force code signing with Identity" and "Force code signing with Provisioning Profile Specifier".

_Note: it might be easier to see which input options you defined a value for in `bitrise.yml` mode
of the Workflow Editor. Just click on `bitrise.yml` on the left side of the Workflow Editor
and search for the `xcode-archive` step. In `bitrise.yml` only those inputs are listed which
you specified a value for / which are not set to their default value, so it should be pretty
quick to check the list there, easier than on the Web UI._

__You're almost ready__, really! All you have to do is:

1. Make sure that you've uploaded all the required code signing files, __including a Wildcard Team Development__
   certificate and provisioning profile, as noted in the __Description of how Xcode 8's new Automatic code signing feature works__ section.
   You might want to use [codesigndoc](https://github.com/bitrise-tools/codesigndoc) for this,
   as it can export all the required files automatically from your Mac.
1. Set the `Select method for export` input option of the `Xcode Archive` step to the
   method you want to use (e.g. `app-store` or `ad-hoc`)

__And that's all!__

_You can use multiple `Xcode Archive` steps to create multiple IPAs signed with different
code signing methods in the same build, just by adding a second `Xcode Archive` step
and setting the `Select method for export` option to the other method.
Alternatively you can also use the `Re-sign IPA` step, to resign the IPA
of a previous `Xcode Archive` step._

One note: if you'd have to use a distribution provisioning profile & certificate
which is related to a different Team, not the one set in your Xcode project's
settings, then you have to specify the `The Developer Portal team to use for this export`
input option too, or else Xcode will search for code signing files with the same Team ID
you have in your Xcode project's settings. Again, this is the same what you do in
Xcode.app when you create an Archive and export it with a distribution signing - if you're
part of more than one Apple Dev Portal team you'll be prompted to select one.

Another note, especially if your project includes Extension project(s),
for some reason, Xcode 8.0 might not accept just any Wildcard Development Provisioning Profile
for the initial signing. It seems that in case of e.g. a Today Widget Extension
Xcode 8.0 requires the Wildcard __Team__ Provisioning Profile,
or a specific development one which includes the Extension's __full__ bundle ID.
This might be just an Xcode 8.0 issue which will be fixed in an upcoming Xcode 8 update,
but for now it's best to use the __Team__ Provisioning Profile, which you can
export from Xcode Preferences (Xcode -> Preferences -> select your Apple ID on the left side ->
select your Team on the right side -> click "View Details" -> search for
`iOS Team Provisioning Profile: *` -> right click "Show in Finder").
___[codesigndoc](https://github.com/bitrise-tools/codesigndoc) can help to
export the proper one in this case too!___


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
