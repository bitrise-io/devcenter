---
changelog: 
last_modified_at: 
tag: []
title: API (API)
redirect_from: []
description: ''
summary: ''
published: false

---
Bitrise APIへようこそ！ウェブサイト上やCLIにて使用しているたくさんの機能がAPI経由での使用もできます。効率的なパイプラインを求めるために、BitriseのCI/CDサービスを使って様々なシステムやサービスの統合が可能になります。

{% include message_box.html type="warning" title="APIは現在作業中です" content=" APIは作業中です：新しいエンドポイントを追加、将来的に既存のエンドポイントをアップデートする予定です。"%}

APIの進行過程については追跡することが可能です：[ディスカッション (英) ](https://discuss.bitrise.io/t/bitrise-api-v0-1-work-in-progress/1554)にご参加ください！

お気軽に貢献していただけます！新しいAPIや新エンドポイントのリクエストは[こちら]()から！

{% include message_box.html type="info" title="Bitrise APIエンドポイントドキュメンテーション" content="現在利用可能なエンドポイントとパラメータを見るには[Bitrise API endpoint reference documentation](https://api-docs.bitrise.io/)を確認してください！"%}

## API domain/hostとバージョニング

Bitrise APIのホスト：[https://api.bitrise.io/](https://api.bitrise.io/ "https://api.bitrise.io/")

root oneを除く全てのエンドポイントはバージョン化されています。バージョンはホストの直後にURLが含まれている必要があります。

例：[https://api.bitrise.io/v0.1/me](https://api.bitrise.io/v0.1/me "https://api.bitrise.io/v0.1/me") (認証が必要)

この時点でバージョンは1つのみ `v0.1`があります。

何も壊すことのないよう最善を尽くしていますが、`v0.1`に長期的な互換性をお約束することはできません。`v0.1`に問題がないようでしたら、`v0.1`としてBitriseが"freeze"するので、長期的なサポートを提供いたします。