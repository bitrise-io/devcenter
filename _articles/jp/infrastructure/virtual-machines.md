---
changelog:
last_modified_at:
title: 仮想マシン
menu:
  infrastructure-main:
    weight: 3

---
[bitrise.io](https://www.bitrise.io)には、ビルドがホストされる`macOS`と`Linux`の2つの仮想マシンがあります。複数のスタックから選択することができ、それぞれのスタックにプリインストールされたツールのバージョンリストが確認できます。利用可能なスタック、スタック準備タイプについては[こちら](/jp/infrastructure/available-stacks/)を参考にしてください。

ビルドに使われるユーザーが**パスワードなしのsudo**が有効な状態で構成されると、ビルドや他の自動化作業に必要な追加の全てのものがインストールできるようになります。ツールがスタック上にプリインストールされていないときは、ご自身でインストールすることができます。[あらゆる追加ツールのインストール](/jp/tips-and-tricks/install-additional-tools/)ガイドをご覧ください。

## セキュリティ

全てのビルドは各々の仮想マシンで走り、ビルドが終了すると"base box" 状態と呼ばれる、仮想マシンがセーブされた状態へ引き下げられます。こうすることにより、他のユーザーによる変更や以前のビルドによって**常にビルドは保護されます**。また、_ビルド間の状態が持続しないため_、ビルドワークフローを定義する”**stable environment（安定した環境）**”を使うこともできます。

ビルド/コード セキュリティにについての詳細は[コードセキュリティ](/jp/getting-started/code-security/)ガイドをご覧ください。

### Network configuration for the virtual machines

For most users, who host their repositories on cloud-based service providers, there is no need for any network configuration to be able to use Bitrise. All we need is permission to access the repository and for that, an SSH key is enough.

However, your company security policy might not allow unknown and unauthorized IP addresses to communicate with the servers where your code is being stored - either on your own datacenter or in a private cloud. In that case, Bitrise won’t work unless the relevant IP addresses are added to your allow list.

### Adding build machine IPs to your allow list

Our datacenters are behind a set of public static IP addresses, with the virtual machines having their own internal subnets behind these addresses. You need to add the public IP addresses that you can find in [External and internal IP addresses](/infrastructure/virtual-machines/#external-and-internal-ip-addresses "/infrastructure/virtual-machines/#external-and-internal-ip-addresses").

Please note that the different stack types have different public IPs. If, for example, you only use the Xcode stacks, there is no need to add the IPs belonging to the Linux/Docker environments.

### Configuring your network for VPNs

You can [connect to Bitrise via VPN](/tutorials/vpn-configuration/ "https://devcenter.bitrise.io/tutorials/vpn-configuration/") - but it can cause a conflict if your local network uses the same address space as our build VMs. In such a case, the VPN may detect a clash and return an error. In this case, the only solution is to re-configure your local address space to use different subnets than our virtual machines. You can find the build VM internal address subnets in [External and internal IP addresses](/infrastructure/virtual-machines/#external-and-internal-ip-addresses "/infrastructure/virtual-machines/#external-and-internal-ip-addresses").

### External and internal IP addresses

{% include message_box.html type="warning" title="Allow-listing entire subnets" content="If the provided public IP address is a subnet, you need to allow the entire subnet on your network! For example, 208.52.166.128/28 means all IP addresses between 208.52.166.128  and 208.52.166.143 (208.52.166.128, 208.52.166.129, 208.52.166.130, and so on, all the way to and including 208.52.166.143) have to be allow-listed."%}

| Stack type | Public IP | Build VM internal subnet |
| --- | --- | --- |
| Xcode and VS4Mac stacks | 208.52.166.154/32 and<br>208.52.166.128/28 | 10.200.0.0/20 |
|  | 207.254.0.248/29 and<br>207.254.0.208/28 | 10.246.0.0/20 |
|  | 207.254.34.148/32 and<br>207.254.33.176/28 | 10.254.224.0/20 |
| Linux/Docker stacks | 104.197.15.74/32 | 10.0.0.0/9 |
|  | 34.125.50.224/32 | 10.0.0.0/9 |
|  | 34.125.82.130/32 | 10.0.0.0/9 |
|  | 35.202.121.43/32 | 10.0.0.0/9 |
|  | 35.237.165.17/32 | 10.0.0.0/9 |
|  | 35.231.56.118/32 | 10.0.0.0/9 |

## Storage space

Our virtual machines have different amounts of free space to use, depending on the stack type. The table summarises the data - please keep in mind that these numbers are subject to change, as different versions of pre-installed tools and resources take up a varying amount of space on the machines.

| Stack Name | Filesystem | Size (GB) | Free (GB) |
| --- | --- | --- | --- |
| linuxandroidlts | /dev/loop0 | 160 | 104 |
| linuxandroidlts | /dev/sda1(bitrise) | 194 | 28 |
| linuxandroid | /dev/loop0 | 160 | 112 |
| linuxandroid | /dev/sda1(bitrise) | 194 | 28 |
| vs4mac-beta | /dev/disk1s5 | 200 | 43 |
| vs4mac-pre | /dev/disk1s5 | 200 | 65 |
| vs4mac-stable | /dev/disk1s5s1 | 200 | 43 |
| xcode-10.3.x | /dev/disk1s1 | 200 | 96 |
| xcode-11.7.x | /dev/disk1s5 | 200 | 54 |
| xcode-11.6.x | /dev/disk1s5 | 200 | 62 |
| xcode-12.0.x | /dev/disk1s5 | 200 | 70 |
| xcode-12.1.x | /dev/disk1s5 | 200 | 57 |
| xcode-12.2.x | /dev/disk1s5 | 200 | 60 |
| xcode-12.3.x | /dev/disk1s5 | 200 | 35 |
| xcode-12.4.x | /dev/disk1s5 | 200 | 53 |
| xcode-12.5.x | /dev/disk1s5s1 | 200 | 39 |
| xcode-13.0.x | /dev/disk1s5s1 | 200 | 119 |
| xcode-edge | /dev/disk1s5s1 | 200 | 39 |

### Freeing up disk space

If you need additional disk space, you can always delete tools and resources that you do not use. For example, if your app does not need Android SDK tools, you can remove them. Just add a Script Step to your Workflow with the appropriate commands:

```bash
sudo rm -rf ~/Library/Developer/Xamarin/android-sdk-macosx
sudo rm -rf /usr/local/share/android-sdk
sudo rm -rf /opt/android-ndk
```

Similarly, feel free to delete iOS simulators that you do not use:

```bash
sudo rm -rf ~/Library/Developer/CoreSimulator/Profiles/Runtimes/iOS\\ 10.3.simruntime/
```

## カスタマイズ

Bitriseの[OS X Boxブートストラップレポジトリ](https://github.com/bitrise-io/osx-box-bootstrap)にて、macOSベースボックスセットアップガイド、macOS仮想マシンベースボックスをビルドするのに使用するオートメーションスクリプトを確認することができます。そのレポジトリにはBitriseが使用するベースの仮想マシンイメージを準備する際の全てのスクリプトが含まれています。

Linuxマシンについては、[Bitrise Base Docker Image レポジトリ](https://github.com/bitrise-docker/bitrise-base)をご確認ください。

{% include message_box.html type="note" title="システムレポート" content="  [Bitriseメインレポジトリ内のシステムレポートフォルダ](https://github.com/bitrise-io/bitrise.io/tree/master/system_reports)より、プリインストールされたツールやバージョン情報といった、現在の構成をいつでも確認することができます。レポートはスクリプトによって生成され、レポートの最初の行にリンクされます。 "%}

仮想マシンの準備において使われるレポジトリはオープンソースでもあり、プルリクエストをいつでも歓迎しております。Bitriseのマシンにプリインストールしてほしいツールが有りましたら、お気軽に変更の追加をお願いします。スタックがアップデートされる次回までに、そのツールは関連したスタックに含まれるようになります。

## 仮想マシンのアップデート

[#changelog category of discuss.bitrise.io](https://discuss.bitrise.io/c/changelog) にて常にアップデートについてのアナウンスがされ、あなたの[Bitrise Dashboard](https://www.bitrise.io/dashboard)上にも表示されます。重要な変更がある際には、_Platform Updates_の通知を皆様にお送りします。通知を受け取るには、[アカウント設定ページ](https://www.bitrise.io/me/profile)でこの機能をオンにしておいてください。

### スタックのアップデート

一般的にBitriseはスタックのアップデートを週に一回（週末）に行っております。

現在の仮想マシン環境で比較的小さな問題を検知した場合、アップデートは平日中に行われる場合もあります。以上のアップデートは、プリインストール済みのツールバージョンへ変更が加えられることはありません（必要な場合を除く）。

平日中の変更やアップデートを極力避けるため、リリースされる前にBitriseはできるだけ多くの回数のスタックテストを行います。

## Managing Java versions

By default, every Bitrise stack comes with Java 11 pre-installed and ready to use. If you do not switch to another version, your build will use Java 11.

For now, Java 8 is also available on every stack type, though the process of switching to Java 8 is slightly different on our Ubuntu-based stacks compared to the macOS-based stacks.

### Setting Java versions with the Set Java version Step

You can easily switch between Java 8 and Java 11 with our [**Set Java version** Step](https://www.bitrise.io/integrations/steps/set-java-version). The Step allows you to set the global Java version of the virtual machine that runs your build.

{% include message_box.html type="important" title="Installing a new Java version" content="This Step cannot install any Java version. It can only switch between the versions that are pre-installed on our stacks. If you want to install a Java version that is not available on our stacks by default, check out the [Using a Java version not installed on our Android stacks](/infrastructure/virtual-machines/#using-a-java-version-not-installed-on-our-android-stacks) section."%}

1. Add the **Set Java version** Step to your Workflow. We recommend setting it as the first Step of the Workflow.
2. Find the **Java version to be set globally for the build** input.
3. Set it to the version you need. The accepted input values are 8 and 11.

### Setting Java versions with a Script Step

Our Android & Docker stacks run on virtual machines with Ubuntu, while our Xcode and Visual Studio for Mac stacks run on macOS. The process is a little different for the different stack types but on all stacks, switching to a different Java version requires three things:

* Setting Java itself and the Java compiler to the selected version.
* Setting the `JAVA_HOME` Environment Variable with the `export` command.
* Storing this Environment Variable with `envman` so it can be accessed by all Steps in your Workflow.

{% include message_box.html type="important" title="Steps and Env Vars" content="You need envman because without that, Steps can’t access each other’s Environment Variables. If you only set the Java environment for one Step, but do not store it with envman, the other Steps will use the default Java environment, Java 11."%}

You can do all of it in one **Script** Step though, so it’s quite simple. To change the default Java version:

#### On macOS-based stacks

1. Add a **Script** Step to the Workflow before any Step that uses Java in any way.  
   The simplest way to do it is to place it as the first Step of the Workflow.
2. Add the following commands to the **Script content** input of the Step:  
   To set the global Java version for the build to Java 11:

   ```
   jenv global 11
   export JAVA_HOME="$(jenv prefix)"
   envman add --key JAVA_HOME --value "$(jenv prefix)"
   ```

   To set the global Java version for the build to Java 8:

   ```   
   jenv global 1.8
   export JAVA_HOME="$(jenv prefix)"
   envman add --key JAVA_HOME --value "$(jenv prefix)"
   ```
3. Click **Save** at the top right corner.

#### On Ubuntu-based stacks

1. Add a **Script** Step to the Workflow before any Step that uses Java in any way.  
   The simplest way to do it is to place it as the first Step of the Workflow.
2. Add the following commands to the **Script content** input of the Step:
   To set the global Java version for the build to Java 11:

   ```
   sudo update-alternatives --set javac /usr/lib/jvm/java-11-openjdk-amd64/bin/javac
   sudo update-alternatives --set java /usr/lib/jvm/java-11-openjdk-amd64/bin/java

   export JAVA_HOME='/usr/lib/jvm/java-11-openjdk-amd64'
   envman add --key JAVA_HOME --value '/usr/lib/jvm/java-11-openjdk-amd64'
   ```

   To set the global Java version for the build to Java 8:

       sudo update-alternatives --set javac /usr/lib/jvm/java-8-openjdk-amd64/bin/javac
       sudo update-alternatives --set java /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java

       export JAVA_HOME='/usr/lib/jvm/java-8-openjdk-amd64'
       envman add --key JAVA_HOME --value '/usr/lib/jvm/java-8-openjdk-amd64'
3. Click **Save** at the top right corner.

### Using a Java version not installed on our Android stacks

If you need a Java or JDK version which is not installed on our Android stacks, follow this guide. The example below will install Java/JDK 1.14 with a **Script** Step. You can adapt it to the version of your choice.

1. Add the **Script** Step to your Workflow with the content below and don't forget to replace the version to the version you wish to install:

       #!/bin/bash
       set -ex

       add-apt-repository -y ppa:openjdk-r/ppa
       apt-get update -qq
       apt-get install -y openjdk-14-jdk
       update-java-alternatives -s /usr/lib/jvm/java-1.14.0-openjdk-amd64
       echo "done"
2. Start a new build. This **Script** Step can be the very first Step in the Workflow, as it does not depend on anything else.

## iOSシミュレータ・バージョン & SDK サポート

Xcode -> Preferences -> Componentsよりインストールができる全てのiOSシミュレータ バージョンはインストールされており、利用可能です。
