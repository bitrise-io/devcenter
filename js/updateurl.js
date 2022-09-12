var currentHash = "#"

$(document).ready(function () {
    
    /*
     * ========================================
     * ASN: Update URL on scroll for easy link copy. Currently not enabled in standard output
     * ========================================
     */
    
    $(".accordion .panel-heading").click(function () {
        var top = window.pageYOffset;
        var distance = top - $(this).offset().top;
        var hash = $(this).closest('.accordion').attr('id');
        
        currentHash = hash;
        didScroll = false;
        updateUrl();
    });
    
    var topsection = "";
    
    $(window).scroll(function () {
        
        topsection = $('.article, .section').first().attr('id');
        
        if (! $("#aa-search-input").is(":focus")) {
            $('section[id], .accordion').each(function () {
                
                if ($(this).hasClass('accordion') && $(this).find('.active').length == 0) {
                    return true;
                }
                var top = window.pageYOffset;
                var distance = top - $(this).offset().top;
                var hash = $(this).attr('id');
                
                // 30 is an arbitrary padding choice,
                if ((distance < 30) && (distance > -30) && (currentHash != hash)) {
                    currentHash = hash;
                }
            });
        }
        didScroll = true;
    });
    var didScroll = false;
    
    /*ASN: Interval needed to do this, otherwise the scroll event fires the history.pushState hundreds of times a second, causing an error*/
    setInterval(function () {
        if (didScroll) {
            didScroll = false;
            updateUrl();
        }
    },
    500);
    
    function updateUrl() {
        if (currentHash == topsection) {
            if (history.pushState) {
                history.pushState('', '/', window.location.pathname)
            } else {
                window.location.hash = '';
            }
            return false;
        }
        
        /*Otherwise update it to the current section*/
        if (history.pushState) {
            history.pushState(null, null, "#" + currentHash);
        } else {
            window.location.hash = "#" + currentHash;
        }
    }
});