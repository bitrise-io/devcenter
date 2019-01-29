---
title: Pull Requestをトリガーにする
menu:
  triggering-builds:
    weight: 3
---
あなたのレポジトリの指定したソースブランチから、指定したターゲットブランチへのPull Requestがオープンされたことをトリガーにして、Bitrise上でビルドが実行されるように設定することができます。

あらかじめリポジトリのホスティングサービスでIncoming WebHookを設定しておく必要があります。  
詳しくは[Webhooks](/webhooks/index)セクションを参照してください。

Bitriseに登録された全てのアプリケーションには、Pull Requestがオープンされたときのトリガーがデフォルトで設定されています。

1. [bitrise.io](https://www.bitrise.io)であなたのアプリケーションのページを開きます
2. `Workflow Editor`を開きます
3. `Triggers`タブを開きます
4. `PULL REQUEST`オプションを開きます

   ![PR trigger](/img/getting-started/triggering-builds/pull-request-trigger.png)
5. 既存のトリガーで、`SOURCE BRANCH`と`TARGET BRANCH`をクリックします。

   もしトリガーがすでに設定されている場合は、`+ ADD TRIGGER`オプションをクリックして新しいトリガーを設定します。
6. ソースブランチとターゲットブランチのブランチ名を入力します。スペルミスがないように気をつけてください。ブランチ名にミスがある場合、トリガーは機能しません。

   ソースブランチとターゲットブランチのいずれか、または両方を空のままにすることができ、トリガーはそれ相応に動作します。たとえば、新しいアプリで両方のフィールドを空のままにする（これがデフォルト状態です）と、すべてのPull Requestによってビルドが開始されます。

7. トリガーを紐付けるWorkflowを選択します（例えば`primary`など）。

8. 右上にある`Save`をクリックします。

これで完了です！
これより、あなたのリポジトリの指定されたブランチにコードがプッシュされると、Bitriseは設定されたWorkflowでビルドを開始します。
