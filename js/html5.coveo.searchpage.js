$(document).on('ready', function () {
    init();
    showSearch($resultcontainer);
    $('.portal-footer .inner.row').hide()
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
            var _this = $(this);
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                if(enterKey === 'select'){
                    //If the user is only using arrow keys to browse results, return false:
                    var isSearch = selectResults(e);
                    if (isSearch === false) {
                        return false;
                    }
                }
                search(e, _this);
            },
            delay);
        });
    }
}

var $resultcontainer;


function addSearch() {

    $resultcontainer = $('.portal-search-result');

}

function search(e, searchfield) {
    showSearch($resultcontainer);
}

function showSearch($resultcontainer) {
    $resultcontainer.show();
    if(enterKey === 'select'){
        $('.searchresults .searchresultitem:first').addClass('selected-searchresultitem');
    }
    $('#topic-content').hide();
}

function hideSearch($resultcontainer) {
    $resultcontainer.hide();
    if ($('.portal-search-result').length) {
        $('footer[data-portal-language="' + portalLanguage + '"]').show();
    }

    $('#topic-content').show();
}

function selectResults(e) {
    //Let the user browse search results by arrow keys and select by Enter (handled in html5-2-mp-common.js).
    let isUpArrow = e.keyCode == '38';
    let isDownArrow = e.keyCode == '40';
    if (! isUpArrow || ! isDownArrow) {
        return true;
    }

    const $selectedResultItem = $('.selected-searchresultitem');
    if (isUpArrow && $selectedResultItem.is(':first-child')) {
        return false;
    }
    if (isDownArrow && $selectedResultItem.is(':last-child')) {
        return false;
    }
    var _this = $('.selected-searchresultitem');
    _this.removeClass('selected-searchresultitem');
    if (isUpArrow) {
        _this.prev().addClass('selected-searchresultitem');
    } else {
        _this.next().addClass('selected-searchresultitem');
    }
    var _new = $('.selected-searchresultitem');
    _new[0].scrollIntoView();
    window.scrollBy(0, -80);
    return false;
}