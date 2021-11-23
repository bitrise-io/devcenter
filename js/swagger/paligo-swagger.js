$(document).on('toc.ready', function () {
    //openapiurl is set by user in the topic link
    var links =[];
    var apimenu = document.createElement("ul");
    
    loadfile(openapiurl);
    
    function loadfile(openapiurl) {
        var extension = openapiurl.substr((openapiurl.lastIndexOf('.') + 1));
        if (/(yml|yaml)$/ig.test(extension)) {
            YAML.load(openapiurl, function (data) {
                getdata(data);
            });
        } else if (/(json)$/ig.test(extension)) {
            $.getJSON(openapiurl, function (data) {
                getdata(data);
            });
        }
        else{
            console.log('Unsupported Swagger URL file extension');
        }
    }
    
    function getdata(data){
        if (typeof data.tags !== 'undefined') {
            $.each(data.tags, function (key, val) {
                links.push(val.name);
            });
        }
        getlinks();
    }
    
    function getlinks() {
        if (links.length === 0) {
            when_external_loaded (function () {
                $('.opblock-tag').each(function () {
                    links.push($(this).text());
                });
                loadmenu();
            });
        } else {
            loadmenu();
        }
    }
    
    function loadmenu() {
        
        $.each(links, function (i, name) {
            var menuitem = document.createElement("li");
            var link = document.createElement("a");
            link.setAttribute("class", "topic-link swagger-subnav");
            var href = "#" + "operations-tag-" + name;
            link.setAttribute("href", href);
            link.innerHTML = name;
            menuitem.append(link);
            apimenu.append(menuitem);
        });
        $('ul.nav-site-sidebar .swagger-topic').parent().append(apimenu);
    }
    
    function when_external_loaded (callback) {
        /* Workaround for lack of onComplete event in Swagger: Have to check that it's more than 1 here */
        if ($('.opblock-tag').length < 1) {
            setTimeout (function () {
                when_external_loaded (callback);
            },
            200);
            // wait 200 ms
        } else {
            callback ();
        }
    }
});