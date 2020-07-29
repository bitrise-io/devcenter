---
last_modified_at: 
tag:
- troubleshooting
- xcode
- testing
title: No activity summaries found for test with Danger
redirect_from: []
description: Xcov, by default, for the results bundle in its default location, not
  at `$BITRISE_XCRESULT_PATH`. Because of this your build will fail when using those
  tools. You need to configure them to look for the bundle in the location set by
  the Env Var.
menu:
  troubleshooting-main:
    weight: 20

---
## The issue

When running Danger with the xcov plugin, you may get some form of the following error message:

    2019/01/01 00:00:00 no activity summaries found for test:

## The solution

This is a consequence of how the **Xcode Test for iOS** Step works: it generates an .xcresult bundle and exports it to the `$BITRISE_XCRESULT_PATH`.

Xcov, by default, for the results bundle in its default location, not at `$BITRISE_XCRESULT_PATH`. Because of this your build will fail when using those tools. You need to configure them to look for the bundle in the location set by the Env Var. Here’s an example xcov setup:

{% include message_box.html type="important" title="Plugin version" content="The xcov plugin must be version 1.6 or later: earlier versions do not allow specifying the exact path."%}

    xcov.report(
      scheme: 'ExampleScheme',
      workspace: 'example.xcworkspace',
      xccov_file_direct_path: ENV['BITRISE_XCRESULT_PATH'],
      include_targets: 'Example.app,ExampleShared.framework,ExampleWidget.appex'
    )