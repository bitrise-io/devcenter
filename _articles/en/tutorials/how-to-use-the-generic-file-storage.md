---
title: Using the Generic File Storage
menu:
  tutorials-main:
    weight: 12

---
## Uploading files to GENERIC FILE STORAGE on [bitrise.io](https://www.bitrise.io)

1. Open your app on [bitrise.io](https://www.bitrise.io).
2. Go to the **Workflow** tab to open the **Workflow Editor.**
3. Click the **Code Signing** tab.
4. Scroll down to **GENERIC FILE STORAGE**.
5. Enter your unique ID in the **File Storage ID** field before uploading a file.

{% include message_box.html type="info" title="Environment Variable for the download URL" content="Bitrise will upload your file and assign an Environment Variable (Env Var) to the file's download URL. A time limited, read only download URL will be set as the value of this Env Var for every build. You can use this URL to download the file during a build."%}

### Protecting the uploaded files in GENERIC FILE STORAGE

Once you uploaded a file to **GENERIC FILE STORAGE**, you can set your uploaded files to Protected mode. This means that no one can download or reveal the file from your account but your builds can still use them. Once you click **Make protected**, Bitrise will handle the Env Var attached to your uploaded files as [secret Env Var](/builds/env-vars-secret-env-vars/).

1. Click the horizontal ellipsis button and select **Make protected**.

   ![](/img/genericfileprotected.jpg)
2. Click **Make it protected** in the pop-up window.

Note that since the file is now protected, you can only overwrite it if you delete the it and upload a new one again.

## Using the files uploaded to GENERIC FILE STORAGE

There are two ways to use the uploaded files:

* Referring to the read-only download URL with the Env Var you defined when uploading. Some Steps support this option - you can just use the Env Var as an input value directly.
* Using the **File Downloader**, **Generic File Storage** or **Script** Step to download the file and, optionally, export the downloaded file or directory path as an Env Var. This works with Steps that require local file paths and as such do not support URLs directly as the input value.

For example, the **Decrypt file** Step supports using the download URL generated when uploading the file. You just need to insert the variable as the value to the **Encrypted file path** input.

For using the **File Downloader** Step or the **Script** Step, check out our examples:

* [Downloading a file using the File Downloader Step](/tutorials/how-to-use-the-generic-file-storage/#downloading-a-file-using-the-file-downloader-step)
* [Downloading and exporting a file using a Script Step](/tutorials/how-to-use-the-generic-file-storage/#downloading-and-exporting-a-file-using-a-script-step)

### Downloading a file using the File Downloader Step

Assuming the file's `GENERIC FILE STORAGE` URL is assigned to `BITRISEIO_MY_FILE_ID_URL`, the Step would look like:

    ...
    - file-downloader:
        inputs:
        - source: "$BITRISEIO_MY_FILE_ID_URL"
        - destination: "$BITRISE_SOURCE_DIR/path/to/store/the/file"
    ...

You can set the location as an `App Env Var` instead of specifying it
directly for the `destination` input. That way you can refer the file through the Env Var in other Steps, you won't have to specify the path every time.

For example, if you specify the `BITRISEIO_MY_FILE_LOCAL_PATH` as an `App Env Var`,
you can use it as the download destination:

    ...
    - file-downloader:
        inputs:
        - source: "$BITRISEIO_MY_FILE_ID_URL"
        - destination: "$BITRISEIO_MY_FILE_LOCAL_PATH"
    ...

Then in subsequent Steps, you can use the same `$BITRISEIO_MY_FILE_LOCAL_PATH` Env Var as the file path.

### Downloading a file and exporting the file's path using a Script Step

Assuming the file's `GENERIC FILE STORAGE` URL is assigned to `BITRISEIO_MY_FILE_ID_URL`, the **Script** Step would look like this:

    - script:
        inputs:
        - content: |
            #!/bin/bash
            set -ex
    
            # specify local download path
            file_local_path=download/path/to/my/file
    
            # download the file
            wget -O "$file_local_path" "$BITRISEIO_MY_FILE_ID_URL"
            echo "file downloaded to: $file_local_path"
    
            # OPTIONALLY: export the file's local path, to be able to use it in subsequent steps as an input value
            envman add --key BITRISEIO_MY_FILE_LOCAL_PATH --value "$file_local_path"

In subsequent Steps, you can refer to the downloaded file's path with `$BITRISEIO_MY_FILE_LOCAL_PATH`.

Alternatively, for example, you can set the location as an `App Env Var` and simply download it to that path instead of defining the path inside the Script Step.

{% include banner.html banner_text="Upload files to Generic File Storage" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}