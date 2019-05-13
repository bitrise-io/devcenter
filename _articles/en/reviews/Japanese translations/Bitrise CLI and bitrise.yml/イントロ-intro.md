---
title: イントロ (Intro)
redirect_from: []
published: false

---
Bitrise is a collection of tools and services to help you with the development and automation of your software projects, with a main focus on mobile apps.

Bitriseは主にモバイルアプリに特化した、ソフトウェアプロジェクトの開発と自動化をサポートするツールとサービスの集合体です。

Most of this DevCenter describes things related to [bitrise.io](https://www.bitrise.io), the hosted automation service, but the heart of Bitrise is the [open source Bitrise CLI / runner](https://github.com/bitrise-io/bitrise), which is responsible for interpreting the build configuration and executing it.

DevCenter内のほとんどがホストされた自動化サービスである[bitrise.io](https://www.bitrise.io)関連のことについて記述されておりますが、Bitriseの核となる部分はビルド構成やビルド実行についての説明を担う [open source Bitrise CLI / runner](https://github.com/bitrise-io/bitrise)となっています。

This open source runner is referred to as `Bitrise CLI` or `Bitrise`, and **it's a tool which you can install and run on your own Mac/PC!**

このオープンソースランナーは`Bitrise CLI`や`Bitrise`と呼ばれています。そしてご自身のMACやPCでインストール・実行できるツールとなっています！

This section of the DevCenter is dedicated to this runner (`Bitrise CLI`) and the `bitrise.yml` configuration format, **the things described here don't even require a** [**bitrise.io**](https://www.bitrise.io) **account**, the only requirement is that you install the `Bitrise CLI` on your Mac/PC.

このDevCenterのセクションでは、当ランナー (`Bitrise CLI`)と`bitrise.yml`の構成フォーマットについて書かれており、ここで記述されていることに対してはbitrise.ioアカウントは必要ありません。ご自身のMACもしくはPCに`Bitrise.CLI`のインストールが唯一の必要作業となります。

{% include message_box.html type="note" title="Bitrise CLI on bitrise.io" content=" The CLI you can install is exactly the same as what's used on [bitrise.io](https://www.bitrise.io). When a build starts on [bitrise.io](https://www.bitrise.io), a virtual machine is created for the build with the Bitrise CLI preinstalled, and once the virtual machine is ready, the build is performed through the Bitrise CLI. 

インストール可能なCLIはbitrise.io上で使用される全く同じものです。bitrise.ioでビルドが開始される時、プリインストールされたBitrise CLIがビルド用のバーチャルマシンを作成します。バーチャルマシンが準備完了になると、ビルドはBitrise CLIを経由して実行されます。"%}

## Bitrise CLI - the open source, offline, automation runner  
Bitrise CLI ― オープンソース・オフライン・オートメーションランナー 

To run a Bitrise build on your machine, you can install our [open source runner](https://www.bitrise.io/cli) and use the `bitrise` command to execute your _workflows_ locally. It's a great help when you're developing steps, debugging builds, or just want to use Bitrise for _any kind of automation_ on your machine.

あなたのマシンでBitriseビルドを実行するには、Bitriseのopen source runnerをインストールして、ワークフローをローカルで実行するための`bitrise`コマンドを使用します。ステップの開発・ビルドのデバッグもしくはご自身のマシンでいろいろなオートメーションをBitriseで使用してもらえると非常に助かります。

## bitrise.yml - the configuration format  
bitrise.yml ― 構成フォーマット

The configuration format of the `Bitrise CLI` is referred to as `bitrise.yml`, as that's the expected file name the configuration should be saved with.

この`Bitrise CLI`構成フォーマットは`bitrise.yml`と称され、これは構成の保存に必要なファイル名です。

_Technically the CLI can also accept the configuration in JSON format, and the file name can be changed too, but if you save the configuration into a file named_ `_bitrise.yml_`_, you can simply_ `_bitrise run_` _in that directory, without specifying any configuration path, and the CLI will read the configuration from_ `_bitrise.yml_` _automatically._

_技術的にCLIはJSONフォーマットでの構成も使用可能です。ファイル名の変更もできますが、ファイル名_ `_bitrise.yml_`_へ構成を保存する場合、構成パスを指定せずにディレクトリに_`_bitrise run_`_ができ、CLIが自動的に_`_bitrise.yml_`_から構成を読み取ります。_

## Step Library (StepLib)  
ステップライブラリ (StepLib)

The StepLib is the collection of the build steps you can use in your `bitrise.yml`. The steps in the official [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib) are all open source, **you can write your own** too and then share it with others! See the [step-template](https://github.com/bitrise-steplib/step-template) for more information.

StepLibは`bitrise.yml`で使用可能なビルドステップの集合体です。公式の Bitrise StepLibにあるステップは全てオープンソースで、ご自身独自のステップも作成・共有することができます。詳しい情報はstep-templateを参照してください。

You can also create your own Step Library if you want to, but it's usually easier to just reference your steps with their `git clone` URL directly if you don't want to share it with others.

自分のステップライブラリを作成することもできます。けれども、もし他の人とステップの共有を望まない場合、直接`git clone`URLを使ってご自身のステップを参照することで簡単になります。

{% include message_box.html type="note" title="Custom StepLib support in tools" content=" The Bitrise CLI tools can work with custom step libraries, but other tools like the Visual Workflow Editor on [bitrise.io](https://www.bitrise.io) might be limited in functionality for steps not available in the main [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib). 

Bitrise CLIツールはカスタムによるステップライブラリを使っても動作します。しかし、bitrise.io上のVisual Workflow Editorのような他ツールにおいては、メインのBitrise StepLibで利用不可であるステップの機能性が制限される可能性もあります。"%}

If possible, you should share your steps in the main [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib), to help others as well as for the extra reliability the StepLib offers.

可能であれば、メインのBitrise StepLibでのステップをシェアして頂き、他ユーザーを手助けしたり、また同様にStepLibが提供する信頼度の向上にご協力ください。

_Custom StepLibs can also provide fallbacks (alternative download URLs, caches), automatic and preiodic checks etc. to provide the best reliability, but you get all these for free if you use the main Bitrise StepLib._

また、カスタムのStepLibはフォールバック（代替のダウンロードURL・キャッシュ）、最高の信頼性を提供するため自動的かつ定期的にチェックなどを行います。メインのBitrise StepLibをご利用の場合、これら全て無料で利用できます。

### Why to use the StepLib and Steps instead of ad-hoc build scripts?  
ad-hocビルドスクリプトではなくStepLibやStepを使うのはどうしてですか？

Same reason why code libraries / dependencies are awesome:

コードのライブラリ・依存関係が素晴らしい理由はいくつかあります：

You have a code which can be updated independently from other parts, and **you can re-use/share** this between your configurations.

他のパーツから独立的にアップデートが可能なコードをお持ちであれば、構成間で再利用・共有することができます。

**Shared maintenance**: when you use Steps created by others you don't have to maintain the codes, but you can contribute to it if you want to, or create and use your own.

共有されたメンテナンス：他者によって作成されたステップを使用する時、コードを管理する必要はありませんが、ご希望である、または自分用に作成・使用する場合、それに貢献することができます。

**Versioned**: If a new version doesn't work for you, **you can always go back to a previous one**.

バージョン管理：新しいバージョンが動作しない場合、いつでも前のバージョンに戻ることができます。

_We frequently push features as Steps instead of building it into the core tools. This allows faster and versioned iterations, and updating the parts independently. We try to maintain compatibility as much as possible, so older versions can work too, providing a way to upgrade when it's appropriate for you._

Bitriseは核となるツールへのビルドを行う代わりに、ステップとして機能のプッシュを頻繁に行っております。これは高速化とイテレーション作業のバージョン管理や、独立的にパーツのアップデートを可能にします。できるだけ多くの互換性を管理することに努めているので、古いバージョンでも動作します。皆様それぞれに適している場合には、アップグレードする方法を提供します。