---
title: Using the Generic File Storage
menu:
  tutorials:
    weight: 6

---
## Uploading files to GENERIC FILE STORAGE on [bitrise.io](https://www.bitrise.io)

1. Open your app on [bitrise.io](https://www.bitrise.io)
2. Go to `Workflow` tab and open the `Workflow Editor`
3. On the left side of the `Workflow Editor` select `Code Signing`
4. Scroll down to `Generic File Storage` section.
5. Enter your unique ID before dropping your file into the `Upload file` field.

{% include message_box.html type="info" title="Env Var for the download URL" content="Bitrise will upload your file and assign an environment variable to the file's download url. A **time limited, read only download URL** will be set as the value of this Environment Variable for every build. You can use this URL to download the file during a build."%}

## Using the files uploaded to GENERIC FILE STORAGE on [bitrise.io](https://www.bitrise.io)

There are two ways to use the uploaded files.

* Refer to the read-only download URL with the environment variable you defined when uploading. Some Steps support this option - you can just use the Env Var as an input value directly.
* Use the `File Downloader` or `Script` Step to download the file and, optionally, export the downloaded file as an environment variable. This works with Steps that require local file paths and as such do not support URLs directly as the input value.

For example, the `Decrypt file` Step supports using the download URL generated when uploading the file. You just need to insert the variable as the value to the `Encrypted file path` input.

For using the `File Downloader` Step or the `Script` Step, check out our examples:

* [Downloading a file using the File Downloader Step](/tutorials/how-to-use-the-generic-file-storage/#downloading-a-file-using-the-file-downloader-step)
* [Downloading and exporting a file using a Script Step](/tutorials/how-to-use-the-generic-file-storage/#downloading-and-exporting-a-file-using-a-script-step)

### Downloading a file using the `File Downloader` step

Assuming the file's `GENERIC FILE STORAGE` url is assigned to `BITRISEIO_MY_FILE_ID_URL`, the Step would look like:

    ...
    - file-downloader:
        inputs:
        - source: "$BITRISEIO_MY_FILE_ID_URL"
        - destination: "$BITRISE_SOURCE_DIR/path/to/store/the/file"
    ...

You can set the location as an `App Env Var` instead of specifying it
directly for the `destination` input. That way you can refer the file
through the environment variable in other steps, you won't have to
specify the path every time.

For example, if you specify the `BITRISEIO_MY_FILE_LOCAL_PATH` as an `App Env Var`,
you can use it as the download destination:

    ...
    - file-downloader:
        inputs:
        - source: "$BITRISEIO_MY_FILE_ID_URL"
        - destination: "$BITRISEIO_MY_FILE_LOCAL_PATH"
    ...

Then in subsequent steps, you can use the same `$BITRISEIO_MY_FILE_LOCAL_PATH` env var as the file path.

### Downloading a file and exporting the file's path using a `Script` step

Assuming the file's `GENERIC FILE STORAGE` url is assigned to `BITRISEIO_MY_FILE_ID_URL`, the script step would look like this:

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

In subsequent steps, you can refer to the downloaded file's path with_ `$BITRISEIO_MY_FILE_LOCAL_PATH`.

Alternatively, for example, you can set the location as an `App Env Var` and simply download it to that path instead of defining the path inside the Script.