---
changelog:
last_modified_at:
tag: []
title: カスタムのScriptステップからテストレポートへのエクスポート (Exporting to Test Reports from custom Script
  Steps) (
redirect_from: []
description: ''
published: false

---
[Test Reports](/jp/testing/test-reports/)は全てのテスト結果をわかりやすく表示します。デフォルトでは、４つのステップのみがTest Reports機能に対応しています。限定的ですが、カスタムのScriptステップを経由してTest Reportsにテスト結果のエクスポートを行う方法もサポートしています。その制限とは、画像ファイルのみエクスポートが可能です (例: UIテストのスクリーンショット) 。

以下のことを行ってください：

1. 適当なディレクトリ内にテスト結果をデプロイします。
2. テスト実行毎に、テスト名を持つ独自の`test-info.json`ファイルがあることを確認します。
3. 全てのディレクトリに、標準的なJUnit XMLフォーマットを使用したテストレポートを含んでいることを確認します。
4. ワークフローに**Deploy to Bitrise.io**ステップを挿入します。

以上を行って、Test Reportsがどのように機能するのかもう少し掘り下げていきましょう。

## テスト結果ディレクトリ

Bitrise CLIは全てのテスト結果のためにルートディレクトリを作成し、サポート済みのステップ用に`BITRISE_TEST_RESULT_DIR`環境変数にてパスをエクスポーズします。このように、全てのサポート済みステップは独自のテスト結果ディレクトリを表示します。

その後ステップは、テスト結果とみなされる全てのアーティファクトをテスト結果ディレクトリへ移動させます：テスト結果ファイル、テスト添付物、ログ、スクリーンショットなどが含まれます。

{% include message_box.html type="important" title="カスタムステップ" content="結果のエクスポートにカスタムのScriptステップを使用する際、画像ファイルのみエクスポートされることにご注意ください。

[Test Reportsガイド](/jp/testing/test-reports/)で説明されているように、４つのサポート済みステップを使用する場合は、ログや動画、他のファイルなどもエクスポートされます。"%}

それぞれのステップの後、Bitrise CLIはステップのテスト結果ディレクトリをチェックします。ディレクトリに空きがない場合、CLIが`step-info.json`と呼ばれるメタデータファイルを追加します。このファイルにはStepが描写されています：

    // TestResultStepInfo ...
    type TestResultStepInfo struct {
    	ID      string `json:"id" yaml:"id"`           // Step ID
    	Version string `json:"version" yaml:"version"` // Step version
    	Title   string `json:"title" yaml:"title"`     // Step title
    	Number  int    `json:"number" yaml:"number"`   // Step number in the workflow
    }

個々のテストの実行 (例：異なるビルドバリアント) は、ステップのテスト結果ディレクトリ内の異なるサブディレクトリに配置される必要があります。 `BITRISE_TEST_RESULT_DIR`とは反対に、これらのディレクトリは自動で作成されません：ビルド中に作成されます。そのディレクトリの構造はこのようになっています：

    Build Test Result directory
    └── Step Test Result directory
        ├── Step Test Run Result Directory 1
        │   ├── TEST-com.multipletestresultssample.UnitTest0.xml
        │   └── test-info.json
        ├── Step Test Run Result Directory 2
        │   ├── TEST-com.multipletestresultssample.UnitTest1.xml
        │   └── test-info.json
        └── step-info.json

## test-info.json ファイル

以上より、テスト実行毎のサブディレクトリには`test-info.file`が含まれています。このファイルはScriptステップによって作成され、`test-name`のノードが定義されています。`test-name`の値はTest Reportsのページ上でテスト実行名 (name of the test run)として表示されます。

    // Test Name ...
    { "test-name":"My first test" }

![{{ page.title }}](/img/Test_add-on-6.png)

## テストレポートファイル

いったんステップが実行され、テスト結果が適切なディレクトリに配置されると、**Deploy to Bitrise.io**ステップが結果を収集しTest Reportsへエクスポートします。これはJUnit XMLフォーマットで行われます。

テスト結果には、標準的なJunitXMLフォーマットで書かれたテストレポートを含む必要があり、以下のようになります：

    <testsuites>        => the aggregated result of all junit testfiles
      <testsuite>       => the output from a single TestSuite
        <properties>    => the defined properties at test execution
          <property>    => name/value pair for a single property
          ...
        </properties>
        <error></error> => optional information, in place of a test case - for example, if the tests in the suite could not be found for some reason
        <testcase>      => the results from executing a test method
          <system-out>  => data written to System.out during the test run
          <system-err>  => data written to System.err during the test run
          <skipped/>    => if a test was skipped
          <failure>     => if a test failed
          <error>       => if a test encountered an error
        </testcase>
        ...
      </testsuite>
      ...
    </testsuites>

{% include message_box.html type="note" title="ファイルのフォーマット" content="`<testsuites>`の要素は必須ではありません。ファイルそれぞれが`<testsuite>`の要素のみで構成されていても、別々に複数のテストレポートファイルをことができます：一緒にマージされるようになります。"%}

## スクリプトの例

単一テストを実行するのに、スクリプトの一例を見ていきましょう。この結果はTest Reportsにエクスポートされる必要があります。この例では、指定のテスト実行用にサブディレクトリを作成し、JUnit XMLファイルと`test-info.json`ファイルを追加します。

    #!/bin/env bash
    set -ex
    
    # Creating the sub-directory for the test run within the BITRISE_TEST_RESULT_DIR:
    test_run_dir="$BITRISE_TEST_RESULT_DIR/result_dir_1"
    mkdir "$test_run_dir"
    
    # Creating the JUnit XML test report:
    echo  '<?xml version="1.0" encoding="UTF-8"?>
    <testsuite name="sample.results.test.multiple.bitrise.com.multipletestresultssample.UnitTest0" tests="10" skipped="0" failures="0" errors="0" timestamp="2019-05-10T13:47:08" hostname="my-localdomain" time="0.002">
      <properties/>
      <testcase name="correctCase0" classname="sample.results.test.multiple.bitrise.com.multipletestresultssample.UnitTest0" time="0.001"/>
      <testcase name="correctCase1" classname="sample.results.test.multiple.bitrise.com.multipletestresultssample.UnitTest0" time="0.0"/>
      <system-out><![CDATA[]]></system-out>
      <system-err><![CDATA[]]></system-err>
    </testsuite>' >> "$test_run_dir/UnitTest.xml"
    
    # Creating the test-info.json file with the name of the test run defined:
    echo '{"test-name":"sample"}' >> "$test_run_dir/test-info.json"

以上の例では、スクリプト本体にテストレポートのJUnit XMLファイルを作成しています。でももちろん、同様の方法で既存のファイルをエクスポートすることもできます：

    #!/bin/env bash
    set -ex
    
    # Creating the sub-directory for the test run within the BITRISE_TEST_RESULT_DIR:
    test_run_dir="$BITRISE_TEST_RESULT_DIR/result_dir_1"
    mkdir "$test_run_dir"
    
    # Exporting the JUnit XML test report:
    cp "MY/TEST/REPORT/XML/FILE/PATH.xml" "$test_run_dir/UnitTest.xml"
    
    # Creating the test-info.json file with the name of the test run defined:
    echo '{"test-name":"MY TEST RUN NAME"}' >> "$test_run_dir/test-info.json"

全てがうまくいくと、[Test Reports](/jp/testing/test-reports/)ページにてテスト結果を見ることができます。

{% include banner.html banner_text="Export test results with Script Steps" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}