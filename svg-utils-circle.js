const utilsSVGCircle = (function (SVGModule, SVGModuleStore) {
  const SVGMod = SVGModule;
  const getCircleShapeFromStore = SVGModuleStore.getCircleShape;
  // need function to convert % to numbers
  const getPerCentValue = (numValue, ofTotalNum) =>
    `${window.parseInt((numValue / ofTotalNum) * 100)}%`;

  const drawToSVGElem = function (SVGElem, shapeElement) {
    // eslint-disable-next-line no-param-reassign
    SVGElem.innerHTML += `${shapeElement}`;
  };

  const circleElementFromSettings = (settings) => {
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

    return `<circle cx="${xPos}" cy="${yPos}" 
        r="${radius}" fill="${settings.fill}" stroke="${settings.stroke}"/>`;
  };

  const halfCircleElementFromSettings = () => "<path/>";

  const getSubjectShape = (circleShapeSettings, partForm) => {
    if (partForm === "I" || partForm === "O") {
      return halfCircleElementFromSettings(circleShapeSettings);
    }
    return circleElementFromSettings(circleShapeSettings);
  };

  // each time 'change' emitted, drawPartToBoard called
  const drawPartToBoard = (syllogismPart, partForm = "A", SVGElem) => {
    const subjectShapeSettings = getCircleShapeFromStore(
      syllogismPart,
      "subject",
      partForm
    );
    const predicateShapeSettings = getCircleShapeFromStore(
      syllogismPart,
      "predicate",
      partForm
    );
    const subjectSVGElement = getSubjectShape(subjectShapeSettings, partForm);

    SVGMod.clearThisElement(SVGElem);
    drawToSVGElem(SVGElem, subjectSVGElement);
    drawToSVGElem(SVGElem, circleElementFromSettings(predicateShapeSettings));
  };

  return {
    drawPartToBoard
  };
})(window.app.svgModule, window.app.svgModule.store);

window.app.svgModule.utils.circle = utilsSVGCircle;
