$(document).ready(function () {
    //Get code snippets dynamically, called also in LoadContent for ajax:
    getEmbedCode();

    var url = window.location.href;
    var hash = window.location.hash;
    /*From another page:*/
    displayAccordionTarget(hash);

    /*Collapse sidebar:*/
    $(".collapsible-sidebar-nav .site-sidebar-header .navbar-toggle").click(function() {
        $(".site-body-row").toggleClass("collapse-sidebar-nav");
    });

    /*Accordion glyphs:*/
    $(document.body).on('click', '.panel-heading .titlepage', function (event) {
        $(this).parent().toggleClass('active');
    });

    $(document.body).on('click', '.feedback-panel .btn', function (e) {
        e.preventDefault();

        var button = $(this);
        var id = this.id;
        var isactive = button.hasClass('active');

        $('.feedback-panel .btn').removeClass('active');

        if (isactive) {
            button.removeClass('active');
        } else {
            button.addClass('active');
        }

        //Show feedback link if 'no' is active
        if ($('#feedback-no-btn, #feedback-yes-btn.toggle-yes').hasClass('active')) {
            $('#email-feedback.toggle-feedback').slideDown('slow');
        } else {
            $('#email-feedback.toggle-feedback').slideUp('slow');
        }
    });

    $(document.body).on('keypress', 'form .search-field', function (e) {
        if(e.which === 13 && enterKey === 'select'){
            /*Note: trigger click doesn't work, need to use this*/
            $('.selected-searchresultitem a')[0].click();
            $('form .search-field').blur();
        }
        return e.which !== 13;
    });

    /*Init top navigation */
    $('.sm.sm-simple').smartmenus({subMenusMaxWidth: '30em', subMenusMinWidth: '15em'});
    if(versionsfile !== ''){
        addGlobalVersions(versionsfile);
    }
    mapVersionPage();
});

function addGlobalVersions(versionsfile) {
    //If using global version definition file (created from latest version of output with layout editor)
    //By default the file '/js/versions.html' will be placed in the top js folder.
    $. get (versionsfile).fail(function () {
        console.log("[Paligo] Version file " + versionsfile + " not found, falling back to static versions in html source.");
    }).success(function (data) {
        var globalversionmenu = $(data);

        var dropdown = globalversionmenu.find('> .version-dropdown > ul');
        //Remove static dropdown:
        $('.version-menu > li > ul').remove();
        //Appending only the child menu avoids flicker
        $('.version-menu > li').append(dropdown);

        /*Init top navigation on callback */
        $('.sm.sm-simple').smartmenus({
            subMenusMaxWidth: '30em', subMenusMinWidth: '15em'
        });
    });
}

function URLFromHref(href) {
  const hrefWithHost = href.includes(window.location.origin) ? href : window.location.origin + href;
  return new URL(hrefWithHost);
}

function mapVersionPage(){
    //Version dropdown: Loading same page in other version, if it exists, otherwise redirecting to home page of other version
    $(document).on('click', '.version-dropdown li a', function (event) {
        event.stopPropagation();
        /* currentVersion and newVersion should contain all path to document like
        '/versionFolder/oneMoreFolder/1.9.1'
        but without hostname, no absolut paths!
         */
        // default value
        let currentVersion = window.location.pathname.split('/')[1];
        // let's find actual current version among available
        const $parent = $(this).closest('.version-dropdown');
        $parent.find('li a').each( function (idx, el) {
            const versionURL = URLFromHref(el.getAttribute('href'));
            const version = versionURL.pathname.replace('index.html', '');
            if (window.location.pathname.indexOf(version) === 0) {
                currentVersion = version;
            }
        });
        const lang = document.documentElement.lang || portalLanguage || '';
        const candidateURL = URLFromHref(this.getAttribute('href'));
        const defaultURL = URLFromHref(this.getAttribute('href'));

        // for default - only set lang
        defaultURL.searchParams.set('lang', lang);

        // for candidate - try use current with new version only
        const newVersion = candidateURL.pathname.replace('index.html', '')
        candidateURL.pathname = window.location.pathname.replace(currentVersion, newVersion);

        $.get(candidateURL.href)
            .done(function() { return window.location.href = candidateURL.href })
            .fail(function() { return window.location.href = defaultURL.href });
        return false;
    });
}


