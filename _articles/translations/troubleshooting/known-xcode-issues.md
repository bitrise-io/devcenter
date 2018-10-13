**自由にこのリストにあなたのコメントを追加してください。**

[このリンクをクリックすることで、GitHub上に直接追加することができます。](https://github.com/bitrise-io/devcenter/blob/master/_articles/troubleshooting/known-xcode-issues.md),
ただしプルリクエストとしてそれを送ることを忘れないでください ;)

## パフォーマンス関連

_ノート: 主にUIテストに影響します。_

Xcode / iOS Simulatorに紐づく問題の根本的な原因は限られた環境のパフォーマンスによって発生します。これは仮想マシン(あなたが[bitrise.io](https://www.bitrise.io)の上でビルドし走らせるもの), 
MacBook Airs, HDDストレージのMac Minis, ...

あるいはあなたが_SSDではない_Mac Miniで
[Apple's Xcode Bots CI server](http://www.openradar.me/23386199)
を使った場合にも起こりえます。

例:

* UIテストの開始に失敗した
* 一つまたは複数のUIテストケースが応答しなくなる

関連するリンクとレポート:

* [XCode bot error: Early unexpected exit, operation never finished bootstrapping](http://stackoverflow.com/questions/36312500/xcode-bot-error-early-unexpected-exit-operation-never-finished-bootstrapping)
* [UI Testing Failure - Failed to launch within 2.5s, Interrupting test](https://forums.developer.apple.com/thread/20747)
* [Assertion Failure: UI Testing Failure - Failed to receive completion for ...](https://forums.developer.apple.com/thread/15209)
* [Assertion Failure: UI Testing Failure - Failed to receive completion for XCDeviceEvent: page 12 usage 64 duration 0.01s within 10.0s](https://forums.developer.apple.com/thread/31311)
* [UI Testing Failure - Failed to perform AX action for monitoring the event loop](https://forums.developer.apple.com/thread/31312)
* [UI Testing Failure due to failed AX Action](https://forums.developer.apple.com/thread/4472)
* [Every other test case being skipped - UI Testing Failure - App state for <XCUIApplicationProcess: ...> is XCApplicationStateRunningActive (3), still not XCApplicationStateNotRunning](https://forums.developer.apple.com/thread/28732)

### 解決方法

* [このStackOverflowの回答](http://stackoverflow.com/a/37866825/974381)と
  [このApple dev forum discussion](https://forums.developer.apple.com/thread/4472)で報告されているように、
  **変数の中に** `**XCUIApplication()**` **を保持せず**、代わりに
  直接参照/使用することが、ひとつの回避方法となりえます。 たとえば. `let app = XCUIApplication() ; ... ; app.launch()`の代わりに、
  `XCUIApplication().launch()`を実行します。
* 他に報告されているものでは、テスト関連で`app.launch()`の後ごとに遅延処理(`sleep(10)`)を追加した場合、Xcode / iOS SimulatorがAccessibility labelsの初期化するのに十分な時間が残っており、
  それによりUIテストがAccessibility labelsの要素を正しく見つけることができます。 ([関連するApple developer forum discussion](https://forums.developer.apple.com/thread/28732))
  * 関連: `tearDown()`メソッド(メソッド群)ですべての明示的な`app.terminate()`を取り除くこと
* 別のシミュレーターデバイスで試す (例. "iPhone 6"でテストを実行する代わりに
  "iPhone 6s Plus"で試してみる)
* [非同期テストのAPI群を使用する](http://stackoverflow.com/a/32481202/974381)
* いくつかのユーザーは複数のスキームにテストを分割し、
  分かれたテストのステップを、別々に実行させることで成功させました。
  * 複数のスキームにテストを分割することに関連する素晴らしい記事:
    [http://artsy.github.io/blog/2016/04/06/Testing-Schemes](http://artsy.github.io/blog/2016/04/06/Testing-Schemes)
* [ときどきXcodeを誤作動させるコードが関連している場合](https://github.com/fastlane/fastlane/issues/3874#issuecomment-219991408)
* 異なるバージョンのXcodeを試してみる。

## 不安定なUIテスト、ランダムなUIテストケースの失敗

これは実にシンプルなプロジェクトでも発生しえます。本当にこのようなほど単純なことに:

    func testAddAnItemGoToDetailsThenDeleteIt() {
            // Use recording to get started writing UI tests.
            // Use XCTAssert and related functions to verify your tests produce the correct results.
    
    
            let app = XCUIApplication()
            let masterNavigationBar = app.navigationBars["Master"]
            masterNavigationBar.buttons["Add"].tap()
    
            let tablesQuery = app.tables
            let firstElemQuery = tablesQuery.cells.elementBoundByIndex(0)
            firstElemQuery.tap()
            app.navigationBars.matchingIdentifier("Detail").buttons["Master"].tap()
            masterNavigationBar.buttons["Edit"].tap()
    
            firstElemQuery.buttons.elementBoundByIndex(0).tap()
            firstElemQuery.buttons["Delete"].tap()
    
            masterNavigationBar.buttons["Done"].tap()
    
            XCTAssert(tablesQuery.cells.count == 0)
        }

この問題を引き起こします。

### 解決方法

`Xcode 7.3`を使用し、上記のコードでこの問題を再現させることができました。 
`Xcode 7.2.1`では全く同じコードが完璧に動作しましたが、
`7.3`ではランダムに失敗します。開発方法は異なるiOS Simulatorデバスを使用することでした。
Xcode 7.3を使用する"iPhone 6"のシミュレーターデバイスの場合平均して_3回のうち2回_テストが失敗しましたが、
一方でXcode 7.2.1では完璧に動作しました。

"iPhone 6s Plus"にシミュレーターデバイスを変更することで、`Xcode 7.3`ではこの問題が解決しました。

## Xcode Unit Test fails without any error, with exit code 65

This can be caused by a lot of things, Xcode or some other tool simply
omits / does not present any error message.

You can find a long discussion, with possible reasons & solutions [here](https://github.com/bitrise-io/bitrise.io/issues/5).

A quick summary:

* First of all, if you use `xcpretty` to format the output try a build without it
  (if you use the Xcode Test step you can set `xcodebuild` as the "Output Tool" option/input
  to not to format the log produced by `xcodebuild`). The cause is: `xcpretty` sometimes
  omits the error message in it's output. [Related GitHub issue](https://github.com/bitrise-io/bitrise.io/issues/27).
* If you don't use our `Xcode Test` step to run your UI Test you should try to run
  it with our Xcode Test step. We always try to improve the reliability of the step,
  implementing known workarounds for common issues.
* If you use our Xcode Test step: make sure you use the latest version, as it
  might include additional workarounds / fixes.
* Try [another Xcode version](http://devcenter.bitrise.io/docs/available-stacks#section-how-to-switch-to-the-new-beta-stacks),
  there are issues which are present in one Xcode version but not in another one.
* Make sure your desired [Xcode scheme is shared](https://devcenter.bitrise.io/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found). Don't forget to commit and push the changes if you just enabled it.
* It might also be a [project configuration issue in your Xcode project](https://github.com/bitrise-io/bitrise.io/issues/5#issuecomment-140188658),
  or a [code issue in your tests](https://github.com/bitrise-io/bitrise.io/issues/5#issuecomment-160171566),
  or a [multi threading issue in your code](https://github.com/bitrise-io/bitrise.io/issues/5#issuecomment-190163069).
* We received reports that this might also be caused by Code Coverage report generation,
  you can disable the `Generate code coverage files?` option of the Xcode Test step
  to not to generate Code Coverage files.
* If the previous steps did not help, you should check the whole discussion and suggested solutions at: [https://github.com/bitrise-io/bitrise.io/issues/5](https://github.com/bitrise-io/bitrise.io/issues/5)

## `Segmentation fault`

The error is:

    clang: error: unable to execute command: Segmentation fault: 11

This is usually due to Xcode version mismatch - that you use a different Xcode on your Mac than the one you use on [bitrise.io](https://www.bitrise.io). Commonly occurs with Xcode 7.2 (if you have the Xcode 7.2 stack selected on bitrise.io), if you're already on a newer version of Xcode locally on your Mac.

The solution is simple, just make sure that you use the same Xcode version everywhere.

## Issues which occur with the Xcode Command Line Tools (`xcodebuild`), but not with Xcode.app

### xcodebuild hangs when a test causes EXC_BAD_ACCESS kernel exception

[xcodebuild hangs when a test causes EXC_BAD_ACCESS kernel exception](https://openradar.appspot.com/24222858)

Note: this can happen only on specific iOS Simulators / iOS versions too, e.g. if the app only crashes on iOS 8, but not on iOS 9

### Xcode 8 - `xcodebuild .. test` hangs at the very end of the tests

`xcodebuild .. test` hangs at the end of the tests (after it printed the summary of the tests)
if the output of `xcodebuild ..` is piped / redirected in any way.
This means that `xcodebuild .. test .. | xcpretty` or even `tee` can be used to reproduce this issue.

* **Affected Xcode versions**: so far it seems to be an `Xcode 8 beta` only issue, and it was fixed in `Xcode 8 beta 4`.
* Related [radar](http://openradar.appspot.com/26872644) and [xcpretty](https://github.com/supermarin/xcpretty/issues/227) issues.
* Workaround: use a `Script` step instead of the Xcode Test step,
  and copy paste the `xcodebuild` command from the hanging Xcode Test step's log, without `| xcpretty` etc.
  Of course, with this you won't be able to use the built in features the Xcode Test step
  provides, but the base `xcodebuild` command should be able to run, if the output
  is not redirected / piped.

#### Every/Any Xcode command hangs

This is a rare issue, caused by running a **non shared Scheme**.

`xcodebuild` can only work with **shared Schemes** and user schemes (auto created by Xcode.app).
`xcodebuild`, unlike Xcode.app, **does not** auto create user schemes, it can only work with
**shared schemes** and already existing user schemes (Xcode.app creates the user scheme when you open
the project in Xcode.app **on the specific Mac machine the first time**, for schemes which are not marked as shared).
If you try to run a command on a missing / non shared Scheme it usually manifests in a "scheme not found"
error, but we saw projects where it resulted in `xcodebuild` hanging, instead
of an error message.

If this is the case then any `xcodebuild` command will hang, even something
as simple as `xcodebuild -list`.

##### Solution

[Make sure that you marked the Scheme as shared, and that you actually committed & pushed it into your repository](https://devcenter.bitrise.io/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found).

## Build hangs

### Simulator reset

As reported [here](https://github.com/bitrise-io/steps-xcode-test/issues/57#event-796203051),
if you do a simulator reset during the build, e.g. with a pre-action
Build Phase Script `xcrun simctl erase all`, it can cause Xcode / the Simulator to hang.

### Other

It might also not be Xcode related, but might be caused by something in your
project when it runs in an Xcode step (Xcode Test, Xcode Archive, ...).
For example if you have a Run Phase Script in your Xcode project, that will
run during Xcode build/test/archive, and that script hangs for some reason
(e.g. it waits for a user input).

Check out our guide on [frequent iOS issues](https://devcenter.bitrise.io/troubleshooting/frequent-ios-issues/) for more information!
