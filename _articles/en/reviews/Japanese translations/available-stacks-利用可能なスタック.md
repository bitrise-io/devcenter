---
title: Available Stacks (利用可能なスタック)
redirect_from: []
date: 2019-03-21 14:51:08 +0000
published: false

---
スタック（Stack）とは、仮想マシンのバージョンを示しておりビルド走行に使用します。アプリをBitriseに追加した後、Bitriseが適切なスタックを自動で選択します。Workflow Editorの`Stacks` タブにて変更ができます。

![](/img/stack-selector.png)  
使用したいスタックを選んだら、その選んだスタックについての簡単な説明とリンクを見ることができます。（どんなツールがプリインストールされているか、どのバージョンなのかといった情報を見ることができます。）

{% include message_box.html type="important" title="`Save`ボタンを押すのをお忘れなく！" content=" `Save`ボタンが押されるまで、スタックは使用されることはないのでご注意ください。"%}

## Stack status types　スタック ステータスの種類

| 種類 | 説明 |
| --- | --- |
| Stable| Generally available and expected to be supported for the foreseeable future. Updated when an update for the Stack's primary tool is available. Example: when Xcode 7.3.1 was released, the Xcode 7.3 stack was updated to have 7.3.1 instead of 7.3(.0). In case of Xamarin stacks, the Xamarin updates are applied weekly, during the weekends. 一般的に可視化できる将来性において利用可能でサポートされます。スタックのプライマリーツールが利用可能であるときにアップデートされます。例：Xcode 7.3.1がリリースされたとき、Xcode 7.3のスタックは7.3(.0)に代わって7.3.1にアップデートされます。Xamarinスタックの場合、Xamarinは週ごと（毎週末）にアップデートが行われます。 |
| LTS (Long Term Support) 長期にわたるサポート| No changes (updates) will be made to the stack, except for absolutely crucial changes (for example which affect security), and Bitrise CLI tool updates. Preinstalled tool versions will remain the same, until the Stack is removed from our collection.　スタックにおいては、非常に重要な変更（セキュリティに影響を及ぼす事象など）やBitrise CLI ツールアップデートがない限り変更（アップデート）は行われません。スタックがBitriseのコレクション上から消去されるまでは、プリインストール済みのツールのバージョンもそのまま変わることはありません。 |

## Stack prepare types スタック　準備の種類

| 種類 | 説明 |
| --- | --- |
| pre-booted プリブート | If a Stack is available as pre-booted, and there's enough pre-booted machines with that Stack configuration, your build can start right away, without waiting for the build environment to boot. In case there's no more available pre-booted machine with that Stack configuration, your build will start on an On-Demand configuration. スタックがプリブートされた状態で利用可能で、スタックコンフィギュレーションを使った十分なプリブートされたマシンがあれば、ビルド環境がブートするのを待たずに即座にビルドが開始されます。万が一、スタックコンフィギュレーションを使ったプリブートされたマシンの利用可能領域がない場合、ビルドはオンデマンドコンフィギュレーション上で行われます。 |
| On-Demand　オンデマンド | If a Stack is available as on-demand configuration and there's no (available) pre-booted configuration for the Stack, our system will have to create a virtual machine for your selected configuration when your build starts. This means that your build will be in preparing environment state while the related Virtual Machine is created & booted. For a macOS configuration the boot process usually takes about 1 - 1.5 minutes. The prepare time (of course) is not counted into the build time, it won't affect how long your build can run.　スタックがオンデマンドコンフィグにおいて利用可能でそのスタックにプリブートされたコンフィグがない場合、Bitriseのシステムは、ビルド開始するときに選択されたコンフィグに仮想マシンを作成します。あなたのビルドは、関連した仮想マシンが作成・ブートされる間に環境状態準備中になることを意味します。macOSコンフィグにおいて、ブートはたいてい1分から1分半で完了します。準備時間はもちろんのことビルド時間に含まれていませんので、ビルド走行時間への影響はありません。|

## プリインストール済みのツール

Every time we create or update a Stack we create a "System Report" for it too. The System Reports include the list of preinstalled tools and their version on the stack. The System Report scripts are also open source, so if you want to run it yourself or you want to add another tool / system check, feel free to send us a pull request!

You can find every available stack's System Report on [GitHub](https://github.com/bitrise-io/bitrise.io/tree/master/system_reports).

Bitriseがスタックの作成やアップデートを行う際、”システムレポート”の作成も行っております。そのシステムレポートにはプリインストール済みツールのリストやスタックのバージョン情報が記載されております。システムレポートのスクリプトはオープンソースでもあるので、ご自身で走らせたい場合や他のツール・システムを追加したい場合は、お気軽にプルリクエストをBitriseに送ってください。  
[GitHub](https://github.com/bitrise-io/bitrise.io/tree/master/system_reports)にて全ての利用可能なスタックのシステムレポートを確認することができます。