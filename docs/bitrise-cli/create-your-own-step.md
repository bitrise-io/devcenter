Creating your own Step is as simple as running a `bitrise` CLI (v1.6.1+) command and following the guide it prints.

**Please make sure that you have at least v1.6.1 of the CLI installed on your Mac/Linux, the step plugin was introduced as a core plugin in that version (related announcement post: [https://discuss.bitrise.io/t/monthly-release-of-bitrise-cli-tools-and-summary-of-updates-may-2017-cli-v1-6-1/1690](https://discuss.bitrise.io/t/monthly-release-of-bitrise-cli-tools-and-summary-of-updates-may-2017-cli-v1-6-1/1690)).**

* If you don't have the `bitrise` CLI installed you can find the installation guide [here](/bitrise-cli/installation/)
* You can find the `step` plugin's development discussion thread at [https://discuss.bitrise.io/t/step-create-plugin-quickly-generate-a-new-step/1609](https://discuss.bitrise.io/t/step-create-plugin-quickly-generate-a-new-step/1609)


Once you have the Bitrise CLI installed, to generate a new Bitrise Step all you have to do is:

``` bash
# If this is the very first time you use the CLI / if you just installed the CLI run this:
bitrise setup

# If you want to update the step plugin to the latest version:
bitrise plugin update step

# And to generate a new step simply run this command and follow the guide it prints:
bitrise :step create
```

The generated Step's README also describes how you can run your step locally,
before you'd even commit the code, as well as how you can test and use your step
in any build by using [the `git::` step reference](/bitrise-cli/steps/#special-step-sources), and finally (and optionally)
how you can share your step with others through the Bitrise StepLib.


If you'd have any questions visit our [community discussion site](https://discuss.bitrise.io/) or [contact us](https://www.bitrise.io/contact)!

**Need some inspiration for a new step idea?** Look no further, we have a list! [This way please](https://discuss.bitrise.io/search?q=tags%3Acontrib-this-feature%20tag%3Astep) :)
