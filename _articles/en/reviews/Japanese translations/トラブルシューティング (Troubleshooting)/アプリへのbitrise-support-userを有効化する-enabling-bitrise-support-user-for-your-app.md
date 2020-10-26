---
changelog:
last_modified_at:
tag: []
title: アプリへのBitrise Support userを有効化する (Enabling Bitrise Support user for your app)
redirect_from: []
description: ''
published: false

---
迅速な技術的サポートが必要な場合、Bitriseサイト上のチャットサポートにて担当者がプロジェクトを拝見し、効率的な方法で問題の解決をお手伝いいたします。これを行うには、`Bitrise Support user`を有効化してください。有効化により、Bitriseサポートチームによるプロジェクト (特にワークフローやビルドログ、アプリ設定、ymlなど) へのアクセスが許可されます。

トグル機能により、`Bitrise Support user`のオン・オフが簡単に変更できるので、ご自身のアプリチームへBitriseサポートの担当者を追加する必要はありません。

設定方法を見ていきましょう。

1. プロジェクトの `Settings`タブへ進みます。
2. `Enable Bitrise Support user for this app`まで下へスクロールし、有効化するにはトグルを右へ動かします。機能するのに数秒かかることもあるので、ステータスを見るには**ページを更新**してください。

   ![{{ page.title }}](/img/troubleshooting/enable-bitrise-support-user.png)
3. サイト上のチャットにて、担当の者にBitrise support userを有効化した旨を伝えていただくと、すぐに問題の解決に移ることができます。

### Bitrise Support userが有効化されたときに確認できるもの

Bitrise Support userはビルドへのアクセスならびにワークフローの編集が可能です。また、`Team` , `Code` そして `Settings`タブのインプットを修正することができます。ワークフローが失敗する場合、`support-testing`と呼ばれる失敗ワークフローのnewバージョンとcorrectバージョンをBitriseサポート担当が最善策として作成いたします。作成された`support-testing`をご自身のワークフローと比較して、自分のワークフローを更新するか、リネームしてそのまま使用・開発することもできます。

### Bitrise Support userが有効化されているが確認することができないもの

Bitrise Support userは、お客様の`Account information` (アカウント情報) や`Billing`(請求書に関する) 情報を見ることはできません。これらの情報はアカウントのオーナーだけがアクセス可能です。アカウント関連の記録を修正するのは、オーナーのみの特権です。