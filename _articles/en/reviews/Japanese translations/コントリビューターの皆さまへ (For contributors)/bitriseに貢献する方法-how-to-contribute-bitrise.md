---
tag: []
title: Bitriseへの貢献 (How to contribute Bitrise)
redirect_from: []
summary: ''
published: false

---
Bitriseに寄稿するのは簡単です：オープンソースのインテグレーション、ガイド、ブログ等を書いて投稿すれば完了です！このセクションでは技術的な寄稿方法 (新規のStepと独自のプロジェクトスキャナーの作成) に焦点を当てます。

{% include message_box.html type="info" title="コンテンツとコミュニティへの貢献" content="Bitriseのコンテンツ向上に貢献されたい方やコミュニティのディスカッションに参加されたい方は、以下のリンクを参考にしてください：

* [Bitriseのドキュメンテーション内の既存する記事の編集または新規の記事の投稿](https://github.com/bitrise-io/devcenter/)
* [Bitriseのブログを読む](https://blog.bitrise.io/)、またはご自身でブログを書きたい場合は[お問い合わせ](https://www.bitrise.io/contact)ください。
* [機能のリクエスト、問題点の提出、フォーラム内で他メンバーに相談する](https://discuss.bitrise.io/)"%}

## Creating your own Step

独自Stepの作成

Bitrise offers well over 200 Steps to our users. We maintain many of them ourselves but our users' community does an outstanding job of contributing to our Step Library (StepLib). Anyone can submit a Step - if approved, it will become part of the official Bitrise StepLib and available to all Bitrise users! Check out how to create your own Step and share it with the world: [Creating your own Step](/contributors/create-your-own-step/).

Bitriseは200以上のStepをユーザーの皆さまに提供しています。そのうちのほとんどをBitriseが管理していますが、ユーザーコミュニティによりBitriseのStep Library (StepLib)において多大なる貢献をしていただきました。誰れもStepを提出することができ、承認されると、オフィシャルBitrise StepLibに寄稿され他ユーザーも使えるようになります。Stepの作り方をチェックして全世界の開発者に届けましょう：独自のStepを作成する

## Creating your own scanner

独自スキャナを作成する

Our project scanner automatically detects the project type whenever you add a new app on Bitrise. In this context, type means the platform or framework used to create the app, for example, Android, iOS, React Native or Flutter. Based on the results, we automatically create a configuration, with at least one default Workflow that contains the most frequently used Steps for the detected type.

Bitriseのプロジェクトスキャナは、Bitriseに新規のアプリを追加した際にプロジェクトタイプを検知する仕組みとなっています。この'タイプ'とは、Android, iOS, React Native, Flutterといったアプリ開発に使用されたプラットフォームまたはフレームワークのことを指します。結果に基づいて、自動で構成を作成し、検知されたタイプ用に頻繁に使われるデフォルトのワークフローが最低1つ含まれます。

Our scanner might not detect your app, for a couple of reasons: either something is missing from your repository (such as a config.xml file in the case of an Ionic app, for example), or we simply don't have a scanner for your type yet. If it's the latter, you can **configure your app manually**, or you can create your own scanner, with its own project configuration: [Creating your own Bitrise project scanner](/contributors/creating-your-own-bitrise-project-scanner/).

Bitriseのスキャナはアプリの検知を行わない可能性があります。理由としては、レポジトリで何かが不足している (例: Ionicアプリのconfig.xmlファイルが抜けているなど) 、もしくは、そのタイプのスキャナーがまだBitriseにない場合になります。後述の理由であれば、**マニュアルでアプリを構成する**か、独自のプロジェクト構成を持つ自分用のスキャナを作成することができます。