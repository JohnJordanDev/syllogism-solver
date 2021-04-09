const utilsSVGCircle = (function (SVGModule, SVGModuleStore) {
  const SVGMod = SVGModule;
  const getCircleShapeFromStore = SVGModuleStore.getCircleShape;
  // need function to convert % to numbers
  const getPerCentValue = (numValue, ofTotalNum) =>
    `${window.parseInt((numValue / ofTotalNum) * 100)}%`;

  // console.log("store is ", storeCircleShapesByPart);
  const drawToSVGElem = function (SVGElem, settings) {
    const xPos = getPerCentValue(
      settings.circleXPos,
      SVGModuleStore.getSVGWidth()
    );
    const yPos = getPerCentValue(
      settings.circleYPos,
      SVGModuleStore.getSVGHeight()
    );

    const radius = getPerCentValue(
      settings.circleRadius,
      SVGModuleStore.getSVGWidth()
    );

    const getCircleShape = () => `<circle cx="${xPos}" cy="${yPos}" 
      r="${radius}" fill="${settings.fill}" stroke="${settings.stroke}"/>`;

    // eslint-disable-next-line no-param-reassign
    SVGElem.innerHTML += `${getCircleShape()}`;
  };

  const getHalfCircleShape = () => "<path/>";

  const getSubjectShape = (circleShape, partForm) => {
    if (partForm === "I" || partForm === "O") {
      return getHalfCircleShape(circleShape);
    }
    return circleShape;
  };

  // each time 'change' emitted, drawPartToBoard called
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
    const subjectShape = getSubjectShape(subjectCircleShape, partForm);

    SVGMod.clearThisElement(SVGElem);
    drawToSVGElem(SVGElem, subjectShape);
    drawToSVGElem(SVGElem, predicateCircleShape);
  };

  return {
    drawPartToBoard
  };
})(window.app.svgModule, window.app.svgModule.store);

window.app.svgModule.utils.circle = utilsSVGCircle;
