---
title: Creating and sharing your own Step
menu:
  bitrise-cli:
    weight: 16

---
Creating your own Step is as simple as running a `bitrise` CLI (v1.6.1+) command and following the guide it prints. You can generate Steps using either the Bash or Go toolkits.

If you don't have the Bitrise CLI installed, check the installation guide [here](/bitrise-cli/installation/).

{% include message_box.html type="important" title="Use the latest Bitrise CLI!" content=" Make sure you have the latest version of the Bitrise CLI, or at the very least, you have version 1.6.1 or higher. Call `bitrise --version` to check your Bitrise CLI version. This is important because the CLI uses the `:step` plugin to create Steps and this plugin was introduced as a core plugin in v1.6.1."%}

## Creating the Step

Once the Bitrise CLI is installed, create your own Step with three simple commands.

    # If this is the very first time you use the CLI / if you just installed the CLI run this:
    bitrise setup
    
    # If you want to update the Step plugin to the latest version:
    bitrise plugin update step
    
    # And to generate a new Step, simply run this command and follow the guide it prints:
    bitrise :step create

Running `bitrise :step` without any commands will print the plugin's help.

Once you are done, you should have a `step.yml` and, depending on whether you chose Go or Bash, a `main.go` or a `step.sh` file in your new Step's repository.

* The `step.yml` file is the Step interface definition, containing dependencies, Step inputs and Step outputs as well as other step properties.
* `main.go` or `step.sh` contains the actual functionality of the Step. **DO NOT CHANGE the working directory!**

The generated Step's README describes:

* how you can run your Step locally, before you even commit the code,
* how you can test and use your Step in any build by using [the ](/bitrise-cli/steps/#special-Step-sources)`[git::](/bitrise-cli/steps/#special-Step-sources)`[ Step reference](/bitrise-cli/steps/#special-Step-sources),
* how you can share your Step with others through the Bitrise StepLib if you wish to do so.

{% include message_box.html type="important" title="Before proceeding with step configuration" content=" Check out [some important concepts you must be aware of](/bitrise-cli/most-important-concepts/)! "%}

## Step development guidelines

A newly created Step is a 'skeleton': in the `step.yml` file, certain properties are assigned default values and example inputs and outputs are created to show the structure of these.

Many step properties are automatically generated - for example, when sharing the Step - while other properties should be set manually if they are required. When creating a new Step with the plugin, only the `project_type_tags` property does not get filled with some value by default but of course you can manually modify all properties in the `step.yml` file.

Step inputs and outputs are also Step properties. For more information, see [Step properties](/bitrise-cli/step-properties), [Step inputs](/bitrise-cli/step-inputs), [Step outputs](/bitrise-cli/step-outputs).

### Naming conventions: versioning, Step ID, step inputs and outputs

* You should use [semantic versioning](https://semver.org/) (MAJOR.MINOR.PATCH) for your Step. For example, `1.2.3`.
* For Step IDs, use hyphens as separator if the ID contains multiple words. For example, `set-ios-bundle-identifier`.
* For inputs, use **lower** case [snake case](https://en.wikipedia.org/wiki/Snake_case) style input IDs. For example, `input_path`.
* If your step input should accept a list of values, postfix the input ID with `_list` (for example, `input_path_list`). We strongly recommend using the pipe character as a separator (for example, `first value|second value`).
* For outputs, use **upper** case [snake case](https://en.wikipedia.org/wiki/Snake_case) style output IDs. For example, `OUTPUT_PATH`.
* If an output should be able to provide a list of values, postfix the input ID with `_LIST` (for example, `OUTPUT_PATH_LIST`). We strongly recommend using the pipe character as a separator (for example, `first value|second value`).
* Filter out empty items! For example, `first value| |second value` should be treated exactly the same way as `first value|second value`.

### Environment variables in Steps

**Do not use Environment Variables directly in your Step's code**. Instead, expose every outside variable as an input of your Step and set the default value of that input to the Environment Variable you want to use. You can do this in the `step.yml` file. This way it's easier to test the Step and the user of the Step can easily declare these inputs, without having to scour through code for the required variable.

**Example**:

The `xcode-archive` Step generates an output Environment Variable `$BITRISE_IPA_PATH`. Create an input for this in your Step:

```yaml
inputs:
  - ipa-path: $BITRISE_IPA_PATH
    opts:
      title: "IPA path"
```

### Secret environment variables in Steps

You can mark Step inputs as **Sensitive** to make sure their values do not get exposed. Sensitive inputs only accept [Secrets](/bitrise-cli/secrets/) - secret environment variables - as values. This ensures they are not visible in build logs.

To mark a Step input as sensitive, use the `is_sensitive` property. It has two values: `true` and `false`.

{% include message_box.html type="important" title="The `is_expand` property" content="If you mark an input as sensitive, the `is_expand` property of the input also must be `true` (which is the default setting)!"%}

```yaml
inputs:
  - certificate_urls: $BITRISE_CERTIFICATE_URL
    opts:
      title: "Certificate URL"
      is_sensitive: true
```

### Submodules and dependencies

**Do not use submodules, or require any other resource downloaded on-demand in your Step**. Try to include everything required for your Step in the Step's repository. Otherwise you can run into problems if, say, the Step fails to download a resource because of a network error or some authorization problem.

In the case of submodules, you should include the content of the other repository instead of using it as a submodule of your Step's repository.

You can, however, declare dependencies that you can fetch from an OS dependency manager, such as `apt-get` or `brew`. For more information on declaring dependencies, see [Step properties](/bitrise-cli/step-properties).

If you have any questions visit our [community discussion site](https://discuss.bitrise.io/) or [contact us](https://www.bitrise.io/contact)!

**Need some inspiration for a new Step idea?** Look no further, we have a list! [This way please](https://discuss.bitrise.io/search?q=tags%3Acontrib-this-feature%20tag%3AStep) :)

## Sharing a new Step

If you wish to share your newly created Step with the wider world, that's great - and simple!

We recommend you start with the command `bitrise share`. This will print you a guide on sharing steps - all you need to do is follow! But we'll summarize the most important things here as well, if you wish to look at the process before even firing up a command line interface.

1. Make sure your Step is stored in a public git repository.
2. Fork the StepLib repository you want to have your step in. The official Bitrise StepLib can be found here: [https://github.com/bitrise-io/bitrise-steplib](https://github.com/bitrise-io/bitrise-steplib "https://github.com/bitrise-io/bitrise-steplib")
3. Call `$ bitrise share start -c ``[https://github.com/](https://github.com/ "https://github.com/")``[your-username]/bitrise-steplib.git`, with the git clone URL of your forked StepLib repository. This will prepare your forked StepLib locally for sharing.
4. Add the step version tag to your Step's repository.
5. Call `$ bitrise share create --tag [step-version-tag] --git [step-git-uri].git --stepid [step-id]`, to add your Step to your forked StepLib repository (locally).
6. You can call `$ bitrise audit -c ``[https://github.com/](https://github.com/ "https://github.com/")``[your-username]/bitrise-steplib.git` to perform a complete health-check on your forked StepLib.
7. Create a Pull Request in the original StepLib repository.

And that's it, you are done! Once your PR is merged, your step will be available to everyone who uses the StepLib repository you chose.