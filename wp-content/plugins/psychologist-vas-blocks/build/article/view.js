/******/ (() => { // webpackBootstrap
/*!*****************************!*\
  !*** ./src/article/view.js ***!
  \*****************************/
function initArticleGlightbox() {
  if (typeof GLightbox === 'undefined') {
    return;
  }
  if (!document.querySelector('[class*="glightbox"]')) {
    return;
  }
  const selectors = new Set();
  document.querySelectorAll('[class*="glightbox"]').forEach(el => {
    el.classList.forEach(className => {
      if (/^glightbox\d+$/.test(className)) {
        selectors.add('.' + className);
      }
    });
  });
  selectors.forEach(selector => {
    GLightbox({
      selector
    });
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initArticleGlightbox);
} else {
  initArticleGlightbox();
}
/******/ })()
;
//# sourceMappingURL=view.js.map