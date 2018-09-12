---
title: How to use the Generic File Storage
menu:
  tutorials:
    weight: 6

---
## How to upload files to GENERIC FILE STORAGE on [bitrise.io](https://www.bitrise.io)?

- Open your app on [bitrise.io](https://www.bitrise.io)
- Go to `Workflow` tab and open the `Workflow Editor`
- On the left side of the `Workflow Editor` select `Code Signing `
- Scroll down to `Generic File Storage` section.
- Enter your unique ID before dropping your file into the `Upload file` field.

!!! note
    Bitrise will upload your file and assign an environment variable (`BITRISEIO_[the ID you specify]_URL`)
    to the file's download url. A __time limited, read only download URL__ will
    be set as the value of this Environment Variable
    for every build. You can use this URL to download the file during a build._

## How to use files uploaded to GENERIC FILE STORAGE on [bitrise.io](https://www.bitrise.io)?

You can refer the file's read-only download url with the environment variable (`BITRISEIO_[the ID you specify]_URL`) you defined when uploading.

Some steps have built-in support for downloading the file from a specified URL.
These steps can use `BITRISEIO_[the ID you specify]_URL` as input value directly.
*Example: the `certificate-and-profile-installer` step's `certificate_url`
[input](https://github.com/bitrise-io/steps-certificate-and-profile-installer/blob/master/step.yml#L24).*

Other steps might require local file paths, and don't support URLs directly as the input value.
If that's the case, you can use the `File Downloader` or
the generic `Script` step to download your file, and (optionally) export the downloaded file's path as an environment variable.


### Example to download a file using the `File Downloader` step

Assuming the file's `GENERIC FILE STORAGE` url is assigned to `BITRISEIO_MY_FILE_ID_URL`, the script step would look like:

```
...
- file-downloader:
    inputs:
    - source: "$BITRISEIO_MY_FILE_ID_URL"
    - destination: "$BITRISE_SOURCE_DIR/path/to/store/the/file"
...
```

You can set the location as an `App Env Var` instead of specifying it
directly for the `destination` input. That way you can refer the file
through the environment variable in other steps, you won't have to
specify the path every time.

For example, if you specify the `BITRISEIO_MY_FILE_LOCAL_PATH` as an `App Env Var`,
you can use it as the download destination:

```
...
- file-downloader:
    inputs:
    - source: "$BITRISEIO_MY_FILE_ID_URL"
    - destination: "$BITRISEIO_MY_FILE_LOCAL_PATH"
...
```

Then in subsequent steps, you can use the same `$BITRISEIO_MY_FILE_LOCAL_PATH` env var
as the file path.


### Example to download a file and export the file's path, using a `Script` step

Assuming the file's `GENERIC FILE STORAGE` url is assigned to `BITRISEIO_MY_FILE_ID_URL`, the script step would look like this:

```
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
```

*In subsequent steps, you can refer to the downloaded file's path with `$BITRISEIO_MY_FILE_LOCAL_PATH`.
Alternatively, for example, you can set the location as an `App Env Var` and
simply download it to that path instead of defining the path
inside the Script.*