(function () {
    var url = window.location.href;
    
    if (url.match(/\?contextId/)) {
        /** hide html while new page is loading **/
        $('html').css('visibility','hidden');
        
        var isrootindex = true;
        
        var matcharray = /index-(.*)\.html/.exec(url);
        var language = 'en';
        if (matcharray != null) {
            language = matcharray[1];
            isrootindex = false;
        }
        if (local_csh) {
            var data = mapping;
            mapToHelpTopic(data, isrootindex)
        } else {
            //JS works for all output variants, but keeping the JSON version for backwards compatibility. Read the mapping file:
            var mappingfile = '../js/mapping/' + language + '-' + 'mapping.json';
            
            readTextFile(mappingfile, function (text) {
                var data = JSON.parse(text);
                mapToHelpTopic(data, isrootindex)
            });
        }
    }

    var notFoundTopicAppId = "not_found";

    function mapToHelpTopic(data, isrootindex) {
        var pathname = window.location.href;
        var pathonly = pathname.substring(0, pathname.lastIndexOf("/"));
        var helptopic = "";
        var notfoundtopic = "";
        
        $.urlParam = function (name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            return results[1] || 0;
        }
        
        // www.myhelp.com?contextId=myappid - note, if testing locally you may have to use the full path to the index file,
        //e.g www.myhelp.com/en/index-en.html?contextId=myappid
        $.urlParam('contextId');
        
        for (var i = 0; i < data.map.length; i++) {
            var appid = data.map[i].appid;
            if ($.urlParam('contextId') == appid) {
                helptopic = data.map[i].helptopic;
            }
            if (notFoundTopicAppId == appid) {
                notfoundtopic = data.map[i].helptopic;
            }
        }
        
        if (helptopic == "" && notfoundtopic != "") {
            console.log('Help topic for contextId: "' + $.urlParam('contextId') + '" not found. Redirecting to contextId: "'  +  notFoundTopicAppId +'"');
            helptopic = notfoundtopic;
        }
        
        if (helptopic == "") {
            console.log('This help topic does not exist');
            /** show html **/
            $('html').css('visibility','');
        } else {
            
            //The calling application should specify the language folder, and then
            //the helptopic string sent contains the file extension and everything, including anchor (#) if there
            var newpath = pathonly + '/' + helptopic;
            
            if (isrootindex) {
                newpath = pathonly + '/' + language + '/' + helptopic;
            }
            
            window.location.href = newpath;
        }
    }

    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
})();
