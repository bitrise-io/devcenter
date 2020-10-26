---
changelog: 
last_modified_at: 
tag:
- builds
- troubleshooting
title: GitHub ChecksでBitrise Checksを利用する
redirect_from: []
description: Bitrise Checks は、Bitrise が GitHub に送り返すステータスチェックを拡張する Github アプリです。 Bitrise
  Checks には、 Bitrise のビルドサマリーとチェックステータスが含まれています。
menu:
  builds-main:
    weight: 32

---
Bitrise Checks は、Bitrise が GitHub に送り返すステータスチェックを拡張する Github アプリです。 Bitrise Checks には、 Bitrise のビルドサマリーとチェックステータスが含まれています。 GitHub 上のプルリクエストの **Details** リンクをクリックすると、 Bitrise Checks を見ることができます。これは、 Bitrise Checks がプルリクエストに添付した詳細なビルドサマリーとビルドステータスを GitHub の **Checks** タブに展開します。

![{{ page.title }}](/img/all-checks-have-passed.png)

![{{ page.title }}](/img/bitrise-summary-gh-checks.jpg)

チェックの状態は3種類あります。

* Success
* Failed
* Action required (手動でプルリクエストを承認する場合)

## Bitrise Checks のインストール

Bitrise Checks は数クリックで利用できます。さあ、やってみましょう。

1. [Dashboard](https://app.bitrise.io/dashboard/builds) であなたの組織のアプリを選択します。
2. アプリの **Settings** タブを選択します。
3. **ENABLE GITHUB CHECKS** の説明にある **install our app to your GitHub repository** リンクをクリックします。 Bitrise Checks をインストールする必要があるので、まだスイッチを有効化しないでください。 有効化については [後ほど](/github-checks/#enabling-github-checks) 説明します。

   ![{{ page.title }}](/img/disabled-toggle-githubchekcs.jpg)

   このリンクをクリックすると GitHub の **Bitrise Checks** インストールページに移動します。
4. **Install Bitrise Checks** ページで、Bitrise Checks を追加するユーザーまたは組織を選択します。

   ![{{ page.title }}](/img/install-bitrise-checks.jpg)
5. Bitrise Checks をすべてのリポジトリにインストールするか、一部のリポジトリにのみインストールするかを選択します。これにより、Bitrise Checks があなたのリポジトリに統合され、 GitHub Checks を使用してチェック結果を表示する権限が付与されます。

   ![{{ page.title }}](/img/install-bitrise-checks.jpg.png)
6. GitHub のプロンプトで、 GitHub のパスワードを入力します。

うまくいけば、GitHub の **Bitrise Checks** ページが表示されます。ページの上部に、Bitrise Checks が GitHub アカウントに正常にインストールされたことを示す青いメモが表示されているはずです。

![{{ page.title }}](/img/installed-bitrise-checks.jpg)

## GitHub Checksの有効化

あとは [Bitrise](https://app.bitrise.io/dashboard/builds) のアプリのページで GitHub Checks を有効化するだけです。

{% include message_box.html type="important" title="Enabling GitHub Checks is limited" content="組織の所有者とアプリの管理者のみが、アプリの **Settings** ページで GitHub Checks を有効化することができます。"%}

1. あなたの組織の [Dashboard](https://app.bitrise.io/dashboard/builds) に移動します。
2. Bitrise Checks をインストールした GitHub リポジトリのアプリをクリックします。
3. アプリの **Settings** タブを選択します。
4. **ENABLE GITHUB CHECKS** のスイッチを切り替え有効化します。

![{{ page.title }}](/img/enabled-toggle-githubchecks.jpg) **ENABLE GITHUB CHECKS** のスイッチが切り替えられない場合、

* 先に Bitrise Checks をインストールしないとスイッチを切り替えることはできません。
* すでに Bitrise に追加されているアプリの GitHub リポジトリの名前を変更または移動し、そのアプリに Bitrise Checks をインストールした場合はスイッチが機能しません。Github 上のURLと Bitrise 上のURLが完全に一致している場合にのみ、**ENABLE GITHUB CHECKS** スイッチが機能します（リダイレクトURLは許可されていません）。その場合は、**Settings** タブの **REPOSITORY URL** を 新しい GitHub URL に手動で更新する必要があります。

  ![{{ page.title }}](/img/repository-url-change.jpg)

これで完了です。GitHub 上でアプリに送ったプルリクエストは Bitrise Checks で検証され、Bitrise 上でビルドが自動的に開始されます（Bitrise 上で[プルリクエストのトリガー](/builds/triggering-builds/trigger-pull-request/)が適切に設定されている必要があります）。

Bitrise では、アプリのページに簡単にアクセスできます。ビルドサマリーをクリックするか、**Checks** タブの **Bitrise Checks** リンクをクリックすると、アプリのビルドページにすぐにアクセスできます。

### Bitrise Checks への切り替え

マージ前のプルリクエストですでにステータスチェックを使用していた場合は、それが `ci/bitrise/...` チェックシステムであったはずです。Bitrise Checks を使用するには、手動で `ci/bitrise/...` から **Bitrise** に切り替える必要があります。では、その方法を見てみましょう。

![{{ page.title }}](/img/checks-pending.png)

1. あなたのリポジトリの **Settings** タブに移動します。
2. サイドメニューの **Branches** を選択します。 **Require status checks to pass before merging** の下を見ると `ci/bitrise/...` が選択されています。

   ![{{ page.title }}](/img/require-status-checks.png)
3. `ci/bitrise/...` の代わりに **Bitrise** を選択します。
4. プルリクエストをマージします。

## GitHub Checks の無効化

アプリの **Settings** ページで **ENABLE GITHUB CHECKS** スイッチを左に切り替えれば、Bitrise の GitHub Checks を簡単に無効にすることができます。

GitHub アカウントから Bitrise Checks をアンインストールする場合は、[Install GitHub Apps](https://github.com/settings/installations/) ページの **Uninstall** ボタンをクリックしてください。

![{{ page.title }}](/img/disable-ghckecks.jpg)

{% include banner.html banner_text="Let's install Bitrise Checks" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}