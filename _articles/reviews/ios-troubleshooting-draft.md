---
title: iOS troubleshooting draft
redirect_from: []
date: 2019-01-31 16:15:46 +0000
published: false

---
#### Test device already registered 

If the `iOS Auto Provision` Step fails with this error message, it is likely that you registered a specific test device on Bitrise twice.

![](/img/device-2.png)

Check out if the same UDID has been registered twice: 

1. Open the app on Bitrise. 
2. Go to the `Team` tab. 
3. Scroll down and click the `Download list of test devices` button.

The result will be in json format: check if the same UDID appears twice. If so, it has to be removed from the account to which it was registered. 

1. Open the top-right menu and click `Account settings`. 
2. On the left, click `Test devices`. 
3. Remove one of the duplicated devices. 