bitrise.ioでコード署名ファイルを管理しましょう。自動プロビジョニング, 自動ダウンロードを使えばあなたのプロジェクトにとって必要なプロビジョニングプロファイルを自動で生成することができます。

「iOS Auto Provision」のステップで`Provisioning Profiles`を管理するためには.p12証明書ファイルを手動でbitrise.ioにアップロードするだけでよいです。

developmentとdistribution両方の署名証明書をプロジェクトへアップロードすることを強くお勧めします
違う種類の証明書がない場合は違う種類の署名されたIPAファイルを生成することはできません。

「automatic provisioning」の設定をする前に以下のことを確認してください。

- codesigndocに必要なファイルを集めましょう。distributionとdevelopmentの証明書をアップロードすることができます。
- 少なくともAdmin権限を持っている必要があります。
- Apple Developerアカウントがbitrise.ioと接続されている必要があります。
- Apple Developer Portalの統合機能がプロジェクトで有効になっている必要があります。

「iOS Auto Provision」はXamarinには対応していません。

準備ができたらファイルをアップロードしワークフローの設定を進めましょう。

1. アプリの`Dashboard`を開いてください。
2. `Workflow Editor`を選択します。
3. `Code Signing`を選択します。
4. p12証明書をアップロードしている必要があります。もしまだであれば .p12ファイルを「Add the private key (.p12) for signing」に追加してください。
   (MacOSのプロジェクトでは.provisionprofileという拡張子になります。iOSプロジェクトであれば.mobileprovisionという拡張子になります。)
5. 「Certificate and profile installer」ステップがワークフローの中に含まれていないか確認してください。もし「iOS Auto Provision」と「Certificate and profile installer」のステップの両方がワークフローの中に含まれていた場合はビルドは失敗します。
6. 「iOS Auto Provision」ステップをワークフローに追加してください。`Workflow Editor`の中にある「Workflow」で確認することができます。


ワークフローの中で依存関係を解消するインストールのステップの後に設置するように気をつけてください。
例えば「Run CocoaPods install」や「Carthage」のようなものです。
「iOS Auto Provision」と「Xcode Archive & Export for iOS」のステップの間にXcode projectの設定の更新をすることがないことを確かめてください。
例えば「iOS Auto Provision」のステップの後に bundle ID を変えるというようなことです。

7. ステップに必要な項目を入力してください。
   - The Developer Portal team id - 「Membership Details page of your Apple Developer Portal account」で見つけることができます。
   - Distribution type - 「Xcode Archive & Export for iOS step」に入力されている「Select method for export」の値にマッチする値であることを確かめてください。
   - Scheme - ビルドするターゲットの処理を制限することができます。


任意項目としてXocdeの「Automatically manage signing」オプションを使っている場合は「Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?」をtrueにすることでプロファイルを作成しようと試みます。
もし「manual code signing」を使っていた場合は特に効果はありません。

もし「codesigndoc」が一つも配布用の.p12ファイルを選択しないのであれば、これらのファイルを違うMacへ移動する時と同じように「Keychain Access app」より手動で取り出すことができます。
