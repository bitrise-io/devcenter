---
# jp title missing
title: Caching Ruby Gems
menu:
  caching:
    weight: 5
---
Ruby Gemはデフォルトでは単一のディレクトリへインストールされます。このディレクトリの場所は、`gem enviroment gemdir`で取得できます。このディレクトリを変更したい場合、`$GEM_HOME`環境変数を設定することで変更できます。これは`gem install`によって取得され、`$GEM_HOME`で指定された場所へGemがインストールします。

{% include message_box.html type="info" title="入力フィールドで環境変数を参照する方法" content="キャッシュステップの入力に単に`gem environment gemdir`を追加することはできません。入力では環境変数のみを参照できるだけで、`$GEM_HOME`はBitrise.ioのVMではデフォルトでは設定されません。"%}

1. アプリの`Workflow Editor`を開きます。
2. ワークフローに`Script`ステップを追加します。
3. `$GEM_HOME`を`Script`ステップで設定します。

- script:
    title: Set GEM_HOME env var
    inputs:
    - content: |-
        #!/bin/bash
        set -ev
        envman add --key GEM_HOME --value "$(gem environment gemdir)"
4. `Git Clone`ステップから`Android Build`ステップの間に`Cache:Pull`ステップを挿入します。

   **重要**: ステップのバージョンが1.0.0以上であることを確認してください。
5. ワークフローの最後に`Cache:Push`ステップを挿入します。

これで完了です！
