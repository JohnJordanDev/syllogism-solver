const utilsSVGCircle = (function (SVGModule, SVGModuleStore) {
  const SVGMod = SVGModule;
  const getCircleShapeFromStore = SVGModuleStore.getCircleShape;
  // need function to convert % to numbers
  const getPerCentValue = (numValue, ofTotalNum) => `${window.parseInt((numValue / ofTotalNum) * 100)}%`;

  const drawToSVGElem = function (SVGElem, shapeElement) {
    // eslint-disable-next-line no-param-reassign
    // TODO: refactor to prepend elements, rather than string, to allow "z-indexing" of shapes
    SVGElem.innerHTML += `${shapeElement}`;
  };

  const circleElementFromSettings = (settings) => {
    const xPos = getPerCentValue(settings.circleXPos, SVGModuleStore.getSVGWidth());
    const yPos = getPerCentValue(settings.circleYPos, SVGModuleStore.getSVGHeight());
    const radius = getPerCentValue(settings.circleRadius, SVGModuleStore.getSVGWidth());
    return `<circle data-identifier="shape-${settings.identifier}" cx="${xPos}" cy="${yPos}" 
        r="${radius}" fill="${settings.fill}" stroke="${settings.stroke}" class="shape ${settings.cssClass}"/>`;
  };

  const getScaledValueRelativeToOriginalSVG = (orgValue) => {
    const scaledValue = orgValue * (SVGModuleStore.getSVGWidth() / 300); // original SVG element width
    return scaledValue;
  };

  const getArcPath = (radiusForPath, xPos, yPos, arcSweepFlag) => `
    A${radiusForPath},${radiusForPath} 0 0,${arcSweepFlag} ${xPos}, ${yPos + radiusForPath}
  `;

  const halfCircleElementFromSettings = (settings) => {
    const radiusForPath = getScaledValueRelativeToOriginalSVG(
      settings.circleRadius * 0.75
    );
    const xPos = settings.circleXPos;
    const yPos = settings.circleYPos;

    const startingPoint = `M ${xPos} ${yPos - radiusForPath}`;
    const arcPath = getArcPath(radiusForPath, xPos, yPos, settings.arcSweepFlag);
    const totalPath = startingPoint + arcPath;
    return `<path data-identifier="shape-${settings.identifier}" class="shape ${settings.cssClass}" 
      d='${totalPath} M ${xPos} ${yPos}z' fill="${settings.fill}" stroke="${settings.stroke}" stroke-width='1'/>
    `;
  };

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

    // TODO: Need to refactor this code, so that it mirrors textLabel, adding new or updating existing
    // rather than clearing the entire SVG element, which causes a reset on 'change'
    SVGMod.clearThisElement(SVGElem);
    // Note: calling in this order, as NO z-indexing in SVG, and elements added as string to SVG,
    // and order in mark-up determines 3D position
    drawToSVGElem(SVGElem, circleElementFromSettings(predicateShapeSettings));
    drawToSVGElem(SVGElem, subjectSVGElement);
  };

  return {
    drawPartToBoard
  };
})(window.app.svgModule, window.app.svgModule.store);

window.app.svgModule.utils.circle = utilsSVGCircle;
