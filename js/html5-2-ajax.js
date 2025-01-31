$(document).on('toc.ready', function () {
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

    /*Swagger embed needs the nav arrow for dynamically loaded sub toc:*/
    var glyphicon = "<span class='glyphicon'></span>";
    $('ul.nav-site-sidebar .swagger-topic').append(glyphicon);

    updateCollapseTocListener();
    
});

function updateCollapseTocListener() {
    if (collapseTocSectionOnLinkTitleClick) {
        $(".nav-site-sidebar li>a:not(.topichead) .glyphicon, .nav-site-sidebar a.topichead, .nav-site-sidebar li>a").off();
        $(".nav-site-sidebar li:not(.opened.active)>a:not(.topichead) .glyphicon, .nav-site-sidebar a.topichead, .nav-site-sidebar li.active>a").click(function (e) {
            if (!($(this).hasClass('glyphicon') && $(this).parent().parent().hasClass('active'))) {
                e.preventDefault();
                $(this).closest("li").toggleClass("opened");
                updateCollapseTocListener();
            }
        });
    }else {
        $(".nav-site-sidebar a:not(.topichead) .glyphicon, .nav-site-sidebar a.topichead").off();
        $(".nav-site-sidebar a:not(.topichead) .glyphicon, .nav-site-sidebar a.topichead").click(function (e) {
            e.preventDefault();
            $(this).closest("li").toggleClass("opened");
            updateCollapseTocListener();
        });
    }
}


function addPopover() {
    //Bootstrap popovers for glossterms
    $('[data-toggle="popover"]').off();

    $('[data-toggle="popover"]').popover({
        trigger: "manual",
        placement: "auto bottom",
        container: 'body',
        html: true,
        content: function () {
            var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
            return clone;
        }
    }).on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        /*Disable lightbox in popovers:*/
        $(".popover .mediaobject img").removeClass('materialboxed');

        $('.popover').on("mouseleave", function () {
            setTimeout(function () {
                if (! $('.popover:hover').length && ! $(_this).is(':hover')) {
                    $(_this).popover("hide");
                }
            },
            300);
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (! $('.popover:hover').length && ! $(_this).is(':hover')) {
                $(_this).popover("hide");
            }
        },
        300);
    });
}

$(document).ready(function () {
    //If not using standalone toc, we still need to call all the functions in toc ready, otherwise it's done when creating the standalone toc
    var tocmeta = document.querySelector('meta[name="tocstandalone"]');
    if(tocmeta){
        var tocstandalone = document.querySelector('meta[name="tocstandalone"]').content;
        if(tocstandalone == 'no'){
            $(document).trigger('toc.ready');
        }
    }

    history.replaceState(window.location.href, null, window.location.href);
    addPopover();
    initChecklist();

    initSearchField();

    $(document.body).on('click', 'a[href]', function (event) {
        var clickedLink = $(this);
        var clickedhref = $(this).attr('href');

        /* Adjusting position in view for internal page toc links. */
        if($(this).closest('.section-nav-container').length){
            var id = this.hash;
            displayAccordionTarget(id);
            $(clickedhref).scrollView();
            event.preventDefault();
        }
        /* Load entire page on languageswitch dropdown */
        else if ($(event.target).hasClass('language-item dropdown-item')) {
            /* Bypass ajax loading and load entire page */
        }
        /* Don’t load topic on glyphicon arrow toggle-click */
        else if ($(event.target).hasClass('glyphicon') && clickedLink.parents('.nav-site-sidebar').length) {
            event.preventDefault();
        }
        /* Load entire page on version dropdown */
        else if (clickedLink.parents('.version-dropdown').length) {
            /* Bypass ajax loading and load entire page */
        }
        /*Make external links and home url redirect as usual (PAL2-9742 DJ: added match for /?lang= to catch PrettyURLs):*/
        else if (clickedhref.match(/^http.*|\/index\.html|\/?lang=|^mailto/) && !($(event.target).hasClass("next") || $(event.target).hasClass("prev"))) {
            /*Just let link work as by default*/
        }
        /*Make special links like with target blank work as usual:*/
        else if ($(this)[0].hasAttribute("target")){
            /*Just let link work as by default to go to other publication and reload TOC*/
        }

        /*Swagger topics need a full refresh. Handles both the topic itself, and the sub toc links:*/
        else if ($(event.target).is(".swagger-topic, .swagger-subnav")){
            /*Just let link work as by default*/
        }

        else if ($(this)[0].hasAttribute("data-olink")){
            /*Just let link work as by default to go to other publication and reload TOC*/
        }
        //for accordions:
        else if ($(this).parents('.panel-heading').length) {
            event.preventDefault();
        } else if (this.href === window.location.href) {
            event.preventDefault();
        } else {
            event.preventDefault();
            var href = this.href;
            var hash = jqEscapeChars(this.hash);

            history.pushState(href, null, href);

            loadContent(href, hash);
        }
    });
});

