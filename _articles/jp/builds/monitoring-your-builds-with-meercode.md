---
tag: []
title: Monitoring builds with Meercode
redirect_from: []
summary: ''

---
{% include not_translated_yet.html %}

[Meercode](https://meercode.io) is a real-time build monitoring, dashboarding, and analytics solution for CI/CD pipelines. It integrates with your Bitrise account smoothly to provide your team with valuable insights into your build data.

![](/img/meercode1.png)

Among other things, with Meercode you can:

* Create dashboards to monitor running builds for the duration, estimated completion time, and overtime status.
* Monitor recently completed builds for status, duration, and completion date/time.
* Cancel or restart the builds directly from the dashboard.
* Control which repositories to watch.
* Create reports from historical build data.
* Create shareable links of the dashboard to share with team members or to show on the office TV.

With Meercode’s analysis and visualization tools:

* Developers can easily monitor the status of triggered builds.
* Team members can see what their teammates are building.
* Team managers can monitor the throughput of the team and the performance of individual team members.

## Integrating Meercode with Bitrise

1. Create a [Meercode](https://meercode.io/login) account, if you haven't already done it. You can use Github or Google authentication.
2. Acquire a Personal Access Token from your Bitrise account. Check out our guide on the subject: [Acquiring a Personal Access Token](https://devcenter.bitrise.io/api/authentication/#acquiring-a-personal-access-token "https://devcenter.bitrise.io/api/authentication/#acquiring-a-personal-access-token")
3. On the **Integrations** panel, select **Bitrise** and enter your Personal Access Token.

   ![](/img/meercode2.png)
4. After selecting organizations and repositories to monitor, your dashboard and insights tabs will be ready to use.

## CI build monitoring on Meercode

To monitor your builds:

1. Log in to your Meercode account.
2. Open **Dashboard Tab** from the left menu to see an overview of your running and completed builds.

* On the top of the page, you will see builds still in progress. You can monitor the current duration and estimated completion time.

  ![](/img/meercode3.png)
* Below that, completed builds are listed as cards. On every card, you can see the completion status and other information of the build for the last 10 runs.

  ![](/img/meercode4.jpg)
* The **Share** button on the top-right corner allows you to create public links to view your dashboard. These secret links can be securely shared with your team members.

# CI Build Insights

1. Open the **Insights** tab to access reports summarized from your historical build data.  
   ![](/img/meercode5.jpeg)
2. Use the filters on the top of the page to limit the results for a given date range, provider or organization.