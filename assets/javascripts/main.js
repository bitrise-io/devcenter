function linkify() {
  var images = document.getElementsByTagName('img');
  function makeLink(image) {
    image.outerHTML =
      '<a target="_blank" data-lightbox="on" href="' +
      image.src +
      '">' +
      image.outerHTML +
      '</a>';
  }
  for (var i = 1, l = images.length; i < l - 1; ++i) {
    var img = images[i];
    if (!img.hasAttribute('data-no-linkify')) {
      makeLink(img);
    }
  }
}

linkify();

var lightboxTriggers = document.querySelectorAll('[data-lightbox]');
Array.from(lightboxTriggers).forEach(function (link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    basicLightbox.create('<img src="' + e.currentTarget.href + '"/>').show();
  });
});

function collapseProcedures() {
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}

collapseProcedures();

function clearSearchField() {
  document.getElementById('search-input').value = "";
}

var langMatch = location.pathname.match(/^\/(\w{2})(?:\/|\z)/);
var lang = langMatch && langMatch[1];
var indexKey = 'devcenter' + ( lang ? '-' + lang : '');

var client = algoliasearch('HI1538U2K4', 'f817c83dbdb923d880c215c9380d1107');
var index = client.initIndex(indexKey);

autocomplete(
  '#search-input',
  {
    hint: false
  },
  {
    source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
    displayKey: 'title',
    templates: {
      suggestion: function(suggestion) {
        var contentMatch = '';
        var heading = '';

        if( suggestion.headings.length){
          heading =  [
            '<span class="aa-suggestion-heading"> &bull; ',
            suggestion.headings[0],
            '</span>'
          ].join('');
        }

        if (suggestion._snippetResult.content.matchLevel !== 'none') {
          contentMatch = [
            '<div class="aa-suggestion-content">',
            suggestion._snippetResult.content.value,
            '</div>'
          ].join('');
        }

        return [
          '<div class="aa-suggestion-title">',
          suggestion._highlightResult.title.value,
          heading,
          '</div>',
          contentMatch
        ].join('');
      }
    }
  }
).on('autocomplete:selected', function(event, suggestion, dataset) {
  var url = suggestion.url;

  if(suggestion.anchor) {
    url += '#' + suggestion.anchor;
  }

  location.href = url;
});;

function configureSideMenu() {
  var currentPage = window.location.href;
  var menuOpeners = document.querySelectorAll('[class^=menu-list-opener]');

  function menuParent(el) {
    el.parentElement.parentElement.previousElementSibling.classList.toggle(
      'open',
      true
    );
  }

  function menuListOpener() {
    for (i = 0; i < menuOpeners.length; i++) {
      if (menuOpeners[i].href == currentPage) {
        menuOpeners[i].classList.toggle('open');
      }
      if (
        menuOpeners[i].href == currentPage &&
        menuOpeners[i].classList.contains('menu-list-opener')
      ) {
        menuParent(menuOpeners[i]);
      }
    }
  }
  menuListOpener();

  function menuItemOpener() {
    var menuItems = document.querySelectorAll('.menu-link');

    for (i = 0; i < menuItems.length; i++) {
      var menuItemParent =
        menuItems[i].parentElement.parentElement.previousElementSibling;
      if (menuItems[i].href == currentPage) {
        if (menuItemParent.classList.contains('menu-list-opener')) {
          menuItems[i].classList.toggle('current', true),
            menuParent(menuItems[i]),
            menuParent(menuItemParent);
        } else {
          menuItems[i].classList.toggle('current', true),
            menuParent(menuItems[i]);
        }
      }
    }
  }
  menuItemOpener();
}

function toggleSideBar() {
  var sideMenu = document.getElementById('side-menu');
  sideMenu.classList.toggle('open');
}

configureSideMenu();

function collapseLongCodeBlocks() {
  var codeBlockCodeElements = document.querySelectorAll('main.content pre code');

  for (var i = 0; i < codeBlockCodeElements.length; i++) {
    var codeBlock = codeBlockCodeElements[i].parentNode;

    if (codeBlock.clientHeight > 300) {
      codeBlock.classList.add('collapseable');
      collapseCodeBlock(codeBlock);
    }
  }
}

function collapseCodeBlock(codeBlock) {
  var collapserButton = document.createElement('button');
  collapserButton.classList.add('collapser');
  collapserButton.setAttribute('onclick', 'toggleCodeBlockCollapsing(event)');
  codeBlock.appendChild(collapserButton);
  codeBlock.classList.add('collapsed');
}

function toggleCodeBlockCollapsing(event) {
  var collapserButton = event.target;
  var codeBlock = collapserButton.parentNode;

  codeBlock.classList.toggle('collapsed');
}

collapseLongCodeBlocks();

function getText(changeContent) {
  return changeContent.textContent || changeContent.innerText || ''
}

function sortElements(nodeList) {
  if (!nodeList || !nodeList.length) {
    return;
  }
  var node,
    parentNode = nodeList[0].parentNode

  function sortEls(a, b) {
    var aText = getText(a);
    var bText = getText(b);
    return aText == bText ? 0 : bText < aText ? -1 : 1
  }

  var a = [],
    i = nodeList.length;
  while (i--) {
    a[i] = parentNode.removeChild(nodeList[i]);
  }

  a.sort(sortEls);

  i = 0
  while ((node = a[i++])) {
    parentNode.appendChild(node);
  }
}

sortElements(document.querySelectorAll('.changelog-content'));
