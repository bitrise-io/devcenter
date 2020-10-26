---
changelog:
last_modified_at:
tag: []
title: bitrise.ymlのカスタマイズ (Customizing bitrise.yml)
redirect_from: []
description: ''
published: false

---
`bitrise.yml`の編集が可能なツールであれば、そのツールにカスタムプロパティを追加することができます。この方法で環境変数に特別なプロパティやメモを追加したり、`bitrise.yml`ワークフローの新しい構成を試すこともできます。適切な場所へキーと値を用いて`meta`欄とnamespace labelに追加してください。

以下のようなフォーマットを使用しましょう：

    KEY: "VALUE",
    opts: {
      title: "My env var"
      description: "Description of my env var."
      summary: "Summary of env var."
      ...
      meta: {
        custom_namespace_id_1: {
          key1: "value1",
          key2: "value2",
          ...
        }
        custom_namespace_id_2: {
          ...
        }
    }

自分好みに`bitrise.yml`をカスタマイズして得られる利点を紹介します：

* Bitriseの[オープンソースWorkflow Editor](https://github.com/bitrise-io/bitrise-workflow-editor)で自分のバージョンを作成する場合、まずフォークを行ってください！その後、(例えば、ウェブサイトに追加することで) 使用可能になり、`bitrise.yml`タブで環境変数をカスタマイズすることができます。環境変数の一つについて (最後に修正したのはいつ・誰などを) 監視するとしましょう。この場合、以下のような`bitrise.yml`内にある`meta`セクションをWorkflow Editorの自分のバージョンへ配置することができます。

       app:
         envs:
         - ASXaS: "`ZX`ZX"
           opts:
             is_expand: false
             meta:
               audit: # used by the Audited Workflow Editor imagenary tool, that works like WFE but saves the modifier and modification date, and displays it
                 published_at:
last_modified_at: 2018.09.12.
                 last_modifier: Jane Doe

このユースケースは、カスタマイズ済みのツールがご自身の会社のイントラネットでチームと共有されている時、もしくはそのツールがいくつかのソフトウェアによって扱われている場合にのみ機能します。

* 自分のツールの環境変数に背景色を追加したい場合に`meta`を使用した他のユースケース：

       meta: {
         my_fancy_new_workflow_editor: {
           env_var_background_color: "red"
         }
       }
* 実行中の`meta`を[bitrise.io](https://www.bitrise.io/)でも閲覧が可能です。例えば、デフォルトのスタックではなくワークフロー用に異なるスタックを選択するとします。UI上でWorkflow Editorをクリックし、`Stacks`タブから他のスタックタイプを選択します。これにより、新しいスタックでどのようにワークフローが動くのか (UIでのみ) テストすることができます。

![{{ page.title }}](/img/stack-os.png)

`bitrise.yml`タブに戻る場合、デプロイワークフローに`bitrise.io meta`が追加されます。

    {% raw %}
    workflows:
      deploy:
        steps:
        - activate-ssh-key@4.0.3:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - script@1.1.5:
            title: Do anything with Script step
        - npm@0.9.1:
            inputs:
            - command: install
        - install-missing-android-tools@2.2.0:
            inputs:
            - gradlew_path: "$PROJECT_LOCATION/gradlew"
        - android-build@0.9.5:
            inputs:
            - project_location: "$PROJECT_LOCATION"
            - module: "$MODULE"
            - variant: "$BUILD_VARIANT"
        - certificate-and-profile-installer@1.10.1: {}
        - xcode-archive@2.4.14:
            inputs:
            - project_path: "$BITRISE_PROJECT_PATH"
            - scheme: "$BITRISE_SCHEME"
            - export_method: "$BITRISE_EXPORT_METHOD"
            - configuration: Release
        - deploy-to-bitrise-io@1.3.15: {}
        meta:
          bitrise.io:
            stack: osx-xcode-10.1.x
    {% endraw %}

このmetaは[bitrise.io](https://www.bitrise.io/)上でのみで解釈され、ローカルもしくはBitrise CLIでは解釈されないため、(スタックがキーで`linux-docker-android-lts`が値の)`bitrise.io`のnamespace別に分類されます。Workflow Editorは常に保存済みの変数を有効化し、シンタックスエラーが発生する場合エラーを投げます。また、`meta`が追加されると、コンテンツはWorkflow Editorの有効化プロセスによって完全に無視されます。