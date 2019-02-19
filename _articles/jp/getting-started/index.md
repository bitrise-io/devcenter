---
title: クイックスタートガイド
redirect_from:
- "/getting-started/adding-a-new-app/"
- "/getting-started/create-your-first-app-on-bitrise/"
- "/getting-started/add-your-first-step-to-your-workflow/"
menu:
  getting-started:
    weight: 1
---
Bitriseはパワフルかつ複雑ですが、簡単かつ直感的に利用することができます！数分で終わるサインアップの後、すぐにアプリのビルドを行うことができます。ビルドを行うまでになにが必要なのかみていきましょう！

## Bitriseにサインアップする

まず最初に、Bitriseのアカウントが必要です。サインアップに使用するものを以下より選択してください。

* [Email](/getting-started/signing-up/signing-up-with-email)
* [GitHub](/getting-started/signing-up/signing-up-with-github)
* [GitLab](/getting-started/signing-up/signing-up-with-gitlab)
* [Bitbucket](/getting-started/signing-up/signing-up-with-bitbucket)

いずれかのGitサービスプロバイダにサインアップし、Bitriseアカウントと紐付けます。紐付けられたアカウントを用いることで、簡単に任意のリポジトリにBitriseがアクセスすることができます。

サインアップ後、あなたのBitriseアカウントを3つのGitサービスプロバイダすべてに紐付けることができます。例えばGitHubにサインアップ後、GitLabとBitbucketアカウントにも紐づけ、さらにそれらに紐づく全てのリポジトリにアクセスすることができます。


## アプリを追加する

トップメニューバーの`+`をクリックし、ドロップダウンメニューから`Add app`を選択することで、いつでも[新しいアプリを追加する](/getting-started/adding-a-new-app/index)ことができます。


![新しいアプリを追加する](/img/adding-a-new-app/add_new_app.png)

### プライバシー

アプリのプライバシー設定について、**private**か[**public**](/getting-started/adding-a-new-app/public-apps)のいずれかを選択してください。

* privateの場合、あなたとあなたのOrganizationに所属するメンバー、及びチームメンバーのみがアクセスすることができます。
* publicの場合、ビルドログ及び`bitrise.yml`ファイルは公開されます。

![アプリプライバシー](/img/adding-a-new-app/app-privacy.png)

### リポジトリに接続する

Bitriseにアプリのコードがストアされている場所を指定します。以下のいずれかを選択することができます。

* [接続されたGitHub/GitLab/Bitbucketアカウントからリポジトリに接続します](/getting-started/adding-a-new-app/connecting-a-repository)。Bitriseは選択されたGitサービスプロバイダから自動的に利用可能なリポジトリを表示します。後はリストから選択するだけです。
* 手動でソースコードの場所を指定できます。 `Other/Manual`を選択し、**HTTPSのgit clone URL** を入力してください。
* [自分がホストしているGitLabインスタンス](getting-started/signing-up/self-hosted-gitlab)に置いているリポジトリを使うこともできます。

**なぜBitriseはGithub/Bitbucket/GitLabにおいて書き込み権限が必要なのでしょうか？**
GitHub/GitLab/Bitbucketに接続すると、リポジトリにつきBitriseに書き込み権限が付与されます。それには２つの理由があります。

* SSH keyを選択されたリポジトリに追加するため
* Webhookをリポジトリに登録するため

### リポジトリアクセスを設定する

[選択されたリポジトリにアクセスするため、SSH keyを設定します](/getting-started/adding-a-new-app/setting-up-ssh-keys)。これはプライベートアプリにおいてBitriseがリポジトリからクローンする為に必要です。以下のいずれかを選択することができます。

* Bitriseが生成したSSH keyを自動で追加します。
* Bitriseが生成したパブリックキーをコピーします。
* ユーザ自身が生成したSSHキーペアを使います。この場合、プライベートキーがパスフレーズなしのRSAキーであることが必要です。

![スクリーンショット](/img/adding-a-new-app/bitrise_auto_add_ssh_key2.png)

パブリックアプリはSSHキーを持つことができません。

### プロジェクトの検証と設定

リポジトリアクセスを設定した後、ユーザが使いたいリポジトリのブランチを入力し`Next`をクリックします。

![ブランチを選択する](/img/adding-a-new-app/choose-branch.png)

[Bitriseはユーザのリポジトリのスキャンと検証を行い、その結果を元にプロジェクト設定を行います](/getting-started/adding-a-new-app/setting-up-configuration)。もし検証に失敗した場合、手動でプロジェクトを設定することができます。

### Webhook設定

すぐに[Webhookを登録](/webhooks/index/)するため、Bitriseはいつでもリポジトリにプッシュされたコードをビルドすることができます。新しいアプリを作った際にWebhook設定をスキップすることもできますが、あとでいつでもWebhookを設定し直すことができます。

## ビルドとワークフロー

アプリを追加すると、自動的に初回ビルドが始まります。これはいくつかのステップのまとまりであるワークフローを実行することと同じです。ステップは前もって入力変数と出力変数が定義されたスクリプトのまとまりを表し、Bitriseの心臓部です。ユーザは新しいワークフローを作成し、ワークフロー同士を繋げることができます。また、ステップ入力値の修正、ワークフローからステップの追加、削除も自由に行うことができます。

* [ビルドプロセス](/getting-started/builds-and-workflows)
* [ワークフロー](/getting-started/getting-started-workflows)
* [ステップ](/getting-started/getting-started-steps)

## チームと組織

一度アプリを設定すれば、[チームメンバーを招待する](/team-management/index)ことができます。もしDeveloperプランかOrganizationプランを契約している場合、無制限にチームメンバーを招待できます！

また、Organizationプランを契約している場合、[Organizationを作る](/team-management/organizations/creating-org)ことができます。Organization上ではすばやく、そして効率的にチームを管理することができます。
