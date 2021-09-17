---
changelog:
last_modified_at:
tag: []
title: 認証 (Authentication)
redirect_from: []
description: ''
published: false

---
## 認証

現在のAPIは一種類の認証方法のみサポートしております：ユーザー生成の**Personal Access Tokens**です。Workspaceには個別のアクセストークンはありません。

"root"URL ([https://api.bitrise.io](https://api.bitrise.io "https://api.bitrise.io")) 以外の**全てのAPIエンドポイントは認証を要求します**。

### Personal Access Tokenの取得

1. [bitrise.io](https://www.bitrise.io)にサインインします。
2. **Account Settings**ページに移ります。
3. 左側にある[Security](https://www.bitrise.io/me/profile#/security)タブを選択します。
4. 新規のPersonal Access Tokenを作成するのに`Generate new token`ボタンをクリックします。
5. 生成されたトークンを保存します。

{% include message_box.html type="important" title="生成されたトークンの可用性" content=" 生成されたトークンは、生成された際に一回だけ表示されます。トークンの値を再確認することはできないのでご注意ください！Access Tokenは好きなだけ生成することができ、不要になれば消去することも可能です。"%}

### APIを使った認証

必要なアクセストークンを提供するには、`Authorization`のキーとトークンの値を使い、リクエストに**HEADER**を追加してください。

以下のAPIの例は`curl`を使っています：

    curl -H 'Authorization: THE-ACCESS-TOKEN' https://api.bitrise.io/v0.1/me