A frequent question is whether it's possible to run the Android x86 emulator,
instead of the ARM emulators.

Unfortunately, as far as we know, none of the public cloud environments expose the required
hardware virtualization bit required for running the Android x86 emulator.

If you know about any solution, [please contact us](https://www.bitrise.io/contact)!

For now, the best workaround seems to be [Oracle's Ravello](https://www.ravellosystems.com/)
if you need a full emulator (with UI),
or [robolectric](http://robolectric.org/) for unit tests.

If you know about any other, [feel free to contact us](https://www.bitrise.io/contact)!
