---
title: 公開アプリの機密インプット (Sensitive input in public apps)
redirect_from:
- sensitive-input-field/#set-a-sensitive-input-in-a-step/
- "/sensitive-input-field/"
date: 2019-04-05 09:47:01 +0000
published: false

---
Any sensitive information such as passwords, IDs, and API tokens are exposed in the build logs/bitrise.yml of your public apps, hence visible to anyone who has the build URL of the app. You can hide these inputs with **secret environment variables (env vars)** so that those are not available in build logs/bitrise.yml. To make the sensitive input fields obvious in our Workflow Editor, we've marked them with a yellow `SENSITIVE` label in steps holding sensitive input fields. **These inputs must be defined with the help of secret env vars and not with env vars!**

You can hide any input of your choice with secret env vars even if the field is not labeled `SENSITIVE` but **you must use secret env vars for fields which are by default marked as** `SENSITIVE`.

パスワード、ID、APIトークンなどの機密情報は公開アプリのビルドログ・bitrise.ymlで表示されるので、そのアプリのビルドURLを持っている人なら誰でも見ることができてしまいます。こういった場合、**シークレット環境変数（secret env vars）**を使って隠すことができるので、ビルドログ・bitrise.yml内でも秘密にすることができます。BitriseのWorkflow Editor内で機密インプット欄を見やすくするため、機密インプット欄が存在するステップに黄色で`SENSITIVE`ラベルがマークされています。**これらのインプットはenv vars（環境変数）ではなくsecret env vars（シークレット環境変数）のヘルプを使って定義されないといけません。**

`SENSITIVE`のラベルがなくてもシークレット環境変数を使ってどのインプットでも隠すことができますが、`SENSITIVE`**とデフォルトでマークされている欄には必ずシークレット環境変数を使用しなければなりません。**

![Screenshot](/img/builds/sensitive-label.png)

There are two ways to define secret env vars:

シークレット環境変数を定義する２つの方法があります：

* directly [in the steps](/sensitive-input-field/#set-a-sensitive-input-in-a-step/)
* in the [Secrets tab](/builds/env-vars-secret-env-vars#about-secrets) of your Workflow Editor and select the secret env var in a step input when needed.
* ステップ内で直接行う
* Workflow EditorのSecret Tab内にて必要なときにステップインプットのシークレット環境変数を選択する

Head over to [Secrets and Env Vars](/builds/env-vars-secret-env-vars/) to find out the difference between `Env Vars` and `Secrets`!

`Env Vars`と`Secrets`の違いについては[こちら](/builds/env-vars-secret-env-vars/)をお読みください！

## Set a sensitive input in a step　ステップ内で機密インプットの設定

1. Click the `Select Secret Variable` button below the input field which is marked with the yellow `SENSITIVE` label.

   黄色で`SENSITIVE`とマークされたインプット欄の下にある`Select Secret Variable`をクリックします。
2. In the `Insert variable` pop-up, browse the `Choose Secret Env Var` list or create a new secret env var (add the key and the value) in the `Create New Secret Env Var` section.

   `Insert variable`ポップアップ内で、`Choose Secret Env Var`リストをブラウズするか、`Create New Secret Env Var`セクションで新しいシークレット環境変数（キーと値を追加する）を作成してください。

   ![](/img/insert-variable.png)

   The `Expose for pull request?` toggle under the `Value` field is by default disabled and cannot be enabled with public apps to **protect the secrets of your public app in the case of pull requests**.

   `Value`欄の下にある`Expose for pull request?`トグルはデフォルトで無効になっており、**プルリクエストをする場合に備えて公開アプリの機密情報を保護するため**、公開アプリでは有効化できません。
3. If you've entered a new env var, hit `Add new`.

   新しい環境変数の入力を終えたら、`Add new`をクリックしてください。

The new secret env var will be available in the `Choose Secret Env Var` list or under the `Secrets` tab for your app for future reference/use.

The selected or newly created secret env var will get automatically saved into the input field of the step.

You can always modify the secret env var registered for a `SENSITIVE` input field if you click the `Select secret variable` button or head over to the `Secrets` tab where you get a full list of your secret env vars.

新しいシークレット環境変数は、アプリを今後参照・使用するのに`Choose Secret Env Var`リスト、または`Secrets` タブの下から確認できます。

選択されたまたは新しく作成されたシークレット環境変数はステップのインプット欄へ自動的にセーブされます。

![](/img/secrets-email.png)

{% include message_box.html type="important" title="`Select secret variable`" content=" Note that you cannot modify the input manually in the input field marked with the `SENSITIVE` label! Instead, click the `Select secret variable` to **replace** the existing input with another secret env var from the list or to **create a new one** in the `Insert variable` pop-up. "%}

* **Do not add private information in the** `Env Var` **tab**! Our `Secrets` tab is designed to hold encrypted inputs as secret env vars which will not be exposed in `bitrise.yml` or in public app PRs.
* Note that secret env vars can only hide sensitive information **in the build logs of your public app**. If you **attach any other file to your build log** which contains sensitive information but it is not encrypted, then sensitive information will be visible to anyone who has the build URL!