---
changelog: 
last_modified_at: 
tag: []
title: あるアプリから別のアプリへのワークフローのコピー
redirect_from: []
description: ''
menu:
  steps-workflows-main:
    weight: 20

---
たくさんのアプリがある場合、特に実行するワークフローにほとんど違いがない場合は、アプリごとにワークフローを別々に設定するのに時間をかけたくないかもしれません。その場合、一番簡単なことは既存のワークフローを単純にコピーすることです。

{% include message_box.html type="important" title="YAML モードのみ" content="別のアプリへのワークフローのコピーは YAML モードでのみ可能です。同じアプリに対してのみ、[既存のワークフローを元に新しいワークフローを作成できます](/steps-and-workflows/creating-workflows/)。"%}

## ウェブサイトでワークフローをコピー

ローカルファイルを含むどんな bitrise.yml ファイルからでもワークフローをコピーできます。Bitrise のウェブサイトにあるアプリから別のアプリへ既存のワークフローをコピーするには:

1. ダッシュボードに移動します。
2. ワークフローのコピー元アプリを見つけて開きます。
3. **Workflows** タブに移動してから **bitrise.yml** タブに移動します。
4. 必要なワークフローを選択してコピーします。

   ![{{ page.title }}](/img/copy-workflow.png)
5. コピー先のアプリを開きます。
6. **Workflows** タブに移動してから **bitrise.yml** タブに移動します。
7. \`workflows\` コンポーネントの下にワークフローを貼り付けます。