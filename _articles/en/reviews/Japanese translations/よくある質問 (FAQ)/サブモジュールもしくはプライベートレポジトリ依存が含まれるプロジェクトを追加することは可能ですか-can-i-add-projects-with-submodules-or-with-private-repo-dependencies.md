---
changelog:
last_modified_at:
tag: []
title: 'サブモジュールもしくはプライベートレポジトリ依存が含まれるプロジェクトを追加することは可能ですか？ (Can I add projects with
  submodules or with private repo dependencies?) '
redirect_from: []
description: ''
published: false

---
一つ以上のサブモジュール、または他のプライベートレポジトリ依存（例：CocoaPodsレポジトリ）を含んだプロジェクトをお持ちの場合、ビルドを成功させるためにすべてのレポジトリにアクセスの許可を有効にする必要があります。

これには2つの方法があります：

* ”Deployment keys”のような、ビルド中にアクセスが必要なすべてのレポジトリに**同一のSSHキー**を設定します。この方法が最善で安全ですが、すべてのgitホスティングサービスにサポートされていないのでご注意ください（GitHubはサポートしていません）。
* ユーザーアカウントにSSHキーを設定します。レポジトリにSSHキーを使って”bot”や”machine”ユーザーを追加するだけです。**ユーザーに向けて使用したいSSHキーを追加して、プロジェクトにユーザーを追加します。**これでbotユーザーがreadの許可を割り当てることができます。この作業の後、レポジトリやどんなサブモジュールにでもクローンを作るのにSSHキーを使用することが可能になります。

{% include message_box.html type="note" title="Read only access (読み取り専用) を使ってマシンユーザーを使用する" content=" 特別なbot/machineユーザーを必ずしも使用する必要はありません：gitホスティングサービス上のご自身のアカウントへSSHキーを追加します。ですが、ビルド中にアクセスしたいレポジトリがある場合、最善の方法はread onlyアクセスを使ったマシンユーザーを使用することです。 "%}

複数のレポジトリにアクセスする場合、[GitHubはこの方法を推奨しています](https://developer.github.com/v3/guides/managing-deploy-keys/#machine-users)。

GitLabとBitbucket上では、複数のレポジトリに”Deployment key”としてシングルSSHキーを登録することができます。これは”bot”や”machine”ユーザーを作成する必要はありません。

## Gitクローニングサブモジュールとレポジトリ依存

一つのアプリに全てのサブモジュールやプライベートレポジトリ依存のアクセスを許可したい場合、そのアプリのプライバシー設定がどのgit URLを使用すべきかを決定します。

* **Private**のアプリをお持ちの場合：**すべての場所でSSH URLを使用してください！ほとんどのサービスはSSH URL**のみの認証に基づいています（URLの例：`git@github.com:bitrise-io/bitrise.git`) 。**お使いになりたいすべてのプライベートレポジトリはSSH URLを使ってアドレス指定する必要があります。**Cocoapodsの `Podfile` にてdirect private git repo referencesをお持ちの場合も、SSH URLを使用する必要があります！SSHキーを使って同様に適用されるサブモジュールやすべての他のprivate git repository URL を使用したい場合は、[Bitrise.io](https://www.bitrise.io/)にて登録をお願いします！
* **Public**アプリをお持ちの場合：**HTTPS URLをすべての場所で使用してください！**レポジトリがパブリックであっても、SSH URLはSSHキーを必要とします。セキュリティ上の理由により、PublicアプリはSSHキーを保持することはできません。パブリックリポジトリの場合、HTTPS git clone URLは認証を必要としないので、パブリックのBitriseアプリでHTTPS git clone URLを使用される必要があります。

## 新規のプライベートアプリ用にSSHキーを作成する

レポジトリに[Bitrise](https://www.bitrise.io)がアクセスを行えるようにするには、3つのオプションがあります：

* _SSHキーペアの自動追加_：**サブモジュールを使用される場合は、このオプションは使用しないでください。**このオプションはメインのレポジトリのみにSSHキーを追加します。
* _SSHキーペアの生成_：[Bitrise](https://www.bitrise.io)のウェブサイト上でキーを生成し、特定のユーザーへ手動でコピーする必要があります。**このオプションは、サブモジュールを使用したい、またはビルド中に複数のレポジトリにアクセスする必要がある際にご使用ください。**
* _自分のSSHキーペアの使用_：特定のユーザーのプライベートキーも同様にお持ちの場合に使用できます。プライベートキーをペーストするだけで、[Bitrise](https://www.bitrise.io/)がレポジトリにアクセスすることが可能となります。**(注)SSHキーは、パスフレーズを含まないRSAキーである必要があります！**このようなキーを生成する方法の一例は[ここ](https://devcenter.bitrise.io/faq/how-to-generate-ssh-keypair/)で確認することができます。

## 既存のプライベートアプリのSSHキーを管理する

[Bitrise](https://www.bitrise.io/)上のアプリにある `Settings` からアプリのパブリックSSHキーを見つけることができます。 `SSH settings` セクションまで下にスクロールして、`Show SSH Public Key`をクリックします。

特定のユーザーへキーをコピーすれば、ビルドの準備は完了です！

必要であれば、特定のアプリのSSHキーをアップデートすることが可能です。`Change SSH Keypair` ボタンをクリックして、３つのオプションの中から１つを選びます。