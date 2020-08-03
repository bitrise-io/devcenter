---
title: HipChat message with build status and details
menu:
  tutorials-main:
    weight: 18

---
You can send [HipChat](https://www.hipchat.com/) messages during your build.

You can, for example, send a HipChat message with the build's [bitrise.io](https://www.bitrise.io) URL,
the build's status (at the point where you include the **Send HipChat message** Step - usually it's best to
make it the very last step of the Workflow) and with the Public Install Page for the app.

To do this all you have to do is:

1. Add a **Send HipChat message** Step to your app's Workflow, after the **Deploy to Bitrise.io** Step.
2. Fill out the required input fields.
3. In the **Message** input field you can include Environment Variables (Env Vars)
   defined by Bitrise and by the Steps which run before the **HipChat Message** Step.

{% include message_box.html type="note" title="How to insert Env Vars in Step inputs" content=" If you click into any Step input field, an **Insert Variable** button will appear. With this you can insert Env Vars defined by Bitrise (for example, the app title, the build's unique ID or the build's URL on Bitrise) and Env Vars exported by Steps which ran before this Step (for example, an Xcode build's status or the generated IPA path). "%}

Fill out the **Send HipChat message** Step required input fields, include the build's URL with the `$BITRISE_BUILD_URL` Env Var in the **Message** input, the build's status at that point with the `$BITRISE_BUILD_STATUS` variable, and the related Public Install Page URL with `$BITRISE_PUBLIC_INSTALL_PAGE_URL`.

An example **Message** input:

    Your build's details can be found at: $BITRISE_BUILD_URL,
    and the Public Install page at: $BITRISE_PUBLIC_INSTALL_PAGE_URL
    
    Build status: $BITRISE_BUILD_STATUS

That's all. Once you configure your Workflow this way and start a new build, you'll be notified about the build and deploy on HipChat,
including both the build's details URL and the app's Public Install Page URL.

{% include banner.html banner_text="Send HipChat messages" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}