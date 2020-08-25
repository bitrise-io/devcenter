---
changelog: 
last_modified_at: 
title: 複数のアプリ間でのワークフローの共有・保存
date: 2019-03-01T14:39:55.000+00:00
menu:
  tips-and-tricks:
    weight: 23

---
Bitriseにアプリを追加するたびにゼロからワークフローを構築する代わりに、特定のワークフローを複数のアプリ間で共有・保存するためのTipsをいくつか紹介します。

## bitrise.ymlタブを使う

Bitriseで他に新しいアプリを導入する際、何度も「再利用」したいワークフローはあるでしょうか？もしある場合、簡単な方法があります。ワークフローエディタの`bitrise.yml`タブを使い、新しいアプリで再利用可能なymlをコピー&ペーストするだけで、そのワークフローを再利用できます。

1. 他のアプリで再利用したいワークフローをもつアプリにダッシュボードからアクセスします。
2. そのアプリのワークフローエディタをクリックし、`bitrise.yml`タブにアクセスします。
3. アクセス後、`bitrise.yml editor`で表示されたymlをコピーします。
4. 新しいアプリの`bitrise.yml`に先ほどコピーしたymlをペーストします。

   ![](/img/bitrise-yml-tab-2.png)
5. [ビルドを開始します](/builds/Starting-builds-manually/)。

この場合、新しく追加されたアプリには最新の設定が適用されますが、以前に追加されたアプリは必要に応じて手動で更新する必要があります。

## プロジェクトのリポジトリにbitrise.ymlを保存する

必要であれば、Bitriseにアップロードする代わりに、プロジェクトのgitリポジトリに `bitrise.yml`を保存できます。 これは前述の方法と似ていますが、それに加えてgitを使った変更履歴の追跡が行えるというメリットがあります。

## bitrise.ymlとプロジェクトを別々のリポジトリに保存する

プロジェクトをリポジトリ（リポジトリA）に、.ymlファイルを_another_リポジトリ（リポジトリB）に保存すると、プロジェクトのリポジトリに余分なノイズを作ることなく、リポジトリBの.ymlファイルに加えられた変更を簡単に追跡できます。

特定のワークフローを実行するためにBitriseに結び付けましょう！

`Git Clone Repository`ステップと2つの`Script`ステップを含む簡単なワークフローを、Bitriseで設定する必要があります。 `Git Clone Repository`ステップはプロジェクトのリポジトリ（repo A）を複製し、最初の` Script`ステップは（repo Bから）ymlリポジトリを複製し、2番目の `Script`ステップはymlで指定されたワークフローの実行を開始します。Bitriseで[webhookをセットアップ](https://devcenter.bitrise.io/webhooks/index/)している場合は、Bitriseで手動でビルドを開始するか、コードをプッシュしてビルドを開始できます。

## 他のプロジェクトのbitrise.ymlと一緒に、bitrise.ymlをmono repoに保存する

アプリのアクセシビリティと管理を容易にするために、多くのプロジェクトを（各々の.ymlファイルと一緒に）単一のgitリポジトリ（mono repoと呼ばれる）に保存する場合があるでしょう。仮想マシンでテストするのではなく、プロジェクトの `bitrise.yml`をローカルで設定・テストする方が良い場合もあります。そういった場合、すべてのプロジェクトメンバーが変更を追跡しアクセスが可能なgitリポジトリに変更をプッシュします。

それでは、Bitriseに結び付けて、特定のプロジェクトの `bitrise.yml`をgitリポジトリから直接実行しましょう。

1プロジェクト及び`bitrise.yml`ファイル、もしくはそれ以上の関連ファイルを1つのフォルダに持つかどうかに関わらず、次のことが可能です。

Bitriseでは、以下2ステップのみを含むシンプルなワークフローを使用できます:

* `Git Clone Repository`ステップ
* `Script`ステップ（もしくは`Bitrise Start Build`ステップ）

このワークフローを採用することで、次の2つを実行します。gitリポジトリのクローンを作成し、リポジトリに保存している他のすべてのプロジェクトと関係なく特定のymlの実行を開始します。`Git Clone Repository`ステップがgitリポジトリのクローンを作成すると、`Script`ステップはプロジェクトの `bitrise.yml`またはその.ymlファイル内の[特定のワークフロー](/bitrise-cli/workflows/)の1つの実行（`bitrise run`）を開始します！コードホスティングサービス用にBitriseで[Webhookを設定](/webhooks/index/)している場合、コードがgitリポジトリにプッシュされると、完成したビルドのアーティファクトを`APPS & ARTIFACTS`タブで表示できます。

{% include message_box.html type="info" title="mono repoプロジェクトでBitriseのサポートが必要ですか？" content=" 上記の方法を採っておりBitriseのサポートが必要な場合、次の可能性が考えられます。プロジェクトに固有で必要なymlをBitriseにアップロードしていないためymlファイルにアクセスできず、Bitrise UIにクローン化されたymlも含まれていない可能性があります。アクセスできるのは、`Git Clone Repository`と`Script`ステップを含む短いワークフローだけです！トラブルシューティングを簡単にするために、gitリポジトリへのアクセスを提供する、_もしくは_ プロジェクト固有のymlを共有することをお勧めします。"%}

{% include message_box.html type="note" title="ワークフローエディタをローカルで使用する" content=" [ワークフローエディタをローカル](https://github.com/bitrise-io/bitrise-workflow-editor)で使用する場合、`bitrise.yml`というファイル名の.ymlファイルのみをサポートし、1フォルダにつき1つの`bitrise.yml`しか保存できないためご注意ください。" %}