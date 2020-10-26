---
changelog:
last_modified_at:
tag: []
title: APIのエンドポイントとテスト (Endpoints and testing the API)
redirect_from: []
description: ''
published: false

---
## エンドポイント

[Bitrise API endpoint reference documentation](https://api-docs.bitrise.io) (APIエンドポイント参考ドキュメンテーション) では全ての利用可能なエンドポイントとパラメータがリスト化されているほか、可能なレスポンスに沿っています。ぜひお試しください！

### APIのテスト

参考ドキュメンテーションにあるエンドポイントをお試しいただけます。テストを行うにはまず認証を完了させ、必要なパラメータを規定します。APIは呼び出しに基づいて適切なレスポンスを戻します。

1. [Personal Access Tokenを取得]()します。
2. [Bitrise API endpoint reference documentation](https://api-docs.bitrise.io)に進みます。
3. `Authorize`をクリックします。

   ![{{ page.title }}](/img/authorize.png)
4. `Value`欄にご自身のPersonal Access Tokenを貼り付けます。

   ![{{ page.title }}](/img/available-auth.png)
5. 試してみたいエンドポイントをクリックして詳細を開きます。  
   その後、必要なパラメータを入力します。
6. `Execute`をクリックします。

APIは：

* リクエストの`curl`コマンド
* リクエストURL
* サーバーレスポンス

を戻します。