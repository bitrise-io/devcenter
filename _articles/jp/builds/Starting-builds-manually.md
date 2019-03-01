---
title: 手動でビルドを開始する
redirect_from:
- "/builds/triggering-builds/starting-builds-manually/"
- "/builds/starting-builds-manually/"
menu:
  builds:
    weight: 2
---
Bitrise上での手動ビルドは、全ての設定がデフォルトのままである場合、文字通り2回のクリックで開始できます。もしデフォルトの設定のままにしたくない、または少なくともデフォルトの設定が何であるかを確認したいという場合は、読み進めてください！私たちがその手順をご案内します。

1. Bitriseにログインして、 [Dashboard](https://app.bitrise.io/dashboard) を開きます。

1. ビルドしたいアプリを選びます。

1. `Start/Schedule a Build` をクリックしてください。

![Start a build](/img/start-build.png)

この時、 __Build configuration__ ウィンドウが開き、ウィンドウ上部の近くにある以下の2つのタブに遷移します：

- __Basic__
- __Advanced__

{% include message_box.html type="note" title="スケジューリングビルド" content="`Schedule this build` オプションを使用すると、特定の時間にビルドが実行されるよう設定できます。詳しくは [our guide](/builds/scheduling-builds/) を読んでください。"%}

### 基本的な設定

__Build configuration__ ウィンドウの中の `Basic` タブを選択すると、3種類のオプションが設定できます：

![Basic config window](/img/basic-config-window.png)

- __Branch__: ビルド対象のブランチです。ビルドが失敗しないよう、ブランチ名が正しく入力されていることを確認してください。1つのブランチのみを指定することができます。プルリクエストがフォークされたブランチから作られている場合は、そのブランチ名を記入してプルリクエストに対するビルドを実行してください。

{% include message_box.html type="important" title="プルリクエストのビルド" content="プルリクエストのブランチにビルドを開始することは、プルリクエストのビルドと同じではありません。プルリクエストのブランチに対して手動で開始したビルドは、そのブランチ上でのコードの状態のみをビルドします。しかし、自動的に実行されたプルリクエストのビルドは、プルリクエストがマージされた後のコードの状態をビルドします。"%}


- __Message__: ビルドメッセージです。特定のコミットにおけるgitコミットメッセージからは、そのコミットのビルドは開始 __しない__ ことに注意してください。

- __Workflow__: この設定は任意です。実行したいワークフローを選択することができます。これはデフォルトではトリガーマップに基づいて決まります。例えば、 `test` ブランチを実行したい場合は、この `test` ブランチは `testing` ワークフローを実行するようにトリガーマップに設定されます。トリガーマップは [ウェブサイト上](/builds/triggering-builds/trigger-code-push) または [アプリのbitrise.ymlから直接](/builds/triggering-builds/trigger-map) のいずれかで設定することができます。

### 高度な設定

__Build configuration__ ウィンドウの中の `Advanced` タブを選択すると、 `Basic` タブでも利用可能な設定に加え、更にいくつかの設定ができます：

![Advanced config window](/img/advanced-window1.png)

- __Git Tag__: 入力されたタグが付けられている、特定のブランチやコミットをビルドします。

- __Commit Hash__: 該当のコミットハッシュを貼り付けることで、特定のコミットをビルドすることができます。このオプションにより、ビルドステータスの更新をgitのホスティングサービスに送信することもできます。

- __Custom Environment Variables__: ビルドに使用するカスタム環境変数を設定します。 `Replace variables in input?` オプションを有効にすることで、入力した値をアサインされた値で置き換えることもできます。入力したカスタム変数が別の環境変数を参照する場合は、これを有効にする必要があるでしょう。

- __Generated cURL command__: Build configurationウィンドウで設定したオプションに基づいて、自動的に生成されたcURLコマンドを表示します。このコマンドはコピー&ペースト可能で、cURLがインストールされていればどのようなプラットフォームからも実行できます。
