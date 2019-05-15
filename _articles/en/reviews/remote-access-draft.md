---
title: 'Remote access draft '
redirect_from: []
date: '2019-04-02T07:09:34.000+00:00'
published: false

---
Remote access allows users to connect to their build's virtual machines via SSH or a screenshare app. A failed build can be rebuilt with remote access enabled to make troubleshooting a lot easier - for example, if the build logs don't provide enough information about the error.

Rebuild a finished build with remote access enabled and follow the instructions to access the build machine during the build.

{% include message_box.html type="important" title="Authorization" content="Users who have the `Testers/QA` roles on the app are NOT be able to use remote access."%}

There are two ways to use remote access on our build machines:

* **SSH**: this is available for both Linux/Docker based and MacOS machines.
* **Screenshare**: this is only available for MacOS machines.

With either method, you can access the build machine remotely during the build and for 10 minutes after the build is finished.

### Remote access with SSH

1. Go to the build page.
2. Click the `Rebuild with Remote Access` option.
3. Click `Remote Access Instructions`.
4. Under the `SSH` option, find the command you will need.
5. Open a command line interface.
6. Run the command found under `SSH`:

       ssh user:password@access.bitrise.io -p 13377

And done! You should now be able to access the virtual machine where your build is running.

### Remote access with screenshare

1. Go to the build page.
2. Click the `Rebuild with Remote Access` option.
3. Click `Remote Access Instructions`.
4. Under the `Screenshare` option, find the required information:
   * Address
   * Username
   * Password
5. Open a screenshare application.
6. Fill out the required fields with the information from under the `Screenshare` option.

And done! You should now be able to access the virtual machine where your build is running.