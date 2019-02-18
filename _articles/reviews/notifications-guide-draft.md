---
title: 'Notifications guide - draft '
redirect_from: []
date: 2019-02-18 15:08:04 +0000
published: false

---
Notifications are updates about your activity on Bitrise. Usually, they concern the state of your builds but you can receive notifications about a lot of things. 

## Email notifications

Email notifications are sent to every user who is assigned to work on an application. 

Email notifications are automatically set up for all applications when first creating them. By default, there are different settings for successful builds and failed builds. There are three possible settings.

* **Always send email**. This is the default setting for failed builds.
* **Never send email**.
* **Send email when build status changes on the same branch**. This is the default setting for successful builds. This means that if build #1 and build #2 both succeeded, you will not get a notification about build #2. However, if build #3 fails and then build #4 succeeds again, you will be notified. 

### Configuring email notifications