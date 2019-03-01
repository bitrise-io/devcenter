---
title: ビルドステータスをGitホスティングサービスにレポートする
menu:
  triggering-builds:
    weight: 7
---
BitriseはビルドステータスをGitホスティングサービス（GitHub/GitLab/Bitbucket）に知らせることができます。必要な作業は、Bitriseと連携するための認証をGitホスティングサービスでしていただくだけです。認証をすることで、ビルドステータスのレポート以外にも、SSHキーやWebhookの自動登録などができるようになります。

これを行うには、[bitrise.io](https://www.bitrise.io)上におけるアプリケーションの`Team`タブで`Service Credential User`を設定します。また、そのユーザーが、[bitrise.io](https://www.bitrise.io)で利用しているGitホスティングサービスと連携されたアカウントを持っていることを確認してください。このアカウントは、BitriseがGitホスティングサービスのAPIを使用するために利用します。

ステータスレポートは、レポジトリへのプッシュやプルリクエストをトリガーにした自動ビルドの場合でのみ機能することに注意してください。

1. 使用するアカウントが、Gitホスティングサービスと連携していることを確認するには、`Account setting`ページの左側にある`CONNECTED ACCOUNTS`をチェックしてください。

    ![Connected account](/img/getting-started/triggering-builds/connected-account.png)

1. [bitrise.io](https://www.bitrise.io)に登録したアプリケーションの`Team`タブを表示します

1. `Service credential User`という項目で、任意のアカウントを選択します

    ![Service credential user](/img/getting-started/triggering-builds/service-credential.png)

1. `Test the git connection`をクリックし、選択したユーザーアカウントでGitホスティングサービスにビルドステータスを送信することができるかを確認します
