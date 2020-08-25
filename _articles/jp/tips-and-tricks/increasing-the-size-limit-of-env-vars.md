---
changelog: 
last_modified_at: 
tag: []
title: Increasing the size limit of Env Vars
redirect_from: []
description: ''
menu:
  tips-and-tricks:
    weight: 24

---
{% include not_translated_yet.html %}

By default, Environment Variables (Env Vars) have a 20KB per-environment value size limit, and a 120KB total size limit. Hence you getting the following error when you try to add a value larger than 20KB:

    $ ruby -e 'puts "a"*40_000' | bitrise envman add --key TEST2
    WARN[07:37:46] environment value too large                  
    WARN[07:37:46] environment value size (39.0634765625 KB) - max allowed size: 20 KB 
    FATA[07:37:46] [ENVMAN] environment value too large - rejected 
    FATA[07:37:46] Command failed, error: exit status 1  

As you can see, this is a built-in limitation in our `envman` tool. The limitation exists because many tools, including bash, cannot work well with large variables. Therefore we recommend finding alternative solutions for storing large amounts of data instead of storing it as an Env Var.

However, if you absolutely must, you can increase the size limit by modifying the `envman` tool's config file.

{% include message_box.html type="note" title="Changing the limit locally" content="In the following example, we're showing how to change the size limit on Bitrise: that is, the procedure changes the size limit on the virtual machine that runs your build.

However, you can use the same command to set the size limit on your own machine. By default, the required config file should be stored at `~/.envman/configs.json`. If you changed it, add your own path to the command described in the procedure below."%}

To set the size limit in your build's virtual machines on Bitrise:

1. On [bitrise.io](www.bitrise.io), open your app.
2. Click on the **Workflow** tab to open the Workflow Editor.
3. Add a **Script** Step to the Workflow(s) you want to run.
4. Add the following command to the Step's `contents`:

       #!/usr/bin/env bash
       set -ex
       mkdir -p ~/.envman && echo -e '{"env_bytes_limit_in_kb": 40}' > ~/.envman/configs.json

   In this example, we increased the file size limit to 40KB but you can set any value you want - just be aware that certain tools might not be able to handle large Env Vars!