$(document).ready(function () {
    
    function parseNodes(children) {
        // takes a nodes array and turns it into a <ol>
        var ul = document.createElement("ul");
        for (var i = 0; i < children.length; i++) {
            ul.appendChild(parseNode(children[i]));
        }
        return ul;
    }
    
    function parseNode(node) {
        // takes a node object and turns it into a <li>
        var li = document.createElement("li");
        var a = document.createElement("a");
        li.appendChild(a);
        a.innerHTML = node.text;
        a.className = node.class;
        a.href = node.url;
        if (node.children) {
            var span = document.createElement("span");
            //Only for legacy, new hc output has .site-body
            if ($('.site-body').length === 0) {span.className = 'glyphicon glyphicon-chevron-right';}
            else{span.className = 'glyphicon';}
            
            a.appendChild(span)
            li.appendChild(parseNodes(node.children));
        }
        return li;
    }
    
    var result = parseNodes(toc);
    
    result.setAttribute('class', 'toc nav nav-site-sidebar');
    
    //============
    
    $("#toc-standalone-placeholder").replaceWith(result);
    
    var level = $('#topic-content > .section').attr('data-topic-level');
    
    var prefix = '';
    for (var i = 1; i < level; i++) {
        prefix += '../';
    }
    
    //Select the toc by class instead of id, to use for all styles
    $("ul.toc li a, ul.section-toc li a").each(function (e) {
        var thislink = $(this).attr("href")
        $(this).attr("href", prefix + decodeURI(thislink));
    });
    
    $(document).trigger('toc.ready');
});