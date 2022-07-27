//index and store variables created in the data.js file from xslt, either as an arry if multiple languages to support portal, or just index for legacy
$(document).on('search.ready', function () {
    addSearch();
    //Disable, only keyup used
    $(".portal-search .btn").prop("disabled", true);
});

var searchHighlighter;

function showSearch($resultcontainer){
    $resultcontainer.show();
    $('#topic-content').hide();
}

function hideSearch($resultcontainer){
    $resultcontainer.hide();
    if ($('.portal-search-result').length) {
        $('footer[data-portal-language="' + portalLanguage + '"]').show();
    }
    $('.noresults').hide();
    $('#topic-content').show();
}

function addSearch() {
    
    //For legacy HTML5:
    if ($('ul#page-tools').length) {
        $('ul#page-tools > li:first').html('<input placeholder="Search" type="text" class="form-control" id="search">');
    } else {
        //For new HTML5: Only adds to the search field actually used in the current page
        $('.portal-search .search-field, .navbar-form .search-field, .site-sidebar-search .search-field, .tool-search-form .search-field').attr('id', 'search');
    }
    
    //Unbind all events, if run multiple times
    $('#search-container a').off();
    
    var $resultcontainer;
    
    //For legacy, where the search container is not already there
    if ($('.search-container').length == 0) {
        $resultcontainer = $('<div id="search-container"><h2>Search results</h2><ul class="searchresults"></ul></div>');
        $resultcontainer.appendTo($('#content-wrapper'));
    } else {
        if ($("*[data-portal-language]").length) {
            $resultcontainer = $("*[data-portal-language='" + portalLanguage + "'] .portal-search-result");
        } else {
            $resultcontainer = $('.search-container');
        }
    }
    
    //Make sure it has the id, even if it's for 'preloaded' variant
    $resultcontainer.attr('id', 'search-container');
        
    searchHighlighter = new Mark("ul.searchresults");
    
    $("#search-container a").click(function () {
        hideSearch($resultcontainer)
    });
    
    $resultcontainer.click(function () {
        hideSearch($resultcontainer);
    });
    
    $('.portal-content, .site-content').click(function (){
        hideSearch($resultcontainer);
    });
    
    hideSearch($resultcontainer)
    
    var storelocal;
    
    var $ul = $('ul.searchresults', $resultcontainer);
    
    //Unbind the keyup so we can select a new index for portal page:
    $('input#search').off('keyup');
    
    if (typeof portalLanguage !== "undefined") {
        index = indexDict[portalLanguage];
        storelocal = store[portalLanguage];
    } 
    else{
        storelocal = store[contentLanguage];
    }
    
    // Handle search
    $('input#search').on('keyup', function () {
        // Get query
        var query = $(this).val();
        // Search for it
        var result = index.search(query);
        // Output it
        if (result.length === 0) {
            hideSearch($resultcontainer)
        } else {
            // Show results
            $ul.empty();
            $('.noresults').hide();
            if ($('.portal-search-result').length) {
                $('footer[data-portal-language="' + portalLanguage + '"]').hide();
            }
            for (var item in result) {
                
                //For permalinks: data-topic-level will only be set if produce.permalink = 1 in XSLT
                var topiclevel = $('section[data-topic-level]').first().attr('data-topic-level');
                var up = '';
                
                if (topiclevel != '') {
                    for (i = 1; i < parseInt(topiclevel);
                    i++) {
                        up += '../';
                    }
                }
                
                
                var ref = result[item].ref;
                
                var url = up + storelocal[ref].href;
                
                var pathdisplay = '';
                var breadcrumbs = storelocal[ref].breadcrumbs;
                if(typeof breadcrumbs !== "undefined"){
                    pathdisplay = '<p class="search-result-breadcrumbs">' + breadcrumbs + '</p>';
                }
                else{
                    pathdisplay = '<p class="search-result-url">' + url + '</p>';
                }
                
                //If this is the portal/index page:
                if ($('.portal-search-result').length) {
                    url = portalLanguage + '/' + storelocal[ref].href;
                }
                
                var videosearchicon = ''; //NA for this search

                if (storelocal[ref].snippet !== '') {
                    var $li = $('<li></li>')
                        .addClass('searchresultitem');

                    var $a = $('<a></a>')
                        .attr('href', url);

                    var $h3 = $('<h3></h3>')
                        .addClass('searchresulttitle')
                        .html(storelocal[ref].title + videosearchicon);

                    var $p = $('<p></p>')
                        .addClass('searchresultsnippet')
                        .text(storelocal[ref].snippet);

                    $a
                        .append($h3)
                        .append($p)
                        .append(pathdisplay)
                        .appendTo($li);
                } else {
                    var $li = $('<li></li>')
                        .addClass('searchresultitem-nosnippet');

                    var $a = $('<a></a>')
                        .attr('href', url)
                        .text(storelocal[ref].title);

                    $li.append($a);
                }
                
                $ul.append($li);
            }
            showSearch($resultcontainer)
                                    
            searchHighlighter.mark(query, {            
                "className": "search-highlight"
            });
        }
    });
    
    //Unbind first
    $("#search-container").off();
    
    //Show target search result, even if the same as current topic
    $("#search-container").on("click", hideSearch($resultcontainer));
}
