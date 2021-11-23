/*
 * Sets a class attribute for active tool pages
 */
function activeToolpage(name) {
	$.each($("#page-tools a"), function(i,e) {
		if($(this).attr("href").lastIndexOf(name) > -1) {
			$(this).find(".tool-label").addClass("active");
		}
	});
}

/*
 * Highlight the toc line that
 * contains the link to the current page
 */
function setActiveTocline() {
    var path = purl().attr("path");

	$.each($("ul.toc a"), function (i, e) {
        var href = decodeURI(this.href);
        var r = new RegExp(path + '$');
        
        if (r.test(href)) {
            $(this).closest(".topic-link").addClass("active");
            return false;
        }
    });
}

/*
 * Append a list of additional links
 * to the main content area
 */
function buildLinkList() {
	var ul = $("<ul></ul>");
	var active_link = $(".toc .topic-link.active:first").next("ul");

	$.each(active_link.children("li"), function(i,e) {
		var a = $("a.topic-link:first", this).clone();
		$(".glyphicon", a).remove();

		var li = $("<li></li>");
		li.append(a);
		ul.append(li);
	});
	if ($("li", ul).size() > 0) {
		var $div = $('<div id="bottom-links-container"></div>'),
			$title = $('<h3 id="additional-links-header">Additional links</h3>');
		
		/*$div.append($title).append(ul).appendTo('#topic-content');*/
		$div.append($title).append(ul).appendTo('.additional-links');
	}
}

function buildSectionToc() {
    if ($(".additional-links").length) {
        buildLinkList();
    } else if ($(".section-toc").length) {
        var links = $(".toc .topic-link.active:first").next("ul");
        
        var linklistitems = links.find("li");
        
        //First check there are actual listitems in the list, otherwise remove the section toc
        if (linklistitems.length == 0) {
            $(".section-toc").remove();
        } else {
            links.clone().appendTo(".section-toc");
            //Make sure the section TOC is displayed even if the main TOC sub topics are collapsed
            $(".section-toc ul").css('display', 'block');
            $(".section-toc").find("span.glyphicon").remove();
        }
    }
}

/*
 * Update the toc navigation. First,
 * hide all siblings to first level
 * toc entries. Sencond, open the branch
 * that contains the current page
 */
function updateNavigation() {
	if ($(document.body).hasClass('single-page')){
		return;
	}

	$(".toc .topic-link + ul").hide();

	var li = $(".toc li");
	var next, prev;
	$.each(li, function(i, e){
		if ($(".topic-link.active").closest("li").get(0) === this) {
			next = $(li.get(i+1)).find(".topic-link:first");
			if (i>0){
				prev = $(li.get(i-1)).find(".topic-link:first");
			}
			return false;
		}
	});
}

/*
 * Add swipe navigation to the app
 */
function addSwipeNavigation() {
	$('#page').on('movestart', function(e) {
		// If the movestart is heading off in an upwards or downwards
		// direction, prevent it so that the browser scrolls normally.
		if ((e.distX > e.distY && e.distX < -e.distY) ||
			(e.distX < e.distY && e.distX > -e.distY)) {
				e.preventDefault();
			}
	});

	/*
	 * Right swipe
	 * Swiping right on mobile devices will fire the click
	 * event on the link to the previous chapter
	 */
	$("#page").on("swiperight", function(){
		if ($(".toc-title a.prev").length > 0) {
			$("#main-content .container:first").effect("drop", {direction: "right"}, function() {
				$(".toc-title a.prev")
					.fadeOut(100)
					.fadeIn(100, function() {
						this.click();
					});
			}).css("width", "auto");
			event.preventDefault();
			return false;
		}
	});

	/*
	 * Left swipe
	 * Swiping left on mobile devices will fire the click
	 * event on the link to the next chapter
	 */
	$("#page").on("swipeleft", function(){
		if ($(".toc-title a.next").length > 0) {
			$("#main-content .container:first").effect("drop", {direction: "left"}, function() {
				$(".toc-title a.next")
					.fadeOut(100)
					.fadeIn(100, function() {
						this.click();
					});
			}).css("width", "auto");
			event.preventDefault();
			return false;
		}
	});
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
                }

                $pre.append(code.value).addClass(code.language);
            });
    });
}

$(document).ready(function(){
	if ( $( "#toc-placeholder > .toc" ).length ) {
        $(document).trigger('toc.ready');
	}
});

