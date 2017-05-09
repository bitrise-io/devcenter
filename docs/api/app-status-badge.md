With the App Status (/ Badge) API you can get an embeddable SVG badge image,
or a JSON message, reflecting the status of the app, or a specific branch of the app.

The easiest way to configure a Badge image is to open your App on [bitrise.io](https://www.bitrise.io)
and click the badge image, right next to the app's name.

This will open a popup where you can optinally set a branch, and get copy-paste ready embed
codes for the SVG badge image.

Example SVG URL:

```
https://www.bitrise.io/app/APP-ID/status.svg?token=APP-STATUS-BADGE-TOKEN&branch=master
```

To get the JSON equivalent of the status badge simply replace `.svg` in the embed
URL with `.json`.

Example JSON URL:

```
https://www.bitrise.io/app/APP-ID/status.json?token=APP-STATUS-BADGE-TOKEN&branch=master
```

_Note: the `APP-STATUS-BADGE-TOKEN` is a special token which can only be used
for calling this endpoint (you can find this token in the Badge configurator popup).
__No other information can be retrieved with this token__,
and it's not the same as the API Token which you can find on the `Code` tab!_

## JSON response

The JSON response returns a very simple JSON object:

```
{
    "status": "SIMPLIFIED-STATUS-AS-TEXT"
}
```

Where `SIMPLIFIED-STATUS-AS-TEXT` can be:

- `success` : if the last finished build on the specified branch was successful
- `error` : if the last finished build failed or was aborted on the specified branch
- `unknown` : in any other case, including if there was no (finished) build on the specified branch

### HTTP Codes and Errors

If the `APP-ID` and the `APP-STATUS-BADGE-TOKEN` parameters are correct,
and identify an existing app, a __200__ HTTP code is returned alongside the JSON response,
even if the branch parameter points to a non existing branch (the JSON
response in this case will be `{"status": "unknown"}` with a 200 HTTP code).

If the `APP-ID` or the `APP-STATUS-BADGE-TOKEN` (or both) is not correct,
you'll get a HTTP __403__ code _with an empty response_ body.
