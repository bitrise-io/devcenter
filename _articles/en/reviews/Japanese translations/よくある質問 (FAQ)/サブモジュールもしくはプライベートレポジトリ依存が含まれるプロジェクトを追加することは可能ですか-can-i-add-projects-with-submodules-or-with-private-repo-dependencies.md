---
tag: []
title: 'サブモジュールもしくはプライベートレポジトリ依存が含まれるプロジェクトを追加することは可能ですか？ (Can I add projects with
  submodules or with private repo dependencies?) '
redirect_from: []
summary: ''
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

* If you have a **private** app: **use SSH URLs everywhere!** Most services support SSH key based authentication **only** for SSH URLs (for example, `git@github.com:bitrise-io/bitrise.git`). Therefore **every private repository you want to use have to be addressed with the SSH URL**. If you have direct private git repo references in your CocoaPods `Podfile` you'll have to use the SSH URL there as well! The same applies for submodules and every other private git repository URL you want to use with the SSH key you register on [Bitrise.io](https://www.bitrise.io/)!
* If you have a **public** app: **use HTTPS URLs everywhere!** SSH URLs require SSH keys even if the repository is public. For security reasons, public apps CANNOT have SSH keys. As HTTPS git clone URLs do not require any authentication in the case of public repositories, they should be used for public Bitrise apps.
* **private**のアプリをお持ちの場合：**すべての場所でSSH URLを使用してください！**ほとんどのサービスはSSH URL**のみ**の認証に基づいています（URLの例：`git@github.com:bitrise-io/bitrise.git`) 。お使いになりたいすべてのプライベートレポジトリはSSH URLを使ってアドレス指定する必要があります。Cocoapodsの `Podfile` にあるdirect private git repo referencesをお持ちの場合も、SSH URLを使用する必要があります！SSHキーを使って同様に適用されるサブモジュールやすべての他のprivate git repository URL を使用したい場合は、Bitrise.ioにて登録をお願いします！
* publicアプリをお持ちの場合：HTTPS URLをすべての場所で使用してください！レポジトリがパブリックであっても、SSH URLはSSHキーを必要とします。セキュリティ上の理由により、PublicアプリはSSHキーを保持することはできません。HTTPS git clone URLはパブリックリポジトリの認証を行わないことにより、パブリックのBitriseアプリで使用される必要があります。

## Creating SSH keys for a new private app  
新規のプライベートアプリ用にSSHキーを作成する

There are three options to grant [Bitrise](https://www.bitrise.io) access to your repository:

レポジトリにBitriseがアクセスを行えるようにするには、3つのオプションが存在します：

* _Auto-add SSH keypair_: **Don't use this option if you use submodules.** This option adds the SSH key to the main repository only.
* _Generate SSH keypair_: this generates a key for you on the [Bitrise](https://www.bitrise.io) website and you will have to copy it manually to the given user. **This is the recommended option if you want to use submodules or have to access multiple repositories during your build.**
* _Use your own SSH keypair_: can be used if you also have the private key of the given user. You just have to paste the private key and [Bitrise](https://www.bitrise.io) will be able to access the repositories. **Keep in mind that the SSH key has to be an RSA key, without a passphrase!** You can find an example of how you can generate a key like that [here](/faq/how-to-generate-ssh-keypair/).
* _SSH キーペアのオート追加_：サブモジュールを使用される場合は、このオプションは使用しないでください。これはメインのレポジトリのみにSSHキーを追加します。
* _SSH キーペアの生成_：Bitriseのウェブサイト上でキーを生成し、任意のユーザーにマニュアルでコピーする必要があります。**この方法はサブモジュールを使用したい、またはビルド中に複数のレポジトリにアクセスする必要がある際にご使用ください。**
* 自身のSSHキーペアの使用：任意のユーザーのプライベートキーをお持ちの場合に使用されます。プライベートキーをペーストするだけで、[Bitrise](https://www.bitrise.io/)がレポジトリにアクセスすることが可能となります。**(注)SSHキーは、パスフレーズを含まないRSAキーである必要があります。**このようなキーを生成する方法の一例を[ここ](https://devcenter.bitrise.io/faq/how-to-generate-ssh-keypair/)で確認してください。

## Managing SSH keys of an existing private app  
既存のプライベートアプリのSSHキーを管理する

You can find the public SSH key of the app in the `Settings` of the given app on [Bitrise](https://www.bitrise.io). Scroll down to the `SSH settings` section and click `Show SSH Public Key`.

Copy the key to the given user and you are ready to build!

If necessary, update the given app's SSH key by clicking the `Change SSH Keypair` button and choosing one of the three options.

[Bitrise](https://www.bitrise.io/)上のアプリにある Settings からアプリのパブリックSSHキーを見つけることができます。 SSH settings セクションまで下にスクロールして、Show SSH Public Keyをクリックします。

任意のユーザーにキーをコピーすれば、ビルドの準備は完了です！

必要であれば、任意のアプリのSSHキーをアップデートすることが可能です。Change SSH Keypair ボタンをクリックして、３つのオプションの中から１つを選びます。