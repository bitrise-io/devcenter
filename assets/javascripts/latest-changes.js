function sortArticles() {
    var alphabeticallyOrderedDivs = $('.changelog-content').sort(function(a, b) {
      var $aTitle = $(a).find('.changelog-content-title'), $bTitle = $(b).find('.changelog-content-title');
      return String.prototype.localeCompare.call($bTitle.text().toLowerCase(), $aTitle.text().toLowerCase());
    });
  
    var container = $(".changelog-container");
    var containerTitle = $(".changelog-container-title");
    container.detach().empty().prepend(containerTitle).append(alphabeticallyOrderedDivs);
    $('main').append(container);
  }
  
  sortArticles();