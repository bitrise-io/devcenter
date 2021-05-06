---
changelog: 
last_modified_at: 
title: ビルド
menu:
  main:
    identifier: builds-main
    weight: 14

---
ビルドは、[ステップ](/jp/steps-and-workflows/getting-started-steps)のコレクションであるアプリのワークフローによって指定される一連のジョブです。アプリのビルド設定は[bitrise.yml](/jp/bitrise-cli/basics-of-bitrise-yml)で指定され、[bitrise.io](https://www.bitrise.io/)のグラフィカルワークフローエディタで変更することができます。

ビルドが実行されると、これらのスクリプトがダウンロードされ、ワークフローで定義した順序で、設定した入力パラメータで実行されます。これらのスクリプトは、[環境変数](/jp/builds/available-environment-variables)として設定された定義済みの出力を生成します。

## ビルドトリガー

これらでビルドをトリガーできます。

* アプリケーションのページで `Build` ボタンをクリックする（手動ビルドトリガー）。
* [ブランチと頻度を選択してスケジューリング](/jp/builds/scheduling-builds)する。
* [Webhooks](/jp/webhooks/): 指定されたブランチへの[コード/タグのプッシュ](/jp/builds/triggering-builds/trigger-code-push/)や、[プルリクエスト](/jp/builds/triggering-builds/trigger-pull-request/)の後、自動的にビルドを開始します。
* [Bitrise API](/jp/api/build-trigger/)を使う。

詳細は[ビルドのトリガー](/jp/builds/triggering-builds/triggering-builds-index/)をご覧ください。

## ビルドプロセス

1. [トリガー](jp/builds/triggering-builds/triggering-builds-index/)によってビルドが開始されます。
2. 環境の準備: 仮想マシンがプロビジョニングされ、ビルドを実行するための準備が行われます。ビルド固有の環境変数がプリセットされているので、ステップでこれらを使用することができます。利用可能なスタックの詳細は、ワークフローエディタの**スタック**タブで確認できます。
3. ワークフローの実行: ワークフローのステップは、アプリケーションのワークフローエディタで定義されているのと同じ順序で、上から下へと実行されます。ステップをドラッグして順番を入れ替えることができます。各ステップが生成するログは、ビルドの詳細ページに表示されます。
4. クリーンアップ: ビルドの実行後、ビルドログが作成され、Bitriseサーバーに保存されます。ビルドを実行している仮想マシンは破棄されるため、コードやファイルが悪用されることはありません。

## ビルドの同時実行

ビルドの同時実行数は、同時に実行できるビルド数を意味します。サブスクリプションプランの同時実行数を超えたビルドは、保留中と表示されます。現在進行中のビルドが終了し、ビルドスロットが空いている場合はいつでも開始されます。開発者プランまたは組織プランでは、同時に実行できるビルド数を増やすために、常に[同時実行数を追加購入](https://www.bitrise.io/pricing)することができます。