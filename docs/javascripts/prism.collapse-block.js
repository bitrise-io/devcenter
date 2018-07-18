/**
 * PrismJS Plugin for Collapse code block which height larger than `MAX_CODE_BLOCK_HEIGHT`.
 * Adding class for custom style and toggle status with onclick event.
 */
(function() {
  const MAX_CODE_BLOCK_HEIGHT = 300;
  const CODE_BLOCK_COLLAPSED_CLASS_NAME = 'collpased';
  const OPENED_BLOCK_CLASSNAME = 'open';
  if (
    (typeof self !== 'undefined' && !self.Prism) ||
    (typeof global !== 'undefined' && !global.Prism)
  ) {
    return;
  }
  const toggleCode = event => {
    event.target.className =
      event.target.className.indexOf(OPENED_BLOCK_CLASSNAME) === -1
        ? `${event.target.className} ${OPENED_BLOCK_CLASSNAME}`
        : event.target.className.replace(` ${OPENED_BLOCK_CLASSNAME}`, '');
  };
  Prism.hooks.add('complete', function(env) {
    if (env.element.clientHeight > MAX_CODE_BLOCK_HEIGHT) {
      env.element.className = `${
        env.element.className
      } ${CODE_BLOCK_COLLAPSED_CLASS_NAME}`;
      env.element.onclick = toggleCode;
    }
  });
})();
