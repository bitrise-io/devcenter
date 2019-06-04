---
tag: []
title: bitrise.ymlのカスタマイズ (Customizing bitrise.yml)
redirect_from: []
summary: ''
published: false

---
`bitrise.yml`の編集が可能なツールであれば、カスタムプロパティを追加することができます。この方法により、特別なプロパティや環境変数にメモを追加したり、`bitrise.yml`でワークフローの新しい構成を試すことも可能です。実行するには正しい場所に、`meta`欄と、keyとvalueが付随したnamespace labelを追加してください。

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

自分の嗜好に合わせた`bitrise.yml`のカスタマイズをすることによりどのような恩恵が受けられるのか、いくつかのユースケースを見ていきましょう：

* If you decide to take your spin on our [open-source Workflow Editor](https://github.com/bitrise-io/bitrise-workflow-editor) and create your own version of it, first you have to fork it! Then you can use it (for example, by adding it to your website) and customize the environment variables (env vars) in the `bitrise.yml` tab. Let's say you want to keep an eye on one of the env vars: when it was last modified and by who. You can place the following `meta` section in `bitrise.yml` to your own version of Workflow Editor.
* Bitriseの[open-source Workflow Editor](https://github.com/bitrise-io/bitrise-workflow-editor)上で開始して自分のバージョンを作成する場合、まず初めに`bitrise.yml`のフォークをする必要があります！その後、使用すること（例：自分のウェブサイトに追加する）ができ、`bitrise.yml`タブ内で環境変数（env vars）のカスタマイズも行えます。ここで、いつ、誰によって環境変数の一つが最後に修正されたのかに注目するとします。ご自身独自のWorkflow Editorへ`bitrise.yml`にある以下の`meta`セクションを配置することができます。

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

このユースケースは、ご自身のカスタマイズされたツールが会社独自のイントラネット内のチームと共有されている、またはソフトウェアによって操作されている場合にのみ適用されます。

* Another use case with `meta` can be if you want to add background color to an env var in your own tool:
* `meta`を使用した他のユースケース；ご自身のツール内でenv varへ背景色の追加を行う場合：

       meta: {
         my_fancy_new_workflow_editor: {
           env_var_background_color: "red"
         }
       }
* You can see `meta` in action on [bitrise.io](https://www.bitrise.io/) as well. For example, when you select a different stack for your workflow than the default stack. Just click Workflow Editor on the UI and pick another stack type for your workflow/s in the `Stacks` tab. This way you can test (only in the UI) how your workflow runs in the new Stack.
* [bitrise.io](https://www.bitrise.io/)上で`meta`が動作しているかの確認も行えます。例えば、デフォルトではなく異なるスタックをワークフロー用に選択する際、UI上のWorkflow Editorをクリックして`Stacks`タブ内からワークフロー用の他のstack typeを選択してください。この方法により新しいスタックにおいてワークフローがどのように作動しているかテスト（UIでのみ）を行えます。

![](/img/stack-os.png)

If you head back to the `bitrise.yml` tab, a `bitrise.io meta` is added to the deploy workflow:

`bitrise.yml`タブに戻ると、`bitrise.io meta`がデプロイワークフローに追加されます：

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

このmetaはbitrise.io上でのみ解釈されローカルまたはBitrise CLIでは解釈されないので、metaは`bitrise.io` namespace（stackがkeyで`linux-docker-android-lts`がvalueになっている場所）にカテゴリー化されています。Workflow Editorは常に保存された変数を有効化し、syntaxエラーがみられるとそのエラーを返します。しかし、`meta`が追加されると、Workflow Editorの検証プロセスによりそのコンテンツ（中身）は完全に無視されます。