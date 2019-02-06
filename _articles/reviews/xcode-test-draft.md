---
title: Xcode Test draft
redirect_from: []
date: 2019-02-04 16:42:15 +0000
published: false

---
To run Xcode tests on Bitrise, you need to have test targets defined in your projects. You need two Steps to run Xcode tests and view their results:

* `Xcode Test for iOS`
* `Deploy to Bitrise.io`

{% include message_box.html type="note" title="Code signing files" content="Running Xcode tests and deploying their results to Bitrise do not require any code signing files. So don't worry about them just yet!"%}

The `Xcode Test for iOS` step runs the pre-defined Xcode tests. It has a default configuration that does not need to be modified: if the tests are written correctly, they will work. You can find the same configuration options in Xcode, too.

The `Deploy to Bitrise.io` will deploy the following to the `Logs` and [Apps & Artifacts](/builds/build-artifacts-online/) tab of the build:

* your Xcode test results
* your raw `xcodebuildoutput` log.