---
title: 秘密と環境設定
menu:
  builds-main:
    weight: 18

---
すべての秘密環境変数（secret env var）は環境変数ですが、すべての環境変数（env var）が秘密環境変数ではありません。

## 環境変数について

ワークフローエディターの`Env Vars`タブで、キーと値を使用して環境変数を設定できます。アプリに登録されているすべての環境変数のコレクションです。環境変数は、特定のワークフローに設定されない限り、ワークフローのどのステップでも必要なだけ参照できます。

[ステップ入力に変数を挿入する方法について](https://youtu.be/atuP_1KN41Q)のYouTubeチュートリアルをチェックしてください！

ワークフローのステップ入力フィールドの横にある`insert variabl`をクリックすると、`insert variabl`ポップアップウィンドウから適切な環境変数を選択できます。対話型リストには、`Env Vars`タブで設定した使用可能なすべての環境変数と、ワークフローの前の手順ですでに作成されたものが表示されます。例として、ワークフローの3番目のステップの入力をクリックすると、`Insert variable`リストには、最初と2番目のステップで作成されたすべての環境変数（出力）と、`Env Vars`に登録したものが含まれます。リストには、4番目、5番目、6番目のステップで作成されるものは表示されません。

`Env Vars`で変数を新しいものに置き換えることもできます。古い値を削除して新しい値を設定してください。入力の`Replace variables in inputs`を右側に切り替えると、新しい値がワークフローのあらゆる場所で使用されます。

{% include message_box.html type="important" title="秘密を守ります" content="[秘密の環境変数](#about-secrets/)とは反対に、環境変数はプルリクエストによって引き起こされるビルドで公開されているので、どんな機密情報も`Env Vars`に追加しないでください。"%}

### 特定のワークフローごとに環境変数を設定

`App Environmental Variables`の下に、**全てのワークフロー**で後に使用するすべての環境変数を設定できます。

![Screenshot](/img/builds/app-env-var.png)

ワークフローの環境変数を別々に設定することもできます。**特定のワークフロー**でのみ使用される変数で環境変数を設定したい場合は、リストからそれぞれのワークフローを選択して環境変数を追加します。このリストは、アプリに付けたワークフローから構成されています。 （以下のこの例では、アプリには`deploy`、 `primary` 、`dummy`のワークフローがあります。）

![Screenshot](/img/builds/workflow-env-var.png)

Bitrise CLIとbitrise.ioで公開されている[利用可能な環境変数](/builds/available-environment-variables/)のリストをチェックしてください。

## `Secrets`について

秘密の環境変数は暗号化されたフォーマットで情報を隠す特別なタイプのもので、個人の入力がbuild logs / bitrise.ymlで表示されないようにします。シークレット環境変数は、ワークフローエディタの`Secrets`タブで環境変数キーと変数を追加することで設定できます。

### 秘密の環境変数を追加

Bitriseの `Secrets`タブを使ってワークフローに秘密の環境変数を追加することができます。

1. `Secrets`タブの`Add new`をクリックします
2. `key`と`value`フィールドを設定します。

![](/img/locked-secret.png)

[ステップ](/builds/sensitive-input-field/#set-a-sensitive-input-in-a-step/)の`SENSITIVE`入力に秘密の環境変数を直接追加することもできます。

### 秘密の環境変数を編集

`Secrets`タブに新しい秘密の環境変数を追加すると、いつでも使うことやコンテンツ変更が可能で、奇異の目から保護することができます。

1. 秘密環境変数の値の横にある`Edit`をクリックします。
2. 必要に応じて内容を変更します。
3. 値を非表示にする場合は、`Make it protected`をクリックするとロックが表示されます。
4. 必要ない場合は、秘密環境変数を`Delete`します。Deleteを押すと、行全体が削除されます。

{% include message_box.html type="important" title="`Make it protected`後" content=" `Make it protected`クリックした場合、**あなた、またアプリへのアクセス権を持つユーザーもロックを解除したり値を確認したりすることはできません。**

![](/img/make-it-protected2.png)

この変更は元に戻すことができないため、変更を保存する前に確認のポップアップウィンドウが表示されます。

![](/img/make-it-protected.png)" %}

`eye`アイコンで環境変数の値を**表示**したり**隠し**たりすることができます。この機能は、`Secrets`に秘密環境変数のロングリストがある場合、また、他の値を隠したまま1つの秘密環境変数の値だけをチェックしたい場合に便利です。値が隠されている場合、`crossed out eye`アイコンで表されます。

![](/img/hidden-value-1.png)

入力の`Replace variables in inputs`を右側に切り替えると、新しい値がワークフローのいたる場所で使用されます。

PR内のビルドログに秘密を公開する場合は、`Expose for Pull Request`トグルを有効にできます。

{% include message_box.html type="important" title=" `SENSITIVE`ラベルについて" content="公開アプリの場合、機密情報を含むステップ入力フィールドは`SENSITIVE`ラベルでマークされているため、秘密環境変数しか使用できません。また`Expose for Pull Request`トグルはデフォルトで無効になっており、公開されているビルドログには秘密を隠したままにしておく必要があるため有効にすることはできません。"%}

Head over to [Secrets](/bitrise-cli/secrets/) for more information on [secret filtering](/bitrise-cli/secrets/#secret-filtering-with-bitrise-cli/).

[シークレットフィルタリング](/bitrise-cli/secrets/#secret-filtering-with-bitrise-cli/)詳細については、「[Secrets](/bitrise-cli/secrets/)」から確認してください。