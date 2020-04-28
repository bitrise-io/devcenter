---
changelog:
published_at:
last_modified_at:
title: 独自のStepを作成・シェアする
tag: []
description: ''
redirect_from: []
menu:
  contributors-main:
    weight: 2

---
独自のStepを作成するには、`bitrise` CLI (v1.6.1以上) を用意する必要があります。BashまたはGoツールキットを使用してStepを生成することができます。

Bitrise CLIが未インストールの場合、[ここ](/bitrise-cli/installation/)でインストールガイドを確認してください。

{% include message_box.html type="important" title="最新のBitrise CLIを使用してください！" content=" 最新のBitrise CLI、もしくは最低でもバージョン1.6.1以上のCLIであることに注意してください。`bitrise --version`を呼び出してBitrise CLIバージョン情報を確認することができます。これはCLIがStepを作成するのに`:step`プラグインを使用するのが理由で、このプラグインはコアプラグインとしてバージョン1.6.1から導入されています。"%}

## Stepの作成

Bitrise CLIのインストールが完了すれば、3つの簡単なコマンドを使って自己流のStepを作成することができます。

    # If this is the very first time you use the CLI / if you just installed the CLI run this:
    bitrise setup
    
    # If you want to update the Step plugin to the latest version:
    bitrise plugin update step
    
    # And to generate a new Step, simply run this command and follow the guide it prints:
    bitrise :step create

コマンド無しで`bitrise :step`を動作させると、プラグインのヘルプをプリントします。

完了すれば、`step.yml`と`main.go` (Goの場合) か`step.sh` (Bashの場合) ファイルを新規のStepレポジトリに入れます。

* `step.yml`ファイルはStepインターフェースの定義であり、依存・Stepインプット・Stepアウトプットや他のStepのプロパティを含んでいます。
* `main.go`または`step.sh`にはStepの機能性が含まれています。ですので、**ワーキングディレクトリを変更しないでください！**

生成されたStepのREADMEには以下の説明が含まれています：

