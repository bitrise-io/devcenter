---
# jp title missing
title: Gradleのキャッシュ
menu:
  caching:
    weight: 3
---
事前に、ワークフロー内に最新バージョンの`Android Build`ステップがあることを確認してください。

1. アプリの`Workflow Editor`を開きます。
2. `Git Clone`ステップから`Android Build`ステップの間に`Cache:Pull`ステップを挿入します。

   **重要**: ステップのバージョンが1.0.0以上であることを確認してください。それ以前のバージョンでは、キャッシュのパスを手動で設定する必要があります。
3. ワークフローの最後に`Cache:Push`ステップを挿入します。

これで完了です！
