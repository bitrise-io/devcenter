## Easiest way to export code signing identities

You can easily locate the needed certificates and provisioning profiles for your project with our `codesigndoc` tool.

Simply open your `Terminal.app` on your Mac and
[run the one liner "install" command](https://github.com/bitrise-tools/codesigndoc#one-liner).

After that open your `Finder.app` and drag-and-drop your project's `.xcodeproj` or `.xcworkspace` file into the command line in your terminal.
![codesigndoc](/img/ios/codesigndoc.png)
Once it's done you'll have all the required files exported, ready for upload.

## Uploading the exported code signing files to Bitrise

Once you have all the needed files, head to your dashboard on [bitrise.io](https://www.bitrise.io) and select your app.

Go to **Workflow** > **Manage Workflows** > and select the **Code Signing & Files** tab on the left. Upload your code signing certificate (p12) and provisioning profiles and you are ready to go! 🚀
