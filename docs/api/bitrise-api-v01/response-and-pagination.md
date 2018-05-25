## Response

Every endpoint responds with a JSON formatted response.


## Pagination

When you call an endpoint which returns a list of items you always have to be prepared that you might not get the whole list in a single response, you'll have to iterate through the "pages" to retrieve all the items.

The response of the endpoint will include a `paging` object, with `total_item_count` and `page_item_limit` properties, and if there's a "next" page available it'll also include a `next` "anchor" item.

Example:

```
{
  "data": [ ... ],
  "paging": {
    "total_item_count": 3,
    "page_item_limit": 2,
    "next": "518e869d56f2adfd"
  }
}
```

_Note: the `next` property of the `paging` object is only included if there's at least one more page available. If there's no `next` property inside `paging` that means that there's no more page to retrieve._

The `page_item_limit` property can be set with the query parameter named `limit` at the GET requests, so you can specify the size of the response pages. The default and also maximum value for this parameter is 50.

Example:

- Calling `https://api.bitrise.io/v0.1/me/apps` will retrieve you the first page of your apps with size of 50.
- If you call `https://api.bitrise.io/v0.1/me/apps?limit=10`, the response is also the first page of your apps, but it will contain only 10 elements.


If you want to iterate through all the items this is what you have to do:

1. First call the endpoint without any pagination parameters
1. From the response process the `paging` object.
1. If the `paging` object includes a `next` item, simply call the exact same endpoint with an additional `next=` query parameter, and pass the value you got in the response as the value of the `next` parameter.

That's all.

A quick example, iterating through all of your registered apps:

1. First call `https://api.bitrise.io/v0.1/me/apps`
1. Process the items (`data` property)
1. Then check the `paging` (root) property.
1. If there's a `next` property inside `paging` simply call the endpoint again, with the `next` query parameter
    * Example: `https://api.bitrise.io/v0.1/me/apps?next=NEXTVALUE`, where `NEXTVALUE` is the value of the `next` property you got in your previous response.
1. Repeate this until the `paging` object does not include a `next` property, which means that the page you received was the last one.
