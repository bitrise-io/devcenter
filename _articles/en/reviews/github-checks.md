---
tag: []
title: GitHub Checks
redirect_from: []
summary: ''
published: false

---
## About GitHub Checks

Bitrise is fully integrated with [Github Checks](https://developer.github.com/v3/checks/) to provide an extended version of the well-known status checks we send back to GitHub once a build has run (failed, successful) in the forms of `bitrise summary` of the CI run results. With  Bitrise Checks, a submitted pull request can be validated resulting in the following statuses:

* Successful check.
* Failed check.
* Action needed (in the case of manual pull request approval).

![](/img/bitrise-summary-gh-checks.jpg)

{% include message_box.html type="info" title="Get to your app's page with a click" content="If you click on the summary or on View more details on Bitrise Checks link, you are taken back to your app's page on Bitrise. "%} 

## Enabling & installing Github Checks

You can easily enable the installed Github Checks app on Bitrise. 

{% include message_box.html type="important" title="Enabling Github Checks is limited" content="Please note that only Organization owners can enable the GitHub Checks toggle on the **Settings** page of the app"%} 

1. Go to your app.
2. Select the **Settings** tab of your app.
3. Toggle the switch to the right to enable Github Checks.

   ![](/img/enable-toggle-github-checks.jpg)

**output**: successful, failed, action required in the case of manual pull request approval (before running the build)

click on summary > build or View more message

install:

if im admin in an org, i can install bitrise checks to an org (and then give right to the repo of the org) or to a user (and give rights to his repoes so that bitrise chekcs can use it

install utan confirm password

once message says installed> . toggle is present in my apps on bitrise dashboard > disabled> enable a kapcsolo mindig ott van de installalni kell es jogot adni a repora)

githubon valtoztatas az appon, akkor megjelenik a build bitrise-on, csak akkor ha a trigger be van allitva hhogy pull requestnel kezdjen egy buildet bitris-on. (webhook|) pull request tirggereknek be kell allitani h honnan hova fusson a build.