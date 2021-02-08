---
tag:
- trace
- add-ons
- devops
- monitoring
- deploy
- ios
title: Trace product references
description: In order for Trace to provide information on the performance of your
  apps, our SDK collects data about the app when running on the end users device.
  We collect data related to session properties, as well as metrics and traces.
menu:
  monitoring-main:
    weight: 5

---
{% include not_translated_yet.html %}

{% include message_box.html type="important" title="Beta feature" content="Please note that this feature is still in beta phase! You can sign up for the beta [here](https://www.bitrise.io/add-ons/trace-mobile-monitoring)!"%}

## Trace data collection

In order for Trace to provide information on the performance of your apps, our SDK collects data about the app when running on the end users device. We collect data related to session properties, as well as metrics and traces.

## Session properties

- Device Type: The name of the device type (for example, iPhone X).
- App Version: The version name.
- App Build: The app version code or build number.
- Network: The network type the device is connected to (for example, 4G, wifi, EDGE).
- Carrier: The network or cell phone carrier (for example, AT&T, T-Mobile, Vodafone).
- OS Version: The operating system version.

## Metrics and traces

- Application CPU usage: the percentage of device CPU used by the target app.
- App Memory usage: the percentage of device memory used by the target app.
- Startup trace:
   - The time elapsed from app startup to full readiness.
   - The relevant timestamps.
- Crash traces:
   - Exception.
   - Crash report.
   - The relevant timestamps.
- Network traces:
   - URL (query and fragement parameters are stripped).
   - Request size (in bytes).
   - Response size (in bytes).
   - Status code.
   - Duration of entire request/response.
   - The relevant timestamps.
- View traces:
   - view name
   - duration of time displayed
   - The relevant timestamps.

{% include message_box.html type="info" title="Minimum trace duration" content="The minimum trace duration is 1ms. Traces any smaller will not be recorded."%}

## Trace tooling requirements

### iOS SDK

For integrating the iOS SDK the minimum requirements are:

- iOS 10
- Swift 5 or Objective-C
- Xcode 11

### Android SDK

{% include message_box.html type="important" title="iOS apps only" content="For now, Trace is only supported for iOS apps. Android support is coming soon."%}

For integrating the Android SDK the minimum requirements are:

- Android 5.1 (API 22)
- Gradle 4.4
- Java 8