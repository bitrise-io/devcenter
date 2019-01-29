プロジェクトに [SSHキーの設定](/adding-a-new-app/setting-up-ssh-keys) がなされれば、 Bitriseはコードをダウンロードし、レポジトリにアクセスできることを確認します。そして、自動的にコードをスキャンし、もっとも最適なプロジェクトの初期設定を検知しようとします。
現時点でBitriseは、`iOS`, `Android`, `Xamarin` および `fastlane` のプロジェクトに対応しています。

他のプロジェクトの設定も可能ですが、手動での設定が必要になります。

## プロジェクトの自動設定

デフォルトのブランチとして、プロジェクトが含まれるレポジトリのブランチ名を入力してください。このブランチには、プロジェクトの設定が含まれている必要があります。一度、`Next（次へ）`を押すと、Bitriseは自動でレポジトリの検証を始めます。

![ブランチの選択](/img/adding-a-new-app/choose-branch.png)

検証中に、Bitriseは設定した[SSHキー](/adding-a-new-app/setting-up-ssh-keys)を使って、指定されたブランチへアクセスできることを確認します。

検証が成功すると、Bitriseはレポジトリをスキャンし、プロジェクトの設定に基づいたデフォルトワークフローを提示します。

## プロジェクトの手動設定

検証が失敗した場合、`Restart scanning without validation（検証せずに再スキャン）`を選んでください。

![検証が失敗した場合](/img/adding-a-new-app/validation-failed.png)

この場合は、手動で設定を行う必要があります。`Next（次へ）`をクリックしてください。再び`Validating Repository（レポジトリの検証）`という文言が表示されますが、この回ではBitriseは、指定されたレポジトリにアクセスができることのみの検証を行います。

プロジェクトの種別（例えばXamarin）を選んで、必要な情報（例えばXamarinソリューションファイルのパス）を入力してください。ビルドを行いたいスタックを選択することもできます。

![プロジェクト種別の選択](/img/adding-a-new-app/select-project-type.png)

{% include message_box.html type="note" title="検証の再試行" content="
もしプロジェクトの自動設定をやり直したい場合は、検証の再試行ができます。検証に失敗した原因を修正した後に、`Project build configuration（プロジェクトのビルド設定）`のウィンドウから、`Detected（検出済み）`タブに移動し、`Restart current validation（検証の再試行）`を選んでください。"%}

## Webhook の設定

プロジェクトの設定が完了すれば、すぐにwebhookの登録が可能になります。webhookが設定されていれば、レポジトリ内のコードの変更があれば、自動的に作成された`primary（プライマリ）`ワークフローがデフォルトで起動されます。

webhooksについて詳しくは、[Webhooks](/webhooks)の章をお読みください。
