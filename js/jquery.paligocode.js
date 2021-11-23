(function ($) {

  $.fn.paligocode = function (options) {

    // This is the easiest way to have default options.
    const settings = $.extend({
      // These are the defaults.
      top: 0,
      right: 0,
      icon: '<i class="fa fa-clipboard small" aria-hidden="true"></i>',
      iconDone: '<i class="fa fa-check small" aria-hidden="true"></i>',
      title: 'Copy to clipboard',
      titleDone: 'Copied',
      doneDelay: 1000,
    }, options);

    // Copy to clipboard handler
    const copyToClipboard = ($el) => {
      const code = $el.get(0);
      if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
      } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        console.warn('Could not select text in node: Unsupported browser.');
      }
      document.execCommand('copy');
    };

    const markButtonDone = (b) => {
      b.innerHTML = settings.titleDone + '&nbsp;' + settings.iconDone;
      b.setAttribute('title', settings.titleDone);
      setTimeout(() => {
        b.innerHTML = settings.icon;
        b.setAttribute('title', settings.title);
      }, settings.doneDelay);
    };

    this.each((idx, el) => {
      const $el = $(el);
      // Wrapper
      $el.wrap('<div class="paligocode-wrapper"></div>');
      $el.closest('.paligocode-wrapper')
        .css('position', 'relative');

      // Button
      const btn = document.createElement('button');
      btn.innerHTML = settings.icon;
      btn.classList.add('btn', 'btn-xs', 'btn-primary');
      btn.style.position = 'absolute';
      btn.style.top = settings.top;
      btn.style.right = settings.right;
      btn.setAttribute('title', settings.title);
      btn.onclick = () => {
        copyToClipboard($el);
        markButtonDone(btn);
      };

      $el.after(btn);
    });

    return this;
  };

}(jQuery));

$(document)
  .ready(function () {
    $('.programlisting')
      .paligocode();
  });
