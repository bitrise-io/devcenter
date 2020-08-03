---
title: Downloading or replacing project resources
menu:
  tutorials-main:
    weight: 14

---
There are multiple ways of downloading or replacing project resources. We'll go through the following examples:

* Using the **ZIP resource archive downloader** Step for downloading and extracting a ZIP file.
* Using the **File Downloader** Step to download a single file.
* using a **Script** Step.

{% include message_box.html type="note" title="Store the resources file on [bitrise.io](https://www.bitrise.io)" content=" In the Workflow Editor, select the **Code Signing** section, and upload the archive file in the **Generic File Storage** section. Bitrise will automatically generate a (time limited, expiring) download URL for the files you upload here, and will expose the download URL as an Environment Variable (Env Var). "%}

## Using the ZIP resource archive downloader Step

If you have your resources on your server in a zip archive, it's very simple to download it:

1. Add the **ZIP resource archive downloader** Step to your Workflow.
2. Specify the URL of the ZIP and the destination where the zip's content should be uncompressed.

The source code of your app will be (by default) downloaded into the folder defined in the `$BITRISE_SOURCE_DIR` Env Var.

You can also place the content of your ZIP archive into a specific folder within your app's source code directory. Just define the destination folder of the  **ZIP resource archive downloader** Step like this: `${BITRISE_SOURCE_DIR}/folder_name` or `.folder_name`.

## Using the File Downloader Step

If you only want to download a single file, use the **File Downloader** Step.

1. Add the **File Downloader** Step to your Workflow.
2. Specify the URL of the file and the destination where the file should be downloaded to.

   ```yaml
   - file-downloader:
       inputs:
       - source: $BITRISEIO_my_file_id_URL
       - destination: "$BITRISE_SOURCE_DIR/path/to/store/the/file"
   ```

## Using a Script Step

If you want to control the whole download process, you can use the **Script** Step and write your own download code. For example:

```bash
#!/bin/bash
set -ex
# Download your resource
curl -fo "download/path" "https://url/of/your/resource"
# Uncompress it
unzip -u "download/path" -d "uncompress/target/path"
```

If you'd need an additional tool to download or uncompress the resources file, please read our [Install Any Additional Tool_](/tips-and-tricks/install-additional-tools/) guide.

{% include banner.html banner_text="Now you know everything" url="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta" button_text="Go to Bitrise now" %}