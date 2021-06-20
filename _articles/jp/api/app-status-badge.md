---
changelog: 
last_modified_at: 
title: App Status Image/Badge API
menu:
  api-main:
    weight: 18

---

`Status Image API token` を用いることで、Appの（指定したブランチの）ステータスを反映した埋め込み可能なSVG形式のバッジ画像やJSONメッセージを取得できます。

1. [bitrise.io](https://www.bitrise.io) 上でAppを開き、App名の右隣のバッジ画像をクリックしてください。

   ![Printscreen](/img/api/status-image-api-token.jpg)
2. `Status image` ポップアップ上で、ステータスを取得したいブランチを任意で設定し、`Embed` 内のSVG画像用のURLをコピー＆ペーストします。

   SVG画像URL例:  
   `https://app.bitrise.io/app/APP-ID/status.svg?token=STATUS-IMAGE-API-TOKEN&branch=master`

   ステータス画像と同等のJSONレスポンスを取得したい場合は、 `Embed` 内のURLの `.svg` を `.json` に書き換えてください。

   JSON URL例:  
   `https://app.bitrise.io/app/APP-ID/status.json?token=STATUS-IMAGE-API-TOKEN&branch=master`

{% include message_box.html type="important" title="`STATUS-IMAGE-API-TOKEN`" content=" `STATUS-IMAGE-API-TOKEN` は本エンドポイントをリクエストするための特別なトークンです（ `Status image` ポップアップから取得することが可能です）。 このトークンを用いて他の情報を取得することはできません。また、 `Code` タブにある `API Token` とは異なります。
"%}


## JSONレスポンス

JSONレスポンスはとてもシンプルなJSONオブジェクトを返却します:

    {
        "status": "SIMPLIFIED-STATUS-AS-TEXT"
    }

`SIMPLIFIED-STATUS-AS-TEXT` には次の文字列が返却されます:

* `success` : 指定したブランチにおける最後に終了したビルドが成功した場合
* `error` : 指定したブランチにおける最後に終了したビルドが失敗または中止された場合
* `unknown` : 指定したブランチにおける（終了した）ビルドがなかった場合を含む、その他の場合

### HTTPコードとエラー

`branch` パラメーターに存在しないブランチを指定していた場合も、 `APP-ID` と `STATUS-IMAGE-API-TOKEN` パラメーターが正しく、それらによってAppを識別することが可能な場合、HTTPコード **200** がJSONレスポンスとともに返却されます（この場合のJSONレスポンスは、 `{"status": "unknown"}` が返却されます）。

`APP-ID` や `STATUS-IMAGE-API-TOKEN` （またはそのどちらも）が不正な場合、空のレスポンスボディとともにHTTPコード **403** が返却されます。
