---
# jp title missing
title: Attach any file as an Artifact to the Build
menu:
  tips-and-tricks:
    weight: 4

---

{% include not_translated_yet.html %}

For this example we'll attach the OS X `system.log` to the Build as an Artifact,
but this works for any file, even for ones that you generate during the build,
you just have to replace the example path we use (`/var/log/system.log`) with the path you want to deploy.
You can of course use Environment Variables in the path too, like `$HOME/`.

_Deployed Artifacts appear on the Build's page, in the Artifacts & Apps section,
and anyone who has access to the Build page can download it from there._

To do this:

* Add a new [Deploy to Bitrise.io](https://github.com/bitrise-io/steps-deploy-to-bitrise-io) step to your workflow, to any point you want to (can be the very last step in the workflow, but of course if you want to deploy a file which is generated during the build you should add the step **after** the file is generated and available).
* Change the `Deploy directory or file path` input of the Step to: `/var/log/system.log`

A YAML configuration example of the step & input:

        - deploy-to-bitrise-io:
            inputs:
            - deploy_path: "/var/log/system.log"

That's all, your next build will attach the OS X system log file
to your build - you'll see it at the top of the Build's page.

{% include message_box.html type="note" title="By default the **Deploy to Bitrise.io** will always run" content="
By default the `Deploy to Bitrise.io` will always run, even if a previous step fails, **so you can deploy failed step/tool logs too.**
"%}

## Deploy a directory

The `Deploy to Bitrise.io` step accepts both file and directory path as its input,
but by default **it does not deploy files recursively**, from sub directories
if you specify a directory as it's `deploy_path` input.

If you want to do that and deploy the whole directory with every sub directory
and the files in the sub directories, you have to enable the "Compress" option of the step.

In this mode the step will compress (zip) the whole directory, and deploy
the compressed file, instead of deploying files one by one.

An example configuration:

        - deploy-to-bitrise-io:
            inputs:
            - deploy_path: /deploy/this/directory/recursively
            - is_compress: 'true'

_Note: as every input's,_ `is_compress`_'s value have to be a **string**, that's why_ `_true_` _is surrounded with quotes._

{% include message_box.html type="note" title="Using more than one `Deploy to Bitrise.io` step" content=" You can use as many `Deploy to Bitrise.io` steps as you want to, even in a single build / workflow. Alternatively of course you can move all the files you want to deploy into a single directory, and deploy that directory with the step, it's up to you to decide which solution works best for you."%}
