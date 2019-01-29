---
# jp title missing
title: Downloading or replacing project resources
menu:
  tutorials:
    weight: 7

---

{% include not_translated_yet.html %}

There are multiple ways of downloading or replacing project resources. We'll go through the following examples:

* using the `ZIP resource archive downloader` step for downloading and extracting a ZIP file
* using the `File Downloader` step to download a single file
* using a `Script` Step

{% include message_box.html type="note" title="Store the resources file on [bitrise.io](https://www.bitrise.io)" content=" In the Workflow Editor select the `Code signing & Files` section, and upload the archive file in the `Generic File Storage` section. Bitrise will automatically generate a (time limited, expiring) download URL for the files you upload here, and will expose the download URL as an Environment Variable. "%}

## Using the `ZIP resource archive downloader` Step

If you have your resources on your server in a zip archive, it's very simple to download it:

1. Add the `ZIP resource archive downloader` Step to your Workflow.
2. Specify the URL of the ZIP and the destination where the zip's content should be uncompressed.

The _source code of your app_ will be (by default) downloaded into the folder
defined in the `$BITRISE_SOURCE_DIR` environment variable.

You can also place the content of your ZIP archive into a specific folder within your app's source code directory. Just define the destination folder of the  `ZIP resource archive downloader` Step like this: `${BITRISE_SOURCE_DIR}/folder_name` or `.folder_name`.

## Using the `File Downloader` Step

If you only want to download a single file, use the `File Downloader` Step. 

1. Add the `File Downloader` Step to your Workflow.
2. Specify the URL of the file and the destination where the file should be downloaded to.

    ```yaml
    - file-downloader:
        inputs:
        - source: $BITRISEIO_my_file_id_URL
        - destination: "$BITRISE_SOURCE_DIR/path/to/store/the/file"
    ```

## Using a Script Step

If you want to control the whole download process, you can use the `Script` step and write your own download code. For example:

```bash
#!/bin/bash
set -ex
# Download your resource
curl -fo "download/path" "https://url/of/your/resource"
# Uncompress it
unzip -u "download/path" -d "uncompress/target/path"
```

_If you'd need an additional tool to download or uncompress the resources file, please see the_ [_Install Any Additional Tool_](/tips-and-tricks/install-additional-tools/) _guide._
