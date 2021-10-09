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
