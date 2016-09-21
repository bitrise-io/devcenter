A frequent question is whether it's possible to run the Android x86 emulator,
instead of the ARM emulators.

Unfortunately, as far as we know, none of the public cloud environments expose the required
hardware virtualization bit required for running the Android x86 emulator.

If you know about any solution, [please contact us](https://www.bitrise.io/contact)!

For now, the best workaround seems to be [Oracle's Ravello](https://www.ravellosystems.com/) ( [a related blog post](https://www.ravellosystems.com/blog/android-emulator-on-amazon-ec2-and-google-cloud/) )
if you need a full emulator (with UI),
or [robolectric](http://robolectric.org/) for unit tests.

Another alternative might be to use a service like [AWS Device Farm](https://aws.amazon.com/device-farm/),
where you can run the tests on real devices instead of in an emulator.

If you know about any other, [feel free to contact us](https://www.bitrise.io/contact)!
