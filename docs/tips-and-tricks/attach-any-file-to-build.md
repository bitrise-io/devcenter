For this example we'll attach the OS X `system.log` to the Build as an Artifact, but this works for any file, even for ones that you generate during the build, you just have to replace the example path we use (`/var/log/system.log`) with the path you want to deploy. You can of course use Environment Variables in the path too, like `$HOME/`.

*Deployed Artifacts appear on the Build's page, in the Artifacts & Apps section, and anyone who has access to the Build page can download it from there.*

To do this:

* Add a new [Deploy to Bitrise.io](https://github.com/bitrise-io/steps-deploy-to-bitrise-io) step to your workflow, to any point you want to (can be the very last step in the workflow, but of course if you want to deploy a file which is generated during the build you should add the step **after** the file is generated and available).
* Change the `Deploy directory or file path` input of the Step to: `/var/log/system.log`

A YAML configuration example of the step & input:

```
    - deploy-to-bitrise-io@1.2.3:
        inputs:
        - deploy_path: "/var/log/system.log"
```

That's all, your next build will attach the OS X system log file
to your build - you'll see it at the top of the Build's page.

!!! note "By default the **Deploy to Bitrise.io** will always run"
    By default the `Deploy to Bitrise.io` will always run,
    even if a previous step fails, so you can deploy failed step/tool logs too.
