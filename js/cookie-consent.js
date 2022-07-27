$(document).ajaxComplete(function () {
    initCookieConsent();
    
    $('.cc-deny').click(function () {
        location.reload();
    });
});

window.addEventListener("load", function () {
    initCookieConsent();
    
    $('.cc-deny').click(function () {
        location.reload();
    });
});

function initCookieConsent() {
    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#000"
            },
            "button": {
                "background": "#fdd835"
            }
        },
        "type": consenttype,
        "content": {
            "href": privacypolicy
        },
        
        onPopupOpen: function() {
            // Clear all cookies if 'opt-out' and user has not yet accepted
            if (this.type == 'opt-out' && !this.hasConsented()) {
                
                var cookies = get_cookies_array();

                // Erase all cookies except the one holding consent
                for (var name in cookies) {
                    if (! name.match('^cookieconsent_status')) {
                        eraseCookie(name);
                    }
                }
            }
        },
        
        // Custom property to avoid multipe event triggers
        "eventTriggered": false,

        onStatusChange: function (status) {
            // Event should already be triggered if
            // user has select 'info' as their consent type
            if (this.type === 'info') {
                return;
            }

            if (status && status === 'dismiss' && !this.eventTriggered) {
                // Trigger consent event (analytics scripts, etc.)
                $(document).trigger('cookies.consented');
                this.eventTriggered = true;
            }
        }
    })
}


function get_cookies_array() {
    
    var cookies = {
    };
    
    if (document.cookie && document.cookie != '') {
        var split = document.cookie.split(';');
        for (var i = 0; i < split.length; i++) {
            var name_value = split[i].split("=");
            name_value[0] = name_value[0].replace(/^ /, '');
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
        }
    }
    
    return cookies;
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() +(days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    var hostname = location.hostname;
    countparts = hostname.split(".").length;
    var rootdomain = hostname;
    if(countparts === 3){
        rootdomain = '.' + hostname.replace(/(.*?)\.(.*)/, '$2');
    }
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=" + rootdomain +";";
}