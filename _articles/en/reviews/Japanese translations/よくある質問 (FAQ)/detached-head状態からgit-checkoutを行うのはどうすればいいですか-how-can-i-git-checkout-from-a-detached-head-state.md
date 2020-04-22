---
published_at:
last_modified_at:
tag: []
title: Detached HEAD状態からgit checkoutを行うのはどうすればいいですか？(How can I git checkout from a
  detached head state?)
redirect_from: []
description: ''
published: false

---
## Detached HEADが原因でビルドが失敗してしまう事象

ビルドが失敗してしまう原因はたくさんありますが、理由としてはどのようにビルドが開始されたのか、そしてどのようにGitが機能しているのかに深い関わりがあります。

マニュアルでビルドを開始し、ブランチの指定のみを行う際は、`git clone`がそのブランチをクローン (複製) します。

もしWebhookを使ってコード変更のビルドを自動トリガーで実行する場合であれば、レポジトリのホストがWebhookのビルドをトリガーしたコミットのcommit hashを送信します。そして指定されたコミットを`git-clone`がクローンします。これはローカルのgitインスタンスをDetached HEAD状態へと配置します。

では`git checkout COMMITHASH`を使ってローカルでテストしてみましょう。

    $ git checkout 6415740f2e73d65eb85969324d6d66f9a36bc70f
    
    Note: checking out '6415740f2e73d65eb85969324d6d66f9a36bc70f'.
    
    You are in 'detached HEAD' state. You can look around, make experimental
    changes and commit them, and you can discard any commits you make in this
    state without impacting any branches by performing another checkout.
    
    If you want to create a new branch to retain commits you create, you may
    do so (now or later) by using -b with the checkout command again. Example:
    
      git checkout -b <new-branch-name>
    
    HEAD is now at 6415740... commit message

上記のコマンドのログからおわかりのように、今現在Detached HEAD状態であり、これはHEADが現在のブランチのtip**ではなく**、COMMIT OBJECTを指していることを意味します。その上、これはどのブランチにも属していないという意味でもあるので、この段階ではどのブランチにもコミットをプッシュすることはできません。Detached HEAD状態でできることは：

* コミットの作成
* このコードバージョンでテストの実行が成功したかどうかの確認

**ブランチへ直接**コミットとプッシュをできるようにするには、ブランチをまず確認することから始まります。方法を見ていきましょう！

## 解決策

上記のようなエラーメッセージは、Detached HEAD状態からブランチへ戻すための解決策を提案します。 `git checkout -b BRANCH`を使用して現在のブランチからチェックアウトするだけで、希望のブランチへ戻すことが可能です。変更のためのコミットやプッシュを行う前でも、現在のブランチ (`git checkout BRANCH`)からチェックアウトができます。このオプションを選択すると、ビルド中にビルドやテストしたものとは異なるコードの状態でコミットする可能性があることに注意してください。

