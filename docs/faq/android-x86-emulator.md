A frequent question is whether it's possible to run the Android x86 emulator, instead of the ARM emulators.

As an experiment we now allow all the required nested virtualization bits for the x86 Android emulators __on the Linux/Android stacks__, which means that we can use the virtualization that the host machine has for running an emulator with x86 architecture, and we can thus skip the slow emulation. This is still 10-15% slower than when run on a physical machine, but it is still much faster than the armv7-a emulator.

__This feature is only available on the Linux/Android stacks__ right now.

## Alternatives (for other stacks)

For now, the best workaround seems to be [Oracle's Ravello](https://www.ravellosystems.com/) ( [a related blog post](https://www.ravellosystems.com/blog/android-emulator-on-amazon-ec2-and-google-cloud/) )
if you need a full emulator (with UI),
or [robolectric](http://robolectric.org/) for unit tests.

Another alternative might be to use a service like [AWS Device Farm](https://aws.amazon.com/device-farm/) or [Open STF](https://openstf.io/),
where you can run the tests on real devices instead of in an emulator. Bitrise integrations are available for both those services.

If you know about any other, [feel free to contact us](https://www.bitrise.io/contact)!
