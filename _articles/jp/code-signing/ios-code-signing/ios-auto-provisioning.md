---
# jp title missing
title: Managing iOS code signing files - automatic provisioning
menu:
  ios-code-signing:
    weight: 3
---
[bitrise.io](https://www.bitrise.io)でコード署名ファイルを管理しましょう。自動プロビジョニング, 自動ダウンロードを使えばあなたのプロジェクトにとって必要なプロビジョニングプロファイルを自動で生成することができます。

`iOS Auto Provision` のステップでプロビジョニングプロファイルを管理するためには.p12証明書ファイルを手動で[bitrise.io](https://www.bitrise.io)にアップロードしなければなりません。

### 配布用と開発用の証明書をアップロードしてください。

配布用と開発用**両方**の証明書をプロジェクトへアップロードすることを強くお勧めします。二つのうちどちらかが欠けていたいた場合は欠けている方のIPAを生成することはできません。

---

自動プロビジョニングの設定をする前に以下のことを確認してください:

* [codesigndoc](https://github.com/bitrise-tools/codesigndoc)を使って必要なファイルを集めましょう。このツールを使って配布用と開発用の証明書をアップロードすることもできます。
* developer portal teamで少なくともAdmin権限を持っている必要があります。
* [Apple Developerアカウントがbitrise.ioと接続されている必要があります。](/getting-started/signing-up/connecting-apple-dev-account/)
* Apple Developer Portalの統合機能がプロジェクトで有効になっている必要があります。

## iOS Auto Provision

`iOS Auto Provision`はXamarinアプリには対応していません。

---

一旦準備ができたらファイルをアップロードしワークフローの設定を進めましょう。

1. アプリの`Dashboard`を開いてください。
2. `Workflow Editor`を選択します。
3. `Code Signing`を選択します。
4. p12証明書がアップロードされているか確認して下さい。もしまだであれば .p12ファイルを`Add the private key (.p12) for signing'フィールドに追加してください。

   (MacOSのプロジェクトではプロビジョニングプロファイルは`.provisionprofile`という拡張子になります。iOSプロジェクトであれば`.mobileprovision`という拡張子になります。)

5. `Certificate and profile installer`ステップがワークフローの中に含まれて**いない**か確認してください。もし`iOS Auto Provision`と`Certificate and profile installer`のステップの両方がワークフローの中に含まれていた場合はビルドは失敗します。
6. `iOS Auto Provision`ステップをワークフローに追加してください。`Workflow Editor`の中にある`Workflow`で確認することができます。


   `iOS Auto Provision`はワークフローの中で依存関係を解消するインストールのステップの後に設置するようにして下さい。例えば`Run CocoaPods install`や`Carthage`のようなものです。
   `iOS Auto Provision`と`Xcode Archive & Export for iOS`のステップの間にXcode projectの設定の変更を**しない**ようにして下さい。例えば`iOS Auto Provision`のステップの後に bundle ID を変えるというようなことです。

7. ステップに必要な項目を入力してください。
   * `The Developer Portal team id` - [Membership Details page of your Apple Developer Portal account](https://developer.apple.com/account/#/membership)で見つけることができます。
   * `Distribution type` - `Xcode Archive & Export for iOS step`に入力されている`Select method for export`の値と同じであることを確かめてください。
   * `Scheme` - ビルド対象の処理を制限することができます。

任意項目としてXocdeの _Automatically manage signing_ を使っている場合は`Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?`をtrueにすることでプロファイルを作成しようと試みます。もし手動でコード署名をする設定にしているのであれば特に効果はありません。

もし`codesigndoc`が一つも配布用の.p12ファイルを取り出さないのであれば、これらのファイルを違うMacへ移動させる時と同じように`Keychain Access app`を使って手動で取り出すことができます。
