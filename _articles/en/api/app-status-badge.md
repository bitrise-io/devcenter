---
title: App Status Image/Badge API
menu:
  api:
    weight: 2

---
With the `Status Image API token`, you can get an embeddable SVG badge image, a JSON message reflecting the status of the app, or a specific branch of the app.

1. Open your App on [bitrise.io](https://www.bitrise.io) and click the badge image right next to the app's name.

   ![Printscreen](/img/api/status-image-api-token.jpg)
2. In the `Status image` popup, you can optionally set a branch, and get copy-paste-ready `Embed` codes for the SVG image.

   An example for SVG URL:

   `https://app.bitrise.io/app/APP-ID/status.svg?token=STATUS-IMAGE-API-TOKEN&branch=master`

   To get the JSON equivalent of the status image, simply replace the `.svg` in the `Embed` URL with `.json`.

   An example for JSON URL:
   `https://app.bitrise.io/app/APP-ID/status.json?token=STATUS-IMAGE-API-TOKEN&branch=master`

{% include message_box.html type="important" title="`STATUS-IMAGE-API-TOKEN`" content=" The `STATUS-IMAGE-API-TOKEN` is a special token which can only be used for calling this endpoint (you can find this token in the `Status image` popup). No other information can be retrieved with this token, and it's not the same as the `API Token` which you can find on the `Code` tab!
"%}

## JSON response

The JSON response returns a very simple JSON object:

    {
        "status": "SIMPLIFIED-STATUS-AS-TEXT"
    }

where `SIMPLIFIED-STATUS-AS-TEXT` can be:

* `success` : if the last finished build on the specified branch was successful
* `error` : if the last finished build failed or was aborted on the specified branch
* `unknown` : in any other case, including if there was no (finished) build on the specified branch

### HTTP Codes and Errors

If the `APP-ID` and the `STATUS-IMAGE-API-TOKEN` parameters are correct,
and they identify an existing app, a **200** HTTP code is returned along with the JSON response, even if the branch parameter points to a non-existing branch (the JSON response in this case will be `{"status": "unknown"}` with a 200 HTTP code).

If the `APP-ID` or the `STATUS-IMAGE-API-TOKEN` (or both) is not correct,
you'll get a HTTP **403** code _with an empty response_ body.