{% include message_box.html type="example" title="簡単な例" content="次のようなケースの場合：指定したコミットを使って[bitrise.io](https://www.bitrise.io/)上でビルドを開始する`feature/a`に、コードをプッシュするとします。その後、急いで他のビルドを開始する`feature/a`に他のコミットをプッシュします。もし2回目のコミットが (`git checkout BRANCH`をすることになっている)1回目のビルドより早く終了した場合、`feature/a`に新しいコミットがあるので、`git checkout feture/a`は1番目ではなく2番目のコミットを指す可能性があります。これは、まず `git checkout -b my_temp_bump_branch` してから(この例では`feature/a`だった) ソースブランチへ`my_temp_bump_branch` を `git merge` することで直すことができます。

一般的に`git checkout`を行う際には、どのブランチをチェックアウトするのか慎重になる必要があります。例えば、ビルドが`feature/a`から始まった場合、ハードコーディングされたもの (例: masterブランチ) ではなくチェックアウトするブランチを確認してください。`BITRISE_GIT_BRANCH`[環境変数](/jp/builds/available-environment-variables/)を通じてビルドのブランチを入手する方法について見ましょう。"%}

### ローカルでgit checkoutのテスト

では、ローカルでも試してみましょう。

 (commit hashが利用可能である時に) Webhookによってビルドがトリガーされることは、以下のコードと類似しています：

    git checkout COMMITHASH

ビルドログは以下のように表示されます：

    - RepositoryURL: git@github.com:zoltan-baba/sample-apps-react-native-ios-and-android.git
    - CloneIntoDir: /Users/vagrant/git
    - Commit: 4d31f45eb2db037f0143f509872a619f9aac8c09
    - Tag: 
    - Branch: testing
    - BranchDest: 
    - PRID: 0
    - PRRepositoryURL: 
    - PRMergeBranch: 
    - ResetRepository: false
    - CloneDepth: 0
    - BuildURL: https://app.bitrise.io/build/349008b006272cac
    - BuildAPIToken: [REDACTED]
    - UpdateSubmodules: true
    - ManualMerge: true
    git "init"
    Initialized empty Git repository in /Users/vagrant/git/.git/
    git "remote" "add" "origin" "git@github.com:zoltan-baba/sample-apps-react-native-ios-and-android.git"
    git "fetch"
    Warning: Permanently added 'github.com,192.30.253.113' (RSA) to the list of known hosts.
    From github.com:zoltan-baba/sample-apps-react-native-ios-and-android
     * [new branch]      master     -> origin/master
     * [new branch]      testing    -> origin/testing
    git "checkout" "4d31f45eb2db037f0143f509872a619f9aac8c09"

If the build is started without a commit hash, only with a branch parameter, that’s similar to:

commit hashではなく、branch parameter (ブランチパラメータ) だけを使ってビルドが開始される場合、以下のようなコードになります：

    git checkout BRANCH
    
    - RepositoryURL: git@github.com:BanyikAnna/sample-apps-react-native-ios-and-android.git
    - CloneIntoDir: /Users/vagrant/git
    - Commit: 
    - Tag: 
    - Branch: master
    - BranchDest: 
    - PRID: 0
    - PRRepositoryURL: 
    - PRMergeBranch: 
    - ResetRepository: false
    - CloneDepth: 0
    - BuildURL: https://app.bitrise.io/build/0be5f085fb1d8d4d
    - BuildAPIToken: [REDACTED]
    - UpdateSubmodules: true
    - ManualMerge: true
    git "init"
    Initialized empty Git repository in /Users/vagrant/git/.git/
    git "remote" "add" "origin" "git@github.com:BanyikAnna/sample-apps-react-native-ios-and-android.git"
    git "fetch" "origin" "master"
    Warning: Permanently added 'github.com,140.82.114.3' (RSA) to the list of known hosts.
    From github.com:BanyikAnna/sample-apps-react-native-ios-and-android
     * branch            master     -> FETCH_HEAD
     * [new branch]      master     -> origin/master
    git "checkout" "master"

自分のマシンを使用して、以上の両方をテストすることができます。また、使用するツールが`git checkout COMMITHASH`ケースで動作させるために何をする必要があるのかを確認してください。

## バージョン番号管理

マーケットプレイスへアプリをデプロイする際は、バージョン番号の管理は大変重要です。このセクションでは、今現在Detached HEAD状態にある場合にビルドのバージョン番号を増分していくためのコツを紹介します。

### マニュアルでバージョン番号を増分する

これはセットアップと管理を行うのに最も簡単な方法です。アプリタイプのプロジェクトと定期的 (例：週間隔、月間隔) にリリースをするプロジェクトに最適です。しかし、毎日本番デプロイを複数回行わないものとします。

手動でバージョン番号をバンプする (あげる)ことが可能で、他のコード変更と同じようにできます。このケースでは、アプリのビルド番号として `BITRISE_BUILD_NUMBER`環境変数を使用します。この環境変数はコードへのコミットは不要で、アプリの全てのビルドを[bitrise.io](https://www.bitrise.io)上のビルドへリンクさせることができます。

{% include message_box.html type="note" title="iOS用のバージョンとビルド番号の管理" content=" iOSアプリにはVERSION NUMBERとBUILD NUMBERの情報が両方あります。手動によるバージョン番号を管理、[Set Xcode Project Build Number](https://www.bitrise.io/integrations/steps/set-xcode-build-number) (Xcodeプロジェクトビルド番号) ステップを使った自動によるビルド番号の設定 (例:  `BITRISE_BUILD_NUMBER`) が行えます。"%}

### バージョニングにgit tagを使用する

コードにバージョンを保管したくない場合、バージョニングにgit tagを使用することができます。`git tag x.x.x && git push origin tags/x.x.x`を行うのみで、プッシュされるコミットは不要です。

この方法は、ウェブプロジェクトの継続的なデプロイ作業に最適で、コード内ではバージョン番号はあまり意味がありません。

### コミットの自動生成

すでにお話しましたが、Detached HEAD状態であればコードのプッシュはできません。このケースではコミットを自動生成してバージョン番号を増分します。そして、ビルドがトリガーされるのを防ぐBitriseの[Skip CI](/builds/triggering-builds/skipping-a-given-commit-or-pull-request/)機能をご利用ください。

{% include message_box.html type="important" title="コミットのスキップ" content="生成されたバージョンのバンプコミットをプッシュバックをして、コード変更を行う際に[bitrise.io](https://www.bitrise.io/)上でビルドを開始するWebhookがある場合、そのプッシュもビルドを開始して無限のビルドサイクルへ導かれます！これを直すには[Skip CI](/builds/triggering-builds/skipping-a-given-commit-or-pull-request/#skipping-a-commit)機能を使い自動生成コミットをスキップしてください。"%}

{% include message_box.html type="warning" title="コミットの自動生成にご注意ください" content="この方法を適用する前に、誰がどこにプッシュできるのかの確認や必要なコードレビューなど、念入りな構成を推奨します。GitHubが持つ全ての保護機能を有効化するprotected branches機能を使うこともできます (例: 全てのプルリクエストはマージされる前のマスターブランチと最新である必要があります)。一旦正確に構成されると、この方法は継続的デリバリ (CD) に非常によく機能します。欠点としては、コードの恒常性を確保するので、構成に時間と労力が多少かかってしまいます。"%}