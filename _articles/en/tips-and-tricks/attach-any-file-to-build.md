---
title: Attaching files as artifacts to a build
menu:
  tips-and-tricks:
    weight: 10

---
You can attach any file to a build as an artifact with Bitrise, even files that you generate during the build. Deployed Artifacts appear on the Build's page, in the `Artifacts & Apps` section, and anyone who has access to the Build page can download it from there.

We'll go through an example of how to do this.

1. Add a `Deploy to Bitrise.io` Step to your workflow.

   If you want to attach a file you generated during the build, add this Step after the Step that generates the file or makes it available. Otherwise it can be at any point.
2. Change the `Deploy directory or file path` input of the Step to the path of the file you want to deploy.
   An example in yaml format:

   ```yaml
   - deploy-to-bitrise-io:
      inputs:
      - deploy_path: "/var/log/system.log"
   ```
3. Run your build.

That's it! Your next build will attach your file - in our example, the OS X system log file - to your build and you will see on the Build's page.

{% include message_box.html type="note" title="By default the **Deploy to Bitrise.io** Step will always run" content=" By default the `Deploy to Bitrise.io` Step will always run, even if a previous step fails, **so you can deploy failed Step/tool logs too.** "%}

### Deploying to a directory

The `Deploy to Bitrise.io` Step accepts both file and directory paths as its input, but by default **it does not deploy files recursively**, from sub directories if you specify a directory as its `deploy_path` input.

If you want to do that and deploy the whole directory with every sub directory and the files in the sub directories, you have to enable the "Compress" option of the Step.

In this mode the Step will compress (zip) the whole directory, and deploy the compressed file, instead of deploying files one by one.

An example configuration:

        - deploy-to-bitrise-io:
            inputs:
            - deploy_path: /deploy/this/directory/recursively
            - is_compress: 'true'

{% include message_box.html type="note" title="Make sure input values are in the correct format!" content="All input values have to be strings. This is why `is_compress`'s value - `true` - is surrounded with quotes."%}

{% include message_box.html type="note" title="Using more than one `Deploy to Bitrise.io` Step" content=" You can use as many `Deploy to Bitrise.io` Steps as you want to, even in a single build or workflow. Alternatively, you can move all the files you want to deploy into a single directory, and deploy that directory with the Step."%}

{% include banner.html banner_text="Attach artifacts to your build" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}