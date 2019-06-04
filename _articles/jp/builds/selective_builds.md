---
title: Selective builds
redirect_from:
- "/builds/selective-builds/"
menu:
  builds-main:
    weight: 9

---
Selective Buildsを利用することで、特定のファイルやフォルダが変更された場合にのみビルドを実行することができます。

この設定は以下のような状況に有効です

 * ひとつのリポジトリに複数のアプリが含まれている
 * 複数のアプリがリポジトリ内のファイルを共有している

{% include message_box.html type="important" title="GitHubのプロジェクト以外でのSelective Builds" content="Selective buildsは現在、GitHubのプロジェクトのみ動作します。その他のgitホスティングサービスを利用しているリポジトリではこのオプションは利用できません。"%} 

アプリの `Team` のページから適切なService credential userをセットする必要があります。ここでセットするユーザーはGitHubのリポジトリのadminユーザーである必要があります。[Service credential userについての詳しい設定はこちらを参照してください。](/troubleshooting/github-pull-request-status-troubleshooting/#make-sure-to-select-a-service-credential-user-who-has-a-connected-github-account).

1. アプリの `Dashboard` をクリックします
2. 上部ナビゲーションバーの `Settings` をクリックします
3. `ENABLE SELECTIVE BUILDS` の項目を有効にします

   ![Selective Builds](/img/getting-started/selective-builds.png)
4. `ADD FILENAME/PATH` ウィンドウにファイル名やパスを追加します。複数のファイルやパスの指定も可能です。ここで指定したファイルが変更された場合にのみビルドが実行されます。