---
title: Cocoapodsのキャッシュ
menu:
  caching:
    weight: 2
---
事前に、ワークフロー内に最新バージョンの`Cocoapods Install`ステップがあることを確認してください。

1. `Workflow Editor`を開きます。
2. `Cache:Pull`ステップを、`Git Clone`から`Cocoapods Install`のまでの間に挿入してください。

   **重要**: ステップのバージョンは1.0.0以上のものを使用してください。それ以前のバージョンでは、キャッシュのパスを手動で指定する必要があります。
3. `Cache:Push`ステップをワークフローの末尾に追加してください。

これで完了です！もし過去バージョンの`Cache`ステップを使用したい場合は、[こちら](https://discuss.bitrise.io/t/how-to-cache-cocoapods-dependencies/193)をご覧ください。
