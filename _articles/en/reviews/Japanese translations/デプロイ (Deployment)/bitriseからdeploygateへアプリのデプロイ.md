---
changelog:
last_modified_at:
tag: []
title: BitriseからDeployGateへアプリのデプロイ (Deploy apps to DeployGate from Bitrise)
redirect_from: []
description: ''
published: false

---
# DeployGateとは何ですか？

[**DeployGate**](https://deploygate.com/?)とはiOSとAndroid用のモバイルアプリ配布プラットフォームです。開発者チーム、メンバー、従業員、組織内のQAテストチームや社外のテスターに開発中のiOS/Androidアプリを配布することができます。

DeployGateにはアプリ開発サイクルの高速化を実現するたくさんの機能が満載です。そのサイクルには、QAテストや、ベータテスターのフィードバックに基づいたアプリ品質の改良が含まれています。

機能：

* テスター用のアカウントがなくても、自動のバージョンコントロールを使ったリアルタイムによるアプリ配布が可能
* 緻密なアクセスコントロールを使用した柔軟なユーザーアカウント管理
* Gitのようなマルチトラック配布方法が個人による同一アプリのバージョン/ユーザー/デバイス管理を可能にします

DeployGateとBitriseがあれば、チームに完全自動化したドッグフーディング的社内環境をすぐに構築する事ができます。詳細を見るには[DeployGate社の機能紹介ページ](https://deploygate.com/features?)をご覧ください。

![Automated app distribution workflow](/img/tutorials/deploy/deploygate/flow.png)

# Bitriseを経由してDeployGateにアプリをアップデート

DeployGateにアプリをアップロードする場合、Bitriseワークフローに`DeployGate Upload`ステップを追加します。

![DeployGate Workflow Step](/img/tutorials/deploy/deploygate/step.png)  
このStepは、アップロード前にバイナリのアプリファイルのビルドを完了させるため、アプリのビルドプロセス後に追加しましょう。以下のような複数の必要なパラメータを設定する必要があります。

| インプット変数 | 解説 |
| --- | --- |
| API Key <br>(APIキー) | ユーザーのDeployGate APIキーをアカウント設定からセットしてアップロードしてください。 <br>万が一、organization account (組織アカウント) としてアプリのアップロードを行いたい場合、organizationのAPIキーを使用してください。アップロードアカウントはactivity timelineで表示されます。 |
| Owner Name <br>(オーナー名) | アプリオーナーのアカウント名はDeployGateにあります。 <br> ユーザー名か組織名を使用できます。 |
| App file path <br>(アプリファイルパス) | アプリのバイナリファイル (IPA/APK)がアップロードされます。<br>デフォルトでは、$BITRISE_APK_PATH (Android)または $BITRISE_IPA_PATH (iOS)を使います。 |
| App Visibility <br>(アプリの可視性) | DeployGateのプロフィールページからアプリ名とアイコンをリスト化できます。<br>この変数は可視性のみに効力を持つようになっており、匿名者によってダウンロードやインストールを可能にするものではありません。 |

以下のような高度な機能を使ってオプションの変数を設定することも可能です：

| インプット変数 | 解説 |
| --- | --- |
| Short Message <br>ショートメッセージ | DeployGateで表示されるアップデートの概要です。<br>gitコミットのような同じメッセージを使いたい場合、$GIT_CLONE_COMMIT_MESSAGE_SUBJECT を使用します。 |
| Distribution Key <br>配布キー | 同一アプリ内のアプリバイナリの異なるバージョン用に、複数のパブリックインストールリンク(Bitriseはこれを $Distribution Page と呼んでいます)を作ることができます。 <br>配布ページのハッシュを指定することにより、その配布ページが同時にアップデートされます。配布されたページのURLの"xxxx"の部分はこのように配置されます：https://deploygate.com/distributions/xxxx |
| Distribution Name <br>配布名 | アップデートされたDistribution Pageの名前を指定します。何も見つからない場合、新しいDistribution Pageが発行されます。各Gitブランチ名用に可能性のある利用法がDistribution Pageに含まれています。 (例：$BITRISE_GIT_BRANCH) |
| Release Note <br>リリースノート | Distribution Pageでの新リリースのメッセージです。このメッセージはご自身のDistribution Pageのテスターへ通知されます。 |
| Disable Notify <br>通知の無効化　(iOSのみ) | iOSプラットフォームにはDeployGateクライアントアプリは存在しません。デフォルトでは、リリースアップデートにはメールによる通知を行います。メールによる通知が不要な場合、このオプションを $true に設定してください。 |

{% include message_box.html type="info" title=" DeployGateについての詳細 " content=" これらのオプションは[**DeployGate API**]()に基づいております。詳細を確認するには、[DeployGate.com](https://deploygate.com/?)を参考にしてください。"%}

# `Distribution Page`はどのように機能しますか？

![Distribution Page](/img/tutorials/deploy/deploygate/distribution_page.png)

**Distribution Page** (共有可能なリンク) はアプリの指定したバージョンのインストール用のランディングページを生成する機能です。アプリをDeployGateへアップロードすると、アップロードされた各ビルドにシステムが自動的に連続した数字 (Bitriseはこれを`**Revision Number**`と呼びます) を割り当てます。Distribution Pageでは、各テスターグループに配布するため特定のアプリのリビジョン (修正) を選ぶことができます。この機能を使えば、複数のテスターグループへ異なる目的 (例: QA, ドッグフーディングやテストマーケティング) でのアプリの配布が簡単になります。

DeployGate Upload ステップを使ってBitriseからアプリをアップロードする時、distribution pageを生成することもできます。上記のオプション変数を参照してください。