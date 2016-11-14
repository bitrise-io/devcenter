You can do this in quite a few ways, these are probably the easiest ones:

* use the `ZIP resource archive downloader` step for downloading and extracting a ZIP file
* use the `File Downloader` step to download a single file
* use a `Script` Step

!!! note "Store the resources file on [bitrise.io](https://www.bitrise.io)"
    You can store the resources file on [bitrise.io](https://www.bitrise.io).
    In the Workflow Editor select the "Code signing & Files" section,
    and upload the archive file in the "Generic File Storage" section.
    Bitrise will automatically generate a (time limited, expiring) download URL
    for the files you upload here, and will expose the download URL
    as an Environment Variable.

## Using the `ZIP resource archive downloader` step

If you have your resources on your server in a zip archive, all you have to do
is to add the `ZIP resource archive downloader` Step to your Workflow,
specify the URL of the ZIP and the destination where the zip's content should be uncompressed.

The _source code of your app_ will be (by default) downloaded into the folder
defined in the `$BITRISE_SOURCE_DIR` environment variable.

If you want to place the content of your ZIP archive into a folder called *myresource*
inside your app's source code directory, you can define the extract target folder
(of the `ZIP resource archive downloader` step) as `${BITRISE_SOURCE_DIR}/myresource`,
or `./myresource` (as the default working directory is the source code directory).


## Single file - using the `File Downloader` step

If you only want to download a single file, you can of course ZIP it up and
use the `ZIP resource archive downloader` step as described in the previous section,
but there's also a step for single file downloads.

The `File Downloader` step can be used for this use case. Works very similarly as the
`ZIP resource archive downloader` step, except it does not require a ZIP file,
it simply downloads the specified file to the location you set.


```
...
- file-downloader:
    inputs:
    - source: $BITRISEIO_my_file_id_URL
    - destination: "$BITRISE_SOURCE_DIR/path/to/store/the/file"
...
```


## The "manual" way

If you want to control the whole download process, you can use the `Script` step
and write your own download code, something like this:

```
#!/bin/bash
set -ex
# Download your resource
curl -fo "download/path" "https://url/of/your/resource"
# Uncompress it
unzip -u "download/path" -d "uncompress/target/path"
```

_If you'd need an additional tool to download or uncompress the resources file,
please see the [Install Any Additional Tool](/tips-and-tricks/install-additional-tools/) guide._
