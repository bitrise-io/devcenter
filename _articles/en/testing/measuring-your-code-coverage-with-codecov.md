---
tag: []
title: Measuring your code coverage with Codecov
redirect_from: []
summary: ''
menu:
  testing-main:
    weight: 22

---
[Codecov](https://about.codecov.io/product/features/) is the leading code coverage solution for CI/CD pipelines, delivering coverage metrics right into your workflow. It integrates directly with Bitrise to provide valuable insights on code quality in order to allow users to ship healthier code with less risk.  
Codecov provides many features that make test coverage more available and actionable to speed up your development process and to deliver high-quality applications.

Some of these features include:

* Coverage changes overlaid with your source code, making it even easier to identify needed test areas.
* [Multi-language](https://about.codecov.io/product/features/#multi-lang-multi-ci-cd) support so you can use Codecov right out of the box.
* Summary of coverage information directly in your Workflow so that you can add and update tests quickly and effectively.
* [Status checks](https://docs.codecov.io/docs/commit-status) to block underperforming pull requests from being merged.
* Seamless coverage [report merging](https://docs.codecov.io/docs/merging-reports) for Workflows that upload multiple reports across jobs.
* Custom coverage information based on groupings using [Codecov Flags](https://docs.codecov.io/docs/flags).

## Integrating Codecov with Bitrise

In order to start using Codecov, you must be generating coverage reports with your preferred coverage tool (for example, Xcode or Gradle).

1. Create an account on [https://codecov.io](https://codecov.io "https://codecov.io").
2. Go to repository’s **Settings** tab on Codecov and copy the repository upload token.

   ![](/img/pic1.jpg)
3. Add the **Codecov** Step to your Workflow on Bitrise. Make sure you add the Step after the Steps that test and collect coverage.![](/img/pic2.jpg)
4. Add the Codecov upload token as a secret variable, `CODECOV_TOKEN`, and click **Add new**.![](/img/pic3.jpg)
5. Click **Save** and start a new build to get coverage metrics.

{% include message_box.html type="info" title="Additional options" content="The **Codecov** Step wraps around the Codecov [bash uploader](https://docs.codecov.io/docs/about-the-codecov-bash-uploader). You can add additional options in the Step listed in our [arguments documentation](https://docs.codecov.io/docs/about-the-codecov-bash-uploader#arguments)."%}

## Viewing your coverage reports on Codecov

To view your coverage on Codecov, you can do the following:

* View the URL supplied on the **Codecov** Step on Bitrise.![](/img/pic4.png)
* Go to [https://codecov.io](https://codecov.io) and navigate directly to the applicable pull request or commit.
* Click on the links provided by Codecov that are available on your code host’s status checks or pull request comment.

## What next?

Now that you have code coverage reports, you can take it to the next level with the following suggestions:

* Set [non-blocking status checks](https://docs.codecov.io/docs/common-recipe-list#set-non-blocking-status-checks) to get your developers in the habit of thinking about code coverage.
* Start working towards code coverage by setting status checks to [increase overall coverage](https://docs.codecov.io/docs/common-recipe-list#increase-overall-coverage-on-each-pull-request) on every pull request.
* Isolate your coverage reports for different types of tests or different parts of your system with [Flags](https://docs.codecov.io/docs/flags) to measure what matters.
* Already using flags and don’t want to run your entire test suite with every Bitrise CI run? Try out [Carryforward Flags](https://docs.codecov.io/docs/carryforward-flags) to measure only what changes.