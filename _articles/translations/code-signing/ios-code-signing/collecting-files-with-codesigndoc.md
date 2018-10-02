---
title: Collecting and exporting code signing files with codesigndoc
menu:
  ios-code-signing:
    weight: 2

---
The open source [codesigndoc](https://github.com/bitrise-tools/codesigndoc)
tool runs a clean Xcode/Xamarin Studio Archive _on your Mac_, and analyzes the generated archive file. It collects the code signing settings that Xcode or Xamarin Studio used during the archive process, and prints the list of the required code signing files. You can also search for, export and upload these files using `codesigndoc`.

### Collecting the files with codesigndoc

1. Open the `Terminal`.
2. Enter the appropriate one-liner command, depending on your project type.
   * For an **Xcode** project:

     ``` bash
     bash -l -c "$(curl -sfL https://raw.githubusercontent.com/bitrise-tools/codesigndoc/master/_scripts/install_wrap-xcode.sh)"
     ```
   * For a **Xamarin** project:

     ``` bash
     bash -l -c "$(curl -sfL https://raw.githubusercontent.com/bitrise-tools/codesigndoc/master/_scripts/install_wrap-xamarin.sh)"
     ```
3. Open your `Finder.app` and drag-and-drop your project's `.xcodeproj` or `.xcworkspace` file into the command line in your `Terminal`.

### Uploading the files to Bitrise with codesigndoc

1. Once the code signing files are collected, `codesigndoc` will ask if you wish to upload the files to Bitrise:

       Do you want to upload the provisioning profiles and certificates to Bitrise? [yes/no] :

   If you wish to upload the files with `codesigndoc`, type `yes` and press `Enter`.
2. Provide your Bitrise access token.

       Please copy your personal access token to Bitrise.
       (To acquire a Personal Access Token for your user, sign in with that user on bitrise.io,
       go to your Account Settings page, and select the Security tab on the left side.) :
3. Select the Bitrise project as a target for the collected files:

       Fetching your application list from Bitrise...
       Select the app which you want to upload the provisioning profiles
       Please select from the list:

That's all, you are done!

If you wish to use automatic provisioning with our `iOS Auto Provisioning` step, you only need to collect the certificate file(s). You can run `codesigndoc scan` with the `--certs-only` flag to do that.

You can also install and run `codesigndoc` manually. For more information, check out the [tool's Readme](https://github.com/bitrise-tools/codesigndoc)!

### Best practices

You get the most accurate result if you run `codesigndoc` on the same state of your
repository/code which is available after a clean `git clone`, as that will
be the state of the code after the build server checks it out (for example,
you might have files on your Mac which are in `.gitignore`, so it exists
on your Mac but not in the repository or after a `git clone` on a new Mac).

So, for the best results, we recommend you to:

1. __Do a clean `git clone` of the repository__ (into a new directory) on your Mac.
    
2. Run `codesigndoc` in this directory (not in the directory where you usually work on the project).

It's also advised to do a full Archive + Export (until you get a signed `.ipa`)
of your project from `Xcode.app` first, and run `codesigndoc` **after that**.
The reason is that `Xcode.app` might download or update profiles in the background
during the IPA export. If you run `codesigndoc` after you exported an `.ipa`
from Xcode, `codesigndoc` will able to collect all the files.