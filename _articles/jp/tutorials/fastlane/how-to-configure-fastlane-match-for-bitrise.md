---
changelog: 
last_modified_at: 
title: Bitrise上でのfastlane match設定方法
menu:
  fastlane:
    weight: 4

---
[fastlane match](https://github.com/fastlane/fastlane/tree/master/match)を[bitrise.io](https://www.bitrise.io/)で利用するために必要な設定は、以下の3つだけです。

1. `git clone`の際に利用するSSHキーを、ソースコードリポジトリ([bitrise.io](https://www.bitrise.io/)に登録してあるリポジトリ)と`match`用リポジトリで利用できるよう確認してください。詳しくは[こちらの説明](/faq/adding-projects-with-submodules/)を参照してください。
2. `[match](https://github.com/fastlane/fastlane/tree/master/match#encryption-password)`の[ドキュメント](https://github.com/fastlane/fastlane/tree/master/match#encryption-password)で[説明されている](https://github.com/fastlane/fastlane/tree/master/match#encryption-password)とおり、環境変数`MATCH_PASSWORD`を追加し、`match`に使用している`Encryption password`を指定してください。
   [bitrise.io](https://www.bitrise.io/)では、[Workflow Editor](http://devcenter.bitrise.io/docs/add-your-first-step-to-your-apps-workflow)の中でこの環境変数を`Secret Environment Variable`として追加する必要があります。また、環境変数の展開に使用される `$` (ドル) 記号を含む値の場合に問題が発生しないように、`Replace variables in input?`オプションは _必ず無効にしてください_ 。

   ![{{ page.title }}](/img/matchpassword.png)
3. 必ず `match` の `readonly` モードを使用してください。readonlyを指定しない場合、 `match` は Apple Developer Portal への接続を試みるため追加で認証が必要となります(Apple Dev Portalログイン用のユーザー名とパスワードも提供しなければいけません)！
   * `Fastfile`か`fastlane` configで`match`を使う場合： `match(app_identifier: "my.domain", type: "appstore", readonly: true)`
   * コマンドラインツールとして使用する場合： `match development --readonly`
   * より詳しい情報は`match`の [公式ドキュメント](https://docs.fastlane.tools/actions/match/)をご参照ください

以上となります。これで`match`の機能が使えるようになり、[bitrise.io](https://www.bitrise.io/)での自動化は完了です 🚀