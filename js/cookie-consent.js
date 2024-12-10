(function () {
    // Flag to help with execution control since this script is included in two places
    if (typeof window.cookiesConsented !== 'undefined') {
        return;
    } else {
        window.cookiesConsented = false;
    }

    /**
     * In order to avoid deleting custom cookies set by integrations,
     * we now trigger 'cookies.declined' instead of clearing cookies other
     * than those added by Google Analytics. The clients will then have to
     * make sure to delete their custom cookies themselves. These are the
     * lists of cookies that are set by Google.
     *
     * @see https://developers.google.com/analytics/devguides/collection/gtagjs/cookie-usage
     * @see https://support.google.com/analytics/answer/11397207?hl=en
     * */
    const GACookies = [
        '_ga',
        '_gid',
        '_gat',
        'AMP_TOKEN',
        '__utma',
        '__utmt',
        '__utmb',
        '__utmc',
        '__utmz',
        '__utmv',
        '__utmx',
        '__utmxx',
        '_gaexp',
        '_opt_awcid',
        '_opt_awmid',
        '_opt_awgid',
        '_opt_awkid',
        '_opt_utmc',
        '_opt_expid'
    ];

    const GACookieNamespaces = [
        '_ga_',
        '_gac_',
    ];

    /**
     * Helper for getting all cookie names
     *
     * @returns {String[]}
     */
    const getCookieNames = function () {
        const cookies = [];

        if (document.cookie) {
            const split = document.cookie.split(';');

            for (var i = 0; i < split.length; i++) {
                const name_value = split[i].split("=");
                cookies.push(name_value[0].trim());
            }
        }

        return cookies;
    }

    /**
     * Helper for deleting all Google Analytics cookies
     */
    const deleteGACookies = function () {
        const allCookies = getCookieNames();

        for (const name of allCookies) {
            if (GACookies.includes(name)) {
                Cookies.remove(name);
            }
        }

        for (const name of allCookies) {
            for (const namespace of GACookieNamespaces) {
                if (name.startsWith(namespace)) {
                    Cookies.remove(name);
                }
            }
        }
    }

    /**
     * Helper for deleting all Google Analytics cookies
     */
    const deleteAllCookies = function () {
        for (const name of getCookieNames()) {
            if (name !== 'cookieconsent_status') {
                Cookies.remove(name);
            }
        }
    }

    /**
     * Function for executing Osana Cookie Consent
     */
    const initCookieConsent = function () {
        // If cookie consent isn't activated, enable cookies directly
        const cookieConfig = {
          palette: {
              popup: {
                  background: "#000"
              },
              button: {
                  background: "#fdd835"
              }
          },
          type: consenttype,
          revokable: true,
          content: {
              href: privacypolicy,
          },

          /**
           * Handler for status changes.
           * @param {*} status
           */
          onStatusChange: function (status) {
              // Trigger consented
              if (status === 'allow') {
                  if (! window.cookiesConsented) {
                      window.cookiesConsented = true;
                      $(document).trigger('cookies.consented');
                  }
              // Trigger declined
              } else if (status === 'deny') {
                  deleteGACookies();
                  $(document).trigger('cookies.declined');
              }
              // 'dismiss' status is only set when the
              // consenttype === 'info', and if that's
              // the case, then we'd already have had
              // triggered the consent.
          }
        };

        // allow override of config by declaring the
        // variable consentOverride i layout-custom-script.js
        if (typeof consentOverride !== 'undefined') {
            $.extend(true, cookieConfig, consentOverride);
        }

        window.cookieconsent.initialise(cookieConfig);
    }

    // If cookie consent isn't activated, enable cookies directly
    if (typeof consenttype === 'undefined' || ! consenttype) {
        $(document).trigger('cookies.consented');
        return;
    }

    // Check initial state and trigger consent
    const initialStatus = Cookies.get('cookieconsent_status');

    if (consenttype !== 'opt-out' || ['allow', 'dismiss', ''].includes(initialStatus)) {
        window.cookiesConsented = true;
        $(document).trigger('cookies.consented');
    } else {
        deleteGACookies();
        $(document).trigger('cookies.declined');
    }

    // Init on load
    $(window).on('load', function () {
        initCookieConsent();
    });
})();
