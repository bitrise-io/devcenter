---
changelog: ''
last_modified_at: 
title: Remote access
redirect_from: []
new_article: false
tag: []
summary: ''
menu:
  builds-main:
    weight: 34

---
{% include not_translated_yet.html %}

Remote access allows users to connect to their build's virtual machines via SSH or a screenshare app. A failed build can be rebuilt with remote access enabled to make troubleshooting a lot easier - for example, if the build logs don't provide enough information about the error.

{% include message_box.html type="important" title="Authorization" content="Users who have the **Testers/QA** roles on the app CANNOT use remote access."%}

There are two ways to use remote access on our build machines:

* **SSH**: this is available for both Linux/Docker based and MacOS machines.
* **Screenshare**: this is only available for MacOS machines.

With either method, you can access the build machine remotely during the build and for 10 minutes after the build is finished.

## Remote access with SSH

1. Go to the build page.
2. Click the **Rebuild with Remote Access** option.
3. Click **Remote Access Instructions**.

   ![](/img/remote-access-instructions.png)
4. Under the **SSH** option, find and copy the command you will need.
5. Open a command line interface.
6. Run the command found under **SSH** (the below is an example):

       ssh -o StrictHostKeyChecking=no vagrant@1.tcp.ngrok.io -p 000000
7. Copy and paste the password from the **Remote Access Instructions** page.

And done! You should be able to access the virtual machine where your build is running.

## Remote access with screenshare

1. Go to the build page.
2. Click the **Rebuild with Remote Access** option.
3. Click **SSH**.

   ![](/img/remote-access-instructions.png)
4. Under the **SSH** option, find the required information:
   * Address
   * Username
   * Password
5. Open a screenshare application.
6. Fill out the required fields with the information from under the **Screenshare** option.

## Extending the availability of remote access

Remote access is available while the build is running and for 10 minutes after the build is finished. If this is not enough, there’s a simple workaround to make sure remote access is available for a longer time.

1. Add a **Script** Step after the Step that causes the build to fail.
2. Toggle the **Run if previous Step failed** option on to ensure the **Script** Step always runs.
3. Add a command to let the build “sleep” for a time specified in seconds:

   `1 sleep 5400`

   This example lets the build run for 90 minutes. It should be no more than your build time limit, of course.

That’s it. While the build is still running, you can look around on the virtual machine for the possible issues that caused it to fail.

And done! You should now be able to access the virtual machine where your build is running.