function initSearchField(){
    //For theme2 search field. Unbind first, since it needs to be called multiple times (on load for dynamic loads)
    $(".toolbar .tool-search > i").off();
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
}

/* Adjusting position in view for internal page toc links. Non-ajax handles this in html5-2.js */
$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top - 80
    }, 0);
  });
};


function scrollToElement(ele) {
    if (typeof (ele) !== "undefined") {
        $(window).scrollTop(ele.offset().top).scrollLeft(ele.offset().left);
    }
}

function loadContent(href, hash) {

    /*Hide popovers if switching to a new page:*/
    $('[data-toggle="popover"]').popover('hide');

    var id = escapeHtml(href.split('#')[1]);
    if (typeof (id) !== "undefined") {
        id = jqEscapeChars(id);
    }
    $(".site-content").load(href + ' .site-content>*', function () {
        $(this).unbind('load');

        /*Update window title:*/
        var loadedtitle = $(this).find('main .topic-content .titlepage .title > .title').first().text();
        $('head title').text(loadedtitle);

        //Needs to be initialized after page load for ajax variant
        $(".mediaobject img:not(.materialboxed)").addClass('materialboxed');
        //Exclude images with links
		$(".mediaobject a img").removeClass('materialboxed');
	    $('.materialboxed').materialbox();

        displayAccordionTarget(hash);

        initSearchField();

        window.scrollTo(0, 0);

        if (typeof (id) !== "undefined") {
            try {
                scrollToElement($('#' + id));
            } catch (e) {
                var safeId = decodeURI(id);
                scrollToElement($('#' + safeId));
                }
        }
        //Adjust to make sure title is in viewport
        window.scrollBy(0, -80);

        //Keep other TOC sections open or not when clicking another section?
        if($('.current-toc-section-focus').length){
            $("aside ul.toc a").parent().removeClass("active").removeClass("opened");
        }
        else{
            $("aside ul.toc a").parent().removeClass("active");
        }


        $.each($("ul.toc a"), function (i, e) {
            var toclink = this.href;
            var r = new RegExp(href.split('#')[0] + '$');

            if (r.test(toclink)) {
                $(this).parent().addClass("active");
                if($('.current-toc-section-focus').length){
                    $(this).parents("li").toggleClass("opened");
                }
                else{
                    $(this).parents("li").addClass("opened");
                }
                chunkedPrevNext();
                buildSectionToc();
                setActiveTocline();
                updateCollapseTocListener()
                return false;
            }
        });
        chunkedPrevNext();
        addSearch();
        addPopover();
        initChecklist();
        if(useanchorlinks){
            setAnchors();
        }
        /*Init top navigation */
	   $('.sm.sm-simple').smartmenus({ subMenusMaxWidth: '30em', subMenusMinWidth: '15em' });
	   //Call function to add global version dropdown in html5-2-mp-common.js. The variable versionsfile is defined in inline javascript
        if(versionsfile !== ''){
            addGlobalVersions(versionsfile);
        }
        mapVersionPage();
        //Get dynamic code snippets from URL
        getEmbedCode();

        setActiveTocline();
        updateCollapseTocListener()
    });
}

/**
 * Because jQuery uses CSS syntax for selecting elements, 
 * some characters are interpreted as CSS notation. 
 * In order to tell jQuery to treat these characters literally rather than as CSS notation, 
 * they must be escaped by placing two backslashes in front of them.
 * @param {string} id string to escape characters in.
 * @returns {string} string with special characters secaped.
 */
function jqEscapeChars(id) {
    return id.replace( /([\\:|\.|\[|\]|,|=|@])/g, "\\$1" );
}

/**
 * Escape user input in order to prevent XSS attacks
 *
 * @param unsafe
 * @returns {*}
 */
function escapeHtml(unsafe) {
    if (! unsafe) {
        return unsafe;
    }
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

window.addEventListener('popstate', function (e) {
    var href = window.location.href;
    if (href !== null) {
        var hash = window.location.hash;
        loadContent(href, hash);
    }
});
