---
title: Bitriseへの貢献
redirect_from: []
menu:
  main:
    identifier: contributors-main
    weight: 2

---
Bitriseに寄稿するのは簡単です：オープンソースのインテグレーション、ガイド、ブログ等を書いて投稿すれば完了です！このセクションでは技術的な寄稿方法 (新規のStepと独自のプロジェクトスキャナーの作成) に焦点を当てます。

{% include message_box.html type="info" title="コンテンツとコミュニティへの貢献" content="Bitriseのコンテンツ向上に貢献されたい方やコミュニティのディスカッションに参加されたい方は、以下のリンクを参考にしてください：

* [Bitriseのドキュメンテーション内の既存する記事の編集または新規の記事の投稿](https://github.com/bitrise-io/devcenter/)
* [Bitriseのブログを読む](https://blog.bitrise.io/)、またはご自身でブログを書きたい場合は[お問い合わせ](https://www.bitrise.io/contact)ください。
* [機能のリクエスト、問題点の提出、フォーラム内で他メンバーに相談する](https://discuss.bitrise.io/)"%}

## 独自のStepを作成する

Bitriseは200以上のStepをユーザーの皆さまに提供しています。Bitriseが多くのStepを管理していますが、ユーザーコミュニティによりBitriseのStep Library (StepLib)に素晴らしい貢献をしていただきました。誰でもStepを提出することができ、承認されるとオフィシャルBitrise StepLibに寄稿され、他ユーザーも使えるようになります。Stepの作り方をチェックして全世界の開発者に届けましょう：[独自のStepを作成する](/contributors/create-your-own-step/)

## 独自のスキャナを作成する

Bitriseのプロジェクトスキャナは、Bitriseに新規のアプリを追加した際にプロジェクトタイプを検知する仕組みとなっています。この'タイプ'とは、Android, iOS, React Native, Flutterといったアプリ開発に使用されたプラットフォームまたはフレームワークのことを指します。結果に基づいて、自動で構成を作成し、検知されたタイプ用に頻繁に使われるデフォルトのワークフローが最低1つ追加されます。

Bitriseのスキャナはアプリの検知を行わない可能性があります。理由としては、レポジトリで何かが不足している (例: Ionicアプリのconfig.xmlファイルが抜けているなど) 、もしくは、そのタイプのスキャナーがまだBitriseにない場合になります。後述の理由であれば、**マニュアルでアプリを構成する**か、独自のプロジェクト構成を持つ自分用のスキャナを作成することができます：[独自のBitriseプロジェクトスキャナを作成する](/contributors/creating-your-own-bitrise-project-scanner/)