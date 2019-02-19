---
title: 'Notifications guide - draft '
redirect_from: []
date: 2019-02-18 15:08:04 +0000
published: false

---
Notifications are updates about your activity on Bitrise. Usually, they concern the state of your builds but you can receive notifications about a lot of different things. 

## Email notifications

Our built-in email notification system sends emails about builds to every user who is assigned to work on an application. They are sent when a build is finished.

Email notifications are automatically set up for all applications when first creating them. By default, there are different settings for successful builds and failed builds. There are three possible settings:

* **Always send email**. This is the default setting for failed builds.
* **Never send email**.
* **Send email when build status changes on the same branch**. This is the default setting for successful builds. This means that if build #1 and build #2 both succeeded, you will not get a notification about build #2. However, if build #3 fails and then build #4 succeeds again, you will be notified. 

![](/img/email-from-bitrise.png)

The alternative solution is to send emails via a dedicated Step: this allows for far more customization regarding the notifications. We'll cover both options in this guide. 

### Configuring email notifications

You can change your email notification settings at any time - you can even completely disable them. 

1. Open your Dashboard.
2. Select the app you want to configure. 
3. Go to the `Settings` tab. 
4. Scroll down to email notifications.

   ![](/img/email-notifications.png)
5. Select the settings you need for both successful and failed builds from the appropriate dropdown menu. 

   For example, if you want to disable receiving notifications, set both options to **Never send email**.

### Sending emails with a Step 

You can send emails to any email address with customized updates using our `Send Email with Mailgun` Step. 

To use the Step, you need:

* A Mailgun account.
* [A Mailgun API key](https://help.mailgun.com/hc/en-us/articles/203380100-Where-can-I-find-my-API-key-and-SMTP-credentials-).