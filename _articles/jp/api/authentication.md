---
changelog: 
last_modified_at: 
title: 認証
redirect_from: []
date: '2019-03-29T16:55:28.000+00:00'
menu:
  api-main:
    weight: 2

---
## 認証

現在のAPIは、1つのタイプの認証のみサポートします。ユーザが生成した **パーソナルアクセストークン** のみです。Workspaceは、それ自身のアクセストークンを持っていません。

"ルート"URL([https://api.bitrise.io](https://api.bitrise.io "https://api.bitrise.io"))以外の **すべてのエンドポイントは、認証が必要です** 。

### パーソナルアクセストークンの取得

1. [bitrise.io](https://www.bitrise.io)にログインします。
2. **Account Settings** に移動します。
3. 左側にある [Security](https://www.bitrise.io/me/profile#/security) タブを選択します。
4. `Generate new` ボタンをクリックして、新しいパーソナルアクセストークンを生成します。
5. 生成したトークンを保存します。

{% include message_box.html type="important" title="生成されたトークンについて" content=" 生成されたトークンは生成されたときに1回だけ表示されます。もう1度そのトークンを見る方法はありません！もちろん好きなだけアクセストークンを生成することは可能ですし、必要なくなれば削除することもできます。 "%}

### 認証を使ったAPIコール

必須のアクセストークンをAPIに渡すには、 **リクエストヘッダー** に `Authorization` というキーと、あなたのトークンを連結したものを追加してください。

`curl` を使って、認証情報をヘッダーに追加してAPIコールする例:

    curl -H 'Authorization: THE-ACCESS-TOKEN' https://api.bitrise.io/v0.1/me