/* JS file for API style output */

/**
 * @type {object}
 */

jQuery(document).ready(function($){
    /**
     * @type {object}
     */
    var $toc = $('#toc-container .affix');

    /*ASN: Support for API style even if you just have one programming language, in which case the language switcher becomes superfluous:*/
    if ($("#nav-code-selection li").length < 2){
        $("#nav-code-selection").addClass('nav-code-selection-hidden');
        $(".entry-code .code").removeClass('code');
    }

    /*ASN: Also, if no code switcher is desired, because the code samples are mixed languages, but should appear always:*/
    if ($("#nav-code-selection").hasClass('nav-code-selection-hidden')){
        $(".entry-code .code").removeClass('code');
    }

    /**
     * @type {object}
     */
    var $toc_container = $('#toc-container');

    /**
     * Recalculates the toc contatiner width
     * @type {function}
     */
    var recalulateTocContainer = function(){
        var width = $toc_container.width();
        $toc.css('width', width);
        $toc_container.removeAttr('style');
    };

    /**
     * Recalculation timer
     * @type {int}
     */
    var recalulateTocTimer;

    $(window)
        .on('resize', function(){
            if ( $(this).width() > 991 ) {
                $toc_container.css('opacity', '0.15');

                clearTimeout(recalulateTocTimer);
                recalulateTocTimer = setTimeout(recalulateTocContainer, 250);
            } else {
                $toc.removeAttr('style');
            }
        })
        .trigger('resize');

    /**
     * Toggle toc on small screens
     */
    $('#toc-icon a').on('click', function(){
        $('#toc-placeholder.nav-sidebar,body').toggleClass('toc-overlay');
    });

    $('#toc-placeholder a, #toc-placeholder .close').on('click', function(){
        if ($('#toc-placeholder').hasClass('toc-overlay')) {
            $('#toc-icon a').trigger('click');
            return true;
        }
    });

    /**
     * Code-view selection
     */
    $( "#nav-code-selection a" ).click(function(e) {
        /**
         * Clicked element
         * @type {object}
         */
        var $this = $(this);

        /**
         * @type {object}
         */
        var $parent = $this.parent().addClass('active');

        /**
         * The nav
         * @type {object}
         */
        $this.closest('.nav')
            .find('.active')
            .not($parent)
            .removeClass('active');

        /**
         * Coding language
         * @type {string}
         */
        var language = $this.data( "code" );

/*Needs to be explicit to not match regular code elements*/
        $( ".code[data-code-view]" ).hide();
        /*$( "*[data-code-view='" + $this.data( "code" ) + "']" ).fadeIn(50);*/

        /*ASN: Match any language in the data-code-view attribute that matches
        either start of string or semicolon followed by language name and then semicolon or end of string.
        This makes it more complex than before, but supports multiple filter values on an element. */
        var regex = new RegExp("(^|;)" + language + "(;|$)", "g");

        $('*[data-code-view]')
        .filter(function() {
            return $(this).attr('data-code-view').match(regex);
        })
        .fadeIn(50);
        $(window).trigger('scroll');

        return e.preventDefault();
    });
    $( "#nav-code-selection a:first" ).click();
});
