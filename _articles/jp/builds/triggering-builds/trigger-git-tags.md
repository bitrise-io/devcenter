---
title: Gitのタグをトリガーにビルドする
menu:
  triggering-builds:
    weight: 4
---
特定パターンのGitタグをワークフロー実行のトリガーにすることができます。これは、アプリケーションが特定の状態になった時のビルド・デプロイに適した方法です。しかもこのセットアップは非常に簡単です！

あらかじめリポジトリのホスティングサービスでIncoming WebHookを設定しておく必要があります。  
詳しくは[Webhooks](/webhooks/index)セクションを参照してください。


特定のGitプロバイダ（例えばGitLabのような）では、タグがプッシュされたイベントをWebhook設定で明示的に有効にしておく必要があります。

1. [bitrise.io](https://www.bitrise.io)であなたのアプリケーションのページを開きます
2. `Workflow Editor`を開きます
3. `Triggers`タブを開きます
4. `TAG`オプションを開きます

   ![Tag trigger](/img/getting-started/triggering-builds/tag-trigger.png)
5. `+ ADD TRIGGER`をクリックします
6. `TAG`ウィンドウで、トリガーにしたいタグを追加します
7. タグをトリガーに実行したいワークフローを選択します（例えば`primary`のような）
8. 右上にある`Save`をクリックします。

これで完了です！
