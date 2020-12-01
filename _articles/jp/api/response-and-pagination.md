---
changelog: 
last_modified_at: 
title: レスポンスとページネーション
redirect_from: []
date: '2019-03-29T16:58:12.000+00:00'
menu:
  api-main:
    weight: 4

---
## レスポンス

全てのエンドポイントはJSONフォーマットのレスポンスを返します。

### ページネーション

アイテムのリストを返すエンドポイントをコールした場合、1回のレスポンスで全てのリストを取得できないかもしれません。全てのアイテムを取得するために "ページ" を複数回取得する必要があります。

レスポンスに `paging` を含むエンドポイントは `total_item_count` と `page_item_limit` のプロパティを持っています。もし "次" のページが取得可能であれば、レスポンスは `next` の "アンカー" アイテムも含みます。例えば、そのレスポンスは次のページの最初のアプリのスラッグを持ちます。

**例**

    {
      "data": [ ... ],
      "paging": {
        "total_item_count": 3,
        "page_item_limit": 2,
        "next": "518e869d56f2adfd"
      }
    }

{% include message_box.html type="note" title=" `paging` オブジェクトの `next` プロパティについて" content=" `paging` オブジェクトの `next` プロパティは、少なくとも1つ以上のページが存在する場合にのみ含まれます。もし `paging` 内に `next` プロパティがない場合、それ以上取得できるページが存在しないことを意味します。 "%}

#### レスポンスアイテムの制限

`page_item_limit` プロパティはGETレスポンスの `limit` クエリパラメータで設定することで、レスポンスのページサイズを指定することができます。ページサイズのデフォルト設定および最大値は50です。

**例**

* `https://api.bitrise.io/v0.1/me/apps`をコールすることで、1番目のページを最大リストアイテムサイズ50で、あなたのアプリリストを取得できます。
* `https://api.bitrise.io/v0.1/me/apps?limit=10` をコールする場合、そのレスポンスは10個のアイテムしか含まないあなたのアプリリストとなります。

#### レスポンスアイテムの反復処理

全てのアイテムを反復して取得したい場合、以下の処理を行う必要があります:

1. ページネーションパラメータなしでエンドポイントをコールします。
2. レスポンスから `paging` オブジェクトを取得します。
3. `paging` オブジェクトが `next` アイテムを含んでいれば、 `next=` クエリパラメータにレスポンスで取得した `next` パラメータの値を設定して全く同じエンドポイントをコールしてください。

**例**

あなたの登録した全てのアプリを反復して取得する:

1. `https://api.bitrise.io/v0.1/me/apps` をコール。
2. アイテム(`data` プロパティ)を処理する。
3. `paging` (ルート)のプロパティを確認する。
4. もし `paging` オブジェクトが `next` プロパティを持っていれば、そのエンドポイントを `next` クエリパラメータ付きで再度コールします。
   * Example: `https://api.bitrise.io/v0.1/me/apps?next=NEXTVALUE`, where `NEXTVALUE` is the value of the `next` property you got in your previous response.
   * 例: `https://api.bitrise.io/v0.1/me/apps?next=NEXTVALUE` この `NEXTVALUE` は前回のレスポンスで受け取った `next` プロパティの値です。
5. この処理を `paging` オブジェクトが `next` プロパティを含まなくなるまで(最後のページを取得するまで)繰り返します。