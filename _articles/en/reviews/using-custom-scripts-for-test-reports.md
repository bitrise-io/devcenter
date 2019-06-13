---
tag: []
title: 'Exporting to Test Reports from custom Script Steps - draft '
redirect_from: []
summary: ''
published: false

---
By default, only four Steps support the [Test Reports](/testing/test-reports/) feature. However, you can export the test results of other Steps to Test Reports via custom Script Steps. Here's what you need to do:

1. Deploy the test results in the correct directories.
2. Make sure every test run has its own `test-info.json` file, with a test name.
3. Make sure all directories include a test report in a standard JUnit XML format
4. Include a **Deploy to Bitrise.io** Step in your Workflow.

To do all this, we need to delve a bit deeper into how the Test Reports feature works.

## The test results directory

The Bitrise CLI creates a root directory for all test results and exposes its path in the `BITRISE_TEST_RESULT_DIR` Environment Variable (Env Var) for the supported Steps. As such, every supported Step sees its own test results directory.

The Step then moves every artifact that is deemed a test result into the Step's test result directory: test result files, test attachments, logs, screenshots, and so on.

After each Step, the Bitrise CLI checks the Steps's test result directory. If the directory is not empty, the CLI adds a metadata file called `step-info.json`. This file describes the Step:

    // TestResultStepInfo ...
    type TestResultStepInfo struct {
    	ID      string `json:"id" yaml:"id"`           // Step ID
    	Version string `json:"version" yaml:"version"` // Step version
    	Title   string `json:"title" yaml:"title"`     // Step title
    	Number  int    `json:"number" yaml:"number"`   // Step number in the workflow
    }

The separate test runs - for example, against different build variants - should be placed in different sub-directories within the test results directory of the Step. Unlike the `BITRISE_TEST_RESULT_DIR`, these directories are not created automatically: they must be created during the build. The directory structure should be something like this:

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

As you can see above, the sub-directories for each test run contain a `test-info.json` file. This file has to be created by the Script Step, with the `test-name` node defined in it. The `test-name` value will appear as the name of the test run on the Test Reports page.

    // Test Name ...
    { "test-name":"My first test" }

![](/img/Test_add-on-6.png)

## The test report file

Once a Step has run and its test results have been placed into the correct directory, the **Deploy to Bitrise.io** Step can collect the results and export them to Test Reports. It does so in a JUnit XML format.

This means that your test results must contain a test report in a standard JUnit XML format, such as this:

```xml
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
```

{% include message_box.html type="note" title="The file format" content="The `<testsuites>` element is not mandatory. You can include multiple test report files separately, even if each of them only contains a `<testsuite>` element: they will be merged together."%} 

## Example scripts

Here's an example script for a single test run, the results of which should be exported to Test Reports. In this example, we create a sub-directory for a specific test run, add the JUnit XML file and the `test-info.json` file.

```bash
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
```

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