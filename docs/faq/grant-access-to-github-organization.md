Steps to grant access for Bitrise.io to a given GitHub Organization:

1. Open [https://github.com](https://github.com)
2. In the top right corner click your user / avatar
3. In the list select [Settings](https://github.com/settings/profile)
4. On the left side select [Authorized applications](https://github.com/settings/applications)
5. In the left-side navigation, click __Authorized OAuth Apps__, and choose __Bitrise__
6. Locate the Organization you want to grant access to, and click `Grant`.

![Authorized OAuth Apps](/img/faq/authorized-oauth-apps.png)

You can now go back to [bitrise.io](https://www.bitrise.io) and you
should see the organization / repository on the Add New App page.

__If there's no `Grant access` button for the organization in the _Organization access_ section__
and instead you see a red cross icon, that means that the access was previously granted but then it was revoked.
You can fix this by selecting the organization on the left side, in the
__Organization settings__ section, then on the _Organization settings_
page select __Third-party access__, locate `Bitrise`, click the __pencil icon__,
and click the `Grant access` button there.

!!! note "In case the repository is a fork of another private repository"
    In case the repository is a fork of another private repository which belongs to **(another) organization** you
    have to repeat these steps and grant access for Bitrise for the orgianization _which owns the original repository_.

    This is a GitHub limitation, in order to be able to access a private repository fork
    __you have to grant access for the service (Bitrise) in both repositories__;
    in the fork and in the original repository/organization too.
