const utilsSVGCircle = (function (SVGModule, SVGModuleStore) {
  const SVGMod = SVGModule;
  const getCircleShapeFromStore = SVGModuleStore.getCircleShape;
  // need function to convert % to numbers
  const getPerCentValue = (numValue, ofTotalNum) => `${window.parseInt((numValue / ofTotalNum) * 100)}%`;

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

  const halfCircleElementFromSettings = (settings, partForm) => {
    const radiusForPath = settings.circleRadius * 0.75;
    // need scaled down differences since cannot enter percentage value
    // A(rx,ry) ellipse radii needs to match A(.... x,y)
    const startingPoint = `M ${settings.circleXPos} ${settings.circleYPos - radiusForPath}`;
    // eslint-disable-next-line max-len
    const arcPath = partForm === "I" ? ` A${radiusForPath},${radiusForPath} 0 0,1 ${settings.circleXPos}, ${settings.circleYPos + radiusForPath}`
      : `A${radiusForPath},${radiusForPath} 0 0,0 ${settings.circleXPos}, ${settings.circleYPos + radiusForPath}`;
    const totalPath = startingPoint + arcPath;
    // eslint-disable-next-line max-len
    return `<path d='${totalPath} M ${settings.circleXPos} ${settings.circleYPos}z' fill="none" stroke="black" stroke-width='1'/>`;
  };

  const getSubjectShape = (circleShapeSettings, partForm) => {
    if (partForm === "I" || partForm === "O") {
      return halfCircleElementFromSettings(circleShapeSettings, partForm);
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
