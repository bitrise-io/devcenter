---
# jp title missing
title: Code signing iOS frameworks
menu:
  ios-code-signing:
    weight: 12
---
## iOSフレームワークの開発

iOSフレームワークを開発する際は、コード署名したバージョンのフレームワークを配布する必要があります。しかし、 `Distribution` のプロファイルである必要はなく、 `Developer` のプロファイルで問題ありません。
配布したフレームワークは、利用者がコード署名する際に再びコード署名されます。

もしコード署名せずにビルドした場合、Xcodeは `.framework` ファイルを生成せず、以下のエラーになります:

    CodeSign error: code signing is required for product type 'Framework' in SDK 'iOS 10.2'