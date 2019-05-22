---
title: HipChat message with build status and details
menu:
  tutorials:
    weight: 9

---
You can send [HipChat](https://www.hipchat.com/) messages during your build.

You can, for example, send a `HipChat` message with the Build's [bitrise.io](https://www.bitrise.io) URL,
the build's status (at the point where you include the HipChat step - usually it's best to
make it the very last step of the Workflow) and with the Public Install Page for the app.

To do this all you have to do is:

1. add a `Send HipChat message` step to your app's Workflow, after the `Deploy to Bitrise.io step`,
2. fill out the required inputs (authentication token, the room's ID you want to send the message to,
   color of the message, ...),
3. and in the _Message_ input field you can include environment variables
   defined by Bitrise and by the steps which run before the HipChat Message step.

{% include message_box.html type="note" title="How to insert environment variables in Step inputs" content=" If you click into any Step input field, an **Insert Variable** button will appear. With this you can insert environment variables defined by Bitrise (for example the App's title, the Build's unique ID or the Build's URL on Bitrise) and environment variables exported by Steps which ran before this step (for example, an Xcode Build's status or the generated IPA path). "%}

Fill out the HipChat steps' required input fields, and for the HipChat Message
step's `Message` input include the build's url with the `$BITRISE_BUILD_URL` environment variable,
the build's status at that point with the `$BITRISE_BUILD_STATUS` variable,
and the related Public Install Page URL with `$BITRISE_PUBLIC_INSTALL_PAGE_URL`.

An example `Message` input:

    Your build's details can be found at: $BITRISE_BUILD_URL,
    and the Public Install page at: $BITRISE_PUBLIC_INSTALL_PAGE_URL
    
    Build status: $BITRISE_BUILD_STATUS

That's all. Once you configure your Workflow this way and start a new build,
you'll be notified about the build and deploy on HipChat,
including both the build's details url and the app's Public Install Page url.