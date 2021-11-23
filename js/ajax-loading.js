

/*ASN: Rewriting document ready to just check for toc.ready, which is triggered either by the standalone toc.js script if used, or when using the legacy
method, it will be triggered directly, as the toc will be there right away in that case*/
$(document).ready(function () {
    $(document.body).on('click', 'a', function (event) {
        var clickedLink = $(this);
        /*Make external links and home url redirect as usual:*/
        if (clickedhref.match(/^http.*|\/index\.html|^mailto/)) {
            /*Just let link work as by default*/
        }
        //for accordions:
        else if ($(this).parents('.panel-heading').length) {
            event.preventDefault();
        }
        else {
            event.preventDefault();
            var href = this.href;
            
            var hash = this.hash;
            
            history.pushState(href, null, href);
            /*$("#content-wrapper").load(href + ' #content-wrapper>*');*/
            loadContent(href, hash);
            
            $('ul.toc a').removeClass('active');
            
            $.each($("ul.toc a"), function (i, e) {
                /*var href = $(this).attr("href");*/
                var toclink = decodeURI(this.href);
                var r = new RegExp(href + '$');
                
                if (r.test(toclink)) {
                    $(this).closest(".topic-link").addClass("active");
                    
                    if (clickedLink.is('.topic-link')) {
                        toggleToc(clickedLink);
                    } else {
                        expandToc($(this));
                    }
                    
                    mobileAjaxToc();
                    return false;
                }
            });
        }
    });
});

function mobileAjaxToc() {
    //ASN: Hide mobile TOC and show contents, for ajax version
    if (true === $(".mobile-nav-toggle").is(":visible")) {
        $("#toc-wrapper").hide();
        $("#content-wrapper").show();
    }
}

function toggleToc(clickedLink) {
    clickedLink.next("ul").toggle();
    var glyph = clickedLink.find('.glyphicon')
    if (glyph.is(".glyphicon-chevron-right")) {
        glyph.removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    } else {
        glyph.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    }
}

function expandToc(anchor) {
    $(".toc .topic-link + ul").hide();
    $('ul.toc .topic-link.active').parents('ul').css('display', 'block');
    $('ul.toc li .glyphicon').removeClass("glyphicon-chevron-down");
    $('ul.toc li .glyphicon').addClass("glyphicon-chevron-right");
    
    $('ul.toc .topic-link.active').parents('li').find('a:first .glyphicon').removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    
    var glyph = anchor.find('.glyphicon')
    glyph.removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    
    $('ul.toc .topic-link.active + ul').css('display', 'block');
}

function scrollToElement(ele) {
    $(window).scrollTop(ele.offset().top).scrollLeft(ele.offset().left);
}


function loadContent(href, hash) {
    $("#content-wrapper").load(href + ' #content-wrapper>*', function () {
        $(this).unbind('load');
        
        //ASN: Problem: makes the page reload for some reason on some clicks
        /*        if (hash !== "") {
        scrollToElement($(hash));
        }*/
        
        chunkedPrevNext();
        buildSectionToc();
        addSearch();
    });
    
    $(".breadcrumb-container").load(href + ' .breadcrumb-container>*', function () {
        $(this).unbind('load');
    });
}

window.addEventListener('popstate', function (e) {
    var href = e.state;
    
    if (href == null) {
        //Do nothing?
    } else {
        loadContent(href, hash);
        /*document.title = "Ghostbuster | " + url;*/
    }
});