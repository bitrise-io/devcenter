---
changelog:
last_modified_at:
tag: []
title: アプリのオーナーを変更する方法を教えて下さい。(How to change the owner of an app?)
redirect_from: []
description: ''
published: false

---
アプリを他のユーザーまたは他の組織へ移す必要が出てくる場合もあるかと思います。以下の手順に従えばすぐに完了することができます：

1. [bitrise.io](https://www.bitrise.io)上でアプリの**現行のオーナー (Current Owner)** のアカウントでログインします。
2. アプリのページを開き、`Team`タブへ進みます。
3. アプリの新しいオーナーがチームに存在していることを確認します。もしくは、必要であれば新オーナーをチームに追加してください。Ownership (所有権) をWorkspace (組織) に移したい場合は、その組織に加入している必要があります。
4. ご自身の名前の隣りにある`Transfer Ownership`ボタンをクリックします。
5. ドロップダウンより新オーナーを選択した後、`Transfer ownership to <username>`が書かれた紫色のボタンをクリックします。

{% include message_box.html type="info" title="Good to know: Do you want to remain the connected services user? 補足情報：接続済みサービスユーザーをそのまま残しておきたいですか？" content="Trasnsfer (オーナーの移行) のポップアップにて表示される `Do you want to remain the connected services user?`オプションを有効化すると、移行中にアプリの接続済みサービスユーザーとしてマークされます。"%}

"Connected services (接続済みサービス)"ユーザーは、他サービス (GitHub, Bitbucketなど) と通信を試みる際、どのチームメンバーのサービスの接続、または、どのBitriseユーザーへ接続されたアカウントが使用されるべきなのかを特定します。 (例：ビルドステータス情報を送り返す・自動で新しいSSHキーを登録する)

アプリのAdmin (管理人) はアプリの`Settings`タブからいつでも変更できます。