---
changelog:
last_modified_at:
tag: []
title: GitHub ChecksでBitrise Checksを行う (Bitrise Checks on GitHub Checks)
redirect_from: []
description: ''
published: false

---
Bitrise Checksは、BitriseがGitHubに送信する従来のステータスチェックの拡張バージョンを提供するGithubアプリです。Bitrise ChecksにはBitriseのBuild SummaryとCheck Statusが含まれています。GitHub上でプルリクエストの**Details**リンクをクリックすれば、Bitrise Checksを確認することができます。GitHubの**Checks**タブにあるプルリクエストに添付されている詳細なビBuild SummaryとBuild Statusが展開されます。

![](/img/all-checks-have-passed.png)

![](/img/bitrise-summary-gh-checks.jpg)

3つの異なるチェックステータスが表示されます：

* Success. (成功)
* Failed. (失敗)
* Action required (in the case of manual pull request approval). (アクションが必要です (マニュアルのプルリクエスト承認が必要な場合))

## Bitrise Checksのインストール

Bitrise Checksの使用は数クリックでできるようになります。

1. ご自身の[ダッシュボード](https://app.bitrise.io/dashboard/builds)よりOrganizationのアプリを選択します。
2. アプリの**Settings**タブを選択します。
3. **ENABLE GITHUB CHECKS**トグルの説明欄にあるリンク**install our app to your GitHub repository**をクリックします。Bitrise Checksをインストールすることが先ですので、この時点ではまだトグルを動かさないでください。[後ほど](/github-checks/#enabling-github-checks)トグルを右に動かします。

   ![](/img/disabled-toggle-githubchekcs.jpg)

   このリンクよりGitHubの**Bitrise Checks**インストールページに遷移されます。
4. **Install Bitrise Checks**ページにて、Bitrise Checksに追加するユーザーまたはOrganizationを選択します。

   ![](/img/install-bitrise-checks.jpg)
5. 全てのレポジトリ、または指定のレポジトリにBitrise Checksをインストールするかを決めます。これにより、Bitrise Checksに権限を付与してリポジトリと統合し、GitHub Checksを使用してチェック結果を表示します。

   ![](/img/install-bitrise-checks.jpg.png)
6. GitHubプロンプトにて、ご自身のGitHubのパスワードを入力します。

全てがうまくいくと、GitHubの**Bitrise Checks**ページに辿り着きます。ここで、当ページの左上端部にインストールが成功したことを示す青色のメモを確認することができます。

![](/img/installed-bitrise-checks.jpg)

## Bitrise Checksを有効化する

次に、[Bitrise](https://app.bitrise.io/dashboard/builds)のアプリページでGitHub Checksを有効化します。

{% include message_box.html type="important" title="GitHub Checksの有効化は制限されています" content="Organizationのオーナーならびにアプリのadminのみが、アプリの**Settings**ページにあるトグルを有効化することができます。"%}

1. Organizationの[ダッシュボード](https://app.bitrise.io/dashboard/builds)に進みます。
2. Bitrise ChecksをインストールしたGitHubレポジトリのあるアプリをクリックします。
3. アプリの**Settings**タブへ進みます。
4. **ENABLE GITHUB CHECKS**のスイッチを右にトグルします。

![](/img/enabled-toggle-githubchecks.jpg) **ENABLE GITHUB CHECKS**のスイッチを右にトグルできない場合に考えられる理由：

* Bitrise Checksを**最初に**インストールしていないと、右にトグルはできません。インストール完了後に、再度お試しください。
* Bitriseに既に追加されているアプリのGitHubリポジトリのリネームや移動が行われ、Bitrise Checksをインストールした場合です。このケースでは、レポジトリのGitHub URLは変更されています。**ENABLE GITHUB CHECKS**のスイッチは、GitHubとBitriseの両方で完全に一致している (リダイレクトURLは許可されていません) URLのみで機能するようになっています。  
  この場合、新しいGitHub URLを使用してアプリの**Settings**タブにある**REPOSITORY URL**をマニュアルで更新してください。

  ![](/img/repository-url-change.jpg)

完了です！GitHubでアプリに対して開いたプルリクエストはBitrise Checksで検証され、(Bitrise上で適切に[プルリクエストトリガー](/jp/builds/triggering-builds/trigger-pull-request/)がセットされていれば) Bitriseでビルドが自動的に開始されます。

Bitrise上でアプリページに簡単に行くことができます。Build Summaryまたは**Checks**タブの**View more details on Bitrise Checks**のリンクをクリックすることにより、アプリのビルドページへ素早くアクセスすることができます。

### Bitrise Checksへの切り替え

マージする前にプルリクエストでステータスチェックを既に使用している場合、それは `ci/bitrise/...` チェックシステムであると考えられます。Bitrise Checksを使用可能にするには、 `ci/bitrise/...` からマニュアルで**Bitrise**に変更して、詳細なChecksにアクセスしてください。やり方はこちらです！

![](/img/checks-pending.png)

1. レポジトリの**Settings**タブに進みます。
2. サイドメニューから**Branches**をクリックします。**Require status checks to pass before merging**の下に、選択済みのchecks systemとして `ci/bitrise/...` が確認できます。

   ![](/img/require-status-checks.png)
3.  `ci/bitrise/...` の代わりに**Bitrise**を選択します。
4. プルリクエストをマージします。

## Disabling Github Checksを無効化する

Bitrise上でGitHub Checksを無効化するには、アプリの**Settings**ページにある**ENABLE GITHUB CHECKS**のスイッチを左にトグルします。

GitHubアカウントからBitrise Checksをアンインストールする場合、[Install GitHub Apps]()ページの**Uninstall**ボタンをクリックしてください。

![](/img/disable-ghckecks.jpg)

<div class="banner"> <img src="/assets/images/banner-bg-888x170.png" style="border: none;"> <div class="deploy-text">Let's install Bitrise Checks</div> <a target="_blank" href="[https://app.bitrise.io/dashboard/builds](https://app.bitrise.io/dashboard/builds "https://app.bitrise.io/dashboard/builds")"><button class="button">Go to your app</button></a> </div>