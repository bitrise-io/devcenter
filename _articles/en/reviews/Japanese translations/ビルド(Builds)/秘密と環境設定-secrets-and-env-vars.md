---
title: 秘密と環境設定(Secrets and Env vars)
redirect_from: []
date: 2019-04-02 15:04:24 +0000
published: false

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

Check out our list of [Available Environment Variables](/builds/available-environment-variables/) exposed by Bitrise CLI and bitrise.io.

## About `Secrets`

Secret env vars are special type of env vars as they hide information in an encrypted format so that your private input is not exposed in the build logs/bitrise.yml. Secret env vars can be set by adding the env var key and the variable in the `Secrets` tab of the Workflow Editor.

### Adding a secret env var

You can add a secret env var to your workflow using our `Secrets` tab.

1. Click `Add new` on the `Secrets` tab.
2. Set the `key` and `value` fields.

![](/img/locked-secret.png)

You can also add a secret env var directly in a [step's](/builds/sensitive-input-field/#set-a-sensitive-input-in-a-step/) `SENSITIVE` input.

### Editing a secret env var

Once you've added a new secret env var in the `Secrets` tab, you come back to it any time, modify its content or make it protected from curious eyes!

1. Click `Edit` next to the value of  your secret env var.
2. Modify its content if needed.
3. If you want to hide the value, click `Make it protected`. A lock is shown.
4. `Delete` the secret env var if you do not need it any more. Please note if you hit this button, the whole row will get deleted.

{% include message_box.html type="important" title="Life after `Make it protected` " content=" Please note if you clicked this button, **neither you nor anybody with the access to the app can unlock or check the value again**.

![](/img/make-it-protected2.png)

Since this change is irreversible, a confirmation pop-up window will be displayed prior to saving your changes.

![](/img/make-it-protected.png)" %}

You can **show** and **hide** the value of an env var with the `eye` icon. This feature is useful if you have a long list of secret env vars in `Secrets` and you wish to check the value of only one secret env var while leaving the other values hidden. If a value is hidden, it's represented with the `crossed out eye` icon.

![](/img/hidden-value-1.png)

If you toggle the `Replace variables in inputs` to the right, the new value will be used everywhere in your workflow.

The `Expose for Pull Request` toggle can be enabled if you want your secrets to be exposed in your build logs in PRs.

{% include message_box.html type="important" title="About `SENSITIVE` label" content=" In the case of [public apps](/adding-a-new-app/public-apps/), step input fields containing sensitive information are marked with a `SENSITIVE` label and only secret env vars can be used there! The `Expose for Pull Request` toggle is by **default disabled** and cannot be enabled since your secrets must be kept hidden in publicly accessible build logs! "%}

Head over to [Secrets](/bitrise-cli/secrets/) for more information on [secret filtering](/bitrise-cli/secrets/#secret-filtering-with-bitrise-cli/).