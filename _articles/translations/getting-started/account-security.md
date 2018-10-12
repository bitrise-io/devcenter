## 2要素認証の有効化

あたなの Bitrise アカウントで2要素認証を有効にすれば、さらにセキュリティが強化されます。

1. あなたの携帯電話に [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en) をダウンロードしてインストールします。
2. [bitrise.io](https://www.bitrise.io) にログインし、`Profile`画面に行きます。
3. `Account settings` をクリックします。
4. スクロールし、左にある `Security` をクリックします。
5. `Two-factor authentication` 項目にある `Enable` をクリックします。 
6. 先ほどインストールした Google Authenticator を開き、画面に表示されている QR コードをスキャンします。
7. 生成された 6桁の数字を入力します。
8. 2要素認証をアクティベートして、リカバリーコードを保存したら、`letsconnect@bitrise.io` から確認メールが届きます。

もし紐づけられたアカウント(GitHub, Bitbucket, GitLab and Xamarin)で2要素認証を有効にしていない場合、確認して有効にすることをお勧めします。

## 手動でパーソナルアクセストークンを生成する

プロフィール画面の`Security`タブに2種類のパーソナルアクセストークンがあります。

- `auto-generated`: Bitrise API を使って Bitrise が自動で生成
- `user-generated`: ユーザが手動で生成

手動で新しいパーソナルアクセストークンを生成する手順は次の通りです。

1. プロフィール画面の`Security`タブにある `Generate new` をクリックします。
2. `Token description` を埋め、適切な有効期限(1時間、1日、1ヵ月、無期限)
3. `Save & Continue` をクリックします。
4. `Personal Access token` ポップアップウィンドウに生成されたパーソナルアクセストークンが表示されます。後で確認できるように安全な場所に保存してください。
5. `Done` をクリックします。

`Security` ページにあなたのすべてのパーソナルアクセストークンが有効期限と一緒に表示されています。`Edit` で編集、`Remove`で削除することができます。
