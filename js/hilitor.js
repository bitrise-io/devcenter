// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.

function Hilitor(id, tag) {
    
    var targetNode = document.getElementById(id) || document.body;
    var hiliteTag = tag || "EM";
    var skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
    /*var colors =[ "#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];*/
    var colors =[ "#b7dcfb", "#cae7cc", "#beeef4", "#ffc4b3", "#daecc6"];
    
    var wordColor =[];
    var colorIdx = 0;
    var matchRegex = "";
    var openLeft = false;
    var openRight = false;
    
    // characters to strip from start and end of the input string
    var endCharRegex = new RegExp("^[^\\\w]+|[^\\\w]+$", "g");
    
    // characters used to break up the input string into words
    var breakCharRegex = new RegExp("[^\\\w'-]+", "g");
    
    this.setMatchType = function (type) {
        switch (type) {
            case "left":
            this.openLeft = false;
            this.openRight = true;
            break;
            
            case "right":
            this.openLeft = true;
            this.openRight = false;
            break;
            
            case "open":
            this.openLeft = this.openRight = true;
            break;
            
            default:
            this.openLeft = this.openRight = false;
        }
    };
    
    this.setRegex = function (input) {
        input = input.replace(endCharRegex, "");
        input = input.replace(breakCharRegex, "|");
        input = input.replace(/^\||\|$/g, "");
        if (input) {
            var re = "(" + input + ")";
            if (! this.openLeft) re = "\\b" + re;
            if (! this.openRight) re = re + "\\b";
            matchRegex = new RegExp(re, "i");
            return true;
        }
        return false;
    };
    
    this.getRegex = function () {
        var retval = matchRegex.toString();
        retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
        retval = retval.replace(/\|/g, " ");
        return retval;
    };
    
    // recursively apply word highlighting
    this.hiliteWords = function (node) {
        if (node === undefined || ! node) return;
        if (! matchRegex) return;
        if (skipTags.test(node.nodeName)) return;
        
        if (node.hasChildNodes()) {
            for (var i = 0; i < node.childNodes.length; i++)
            this.hiliteWords(node.childNodes[i]);
        }
        if (node.nodeType == 3) {
            // NODE_TEXT
            if ((nv = node.nodeValue) && (regs = matchRegex.exec(nv))) {
                if (! wordColor[regs[0].toLowerCase()]) {
                    wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
                }
                
                var match = document.createElement(hiliteTag);
                match.appendChild(document.createTextNode(regs[0]));
                match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
                match.style.fontStyle = "inherit";
                match.style.color = "#000";
                
                var after = node.splitText(regs.index);
                after.nodeValue = after.nodeValue.substring(regs[0].length);
                node.parentNode.insertBefore(match, after);
            }
        };
    };
    
    // remove highlighting
    this.remove = function () {
        var arr = document.getElementsByTagName(hiliteTag);
        while (arr.length && (el = arr[0])) {
            var parent = el.parentNode;
            parent.replaceChild(el.firstChild, el);
            parent.normalize();
        }
    };
    
    // start highlighting at target node
    this.apply = function (input) {
        this.remove();
        if (input === undefined || ! input) return;
        if (this.setRegex(input)) {
            this.hiliteWords(targetNode);
        }
    };
}