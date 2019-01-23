---
title: ビルドをスケジューリングする
redirect_from:
- "/builds/scheduling-builds/"
- "/builds/scheduling-builds"
menu:
  builds:
    weight: 3
---
最も都合のいい時間にログを確認することができるように、1週間のうちの特定の時間にビルドを自動的に実行するようスケジューリングすることができます。

次回のビルドに向けて、どのように設定すればよいかの手順を見ていきましょう！

1. [bitrise.io](https://www.bitrise.io) にログインします。

2. `Dashboard` を開き、ビルドをスケジューリングしたい対象のプロジェクトを選択します。

3. `Start/Schedule a Build` をクリックします。

4. `Build configuration` ポップアップウィンドウ内で、 `Schedule this build` のスイッチを右に切り替えて有効化しましょう。

      ![Screenshot](/img/scheduling-builds/disabled-build-scheduling.png)

5. `HH/MM` フィールドに日時を入力します。

6. タイムライン上で、ビルドを実行したい曜日をクリックします。

      ![Screenshot](/img/scheduling-builds/selected-builds.png)

7. 必要に応じて、残りのフィールドを確認して入力します。 `Build configuration` ウィンドウの高度な設定からも、ビルドをスケジューリングすることができます。

8. ポップアップウィンドウ下部の `Schedule Build` をクリックします。

`Builds` ボードに戻ると、スケジューリングが設定されたビルドを確認することができます。

`Show scheduled` をクリックすると、スケジューリングを編集/削除することや、スイッチを左に切り替えることでビルドを無効にすること、 `Trigger now` ボタンをクリックすることで直ちにビルドを実行することができます。

![Screenshot](/img/scheduling-builds/scheduled-build.png)

以上です！これで自動化されたビルドの便利さを味わうことができます！
