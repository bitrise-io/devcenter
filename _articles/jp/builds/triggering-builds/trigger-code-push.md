---
# jp title missing
title: Triggering builds with code push
menu:
  triggering-builds:
    weight: 2
---
トリガーを設定すると、リポジトリの指定されたブランチにプッシュされるたびにBitrise上でビルドが実行されます。

あらかじめリポジトリのホスティングサービスでIncoming WebHookを設定しておく必要があります。  
詳しくは[Webhooks](/webhooks/index)セクションを参照してください。

任意のブランチがリポジトリにプッシュされたときのトリガーがデフォルトで設定されています。  

1. [bitrise.io](https://www.bitrise.io)であなたのアプリケーションのページを開きます。
2. `Workflow Editor`を開きます。
3. `Triggers`タブを開きます。
4. `PUSH`オプションを開きます。

   ![Push trigger](/img/getting-started/triggering-builds/push-trigger.png)
5. 既存のトリガーで`Push branch`オプションをクリックします。  
   もしトリガーがすでに設定されている場合は、`+ ADD TRIGGER`オプションをクリックして新しいトリガーを設定します。
6. ブランチ名を入力します（例えば`master`など）。  
   スペルミスがないように気をつけてください。  
   ブランチ名にミスがある場合、トリガーは機能しません。
7. トリガーを紐付けるWorkflowを選択します（例えば`primary`など）。
8. 右上にある`Save`をクリックします。

これで完了です！  
これより、あなたのリポジトリの指定されたブランチにコードがプッシュされると、Bitriseは設定されたWorkflowでビルドを開始します。
