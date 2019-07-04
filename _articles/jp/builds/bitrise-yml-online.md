---
title: bitrise.ymlファイルへのオンラインアクセス
redirect_from:
- "/bitrise-cli/bitrise-yml-online/"
- "/bitrise-cli/bitrise-yml-online"
menu:
  builds-main:
    weight: 24

---
すべてのbitrise.ymlファイルはビルド用に[bitrise.io](https://www.bitrise.io)に保存されます。特定のビルドを実行したときの設定を確認したいときに便利です。また、オンライン`Workflow Editor`か、ビルドのオンラインbitrise.ymlファイルを使用することができ、オンラインbitrise.ymlファイルを選択した場合、変更を比較し、現在のビルドを元のバージョンに復元し、設定を編集して、ファイルをMac / PCにダウンロードすることができます。

{% include message_box.html type="note" title="ビルドボードでフィルターを使用する" content="アプリが[bitrise.io](https://www.bitrise.io)内に複数のビルドを持ち、その中から特定のビルドを選びたい場合、以下のフィルターが役に立ちます。`Dashboard`でアプリをクリックし、次のフィールドを使用します：

* `Try build number or commit message`グレーフィールドで、ビルド番号またはコミットメッセージを検索できます。
* ビルドに使用されたトリガー`Pushes`、`Pull Requests`、 `Tags`、の３つの内からもしくは全て選ぶことができます。
* ビルドが開始された`branch`を選択できます。
* ビルドの`primary`または`deploy workflow`のどちらかを選択できます。"%}

![Screenshot](/img/bitrise-cli-bitrise-yml/build-filters.png)

## ビルドのbitrise.ymlにアクセス

1. `Dashboard`でアプリケーションを選択して、ビルドの1つを選択します。
2. インラインログの上部または下部にある`Show bitrise.yml`をクリックします。

   ビルドのbitrise.ymlコンテンツがaceエディターに表示されるはずですが、編集することはできません。

   [bitrise.ymlをオンラインで編集](#editing-and-downloading-bitriseyml-online)を確認してください。

## 変更をbitrise.ymlオンラインで確認

`Show bitrise.yml`をクリックすると、ビルド設定の詳細を表示した`BUILD'S BITRISE YML`ポップアップウィンドウが表示されます。`build's bitrise.yml`の内容が`current build's bitrise.yml`と異なる場合は、`BITRISE.YML CHANGES`ポップアップウィンドウに2つのエディタが並べて表示されます。ビルド間の違いは、以下の色で表示されています：

* 緑色=追加コンテンツ
* 青=変更されたコンテンツ
* オレンジ=削除されたコンテンツ

![Screenshot](/img/bitrise-cli-bitrise-yml/bitrise-yml-changes.png)

## bitrise.ymlオンラインでの変更の復元と取り消し

現在のbitrise.ymlの変更が気に入らない場合、元のbitrise.ymlに簡単に復元できます.

1. [bitrise.io](https://www.bitrise.io/)のインラインログ上部または下部にある`Show bitrise.yml`をクリックします。
2. `BITRISE.YML CHANGES`ポップアップウィンドウで、オレンジ色の`Restore`をクリックします。
3. 現在のbitrise.ymlを確認して上書きするためには`Are you sure?` ポップアップウィンドウの`OK`をクリックします。

![Screenshot](/img/bitrise-cli-bitrise-yml/confirm-bitrise-yml-changes.png)

## bitrise.ymlをオンラインで編集およびダウンロード

アプリの`Workflow Editor`の`bitrise.yml` タブをクリックすると、ビルド設定を`bitrise.yml editor`のyml形式で**編集**できます。

* 全てのコマンドリストを表示するには、`F1`を押します。
* `-`と`+`記号でfoldとunfold
* 検索のために`Ctrl`/`Cmd` + `F`をクリックして、`RegExp`、`Match Whole Word`、大文字と小文字を区別、大文字と小文字を区別しない、で検索できる場所を置き換えるか、選択したセクションのみを検索します。
* ナビゲーションを容易にするために右側の`preview sidebar`を使用します。

設定で行った変更を**保存**または**破棄**することができます。 `Download currently saved config`をクリックすると、YMLバージョンを自分のコンピュータに**ダウンロード**して、Mac / PCのbitrise CLIで実行できます。

コピーしたバージョンをベースとして使用し、いくつかの追加手順で拡張できるように、YML構成の全体またはその一部のみを別のアプリケーションに**複製**することをお勧めします。bitrise.ymlの内容をコピーして新しいアプリのbitrise.ymlエディターに貼り付け、さらに開発してください。

## ビルドのbitrise.ymlを削除

お望みの場合、ビルドの`bitrise.yml`ファイルを削除することができます。しかし、このアクションを元に戻すことはできず、またそのビルドの`bitrise.yml`ファイルを誰も表示することができなくなります。

1. `Dashboard`でアプリケーションを選択して、ビルドの1つを選択します。
2. `Delete bitrise.yml`をクリックします。
3. 確認ウィンドウで、`Yes`をクリックします。