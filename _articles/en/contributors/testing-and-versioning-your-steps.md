---
published_at: 2020-03-04
last_modified_at:
tag:
- steps
- cli
- contributors
- workflows
- testing
title: 'Testing and versioning your Steps '
redirect_from: []
summary: Test your new Steps before submitting them to the Bitrise StepLib. The Step's
  bitrise.yml contains a Workflow called test that can be used to perform end-to-end
  testing on the Step.
menu:
  contributors-main:
    weight: 3

---
## Testing your Steps

Test your new Steps before submitting them to the Bitrise StepLib. We'll talk about how to do end-to-end testing.

We strongly recommend that you start with running a test with the automatically generated, default testing Workflow. This should be the first in end-to-end testing.

If the Step seems to work as intended, you can test it as part of an app’s build. To run a Step in a Bitrise Workflow, you can:

* Run it from a direct source (either a local path or a Git URL).
* From a StepLib repository.

During the development process, you should first run your Step from its local path. Once you feel you reached a stable version, push that version to the Step repository and use the repository's Git URL as the Step's source. The last stage is to try and run it from a StepLib. We'll walk you through these options.

### Testing with the automatically generated Workflow

When working with a new Step, you should already have a bitrise.yml file in the Step’s directory: the Step plugin automatically generates one when you create a new Step. This bitrise.yml contains a Workflow called test that can be used to perform end-to-end testing on the Step.

To run this Workflow on your own machine, you do not need to configure or modify anything if you created the Step with the Bitrise Step plugin. You can run it on [bitrise.io](http://bitrise.io) as well but in that case, you need to first clone the repository as you’d do with a normal Bitrise app.

And of course you can freely modify this Workflow to suit your own needs.

1. Open a command line interface, such as the Terminal app for MacOS.
2. Go to your Step’s directory.

       cd my_step_directory
3. Run the automatically generated Workflow.

       bitrise run test

And that’s it: Bitrise will run the test for you and the logs will tell you if everything worked as intended.

### Running the Step from a direct source

A direct source is either a local path or a Git URL. In a Workflow, each Step has its own Step reference that defines its source. To add a Step to a Workflow, this Step reference needs to be added to the bitrise.yml file. Read more about Step sources and Step references in our [Steps in YAML](/bitrise-cli/steps/) guide.

For more information on the bitrise.yml file, see [Basics of bitrise.yml](/bitrise-cli/basics-of-bitrise-yml/).

1. Under the steps property of the Workflow in the bitrise.yml file, add your Step's path as a Step reference, in the following format:
   * To run the Step from a local path, use the path:: source in the Step reference:
   	 
     ```yaml
     format_version: 9
     workflows:
     	primary:
     	steps:
     	- path::./steps-example:
     	  title: "Example Test"
      ```
   In the above example, our **Example Test** Step is the first Step of the primary Workflow. We run the Step from its local path: path::./steps-example.
   * To run the Step from a Git URL:

     ```yaml
     format_version: 9
     workflows:
     	primary:
     	steps:
     	- git::https://github.com/example-repo/example-test.git@master
     	  title: "Example Test"
      ```

   In the above example, our **Example Test** Step is the first Step of the primary Workflow, run from a git URL, using the master branch.
2. Run a build with bitrise run <workflowname> or on [bitrise.io](http://bitrise.io) to check if your Step worked.

### Running the Step from a StepLib

We encourage you to share your Step with other Bitrise users. To do so, you first need to test running your Step from a StepLib repository. That's really simple, don't worry.

1. Fork the [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib.git) repository.

   You can use any other StepLib, too, but we recommend the official one! You'll need this fork anyway if you want your Step to be included in the official StepLib.
2. Add your Step's step.yml to the forked StepLib repository.
3. In the bitrise.yml file of your testing app, set the forked StepLib repository as the value for default_step_lib_source.

   If the Step reference does not specify a direct source, this value will be used.

       format_version: 9
       default_step_lib_source: <https://github.com/my-repo/bitrise-steplib.git>
4. Add the Step to the Workflow: use the Step ID and, optionally, a version number.

   If you do not set a version number, the latest version of the Step will be used.

   ```yaml
   workflows:
     primary:
        steps:
        - script@0.9.0:
             title: "Using default_step_lib_source"
             inputs:
             - content: |
                 #/bin/bash
                 echo "Welcome to Bitrise!"
   ```

5. Run a build with bitrise run <workflowname> or on [bitrise.io](http://bitrise.io) to check if your Step worked.

## Step versioning

You should use [semantic versioning](http://semver.org/) (MAJOR.MINOR.PATCH) for your Step. For example: 1.2.3. In this way users will have a better idea of the scope of a given Step update.

Before you would share your Step, push your changes to the Step repository and put a git tag on the latest commit. This tag will be your Step's version. Neither the Step version nor the version tag should contain a v prefix, just the numbers.

{% include message_box.html type="warning" title="Already shared versions of a Step" content="When you perform the share-this-step workflow generated by the Step plugin, the stepman tool will modify your step.yml file and embed the version tag's commit message. In this way we will be able to validate that the given Step version always means the same state of the Step repository. This means that git tags of already shared Step versions must not be moved to another commit."%}