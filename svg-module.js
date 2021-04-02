const svgModule = (function () {
  // // See here for https://stackoverflow.com/questions/15500894/background-color-of-text-in-svg text box
  // const getTextLabel = () => '<text text-anchor="middle" x="50%" y="20">Foo</text>';

  // const getCircleShape = () => '<circle cx="50%" cy="50%" r="50"/>';

  // const drawCircle = (svgElem) => {
  //   // eslint-disable-next-line no-param-reassign
  //   svgElem.innerHTML += `${getTextLabel()}${getCircleShape()}`;
  // };

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

  return {
    clearThisElement,
    clearAllSvgs
  };
})();

window.app.svgModule = svgModule;
