---
tag:
- builds
- monitoring
title: Monitoring your builds with Meercode
redirect_from: []
summary: Meercode is a real-time build monitoring, dashboarding, and analytics solution
  for CI/CD processes. It integrates with your Bitrise account smoothly to provide
  your team with valuable insights into your build data.
menu:
  builds-main:
    weight: 35
    title: Monitoring builds with Meercode

---
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

To monitor your Bitrise builds with Meercode:

* An admin on the app’s team must enable the Meercode add-on for your app.
* Once the add-on is enabled, other team members on the app must authorize the add-on on their own account.

{% include message_box.html type="warning" title="Enabling Meercode for an app" content="Please note that only admins can enable the add-on for an app. Read more about user roles [in our guide.](/team-management/user-roles-on-app-teams/)"%}

{% include message_box.html type="warning" title="Integrating Meercode with a Personal Access Token" content="Previously, you could integrate Meercode by using your Bitrise Personal Access Token on Meercode’s own website. This method no longer works! To monitor your builds with Meercode, you need the Meercode add-on."%}

### Enabling the add-on as an admin

To enable the add-on for a specific app:

1. Log in to your Bitrise account.
2. On the Dashboard, find the app you need.
3. On the app’s page, go to the **Add-ons** tab.
4. Next to **Meercode**, click the **Enable add-on** button.  
   ![](/img/enable-meercode.png)
5. In the pop-up window, you can see what access rights the add-on needs. Click **Enable add-on** to grant these rights.

### Authorizing the add-on as a user

After an admin enables the Meercode add-on, each user on the app’s team must authorize the add-on on their own account.

1. Log in to your Bitrise account.
2. On the Dashboard, find the app you need.
3. On the app’s page, go to the **Add-ons** tab.
4. Next to **Meercode**, click the **Go to add-on** button.
5. On the next page, you can see what access rights the add-on needs. Click **Authorize add-on** to grant these rights.  

## CI build monitoring on Meercode

To monitor your builds:

1. Log in to your Meercode account.
2. Open **Dashboard Tab** from the left menu to see an overview of your running and completed builds.

* On the top of the page, you will see builds still in progress. You can monitor the current duration and estimated completion time.

  ![](/img/meercode3.png)
* Below that, completed builds are listed as cards. On every card, you can see the completion status and other information of the build for the last 10 runs.

  ![](/img/meercode4.jpg)
* The **Share** button on the top-right corner allows you to create public links to view your dashboard. These secret links can be securely shared with your team members.

## CI Build Insights

1. Open the **Insights** tab to access reports summarized from your historical build data.  
   ![](/img/meercode5.jpeg)
2. Use the filters on the top of the page to limit the results for a given date range, provider or organization.