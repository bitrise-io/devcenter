---
changelog: 
last_modified_at: 
title: 仮想マシン
menu:
  infrastructure-main:
    weight: 3

---
[bitrise.io](https://www.bitrise.io)には、ビルドがホストされる`macOS`と`Linux`の2つの仮想マシンがあります。複数のスタックから選択することができ、それぞれのスタックにプリインストールされたツールのバージョンリストが確認できます。利用可能なスタック、スタック準備タイプについては[こちら](/jp/infrastructure/available-stacks/)を参考にしてください。

ビルドに使われるユーザーが**パスワードなしのsudo**が有効な状態で構成されると、ビルドや他の自動化作業に必要な追加の全てのものがインストールできるようになります。ツールがスタック上にプリインストールされていないときは、ご自身でインストールすることができます。[あらゆる追加ツールのインストール](/jp/tips-and-tricks/install-additional-tools/)ガイドをご覧ください。

## セキュリティ

全てのビルドは各々の仮想マシンで走り、ビルドが終了すると"base box" 状態と呼ばれる、仮想マシンがセーブされた状態へ引き下げられます。こうすることにより、他のユーザーによる変更や以前のビルドによって**常にビルドは保護されます**。また、_ビルド間の状態が持続しないため_、ビルドワークフローを定義する”**stable environment（安定した環境）**”を使うこともできます。

ビルド/コード セキュリティにについての詳細は[コードセキュリティ](/jp/getting-started/code-security/)ガイドをご覧ください。

## カスタマイズ

Bitriseの[OS X Boxブートストラップレポジトリ](https://github.com/bitrise-io/osx-box-bootstrap)にて、macOSベースボックスセットアップガイド、macOS仮想マシンベースボックスをビルドするのに使用するオートメーションスクリプトを確認することができます。そのレポジトリにはBitriseが使用するベースの仮想マシンイメージを準備する際の全てのスクリプトが含まれています。

Linuxマシンについては、[Bitrise Base Docker Image レポジトリ](https://github.com/bitrise-docker/bitrise-base)をご確認ください。

{% include message_box.html type="note" title="システムレポート" content="  [Bitriseメインレポジトリ内のシステムレポートフォルダ](https://github.com/bitrise-io/bitrise.io/tree/master/system_reports)より、プリインストールされたツールやバージョン情報といった、現在の構成をいつでも確認することができます。レポートはスクリプトによって生成され、レポートの最初の行にリンクされます。 "%}

仮想マシンの準備において使われるレポジトリはオープンソースでもあり、プルリクエストをいつでも歓迎しております。Bitriseのマシンにプリインストールしてほしいツールが有りましたら、お気軽に変更の追加をお願いします。スタックがアップデートされる次回までに、そのツールは関連したスタックに含まれるようになります。

## 仮想マシンのアップデート

[#changelog category of discuss.bitrise.io](https://discuss.bitrise.io/c/changelog) にて常にアップデートについてのアナウンスがされ、あなたの[Bitrise Dashboard](https://www.bitrise.io/dashboard)上にも表示されます。重要な変更がある際には、_Platform Updates_の通知を皆様にお送りします。通知を受け取るには、[アカウント設定ページ](https://www.bitrise.io/me/profile)でこの機能をオンにしておいてください。

### スタックのアップデート

一般的にBitriseはスタックのアップデートを週に一回（週末）に行っております。

現在の仮想マシン環境で比較的小さな問題を検知した場合、アップデートは平日中に行われる場合もあります。以上のアップデートは、プリインストール済みのツールバージョンへ変更が加えられることはありません（必要な場合を除く）。

平日中の変更やアップデートを極力避けるため、リリースされる前にBitriseはできるだけ多くの回数のスタックテストを行います。

## iOSシミュレータ・バージョン & SDK サポート

Xcode -> Preferences -> Componentsよりインストールができる全てのiOSシミュレータ バージョンはインストールされており、利用可能です。