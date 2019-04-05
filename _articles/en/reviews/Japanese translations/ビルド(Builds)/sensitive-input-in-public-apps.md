---
title: 公開アプリの機密インプット (Sensitive input in public apps)
redirect_from:
- sensitive-input-field/#set-a-sensitive-input-in-a-step/
- "/sensitive-input-field/"
date: 2019-04-05 09:47:01 +0000
published: false

---
パスワード、ID、APIトークンなどの機密情報は公開アプリのビルドログ・bitrise.ymlで表示されるので、そのアプリのビルドURLを持っている人なら誰でも見ることができてしまいます。こういった場合、**シークレット環境変数（secret env vars）**を使って隠すことができるので、ビルドログ・bitrise.yml内でも秘密にすることができます。BitriseのWorkflow Editor内で機密インプット欄を見やすくするため、機密インプット欄が存在するステップに黄色で`SENSITIVE`ラベルがマークされています。**これらのインプットはenv vars（環境変数）ではなくsecret env vars（シークレット環境変数）のヘルプを使って定義されないといけません。**

`SENSITIVE`のラベルがなくてもシークレット環境変数を使ってどのインプットでも隠すことができますが、`SENSITIVE`**とデフォルトでマークされている欄には必ずシークレット環境変数を使用しなければなりません。**

![Screenshot](/img/builds/sensitive-label.png)

シークレット環境変数を定義する２つの方法があります：

* [ステップ内](/sensitive-input-field/#set-a-sensitive-input-in-a-step/)で直接行う
* Workflow Editorの[Secret Tab]()内にて必要なときにステップインプットのシークレット環境変数を選択する

`Env Vars`と`Secrets`の違いについては[こちら](/builds/env-vars-secret-env-vars/)をお読みください！

## ステップ内の機密インプットの設定

1. 黄色で`SENSITIVE`とマークされたインプット欄の下にある`Select Secret Variable`をクリックします。
2. `Insert variable`ポップアップ内で、`Choose Secret Env Var`リストをブラウズするか、`Create New Secret Env Var`セクションで新しいシークレット環境変数（キーと値を追加する）を作成してください。

   ![](/img/insert-variable.png)

   `Value`欄の下にある`Expose for pull request?`トグルはデフォルトで無効になっており、**プルリクエストをする場合に備えて公開アプリの機密情報を保護するため**、公開アプリでは有効化できません。
3. 新しい環境変数の入力を終えたら、`Add new`をクリックしてください。

The new secret env var will be available in the `Choose Secret Env Var` list or under the `Secrets` tab for your app for future reference/use.

The selected or newly created secret env var will get automatically saved into the input field of the step.

You can always modify the secret env var registered for a `SENSITIVE` input field if you click the `Select secret variable` button or head over to the `Secrets` tab where you get a full list of your secret env vars.

新しいシークレット環境変数は、アプリを今後参照・使用するのに`Choose Secret Env Var`リスト、または`Secrets` タブの下から確認できます。

選択されたまたは新しく作成されたシークレット環境変数はステップのインプット欄へ自動的にセーブされます。

`Select secret variable`ボタンをクリックする、またはあなたのシークレット環境変数の全リストを確認できる`Secret`タブへ進むことで、`SENSITIVE`インプット欄に登録されたシークレット環境変数をいつでも修正することができます。

![](/img/secrets-email.png)

{% include message_box.html type="important" title="`Select secret variable`" content=" Note that you cannot modify the input manually in the input field marked with the `SENSITIVE` label! Instead, click the `Select secret variable` to **replace** the existing input with another secret env var from the list or to **create a new one** in the `Insert variable` pop-up. `SENSITIVE`ラベルがマークされたインプット欄を手動でインプットを修正することはできません。代わりに`Select secret variable`をクリックすることですでに存在するインプットを他のシークレット環境変数に**変更する**ことができます。`Insert variable`ポップアップ内のリストまたは**新しく作成**してください。"%}

* **Do not add private information in the** `Env Var` **tab**! Our `Secrets` tab is designed to hold encrypted inputs as secret env vars which will not be exposed in `bitrise.yml` or in public app PRs.
* Note that secret env vars can only hide sensitive information **in the build logs of your public app**. If you **attach any other file to your build log** which contains sensitive information but it is not encrypted, then sensitive information will be visible to anyone who has the build URL!
* `Env Var`**タブでは個人的な情報を追加しないでください**。Bitriseの`Secrets` タブは暗号化されたインプットを保管するのに設計されており、`bitrise.yml`や公開アプリのプルリクエストで表示されることはありません。
* シークレット環境変数は**公開アプリのビルドログ内**でのみ機密情報を隠すことができます。ご自身のビルドログに暗号化されていない機密情報を含む**他のファイルを添付してしまう**と、ビルドURLを持つ人なら誰でも見ることができてしまうので注意してください。