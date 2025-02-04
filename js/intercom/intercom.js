window.intercomSettings = {
    app_id: intercom_appid
  };
(function () {
    var w = window;
    var ic = w.Intercom;
    if (typeof ic === "function") {
        ic('reattach_activator');
        ic('update', intercomSettings);
    } else {
        var d = document;
        var i = function () {
            i.c(arguments)
        };
        i.q =[];
        i.c = function (args) {
            i.q.push(args)
        };
        w.Intercom = i;
        function l() {
            var s = d.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = intercom_src;
            var x = d.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
        }
        if (w.attachEvent) {
            w.attachEvent('onload', l);
        } else {
            w.addEventListener('load', l, false);
        }
    }
})();

// handle top banner layout changes
window.setInterval(() => {
    const bodyMarginTop = document.body.style.marginTop;  // intercom sets this for top banner
    document.querySelector('aside.site-sidebar').style.marginTop = bodyMarginTop;
    document.querySelector('aside.site-sidebar').style.maxHeight = `calc(100% - ${bodyMarginTop})`;
    document.querySelector('.site-content .toolbar').style.marginTop = bodyMarginTop;
}, 500);
