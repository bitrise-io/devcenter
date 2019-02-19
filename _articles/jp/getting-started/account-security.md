---
title: アカウントセキュリティ
menu:
  getting-started:
    weight: 6
---
## 二段階認証の有効化

Bitriseアカウントの二段階認証(TFA)を有効化すれば、セキュリティが強化されます。

1. 携帯電話に [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=ja) をダウンロードしてインストールします。
2. [bitrise.io](https://www.bitrise.io) にログインして、 `Profile` ページに移動します。
3. `Account settings` をクリックします。
4. スクロールして左側にある `Security` をクリックします。
5. `Two-factor authentication` の下にある、 `Enable` をクリックします
6. 表示されるQRコードを、携帯電話にインストールされた Google Authenticator でスキャンします。
7. 生成される6桁のコードを入力します。
8. 二段階認証が有効化されリカバリーコードが保存されると、 `letsconnect@bitrise.io` から確認のメールが届きます。

もしまだしていない場合、連携しているアカウント(GitHub, Bitbucket, GitLab, Xamarin)の二段階認証も有効化することを推奨します。

## 手動でパーソナルアクセストークンを生成

プロフィールの `Security` タブには2種類のパーソナルアクセストークンがあります：

* `auto-generated` は、Bitrise APIを利用する際に自動的にBitriseによって生成されます。
* `user-generated` は、あなたが手動で生成することができます。

以下の手順に従って新しいトークンを手動で生成してください！

1. あなたのプロフィールの `Security` タブの、 `Generate new` をクリックします。
2. `Token description` フィールドを入力して、トークンの適切な有効期限(１時間、１日、１ヶ月、または永続)を選択します。
3. `Save & Continue` をクリックします。
4. ポップアップウィンドウの `Personal Access token` で、新しく作成されたトークンを確認します。後に使用するためにトークンを安全な場所に保存します。
5. `Done` をクリックします。

`Security` ページで、あなたの全てのトークンとその有効期限を確認することができるようになります。また、それぞれ `Edit` と `Remove` ができます。
