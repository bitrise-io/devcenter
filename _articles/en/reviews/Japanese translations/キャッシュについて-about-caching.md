---
title: キャッシュについて (About Caching)
redirect_from: []
date: 2019-04-17 13:52:08 +0000
published: false

---
The caching will tar all the cached directories and dependencies, and store them securely in Amazon S3.

キャッシュはAmazon S3において、全てのキャッシュされたディレクトリや依存性をtarし、安全に保存します。

{% include message_box.html type="info" title="When does the Build Cache gets auto-deleted?ビルドキャッシュが自動削除されるのはいつですか？" content=" The Build Cache, related to a **specific branch**, expires/is auto-deleted after 7 days, **if there's no new build on that branch in the meantime**. This means that **if you do builds on a specific branch every day** (more frequently than a week), **it'll never expire/won't get deleted automatically**. If you don't start a build on that specific branch for more than 7 days, then the related cache will be removed, and your next build will run like the first time, when there was no cache for that branch yet.

ビルドキャッシュは**指定されたブランチ**との関連性があり、**そのブランチ上で新しいビルドが行われなかった場合**、７日後に有効期限が切れます（自動削除されます）。これは**もしその指定されたブランチで毎日**（週一回以上）**ビルドを行えば**、**有効期限が切れる（自動削除される）ことはありません**。７日以上特定のブランチでビルドを開始しなかった場合、関連したキャッシュは削除され、そのブランチにキャッシュがなければ、次のビルドは初期状態で走ることになります。"%}

## Setup　セットアップ

### Bitrise steps for caching　Bitriseのキャッシュステップ

All you need to get started is adding two steps to your Workflow:  
開始するには、まずワークフローに以下の２つのステップを追加してください。

* `Bitrise.io Cache:Pull` step to download the previous cache (if any)
* `Bitrise.io Cache:Push` step to check the state of the cache and upload it if required
* `Bitrise.io Cache:Pull`ステップは以前のキャッシュ（もしあれば）をダウンロードします。
* `Bitrise.io Cache: Push`ステップはキャッシュの状態をチェックし、必要であればアップロードを行います。

You should add the `Bitrise.io Cache:Pull` (download) step right before you'd use the cache. For example, in the case of an iOS app, you can insert the `Bitrise.io Cache:Pull` step between the `Git Clone Repository` and the dependency installer steps (for example, the `Run CocoaPods install` or `Carthage` steps). You should not put the `Bitrise.io Cache:Push` step BEFORE the `Git Clone Repository` step.

The `Bitrise.io Cache:Push` step should be the very last step in the workflow.

You can find example build cache configurations/guides at our [build-cache discuss page](https://discuss.bitrise.io/tags/build-cache).

キャッシュを使用する直前に`Bitrise.io Cache:Pull`（ダウンロード）ステップを追加するのをおすすめします。例えば、iOSアプリの場合、`Git Clone Repository`と依存インストーラーステップ（`Run CocoaPods install`や`Carthage`ステップなど）の間に`Bitrise.io Cache:Pull`を挿入します。`Git Clone Repository`ステップの前に`Bitrise.io Cache:Push`ステップの配置は行わないでください。

`Bitrise.io Cache:Push`ステップはワークフローの中でも一番最後辺りのステップになります。

Bitriseの[build-cache discussページ](https://discuss.bitrise.io/tags/build-cache)にてビルドキャッシュの設定例やガイドを確認することができます。

### Ignore files/dependencies　ファイルや依存を無視する

You can set the path to the items you want the cache to **ignore** in the `Ignore Paths from change check` field.

`Ignore Paths from change check`欄にて**無視**したいキャッシュの項目へパスをセットすることができます。

* Paths must be prefixed with `!` to get ignored from the cache archive. If you don't prefix the path with an `!`, the path will NOT get ignored from the cache archive. If a path is located inside a specified cache path item and the path is NOT prefixed with an `!`, the path will be included in the cache archive, but it will not be checked for changes.
* パスはキャッシュアーカイブから無視するために`!`の前に付ける必要があります。`!`がパスの前にない場合、そのパスはキャッシュアーカイブから無視されることはありません。また、パスが特定のキャッシュパス項目の中に位置していて、`!`の前にパスがない場合は、そのパスはキャッシュアーカイブに含まれますが、変更へのチェックは行われません。

To ignore a path element, part of a path or exclude a full directory, check out these elements:

パス要素（パスの一部分やフルディレクトリを除く）を無視するには、以下の要素を確認してください：

* `*` replaces a path element, for example, `a/*/b` will match `a/x/b`.
* `**` replaces a part of the path, for example, `a/**/b` will match `a/x/y/z/b`.
* `/` excludes a full directory if `/` is placed AFTER a directory, for example, `/my/full/path` will look like this `/my/full/path/`.
* `*`はパス要素に取って代わることができます。例えば、`a/*/b`は`a/x/b`とマッチします。
* `**`じゃパスの一部分と取って代わることができます。例えば、`a/**/b` は`a/x/y/z/b`とマッチします。
* `/`がディレクトリの後に配置されている場合、`/`はフルディレクトリを除外します。例えば、`/my/full/path`は`/my/full/path/`のように見えます。

{% include message_box.html type="info" title="Tips on ignoring pathsパスの無視に関するTips" content=" You **can't ignore** a path which results in an invalid cache item. For example, if you specify \`a/path/to/cache\` path to be cached, you can't ignore \`a/path/to\`, as that would ignore every file and wouldn't check for changes, hence no fingerprint could be generated for \`a/path/to/cache\`.

You **can**, however, **ignore paths INSIDE a cache path**. For example, if your path is \`a/path/to/cache\`, you can ignore \`a/path/to/cache/.ignore-me\`, unless that's the only file inside \`a/path/to/cache\`.

無効なキャッシュ項目と結果が出たパスについては、パスの無視は行なえません。例えば、キャッシュされるパスを`a/path/to/cache`と指定する場合、`a/path/to`の無視は行えませんが、全てのファイルを無視し変更のチェックを行わないので、`a/path/to/cache`に指紋が生成されることはありません。

しかし、**キャッシュパス内部でのパスの無視は行なえます**。例えば、`a/path/to/cache`があなたのパスであれば、ファイル内部に`a/path/to/cache`だけでない限り、`a/path/to/cache/.ignore-me`を無視することができます。"%}

## Download and delete caches

キャッシュのダウンロードとキャッシュ

You can download and delete caches for every branch which generated a cache in the `Manage Build Caches` section of your app's `Settings` tab.

アプリの`Settings`タブの`Manage Build Caches`セクションにある、キャッシュを生成したブランチ毎にキャッシュのダウンロードと削除が行なえます。

{% include message_box.html type="warning" title="Delete a single branch's cache単一ブランチのキャッシュを削除する" content=" If you only want to delete the cache which is related to a single branch, you should also delete the default branch's cache too! For more details, see the [If a build runs on a branch which doesn't have a cache yet, it'll get the main/default Branch's cache](#if-a-build-runs-on-a-branch-which-doesnt-have-a-cache-yet-itll-get-the-maindefault-branchs-cache) section.

単一ブランチに関連性があるキャッシュのみを削除したい場合、デフォルトブランチのキャッシュも削除しなければなりません！詳細については、[If a build runs on a branch which doesn't have a cache yet, it'll get the main/default Branch's cache](#if-a-build-runs-on-a-branch-which-doesnt-have-a-cache-yet-itll-get-the-maindefault-branchs-cache) をご覧ください。"%}

You can see the size of the caches and the last time a given cache was used in the popup window.

キャッシュのサイズやポップアップウィンドウで使用された直近のキャッシュを確認することができます。

## Technical notes　テクニカルノート

### Build Cache feature　ビルドキャッシュ機能

The Build Cache feature is split into two parts, the `Build Cache API` and the `Steps`.

The `Build Cache API` is a simple API, with only one responsibility: you can request a download or an upload URL from the API. It also makes sure that you have the required access rights to the resource (Build Cache Archive), but other than that its only responsibility is providing the secure - time-limited and expiring - download and upload URLs. It does not process the files.

ビルドキャッシュ機能は、`Build Cache API`と`Steps`の２つに分けることができます。

`Build Cache API`はシンプルなAPIであり、一つの役割を果たします：APIからURLのダウンロードやアップロードをリクエストすることができます。また、リソース（ビルドキャッシュアーカイブ）への必要なアクセス権があることを確実にします。しかし、このAPIの唯一の役割は、安全で・時間制限があり・失効するURLのダウンロード・アップロードを提供することです。ファイルの処理は行われません。

The Steps are the place where the "magic" happens. The whole logic of comparing caches (to see if there was any relevant change) and creating the cache archives is done by the Steps. This also means that you can write your own Steps and implement your own comparison and compression logic. The Step just has to use the Build Cache API to get download and upload URLs, there's no restriction on the cache file format or on its content.

`Steps`は”魔法”がかかる場所でもあります。キャッシュの比較（関連した変更がある場合）やキャッシュアーカイブの作成の全てのロジックがステップによって行われます。また、これは自分自身でステップを書いたり、自分でロジックの比較や圧縮を実行する事ができるという意味でもあります。ビルドキャッシュAPIを使ってURLのダウンロード・アップロードを行うためだけのステップなので、キャッシュファイルフォーマットやその内容に関する制限はありません。

A couple more handy tips:  
お手軽なtips

* You can create your own Cache steps
* You can create and use your own Build Cache server and API
* 自分自身のキャッシュステップの作成が可能
* 自分自身のビルドキャッシュサーバーとAPIの作成・使用が可能

### The cache might or might not be available　

You should write your code in a way that it won't fail if the cache can't be accessed.

もしキャッシュが接続されなければ、正しい手順で失敗しないコード作成をしてください。

### The cache is downloaded over the internet　インターネットでキャッシュがダウンロードされる

This means that if you store files which are downloaded from a CDN/cloud storage, you might not see any speed improvement, as downloading it from the Bitrise Build Cache storage will probably take about the same time as downloading it from its canonical CDN/cloud storage location.

これはCDN/cloudストレージからダウンロードされたファイルを保存している場合、スピードの向上は見られません。それは、キャッシュをBitriseビルドキャッシュストレージからダウンロードするのは、標準的なCDN/cloudストレージ場所からダウンロードするのとほぼ同じくらいの時間がかかるからです。

{% include message_box.html type="important" title="When to store a dependency in Bitrise Build Cache?どのタイミングでBitriseビルドキャッシュ内の依存関係を保存するべきですか？" content=" Storing a dependency in Bitrise Build Cache might help if you have **reliability** issues with the resource's/dependency's canonical download location. Popular tools/dependencies might get rate limited (for example, [PhantomJS](https://github.com/Medium/phantomjs/issues/501)). CDN servers might have availability issues, like jCenter/Bintray. Here are a few examples: [#1](http://status.bitrise.io/incidents/gcx1qn5lj7yt), [#2](http://status.bitrise.io/incidents/3ztgwxvwq7rm), and [#3](http://status.bitrise.io/incidents/dqpby9m1n274). If that's the case, storing the dependency in Bitrise Build Cache might help you. It might not improve the build time but **it definitely can improve the reliability**.

Bitriseビルドキャッシュ内で依存関係を保存することは、リソース・依存関係の標準的なダウンロード場所での信頼性に関する問題がある場合、役に立ちます。[PhantomJS](https://github.com/Medium/phantomjs/issues/501)のような人気のあるツール・依存関係におけるレートは制限される可能性もあります。CDNサーバーには、jCenterやBintrayのような利用状況の問題に直面する可能性もあります。例 [#1](http://status.bitrise.io/incidents/gcx1qn5lj7yt), [#2](http://status.bitrise.io/incidents/3ztgwxvwq7rm), [#3](http://status.bitrise.io/incidents/dqpby9m1n274)をご覧ください。これらのケースの場合、Bitriseビルドキャッシュに依存関係を保存することは役に立ちます。ビルド時間の向上は見られないかもしれませんが、信頼度については必ず向上します。"%}

### The cache is stored as one archive file　単一アーカイブファイル内にキャッシュが保存されている

So if you have multiple paths you want to cache and any of the paths gets updated, **it'll update the whole cache archive**, including all the paths you cache.

キャッシュしたい複数のパスをお持ちで、パスのどれかがアップデートされていると、キャッシュを行う全てのパスを含む、**全てのキャッシュアーカイブをアップデートします**。

### If a build runs on a branch which doesn't have a cache yet, it'll get the cache of the main/default branch  
キャッシュがまだないブランチでビルドを実行する場合、メインもしくはデフォルトのブランチからキャッシュを入手します

The build on a non-default branch, to speed things up, can access (read-only) the cache of the `primary` branch, until a successful build is found on the new branch. Once a build on the new branch pushes a cache, new builds on that branch will get the cache of the branch. _Caches are stored and available for every branch separately._

デフォルトではないブランチでのビルドは、新ブランチで成功したブランチが見つかるまで`primary`ブランチのキャッシュに接続します（読み取り専用）。一旦新ブランチ上でのビルドがキャッシュをプッシュしたら、そのブランチ上での新しいビルドがブランチのキャッシュを入手します。_キャッシュは別々にブランチ毎で保存され、利用可能です。_

You can see which is your **default branch** if you click the `Settings` tab of your app.

アプリの`Settings`タブをクリックすればどれが自身の**デフォルトブランチ**であるか確認することができます。

If a build was started with a code push, the cache will be available on the push branch and will be pulled from the same push branch. If you start a Pull Request (PR), the cache of the PR source branch will be pulled and pushed to the same source branch. In the case of a tag event, there is no code change so there is nothing to cache.

コードプッシュによってビルドが開始された場合、キャッシュはプッシュブランチで利用可能で、その同じプッシュブランチからキャッシュがプルされます。プルリクエストを開始する場合、そのPRソースブランチのキャッシュはプルされ、同じソースブランチにプッシュされます。タグイベントの場合、コード変更はないので、キャッシュする必要はありません。