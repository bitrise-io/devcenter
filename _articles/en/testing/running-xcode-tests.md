---
title: Running Xcode tests
redirect_from: []
date: 2019-02-22T15:33:24.000+00:00
menu:
  testing-main:
    weight: 4

---
To run Xcode tests on Bitrise, you need to have test targets defined in your projects. You need two Steps to run Xcode tests and view their results:

* `Xcode Test for iOS`
* `Deploy to Bitrise.io`

{% include message_box.html type="note" title="Code signing files" content="Running Xcode tests and deploying their results to Bitrise do not require any code signing files. So don't worry about them just yet!"%}

The `Xcode Test for iOS` step runs the pre-defined Xcode tests. It has a default configuration that will work if the tests are written correctly. You can find the same configuration options in Xcode, too.

The `Deploy to Bitrise.io` will deploy the following to the `Logs` and [Apps & Artifacts](/builds/build-artifacts-online/) tab of the build:

* your Xcode test results
* your raw `xcodebuildoutput` log

You can also generate code coverage files, and export the test results as a compressed zip file.

### Configuring the Xcode tests on Bitrise

The default input values of the `Xcode Test for iOS` Step could work if your tests are written correctly. However, we recommend making sure that all the inputs have the value you want so the Step can do what you need!

Check the following required inputs of the `Xcode Test for iOS` Step before running a build. These inputs determine the sort of tests the Step will run.

![](/img/xcode-test-input.png)

* **Scheme name**: the scheme you use must be marked as Shared in Xcode!
* **Device**: set it to the value that is shown in Xcode's device selection dropdown menu.
* **OS version**: set it to the value that is shown in Xcode's device selection dropdown menu.
* **Platform**: set it to the value that is shown in Xcode's device selection dropdown menu.

{% include message_box.html type="info" title="Headless mode" content="From Xcode 9 onwards, tests are run in headless mode by default: this means that the simulator will run in the background only. To change it, go to the Step's Debug input group and set the `Run the test in headless mode?` input's value to `no`. However, with this option, tests will take more time."%}

{% include message_box.html type="warning" title="Using `xcpretty`" content="The `xcpretty` output tool does not support parallel tests. If parallel tests are enabled in your project, go to the Step's Debug input group and set the `Output tool` input's value to `xcodebuild`."%}

### Generating code coverage files

By default, the `Xcode Test for iOS` Step does not generate code coverage files. If you need them, however, it's easy to change: just set the `Generate code coverage files?` to `yes`.

![](/img/code-coverage.png)

This sets two additional flags to the `xcodebuild` command:

    xcodebuild GCC_INSTRUMENT_PROGRAM_FLOW_ARCS=YES GCC_GENERATE_TEST_COVERAGE_FILES=YES

If you run a successful build, code coverage files will be included in your results.

### Exporting UI test artifacts

You can export the attachments of your UITest into the `BITRISE_DEPLOY_DIR` directory. These attachments include screenshots taken during the UI test, as well as any other artifacts that might have been generated. They are exported as a compressed zip file.

By default, the `Xcode Test for iOS` Step does not export artifacts of the UITest. If you want to export them, set the `Export UITest Artifacts` input of the `Xcode Test for iOS` Step to `true`.