function setActiveTocline() {
    // set the active link in the toc on first load. No hash or querystring included
    var path = decodeURI(window.location.href.split('#')[0]);

    path = path.replace(/\?.*$/, '');

    //Clean slate
    $("aside ul.toc a").parent().removeClass("active").removeClass("opened");

    var links = $('aside ul.toc a');

    for (var i = 0; i < links.length; i++) {
        var thisLink = links[i];
        // element

        var $thisLink = $(links[i]);
        // jquery object

        var href = decodeURI(thisLink.href);

        //Bug in Chrome on Windows makes regex test fail, so checking for equality
        if (href === path) {
            $thisLink.parent().addClass("active");
            $thisLink.parents("li").addClass("opened");
            return false;
        }
    }
}

function buildSectionToc() {

    if ($(".section-toc").length) {

        //Checks for the current actual chunk topic, even if an internal section in another chunk is clicked, to build section TOC then too
        // CH update: Fix for vaoid partial match in regex, added '/' before currentChunkId
        var currentChunkId = $('#topic-content > section').attr('id');
        var regex = new RegExp(".*/" + currentChunkId + "\.html$");
        if ($('#topic-content > section').is('[data-permalink]')) {
            currentChunkId = $('#topic-content > section').attr('data-permalink');
            var currentChunkIdDecoded = decodeURI(currentChunkId);
            regex = new RegExp(".*/" + currentChunkIdDecoded + "$");
        }
        var toc = $('aside ul.toc');

        var currentChunkListitem = toc.find('li.opened>a').filter(function () {
            var hrefdecoded = decodeURI(this.href);
            return hrefdecoded.match(regex);
        }).parent();

        var links = currentChunkListitem.find(">ul");
        var linklistitems = currentChunkListitem.find("li");

        //First check there are actual listitems in the list, otherwise remove the section toc
        if (linklistitems.length == 0) {
            $(".section-toc").remove();
        } else {
            var sectionTocLinks = links.clone();
            //Only show first level children, section TOCS could get very long otherwise
            sectionTocLinks.find('ul').remove();
            sectionTocLinks.find('.glyphicon').remove();
            sectionTocLinks.appendTo(".section-toc");
            //Make sure the section TOC is displayed even if the main TOC sub topics are collapsed
            $(".section-toc ul").css('display', 'block');
        }
    }
}

function chunkedPrevNext() {
    var toc = $('aside ul.toc');
    var links = toc.find('a').filter(function () {
        return this.href.match(/.*\.html?$/);
    });

    var nextlink = $('.pager .next a');
    var prevlink = $('.pager .previous a');

    var next = '';
    var prev = '';

    /*Looping the toc to create correct prev/next navigation corresponding to toc options.*/
    for (var index = 0; index < links.length; index++) {
        var minusone = links[index - 1];
        var plusone = links[index + 1];
        if (typeof minusone !== "undefined") {
            if (minusone.parentElement.classList.contains('active')) {
                var jqueryObj = $(links[index]);
                next = jqueryObj.attr('href');
                nextlink.attr('href', next);
            }
        }

        if (typeof plusone !== "undefined") {
            if (plusone.parentElement.classList.contains('active')) {
                var jqueryObj = $(links[index]);
                prev = jqueryObj.attr('href');
                prevlink.attr('href', prev);
            }
        }
    };


    if (next == '') {
        /*If there is no next in the TOC, it means the standard transform has created a next from an internal link, which we don't want.
        Not needed for prev, because it will always be the index for that situation (first topic). */
        nextlink.remove();
    }
}

function displayAccordionTarget(id) {
    if (!id) {
        return false;
    }
    var $accordion = $(id).closest('.accordion');
    if ($accordion.length) {
        $accordion.find('.panel-heading').addClass('active');
        $accordion.find('.panel-body').addClass('in').css('height', 'auto');
    }
}

function getEmbedCode(){
    $("pre.embedcode[data-resource^='https:']").each(function () {
        /**
         * @type {Object}
         */
        var $pre = $(this);

        /**
         * @type {String}
         */
        var resource = $(this).data("resource");

        $.get(resource)
            .fail(function(){
                throw "[Paligo] Not able to load source: "+resource;
            })
            .success(function(data) {
                let code = {
                    value: data,
                    language: '',
                };

                if (typeof hljs !== 'undefined') {
                    $pre.empty().addClass('hljs');

                    if ($pre.data('language') && $.inArray($pre.data('language'), hljs.listLanguages()) > -1) {
                        code = hljs.highlight($pre.data('language'), code.value);
                    } else {
                        code = hljs.highlightAuto(code.value);
                    }
                }

                $pre.append(code.value).addClass(code.language);
            });
    });
}
