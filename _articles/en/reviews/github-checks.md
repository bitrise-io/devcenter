---
tag: []
title: GitHub Checks
redirect_from: []
summary: ''
published: false

---
## About GitHub Checks

Github Checks allows CI providers to have

github chekcs csak egy felulet ci providereket h sajat teszt eredmenkyekt rakjanak be teszt eredmeneke. mi bitrise, vagyunk ci, ha csinalunk egy bitrise appot, azon keresztul tudunk csatlakozni a github feloletere es ki tudjuk posztolno a build eredmenyeket a github sajat oldalra h egybol lasd a pr=ed mellet. tabot nyujta es egy api-t amire tudunk posztlni testz eredmenyekt.

link te autentikalod a mi appunkat, bitrise checks, ex egy github app- azt yudja: ha telepitem a repomhoz, akor adok neki jogot arra h hasznalja a github checks feluletet es hozzafuzze a checks eredmenyeket a pr-hez. miutan installatam, be utdom kapcsolni az appot.

Bitrise Checks is a Github app which outputs an extended version of the classic status checks Bitrise sends back to GitHub. If you click Details of a pull request's checks, it unfolds the detailed build summary and build status Bitrise Checks attaches to your pull request.

![](/img/all-checks-have-passed.png)

There can be three different check statuses:

* Successful check.
* Failed check.
* Action needed check (in the case of manual pull request approval) before running a build.

![](/img/bitrise-summary-gh-checks.jpg)

## Enabling & installing Github Checks

You can easily enable the installed Github Checks app on Bitrise.

{% include message_box.html type="important" title="Enabling Github Checks is limited" content="Please note that only Organization owners can enable the GitHub Checks toggle on the **Settings** page of the app"%}

1. Go to your app.
2. Select the **Settings** tab of your app.
3. Toggle the switch to the right to enable Github Checks.

   ![](/img/enable-toggle-github-checks.jpg)
4. Click the **install our app to your GitHub repository** link which will take you to GitHub's Bitrise Checks installation page.
5. On the **Install Bitrise Checks** page, select the user or organization you want to add Bitrise Checks app to.

   ![](/img/install-bitrise-checks.jpg)
6. Decide if you wish to install Bitrise Checks to all your repositories or to a a selected few.

	![](/img/install-bitrise-checks.jpg.png)

{% include message_box.html type="info" title="Get to your app's page with a single click" content="If you click on the summary or on View more details on Bitrise Checks link, you are taken back to your app's page on Bitrise. "%}

if im admin in an org, i can install bitrise checks to an org (and then give right to the repo of the org) or o a user (and give rights to his repoes so that bitrise chekcs can use it

install utan confirm password

once message says installed> . toggle is present in my apps on bitrise dashboard > disabled> enable a kapcsolo mindig ott van de installalni kell es jogot adni a repora)

githubon valtoztatas az appon, akkor megjelenik a build bitrise-on, csak akkor ha a trigger be van allitva hhogy pull requestnel kezdjen egy buildet bitris-on. (webhook|) pull request tirggereknek be kell allitani h honnan hova fusson a build.

## Disabling Github Checks

github chekcs csak egy felulet ci providereket h sajat teszt eredmenkyekt rakjanak be teszt eredmeneke. mi bitrise, vagyunk ci, ha csinalunk egy bitrise appot, azon keresztul tudunk csatlakozni a github feloletere es ki tudjuk posztolno a build eredmenyeket a github sajat oldalra h egybol lasd a pr=ed mellet. tabot nyujta es egy api-t amire tudunk posztlni testz eredmenyekt.

link te autentikalod a mi appunkat, bitrise checks, ex egy github app- azt yudja: ha telepitem a repomhoz, akor adok neki jogot arra h hasznalja a github checks feluletet es hozzafuzze a checks eredmenyeket a pr-hez. miutan installatam, be utdom kapcsolni az appot.