---
tag: []
title: bitrise.ymlのカスタマイズ (Customizing bitrise.yml)
redirect_from: []
summary: ''
published: false

---
Any tool that can edit `bitrise.yml` can add custom properties to it. This way you can add special properties or notes to your env vars, or even try new configurations of your workflow in `bitrise.yml`. All  you have to add is add a  `meta` field and a namespace label with key and value to the right place.

`bitrise.yml`を編集できるツールであれば、そのツールにカスタムプロパティを追加することができます。この方法で環境変数に特別なプロパティやメモを追加したり、`bitrise.yml`ワークフローの新しい構成を試すこともできます。適切な場所へキーと値を用いて`meta`欄とnamespace labelを追加してください。

The format you should use is the following:

以下のようなフォーマットを使用してください：

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

Let's see some use cases when you would benefit from customizing `bitrise.yml` to your own liking:

自分好みに`bitrise.yml`をカスタマイズして得られる利点を紹介します：

* 


* If you decide to take your spin on our [open-source Workflow Editor](https://github.com/bitrise-io/bitrise-workflow-editor) and create your own version of it, first you have to fork it! Then you can use it (for example, by adding it to your website) and customize the environment variables (env vars) in the `bitrise.yml` tab. Let's say you want to keep an eye on one of the env vars: when it was last modified and by who. You can place the following `meta` section in `bitrise.yml` to your own version of Workflow Editor.
* Bitriseの[オープンソースWorkflow Editor](https://github.com/bitrise-io/bitrise-workflow-editor)で試すことを決断し自分のバージョンを作成する場合、まずフォークを行ってください！その後使用可能になり (例: ウェブサイトに追加する)、`bitrise.yml`タブで環境変数をカスタマイズすることができます。ある一つの環境変数について (最後に修正したのはいつ・誰などを) 監視するとしましょう。この場合、以下のような`bitrise.yml`内にある`meta`セクションをWorkflow Editorの自分のバージョンへ配置することができます。

       app:
         envs:
         - ASXaS: "`ZX`ZX"
           opts:
             is_expand: false
             meta:
               audit: # used by the Audited Workflow Editor imagenary tool, that works like WFE but saves the modifier and modification date, and displays it
                 last_modified_at: 2018.09.12.
                 last_modifier: Jane Doe

Of course this use case works only if your customized tool is shared with your team in your company's own intranet or if it's handled by some software.

このユースケースは、カスタマイズ済みのツールがご自身の会社のイントラネットでチームと共有されている時、もしくはソフトウェアにより扱われている場合にのみ機能します。

* Another use case with `meta` can be if you want to add background color to an env var in your own tool:
* 自分のツールの環境変数に背景色を追加したい場合の`meta`を使用した他のユースケース

       meta: {
         my_fancy_new_workflow_editor: {
           env_var_background_color: "red"
         }
       }
* You can see `meta` in action on [bitrise.io](https://www.bitrise.io/) as well. For example, when you select a different stack for your workflow than the default stack. Just click Workflow Editor on the UI and pick another stack type for your workflow/s in the `Stacks` tab. This way you can test (only in the UI) how your workflow runs in the new Stack.
* 実行中の`meta`をbitrise.ioでも閲覧が可能です。例えば、デフォルトのスタックではなくワークフロー用に異なるスタックを選択するとします。UI上でWorkflow Editorをクリックし、`Stacks`タブから他のスタックを選択します。これにより、新しいスタックでどのようにワークフローが動くのか (UI上で) テストすることができます。

![](/img/stack-os.png)

If you head back to the `bitrise.yml` tab, a `bitrise.io meta` is added to the deploy workflow:

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

Since this meta is only interpreted on [bitrise.io](https://www.bitrise.io/) and not locally or on Bitrise CLI, it is categorized by a `bitrise.io` namespace (where the stack is the key and `linux-docker-android-lts` is the value). Workflow Editor always validates the saved variable and throws an error if there is a syntax error, but with `meta` added, its content is fully ignored by the Workflow Editor validation process.

このmetaが[bitrise.io](https://www.bitrise.io/)上でのみで解釈され、ローカルもしくはBitrise CLIでは解釈されないため (スタックがキーで`linux-docker-android-lts`が値の)`bitrise.io`のネームスペース別に分類されます。Workflow Editorは常に保存済みの変数を有効化し、シンタックスエラーが発生する場合エラーを投げます。また、`meta`が追加されると、コンテンツはWorkflow Editorの有効化プロセスによって完全に無視されます。