const utilsSVGTextLabels = (function () {
  // See here for https://stackoverflow.com/questions/15500894/background-color-of-text-in-svg text box
  const textElemFromText = (text) => {
    // `<text text-anchor="middle" x="50%" y="20">${text}</text>`;
    var xmlns = "http://www.w3.org/2000/svg";
    const x = window.document.createElementNS(xmlns, 'text');
    return x;

  };

  const getSVGShapeTarget = (inputElem) => {
    // query DOM
    console.log(inputElem.attributes.id.value);
    const inputElemIdentififer = inputElem.attributes.id.value.split("_")[0];
    window.document
      .querySelectorAll(`[data-identifier*="${inputElemIdentififer}"]`)
      .forEach((shape) => {
        shape.classList.add("changing");
      });
    return textElemFromText(inputElem.value);
  };

  const addSVGTextElemFromInputElem = (inputElem) => {
    const SVGTextElement = getSVGShapeTarget(inputElem);
    const inputElemIdentififer = inputElem.attributes.id.value.split("_")[0];
    window.document
      .querySelectorAll(`[data-identifier*="${inputElemIdentififer}"]`)
      .forEach((shape) => {
        //shape.parentNode.insertBefore(SVGTextElement, shape);
      });
  };

  return {
    addSVGTextElemFromInputElem
  };
})();

window.app.svgModule.utils.textLabel = utilsSVGTextLabels;
