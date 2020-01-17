---
tag: []
title: レスポンスとページ付け (Response and pagination)
redirect_from: []
summary: ''
published: false

---
## Response レスポンス

Every endpoint responds with a JSON formatted response.

全てのエンドポイントはJSONフォーマットのレスポンスで反応します。

### Pagination　ページ付け

When you call an endpoint that returns a list of items, you might not get the whole list in a single response. You'll have to iterate through the "pages" to retrieve all the items.

アイテムのリストを回帰するエンドポイントを呼び出す時、単一レスポンスでリスト全体を入手することができない場合があります。アイテム全てを取得するには"pages"を通じてイテレーションを行ってください。

The response of such endpoints include a `paging` object, with `total_item_count` and `page_item_limit` properties. If there is a "next" page available, it'll also include a `next` "anchor" item. For example, the response will show the app slug of the first app on the next page.

エンドポイントのレスポンスは、???と???プロパティとともに、`paging`オブジェクトを含んでいます。"next"ページがある場合は、`next` "anchor"アイテムも含まれます。例：次のページにある最初のアプリのアプリスラグがレスポンスによって表示されます。

**Example  
一例**

    {
      "data": [ ... ],
      "paging": {
        "total_item_count": 3,
        "page_item_limit": 2,
        "next": "518e869d56f2adfd"
      }
    }

{% include message_box.html type="note" title="The `next` property of the `paging` object　`paging`オブジェクトの`next`プロパティ" content=" The `next` property of the `paging` object is only included if there's at least one more page available. If there's no `next` property inside `paging` that means that there's no more page to retrieve. 

`paging`オブジェクトの`next`プロパティは、最低1ページ以上利用可能であり場合にのみ含まれます。`paging`内に`next`プロパティが存在しない場合は、取得するページがこれ以上ないことを表します。"%}

#### Limiting response items　レスポンスアイテムの制限

The `page_item_limit` property can be set with the query parameter named `limit` at the GET requests, so you can specify the size of the response pages. The default and also maximum value for this parameter is 50.

???プロパティは、GETリクエストの際に`limit`と呼ばれるクエリ・パラメータを用いて設定されるので、レスポンスページのサイズを指定することが可能です。パラメータのデフォルト値であり、かつ最大値は50となっています。

**Example  
例**

* Calling [`https://api.bitrise.io/v0.1/me/apps`](https://api.bitrise.io/v0.1/me/apps "https://api.bitrise.io/v0.1/me/apps") will retrieve you the first page of your apps with size of 50.
* If you call [`https://api.bitrise.io/v0.1/me/apps?limit=10`](https://api.bitrise.io/v0.1/me/apps?limit=10 "https://api.bitrise.io/v0.1/me/apps?limit=10"), the response is also the first page of your apps, but it will contain only 10 elements.
* [`https://api.bitrise.io/v0.1/me/apps`](https://api.bitrise.io/v0.1/me/apps "https://api.bitrise.io/v0.1/me/apps") を呼び出すと、レスポンスはアプリの最初のページを取得します (サイズ50)。
* [`https://api.bitrise.io/v0.1/me/apps?limit=10`](https://api.bitrise.io/v0.1/me/apps?limit=10 "https://api.bitrise.io/v0.1/me/apps?limit=10")を呼び出すと、同じようにレスポンスはアプリの最初のページを入手しますが、10の要素のみ含みます。

#### Iterating through response items　レスポンスアイテム経由のイテレーション

If you want to iterate through all the items, this is what you have to do:

全てのアイテムを通じてイテレーションを行う場合、以下の手順に沿ってください：

1. Call the endpoint without any pagination parameters.  
   ページ付けパラメータを使わずにエンドポイントを呼び出します。
2. From the response process the `paging` object.  
   レスポンスから`paging`オブジェクトを処理します。
3. If the `paging` object includes a `next` item, call the exact same endpoint with an additional `next=` query parameter, and pass the value you got in the response as the value of the `next` parameter.  
   もし`paging`オブジェクトに`next`アイテムを含んでいる場合、追加の`next=`クエリ・パラメータを使って全く同じのエンドポイントを呼び出して、`next`パラメータの値としてレスポンスで入手した値を渡します。

**Example　例**

Iterating through all your registered apps:  
全ての登録済みアプリを経由したイテレーションを行うには：

1. Call [`https://api.bitrise.io/v0.1/me/apps`](https://api.bitrise.io/v0.1/me/apps "https://api.bitrise.io/v0.1/me/apps").

   [`https://api.bitrise.io/v0.1/me/apps`](https://api.bitrise.io/v0.1/me/apps "https://api.bitrise.io/v0.1/me/apps")を呼び出します。
2. Process the items (`data` property).  
   アイテムを処理します (`data`プロパティ)。
3. Check the `paging` (root) property.  
   `paging` (root) プロパティを確認します。
4. If there's a `next` property inside `paging`, call the endpoint again, with the `next` query parameter
   * Example: [`https://api.bitrise.io/v0.1/me/apps?next=NEXTVALUE`](https://api.bitrise.io/v0.1/me/apps?next=NEXTVALUE "https://api.bitrise.io/v0.1/me/apps?next=NEXTVALUE"), where `NEXTVALUE` is the value of the `next` property you got in your previous response.

   `paging`プロパティ内に`next`プロパティがある場合、`next`クエリ・パラメータを使ってエンドポイントをもう一度呼び出します。
   * 例: それ以前のレスポンスで入手した`next`プロパティの値が`NETVALUE`である[`https://api.bitrise.io/v0.1/me/apps?next=NEXTVALUE`](https://api.bitrise.io/v0.1/me/apps?next=NEXTVALUE "https://api.bitrise.io/v0.1/me/apps?next=NEXTVALUE")
5. Repeat this until the `paging` object does not include a `next` property, which means that the page you received was the last one.

   `paging`オブジェクトに`next`プロパティが含まれなくなるまでこれを繰り返します。