---
title: 指定されたステップが失敗してもそのビルドを失敗としてマークしないでください(そのステップのエラーを無視してください)
menu:
  tips-and-tricks:
    weight: 6
---
*これを行うには`bitrise.yml`モードに切り替えてください(bitrise.ioのWorkflow Editorを開いて -> 左側:`bitrise.yml`をクリックして、`bitrise.yml`のインタラクティブエディターに切り替えてください)。*

することは: 該当のステップに`is_skippable: true` を追加するだけです。
All you have to do is: add an `is_skippable: true` flag to the Step.

例の`script`ステップでは、失敗しても、そのビルドを"壊す"ことはありません。

```
- script:
    is_skippable: true
    inputs:
    - content: |-
        #!/bin/bash
        echo "Failing Step."
        exit 1
        # exit 1 はこのステップを失敗としてマークしますが、is_skippable: true フラグ / プロパティによって
        #  ビルドを壊すことはありません。
```

さらなるサンプルは[GitHub](https://github.com/bitrise-io/bitrise/blob/fec3772ee2287d6e405d908fb9b42367a5751b43/_examples/tutorials/errors-force-run-and-skippable/bitrise.yml)にあります。
