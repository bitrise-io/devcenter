---
changelog: 
last_modified_at: 
title: ビルドのトリガー(開始)と中断
menu:
  api-main:
    weight: 10

---
Bitrise APIで、アプリのビルド開始と中断を実行することができます。ビルドするためのパラメータを定義できます: 例えば、ブランチ、タグ、またはgitコミット。カスタム環境変数も同様に設定することができます。

## 新しいビルドのトリガー(開始)

| エンドポイント | 機能 |
| --- | --- |
| [POST /apps/{app-slug}/builds](https://api-docs.bitrise.io/#/builds/build-trigger) | 新しいビルドのトリガー(開始)。 |

Bitrise APIで新しいビルドを開始するために `/apps/{APP-SLUG}/builds` エンドポイントをコールします。特定のアプリスラッグを指定することと、少なくとも1つのビルドパラメータをJSONオブジェクトに設定する必要があります:

* gitのタグまたはgitコミットハッシュ
* ブランチ名
* ワークフローID

そのJSONオブジェクトは `bitrise` という値を設定した `type` キーを持つ `hook_info` オブジェクトを必ず持つ必要があります。

これが  `branch` パラメータに _master_ という値を設定した、最小構成のJSONボディです。

    {
      "hook_info": {
        "type": "bitrise",
      },
      "build_params": {
        "branch": "master"
      }
    }

こちらがcurlリクエストの例です:

    curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds" -d '{"hook_info":{"type":"bitrise"},"build_params":{"branch":"master"}}'

上記の例では、アプリの `master` ブランチのビルドを開始します。

{% include message_box.html type="note" title="認証" content="このガイドが使うすべての例は `api.bitrise.io/v0.1/apps/APP-SLUG/builds` エンドポイントを使用しています。このエンドポイントはパーソナルアクセストークンでのみ認証可能です！"%}

{% include message_box.html type="note" title="対話型のcURLコールコンフィギュレータ" content="あなたのアプリ [bitrise.io](https://www.bitrise.io) ページにある `Start/Schedule a build` ボタンを押して表示されるポップアップの中にある `Advanced` モードに移行することで、対話型のcURLコールコンフィギュレータを起動できます。ポップアップの下部にあるボタンであなたが指定したパラメータをベースにした `curl` コールを見ることができます。

**注意 このAPIコールは非推奨の** `app.bitrise.io` **URLと、そのアプリのビルドトリガートークン(このガイドの使用例で使われているパーソナルアクセストークンとは異なる)を使っています。しかしながら他の全てのパラメータは同じ方式で使用できます。**"%}

この例ではJSONペイロードを文字列、正確には、文字列にシリアライズされたJSONオブジェクトとして渡しています。

それをオブジェクトとして渡すこともできます(例えば、JavaScriptからコールしたい場合)。それを実行するためには、ルートに `payload` 要素を持つか、代わりに そのJSONオブジェクトを `payload` POSTパラメータの値として設定してください。

こちらが `payload` パラメータを使ったjQueryの実装例です:

    $.post("https://api.bitrise.io/app/APP-SLUG/builds/", {
        "payload":{
            "hook_info":{
                "type":"bitrise",
            },
            "build_params":{
                "branch":"master"
            }
        }
    })

ビルド開始ときに、いろいろな異なるビルドパラメータを設定することができます。そのパラメータは `build_params` オブジェクトに設定される必要があります: いくつかの使用可能な例を見てみましょう！

### ビルドのためのブランチ、コミット、タグの設定

Git固有のパラメータをAPIコールに設定できます。 `branch` パラメータはビルドするソースブランチを指定します。これはGitコミットのブランチ、またはPRビルドの場合はそのPRのソースブランチのいずれかです。

    curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds" -d '{"hook_info":{"type":"bitrise"},"build_params":{"branch":"master"}}'

特定のgitのコミットまたはgitのtagもビルドできます。`build_params` オブジェクトにコミットハッシュまたはtagを設定するだけです。 `commit_message` パラメータを使うことで、コミットメッセージをその特定のビルドに設定することもできます。

    curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds" -d '{"hook_info":{"type":"bitrise"},"build_params":{"commit_hash":"0000ffffeeeee", "commit_message":"testing"}}'

{% include message_box.html type="note" title="Gitクローン - パラメータの優先順位" content=" `Git Clone` ステップでもし`tag` を使用した場合、 `branch` パラメータは無視されます。

もし `commit_hash` パラメータを使った場合、 `tag` と `branch` パラメータの両方とも無視されます。

その無視されたパラメータはログに残されます。それらはステップのために利用可能で、ビルド詳細ページで確認することができますが、 `Git Clone` ステップはcheckoutするものを最も特定できるパラメータを使います。"%}

### PRビルドのためのパラメータ設定

PRビルドのために、そのマージ先、またはターゲットブランチを設定するために `branch_dest` パラメータを使います。そのPRは将来的にはこのブランチにマージされますが、その前に、BitriseはこのPRが未来にどのようにマージされるかの結果をベースにあなたのアプリをビルドします。例えば、これはwebhookにより自動的にPRビルドが開始されたときに何が起こるかということです。

 `branch_repo_owner` と `branch_dest_repo_owner` パラメータは、そのリポジトリのオーナーを特定するため、またそのPRに関連するブランチを明確に特定するために使われます。

{% include message_box.html type="warning" title="メッセージ" content="`branch_repo_owner` と `branch_dest_repo_owner` パラメータを明確に指定しない場合、APIはPRビルドはフォークされたものと見なします。そのため、手動承認を待つことになるかもしれません: その詳細については、(PRビルドの承認ガイド)[/builds/triggering-builds/approving-pull-request-builds/] を確認してください。 "%}

PR自体を特定するため、 `pull_request_id` パラメータを使用してください。そのパラメータは整数型です。(例: GitHub上のPR番号)

    curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds" -d '{"hook_info":{"type":"bitrise"},"build_params":{"branch": "the-pr-branch", "branch_dest":"master", "pull_request_id": 133, "commit_hash": "fffff000000eeeeee"}}'

もしgitプロバイダ側でサポートされているならば、 `pull_request_merge_branch` パラメータを使ってそのPRのマージ前の状態のブランチをビルドすることも可能です。その代替としては `pull_request_head_branch` パラメータです。そのパラメータはPRのソースブランチを指す特定のgitリファレンスです。

もしあなたのリポジトリのフォークから開かれたPRのビルドをトリガー(開始)したい場合、`pull_request_repository_url` パラメータを使用してください。その値はフォークのURLである必要があります。

### gitステータスレポートのスキップ

もしwebhookの設定をしている場合、Bitriseはあなたのgitプロバイダにビルドのステータスレポートを送ります。しかし `skip_git_status_report` パラメータを使ってAPI経由で無効とすることができます。もしその値が `true` と設定された場合は、ビルドステータスレポートは送信されません。

    curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds" -d '{"hook_info":{"type":"bitrise"},"build_params":{"branch": "the-pr-branch", "branch_dest":"master", "pull_request_id": 133, "skip_git_status_report": "true"}}'

### 環境変数の設定

あなたのビルドに対し、環境変数を追加で設定できます。

[環境変数には優先順位があることに注意してください！](/bitrise-cli/most-important-concepts/#availability-order-of-environment-variables) 追加された変数は `Secrets` と `App Env Vars` の間の優先度に従って管理されます。つまり、あなたのビルド設定(例えばApp Env Vers)で定義された環境変数は上書きすることはできません。Secretsのみ上書きできます。

そのパラメータは**オブジェクトの配列**である必要があります。そしてその全ての配列の要素は少なくとも `mapped_to` プロパティを持つ必要があります。その要素は以下を保持します:

* その環境変数のキー
* その環境変数の値

{% include message_box.html type="note" title="環境変数名の変更" content="デフォルト環境変数の値は、トリガーされたビルド内で、ターゲット環境オブジェクト内の実際の値によって置換されます。この振る舞いは `is_expand` フラグを `false` にすることで無効にできます。"%}

例:

    "environments":[
      {"mapped_to":"API_TEST_ENV","value":"This is the test value","is_expand":true},
      {"mapped_to":"HELP_ENV","value":"$HOME variable contains user's home directory path","is_expand":false},
    ]

### ビルドのワークフローを設定

デフォルトでは、あなたのビルドのためのワークフローは `build_params` の内容と、そのアプリの[実行マップ](/webhooks/trigger-map/)をベースにして選択されます。これは [Webhooks](/webhooks/) が開始マップをベースにして、どのようにワークフローをそのビルドのために自動で選択するかと同様です。

APIを使うことで、 この選択を**上書き**でき、そしてどのワークフローを使いたいかを決定できます。

`build_params` に `workflow_id` パラメータを追加し、特定のビルドに使いたいワークフローを選択します。こちらは `deploy` ワークフローを特定するAPIコールの例です。

    curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds" -d '{"hook_info":{"type":"bitrise"},"build_params":{"branch":"master","workflow_id":"deploy"}}'

## ビルドの中断

| エンドポイント | 機能 |
| --- | --- |
| [POST /apps/{app-slug}/builds/{build-slug}/abort](https://api-docs.bitrise.io/#/builds/build-abort) | 特定のビルドを中断する。 |

実行中のビルドを中断することができ、合わせて中断の理由と同様にそのビルドについてのメール通知を設定することができます。

単純にビルドを中断するために `/apps/APP-SLUG/builds/BUILD-SLUG/abort` エンドポイントをコールします。必須パラメータは、アプリスラッグとビルドスラッグのみです。

    curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds/BUILD-SLUG/abort"

### 中断理由の設定

`abort_reason` パラメータを使うことで、ビルドの中断理由を設定することができます。このパラメータは文字列として設定することができ、あなたのアプリのビルドページに表示されます。

    curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds/BUILD-SLUG/abort" -d '{"abort_reason": "aborted for a reason"}'

通常は、中断されたビルド回数は失敗したビルド回数です。 `abort_with_success` パラメータを使うことで、ビルドを中断しかつそれを成功したビルドとしてカウントすることができます。あなたのgitプロバイダに送信されたステータスレポートは[bitrise.io](https://www.bitrise.io)を通して成功したビルド、 `Cancelled` として表示されます。

    curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds/BUILD-SLUG/abort" -d '{"abort_with_success": true}'

### メール通知のキャンセル

あなたのアプリ設定に従って、ビルドが中断したときにBitriseはメール通知を送信するかもしれません。もし通知が必要ない場合は `skip_notification` パラメータに `true` を設定してください。

    curl -X POST -H "Authorization: ACCESS-TOKEN" "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds/BUILD-SLUG/abort" -d '{"skip_notification": true}'