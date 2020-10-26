---
changelog:
last_modified_at:
tag: []
title: リモートアクセス (Remote access)
redirect_from: []
description: ''
published: false

---
リモートアクセスを使って、SSHまたは画面共有アプリを経由しビルドのバーチャルマシンに接続することができます。リモートアクセスを用いた失敗ビルドの再構築により、トラブルシューティングがより簡単になります (ビルドログがエラーについて十分な情報を提供しない場合など) 。

{% include message_box.html type="important" title="権限付与" content="アプリ内で**Testers/QA**ロールのユーザーはリモートアクセスを使用することはできません。"%}

Bitriseのビルドマシンでリモートアクセスを使用するには2つの方法があります：

* **SSH**: Linux/DockerとMacOSで利用可能です。
* **Screenshare (画面共有)**: MacOSのみで利用可能です。

これらの方法で、ビルド実行中、もしくはビルド終了から10分間、遠く離れたところからでもビルドマシンにアクセスすることができます。

## SSHを使用したリモートアクセス

1. ビルドページに進みます。
2. **Rebuild with Remote Access**のオプションをクリックします。
3. **Remote Access Instructions**をクリックします。

   ![{{ page.title }}](/img/remote-access-instructions.png)
4. **SSH**オプションの下にある、後ほど必要になるCommandをコピーします。
5. コマンドラインインターフェイス (CLI) を開きます。
6. **SSH**の下にあるcommandを実行します (以下は例です)：

       ssh -o StrictHostKeyChecking=no vagrant@1.tcp.ngrok.io -p 000000
7. **Remote Access Instructions**のページのPasswordをコピー＆ペーストします。

完了です！これでビルドが回っているバーチャルマシンにアクセスすることができます。

## Remote access with screenshare  
画面共有アプリを使ったリモートアクセス

1. ビルドページに進みます。
2. **Rebuild with Remote Access**オプションをクリックします。
3. **SSH**をクリックします。

   ![{{ page.title }}](/img/remote-access-instructions.png)
4. **SSH**オプションの下にある情報を確認します：
   * Address
   * Username
   * Password
5. 画面共有アプリを開きます。
6. **Screenshare**オプションの下にある情報を入力します。

完了です！これでビルドが実行されているバーチャルマシンにアクセスすることができます。