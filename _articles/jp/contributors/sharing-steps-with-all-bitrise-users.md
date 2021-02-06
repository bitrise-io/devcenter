---
changelog: 
last_modified_at: 
tag:
- steps
- " contributors"
- " bitrise.yml"
- workflows
title: 全てのBitriseユーザーにStepを共有する
redirect_from: []
summary: あなたのステップが他の人に役立つと思うなら、あなたはそれを共有することができます！bitrise shareコマンドを使用して手動で行うことができます。Stepプラグインを使用してStepを作成した場合は、Stepのディレクトリでshare-this-stepワークフローを実行できます。
menu:
  contributors-main:
    weight: 6
    title: 全てのBitriseユーザーにStepを共有する

---

あなたのStepが他の人に役立つと思うなら、あなたはそれを共有することができます！ただし、その前に同じ問題を解決する他の手順がないことを確認してください。こちらで確認できます：

* [リリースされたStepのリスト](https://www.bitrise.io/integrations/steps)。
* StepLibの [オープンなプルリクエストのリスト](https://github.com/bitrise-io/bitrise-steplib/pulls)。
* StepLibの[クローズドなプルリクエストのリスト](https://github.com/bitrise-io/bitrise-steplib/pulls?q=is%3Apr+is%3Aclosed)。

特定の機能が不足しているStepを見つけた場合は、その機能の新しいStepを開発または共有する前に、そのStepに貢献してみてください。[インテグレーションページ](https://www.bitrise.io/integrations/steps)で、BitriseのStepLibのStepを検索できます。特定のStepのページでGitHubソースボタンをクリックすると、ステップのリポジトリに移動します。ここで、機能リクエストを送信したり、プルリクエストを開いたりできます。

また、共有されたStepは積極的にメンテナンスをする必要があり、貢献者に開かれている必要があることに注意してください。

## 新しいStepを共有する

共有プロセスは比較的わかりやすいですが、新しいステップを共有するときはプロセスを慎重に実行するようにしてください。

{% include message_box.html type="important" title="bitrise shareコマンド" content="Step開発中は、bitrise shareコマンドを実行するだけでいつでもヘルプを得ることができます。これにより、共有に関する短いガイドが表示されます。"%}

Stepを共有する方法は2つあります。

* `bitrise share` コマンドを使用して、手動で行うことができます。
* Stepプラグインを使用してStepを作成した場合は、Stepのディレクトリで `share-this-step` ワークフローを実行できます。

### 始める前に

始める前に、次のことを確認してください。

* あなたのStepはGitリポジトリで公開されています。
* step.ymlファイルには、有効な課題管理システム（たとえば、StepのGitHubリポジトリの **Issue** ページ）を指すsupport_urlプロパティが含まれています。
* step.ymlファイルには、あなたのリポジトリの正しいGit URLを表すsource_code_urlプロパティが含まれています。

{% include message_box.html type="important" title="複数のStepを共有する" content="複数のステップを共有する（つまり、Bitrise StepLibに複数の新しいstep.ymlファイルを追加する）ことは、別々のプルリクエストで行う必要があります！複数の新しいステップを含むプルリクエストを作ることはできません。"%}

準備ができたら、好みの共有プロセスに進んでください。

### bitrise shareコマンドで共有する

1. [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib.git)リポジトリをフォークします。
2. 共有のためにForkしたStepLibをローカルに準備します。

       $ bitrise share start -c <https://github.com/[your-username]/bitrise-steplib.git>
3. Stepバージョンタグをあなたのリポジトリに追加します。
4. StepをフォークしたStepLibのリポジトリに追加します。

       $ bitrise share create --tag [step-version-tag] --git [step-git-uri].git --stepid [step-id]
5. 必要に応じて、フォークしたStepLibで仕上げのヘルスチェックを実行します。

       $ bitrise share audit -c <https://github.com/[your-username]/bitrise-steplib.git>
6. Stepのstep.ymlファイルを確認し、問題がなければ共有プロセスを完了します。

       $ bitrise share finish

   これにより、step.ymlファイルがコミットされてフォークしたStepLibリポジトリにプッシュされます。
7. 公式の[Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib.git)リポジトリでプルリクエストを開きます。

### share-this-stepワークフローでの共有

share-this-stepワークフローは、新しいStepを作成するときにStepプラグインが自動的に生成するbitrise.ymlファイルに含まれています。それを使用すると、ステップの共有は非常に簡単です。

1. [Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib.git)リポジトリをフォークします。
2. 必要なワークフロー環境変数をbitrise.ymlファイルのアプリレベルの環境変数として設定します。

       app:
         envs:
         - BITRISE_STEP_ID:
         - BITRISE_STEP_VERSION:
         - BITRISE_STEP_GIT_CLONE_URL:
         - MY_STEPLIB_REPO_FORK_GIT_URL:
3. Bitrise CLIでshare-this-stepワークフローを実行します。

       $ bitrise run share-this-step

### StepLibプルリクエストのIssueの修正

StepバージョンをStepLibに送信したら、Bitriseチームがレビューするのを待ちます。変更を求める場合は下記の手順に従ってください。

1. プルリクエストを閉じます。
2. Bitrise StepLibのフォークから共有ブランチを削除します。
3. StepリポジトリのIssueを修正します。
4. Stepリポジトリの修正を含むコミットに新しいバージョンタグを追加します。
5. [共有プロセス](/jp/contributors/sharing-steps-with-all-bitrise-users/#sharing-a-new-step)を再度実行します。

Issueを修正した後、プルリクエストをマージして、Stepを一般に公開できるようになることを願っています。

## 放棄されたステップ

あなたがStepのメンテナである場合、誰かがあなたのステップにIssueまたはプルリクエストを提出した場合、あなたは合理的な時間枠内に連絡可能であるはずです。Stepの重要な修正/更新に関して何度か連絡を試み、数週間回答を拒否した場合、私たちはコレクションからあなたのStepを非推奨、削除、または置き換える可能性があります。放棄されたステップは、それを使用する人にとって脅威となる可能性があります。Stepを他の人と共有する場合は、このことに注意してください。

Bitrise StepLibにあるstep.ymlにリポジトリへのパーマネントリンクが含まれているため、リポジトリと課題管理システムを削除しないでください。それらが削除されたとしても、すでに共有されているStepは、共有プロセス中にBitriseのマネージドファイルホスティングサービスでも共有されるため、引き続き機能します。Stepの新しいバージョンがリリースされ、Bitriseによって管理される可能性もあります。

Stepを共有したが、それを維持することができなくなった、または維持する意思がなくなった場合は、次のリポジトリにIssueを作成してください：[https://github.com/bitrise-io/bitrise-steplib](https://github.com/bitrise-io/bitrise-steplib "https://github.com/bitrise-io/bitrise-steplib")!

## Stepの問題の報告

利用しているStepに重大な（セキュリティまたは機能的な）問題がある場合は、Stepの問題管理システムでチケットを作成してください。すべてのStepで、`support_url` 属性を使用して問題を報告するための推奨される方法を宣言しています。

Stepのメンテナから長期間（数週間以上）応答がない場合は、次のリポジトリにGitHubのIssueを作成してください：[https://github.com/bitrise-io/bitrise-steplib](https://github.com/bitrise-io/bitrise-steplib "https://github.com/bitrise-io/bitrise-steplib")。私達は放棄されたStepのポリシーに従って、問題の解決を試みます。このStepに貢献するすべての人が、あなたが使用するStepを提供することによってあなたの助けになっていることを覚えておいてください！