---
changelog:
last_modified_at:
tag: []
title: アプリのオーナーの変更方法を教えて下さい。(How to change the owner of an app?)
redirect_from: []
description: ''
published: false

---
[Bitrise](https://www.bitrise.io)でアプリを他ユーザー、またはWorkspace (組織)に移行する必要がある場合、以下の簡単なステップを参照してください。

1. [bitrise.io](https://www.bitrise.io)で、アプリにおける**現在のオーナー (current Owner)** でログインします。
2. アプリのページを開いて`Team`タブに進みます。
3. 新規のオーナーがチームに入っていることを確認します。必要であれば、追加しましょう。組織へownership (所有権)を移行したい場合は、現在のオーナーがその組織に入っているかどうかを確認してください。
4. 自身の名前の隣りにある`Transfer ownership`ボタンをクリックします。
5. ドロップダウンより新オーナーを選択した後、`Transfer ownership to <ユーザー名>`が記された紫色のボタンをクリックすると完了です！

{% include message_box.html type="info" title="知っておくべきポイント：接続済みサービスユーザーをそのまま残しておきますか" content="  
Transfer (移行)ポップアップで`Do you want to remain the connected services user?`オプションを有効化すると、移行中にアプリの接続済みサービスユーザーとして明確にマークされます。"%}

”接続済みサービス”ユーザーは、Bitriseが別のサービス (GitHub, Bitbucketなど) と通信しようとするときに、Bitriseユーザーに接続済みである、どのチームメンバーのサービス接続 / アカウントを使用するべきかを指定します。例えば、ビルドステータス情報を送り返したり、新しいSSHキーを自動で登録します。

アプリのAdmins (管理人) はアプリの`Setting`タブ上でいつでも変更することができます。