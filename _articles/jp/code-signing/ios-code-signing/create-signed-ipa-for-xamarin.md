---
title: Xamarinプロジェクトでの署名付きIPAの作成
menu:
  ios-code-signing:
    weight: 6
---
Bitriseでは、Xamarinプロジェクトでの署名つきIPAの作成を手軽に行えます。`Xamarin Archive`で入力の設定を行うだけです。

IPAのエクスポートの設定をする前に次の項目を確認しましょう。

* Code Signingファイルがあること。
* ワークフローに`Certificate and profile installer`ステップがあること。

{% include message_box.html type="important" title="iOS Auto Provision" content="Xamarinでは、`iOS Auto Provision` でのAutomatic Provisioningの設定はサポートしていません。"%}

準備ができたら、ワークフローでIPAのエクスポートの設定を進めましょう。

1. `Xamarin Archive` がワークフローエディタにあることを確認し、ステップを選択します。
2. `Xamarin solution configuration` で`Release`などの使いたいXamarin Project Configurationを選択します。
3. `Xamarin solution platform`で`iPhone`を選択します。.

   Xamarin StudioでCode Signing Configurationを設定することで、Code Signingの種類をコントロールできます。

   ![エクスポート方法を選択する]](/img/code-signing/ios-code-signing/xamarin-archive-export-method.png)

２種類以上のCode Singningを使いたい場合（Ad-hocとApp Store用の署名をしたアプリなど）、Xamarin Studioで`Release` Configurationを２つ以上作ってください。使いたいConfigurationをそれぞれ指定します。

Xamarin Studioで既存の `Release`設定を`Copy`して、基本のConfigurationにできます。これでコード署名のConfigurationを変更するだけ済みます。例えば、`Release|iPhone`の設定を`ReleaseAppStore`という名前で`Copy`し、`ReleaseAppStore`設定のためにコード署名をApp Storeにセットし、`Xamarin Archive`の `Xamarin solution configuration`としてこのConfigurationを選択します。

XamarinプロジェクトでCode Signing Configurationを変更した際は、署名ファイルを再度アップロードするのを忘れないでください。
