---
changelog: 'You can export test results from any Step by using the Export test results
  to Test Reports add-on Step. Read about the Step and how to use it. '
last_modified_at: 2020-05-11 15:00:00 +0000
tag:
- testing
- steps
- test-reports
title: Exporting to Test Reports from any Step
redirect_from: []
description: 'Test Reports allows you to view all your test results in a convenient
  way. By default, only four Steps support the Test Reports feature. However, you
  can export the test results of other Steps to Test Reports via custom Script Steps. '
new_article: false
summary: ''
menu:
  testing-main:
    weight: 3

---
[Test Reports](/testing/test-reports/) allows you to view all your test results in a convenient way. By default, only four [Steps](/steps-and-workflows/steps-and-workflows-index/) support the Test Reports add-on. However, there is a limited support for exporting the test results of other testing Steps to Test Reports, either via our own **Export test results to the Test reports add-on** Step or via custom Script Steps. 

Here's what you need to do to make sure that your test results are exported to the Test Reports add-on:

1. Deploy the test results in the correct directories.
2. Make sure every test run has its own test-info.json file, with a test name.
3. Make sure all directories include a test report in a standard JUnit XML format.
4. Include a **Deploy to Bitrise.io** Step in your Workflow.

To do all this, we need to delve a bit deeper into how the Test Reports add-on works.

## The test results directory

For those testing Steps that are supported by the [Test Reports](/testing/test-reports/) add-on, the Bitrise CLI creates a root directory for all test results and exposes its path in the BITRISE_TEST_RESULT_DIR [Environment Variable](/builds/env-vars-secret-env-vars/) (Env Var). As such, every supported Step sees its own test results directory.

The Step then moves every artifact that is deemed a test result into the Step's test result directory: test result files, test attachments, logs, screenshots, and so on.

