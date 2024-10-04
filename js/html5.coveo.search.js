$(document).on('ready', function () {
    init();
    if (window.location.hash) {
        showSearch($resultcontainer);
    }
});

$(document).ajaxComplete(function() {
  init();
});

function init(){

    addSearch();

    var timeout;
    var delay = 200;

    if(enterKey !== 'search'){
        //Unbind the keyup and focus events so we can select a new index for fuse for portal page:
        $('input',$('atomic-search-box')[0].shadowRoot).off('keyup focus');

        //on keydown, clear the countdown for the keypress search delay
        $('input',$('atomic-search-box')[0].shadowRoot).on('keydown', function () {
            clearTimeout(timeout);
        });

        $('atomic-search-box').on('keyup focus', function (e) {
            if (! $('input',$('atomic-search-box')[0].shadowRoot).val()) {
                return false;
            }
            var _this = $(this);
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                    //If the user is only using arrow keys to browse results, return false:
                if (enterKey === 'select' && selectResults(e) === false) {
                        return false;
                }
                search(e, _this);
            },
            delay);
        });
    }
}

var $resultcontainer;
var $copyrightcontainer;


function addSearch() {

    $copyrightcontainer = $('.copyright').parent();

    //For legacy, where the search container is not already there
    if ($("*[data-portal-language]").length) {
        $resultcontainer = $("*[data-portal-language='" + portalLanguage + "'] .portal-search-result");
    } else {
        $resultcontainer = $('.search-container');
    }

    $('.portal-content, .site-content').click(function (e) {
        var atomicComponents = ["atomic-breadbox",
        "atomic-search-box",
        "atomic-facet",
        "atomic-facet-manager",
        "atomic-layout-section",
        "atomic-no-results",
        "atomic-quickview",
        "atomic-result-link",
        "atomic-result-section-excerpt",
        "atomic-result-section-title",
        "atomic-result-template",
        "atomic-result-text",
        "atomic-search-interface",
        "atomic-search-layout",
        "atomic-sort-dropdown",
        "atomic-sort-expression"];
        if(atomicComponents.indexOf(e.target.nodeName.toLocaleLowerCase()) === -1){
            if($(e.target).closest('.toolbar').length === 0){
                hideSearch($resultcontainer);
            }
        }
    });

}

function search(e, searchfield) {
    showSearch($resultcontainer);
}

function showSearch($resultcontainer) {
    $resultcontainer.show();
    $copyrightcontainer.hide();
    if(enterKey === 'select'){
        $('.searchresults .searchresultitem:first').addClass('selected-searchresultitem');
    }
    $('#topic-content').hide();
}

function hideSearch($resultcontainer) {
    $resultcontainer.hide();
    $copyrightcontainer.show();
    if ($('.portal-search-result').length) {
        $('footer[data-portal-language="' + portalLanguage + '"]').show();
    }

    $('#topic-content').show();
}

function selectResults(e) {
    //Let the user browse search results by arrow keys and select by Enter (handled in html5-2-mp-common.js).
    if (e.keyCode == '38') {
        if ($('.selected-searchresultitem').is(':first-child')) {
            return false;
        }
        var _this = $('.selected-searchresultitem');
        _this.removeClass('selected-searchresultitem');
        _this.prev().addClass('selected-searchresultitem');
        var _new = $('.selected-searchresultitem');
        if (_new.index() <= 1) {
            $(window).scrollTop(0);
        } else {
            _new[0].scrollIntoView();
            window.scrollBy(0, -80);
        }
        return false;
    } else if (e.keyCode == '40') {
        if ($('.selected-searchresultitem').is(':last-child')) {
            return false;
        }
        var _this = $('.selected-searchresultitem');
        _this.removeClass('selected-searchresultitem');
        _this.next().addClass('selected-searchresultitem');
        var _new = $('.selected-searchresultitem');
        if (_new.index() > 1) {
            _new[0].scrollIntoView();
            window.scrollBy(0, -80);
        }

        return false;
    }
    return true;
}