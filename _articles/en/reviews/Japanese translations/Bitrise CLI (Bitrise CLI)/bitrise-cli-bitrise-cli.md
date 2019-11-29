---
tag: []
title: Bitrise CLI (Bitrise CLI)
redirect_from: []
summary: ''
published: false

---
Bitrise is a collection of tools and services to help you with the development and automation of your software projects, with a main focus on mobile apps.

Bitriseはモバイルアプリに特化した、ソフトウェアプロジェクトの開発と自動化をサポートするツールとサービスの集合体です。

Most of this DevCenter describes things related to [bitrise.io](https://www.bitrise.io), the hosted automation service, but the heart of Bitrise is the [open source Bitrise CLI / runner](https://github.com/bitrise-io/bitrise), which is responsible for interpreting the build configuration and executing it.

当DevCenterには、bitrise.ioやホスト型自動化サービスに関連した記事がほとんどですが、Bitriseの心臓部分はopen source Bitrise CLI / runner でありビルド構成の解釈や実行を担っています。

This open source runner is referred to as `Bitrise CLI` or `Bitrise`, and **it's a tool which you can install and run on your own Mac/PC!**

このオープンソースランナーは`Bitrise CLI`または`Bitrise`として参照され、ご自身のMac/PCでインストールと実行が可能なツールとなっています！

This section of the DevCenter is dedicated to this runner (`Bitrise CLI`) and the `bitrise.yml` configuration format, **the things described here don't even require a** [**bitrise.io**](https://www.bitrise.io) **account**, the only requirement is that you install the `Bitrise CLI` on your Mac/PC.

当セクションでは、ランナー (`Bitrise CLI`) と`bitrise.yml`の構成フォーマットについての詳しい情報が記載されています。ここで記述されている内容は、bitrise.ioアカウントを作成する必要はなく、ご自身のMac/PCに`Bitrise CLI`をインストールのみを行う必要があります。

{% include message_box.html type="note" title="Bitrise CLI on bitrise.io　bitrise.io上でのBitrise CLI" content=" The CLI you can install is exactly the same as what's used on [bitrise.io](https://www.bitrise.io). When a build starts on [bitrise.io](https://www.bitrise.io), a virtual machine is created for the build with the Bitrise CLI preinstalled, and once the virtual machine is ready, the build is performed through the Bitrise CLI.

インストール可能なCLIはbitrise.ioで使用されているものと全く同じものです。bitrise.ioでビルドが開始されると、バーチャルマシンがビルド用にプリインストール済みのBitrise CLIを使用して作成されます。バーチャルマシンの準備が整うと、ビルドはBitrise CLI経由で実行されます。"%}

## Bitrise CLI - the open source, offline, automation runner  
Bitrise CLI - オープンソース、オフライン、オートメーションランナー

To run a Bitrise build on your machine, you can install our [open source runner](https://www.bitrise.io/cli) and use the `bitrise` command to execute your _workflows_ locally. It's a great help when you're developing steps, debugging builds, or just want to use Bitrise for _any kind of automation_ on your machine.

ご自身のマシンでBitriseビルドを開始するには、open source runnerをインストールしてローカルで_ワークフロー_を実行する`bitrise`コマンドを使用します。ステップの開発やビルドのデバッグ、もしくは自分のマシンで様々な自動化を行うのにBitriseを使用する際にとても役に立ちます。

## bitrise.yml - the configuration format　bitrise.yml - 構成フォーマット

The configuration format of the `Bitrise CLI` is referred to as `bitrise.yml`, as that's the expected file name the configuration should be saved with.

`Bitrise CLI`の構成フォーマットは`bitrise.yml`と呼ばれます。これは、構成の保存が必要なファイル名です。

_Technically the CLI can also accept the configuration in JSON format, and the file name can be changed too, but if you save the configuration into a file named_ `_bitrise.yml_`_, you can simply_ `_bitrise run_` _in that directory, without specifying any configuration path, and the CLI will read the configuration from_ `_bitrise.yml_` _automatically._

CLIはJSONフォーマットによる構成も可能で、ファイル名を変更することもできます。しかし、ファイル名???へ構成を保存すると、構成パスの指定を行わずにディレクトリで簡単に???を行うことができます。そしてCLIは自動的に???から構成を読み取ります。

## Step Library (StepLib)

The StepLib is the collection of the build steps you can use in your `bitrise.yml`. The steps in the official [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib) are all open source, **you can write your own** too and then share it with others! See the [step-template](https://github.com/bitrise-steplib/step-template) for more information.

StepLibとは`bitrise.yml`内で使うことができるビルドステップの集合体です。公式のBitrise StepLibにある全てのステップはオープンソースで、自分で書くことも他者と共有する事もできます！詳しくはstep-templateをご覧ください。

You can also create your own Step Library if you want to, but it's usually easier to just reference your steps with their `git clone` URL directly if you don't want to share it with others.

ご自身専用のStep Libraryを作成することもできますが、他者との共有を望まない場合は、ステップの`git clone`URLを直接参照するのがより簡単です。

{% include message_box.html type="note" title="Custom StepLib support in tools　ツール内のCustom StepLibサポート" content=" The Bitrise CLI tools can work with custom step libraries, but other tools like the Visual Workflow Editor on [bitrise.io](https://www.bitrise.io) might be limited in functionality for steps not available in the main [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib).

Bitrise CLIのツールはカスタムのStep Libraryで機能しますが、bitrise.ioのVisual Workflow Editor のような他のツールにおいては、メインのBitrise StepLibで使用不可のステップに機能しない可能性があります。"%}

If possible, you should share your steps in the main [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib), to help others as well as for the extra reliability the StepLib offers.

_Custom StepLibs can also provide fallbacks (alternative download URLs, caches), automatic and preiodic checks etc. to provide the best reliability, but you get all these for free if you use the main Bitrise StepLib._

できればメインのBitrise StepLibでステップを共有していただき、他ユーザーのみならずStepLibが提供する信頼性の向上にご協力ください。

### Why to use the StepLib and Steps instead of ad-hoc build scripts?　ad-hoc ビルドスクリプトではなくStepLibとステップを使用するのはなぜですか？

Same reason why code libraries / dependencies are awesome:

コードのライブラリや依存性が素晴らしい理由：

You have a code which can be updated independently from other parts, and **you can re-use/share** this between your configurations.

他のパーツから独立的にアップデートされるコードがあり、自分の構成間でコードを再利用・共有ができます。

**Shared maintenance**: when you use Steps created by others you don't have to maintain the codes, but you can contribute to it if you want to, or create and use your own.

共有済みメンテナンス：他ユーザーによって作成されたステップを使用する際はコードのメンテナンスは必要ありませんが、必要に応じてコード維持に貢献することも可能です。また、独自に作成・使用することもできます。

**Versioned**: If a new version doesn't work for you, **you can always go back to a previous one**.

Versioned バージョン化：新しいバージョンが機能しない場合、それより以前のバージョンへ戻すことも可能です。

_We frequently push features as Steps instead of building it into the core tools. This allows faster and versioned iterations, and updating the parts independently. We try to maintain compatibility as much as possible, so older versions can work too, providing a way to upgrade when it's appropriate for you._

当社はコアのツールへビルドを行う代わりに、ステップとして機能を頻繁にプッシュしています。これは高速でバージョン化のイテレーション、独立的なパーツのアップデートが実現できます。互換性の維持にはできる限り尽力しているので、過去のバージョンでも機能するようになっています。自分の希望するときにアップデートすることができます。