---
changelog: 
last_modified_at: 
title: シングルトリガーで並列ビルドを開始
menu:
  triggering-builds:
    weight: 11

---
複数の並行性がある場合は、複数のビルドを同時に実行できます。人生を可能な限り簡単にしたいので、ビルドはシングルトリガーで自動的に開始することができます。どのように機能するか見てみましょう！

この例では、シングルアプリの3つのワークフローが同時に実行されるように設定されています。これらのワークフローを`Trigger`、`Building` 、`Testing`と呼びましょう。`Trigger`と呼ばれるワークフローはプルリクエストによってトリガーされ、ワークフローは同時に実行される`Building` と `Testing`をトリガーします。

すべてのワークフローは別々の「クリーンな」バーチャルマシンで実行されます。また、さまざまなタイプのスタックで実行することもできます：ワークフローのスタックを選択するには、アプリの`Workflow Editor`に入り、`Stack`タブを選択します。

いずれかのビルドが失敗した場合、そのビルドは失敗したものと見なされます。ビルドがwebhookによって引き起こされた場合、Bitriseは要約されたビルド結果をGitホスティングプロバイダーに送信します。並列ビルドの**いずれか**が失敗すると、失敗ステータスが報告されます。

必要：

* Personal Access Token
* トークンを保存するシークレット環境変数
* `Bitrise Start Build` ステップ
* `Bitrise Wait for Build`ステップ

1. ユーザー用の**Personal Access Token**を作成します。

   `Account settings`に行き、左側の`Security`オプションを選択します。 `Generate new`をクリックします。

   ![Access token](/img/getting-started/triggering-builds/generate-token.png) **重要**：コードが作成されたら、必ずコピーしてください。二度見ることはできません！
2. アプリの`Workflow Editor`の`Secrets`タブでシークレット環境変数を作成し、トークンをバリューとして追加します。

   ![Secret env](/img/getting-started/triggering-builds/secret_token.png)  秘密にしたいキーを自由に使用します。 `$ACCESS_TOKEN`のような単純なものをお勧めします。
3. `Bitrise Start Build`ステップを`Trigger`ワークフローに追加します。 **重要**：`Bitrise Start Build`ステップは、開始するすべてのビルドに環境変数を設定します_`$SOURCE_BITRISE_BUILD_NUMBER`。この手順で開始したアプリのすべてのビルドは、異なるワークフローで実行しても同じビルド番号になります。
4. ステップの`Bitrise Access Token`入力に個人的なaccess tokenを保存しているシークレットenvを追加します：`Insert variable`をクリックして、作成したキーを選択してください。

   ![Secret env](/img/getting-started/triggering-builds/access-token-input.png)
5. ステップの`Workflows`入力に`Building` と`Testing`を追加します。

   ![Workflows input](/img/getting-started/triggering-builds/workflows-input.png)
6. `Trigger`ワークフローの**最後のステップ**として、`Bitrise Wait for Build`ステップを追加します。

   **重要**：このステップでは、ステップで定義されているビルドの状況を確認します。ビルドは`Build slugs`入力で定義されます：スラッグは、`Bitrise Start Build`ステップの出力です。スラッグによって定義されたビルドが実行されている限り、ステップは実行されているビルドを保持し,ステップに含まれているいずれかのビルドが失敗すると、ビルドは失敗します。
7. ステップの`Bitrise Access Token`入力に個人的なアクセストークンを保存しているシークレットenvを追加します：`Insert variable`をクリックして、作成したキーを選択してください。

   ![Secret env](/img/getting-started/triggering-builds/access-token-input.png)

完了です！ `Trigger`ワークフローを起動すると、ワークフローの`Bitrise Start Build`ステップが同時に実行されている2つのビルドが起動します。2つのビルドが成功した場合は、`Bitrise Wait for Build`ステップで最初のビルドが完了します。ビルドが成功したかどうかにかかわらず、シングルステータスレポートがgitホスティングプロバイダーに送信されます。