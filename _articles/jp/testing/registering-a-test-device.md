---
title: テストデバイスの登録
menu:
  testing:
    weight: 1
---
## SafariでiOSデバイスを登録する

iOSテストデバイスを [bitrise.io](https://www.bitrise.io) に登録する一番手軽な方法は、 [bitrise.io](https://www.bitrise.io) をSafariで開く方法です。
デバイスの「設定」で一時的なプロファイルを作ることで Unique Device Identifier (UDID)が得られるので、手作業で探してコピー・ペーストする必要はありません。

 1. iOSデバイスでSafariを開き、**プライベートブラウズモードを使わずに** [bitrise.io](https://www.bitrise.io) にログインする
 2. 自分の `Profile` を開く
 3. `Account Settings` をタップ
 4. 左にある `Test devices` をタップ
 5. `Register this device` をタップ
 6. ポップアップウィンドウで `許可` をタップすると、 [bitrise.io](https://www.bitrise.io) が構成プロファイルを表示します
 
 7. `プロファイルをインストール` ダイヤログが表示されたら `インストール` をタップ
 8. デバイスのパスコードを入力
 9. もう一度 `インストール` をタップ。これで、あなたのUDIDとデバイス名が `Register device` ダイヤログに表示されます。
10. `Register device` をタップ
11. [Apple Developer Portal](https://developer.apple.com/) にこのデバイスと、このデバイスが設定された正しいprovisioning profileを登録する。または私たちの [Auto Provisioning](/code-signing/ios-code-signing/ios-auto-provisioning) stepを、profile生成を有効にして使う。


`Test devices` に戻ると、今登録したデバイスがあります：


![Screenshot](/img/adding-a-new-app/ios-device.jpg)

登録したデバイスは、 `x` アイコンでいつでも削除できます。

## 手作業でテストデバイスを登録する


1. [bitrise.io](https://www.bitrise.io) で自分の `Profile` を開く
2. 左にある `Test devices` をタップ
3. `Register manually` をタップ
4. `Register device` ダイヤログで、 `Title` フィールドにデバイスの名前、 `Identifier` フィールドにデバイスのUDIDを入力する
5. `Register Device` をタップ
   

   **UDIDを取得する** にはデバイスをPCに繋いでiTunesを開きます。 `概要` の中にシリアル番号がありますが、それをクリックするとデバイスの `UDID` が表示されます。それを [Test Devices](https://www.bitrise.io/me/profile#/test_devices) の `Identifier` フィールドにペーストします。
   
6. [Apple Developer Portal](https://developer.apple.com/) にこのデバイスと、このデバイスが設定された正しいprovisioning profileを登録する。または私たちの [Auto Provisioning](/code-signing/ios-code-signing/ios-auto-provisioning) stepを、profile生成を有効にして使う。

これであなたのデバイスは [Registered test devices](https://www.bitrise.io/me/profile#/test_devices) に見つけることができます。


登録したデバイスは、 `x` アイコンでいつでも削除できます。
