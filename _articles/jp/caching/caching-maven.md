---
# jp title missing
title: Caching Maven
menu:
  caching:
    weight: 4
---
1. アプリの`Workflow Editor`を開きます。
2. `Git Clone`ステップから`Android Build`ステップの間に`Cache:Pull`ステップを挿入します。

   **重要**: ステップのバージョンが1.0.0以上であることを確認してください。
3. ワークフローの最後に`Cache:Push`ステップを挿入します。
4. 挿入した`Cache:Push`ステップの`Ignore Paths from change check`に`$HOME/.m2`を追記します。

これで完了です！
