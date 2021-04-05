const svgModule = (function () {
  const allCanvasses = [...window.document.getElementsByTagName("svg")];

  const clearThisElement = (elem) => {
    // eslint-disable-next-line no-param-reassign
    elem.innerHTML = "";
  };

  const clearAllSvgs = () => {
    allCanvasses.forEach((elem) => {
      clearThisElement(elem);
    });
  };

  const utils = {};

  return {
    clearThisElement,
    clearAllSvgs,
    utils
  };
})();

window.app.svgModule = svgModule;
