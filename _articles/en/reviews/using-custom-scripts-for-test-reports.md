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

If the Step's test results directory is empty, the directory is removed once the Step has run. 

The separate test runs - for example, against different build variants - should be placed in different subdirectories within the test results directory of the Step. So you could end up with a structure something like this:

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

