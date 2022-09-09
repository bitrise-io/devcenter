$(document).on('toc.ready', function () {
    var hashinit = location.hash;
    if ((hashinit !== "") && (typeof hashinit !== 'undefined')) {
        loadContent(hashinit, null);
    } else {
        var home = $('main article .article');
        var homehref = '#' + home.attr('id');
        loadContent(homehref, null);
    }
    
    if (theme == '3' || theme == '3b') {
        $("aside ul.toc").attr({
            "data-spy": "affix", "data-offset-top": "157", "data-offset-bottom": "50"
        })
    }
});


function syntaxHighlight() {
    /**
     * Turn on syntax highlight if the hljs lib is available
     */
    if ("hljs" in window) {
        $('pre').each(function (i, block) {
            hljs.highlightBlock(block);
        });
    }
}

function setActiveTocline() {
    // set the active link in the toc on first load
    var path = purl().attr("path");
    
    $.each($("ul.toc a"), function (i, e) {
        var href = decodeURI(this.href);
        var r = new RegExp(path + '$');
        
        if (r.test(href)) {
            $(this).parent().addClass("active");
            $(this).parents("li").toggleClass("opened");
            return false;
        }
    });
}

$(document).ready(function () {
    if ($("aside ul.toc").length) {
        $(document).trigger('toc.ready');
    }
    
    //Bootstrap popovers for glossterms
        $('[data-toggle="popover"]').popover({
        trigger: "manual", placement: "auto bottom",
        container: 'body',
        html: true,
        content: function () {
            var clone = $($(this).data('popover-content')).next('dd').clone(true).removeClass('hide');
            return clone;
        }
    }).on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        /*Disable lightbox in popovers:*/
        $(".popover .mediaobject img").removeClass('materialboxed');
        
        $('.popover').on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (! $('.popover:hover').length) {
                $(_this).popover("hide");
            }
        },
        300);
    });
    
    var $searchform = $(".tool-search-form");
    $(".toolbar .tool-search > i").click(function() {
        $searchform.show().fadeIn(100, function() {
            $(".tool-search-form .search-field").select();
        });
    });
    $searchform.focusout(function() {
        $searchform.fadeOut(100, function() {
            $(this).hide(); 
        });
    });    
    
    /*Flatten and append the articles:*/
    $('article.topic').appendTo('main');
    
    $(document.body).on('click', 'a[href]', function (event) {
        var clickedLink = $(this);
        var clickedhref = $(this).attr('href');
        /*Make external links and home url redirect as usual:*/
        if (clickedhref.match(/^http.*|\/index\.html|^mailto/)) {
            /*Just let link work as by default*/
        }
        //for accordions:
        else if ($(this).parents('.panel-heading').length) {
            event.preventDefault();
        } else {
            event.preventDefault();
            var href = this.href;
            var hash = this.hash;
            
            history.pushState(href, null, href);
            
            loadContent(href, hash);
        }
    });
});


function scrollToElement(ele) {
    if (typeof (ele) !== 'undefined') {
        $(window).scrollTop(ele.offset().top).scrollLeft(ele.offset().left);
    }
}


function loadContent(href, hash) {
    
    /*Hide popovers if switching to a new page:*/
    $('[data-toggle="popover"]').popover('hide');
    
    $('article.topic').hide();
    $('.topic-content').removeAttr('id');
    
    $('.search-container').hide();
    
    var id = href.split('#')[1];
    //Check if it's an anchorlink, in that case we need to remove that prefix to get the regular id
    id = id.replace(/^al_/, '');
    //Some languages can have special characters that would not work for the link unless decoded
    id = decodeURI(id);
    
    /*Update window title:*/
    var loadedtitle = $('#' + id).closest('.topic-content').find('.titlepage .title > .title').first().text();
    $('head title').text(loadedtitle);
    
    $('#' + id).closest('article').show();
    $('#' + id).closest('.topic-content').attr('id', 'topic-content');
    
    //And then show the "#topic-content" too:
    $('#topic-content').show();
    
    if (useanchorlinks) {
        setAnchors();
    }
    
    var hashpart = '#' + href.split('#')[1];
    
    /*Links to nested accordions not supported in the Preloaded variant*/
    
    window.scrollTo(0, 0);
    
    //If it's not a topic, jump to the internal section
    if ($('#' + id).parent('.topic-content').length == 0) {
        if (hashpart !== "") {
            scrollToElement($(hashpart));
        }
    }
    
    $("aside ul.toc a").parent().removeClass("active").removeClass("opened");
    

    var target = href.split('#')[1];
    $.each($("ul.toc a"), function (i, e) {
        var toclink = this.href.split('#')[1];
        
        if (toclink === target) {
            $(this).parent().addClass("active");
            $(this).parents("li").toggleClass("opened");
            
            buildSectionToc();
            syntaxHighlight();
            addSearch();
            return false;
        }
    });
    addBreadcrumbs();
    chunkedPrevNext();
}

