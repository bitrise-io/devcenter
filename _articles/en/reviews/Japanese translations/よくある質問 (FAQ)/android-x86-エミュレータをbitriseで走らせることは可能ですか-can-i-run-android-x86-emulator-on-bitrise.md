---
tag: []
title: Android x86 エミュレータをBitriseで走らせることは可能ですか？ (Can I run Android x86 Emulator on
  Bitrise?)
redirect_from: []
summary: ''
published: false

---
ARMエミュレータの代わりに、Android x86 エミュレータを走らせることができるのかという質問がよくあります。

Bitriseは、**Linux / Androidスタック上の** Android x86エミュレータに必要なすべてのネストされた仮想化ビットを許可します。ホストマシンが持つ仮想化を、x86アーキテクチャを使って走らせることができ、速度の遅いエミュレーションをスキップすることができます。これは、物理マシンよりも10から15%ほど遅くなりますが、armv7-aエミュレータよりはるかに速度が速くなります。

**この機能はLinux/Androidスタックでのみ使用可能です。**

## 他スタックに関する代案

フルの (UIを持つ) エミュレータが必要な場合、[Oracle製のRavello](https://www.ravellosystems.com/)を使用してください。また、ユニットテストには[robolectric](http://robolectric.org/)を使用します。

エミュレータではなく実際のデバイス上でテストを行うには、[AWS Device Farm](https://aws.amazon.com/jp/device-farm/)や[Open STF](https://openstf.io/)のようなサービスを使用できます。Bitriseには、それら両方のサービス用で使用可能なインテグレーションがあります。

他に知っていることがあれば、[お気軽にご連絡くださいませ](https://www.bitrise.io/contact)。