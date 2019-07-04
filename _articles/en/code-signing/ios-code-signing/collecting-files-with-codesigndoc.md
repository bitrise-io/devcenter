---
title: Collecting and exporting code signing files with codesigndoc
tag:
- ios
- code-signing
- files
- xamarin
- xcode
summary: 'The open source codesigndoc tool runs a clean Xcode/Xamarin Studio Archive
  on your Mac, and analyzes the generated archive file. '
redirect_from: []
menu:
  ios-code-signing:
    weight: 2

---
The open source [codesigndoc](https://github.com/bitrise-tools/codesigndoc) tool runs a clean Xcode/Xamarin Studio Archive on your Mac, and analyzes the generated archive file. It collects the code signing settings that Xcode or Xamarin Studio used during the archive process, and prints the list of the required code signing files. You can also search for, export and upload these files using `codesigndoc`.

If your project contains UITest targets,[ codesigndoc can scan for that](/code-signing/ios-code-signing/collecting-files-with-codesigndoc/#scanning-for-uitest-targets), too. It runs the `xcodebuild build-for-testing` action to create a test-Runner.app, and exports the necessary code signing files.

## Collecting the files with codesigndoc

You can use codesigndoc for:

* Xamarin projects.
* Xcode projects.

You can install the [latest version of codesigndoc](https://github.com/bitrise-io/codesigndoc/releases) with a simple one-liner or you can manually download and install the specific version you want to use:

In the below example, we'll use the one-liners.

1. Open the `Terminal`.
2. Go to your project's folder.
3. Enter the appropriate one-liner command, depending on your project type.
   * For an **Xcode** project:

         bash -l -c "$(curl -sfL https://raw.githubusercontent.com/bitrise-io/codesigndoc/master/_scripts/install_wrap-xcode.sh)"
   * For a **Xamarin** project:

         bash -l -c "$(curl -sfL https://raw.githubusercontent.com/bitrise-io/codesigndoc/master/_scripts/install_wrap-xamarin.sh)"
4. The tool will automatically scan your project and look for a `.xcodeproj` or `.xcworkspace` file and do the rest.

   If the scanner does not find the files, open your `Finder.app` and drag-and-drop your project's `.xcodeproj` or `.xcworkspace` file into the command line in your Terminal.

## Uploading the files to Bitrise with codesigndoc

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

## Scanning for UITest targets

If your Xcode project has UITest targets, you can use codesigndoc to export the necessary code signing files and generate an `.xctestrun` file. You need to do this if you want to run UI tests on real devices with the help of Bitrise - for example, with the \`iOS Device Testing\` Step.

To take advantage of codesigndoc's UI test scanner, you need a scheme that has **a valid UITest target** that is enabled.

![](/img/uitest-target.png)

![](/img/uitest-target-enabled.png)

If your project is set up correctly on your machine, you can start scanning!

1. Open the `Terminal`.
2. Use our one-liner to launch the scanner and export the required code signing files:

       bash -l -c "$(curl -sfL https://raw.githubusercontent.com/bitrise-tools/codesigndoc/master/_scripts/install_wrap-xcode-uitests.sh)"

   This command runs the `xcodebuild build-for-testing` action to create a UITest runner .app file, and exports the necessary code signing files.
3. [Upload your files to Bitrise with codesigndoc](/code-signing/ios-code-signing/collecting-files-with-codesigndoc/#uploading-the-files-to-bitrise-with-codesigndoc).

### Troubleshooting the UITest scanner

If the UITest scanner cannot find the desired scheme, follow these steps:

1. Make sure your scheme is valid for running a UITest.

   It has to contain a UITest target that is enabled to run.
2. Refresh your project settings:
   * Select the `Generic iOS Device` target for your scheme in Xcode.
   * Clean your project: `⌘ Cmd + ↑ Shift + K`.
   * Run a build for testing: `⌘ Cmd + ↑ Shift + U`.
3. Run `codesigndoc` again.

## Manually installing and using codesigndoc

With manual install, you can specify which version of codesigndoc you want to use. Unlike with the one-liners used above, the manual install does not automatically run the `scan` command in the folder you use it in: it merely installs the tool.

Check out the available versions on the [releases page of the codesigndoc](https://github.com/bitrise-io/codesigndoc/releases) tool.

1. Download the release you want by running a `curl` command.

   Note: replace the VERSIONNUMBER with the actual number of the codesigndoc version you want.

   ```bash
   curl -sfL https://github.com/bitrise-io/codesigndoc/releases/download/VERSIONNUMBER/codesigndoc-Darwin-x86_64 > ./codesigndoc
   ```
2. Make the downloaded binary executable:

   ```bash
   chmod +x ./codesigndoc
   ```

Done! You can now run the `scan` command of the tool at any time:

```bash
## Xcode scanner
./codesigndoc scan xcode

## Xcode project scanner for UI test targets
./codesigndoc scan xcodeuitests

## Xamarin project scanner
./codesigndoc scan xamarin
```

## Best practices

You get the most accurate result if you run `codesigndoc` on the same state of your repository/code which is available after a clean `git clone`, as that will be the state of the code after the build server checks it out (for example, you might have files on your Mac which are in `.gitignore`, so it exists on your Mac but not in the repository or after a `git clone` on a new Mac).

So, for the best results, we recommend you to:

1. **Do a clean** `git clone` **of the repository** (into a new directory) on your Mac.
2. Run `codesigndoc` in this directory (not in the directory where you usually work on the project).

It's also advised to do a full Archive + Export (until you get a signed `.ipa`) of your project from `Xcode.app` first, and run `codesigndoc` **after that**. The reason is that `Xcode.app` might download or update profiles in the background during the IPA export. If you run `codesigndoc` after you exported an `.ipa` from Xcode, `codesigndoc` will able to collect all the files.

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Now you know everything</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to Bitrise now</button></a>
</div>