/*var urlParams = new URLSearchParams(window.location.search);
var lang = urlParams.get('lang');
if (lang !== null) {
    portalLanguage = lang;
}*/

//IE/Edge doesn't support URLSearchParams, so use this function:
var lang = getQueryVariable("lang");
if (lang) {
    portalLanguage = lang;
}

$(document).ready(function () {
    
    //Only show the current language
    showCurrentLanguage(portalLanguage);
    $("*[data-portal-language='" + portalLanguage + "'] .dropup.languages .dropdown-toggle").html($('*[data-portal-language="' + portalLanguage + '"] .language-item[lang="' + portalLanguage + '"]').text() + ' <b class="caret"></b>');
    
    $(".language-item").click(function (e) {
        e.preventDefault();
        portalLanguage = $(this).attr('lang');
        $("*[data-portal-language='" + portalLanguage + "'] .dropup.languages .dropdown-toggle").html($(this).text() + ' <b class="caret"></b>');
        showCurrentLanguage(portalLanguage);
        addSearch();
    });
    
    $(".category-more-toc").click(function (e) {
        e.preventDefault();
        $("*[data-portal-language='" + portalLanguage + "'] .portal-single-publication:not(:lt(" + categoriesShown + "))").toggle();
        $(this).find('.toggle-label').toggle();
    });
    
    //Show/hide more toc entries for featured contents section
    $(".more-toc").prev("ul").find("> li:not(:lt(" + shown + "))").hide();
    $(".more-toc").click(function (e) {
        e.preventDefault();
        var ul = $(this).prev("ul");
        ul.find("> li:not(:lt(" + shown + "))").toggle();
        //Featured sub topics show/hide
        $(this).find('.toggle-label').toggle();
    });
    
    $("input.search-field").focus();
});

function initChecklist(){
    //Not used for portal
}

function showCurrentLanguage(portalLanguage) {
    $("*[data-portal-language]").hide();
    var $portal_content = $('.portal-content');
    $portal_content.hide();
    if ($portal_content.length === 1) {$portal_content.show();}
    $("*[data-portal-language='" + portalLanguage + "']").closest('.portal-content').addBack().show();
    //Show/hide more category panels, only for the current language
    $("*[data-portal-language='" + portalLanguage + "'] .portal-single-publication:not(:lt(" + categoriesShown + "))").hide();
    var pageUrl = '?lang=' + portalLanguage;

    // add query params to url
    var queryParams = getQueryVariables();
    delete queryParams['lang'];
    var queryParamsString = getQueryVariableString(queryParams);

    if (queryParamsString.length) {
        pageUrl = pageUrl + "&" + queryParamsString;
    }
   
    var pageTitle = languageTitleMap[portalLanguage];
    if (pageTitle) {$("html head title").text(pageTitle);}
    window.history.replaceState('', '', pageUrl);
}

function getQueryVariable(variable)
{
    var vars = getQueryVariables();
    return vars[variable];
}

function getQueryVariables()
{
    var queryString = window.location.search.substring(1);
    var varsString = queryString.split("&");
    var vars = {};

    for (var i = 0; i < varsString.length; i++) {
        var pair = varsString[i].split("=");
        vars[pair[0]] = pair[1];
    }
    
    return vars;
}

function getQueryVariableString(queryParams)
{
    var parameters = [];

    for (var key in queryParams) {
        if (queryParams[key] !== undefined) {
            parameters.push(encodeURI(key + '=' + queryParams[key]));
        }
    }

    return parameters.join('&');
}