//No breadcrumbs created in xslt for ""Preloaded"" version, created here:
function addBreadcrumbs() {
    $('.breadcrumb li').remove();
    var home = $('main article .article');
    var title = home.find('.titlepage:first .title').text();
    var homelistitem = $("<li class='breadcrumb-link'></li>");
    var homehref = '#' + home.attr('id');
    var homeanchor = $("<a href='" + homehref + "'></a>").text(title);
    homelistitem.append(homeanchor);
    $('.breadcrumb').append(homelistitem);
    
    $.each($('ul.toc .opened'), function (e) {
        var listitem = $("<li class='breadcrumb-link'></li>");
        var anchor = $(this).find('>a').clone();
        anchor.removeClass('topic-link').addClass('breadcrumb-link');
        listitem.append(anchor);
        $('.breadcrumb').append(listitem);
    });
}

function buildSectionToc() {
    
    //var place, var sectionTocLabel are defined in inline script created in publishing process
    
    //Remove previously added section tocs, to avoid duplicates.
    $('div.section-toc').remove();
    
    var sectionToc = $("<div class='section-toc'><div class='section-toc-title'>" + sectionTocLabel + "</div></div>");
    
    if (place !== 'none') {
        
        var currentChunkId = $('#topic-content > section').attr('id');
        var currentChunkIdDecoded = decodeURI(currentChunkId);
        regex = new RegExp(".*" + currentChunkIdDecoded + "$");
        var toc = $('aside ul.toc');
        
        //Checks for the current actual chunk topic, even if an internal section in another chunk is clicked, to build section TOC then too
        var currentChunkListitem = toc.find('a').filter(function () {
            var hrefdecoded = decodeURI(this.href);
            return hrefdecoded.match(regex);
        }).parent();
        
        var links = currentChunkListitem.find(">ul");
        var linklistitems = currentChunkListitem.find("li");
        
        //First check there are actual listitems in the list, otherwise remove the section toc
        if (linklistitems.length !== 0) {
            var sectionTocLinks = links.clone();
            //Make sure the section TOC is displayed even if the main TOC sub topics are collapsed
            sectionTocLinks.css('display', 'block');
            //Only show first level children, section TOCS could get very long otherwise
            sectionTocLinks.find('ul').remove();
            sectionTocLinks.find('.glyphicon').remove();
            
            sectionTocLinks.appendTo(sectionToc);
            sectionToc.appendTo('#topic-content');
        }
    }
}

function chunkedPrevNext() {
    var toc = $('aside ul.toc');
    //Standalone Preloaded is different and needs to check for hashes...
    var links = toc.find('a').filter(function () {
        return this.href.match(/.*\.html?$/);
    });
    
    var nextlink = $('.next a');
    var prevlink = $('.previous a');
    
    var prevId = $('#topic-content').closest('article.topic').prev('article.topic').find('section:first').attr('id');
    var nextId = $('#topic-content').closest('article.topic').next('article.topic').find('section:first').attr('id');
    
    
    if (typeof nextId == "undefined") {
        /*If there is no next in the TOC, it means the standard transform has created a next from an internal link, which we don't want.
        Not needed for prev, because it will always be the index for that situation (first topic). */
        nextlink.hide();
    } else {
        nextlink.show();
        nextlink.attr('href', '#' + nextId);
    }
    
    if (typeof prevId == "undefined") {
        prevlink.hide();
    } else {
        prevlink.show();
        prevlink.attr('href', '#' + prevId);
    }
}

window.addEventListener('popstate', function (e) {
    var href = e.state;
    if (href == null) {
        //Do nothing
    } else {
        var hash = href.hash;
        loadContent(href, hash);
    }
});


//Toggling active class for accordions when clicked
window.onload = function () {
    var acc = document.getElementsByClassName("panel-heading");
    var i;
    
    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function () {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");
            
            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        }
    }
}