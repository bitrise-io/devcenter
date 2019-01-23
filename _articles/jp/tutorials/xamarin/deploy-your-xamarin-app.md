---
# jp title missing
title: Deploy your Xamarin app
redirect_from:
- "/xamarin/deploy-your-xamarin-app/"
- "/xamarin/deploy-your-xamarin-app"
menu:
  xamarin:
    weight: 4
---
Xamarinアプリケーションの追加に成功した後に、デフォルトのワークフロー(ビルド設定)を作成します。
このワークフローは、デフォルトで`Deploy to bitrise.io`ステップを含んでいます。

デフォルトのワークフローでは、あなたのgitリポジトリに切り替えたあと、
アプリケーションのアーカイブを作成し、全てのアプリケーションファイル( `ipa` / `apk` ) をデプロイメントフォルダーに移動させます。
さらに、その後`Deploy to bitrise.io` ステップでBitriseにアプリケーションをアップロードします。

また、ただアプリケーションをアップロードするだけではなく、あなたのチームメンバーにメールを送ります。
そして、モバイルデバイスでそのメールを開き、アプリケーションをインストールすることができます。
また、メールアドレスを予め設定しておくことで、ビルドしたアプリケーションを任意のテスターに送信することが可能です。

## 他のデプロイメントサービスを利用したい、もしくはすでに使っている場合

デフォルトのBitriseのデプロイ手法に加えて、Bitriseには[様々な他のデプロイサービス](http://www.bitrise.io/integrations#?filter=deploy)が存在します。
これによって、[HockeyApp](http://hockeyapp.net/)、 [Appaloosa](/tutorials/deploy/publish-your-app-to-appaloosa/)、[TestFairy](/tutorials/deploy/deploy-to-testfairy-with-bitrise/)、[DeployGate](/tutorials/deploy/deploy-apps-to-deploygate-from-bitrise/) などのように、あなたはとても簡単に既存のワークフローを修正したり、好きなステップを追加できたりします。(利用可能なデプロイステップを確認するには、`deploy`タグで検索できます。)

行うことは、ただ`Deploy to bitrise.io`ステップの代わりもしくはそのステップの後に（多くは、`.ipa`、`.apk`などのデプロイ可能なファイルを作成するステップである`Xamarin Archive` の後に）、あなたの利用したい統合ステップを追加しパラメータの記入を行うだけです。

Xamarinプロジェクトにおけるより詳細なコード署名についての情報は、[Xamarin Androidのためのコード署名](/code-signing/xamarin-android-code-signing/xamarin-android-code-signing)と[署名されたXamarinプロジェクトの.ipaの作成](/code-signing/ios-code-signing/create-signed-ipa-for-xamarin)を確認してください.

これを利用すると、ビルド始めるだけであなたの選んだサービスにアプリがデプロイされるようになります！
