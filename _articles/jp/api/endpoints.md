---
changelog:
last_modified_at:
title: エンドポイントとAPIのテスト
redirect_from: []
date: 2019-03-29T16:53:56.000+00:00
menu:
  api-main:
    weight: 5

---

## エンドポイント

[Bitrise APIエンドポイントリファレンス](https://api-docs.bitrise.io) は全ての利用可能なエンドポイントとそのパラメータをレスポンス情報ととともにリストアップしています。そのエンドポイントを試すこともできます！

### APIのテスト

そのリファレンスにある全てのエンドポイントを試すことができます！必要なことは、あなた自身を認証することと、求められるパラメータを設定するだけです。APIはそのコールに従って、適切なレスポンスを返します。

1. [パーソナルアクセストークンを取得します](/api/v0.1#acquiring-a-personal-access-token).
2. [Bitrise APIエンドポイントリファレンス](https://api-docs.bitrise.io)に移動します。
3. `Authorize` をクリックします。

   ![{{ page.title }}](/img/authorize.png)
4. あなたのパーソナルアクセストークンを `Value` フィールドに貼り付けます。

   ![{{ page.title }}](/img/available-auth.png)
5. 試したいエンドポイントをクリックし、その詳細を開きます。
6. 必須パラメータを入力します。
7. `Execute` をクリックします。

そのAPIは以下を返します:

* あなたのリクエストの `curl` コマンド
* リクエストURL
* サーバからのレスポンス
