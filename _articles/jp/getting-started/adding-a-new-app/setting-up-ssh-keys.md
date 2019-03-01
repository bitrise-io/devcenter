---
title: SSHキーの設定
redirect_from:
- "/adding-a-new-app/setting-up-ssh-keys/"
menu:
  adding-a-new-app:
    weight: 3

---
SSHキーはサービス間でのセキュアな情報転送を担います。Bitriseにおいては、GitHubなどのプロバイダでの認証のためにあなたの許可を求めます。Bitriseを認証する方法について詳しくは[こちら](/getting-started/adding-a-new-app/connecting-a-repository)をご覧ください。

認証が必要となる理由は、Bitriseがあなたのリポジトリからクローンする際にSSH通信を行うためです。セットアップはいくつかの方法で行うことができます。自動または手動セットアップ、あるいは自分で生成したSSHキーを使用する方法があります。

{% include message_box.html type="warning" title="プライベートアプリには必ずSSH URLを使用する" content="
SSHキーによる認証を行うサービスの多くはSSH URL(`git@github.com:bitrise-io/bitrise.git`など) **のみ対応**しており、HTTPS URL(`https://github.com/bitrise-io/bitrise.git`など)は**非対応**です！このため、**使用されるすべてのプライベートリポジトリはSSH URLで指定される必要があります**。CocoaPodsの`Podfile`内でプライベートのGitリポジトリを直接参照している場合は、その参照にもSSH URLを使用する必要があります！[Bitrise.io](https://www.bitrise.io/)に登録されたSSHキーを使用する`サブモジュール`やその他のプライベートリポジトリについても、同様に設定を行ってください。
"%}

{% include message_box.html type="note" title="パブリックアプリにはHTTPS URLを使用する" content="
パブリックアプリはSSHキーを持つことはできません。アプリのプライバシー設定をパブリックにした場合、認証は不要になるため、HTTPS URLを使用してください。
"%}

## 自動セットアップ

GitHub、GitLabおよびBitbucketのリポジトリをセットアップする場合、BitriseはSSHキーペアを生成します。リポジトリへのSSHキーの登録は、デプロイキーとして自動で行うか、または手動で行うことができます。

![Screenshot](/img/adding-a-new-app/bitrise_auto_add_ssh_key2.png)

キーを自動で登録するためには、リポジトリの管理者権限が必要です。権限がない場合は、公開鍵をコピーしてリポジトリに登録してください。

自動登録の場合、読み取り専用の[デプロイキー](https://developer.github.com/guides/managing-deploy-keys/#deploy-keys)としてリポジトリに登録されます。これは最も安全な方法です。

## 手動セットアップ

非公開の依存関係やサブモジュールがある場合、生成されたSSHキーを手動でプロバイダに設定する必要があります。これは、デプロイキーはそれぞれ１つのリポジトリにのみ有効であるからです。

追加のプライベートリポジトリを使用する必要があるかを確認されたら、`I need to`をクリックし、SSHキーをコピーしてください。

![Add own SSH key](/img/adding-a-new-app/own-ssh.png)

{% include message_box.html type="note" title="Botユーザの利用" content="シンプルな解決策は、リポジトリにアクセスできるSSHキーを持ったBotユーザを追加することです。**利用したいユーザにSSHキーを追加し、ユーザをプロジェクトに追加してください。**。Botユーザの権限は読み取りのみで充分です。これらの設定を行うことで、SSHキーを使ってリポジトリやサブモジュールをクローンできるようになります。
"%}

{% include message_box.html type="warning" title=" SSHキーをリポジトリのデプロイキーには**追加しないでください**" content="SSHキーはリポジトリにアクセスできるユーザアカウントに対して追加してください。"%}

### GitHub

![Screenshot](/img/adding-a-new-app/ssh-github.png)

### Bitbucket

![Screenshot](/img/adding-a-new-app/ssh-bitbucket.png)

### GitLab

![Screenshot](/img/adding-a-new-app/ssh-gitlab.png)

### 自分で生成したキーを使用する

このオプションは、特定のユーザの秘密鍵を持っている場合に利用できます。秘密鍵をペーストするだけで、[Bitrise](https://www.bitrise.io)はリポジトリにアクセスできるようになります。
