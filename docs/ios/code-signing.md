There are many ways you can manage the Code Signing of iOS projects.
In short, all you need for signing an iOS app is:

* `.p12` Certificate / Identity file(s)
* __Provisioning Profile__ file(s) matching your project (team ID, bundle ID, ...)
* And a script, tool or step which installs these files in the build environment.
  __If you want to store your code signing files on [bitrise.io](https://www.bitrise.io),
  please make sure that you have the `Certificate and profile installer` step in your
  app's workflow!__


## Use codesigndoc to collect the required files

The easiest way to collect these files is to use our open source [codesigndoc](https://github.com/bitrise-tools/codesigndoc)
tool. This tool runs a clean Archive _on your Mac_, and analyzes the Xcode log output
to see which code signing files Xcode used during the Archive.

You can run `codesigndoc` with the [one liner you can find in its Readme](https://github.com/bitrise-tools/codesigndoc#one-liner).

!!! note "Separate one-liners for Xcode and Xamarin projects"
    There are two one-liners, one for __Xcode__ projects, and one for __Xamarin__ (iOS) projects.
    Make sure you use the right one!

Once you have the `.p12` and Provisioning Profiles collected by `codesigndoc`,
upload these files to your app on [bitrise.io](https://www.bitrise.io).

__Code signing files can be uploaded to [bitrise.io](https://www.bitrise.io) in the app's Workflow Editor__,
under the `Code signing & Files` section of the editor.

There's only one more thing you have to do: if you want to store your code signing files on [bitrise.io](https://www.bitrise.io),
__please make sure that you have the `Certificate and profile installer` step in your app's workflow!__
That's the step which downloads and installs the Certificate (.p12) file(s) and
the Provisioning Profile file(s) from [bitrise.io](https://www.bitrise.io).

### Troubleshooting: Ensure the sate of the code

You get the most accurate result if you run `codesigndoc` on the same state of your
repository/code which is available after a clean `git clone`, as that will
be the state of the code after the build server checks out the code (e.g.
you might have files on your Mac which are in `.gitignore`, so it exists
on your Mac but not in the repository / after a `git clone` on a new Mac).

So, for the best result, you should __do a clean `git clone` of the
repository__ (into a new directory) on your Mac, and then
run `codesigndoc` in this directory (not in the directory where
you usually work on the project).

### Troubleshooting: make sure you can export an IPA from Xcode.app

It's also advised to do a full Archive + Export (until you get a signed `.ipa`)
of your project from `Xcode.app` first, and run `codesigndoc` __after that__.
The reason is that `Xcode.app` might download or update profiles in the background
during the IPA export. If you run `codesigndoc` after you exported an `.ipa`
from Xcode, `codesigndoc` will able to collect all the files.

### Troubleshooting: missing Distribution signing files

If `codesigndoc` would not pick up one or more distribution .p12 / Provisioning Profile,
you can export those manually (.p12 from `Keychain Access` app, Provisioning Profiles from
[Apple Developer Portal](https://developer.apple.com/)), just like you would when you
transfer these files between Macs.

But, __even if `codesigndoc` would not find
all the files, you should upload all the files collected by `codesigndoc`!__
The base files collected by `codesigndoc` are essential for your project's
code signing, without those it's not possible to create a signed IPA
for the project!


## Use a third party tool to manage your code signing files

There are third party tools which can be used for managing your code signing files,
like [fastlane match](https://github.com/fastlane/fastlane/tree/master/match) -
related bitrise.io setup guide: [How to configure fastlane match for Bitrise](/tips-and-tricks/how-to-configure-fastlane-match-for-bitrise/) -
or [fastlane sigh](https://github.com/fastlane/fastlane/tree/master/sigh).

!!! warning
    If you decide to use a third party tool for code signing management,
    please consult the tool's documentation and issue tracker,
    we only provide customer support for our own Step (`Certificate and profile installer`)
    and tools (`codesigndoc`)!

!!! note "`Certificate and profile installer` step"
    Even if you use a third party tool to manage your code signing files,
    and you don't plan to upload any code signing file to bitrise.io,
    you should keep the `Certificate and profile installer` step in your
    Workflow. This is because certain tools were not designed to work
    in an ephemeral environment, or in a full clean macOS install,
    and the `Certificate and profile installer` includes common
    workarounds for this situation. It's not guaranteed that it will help with
    the tool of your choice, but it won't cause any issue either.