{% include message_box.html type="important" title="Custom Steps" content="Please note that when using custom Script Steps to export your results, only image files are exported to Test Reports.

When using the four supported Steps, as described in our [Test Reports guide](/testing/test-reports/), logs, videos, and other files are exported, too."%}

After each Step, the Bitrise CLI checks the Steps's test result directory. If the directory is not empty, the CLI adds a metadata file called step-info.json. This file describes the Step:

    // TestResultStepInfo ...
    type TestResultStepInfo struct {
    	ID      string `json:"id" yaml:"id"`           // Step ID
    	Version string `json:"version" yaml:"version"` // Step version
    	Title   string `json:"title" yaml:"title"`     // Step title
    	Number  int    `json:"number" yaml:"number"`   // Step number in the workflow
    }

The separate test runs - for example, against different build variants - should be placed in different sub-directories within the test results directory of the Step. Unlike the BITRISE_TEST_RESULT_DIR, these directories are not created automatically: they must be created during the build. The directory structure should be something like this:

    Build Test Result directory
    └── Step Test Result directory
        ├── Step Test Run Result Directory 1
        │   ├── TEST-com.multipletestresultssample.UnitTest0.xml
        │   └── test-info.json
        ├── Step Test Run Result Directory 2
        │   ├── TEST-com.multipletestresultssample.UnitTest1.xml
        │   └── test-info.json
        └── step-info.json

## The test-info.json file

If you want to export your tests to the Test Reports add-on, the sub-directories for each test run should contain a test-info.json file which has the test-name node defined in it. The value of test-name will appear as the name of the test run on the Test Reports page.

    // Test Name ...
    { "test-name":"My first test" }

## The test report file

Once a testing Step has run on Bitrise and its test results have been placed into the correct directory, the **Deploy to Bitrise.io** Step can collect the results and export them to Test Reports. It does so in a JUnit XML format.

This means that your test results must contain a test report in a standard JUnit XML format, such as this:

    <testsuites>        => the aggregated result of all junit testfiles
      <testsuite>       => the output from a single TestSuite
        <properties>    => the defined properties at test execution
          <property>    => name/value pair for a single property
          ...
        </properties>
        <error></error> => optional information, in place of a test case - for example, if the tests in the suite could not be found for some reason
        <testcase>      => the results from executing a test method
          <system-out>  => data written to System.out during the test run
          <system-err>  => data written to System.err during the test run
          <skipped/>    => if a test was skipped
          <failure>     => if a test failed
          <error>       => if a test encountered an error
        </testcase>
        ...
      </testsuite>
      ...
    </testsuites>

{% include message_box.html type="note" title="The file format" content="The <testsuites> element is not mandatory. You can include multiple test report files separately, even if each of them only contains a <testsuite> element: they will be merged together."%}

## Exporting the results

To export the test results of [Steps](/steps-and-workflows/steps-and-workflows-index/) that are not, by default, supported by the Test Reports add-on to the **Deploy to Bitrise.io** Step, you have two options:

* We strongly recommend using our [**Export test results to the Test reports add-on** Step](https://www.bitrise.io/integrations/steps/custom-test-results-export): this Step locates the test results based on your inputs.
* You can configure your own custom Script Step that creates and exports the necessary files. 

### Using the Export test results to the Test reports add-on Step

If you run tests via an unsupported testing Step - such as **Flutter Test** -, the easiest way to make sure that your test results end up in the Test Reports add-on is to use the **Export test results to the Test reports add-on** Step in your Workflow. 

The Step’s purpose is to make sure that the test results end up in the directory where the **Deploy to Bitrise.io Step** looks for test results to export to the Test Reports add-on. With the correct configuration, the Step finds the test results in your app’s repository, and puts them in the export directory. 

{% include message_box.html type="important" title="Required inputs for exporting your test results" content="Please note that in the **Export test results to the Test reports add-on** Step, you must set BOTH the **Path where custom test results reside** input and the **Test result search pattern** input. The former tells Bitrise where to look for your results, while the latter specifies a search pattern to find your results file."%}

1. Go to your app’s page on [bitrise.io](http://bitrise.io). 
2. Go to **Workflows** to open the Workflow Editor. 
3. From the **WORKFLOW** menu, select the Workflow you use to run your tests. 
4. Add the **Export test results to the Test reports add-on** Step AFTER the testing Step. 
5. In the **The name of the test** input, set the name you want to be shown in the Test Reports add-on. 
6. In the **Path where custom test results reside** input, set the path where your test results can be found.   
   You must not leave this input value empty. This input determines where Bitrise will look for your test results. We recommend setting a folder here though you can also set a specific filepath. The default value is the source directory of your app.
   Example patterns:
   - If your app's root directory is `app`: `app/build/test-results/testDemoDebugUnitTest/`
   - If your test results are within an `app` folder but `app` is not the root directory: `./app/build/test-results/testDemoDebugUnitTest/`
7. In the **Test result search pattern** input, set a pattern that matches your test result file.    
   You must not leave this input value empty. This search pattern is used to search every file and folder of the provided base path which was set in the **Path where custom test results reside** input.   
   If there is more than one match, the Step will export the first match with a warning in the logs. If you set a specific filepath in the previous input, just set * here.  
   Example patterns:
   - Matching all files within the base path: `*`  
   - Matching all files within a given directory of the base path: `*/build/test-results/testDemoDebugUnitTest/*`
8. In the **Step's test result directory** input, make sure the path is correct.   
   Do NOT modify this input’s value: this is the folder where the **Deploy to Bitrise.io** Step will look for the test results to export them. It should be set to the $BITRISE_TEST_RESULT_DIR Env Var.   
9. Make sure you have a **Deploy to Bitrise.io** Step in your Workflow. 

### Example scripts for exporting test results

Here's an example script for a single test run, the results of which should be exported to Test Reports. In this example, we create a sub-directory for a specific test run, add the JUnit XML file and the test-info.json file.

    #!/bin/env bash
    set -ex
    
    # Creating the sub-directory for the test run within the BITRISE_TEST_RESULT_DIR:
    test_run_dir="$BITRISE_TEST_RESULT_DIR/result_dir_1"
    mkdir "$test_run_dir"
    
    # Creating the JUnit XML test report:
    echo  '<?xml version="1.0" encoding="UTF-8"?>
    <testsuite name="sample.results.test.multiple.bitrise.com.multipletestresultssample.UnitTest0" tests="10" skipped="0" failures="0" errors="0" timestamp="2019-05-10T13:47:08" hostname="my-localdomain" time="0.002">
      <properties/>
      <testcase name="correctCase0" classname="sample.results.test.multiple.bitrise.com.multipletestresultssample.UnitTest0" time="0.001"/>
      <testcase name="correctCase1" classname="sample.results.test.multiple.bitrise.com.multipletestresultssample.UnitTest0" time="0.0"/>
      <system-out><![CDATA[]]></system-out>
      <system-err><![CDATA[]]></system-err>
    </testsuite>' >> "$test_run_dir/UnitTest.xml"
    
    # Creating the test-info.json file with the name of the test run defined:
    echo '{"test-name":"sample"}' >> "$test_run_dir/test-info.json"

In the above example, we've created the test report JUnit XML file in the script itself. But of course it is possible to export an already existing file in the same way:

    #!/bin/env bash
    set -ex
    
    # Creating the sub-directory for the test run within the BITRISE_TEST_RESULT_DIR:
    test_run_dir="$BITRISE_TEST_RESULT_DIR/result_dir_1"
    mkdir "$test_run_dir"
    
    # Exporting the JUnit XML test report:
    cp "MY/TEST/REPORT/XML/FILE/PATH.xml" "$test_run_dir/UnitTest.xml"
    
    # Creating the test-info.json file with the name of the test run defined:
    echo '{"test-name":"MY TEST RUN NAME"}' >> "$test_run_dir/test-info.json"

If all goes well, you should be able to see your test results on the [Test Reports](/testing/test-reports/) page.

{% include banner.html banner_text="Export test results with Script Steps" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}