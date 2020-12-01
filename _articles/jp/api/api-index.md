---
changelog: 
last_modified_at: 
title: API
redirect_from: "/jp/api/v0.1/"
menu:
  main:
    identifier: api-main
    weight: 29

---
Bitrise APIへようこそ！みなさんが私たちのウェブサイトとCLIでご利用している機能の多くはAPI経由でも使用可能です。私たちのCI/CDサービスとともに効率的なパイプラインを使って、Bitrise APIを様々やシステムやサービスに統合することができます。

{% include message_box.html type="warning" title="APIは開発中です" content=" APIは開発中です: 私たちは将来的に、新しいエンドポイントの追加とおそらく既存のエンドポイントの更新を行います。 "%}

API開発の進捗を確認するとことができます: [議論に参加しよう](https://discuss.bitrise.io/t/bitrise-api-v0-1-work-in-progress/1554)! フォローすることで、そこで私たちがお知らせしている新しいエンドポイントや変更の通知を受けることができます。

気軽に貢献しよう！もし希望する新しいAPI機能や新しいエンドポイントがある場合は、[ここでリクエストできます！](http://discuss.bitrise.io/t/bitrise-public-api/37)

{% include message_box.html type="info" title="Bitrise APIエンドポイントドキュメント" content="[Bitrise APIエンドポイントリファレンス](https://api-docs.bitrise.io/)で、現在利用可能なエンドポイントとそのパラメーターを確認できます！"%}

## APIドメイン/ホストとバージョン管理

Bitrise APIのホストはこちらです: [https://api.bitrise.io/](https://api.bitrise.io/ "https://api.bitrise.io/")

ルートを除く全てのエンドポイントはバージョン管理されています。そのバージョンはURLのホストのすぐ後ろに含まれる必要があります。

例: [https://api.bitrise.io/v0.1/me](https://api.bitrise.io/v0.1/me "https://api.bitrise.io/v0.1/me") (認証必須)

現在は `v0.1` だけが存在します。

`v0.1` は長期間の互換性は保証されませんが、なにかやむを得ない理由がない限り、他に不都合が起きないようベストを尽くします。私たちが `v0.1` に対し満足の行く結果を得ることができれば、それを `v1.0` としてフリーズし、長期間のサポートを提供する予定です。