---
changelog: 
last_modified_at: 
title: Bitrise から DeployGate へアプリをデプロイする
menu:
  deploy-main:
    weight: 12
    title: DeployGate へアプリのデプロイ

---
# DeployGate とは何ですか？

[**DeployGate**](https://deploygate.com?locale=ja) は iOS と Android 用のモバイルアプリを配布するプラットフォームです。開発中の iOS / Android アプリを組織内の開発チームやメンバー、社員、QA チーム、社外のテスターに配布します。


DeployGate には、QAテストやベータテスターのフィードバックでアプリを改善するなど、アプリの開発サイクルを加速するための多くの機能があります。

機能:
* テスター用のアカウントなしでも自動バージョン管理でリアルタイムアプリ配信
* きめ細やかなアクセスコントロールで柔軟なユーザーアカウント管理
* Git のようなマルチトラック配布により、同一アプリで個別のバージョン/ユーザー/デバイス管理が可能


DeployGate と Bitrise を使うと、チーム用に完全に自動化された組織内ドックフーディング環境をすばやく構築できます。詳しくは [DeployGate の機能](https://deploygate.com/features?locale=ja) をご覧ください。

![Automated app distribution workflow](/img/tutorials/deploy/deploygate/flow.png)

# Bitrise 経由で DeployGate にアプリをアップロードする

DeployGate にアプリをアップロードするには、Bitrise のワークフローに `DeployGate Upload` ステップを追加してください。

![DeployGate Workflow Step](/img/tutorials/deploy/deploygate/step.png)

アップロード前にアプリのバイナリファイルをビルドするため、このステップはアプリのビルドプロセスのあとに追加する必要があります。
以下のとおりいくつかの必須パラメーターを設定する必要があります。

| 入力変数 | 説明 |
|-|-|
|API Key| [アカウント設定](https://deploygate.com/settings) から アップロードユーザーの DeployGate API キーを設定します。 <br>もしグループのアカウントでアプリをアップロードしたいならグループの API キーを使ってください。アップロードアカウントはアクティビティのタイムラインに表示されます。|
|Owner Name|DeployGate でのアプリの所有者名。<br> ユーザー名かグループ名を使用できます。 |
|App file path| アップロードするアプリのバイナリファイル（IPA / APK）。<br>デフォルト設定では、Android 用の `$BITRISE_APK_PATH` または iOS 用の `$BITRISE_IPA_PATH` を使います。 |
|App Visibility| DeployGate のプロフィールページでアプリ名とアイコンを公開します。この変数は単に可視性に影響するだけで、匿名ユーザーによるダウンロードやインストールの許可ではありません。 |

以下のとおりアドバンス機能用のオプション設定もできます。

| 入力変数 | 説明 |
|-|-|
|Short Message|DeployGate で表示するアップデートの概要。<br>コミットメッセージ、プルリクエストタイトル、または手動でビルドを起動した場合に指定したメッセージを使いたい場合は `$BITRISE_GIT_MESSAGE` を使います。|
|Distribution Key|同一アプリのさまざまなバージョン用のパブリックインストールページを複数作成できます（**`配布ページ`** と呼びます）。<br>配布ページのハッシュを指定することにより、アップロードと同時に配布ページが更新されます。https://deploygate.com/distributions/xxxx のように配布されたページの "xxxx" 部分です。|
|Distribution Name|更新する配布ページの名前を指定します。もし存在しなければ、新しい配布ページが作成されます。Git ブランチ名ごとに配布ページを作成することもできます。（例: `$BITRISE_GIT_BRANCH`）|
|Release Note|配布ページの新しいリリース用のメッセージ。このメッセージは配布ページのテスターに通知されます。|
|Disable Notify（iOS のみ）|iOS プラットフォームには DeployGate クライアントアプリがありません。デフォルトでは、リリース更新をメールで通知します。もしメールでの通知が必要なければ、このオプションを `true` に設定してください。|


{% include message_box.html type="info" title="DeployGate の詳細 " content=" これらのオプションは [**DeloyGate API**](https://docs.deploygate.com/reference) に基づいています。詳しくは [DeployGate.com](https://deploygate.com?locale=ja) のリファレンスを参照してください。
"%}

# `配布ページ` はどのような仕組みですか？

![Distribution Page](/img/tutorials/deploy/deploygate/distribution_page.png)

**配布ページ** （共有可能なリンク）は特定バージョンのアプリインストール用のランディングページを作成する機能です。アプリを DeployGate にアップロードすると、アップロードされた各ビルドにシステムが自動的に連番を割り当てます（**`リビジョン番号`** と呼びます）。配布ページで、アプリの特定のリビジョンを選択してテスターの各グループに配布することができます。
この機能は、QA、ドッグフーディング、テストマーケティングなど、さまざまな目的でアプリを複数のテスターグループに配布する場合に便利です。

DeployGate Upload ステップで Bitrise からアプリをアップロードするときには配布ベージを作成することもできます。上記のオプションを参照してください。