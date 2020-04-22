---
published_at:
last_modified_at:
tag: []
title: Bitrise CLI (Bitrise CLI)
redirect_from: []
description: ''
published: false

---
Bitriseはモバイルアプリに特化した、ソフトウェアプロジェクトの開発と自動化をサポートするツールとサービスの集合体です。

当DevCenterのほとんどを[bitrise.io](https://www.bitrise.io)やホスト型自動化サービスに関連した記事で占めていますが、Bitriseの心臓部分は[open source Bitrise CLI / runner](https://github.com/bitrise-io/bitrise) でありビルド構成の解釈や実行を担っています。

このオープンソースランナーは`Bitrise CLI`または`Bitrise`と呼ばれ、**ご自身のMac/PC上でインストールと実行が可能なツールとなっています！**

当セクションでは、ランナー (`Bitrise CLI`) と`bitrise.yml`の構成フォーマットについての詳しい情報が記載されています。**ここで記述されている内容では、**[**bitrise.io**](https://www.bitrise.io)**アカウントを作成する必要はありません**。唯一していただくことは、ご自身のMac/PCに`Bitrise CLI`のインストールです。

{% include message_box.html type="note" title="bitrise.io上でのBitrise CLI" content=" インストール可能なCLIは[bitrise.io](https://www.bitrise.io)で使用されているものと全く同じものです。[bitrise.io](https://www.bitrise.io)でビルドが開始されると、バーチャルマシンがビルド用にプリインストール済みのBitrise CLIを使用して作成されます。バーチャルマシンの準備が整うと、ビルドはBitrise CLI経由で実行されます。"%}

## Bitrise CLI -  オープンソースであり、オフラインで使用可能な、オートメーションランナー

ご自身のマシンでBitriseビルドを開始するには、[open source runner](https://www.bitrise.io/cli)をインストールしてローカルでワークフローを実行する`bitrise`コマンドを使用します。ステップの開発やビルドのデバッグ、もしくは自分のマシンで様々な自動化を行うのにBitriseを使用したい時に、非常に役に立ちます。

## bitrise.yml - 構成フォーマット

`Bitrise CLI`の構成フォーマットは`bitrise.yml`と呼ばれます。`bitrise.yml`は構成の保存に必要なファイル名です。

CLIはJSONフォーマットによる構成も同様に受け付け、ファイル名を変更することもできます。しかし、ファイル名`_bitrise.yml_`へ構成を保存すれば、構成パスの指定を行わずにディレクトリで簡単に `_bitrise run_` を行うことができます。そしてCLIは自動的に `_bitrise.yml_` から構成を読み取ります。

## ステップライブラリ (StepLib)

StepLibとは`bitrise.yml`内で使うことができるビルドステップの集合体です。公式のBitrise StepLibにある全てのステップはオープンソースであり、**自分で独自に書いたり**、他者と共有する事も可能です！詳しくは[step-template](https://github.com/bitrise-steplib/step-template)をご覧ください。

ご自身専用のStep Libraryを作成することもできますが、他者との共有を望まない場合は、ステップの`git clone`URLを使って直接参照する方法のほうがより簡単です。

{% include message_box.html type="note" title="ツール内のカスタムStepLibサポート" content=" Bitrise CLIのツールはカスタムのステップライブラリでも機能しますが、[bitrise.io](https://www.bitrise.io)のVisual Workflow Editor のような他ツールは、メインの[Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib)において機能が制限される可能性があります。"%}

可能であれば、メインの[Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib)内にご自身のステップを共有していただき、他ユーザーのみならずStepLibが提供する信頼性の向上にご協力ください。

カスタムのステップライブラリでは代替物 (代わりのダウンロードURLやキャッシュ) や自動で定期的な点検の提供も行います。

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