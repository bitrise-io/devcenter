---
changelog: 
last_modified_at: 
title: アプリケーションの所有者の変更はどのようにするの?
menu:
  faq:
    weight: 1

---
[Bitrise](https://www.bitrise.io)のアプリケーションを別のユーザーまたは組織に転送する必要がある場合があります。これは、以下の簡単な手順に従ってすぐに実行できます。:

1. [bitrise.io](https://www.bitrise.io)にアプリの現在の所有者でログインします。
2. アプリのページを開き、`Team`タブに移動します。
3. アプリの新しい所有者になる人がチームにいることを確認するか、チームに存在しない場合はチームにアプリの新しい所有者になる人を追加してください。もし所有権を組織に譲渡したい場合は、あなたがその組織に所属している必要があります。
4. あなたの名前の横にある`Transfer ownership`ボタンをクリックします。
5. ドロップダウンから新しい所有者を選択したら、`Transfer ownership to <Username>`という紫色のボタンをクリックして完了です！

{% include message_box.html type="info" title="Good to know: 接続サービスのユーザーのままにしますか？" content="転送ポップアップ内の`Do you want to remain the connected services user?`オプションを有効にすると、転送中にアプリの接続サービスユーザーとして明示的にマークされます。"%}

例えば、ビルドステータス情報を送り返したり、新しいSSHキーを自動的に登録したりするような、Bitriseが別のサービス（GitHub、Bitbucketなど）と通信しようとするときに、Bitriseユーザーに接続されたアカウントを「接続サービス」ユーザーとして指定する必要があります。

アプリの管理者は、アプリの`Settings`タブでこれをいつでも変更できます。