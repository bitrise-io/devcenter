---
title: Can I run an Android x86 Emulator on Bitrise?
menu:
  faq:
    weight: 3

---
A frequent question is whether it's possible to run the Android x86 emulator, instead of the ARM emulators.

We allow all the required nested virtualization bits for the x86 Android emulators **on the Linux/Android stacks**,. This means that we can use the virtualization that the host machine has for running an emulator with x86 architecture, and we can thus skip the slow emulation. This is still 10-15% slower than when run on a physical machine, but it is still much faster than the armv7-a emulator.

**This feature is only available on the Linux/Android stacks**.

## Alternatives (for other stacks)

You can use [Oracle's Ravello](https://www.ravellosystems.com/) if you need a full emulator (with UI), or [robolectric](http://robolectric.org/) for unit tests.

Another alternative is to use a service like [AWS Device Farm](https://aws.amazon.com/device-farm/) or [Open STF](https://openstf.io/),
where you can run the tests on real devices instead of in an emulator. Bitrise integrations are available for both those services.

If you know about any other, [feel free to contact us](https://www.bitrise.io/contact)!