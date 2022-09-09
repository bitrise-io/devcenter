$(document).ready(function () {

    //If not using standalone toc, we still need to call all the functions in toc ready, otherwise it's done when creating the standalone toc
    var tocmeta = document.querySelector('meta[name="tocstandalone"]');
    if(tocmeta){
        var tocstandalone = document.querySelector('meta[name="tocstandalone"]').content;
        if(tocstandalone == 'no'){
            $(document).trigger('toc.ready');
        } 
    }
    
    /*If a link target is a hidden accordion, first display it:
    =========*/
    var url = window.location.href;
    var hash = window.location.hash;
    /*From another page:*/
    displayAccordionTarget(hash);
    
    /*Same page*/
    $(document.body).on('click', 'a.xref, a.topic-link, a.link, .aa-dropdown-menu a, #search-result-wrapper a', function (event) {
        var id = this.hash;
        displayAccordionTarget(id);
    });
    
    /* Adjusting position in view for internal page toc links */
    $(document.body).on('click', '.section-nav-container a', function (e) {
        var clickedhref = $(this).attr('href');
        $(clickedhref).scrollView();
        e.preventDefault();
    });
    /*=========*/
    
    //Bootstrap popovers for glossterms
    $('[data-toggle="popover"]').popover({
        animation: "fade",
        delay: {
            show: "500",
            hide: "100"
        },
        trigger: "hover",
        placement: "auto bottom",
        container: 'body',
        html: true,
        content: function () {
            var clone = $('.glossary-definitions ' + $(this).data('popover-content')).first().clone(true).removeClass('hide');
            return clone;
        }
    });
    
    var $searchform = $(".tool-search-form");
    $(".toolbar .tool-search > i").click(function() {
        $searchform.show().fadeIn(100, function() {
            $(".tool-search-form .search-field").select();
            $(".top-nav-menu").fadeOut(100);
        });
    });
    $searchform.focusout(function() {
        $searchform.fadeOut(100, function() {
            $(this).hide();
            $(".top-nav-menu").fadeIn(100);
        });
    });    

    /**
     * JM: This snippet will add an 'oncopy' eventlistener to all programlistings that are usign callouts.
     * This listener will clean out any callout elements before copying and after the copying restore the 
     * callouts.  
     */
    $(".programlisting").has(".co").on("copy", 
    function () {
        // Save selection
        var sel = window.getSelection();
        var range;
        var startClass = 'start-selection';
        var endClass = 'end-selection';
        if (sel.getRangeAt && sel.rangeCount) {
            var savedRange = window.getSelection().getRangeAt(0);
            // Save start
            range = savedRange.cloneRange();
            range.collapse(true);
            var $start = $('<span></span>').addClass(startClass);
            range.insertNode($start[0]);
            // Save end
            range = savedRange.cloneRange();
            range.collapse(false);
            var $end = $('<span></span>').addClass(endClass);
            range.insertNode($end[0]);
        }
        var el = $(this); 
        var innerHtml = el.html();
        el.find('.co').remove();
        setTimeout(function() {
            el.children().remove();
            el.html(innerHtml);
            // Restore selection
            sel.removeAllRanges();
            range.setStartBefore($('.'+startClass)[0]);
            range.setEndBefore($('.'+endClass)[0]);
            sel.addRange(range);

            $('.'+startClass).remove();
            $('.'+endClass).remove();
        });
    }
    );

	initChecklist();
});

/* Adjusting position in view for internal page toc links. Ajax version handles this elsewhere */
$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top - 80
    }, 0);
  });
};

$(document).on('toc.ready', function () {
    
    $("aside ul.toc a").click(function (e) {
        //Only for internal sections:
        var r = new RegExp('#');
        if (r.test($(this).attr('href'))) {
            $("aside ul.toc a").parent().removeClass("active").removeClass("opened");
            $(this).parent().addClass("active");
            $(this).parents("li").addClass("opened");
        }
    });
    
    setActiveTocline();
    chunkedPrevNext();
    buildSectionToc();
    if(useanchorlinks){
        setAnchors();
    }

    if (theme == '3' || theme == '3b') {
        $("aside ul.toc").attr({
            "data-spy": "affix", "data-offset-top": "157", "data-offset-bottom": "50"
        });
    }

    /* Prevents double scroll bar behaviour if viewport width changes */
    if (theme == '3c' || theme == '3d') {
        $('.navbar-toggle').click(function() {
            $('body').toggleClass('overflow-hidden');
        });
    }
    
    /*Swagger embed needs the nav arrow for dynamically loaded sub toc:*/
    var glyphicon = "<span class='glyphicon'></span>"; 
    $('ul.nav-site-sidebar .swagger-topic').append(glyphicon);    
    
    /*Collapse sections:*/
    $(".nav-site-sidebar a .glyphicon").click(function (e) {
        e.preventDefault();
        $(this).closest("li").toggleClass("opened");
    });
});
