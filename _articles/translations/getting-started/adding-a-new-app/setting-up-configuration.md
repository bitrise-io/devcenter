プロジェクトに[SSHキーを設定](/adding-a-new-app/setting-up-ssh-keys)した後、Bitriseはソースコードをダウンロードしてレポジトリにアクセスできるか念のために確認して、プロジェクトの最適な初期設定を把握するために自動でレポジトリスキャンスクリプトを実行します。
現時点ではBitriseは`iOS`, `Android`, `Xamarin` と `fastlane`プロジェクトを自動で検知します。

他の種類のプロジェクトも設定できますが、それには手動で設定が必要です。

## プロジェクトの自動設定

プロジェクトが配置されているレポジトリのデフォルトブランチの名前を入力してください。
このブランチにはプロジェクトの設定ファイルが含まれている必要があります。`Next`を押すと、Bitriseは自動的にレポジトリのバリデーションを行います。

![ブランチの選択](/img/adding-a-new-app/choose-branch.png)

![Choosing branch](/img/adding-a-new-app/choose-branch.png)

バリデーション中にBitriseは設定した[SSHキー](/adding-a-new-app/setting-up-ssh-keys)を使って指定されたブランチにアクセスできるか確認します。
もしバリデーションに成功すれば、Bitriseはレポジトリをスキャンしてプロジェクトの設定に基づいたデフォルトのワークフローを表示します。

## プロジェクトの手動設定

もしバリデーションに失敗したら、`Restart scanning without validation`オプションを選択してください。

![バリデーションの失敗](/img/adding-a-new-app/validation-failed.png)

この場合は、プロジェクトを手動で設定する必要があります。`Next`をクリックしてください。再び`Validating Repository`メッセージが見えますが、今度はBitriseは指定したレポジトリにアクセスできることだけ確認します。

プロジェクトの種類を選択して(例えば、Xamarinなど)必要事項を指定してください(例えば、Xamarinのソリューションファイルへのパスなど)。ビルドを実行したいスタックも選べます。

![プロジェクトの種類を選択](/img/adding-a-new-app/select-project-type.png)

{% include message_box.html type="note" title="バリデーションの再実行" content="
Bitriseに自動的にプロジェクトの種類を検知させるならバリデーションを再実行できます。バリデーションの失敗を起こしていた問題を解消したら、`Project build configuration`画面に移動して、`Detected`タブを選択してください。そして`Restart current validation`オプションを選択してください。 "%}

## Webhookの設定

設定が終わったら、Bitriseはすぐにあなたのレポジトリにwebhookの設定を勧めできます。webhookを設定した後は、デフォルトでレポジトリ内のあらゆるソースコードの変更によって`primary`ワークフローが自動作成されるようになります。

webhookの詳細については[Webhooks](/webhooks)セクションを呼んでください。

