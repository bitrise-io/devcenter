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

/**
 * Matches a path against href regardless if prettyURL is used or not
 * @param {string} path to match
 * @param {string} href to match against
 * @returns {boolean} true or false
 */
function matchHref(path, href) {
    // Certain hosts use "Pretty URLs" which removes the .html extension in the hrefs.
    // This will add the .html back when looking for a match.
    if (path === href) {
        return true;
    }else if (path.replace(/(.*?)(\.html?|)(#.*)?$/, "$1.html$3") === href.replace(/(.*?)(\.html?|)(#.*)?$/, "$1.html$3")) {
        return true;
    }else {
        return false;
    }
}

/**
 * Evaluates if a Toc line should be active or not
 * @param {string} path to match
 * @param {object} thisLink link to evaluate.
 * @returns {boolean} true or false
 */
function evaluateTocLine(path, thisLink) {
    var pathBase = path.split('#')[0];
    
    // jquery object
    var $thisLink = $(thisLink);
    
    var href = decodeURI(thisLink.href);
    
    var childNodeLinks = $thisLink.parent().find('ul>li>a');
    
    var foundMatch = false;
    if (childNodeLinks.length > 0) {

        for (var j = 0; j < childNodeLinks.length; j++) {
            if (evaluateTocLine(path, childNodeLinks[j])) {
                foundMatch = true;
            }
        }
    }
    
    var fragmentNotInToc = (matchHref(pathBase, href) && !foundMatch);

    //Bug in Chrome on Windows makes regex test fail, so checking for equality
    if (matchHref(path, href) || fragmentNotInToc) {
        $thisLink.parent().addClass("active");
        $thisLink.parents("li").addClass("opened");
        return true;
    }
}

function setActiveTocline() {
    // set the active link in the toc on first load.
    var path = decodeURI(window.location.href);
    //Remove search or language parameters from the url.
    path = path.replace(/\?.*$/, '');

    //Clean slate
    $("aside ul.toc a").parent().removeClass("active").removeClass("opened");

    var links = $('aside ul.toc>li>a');

    for (var i = 0; i < links.length; i++) {
        // element
        var thisLink = links[i];
        
        evaluateTocLine(path, thisLink);
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
            return matchHrefWithRegex(this.href, regex);
        }).parent();

        var links = currentChunkListitem.find(">ul");
        var linklistitems = currentChunkListitem.find("li");

        //First check there are actual listitems in the list, otherwise remove the section toc
        if (linklistitems.length == 0) {
            $(".section-toc").remove();
        } else {
            var sectionTocLinks = links.clone();
            // PAL2-9835 DJ: Select first valid decendant link for topicheads.
            sectionTocLinks = handleTopicheadInSectionToc(sectionTocLinks);
            //Only show first level children, section TOCS could get very long otherwise
            sectionTocLinks.find('ul').remove();
            sectionTocLinks.find('.glyphicon').remove();
            sectionTocLinks.appendTo(".section-toc");
            //Make sure the section TOC is displayed even if the main TOC sub topics are collapsed
            $(".section-toc ul").css('display', 'block');
        }
    }
}

function handleTopicheadInSectionToc(sectionTocLinks) {
    sectionTocLinks.children('li').each(function () {
        if($(this).children('a').hasClass('topichead')) {
            $(this).children('a').first().attr('href', $(this).find('a:not(.topichead').attr('href'));
        }
    });
    return sectionTocLinks;
}

function chunkedPrevNext() {
    var links = getTocLinks();
    var navigation = getPageNavigation();

    var next = '';
    var prev = '';

    //If no topic is active in the ToC, the index-[lang].html is active. Then point the next link to the first valid topic.
    if (typeof links.activeIndex === "undefined") {
        if (typeof links[0] !== "undefined") {
            next = links[0].href;
        }
        navigation.nextlink.attr('href', next);
        navigation.prevlink.remove();
        return false;
    }

    next = links[links.activeIndex].next;
    prev = links[links.activeIndex].prev;
    navigation.nextlink.attr('href', next);
    navigation.prevlink.attr('href', prev);

    if (next == '') {
        navigation.nextlink.remove();
    }

    if (prev == '') {
        navigation.prevlink.remove();
    }
}

function getTocLinks() {
    var toc = $('aside ul.toc');
    var links = toc.find('a').filter(function () {
        return matchHrefWithRegex(this.href, /.*\.html?$/);
    });
    var tocLinks = {};
    for (var index = 0; index < links.length; index++) {
        var tocLink = {};
        tocLink.index = index;
        tocLink.active = links[index].parentNode.classList.contains('active');
        tocLink.href = links[index].href;
        tocLink.next = index === links.length -1 ? "" : links[index + 1].href;
        var relativePrefix = "";
        relativePrefix += $('#topic-content section').attr('data-relative-prefix') ? $('#topic-content section').attr('data-relative-prefix') : "";
        var language = $('html').attr('lang');
        //Point the first valid topic prev link to index-[lang].html
        tocLink.prev = index === 0 ? relativePrefix + "index-" + language + ".html" : links[index - 1].href;
        if (tocLink.active) {
            tocLinks.activeIndex = index;
        }
        tocLinks[index] = tocLink;
    }

    return tocLinks;
}

function getPageNavigation() {
    var navigation = {};
    navigation.nextlink = $('.pager .next a');
    navigation.prevlink = $('.pager .previous a');
    return navigation;
}

function displayAccordionTarget(id) {
    if (!id) {
        return false;
    }
    try {
        var $accordion = $(id).closest('.accordion');
    } catch (e) {
        var safeId = decodeURI(id);
        var $accordion = $(safeId).closest('.accordion');
    }
    if ($accordion.length) {
        $accordion.find('.panel-heading').first().addClass('active');
        $accordion.find('.panel-body').first().addClass('in').css('height', 'auto');
    }

    let parent = $accordion.parents('.accordion');
    // Recursivly expand parent accordion if one exists
    if (parent.length) {    
        let id = `#${parent[0].id}`;
        displayAccordionTarget(id);
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
                } else {
                    $pre.empty();
                }

                $pre.append(code.value).addClass(code.language);
            });
    });
}

/**
 * Matches a href against a regex
 * @param {string} href href to match
 * @param {RegExp} regex The regular expression to match against
 * @returns {(null|Array)} null or Array with matched urls
 */
function matchHrefWithRegex(href, regex) {
    let hrefdecoded = decodeURI(href);
    if (! hrefdecoded) {
        return false;
    }
    // Certain hosts use "Pretty URLs" which removes the .html extension in the hrefs.
    // This will add the .html back when looking for a match if the href isn't a fragment link.
    const endsWithHTMLorFragment = (hrefdecoded.endsWith('.html') || hrefdecoded.endsWith('.htm') || hrefdecoded.includes('#'));
    if (!endsWithHTMLorFragment) {
        hrefdecoded += '.html';
    }
    return hrefdecoded.match(regex);
}