---
title: ビルド
redirect_from:
- "/getting-started/builds-and-workflows"
- "/getting-started/builds-and-workflows/"
menu:
  getting-started:
    weight: 4
---
## ビルドとワークフロー

アプリを Bitrise に追加したら、自動的に初回ビルドが開始されます。

*ビルド*は、アプリの[_ワークフロー_](/getting-started/getting-started-workflows)で定められたプロセスであり、またワークフローは[_ステップ_](getting-started/getting-started-steps)の集合です。アプリのビルド設定は[`bitrise.yml` 設定ファイル](/bitrise-cli/basics-of-bitrise-yml)でなされ、その編集は[bitrise.io](https://www.bitrise.io)のグラフィカルワークフローエディター UI 上、あるいは[yaml エディター](http://blog.bitrise.io/2016/02/12/edit-your-yaml-files-like-a-boss.html)上で直接できます。

[ワークフローエディター](/getting-started/getting-started-workflows)のグラフィカル UI 上では、ビルドステップの追加・削除・並び替えができます。ステップは、事前定義された入力値・出力値を伴うスクリプト実行を表します。ステップは、bash・Go・Ruby・Swift などのさまざまな言語で記述できます。

ビルドが実行された際は、これらのスクリプトはワークフローで定義した順番・入力パラメーターにしたがってダウンロード・実行されます。そして、[環境変数](/builds/available-environment-variables)として事前定義された出力を生成します。

CLI・ワークフロー・ステップをどう扱うかについてのより詳細は、[Bitrise CLI と bitrise.yml](/bitrise-cli/)の"under the hood"の節を参照してください。

## ビルドプロセス

1. トリガーとなるもの：
   - アプリページの`Build`ボタン押下（手動ビルドトリガー）
   - [特定のブランチを特定の頻度でスケジュール実行](/builds/scheduling-builds)
   - [webhooks](/webhooks/)（特定のコード・タグの PUSH および特定のブランチへのプルリクエスト後）
   - 提供されている `Build Trigger API`
2. 環境準備：
   仮想マシンのプロビジョニング・ビルド実行の準備をします。
   指定された環境変数をステップで使えるようにプリセットします。
   扱えるスタックのさらなる詳細情報は、ワークフローエディターの`Stack`タブにて確認できます。
3. ワークフローの実行：
   ワークフローのステップは、アプリのワークフローエディターで定義された順番通りに上から下まで実行されます。ステップはドラッグ操作で並び替えできます。
   ビルド詳細ページに、それぞれのステップの出力するログが表示されます。
4. クリーンアップ：
   ビルド実行後、Bitrise サーバーにビルドログが生成・保存され、**仮想マシンは破棄されるため**、あなたのコード・ファイルが悪用されることはありません。

## ビルドの並列数

ビルドの並列数とは、同時に実行できるビルド数を指します。あなたの購読しているプランのビルド並列数を超えるビルドは**on hold**(保留)扱いになります。保留されたビルドは、実行中のビルドが終了してビルド可能枠に空きができると開始されます。いつでも、Developer あるいは Organization (Org Standard あるいは Org Elite)プランを[追加のビルド並列数を購入](https://www.bitrise.io/pricing)して同時に実行可能なビルド数を引き上げることができます。
