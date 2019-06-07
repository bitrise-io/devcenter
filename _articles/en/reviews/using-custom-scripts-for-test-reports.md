---
tag: []
title: Using custom scripts for Test Reports
redirect_from: []
summary: ''
published: false

---
By default, only four Steps support the Test Reports feature. However, you can export the test results of other Steps to Test Reports via custom Script Steps. To do this, we need to delve a bit deeper into how the feature works. 

The Bitrise CLI creates a root directory for all test results and exposes its path in the `BITRISE_TEST_RESULT_DIR` Environment Variable (Env Var) for the supported Steps. As such, every supported Step sees its own test results directory. 

The Step then moves every artifact that is deemed a test result into the Step's test result directory: test result files, test attachments, logs, screenshots, and so on. 

After each Step run, the Bitrise CLI checks the Steps's test result directory. If the directory is not empty, the CLI adds a metadata file called `step-info.json`. This file describes the Step:

```
// TestResultStepInfo ...
type TestResultStepInfo struct {
	ID      string `json:"id" yaml:"id"`           // Step ID
	Version string `json:"version" yaml:"version"` // Step version
	Title   string `json:"title" yaml:"title"`     // Step title
	Number  int    `json:"number" yaml:"number"`   // Step number in the workflow
}
```

The separate test runs - for example, against different build variants - should be placed in different sub-directories within the test results directory of the Step. Unlike the `BITRISE_TEST_RESULT_DIR`, these directories are not created automatically: they must be created by the user. So the directory structure should be something like this:

```
Build Test Result directory
└── Step Test Result directory
    ├── Step Test Run Result Directory 1
    │   ├── TEST-com.multipletestresultssample.UnitTest0.xml
    │   └── test-info.json
    ├── Step Test Run Result Directory 2
    │   ├── TEST-com.multipletestresultssample.UnitTest1.xml
    │   └── test-info.json
    └── step-info.json
```

As you can see, the sub-directories for each test run contain a `test-info.json` file. This file has to be created with the Script Step, with the `test-name` node defined in it. The `test-name` value will appear as the name of the test run on the Test Reports page. 

```
// Test Namme ...
{ "test-name":"My first test" }
```

Once a Step has run and its test results have been placed into the correct directory, the **Deploy to Bitrise.io** Step can collect the results and export them to Test Reports. It does so in a JUnit XML format.

This means that your test results must contain a test report in a standard JUnit XML format, such as this:

```xml
<testsuites>        => the aggregated result of all junit testfiles
  <testsuite>       => the output from a single TestSuite
    <properties>    => the defined properties at test execution
      <property>    => name/value pair for a single property
      ...
    </properties>
    <error></error> => optional information, in place of a test case - normally if the tests in the suite could not be found etc.
    <testcase>      => the results from executing a test method
      <system-out>  => data written to System.out during the test run
      <system-err>  => data written to System.err during the test run
      <skipped/>    => test was skipped
      <failure>     => test failed
      <error>       => test encountered an error
    </testcase>
    ...
  </testsuite>
  ...
</testsuites>
```

So, to make sure your test results are exported, you need to:

1. Deploy the results in the correct directory. 
2. Make sure they are in JUnit XML format. 
3. Make sure every test run has its own `test-info.json` file, with a test name. 
3. Include a **Deploy to Bitrise.io** Step in your Workflow. 

Here's an example script that should work with Test Reports:

```bash
#!/bin/env bash
set -ex

# Step Test Run Result Directory
test_run_dir="$BITRISE_TEST_RESULT_DIR/result_dir_1"
mkdir "$test_run_dir"

echo  '<?xml version="1.0" encoding="UTF-8"?>
<testsuite name="sample.results.test.multiple.bitrise.com.multipletestresultssample.UnitTest0" tests="10" skipped="0" failures="0" errors="0" timestamp="2019-05-10T13:47:08" hostname="Krisztians-MBP.localdomain" time="0.002">
  <properties/>
  <testcase name="correctCase0" classname="sample.results.test.multiple.bitrise.com.multipletestresultssample.UnitTest0" time="0.001"/>
  <testcase name="correctCase1" classname="sample.results.test.multiple.bitrise.com.multipletestresultssample.UnitTest0" time="0.0"/>
  <system-out><![CDATA[]]></system-out>
  <system-err><![CDATA[]]></system-err>
</testsuite>' >> "$test_run_dir/UnitTest.xml"

# Test run Metadata
echo '{"test-name":"sample"}' >> "$test_run_dir/test-info.json"
```