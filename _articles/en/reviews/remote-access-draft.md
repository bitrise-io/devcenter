---
title: 'Remote access draft '
redirect_from: []
date: 2019-04-02 07:09:34 +0000
published: false

---
Remote access allows users to connect to their build's virtual machines via SSH or a screenshare app. A failed build can be rebuilt with remote access enabled to make troubleshooting a lot easier - for example, if the build logs don't provide enough information about the error.

To take advantage, all you need to do is rebuild a build with remote access enabled and follow the instructions to access the build machine during the build. 

{% include message_box.html type="important" title="Authorization" content="Users who have the `Testers/QA` roles on the app are NOT be able to use remote access."%} 

### Remote access with SSH

1. Go to the build page.
2. Click the `Rebuild with Remote Access` option.
3. Open a command line interface.
4. Run the command found under `SSH`:

       ssh user:password@access.bitrise.io -p 13377

And done! You should now be able to access the virtual machine where your build is running. 

### Remote access with screenshare 

1. Go to the build page.
2. Click the `Rebuild with Remote Access` option.
3. Open a screen share application. 
4. Fill out the requested fields of 