$(document).on('toc.ready', function(){
	/*
	 * ========================================
	 * Enable pop overs
	 * ========================================
	 */
	$("[data-toggle=popover]").popover({placement: 'top'});
	
	getEmbedCode();

	/*
	 * Make the next and previous link icons clickable
	 */
	$("#toc-placeholder").on("click", ".topic-link .glyphicon", function(event) {
		$(this).closest(".topic-link").next("ul").toggle();

		if ($(this).is(".glyphicon-chevron-right")) {
			$(this).removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
		}
		else {
			$(this).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
		}
		if (event.preventDefault) {
			event.preventDefault();
		}
		else {
			event.returnValue = false;
		}

		return false;
	});

    setActiveTocline();
    buildSectionToc();
	updateNavigation();
	
    if (useanchorlinks) {
        setAnchors();
    }
    
	//JM: exclude image-viewport from getting the table class. PAL2-3275
	$('#topic-content table:not(.image-viewport)').addClass('table');
	
	/* make the toc navigation sticky */
	if ($.isFunction($.fn.sticky)){
		$("#subheader").sticky({topSpacing:0});
	}

	$.each($(".topic-link.active").parents("li"), function() {
		$(".glyphicon", this).first().trigger("click");
	});

	/*
	 * ========================================
	 *  Swipe navigation
	 * ========================================
	 * Swipe navigation only applies for mobile
	 * devices.
	 */
	if ("orientation" in window){
		addSwipeNavigation();
	}

	/*
	 * ========================================
	 *  Sticky navigation on mobile devices
	 * ========================================
	 * On mobile devices, the main navigation
	 * with the toc and the previous and next page links
	 * is sticky
	 */
	$(window).on("scroll", function() {
		var sticky = $("#subheader-sticky-wrapper").hasClass("is-sticky");
		if (sticky) {
			$("#toc-wrapper").addClass("is-sticky");
		}
		else {
			$("#toc-wrapper").removeClass("is-sticky");
		}
	});

	/*
	 * Clicking on the toc header will cause the
	 * the toc to show or hide. Because the position of the
	 * sticky meny is fixed, the toc meny cannot be fixed too.
	 * Setting the postion to 'fixed' would mean that the
	 * user would not be able to scroll anymore
	 */
	var current_top;
	$("#subheader .toc-title h2").on("click", ".mobile-nav-toggle", function(){
		if (false === $("#toc-wrapper").is(":visible")){
			current_top = $(window).scrollTop();
		}

		$("#toc-wrapper").slideToggle(400, "easeInOutCirc", function() {
			if($(this).is(":visible")) {
				$(".content-container, #pagetools-container, #publication-title, #logotype-container").hide();
				$("html, body")
					.addClass('has-visible-toc')
					.animate({scrollTop: 0}, 250);
			} else {
				$(".content-container, #pagetools-container, #publication-title, #logotype-container").show();
				$("html, body")
					.removeClass('has-visible-toc')
					.animate({scrollTop: current_top}, 250);
			}
		});
	});

	/**
	 * In order for scrollspy to work,
	 * href in the toc must only contain an identifyer
	 */
	$('body.single-page #toc-placeholder > ul.toc').addClass('nav');
	$('body.single-page #toc-placeholder a[href]').each(function(){
		var href = $(this).attr('href'),
			match = href.match(/^index\-[a-z]{2,}\.html(#.+)/);

		if (match && match.length){
			$(this).attr('href', match[1]);
		}
	});

	/**
	 * Add classname to tables
	 */
	$('div.informaltable > table, div.table > table').addClass('table');


	/**
	 * Calculate the offset for the toc affix
	 * offset. Because the page header height
	 * is not fixed but is dependent on the
	 * page header image
	 */
	$(window).one('load', function(){
		/**
		 * Title affix for single page output
		 */
		if ($('body.single-page').length && $('#toc-placeholder').data('bs.affix')){
			var offset = $('.bt-header:has(#logotype-container)').outerHeight(true);
			offset += $('.container.page-title-container').outerHeight(true);
			offset -= 20;

			/**
			 * The offset property on the options object
			 * is actually a object. Setting this to a single
			 * value breaks affix.
			 * @type {Object}
			 */
			$('#toc-placeholder').data('bs.affix').options.offset = {top: offset};
			$(window).trigger('scroll');
		}
	});

	/**
	 * Refresh affix when user resizes
	 * the window
	 */
	$(window).on('resize', function(){
		$('[data-spy="affix"]:visible').affix('checkPosition');
	});

	/**
	 * Turn on syntax highlight if the hljs lib is available
	 */
	if ("hljs" in window) {
		$('pre').each(function(i, block) {
			hljs.highlightBlock(block);
		});
	}
	
	/*Adjust prev/next navigation to only include the proper ones in TOC:*/
	chunkedPrevNext();
});

/*ASN: This function adjusts the prev/next navigation links. Only includes properly chunked topics. Same if setting Only chunked topics
  not set in LE. */
function chunkedPrevNext(){
    var toc = $('.toc').first();
    var links = toc.find('a').filter(function () {
        return this.href.match(/.*\.html?$/);
    });
    
    
    var nextlink = $('#header-navigation-next');
    var prevlink = $('#header-navigation-prev');
    
    var next = '';
    var prev = '';
    
    /*ASN: Looping the toc to create correct prev/next navigation corresponding to toc options.*/
    for (var index = 0; index < links.length; index++) {
        var minusone = links[index - 1];
        var plusone = links[index + 1];
        if (typeof minusone !== "undefined") {
            if (minusone.classList.contains('active')) {
                var jqueryObj = $(links[index]);
                next = jqueryObj.attr('href');
                nextlink.attr('href', next);
            }
        }
        
        if (typeof plusone !== "undefined") {
            if (plusone.classList.contains('active')) {
                var jqueryObj = $(links[index]);
                prev = jqueryObj.attr('href');
                prevlink.attr('href', prev);
            }
        }
    };
    
    
    if (next == '') {
        nextlink.remove();
    }
}

//ASN: Toggling active class for accordions when clicked
window.onload = function () {
    var acc = document.getElementsByClassName("panel-heading");
    var i;
    
    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function () {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");
            
            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        }
    }
}
