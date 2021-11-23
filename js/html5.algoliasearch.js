$(document).ready(function () {
    addSearch();
});

function addSearch() {
    $("#aa-search-input").keyup(function () {
        var input = $(this);
        
        if (input.val() == "") {
            $('.overlay').hide();
        }
    });
    
    //For permalinks: data-topic-level will only be set if produce.permalink = 1 in XSLT
    var topiclevel = $('section[data-topic-level]').first().attr('data-topic-level');
    var up = '';
    
    if (topiclevel != '') {
        for (i = 1; i < parseInt(topiclevel);
        i++) {
            up += '../';
        }
    }
    
    //If this is the portal/index page:
    if ($('.portal-search-result').length) {
        up = portalLanguage + '/';

        //If the customer has specified a custom index there will be no language mappings. If so use the existing publication_id.
        publication_id = publication_langs_id[portalLanguage] ? publication_langs_id[portalLanguage] : publication_id;
    }
    
    var client = algoliasearch(algolia_application_id, algolia_search_only_api_key);
    var index = client.initIndex(publication_id);
    //initialize autocomplete on search input (ID selector must match)
    $("[data-portal-language='" + portalLanguage + "'] #aa-search-input, .site-body #aa-search-input, .site-header #aa-search-input").autocomplete({
        hint: false,
        autoselect: true
    },[ {
        source: $.fn.autocomplete.sources.hits(index, {
            /*The users can set this in the Algolia dashboard instead.*/
            /*hitsPerPage: 5*/
        }),
        //value to be displayed in input control after user's suggestion selection
        displayKey: 'title',
        //hash of templates used when rendering dataset
        templates: {
            //'suggestion' templating function used to render a single suggestion
            suggestion: function (suggestion) {
                var body = suggestion._highlightResult.body.value;

                // Escape tags
                body = body.replace(/\<em\>/g, '[PALIGO-EM-REPLACEMENT-FIX-1]');
                body = body.replace(/\<\/em\>/g, '[PALIGO-EM-REPLACEMENT-FIX-2]');
                body = body.replace(/\</g, '&lt;');
                body = body.replace(/\>/g, '&gt;');
                body = body.replace(/\[PALIGO-EM-REPLACEMENT-FIX-1\]/g, '<em>');
                body = body.replace(/\[PALIGO-EM-REPLACEMENT-FIX-2\]/g, '</em>');

                var html = '<a href="' + up + suggestion.url + '"><div class="aa-search-title">' +
                suggestion._highlightResult.title.value + '</div><div class="aa-search-body">' +
                body + '</div></a>';

                return html;
            }
        }
    }]).on('autocomplete:shown', function (event, suggestion, dataset) {
        $('.overlay').show();
    }).on('autocomplete:closed', function (event, suggestion, dataset) {
        $('.overlay').hide();
    }).on('autocomplete:selected', function (dataset, suggestion) {
        location.href = up + suggestion.url;
        //Note: Important to prepend the up path.
    });
}