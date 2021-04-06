const utilsSVGCircle = (function (SVGModule, SVGModuleStore) {
  const SVGMod = SVGModule;
  const getCircleShapeFromStore = SVGModuleStore.getCircleShape;
  // console.log("store is ", storeCircleShapesByPart);
  const drawToSVGElem = function (SVGElem, settings) {
    const subjectFillHex = "#D1D1D1";

    const getCircleShape = () => `<circle cx="${settings.circleXPos}" cy="${settings.circleYPos}" 
      r="${settings.circleRadius}" fill="${settings.fill}" stroke="${settings.stroke}"/>`;

    // eslint-disable-next-line no-param-reassign
    SVGElem.innerHTML += `${getCircleShape()}`;
  };

  const drawPartToBoard = (syllogismPart, partForm = "A", SVGElem) => {
    const subjectCircleShape = getCircleShapeFromStore(
      syllogismPart,
      "subject",
      partForm
    );
    const predicateCircleShape = getCircleShapeFromStore(
      syllogismPart,
      "predicate",
      partForm
    );
    // each time 'change' emitted, drawPartToBoard called
    SVGMod.clearThisElement(SVGElem);
    drawToSVGElem(SVGElem, subjectCircleShape);
    drawToSVGElem(SVGElem, predicateCircleShape);
  };

  return {
    drawPartToBoard
  };
})(window.app.svgModule, window.app.svgModule.store);

window.app.svgModule.utils.circle = utilsSVGCircle;
