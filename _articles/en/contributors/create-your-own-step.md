---
changelog: 'Updated with information on how to set your Step''s platform type and
  function type in the step.yml file. '
last_modified_at: '2020-05-08T12:00:00.000+00:00'
title: 'Developing a new Step '
tag:
- cli
- steps
- bitrise.yml
- workflows
description: Creating your own Step is as simple as running a bitrise CLI command
  and following the guide it prints. You can generate Steps using either the Bash
  or Go toolkits.
redirect_from:
- "/bitrise-cli/create-your-own-step/"
summary: ''
menu:
  contributors-main:
    weight: 1

---
A Step is a build task: for example, the **Git Clone** Step clones your Git repository at the start of a build while the **Google Play Deploy** Step can deploy your finished app to the Play Store.

A Step contains the code that performs the build task. You can configure the inputs and parameters that define the task, and view and reuse the outputs a Step generates. Reusing the output means that another Step can use it as the value of one of its inputs.

Our Steps are written with either bash or Go. Steps are contained in their own Git repositories: that includes the code and the `step.yml` file that defines the configuration of the Step. If you wish to make the Step available to other users, the `step.yml` file needs to be included in the `bitrise-steplib` repository so that other users can find the Step on our website, in the Workflow Editor.

{% include message_box.html type="info" title="Sharing Steps" content="Sharing your custom Steps is not required, of course: a Step with a use case that is specific to a single user will not be much help to others. As you can run a Step from your own machine or from any Git repository, your custom Steps do not have to be part of the Bitrise Step Library.

For more info on sharing Steps with other users, check out the [Sharing Steps](/contributors/sharing-steps-with-all-bitrise-users/) guide."%}

In this guide we'll walk you through the most important aspects of creating and submitting new Steps for Bitrise.

For detailed information on how Steps work, see the following guides:

* [Steps in YAML](/bitrise-cli/steps/)
* [Step inputs](/bitrise-cli/step-inputs/)
* [Step outputs](/bitrise-cli/step-outputs/)
* [Step properties](/bitrise-cli/step-properties/)

## Before you start

Before creating a new Step, you will need to install the Bitrise CLI, set it up, and make sure the [Step plugin](https://github.com/bitrise-io/bitrise-plugins-step) is updated to the latest version.

1. [Install the Bitrise CLI](/bitrise-cli/installation/).
2. Run bitrise setup.
3. Update the Step plugin to the latest version with the following command:

       bitrise plugin update step

## Creating the Step

We will use the Step plugin of the Bitrise CLI to create a new Step. With this, we'll create the basic structure of the Step. Certain properties and inputs will be generated and assigned automatically. You can change anything later so don't worry about it yet.

{% include message_box.html type="info" title="The Step plugin" content="Run bitrise :step in a command line interface to check its commands."%}

Creating the basic structure of the Step is simple. We'll go over the concepts involved in the process in more detail later; for now, just go through the process to create the Step. At the end of this process, you will have a `step.yml` file, a README.md file and either a main.go or a main.sh file in the repository.

{% include message_box.html type="important" title="Before you start" content="During the Step creation process, you will be prompted to set a number of options. Note that you can change any of these before submitting your Step to Bitrise for review: the data will be included in the generated `step.yml` file that you can edit at your leisure later. During the initial Step creation process, you can use placeholders if you want to."%}

 1. Open a command line interface, such as the Terminal app on MacOS.
 2. Create a new directory for your Step if you haven’t done so yet and enter that directory:

        mkdir my_step_dir
        cd my_step_dir
 3. Create the Step with the Bitrise Step plugin:

        bitrise :step create
 4. When prompted, set the name of the Step's author.

    Hit Enter to leave it on the default value.
 5. When prompted, set the Step's name.

    The plugin automatically generates a Step ID based on this name.
 6. Provide a summary: no more than a couple of sentences about what the Step does.
 7. Provide a description of the Step.

    This should contain configuration information and troubleshooting information for the Step.
 8. Select the primary category of the Step.

    To do so, type the number of the preferred option and hit Enter. This can be changed later.
 9. Choose the toolkit you want to use: you can choose either Go or Bash.
10. Set up the source code hosting data for the Step:

    To do so, first decide if you want to host it on GitHub or on any other site and enter the appropriate option:
    * If you chose GitHub, you will be asked to provide the username of the account that will own the repository.
    * If you chose not to store it on GitHub, you have to provide a valid URL for the repository.

You are done! If everything went well, the plugin initialized a git repository in the current directory and added a `step.yml`, a `README.md` file, and either a `main.go` or a `main.sh` file.

Now we'll go through how the `step.yml` file works and how to set it up.

## The step.yml file

The `step.yml` file is the Step interface definition, containing dependencies, Step inputs and Step outputs as well as other Step properties. It also points to the location of the Step's source code. Every Step must have one.

If you use the Step plugin to create a new Step, all the required properties will have a value assigned - but you can change any of them at any time. So don't worry if the title you set during the initial process does not conform to the guidelines below.

We'll look at the most important configuration options of the `step.yml` file, including naming and describing your Step, as well as setting up Step inputs and Step outputs.

## Naming and describing a Step

Every Step must have at least a title and a summary defined in the `step.yml` file. These will appear both on the [Integrations](www.bitrise.io/integrations/) page and in the [Workflow Editor](/steps-workflows/). The `description` property is optional but we strongly recommend providing one so that other users better understand how your Step works.

{% include message_box.html type="info" title="Description and summary" content="Both `description` and `summary` accept Markdown formatting in its values."%}

### The title

{% include message_box.html type="important" title="The title property" content="The `title` property is required!"%}

The `title` property sets the name of the Step, as it will appear on [bitrise.io](www.bitrise.io). It should be short and descriptive. Include the name of the service and the function it fulfils, such as **Git Clone**. Here's a few guidelines for your Step titles:

* Do not use the word 'Step'.
* Use imperative verbs instead of nouns when possible. For example, instead of **Script Runner**, it should be **Run Script**.
* Do not include the name of the platform.
* Make sure you use the correct name of a service or tool. For example, GitHub instead of Github.
* Do not include implementation details.

### The summary

{% include message_box.html type="important" title="The summary property" content="The summary property is required!"%}

A single line of the most significant information about the Step. It can't be longer than a 100 characters.

The summary is visible by default on the Workflow Editor. If a user expands the summary, the Step's description will be presented - if there is one, of course.

### The description

A detailed explanation of the Step. It should include:

* What the Step does.
* The services and tools used by the Step.
* Configuration information, including the most important inputs.
* Troubleshooting information: potential issues and their solutions.

By default, the Step's description is collapsed on the Workflow Editor and the summary is presented.

## Step categories

There is another thing we’d like to know about your Step: what type of Step is it? As you can see on our Integrations page or on the Workflow Editor, Steps are sorted into different categories based on two factors: the platforms for which they are available and their functionality.

### Platform types

The available platform types are controlled by the project_type_tags attribute. If your Step is available for every platform or project type, do not specify project_type_tags. In any other case, select all platform types for which your Step is available.

The available values are:

* `ios`
* `macos`
* `android`
* `xamarin`
* `react-native`
* `cordova`
* `ionic`
* `flutter`

### Function types

Functional categories are controlled by the type_tags attribute in the step.yml. One Step should have only a single type_tag assigned to it. Use utility only if you believe none of the other types fit your Step.

The available values are:

* `build`
* `code-sign`
* `test`
* `deploy`
* `notification`
* `access-control`
* `artifact-info`
* `installer`
* `dependency`
* `utility`

## Step inputs

Step inputs are Bitrise [Environment Variables](/builds/env-vars-secret-env-vars/): they consist of a key and value pair that define a configuration function, and, when applicable, the input options. For example, the **Git Clone** Step has an input with the key branch:

    title: Git Clone Repository
    summary: Clone a repository to the specified path on the VM
    inputs:
    - branch: master

The value of this input - master in the above example - is used to determine which branch of the repository will be cloned.

Step inputs are visible on the Workflow Editor: they are presented in the order as they appear in the `step.yml`. As such, required and frequently used inputs should be at the top.

### Step input keys and values

Use lower case [snake case](https://en.wikipedia.org/wiki/Snake_case) style input keys. For example, `project_path`.

{% include message_box.html type="warning" title="Using `opts` as an input key" content="The input key can not be `opts`, as it is used for the input’s options."%}

There is no need to add domain-specific prefixes to the input keys, as inputs are only exposed for the Step run process. This means `project_path` input will not overlap with subsequent Steps' `project_path` inputs.

Step input values are strings: the Bitrise CLI exposes the Step inputs as Environment Variables to the Steps.

Provide default values for Step inputs if possible (and if it makes sense). That makes the Step configuration easier for Bitrise users.

Environment Variables must not be used as default values, unless:

* They are exposed by the [Bitrise CLI or by bitrise.io](/builds/available-environment-variables).
* They are generated as an output by another Step (for example, `$BITRISE_IPA_PATH`, `$BITRISE_AAB_PATH`).

This is because the Workflow Editor highlights required inputs without values to express the Step will not work without setting a valid value for the given input. If you set an Env Var, which does not have an automatically assigned value, as the default value for an input, the Workflow Editor will think the required input in question has a valid value set (even if the default Env Var has no value yet).

Also, there is no reason to suggest a certain name for an Environment Variable this way: users might have the same value assigned to an Env Var with a different name.

Let's talk about how Step inputs are passed to code and how they are presented.

## Configuring Step inputs

Step inputs are defined and configured in the `step.yml` file.

In addition to a key and a value, Step inputs are required to have an `opts` property. This property contains the different options that define how the inputs are passed to the code of the Step and how it is presented in the Workflow Editor. The possible values of the input can be set in `opts` as well.  Let's see an example.

    - install_defaults: "yes"
      opts:
        title: Installs default Codesign Files
        value_options:
        - "no"
        - "yes"

The above input has the key install_defaults, and its default value is yes.

The `value_options` option defines the possible values: in this case, `yes` and `no`. Its `opts` property contains some information about how the input is presented: in this case, it's just a title option, which is always required. The title is displayed in the Workflow Editor instead of the key of the input.

### Naming and describing Step inputs

A Step input can have a name, a summary, and a description, just like the Step itself. To define these:

1. Include an `opts` property with the Step input.
2. Under opts, provide a title, a summary, and a description option.

Let's take a look at how these should look like!

{% include message_box.html type="info" title="Description and summary" content="Both `description` and `summary` accept Markdown formatting in its values."%}

* `title`: It should be a short and descriptive sentence or half sentence: The Xcode project's path. It should not be a CLI flag or API parameter name used internally. This makes Step configuration easier, as no preexisting knowledge will be required about the underlying tool or service interfaces. It's also easier to change the Step's implementation while maintaining backwards compatibility.
* `summary`:  It is the short version of the description, which provides a quick overview of the input. On the Bitrise Workflow Editor, the summary of the inputs is presented by default when you click on a Step.
* `description`: It is the user facing description of the Step input: this should provide a deeper, more detailed explanation of the input. By default, it is not visible in the Workflow Editor, unless the user clicks on the input in question.

Here's an example:

    - install_defaults: "yes"
      opts:
        description: Installs default (Bitrise) Wildcard Provisioning Profile and
          Certificate files for testing.
        summary: Installs default (Bitrise) Wildcard code signing files.
        title: Installs default code signing files

Now, let's talk about some other configuration options for Steps.

### Required inputs

Required inputs must have a valid value, otherwise the Step will fail.

To mark a Step input as required, use the is_required option  of the `opts` property. It has two values: `true` and `false`. If set to `true`, the input will be displayed as **REQUIRED** on the Workflow Editor.

    - keychain_password: $BITRISE_KEYCHAIN_PASSWORD
      opts:
        title: "Keychain's password"
        is_required: true

### Sensitive inputs

You can mark Step inputs as sensitive to make sure their values do not get exposed. Sensitive inputs only accept [Secrets](https://devcenter.bitrise.io/bitrise-cli/secrets/) as values. This ensures they are not visible in build logs.

To mark a Step input as sensitive, use the `is_sensitive` option of the `opts` property. It has two values: `true` and `false`. If set to `true`, the input will be displayed as **SENSITIVE** on the Workflow Editor.

{% include message_box.html type="important" title="The `is_expand` option" content="If you mark an input as sensitive, the `is_expand` option of the input also must be true, which is the default setting."%}

    inputs:
      - certificate_urls: $BITRISE_CERTIFICATE_URL
        opts:
          title: "Certificate URL"
          is_sensitive: true

### Using Env Vars as input values

As noted earlier, it is possible to use Environment Variables as the value of any given input. By default, the Step will expand the Env Var and pass its value to the Step execution. This is defined by the `is_expand` option of the `opts` property.

    - project_path: $BITRISE_PROJECT_PATH
      opts:
        is_expand: true

The `is_expand` option can have two values: true or false. If set to `true` - this is the default behavior -, the value of `$BITRISE_PROJECT_PATH` will be passed to Step execution. If set to `false`, the string `$BITRISE_PROJECT_PATH` will be passed (and this particular Step will fail as it will not find the project location).

{% include message_box.html type="warning" title="Env Vars in Step code" content="Do not use Environment Variables directly in your Step's code. Instead, expose every outside variable as an input of your Step and set the default value of that input to the Environment Variable you want to use. This way it's easier to test the Step and the user of the Step can easily declare these inputs, without having to scour through code for the required variable.  
"%}

### Grouping inputs together

The category option is used to group inputs together. Inputs belonging to the same category are displayed together and collapsed by default in the Workflow Editor.

    - default_certificate_passphrase: $BITRISE_DEFAULT_CERTIFICATE_PASSPHRASE
      opts:
        category: Default code signing files
        description: |
          Certificate passphrase of the default certificate.
        is_sensitive: true
        title: Default certificate passphrase

In this case, this input will appear with all the other inputs that have the same category set.

Categories may be used if the Step has more than six inputs. The suggested maximum number of inputs in a group or in the root is six.

Please keep in mind, when designing Step categories, that:

* Required inputs should not be grouped!
* Grouped inputs should be displayed after non-categorised inputs.

### Accepting a list of values for inputs

It is absolutely possible to accept a list of values for a given input. If you wish to do so, we strongly recommend adding a list suffix to the key of the input (for example, `input_path_list`), and expect the values to be provided as a newline character (\\n) separated list (for example, first value\\nsecond value).

Please use this solution unless you really need to use another character for separating values. Based on our experience, the newline character (\\n) works really well as a universal separator character, as it's quite rare in input values (compared to ,, ;, = or other more common separator characters).

As a best practice, you should filter out empty items. Use either:

    first value\n\nsecond value

or

    first value\n       \nsecond value

## Step outputs

Steps can generate outputs which can then be used in other Steps as inputs. That means that if a Step generates an artifact, the path to that artifact can be the input of another Step in the build. For example, the **Xcode Archive & Export for iOS** Step exposes the `$BITRISE_API_PATH` output which can then be used as an input value for the **Deploy to iTunesConnect** Step.

Outputs are also defined in the `step.yml` file, under the outputs property. They have the same structure as inputs: they consist of a key and value pair. An output's key can be used as an input value in a subsequent Step, just as Environment Variables exposed by [bitrise.io](http://bitrise.io) or the Bitrise CLI can be.

### Step output Keys and values

For output keys, use upper case [snake case](https://en.wikipedia.org/wiki/Snake_case) style output keys, for example: OUTPUT_PATH.

### Naming and describing Step outputs

Unlike in the case of Step inputs, the title and description of Step outputs do not appear on the Workflow Editor. Only the summary is visible. That does not mean you should not provide a title and a description: these help others understand your Step.

* `title`: It should be a short and descriptive sentence or half sentence: Generated IPA path.
* `summary`: It is the short version of the description, which provides a quick overview of the input. On the Bitrise Workflow Editor, the summary of the is presented by default when you view a Step.
* `description`: It is the user facing description of the Step input: this should provide a deeper, more detailed explanation of the input.

### Outputs with list of values

It is absolutely possible to provide a list of values for a given output. If you wish to do so, we strongly recommend adding a LIST suffix to the key of the output (for example, `BITRISE_APK_PATH_LIST`), and expect the values to be provided as a newline character (\\n) separated list (for example, first value\\nsecond value).

Please use this solution unless you really need to use another character for separating values. Based on our experience, the newline character (\\n) works really well as a universal separator character, as it's quite rare in input values (compared to ,, ;, = or other more common separator characters).

## Setting conditions for running the Step

There are three properties that define whether a Step is run in a given Workflow or not: is_always_run, `is_skippable` and run_if. All of these properties can be set in the `step.yml` file to govern the default behavior of the Step, or set in a given app's bitrise.yml file on a case-by-case basis.

`is_always_run`: By default, Steps do not run if a previous Step in the Workflow failed. However, if the `is_always_run` property is set to `true`, the Step runs regardless of the status of previous Steps in the Workflow. This can be very useful, for example, in the case of Steps that can send notifications about the build: they can send notifications about failed builds.

`is_skippable`: As mentioned above, Steps do not run if a previous Step in the Workflow failed. However, if a Step's `is_skippable` property is set to `true`, the build will not fail and subsequent Steps will run even if that particular Step fails. A good example is the **Cache:Pull** Step: if an app has no build cache to pull from, the Step will fail but that is no reason to fail the build.

`run_if`: If you want to make Step execution dependent on a certain condition, use the `run_if` property to define the run condition. For example, you can configure a Step so that it only runs in a CI environment. Read more in our [Enabling or disabling a Step conditionally](/steps-and-workflows/disable-a-step-by-condition/) guide about the possible use cases.

## Submodules and step dependencies

Do not use submodules, or require any other resource downloaded on-demand in your Step! Try to include everything required for your Step in the Step's repository. Otherwise you can run into problems if, say, the Step fails to download a resource because of a network error or some authorization problem. In the case of submodules, you should include the content of the other repository instead of using it as a submodule of your Step's repository.

You can, however, declare dependencies that you can fetch from an OS dependency manager, such as apt-get or brew. A Step dependency is installed by the Bitrise CLI if it is not available in the `PATH` Environment Variable.

As Steps can be run in any environment where the Bitrise CLI can run, list every used dependency, even if you know that they are pre-installed on the Bitrise stacks. Unused dependencies (for example, git and wget added as a sample by default) waste build time.

Step dependencies should not include toolkit dependencies, as the Bitrise CLI will take care of installing those automatically. A Step written in golang should not list go as a dependency if the Step uses the Go Bitrise CLI toolkit.

The Bitrise CLI can install Step dependencies available in the Homebrew package manager:

    deps:
      brew:
      - name: cmake

It can install apt-get dependencies available in the sources listed in the sources.list file on the host machine:

    deps:
      apt_get:
      - name: cmake

Steps can define dependencies which need to be available on the host machine but cannot be installed in an easy way (like using a single brew or apt-get command). These dependencies are defined with the `check_only` property:

    deps:
      check_only:
      - name: xcode

Currently, the only supported `check_only` dependency is `xcode`.

Other dependencies need to be installed and checked while the step is running or using other steps.

## Adding a Step icon

You can add a Step icon to your Step: you will see it in the Workflow Editor and on our [Integrations](https://www.bitrise.io/integrations/) page. If you want to, there are some requirements:

* Its background color should not be transparent.
* Size: 256x256 px.
* Margin: 60 px.
* Format: SVG.

{% include message_box.html type="important" title="Verified Steps" content="Please note that if you wish to submit a Step for verification so that it becomes a [Verified Step](/contributors/verified-steps/), you must add a Step icon."%}

To submit your Step’s icon:

1. Add the .svg file into your StepLib fork repo at: STEPLIB_FORK_ROOT/steps/YOUR_STEP_ID/assets/icon.svg.
2. Create a new pull request to the [StepLib repository](https://github.com/bitrise-io/bitrise-steplib).