* ローカルでStepを動作させる方法 (コードをコミットする前も含む)
* [The ](/bitrise-cli/steps/#special-Step-sources)`[git::](/bitrise-cli/steps/#special-Step-sources)`[ Step reference](/bitrise-cli/steps/#special-Step-sources) を使ってビルドを行う際のStepをテスト・使用する方法
* Bitrise StepLib (Bitrise ステップライブラリ) 経由で他者にStepをシェアする方法

{% include message_box.html type="important" title="Stepの構成に進む前に" content=" [知っておくべき重要ポイント](/bitrise-cli/most-important-concepts/)を確認してください！"%}

## Step開発ガイドライン

新しく作成されたStepは'Skelton (スケルトン)'と呼ばれます：`step.yml`ファイルでは、特定のプロパティがデフォルト値で割り当てられており、インプットとアウトプットの例がデフォルト値の構造を示すために作成されます。

例えばStepをシェアする場合、多くのStepプロパティが自動的に生成されますが、必要に応じて他のプロパティを手動で設定する必要があります。プラグインを使って新規のStepを作成する時、`project_type_tags` プロパティのみ、デフォルトではいくつかの値が不足しています。こういった場合、`step.yml`ファイル内で全てのプロパティを手動で修正することができます。

StepのインプットならびにアウトプットはStepプロパティでもあります。詳細については、[Step properties](/bitrise-cli/step-properties), [Step inputs](/bitrise-cli/step-inputs), [Step outputs](/bitrise-cli/step-outputs)をご覧ください。

### 規定に名前をつける：バージョニング, Step ID, Stepインプット・アウトプット

* Stepには[セマンティック バージョニング](https://semver.org/lang/ja/) (MAJOR.MINOR.PATCH) を使用する必要があります。例：`1.2.3`
* Step IDについては、単語2つ以上を使用する場合、ハイフンを使って区切る必要があります。例：`set-ios-bundle-identifier`
* インプットについては、**小文字**でスネークケース (単語の間をアンダーバーでつなぐ命名規則) を用いたインプットIDを使用します。例：`input_path`
* Stepインプットが値のリストを受け入れる場合、IDの最後に`_list`を追加します (例：`input_path_list`) 。区切る場合はバーティカルバーを使用することを強くお勧めします (例：`first value|second value`)。
* アウトプットについては、**大文字**でスネークケースを用いたアウトプットIDを使用します。例：`OUTPUT_PATH`
* アウトプットが値のリストを規定する場合、IDの最後に`_LIST` を追加します（例：`OUTPUT_PATH_LIST` ）。区切る際は、バーティカルバーを使用することを強くお勧めします（例：`first value|second value`）。
* 空のアイテムは除去しましょう！例：`first value| |second value` は `first value|second value`と同等に扱われます。

### Stepでの環境変数について

\**Stepのコードに直接、環境変数を使わないでください。**代わりに、Stepのインプットとして全ての外的変数をエクスポーズ (公開)して、ご使用になりたい環境変数へインプットのデフォルト値をセットします。このアクションは`step.yml`ファイルにて行うことができます。この方法により、Stepのテストがより簡単になり、Stepのユーザーは必要な変数のコードを精査せずに容易にインプットを宣言することができます。

**例：**

`xcode-archive`Stepはアウトプット環境変数`$BITRISE_IPA_PATH`を生成します。Step内で以下のようなインプットを作成してください：

    inputs:
      - ipa-path: $BITRISE_IPA_PATH
        opts:
          title: "IPA path"

### Stepでのシークレット環境変数

Stepインプットを**Sensitive**にマークして、valuesが公開されないようにすることができます。Sensitiveインプットは値として、[Secrets](/bitrise-cli/secrets/) (シークレット環境変数) のみ許可します。これでビルドログで表示されることはありません。

`is_sensitive`プロパティを使用してStepインプットをSensitiveにマークします。このプロパティには2つの値が存在します：`true` と `false`

{% include message_box.html type="important" title="`is_expand` プロパティ" content="Sensitiveにマークを入れると、`is_expand`プロパティのインプットは、`true`である必要があります (デフォルトで設定されています)。"%}

    inputs:
      - certificate_urls: $BITRISE_CERTIFICATE_URL
        opts:
          title: "Certificate URL"
          is_sensitive: true

### サブモジュールと依存

\**サブモジュールを使用したり、Step内でオンデマンドでダウンロードした他リソースを要求しないでください。**StepのレポジトリにStepに必要なものを全て収納するようにしてください。ネットワークエラーや認証問題などによりリソースのダウンロードが失敗する可能性があります。

サブモジュールについては、レポジトリのサブモジュールとして使用するのではなく、他のレポジトリのコンテンツを含めるようにします。

しかし、OSの dependency managerからフェッチが可能な依存を宣言することができます (例：`apt-get` や `brew`)。依存の宣言についての情報は、[Stepプロパティ](/bitrise-cli/step-properties)をご覧ください。

他にもご質問がある方は、Bitriseの[community discussion site](https://discuss.bitrise.io/)を覗いてみましょう。お問い合わせは[こちら](https://www.bitrise.io/contact)から。

**新しいStepのアイデアがほしいですか？**[リスト](https://discuss.bitrise.io/search?q=tags%3Acontrib-this-feature%20tag%3AStep)がありますので、こちらからヒントを得てください :)

## 新Stepのシェア

全世界のユーザーに新しく作成したStepを共有したいですか？簡単なセットアップでシェアできるようになっています！

コマンド `bitrise share`を使って開始するのを推奨します。Stepのシェアについてのガイドをプリントするようになっているので、これをお使いください！コマンドラインインターフェースを開始する前に確認したい方もいるので、ここでも重要な情報をまとめます。

1. パブリックgitレポジトリにStepが保管されていることを確認します。
2. Fork the StepLib repository you want to have your step in. We recommend using the [The official Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib)!  
   Stepを管理したいStepLibレポジトリをフォークします。[BitriseオフィシャルStepLib](https://github.com/bitrise-io/bitrise-steplib)を使用するのをお勧めします！
3. シェアするのに、ローカルでフォークされたStepLibを準備します：

       $ bitrise share start -c https://github.com/[your-username]/bitrise-steplib.git
4. Stepのレポジトリにstep version tagを追加します。
5. フォークされたStepLibレポジトリにStepを追加します：

       $ bitrise share create --tag [step-version-tag] --git [step-git-uri].git --stepid [step-id]
6. オプションで、フォークされたStepLib上のヘルスチェックを行うことができます：

       $ bitrise audit -c https://github.com/[your-username]/bitrise-steplib.git
7. オリジナルのStepLibレポジトリにプルリクエストを作成します。

これで完了です！いったんプルリクエストがマージされると、選択したStepLibレポジトリを使用する人であれば誰でも使用することができます。

<div class="banner"> <img src="/assets/images/banner-bg-888x170.png" style="border: none;"> <div class="deploy-text">Explore Bitrise from your Terminal</div> <a target="_blank" href="[https://app.bitrise.io/cli](https://app.bitrise.io/cli "https://app.bitrise.io/cli")"><button class="button">Go to Bitrise CLI</button></a> </div>