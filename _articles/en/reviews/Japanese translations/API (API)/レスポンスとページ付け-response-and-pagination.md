---
published_at:
last_modified_at:
tag: []
title: レスポンスとページ付け (Response and pagination)
redirect_from: []
description: ''
published: false

---
## レスポンス

全てのエンドポイントはJSONフォーマットのレスポンスに反応します。

### ページ付け

アイテムのリストを戻すエンドポイントを呼び出す時、単一レスポンスではリスト全体を入手することができない場合があります。アイテム全てを取得するには"pages"を通じてイテレーションを行ってください。

エンドポイントのレスポンスは、`total_item_count`と`page_item_limit`プロパティとともに、`paging`オブジェクトを含んでいます。"next"ページがある場合は、`next` の"anchor"アイテムも含まれるようになります。一例として、次のページにある最初のアプリのアプリスラグがレスポンスによって表示されます。

**例**

    {
      "data": [ ... ],
      "paging": {
        "total_item_count": 3,
        "page_item_limit": 2,
        "next": "518e869d56f2adfd"
      }
    }

{% include message_box.html type="note" title="`paging`オブジェクトの`next`プロパティ" content=" `paging`オブジェクトの`next`プロパティは、最低1ページ以上利用可能である場合にのみ含まれます。`paging`内に`next`プロパティが存在しない場合は、取得するページがこれ以上ないことを表します。"%}

#### レスポンスアイテムの制限

`page_item_limit`プロパティは、GETリクエストの際に`limit`と呼ばれるクエリ・パラメータを用いて設定されるので、レスポンスページのサイズを指定することが可能です。パラメータのデフォルト値であり、かつ最大値は50となっています。

**例**

* [`https://api.bitrise.io/v0.1/me/apps`](https://api.bitrise.io/v0.1/me/apps "https://api.bitrise.io/v0.1/me/apps") を呼び出すと、レスポンスはアプリの最初のページを取得します (サイズ50)。
* [`https://api.bitrise.io/v0.1/me/apps?limit=10`](https://api.bitrise.io/v0.1/me/apps?limit=10 "https://api.bitrise.io/v0.1/me/apps?limit=10")を呼び出すと、同じようにレスポンスはアプリの最初のページを入手しますが、10の要素のみ含みます。

#### レスポンスアイテム経由のイテレーション

全てのアイテムを経由してイテレーションを行う場合、以下の手順に沿ってください：

1. ページ付けパラメータを使わずにエンドポイントを呼び出します。
2. レスポンスから`paging`オブジェクトを処理します。
3. もし`paging`オブジェクトに`next`アイテムを含んでいる場合、追加の`next=`クエリ・パラメータを使って全く同じのエンドポイントを呼び出して、`next`パラメータの値としてレスポンスで入手した値を渡します。

**例**

全ての登録済みアプリを経由したイテレーションを行うには：

1. [`https://api.bitrise.io/v0.1/me/apps`](https://api.bitrise.io/v0.1/me/apps "https://api.bitrise.io/v0.1/me/apps")を呼び出します。
2. アイテムを処理します (`data`プロパティ)。
3. `paging` (root) プロパティを確認します。
4. `paging`プロパティ内に`next`プロパティがある場合、`next`クエリ・パラメータを使ってエンドポイントをもう一度呼び出します。
   * 例: それ以前のレスポンスで入手した`next`プロパティの値が`NETVALUE`である[`https://api.bitrise.io/v0.1/me/apps?next=NEXTVALUE`](https://api.bitrise.io/v0.1/me/apps?next=NEXTVALUE "https://api.bitrise.io/v0.1/me/apps?next=NEXTVALUE")
5. `paging`オブジェクトに`next`プロパティが含まれなくなるまでこれを繰り返します。