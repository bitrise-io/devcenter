---
title: トリガーマップを使ったビルドのトリガー
redirect_from:
- "/webhooks/trigger-map/"
- "/webhooks/trigger-map"
menu:
  triggering-builds:
    weight: 12
    title: Triggering builds with the Trigger map

---
１つまたは２つ以上のイベントにwebhookの登録をする際（例：`Code Push` や `Pull Request`イベント）、あなたのソースコードホスティングサービスはwebhookを関連したイベントが発生する度に呼び出します。

[bitrise.io](https://www.bitrise.io)ではwebhookを呼び出すことをtriggers（トリガー）と呼んでおり、異なる`Workflows` へマップされたりされなかったりします。いかなるワークフローへのマップを望まない場合、[bitrise.io](https://www.bitrise.io)はビルドを開始しません。ワークフローへトリガーをマップすれば、ビルドは選択されたワークフロー上で開始されます。

以下の例では、選択されたワークフローIDだけが表示された非常にシンプルなBitriseの構成（`bitrise.yml`）を使用します：

    ---
    format_version: 1.3.0
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    trigger_map:
    - push_branch: "*"
      workflow: primary
    - pull_request_target_branch: "*"
      pull_request_source_branch: "*"
      workflow: primary
    - tag: "*"
      workflow: primary
    workflows:
      primary:
        steps:
        - script:
            inputs:
            - content: |-
                #!/bin/bash
                echo "$BITRISE_TRIGGERED_WORKFLOW_ID"

{% include message_box.html type="info" title="`bitrise.yml`とは何ですか。" content=" `bitrise.yml`はあなたのアプリの構成を表します。workflow editorでは、ウェブUI経由のビジュアル的方法を使った編集も可能ですが、いつでも`bitrise.yml`モード（workflow editorの左側）に切り替えてYAMLフォーマットの構成を確認することができます。同様にYAMLフォーマットでの編集も可能です。ビジュアルウェブUIかYAML(`bitrise.yml`)のどちらかを選んでください。いつでも変更が可能です。（ウェブUIからYAMLに切り替える場合、すぐに`bitrise.yml`に反映されます。逆も同じです。）"%}

上記の例では、`bitrise.yml`はコードプッシュ毎（`push_branch: "*"`）、タグプッシュ（`tag: "*"`）、プルリクエスト毎（`pull_request_target_branch: "*"` & `pull_request_source_branch: "*"`）に`primary` ブランチを選択します。

`trigger_map`リストから_プルリクエスト項目を削除する場合_、プルリクエストがビルドをトリガーする事はなくなります。例：

    trigger_map:
    - push_branch: "*"
      workflow: primary

この構成は`primary`ワークフローを使ってコードプッシュ毎にビルドが開始されますが、それ以外（プルリクエストなど）では何も起こりません。

## `trigger_map`の構成要素

`trigger_map` というのは、_フィルターのリスト_を表しており、一定のフィルターの`workflow`がマッチするトリガーである場合選択されます。

**少なくとも１つ以上のコンディションが全てのフィルター項目の中に含まれていなければなりません！**

これは`workflow`と明記されただけの項目を持つことができないということであり、少なくとも１つのフィルター（`push_branch` / `pull_request_source_branch` / `pull_request_target_branch` / `tag`）が明記されていなければなりません！

### 利用可能なフィルター：

* `push_branch` : コードプッシュイベントの"branch"パラメータの組み合わせ
* `pull_request_source_branch` : プルリクエストイベントの"source branch"パラメータ（プルリクエストが開始されたブランチ）の組み合わせ
* `pull_request_target_branch` : プルリクエストイベントの"target branch" パラメータ（プルリクエストが**マージされる**ブランチ）の組み合わせ
* `tag` : タグプッシュイベントの"tag" （名前）パラメータの組み合わせ
* `pattern` : **非推奨**　ー　このフィルタは `is_pull_request_allowed`との併用で、コードプッシュとプルリクエストイベントの両方で使われていました。現在このフィルタは、新しいフィルタがイベントマッピングにおいてより制御されてるので今は非推奨となっております。

単一項目内で複数のフィルタを定義する場合、その項目のワークフローを選択するために**全てのフィルタがマッチされていないといけません**。例：

    trigger_map:
    - pull_request_target_branch: "master"
      pull_request_source_branch: "develop"
      workflow: primary

これはプルリクエストのソースブランチが`develop`で**且つ**ターゲットブランチが`master`である場合、`primary`ワークフローのみを選択します。

別々に処理されなければならないフィルターを明記したい場合、（例）ソースが`develop`であるプルリクエストでは`primary`を選ぶか、同時に`master`をターゲットするプルリクエストを選びます：

    trigger_map:
    - pull_request_target_branch: "master"
      workflow: primary
    - pull_request_source_branch: "develop"
      workflow: primary

最後に、**同一項目内において**`push_branch`_、_`tag`、`pull_request_..`フィルタを混合させたり、マッチしたりすることはできません。これは事実上、イベントが**同時の**コードプッシュとプルリクエスト（もしくはタグプッシュ）イベントである場合、そのワークフローが選択する必要があることを表します。ソースコードホスティングサービスがプルリクエスト（プリマージ状態）、タグ、そしてコードプッシュイベントで別々のwebhookに送信することはできません。単一のwebhookイベントではコードプッシュ、タグプッシュ、プルリクエストを同時に行うことはできません。一つのwebhookでは常に一種類のみ（コードプッシュ、タグプッシュ、もしくはプルリクエスト）が関連付けられます。

## 単一トリガー = 単一ビルド

トリガー一つにつき、単一のワークフローのみを選ぶことができ、一つのビルドのみを開始することができます。**トリガーにマッチする最初の項目がビルドのワークフローを選択します！**

**２つ以上のワークフローを走らせたい場合**、互いに[ワークフローのチェーニング](/bitrise-cli/workflows/#chaining-workflows-and-reusing-workflows)を行うことができます。チェーンされたワークフローは並行して走ることはありませんが、ワークフローをチェーンすれば全てのワークフローが実行されます。

**項目の順番**にもお気をつけください： `_push_branch: "*"_` 項目の**後**に`push_branch: mast` を明記した場合、`push_branch: master` は選択されることはありません。コードプッシュイベント毎に `push_branch: "*"`が始めにマッチし、**トリガーにマッチする最初の項目はビルドのワークフローを選択します**！

## 単一ブランチのみのビルド方法

単一ブランチのみのビルドをコードプッシュ毎に行いたい（それ以外に何も行わない）場合、ほかのどのワークフローへのマッピングを行わない`trigger_map`（ビルドを行いたいブランチだけ）を明記してください。

例えば、コードプッシュで`master`ブランチのみをビルドしたい場合：

    trigger_map:
    - push_branch: master
      workflow: primary

`feature/`ブランチのみのビルドを行いたい場合：

    trigger_map:
    - push_branch: feature/*
      workflow: primary

２つ同時にする場合：

    trigger_map:
    - push_branch: master
      workflow: primary
    - push_branch: feature/*
      workflow: primary

この構成は`master`か`feature/`ブランチのどちらかで発生するコードプッシュ毎にビルドが開始され、両方で同じワークフロー(`primary`)を使用します。

ご自身の`master`ブランチにおいて異なるワークフローを使用したい場合、トリガーマップ項目の`workflow:`を変更してください。

    trigger_map:
    - push_branch: master
      workflow: deploy
    - push_branch: feature/*
      workflow: primary

この構成では、`master`上においてコードプッシュ毎にワークフロー`deploy`を使用し、`feature/`ブランチ上のコードプッシュ毎にワークフロー`primary`を使用します。**他のビルドは開始されません。**

## 簡単で２つのワークフローのCI/CDセットアップ

ベースとなるCI/CDセットアップは２つのワークフローを伴います。一つがintegration tests（インテグレーションテスト）で、もう一方はdistribution（配布）になります。

インテグレーションテストを行うワークフロー`primary` 、デプロイ/配布を行うワークフロー`deploy`をお持ちで（`deploy`ワークフローを使用せずに）、`master`ブランチ以外でのでコードプッシュやプルリクエストのインテグレーションテストをブランチ毎で行いたい場合：

    trigger_map:
    - push_branch: master
      workflow: deploy
    - push_branch: "*"
      workflow: primary
    - pull_request_target_branch: "*"
      workflow: primary

{% include message_box.html type="warning" title="項目の順番にご注意ください！" content=" `bitrise`がwebhookイベント（どんな種類でも）を受理する時、アプリの`trigger_map`に対してマッチします。**マッチする最初の項目がビルドのワークフローを選択します！**

これは`push_branch: \"*\"` 項目の**後**に`push_branch: master`を明記することで、コードプッシュイベント毎に始めに `push_branch: \"*\"`  がマッチするので、`master`が選択されることはありません。"%}

## 同一レポジトリからプルリクエストによる２つのビルドを開始しないでください

同じレポジトリ（forkからではなく、レポジトリのブランチから）からプルリクエストを開始するとき、**ソースコードホスティングサービスは２つのwebhook**（コードプッシュとプルリクエスト）**を送信します**。

{% include message_box.html type="important" title="Pull Request buildプルリクエストのビルド" content=" 両方のビルドが同じように思えますが、本当はそうではありません。ビルド毎のコードプッシュイベントでは、マージなどすることはなく、ブランチのコードをビルドします。ブランチからチェックアウトするときに、アナラがお持ちの全く同じ状態のコードをビルドします。一方で、プルリクエストのビルドは\\”プリマージ\\”状態のコードのビルドも行います。この\\”プリマージ\\”状態とは、コードの最終的なマージされたバージョンではなく、プルリクエストをマージした**後**に表示されるであろうコードのクローンのようなものを表します。"%}

プルリクエストにおいて、両方もしくは一つだけのビルドを行う場合はプロジェクトの必要条件次第となりますが、`bitrise`を使用すると、それを行うかどうかを決めることができます。

{% include message_box.html type="note" title="プルリクエストのマージはコードプッシュのことです。" content=" ソースコードホスティングサービスはコードプッシュイベントとしてイベント\\”マージ\\”を処理します。例えば、`feature/a`から`master`へプルリクエストをマージする場合、PRをマージすると`master`へのコードプッシュが生成されます。"%}

`master`をデプロイすることに加えて、プルリクエスト（”プリマージされた”）イベント/状態のみのビルドを行う一例：

    trigger_map:
    - push_branch: master
      workflow: deploy
    - pull_request_target_branch: "*"
      workflow: primary

プルリクエストのビルドを開始せずにコードプッシュイベントのみを開始する際の一例：

    trigger_map:
    - push_branch: master
      workflow: deploy
    - push_branch: "*"
      workflow: primary

## ３つのワークフロー：テスト、stagingのデプロイ、productionのデプロイ

他の共通のCI/CDパターンには３つのワークフローが存在します：

* プルリクエスト毎に走るTest workflow（テストワークフロー）は`feature/`ブランチ上などでのコードプッシュ毎にそのテストがリリース（ブランチ）へ統合されるかどうかをテストします。
* Staging Deployment Workflowは内部/テストシステムへアプリ/コードのデプロイを行います。例：
  * iOSアプリの場合の例としては、IPAへ署名したAd Hocが、テスターチームがダウンロードしたりテストを行うHockeyAppへデプロイされる、もしくは、内部テスト用のiTunes Connect/Testflightへのデプロイとなります。
  * Androidアプリの場合、Google Playから"beta"トラックへのデプロイとなります。
  * サーバーコードの場合の例としては、Staging Herokuサーバーへのデプロイとなります。
* Production deployment workflowはアプリ/コードをProductionへデプロイします。
  * iOSアプリの場合、IPAへ署名したApp StoreがiTunes Connect/TestFlightへデプロイされ、”外部テスト”で有効化されます。
  * Androidアプリの場合、Google Playへのアプリの公式アップデートとしてのデプロイとなります。
  * サーバーコードの場合の例としては、production Heroku サーバーへのデプロイとなります。

`primary`（テスト）、`deploy-to-staging`、`deploy-to-production`の３つのワークフローがあることがわかりました。３つのトリガーを明記することで正しいトリガーに正しいワークフローを選択することができます。

２つの類似したアプローチもありますが、これはご自身が選ぶproduction デプロイのブランチのタグ次第となります。

### productionデプロイをトリガーするタグの使用

    trigger_map:
    - tag: v*.*.*
      workflow: deploy-to-production
    - push_branch: master
      workflow: deploy-to-staging
    - push_branch: "*"
      workflow: primary
    - pull_request_target_branch: "*"
      workflow: primary

このトリガーマップ構成はビルドをトリガーします。

* 新しいタグ（フォーマット `v*.*.*`,  `v1.0.0`を使用）がプッシュされた場合の`deploy-to-production`ワークフローを使用するとき
* コードプッシュが`master`ブランチ上で発生する場合の`deploy-to-staging`ワークフローを使用するとき
* 他のブランチ全般・プルリクエストの`primary`ワークフローを使用するとき

### productionデプロイをトリガーするブランチの使用

    trigger_map:
    - push_branch: master
      workflow: deploy-to-production
    - push_branch: develop
      workflow: deploy-to-staging
    - push_branch: "*"
      workflow: primary
    - pull_request_target_branch: "*"
      workflow: primary

このトリガーマップ構成はビルドをトリガーします：

* `master`ブランチ上でコードプッシュが発生する場合の`deploy-to-production`を使用するとき（例：`master`へgit flow リリースブランチをマージしたとき）
* コードプッシュが`develop`ブランチ上で発生する場合の`deploy-to-staging`を使用するとき（例：プルリクエストが`develop`ブランチへマージされる時）
* 他のブランチ全般・プルリクエストの`primary`ワークフローを使用するとき

## プルリクエストのみでビルドを行う方法

プルリクエストのインテグレーションテストだけを走らせたい場合、以下のようなトリガーマップ構成を使用できます：

    trigger_map:
    - pull_request_target_branch: "*"
      workflow: primary

これによりプルリクエスト毎に`primary`ワークフローが選択され、それ以外のビルドは開始されません。

`master`へマージされるようにターゲットされたプルリクエストのビルドのみを行いたい場合、構成は以下のようになります。

    trigger_map:
    - pull_request_target_branch: master
      workflow: primary