# Write your own project scanner

When you add a __new app__ on bitrise, it will run a [project-scanner step](https://github.com/bitrise-steplib/steps-project-scanner) to figure out the __project's type__ and generate a __configuration__ based on the type. Same functionality exist as a bitrise cli [plugin](https://github.com/bitrise-core/bitrise-plugins-init).

Both the step and the plugin uses our shared [bitrise-init tool](https://github.com/bitrise-core/bitrise-init), which is responsible for detecting project type and generating the raleted bitrise configuration (bitrise.yml).

__bitrise-init tool__ is __open source__ and designed to __easily add new project type__ support. The following article will explain, how to write your own project scanner.

## bitrise-init tool

The tool is written in [golang](https://golang.org) and built with __command line interface__.

In the `cli` package you can find `init_config.go` which is responsible to initialize a bitrise configuration file.  

It does the followings:

1. __Collects the cli inputs__ (dir, output-dir, format, ...) which configures the init process and prints this params
- __Instantiates__ the currently available __project scanners__ (ios, android, xamarin, fastlane) and puts them into an array
- Iterates through the scanner array, __calls the scanner__ interface methods on every scanner and collects them outputs  
- Based on the scanner outputs __generates the configurations__

__To contribure and write your own scanner you have to do the followings:__

1. Fork the [project](https://github.com/bitrise-steplib/steps-project-scanner)
- Write your project type detection functionality guided by the `ScannerInterface`  
  *Every new scanner has to put into new package inside the scanners package and has to contain go tests.*
- Instantiate and add the new scanner to the scanner list in `cli/init_config.go`
- Test with the specified project type
- Create a PR

## ScannerInterface

__Declaration (`scanners/scanners.go`):__

```
// ScannerInterface ...
type ScannerInterface interface {
	Name() string
	Configure(searchDir string)

	DetectPlatform() (bool, error)

	Options() (models.OptionModel, error)
	DefaultOptions() models.OptionModel

	Configs() (models.BitriseConfigMap, error)
	DefaultConfigs() (models.BitriseConfigMap, error)
}
```

- You have to provide a simple name of the project type you will detect and return with that in `Name()` function.  
- Scanner will be configured (`Configure(searchDir string)`) with the search directoy (where the scanner should scan).  
- `DetectPlatform()` should return true, if desired platform is detected.  
  It has to be a small logic, which quickly decide. If it return with falss, the scanner loop will continue with the next detector.  
- `Options()` has to return with an `OptionModel` instance. This model represents an option for a step input, which will be asked from the user.  
  *Lets say ios project scanner found three schemes and later the user has to decide which one to use in the bitrise.yml.  
  See more in OptionModel section.*
- `Configs()` return value should hold the possible workflow variations.  
  If we stay at ios example, lats say project contains two sub project one of them has a test project also. In this case scanner should pass back at *least* two workflows, one with test and another one without test, because which workflow will be used, depends on which project will be selected.
- Later about `Defult` prefixed methods.

## OptionModel

OptionModel represents an input, with possible values.  
Every value can contain a new OptionModel, which is available if the value will be selected.

__Declaration (`models/models.go`):__

```
// OptionModel ...
type OptionModel struct {
	Title  string 
	EnvKey string 

	ValueMap OptionValueMap 
	Config   string         
}
```

__Example:__

```
title: Path to the gradle file to use
env_key: GRADLE_BUILD_FILE_PATH
value_map:
  build.gradle:
    title: Gradle task to run
    env_key: GRADLE_TASK
    value_map:
      assembleAndroidTest:
        title: Gradlew file path
        env_key: GRADLEW_PATH
        value_map:
          ./gradlew:
            config: android-gradlew-config
      assembleDebug:
        title: Gradlew file path
        env_key: GRADLEW_PATH
        value_map:
          ./gradlew:
            config: android-gradlew-config
  app/build.gradle:
    title: Gradle task to run
    env_key: GRADLE_TASK
    value_map:
      assembleAndroidTest:
        title: Gradlew file path
        env_key: GRADLEW_PATH
        value_map:
          ./gradlew:
            config: android-gradlew-config
      assembleDebug:
        title: Gradlew file path
        env_key: GRADLEW_PATH
        value_map:
          ./gradlew:
            config: android-gradlew-config
```

Every OptionModel instance represents a step input with the possible values.  

- `Title` is title of the related input.  
- `EnvKey` is a key for the environment variable, which will be set as value of the related input.  
- `Valuemap` contains the possible values of the input.  
- `Config` holds which config should be used if this option value is selected.

## BitriseConfigMap

BitriseConfigMap maps the name of the bitrise.yml and the value is a bitrise.yml as a raw string.  
The name of the bitrse.yml is last OptionModel's Config's value.

__Declaration (`models/models.go`):__

```
// BitriseConfigMap ...
type BitriseConfigMap map[string]string
```

__Example:__

```
fastlane:
  default-fastlane-config: |
    format_version: 1.2.0
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    trigger_map:
    - pattern: '*'
      is_pull_request_allowed: true
      workflow: primary
    workflows:
      primary:
        steps:
        - git-clone@3.2.0: {}
        - fastlane@2.2.0:
            inputs:
            - lane: $FASTLANE_LANE
            - work_dir: $FASTLANE_WORK_DIR
ios:
  default-ios-config: |
    format_version: 1.2.0
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    trigger_map:
    - pattern: '*'
      is_pull_request_allowed: true
      workflow: primary
    workflows:
      primary:
        steps:
        - git-clone@3.2.0: {}
        - xcode-archive@1.7.3:
            inputs:
            - project_path: $BITRISE_PROJECT_PATH
            - scheme: $BITRISE_SCHEME
```

---

> For more infos and examples check out the existing scanners.
