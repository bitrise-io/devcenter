/* JS file for API style output */

/* JS initialize for language dropdown menu */
var contentBar = $('.nav-code-selection'),
dropdown = $('.dropdown-content'),
more = $('a.grouped-link'),
dropselect = $('.dropselect'),
selected = '';
/* End: JS initialize for language dropdown menu */

/**
 * @type {object}
 */

jQuery(document).ready(function($){
    /**
     * @type {object}
     */
    var $toc = $('#toc-container .affix');

    /*ASN: Support for API style even if you just have one programming language, in which case the language switcher becomes superfluous:*/
    if ($("#nav-code-selection li").length < 2){
        $("#nav-code-selection").addClass('nav-code-selection-hidden');
        $(".entry-code .code").removeClass('code');
    }

    /*ASN: Also, if no code switcher is desired, because the code samples are mixed languages, but should appear always:*/
    if ($("#nav-code-selection").hasClass('nav-code-selection-hidden')){
        $(".entry-code .code").removeClass('code');
    }

    /**
     * @type {object}
     */
    var $toc_container = $('#toc-container');

    /**
     * Recalculates the toc contatiner width
     * @type {function}
     */
    var recalulateTocContainer = function(){
        var width = $toc_container.width();
        $toc.css('width', width);
        $toc_container.removeAttr('style');
    };

    /**
     * Recalculation timer
     * @type {int}
     */
    var recalulateTocTimer;

    $(window)
        .on('resize', function(){
            if ( $(this).width() > 991 ) {
                $toc_container.css('opacity', '0.15');

                clearTimeout(recalulateTocTimer);
                recalulateTocTimer = setTimeout(recalulateTocContainer, 250);
            } else {
                $toc.removeAttr('style');
            }
        })
        .trigger('resize');

    /**
     * Toggle toc on small screens
     */
    $('#toc-icon a').on('click', function(){
        $('#toc-placeholder.nav-sidebar,body').toggleClass('toc-overlay');
    });

    $('#toc-placeholder a, #toc-placeholder .close').on('click', function(){
        if ($('#toc-placeholder').hasClass('toc-overlay')) {
            $('#toc-icon a').trigger('click');
            return true;
        }
    });

    /**
     * Code-view selection
     */
    $( "#nav-code-selection a" ).click(function(e) {
        /**
         * Clicked element
         * @type {object}
         */
        var $this = $(this);

        /**
         * @type {object}
         */
        var $parent = $this.parent().addClass('active');

        /**
         * The nav
         * @type {object}
         */
        $this.closest('.nav')
            .find('.active')
            .not($parent)
            .removeClass('active');

        /**
         * Coding language
         * @type {string}
         */
        var language = $this.data( "code" );

/*Needs to be explicit to not match regular code elements*/
        $( ".code[data-code-view]" ).hide();
        /*$( "*[data-code-view='" + $this.data( "code" ) + "']" ).fadeIn(50);*/

        /*ASN: Match any language in the data-code-view attribute that matches
        either start of string or semicolon followed by language name and then semicolon or end of string.
        This makes it more complex than before, but supports multiple filter values on an element. */
        var regex = new RegExp("(^|;)" + language + "(;|$)", "g");

        $('*[data-code-view]')
        .filter(function() {
            return $(this).attr('data-code-view').match(regex);
        })
        .fadeIn(50);
        $(window).trigger('scroll');

        return e.preventDefault();
    });
    $( "#nav-code-selection a:first" ).click();


/* JS for language dropdown menu */

var contentBar = $('.nav-code-selection'),
dropdown = $('.dropdown-content'),
more = $('a.grouped-link'),
dropselect = $('.dropselect'),
selected = '';

$(window).resize(update);

/*  Opens dropdown menu */
more.click(function () {
    dropdown.slideToggle(200);
});

/*  Closes dropdown menu when click outside */
$(document).click(function(event) { 
  var $target = $(event.target);
  if(!$target.closest('.grouped-link').length && 
  dropdown.height() > 1) {
    dropdown.slideUp(200);
  }        
});

contentBar.on('click', 'li.item-link', function () {
    linkClick.call(this, '⋮')
});
dropdown.on('click', 'li.item-link', function () {
    linkClickDropdown.call(this, '⋮')
});
update();
    
    
    function linkClick(val) {
      contentBar.children().removeClass('active');
      dropdown.children().removeClass('active');
      this.classList.add("active");
      selected = this.innerHTML;
      more.html(val || selected)[val ? 'removeClass' : 'addClass']('active');
      dropdown.slideUp(200);
      dropselect.text("");
      dropselect.css("display","none");      
    }
    function linkClickDropdown(val) {
      contentBar.children().removeClass('active');
      dropdown.children().removeClass('active');
      this.classList.add("active");
      selected = this.innerHTML;
      more.html(val || selected)[val ? 'removeClass' : 'addClass']('active');
      dropdown.slideUp(200);
      var $this = $(this);
      dropselect.text($this.text());
      dropselect.css("display","");
      showcode.call(this);
    }
    
    function update() {
      var offsetLeft = more.offset().left + 17;
      var hiddenitems = 0
      dropdown.empty();
      contentBar.children().each(function(i, a) {
      // populates more-dropdown if menu item is overflowed
      $(a).css("visibility", "visible");
        var $linkleft = $(a).offset().left;
        var $linkwidthraw = $(a).css("width");
        var $linkwidth=$linkwidthraw.replace("px","");
        var $linkright = +$linkleft + +$linkwidth;
        if ($linkright > offsetLeft) {
          if (a.innerHTML == selected) {
            a.classList.add("active");
            //more.html(a.innerHTML).addClass('active');
          }
          dropdown.append($(a).clone());
          $(a).css("visibility", "hidden"); // hide menu item if partly overflowed
          hiddenitems=hiddenitems + 1;
        } else if (a.innerHTML == more.html()) {
          more.html('&#8942;').removeClass('active');
          return false;
        }
      })
      if (hiddenitems > 0){
        $('.dropdown').css("visibility", "visible"); // Show More dropdown only if there are overflown menu items
      }
      else{
       $('.dropdown').css("visibility", "hidden");
      }
    }
    
    function showcode(){
        // Shows selected code. (Copy of $( "#nav-code-selection a" ).click(function(e) but modified for dropdown menu) 
        var $this = $(this.firstChild);  // this is the clicked li-item, the function uses its child a-element as this
        var $parent = $this.parent().addClass('active');
        $this.closest('.nav')
            .find('.active')
            .not($parent)
            .removeClass('active');
        var language = $this.data( "code" );
        /*Needs to be explicit to not match regular code elements*/
        $( ".code[data-code-view]" ).hide();
        /*$( "*[data-code-view='" + $this.data( "code" ) + "']" ).fadeIn(50);*/
        var regex = new RegExp("(^|;)" + language + "(;|$)", "g");
    
        $('*[data-code-view]')
        .filter(function() {
            return $(this).attr('data-code-view').match(regex);
        })
        .fadeIn(50);
        $(window).trigger('scroll');
    }
    /* End: JS for language dropdown menu */
});