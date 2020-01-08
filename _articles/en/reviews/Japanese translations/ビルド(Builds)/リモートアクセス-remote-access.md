---
tag: []
title: リモートアクセス (Remote access)
redirect_from: []
summary: ''
published: false

---
Remote access allows users to connect to their build's virtual machines via SSH or a screenshare app. A failed build can be rebuilt with remote access enabled to make troubleshooting a lot easier - for example, if the build logs don't provide enough information about the error.

リモートアクセスを使って、SSHまたはスクリーンシェアアプリを経由してビルドのバーチャルマシンに接続することができます。リモートアクセスを用いた失敗ビルドの再構築により、トラブルシューティングが簡単になります。例えば、ビルドログがエラーについて十分な情報を提供しない場合などです。

{% include message_box.html type="important" title="Authorization 権限付与" content="Users who have the **Testers/QA** roles on the app CANNOT use remote access.

アプリで**Testers/QA**のロールをお持ちのユーザーはリモートアクセスを使用することはできません。"%}

There are two ways to use remote access on our build machines:

Bitriseのビルドマシンでリモートアクセスを使用するには2つの方法があります：

* **SSH**: this is available for both Linux/Docker based and MacOS machines.
* **Screenshare**: this is only available for MacOS machines.
* SSH: Linux/Dockerベースの両方とMacOSで利用可能です。
* Screenshare: MacOSのみで利用可能です。

With either method, you can access the build machine remotely during the build and for 10 minutes after the build is finished.

これらの方法で、ビルド中、もしくはビルド終了から10分間、遠く離れたところからでもビルドマシンにアクセスすることができます。

## Remote access with SSH　SSHを使用したリモートアクセス

1. Go to the build page.  
   ビルドページに進みます。
2. Click the **Rebuild with Remote Access** option.

   **Rebuild with Remote Access**のオプションをクリックします。
3. Click **Remote Access Instructions**.  
   **Remote Access Instructions**をクリックします。

   ![](/img/remote-access-instructions.png)
4. Under the **SSH** option, find and copy the command you will need.  
   SSHオプションの下にある
5. Open a command line interface.
6. Run the command found under **SSH** (the below is an example):

       ssh -o StrictHostKeyChecking=no vagrant@1.tcp.ngrok.io -p 000000
7. Copy and paste the password from the **Remote Access Instructions** page.

And done! You should be able to access the virtual machine where your build is running.

## Remote access with screenshare

1. Go to the build page.
2. Click the **Rebuild with Remote Access** option.
3. Click **SSH**.

   ![](/img/remote-access-instructions.png)
4. Under the **SSH** option, find the required information:
   * Address
   * Username
   * Password
5. Open a screenshare application.
6. Fill out the required fields with the information from under the **Screenshare** option.

And done! You should now be able to access the virtual machine where your build is running.