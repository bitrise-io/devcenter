---
changelog:
last_modified_at:
tag:
- cli
- getting-started
title: CLI から新しいアプリを追加する
redirect_from: []
description: 'コマンドラインインターフェースから簡単に Bitrise にアプリを追加できる:
  このプロセスは簡単なガイドと簡易的なフォローで簡単に始められます'

---

CLIから新しいBitriseアプリを簡単に登録できます。プロセスはガイド付きで、わかりやすいです。そして短いです。たとえば、アプリに使用している `bitrise.yml` ファイルを使いたい場合、スキャン時間で待たされません。既存のファイルを使うので準備完了です！

{% include message_box.html type="note" title="APIでアプリを追加する" content="Bitrise APIを使用して新しいアプリを追加することもできます。これを行うには、[アプリの追加と管理ガイド](https://devcenter.bitrise.io/jp/api/adding-and-managing-apps/)をご覧ください。"%}

## 始める前に

CLIでBitriseに新しいアプリを追加する前に、いくつかのことを確認してください。

* gitプロバイダーが接続されたBitriseアカウントが必要です。
* プロジェクトには、マシン上のローカルGitリポジトリとGitプロバイダーのリモートリポジトリが必要です。SSH鍵を使用してリポジトリにアクセスする場合, [リモートリポジトリのURLはSSH URLである必要があります](https://help.github.com/jp/articles/which-remote-url-should-i-use)! こんな感じ, git@github.com:example-user/example.git.

事前に `bitrise.yml`を作成することもでき、作成プロセス中にそれをアプリに追加することができます. これはオプションです：Webサイトのように、プロセス中にスキャナーを生成させることができます！

## CLIから新しいアプリを追加する

この手順では、SSH鍵でBitriseからアプリを追加する方法を説明します。 これには、アプリのリモートリポジトリがSSH URLである必要があります、 こんな感じ git@github.com:example-user/example.git.

もちろん、 HTTPSのURLを使用してリモートリポジトリにもアクセスできます。その場合、アプリのSSH鍵の設定はいりません。 パブリックなアプリにはHTTPS URLのみを使用することをお勧めします (OSSプロジェクト)

 1. [CLIから新しいアプリを作成](https://app.bitrise.io/dashboard/add-app-from-cli) ページに移動します。

    [ダッシュボード](https://app.bitrise.io/dashboard/builds)からこのページにアクセスできます。右側の**新しいアプリの追加**ボタンをクリックし、**CLIから新しいアプリの追加**を選択します。

    ![{{ page.title }}](/img/Bitrise_-_Mobile_Continuous_Integration_and_Delivery.png)
 2. アプリを所有するアカウントとアプリのプライバシーを設定します。
 3. 表示されたcurlコマンドをコピーします。

    ![{{ page.title }}](/img/Bitrise_-_Mobile_Continuous_Integration_and_Delivery-2.png)
 4. コマンドラインインターフェイスを開きます。
 5. プロジェクトのディレクトリに異動します。
 6. curlコマンドを貼り付けて、Enterキーを押します。
 7. リポジトリのURLを選択します。SSHオプションを選択します。

    このプロンプトは、リモートリポジトリがSSH URLである場合にのみ表示されます。リモートリポジトリがHTTPS URLの場合、このプロンプトは表示されません。

        Remote URL: git@github.com:example-user/example.git
        
        ? Select repository URL::
            https://github.com/example-user/example.git
          > ssh://git@github.com:example-user/example.git
 8. SSH鍵を登録します。

        Specify how Bitrise will be able to access the source code: 
        > Automatic
          Add own SSH

    SSH鍵を自動登録か、鍵を自分で追加するか選択できます。
    * SSH鍵を自動登録する場合、Bitriseはキーペアを自動的に生成します。 追加のプライベートリポジトリまたはサブモジュールを使用する場合は、プロンプトが表示されたらオプションを選択してすすめます。 そうでない場合は、いいえ、SSH鍵を自動追加するオプションを選択します。これにより、公開キーがリポジトリに自動的に追加されます。
    * SSH鍵を自分で追加する場合、SSH鍵ファイルへのパスを指定する必要があります。パスを入力するため、手動で入力するか、ファイルをドラッグアンドドロップします。
 9. アップロードするbitrise.ymlファイルを決定します。

        ? What bitrise.yml do you want to upload? 
          > Run the scanner to generate a new bitrise.yml
            Use the bitrise.yml found in the current directory or specify manually

    スキャナーにプロジェクトファイルに基づいて生成させるか、ファイルを手動で指定することができます。リポジトリに既に`bitrise.yml`ファイルが含まれている場合、そのファイルへのパスは自動的に入力されます。
1.  使用するブランチを選択します。

    デフォルトのオプションは、現在アクティブなブランチです。

        The current branch is: master (tracking: origin master),
        
        ? Do you want to run the scanner for this branch?
          > Yes
            No

    `No` を選択すると、使用するブランチをチェックアウトするように求められ、Enterキーをもう一度押すと、スキャナーが起動します。

    スキャナーが完了すると、アプリの種類を検出するか、手動構成に切り替わります。手動構成では、アプリのタイプ（iOS、Android、React Native、Flutterなど）を選択する必要があり、関連する構成ファイルへのパスを指定する必要があります。たとえば、Ionicアプリの場合のconfig.xml。このガイドでは、自動検出を進めます。
2.  使用するスタックを選択します。

    スキャナーがプロジェクトの種類を検出すると、スタックが自動的に推奨されますが、必要に応じてCLIでスタックを変更できます。上記のように手動設定を実行した場合、スタックも選択する必要があります。
3.  webhookとコード署名ファイルを設定して終了です。
    * Webhookの登録をスキップすることもできますが、Bitriseでビルドに対応するトリガーを決める必要があります。 [Webhooks](/webhooks/index/) セクションでWebhookの詳細を読んでください。
    * コード署名ファイルをアップロードできます。 アプリの種類に応じてことなります。ツールが codesigndoc を実行し、iOSアプリの場合、コード署名ファイルをアップロードするかどうかを尋ねられます。Androidアプリの場合、keystore ファイルです。アプリの種類に応じて両方アップロードできます。これらのファイルは、Webサイトでいつでもアップロードできます。コード署名の詳細については、[コード署名](/code-signing/code-signing-index/)セクションをご覧ください。

以上です！これで完了です。新しいアプリのURLが表示され、[ダッシュボード](app.bitrise.io/dashboard/)でアプリを表示することもできます。