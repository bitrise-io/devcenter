---
title: アプリの所有者を変更する方法は？
menu:
  faq:
    weight: 1

---
[Bitrise]（https://www.bitrise.io）にあるアプリケーションを他のユーザーや組織に変更する必要があります。次の簡単な手順で完了します。

1. [bitrise.io]（https://www.bitrise.io）に変更したいアプリの**現在の所有者**でログインします。
2. アプリのページを開いて`Team`タブに移動します
3. アプリの新しい所有者がチームに所属していることを確認するか、必要に応じて追加します。
   所有権を組織に譲渡する場合は、あなたは組織の一員でなければなりません。
4. あなたの名前の横にある`Transfer ownership`ボタンをクリックします
5. ドロップダウンから新しい所有者を選択したら、紫色のボタンをクリックします。
   `Transfer ownership to <Username>`に譲渡すれば完了です。

{% include message_box.html type="info" title="知っておくと便利なこと: サービスに接続しているユーザーを使い続けますか?" content=" `Do you want to remain the connected services user?` オプションを有効にすると転送中にアプリの接続ユーザーとして明示的にマークされます。"%}

"connected services" ユーザーはBitriseが別のサービス（GitHub、Bitbucketなど）と通信しようとしたときに、自分のBitriseユーザーに接続しているチームメンバーのサービス接続/アカウントを使用するように指定します。または、新しいSSHキーを自動的に登録します。

アプリの管理者はアプリの `Settings` タブでいつでもこれを変更できます。
