---
title: ビルドのトリガー
menu:
  triggering-builds:
    weight: 1
---
Bitriseのビルドトリガーには以下のいずれかを選択できます。

- [手動による開始](/builds/triggering-builds/starting-builds-manually/)
- [スケジュールによる開始](/builds/scheduling-builds/)
- トリガーイベントによる開始

BitriseにIncoming Webhooksを設定している場合、指定されたトリガーイベントまたはWorkflowによりビルドを自動的に開始することができます。
また、複数のトリガーを指定したり、トリガーの追加、削除を行うことができます。

デフォルトでは、アプリケーションを登録すると2つのトリガーを持っています。
1つ目は任意のブランチがリポジトリにプッシュされたとき、2つ目は新規のPull Requestが作成されたときです。
これらは自由に変更、削除することができます。

トリガーは`Workflow Editor`の`Triggers`セクションで管理できますが、`bitrise.yml`を直接編集して設定することも可能です。
DevCenterのこのセクションでは、WebサイトのUI上でトリガーを設定および管理する方法について説明します。

- [プッシュをトリガーにする](/builds/triggering-builds/trigger-code-push)
- [Pull Requestをトリガーにする](/builds/triggering-builds/trigger-pull-request)
- [Tagをトリガーにする](/builds/triggering-builds/trigger-git-tags)
- [単一のトリガーで並列ビルドを開始する](/builds/triggering-builds/trigger-multiple-workflows)
- [Gitホスティングサービスにビルド結果を通知する](/builds/triggering-builds/status-reporting)
