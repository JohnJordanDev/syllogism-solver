const utilsSVGCircle = (function (SVGModuleStore) {
  const storeCircleShapesByPart = SVGModuleStore.storeOfCircleShapes;
  // console.log("store is ", storeCircleShapesByPart);
  const drawToSVGElem = function (SVGElem, settings) {
      console.log(settings)
    const subjectFillHex = "#D1D1D1";

    const getCircleShape = () => `<circle cx="${settings.circleXPos}" cy="${settings.circleYPos}" 
      r="${settings.circleRadius}" fill="${settings.fill}" stroke="${settings.stroke}"/>`;

    // eslint-disable-next-line no-param-reassign
    SVGElem.innerHTML += `${getCircleShape()}`;
  };

  const drawCircle = function (SVGElem, options = {}) {
    // console.log(options);
    drawToSVGElem(SVGElem, options);
  };

  const drawPartToBoard = (part, partForm = "A", SVGElem) => {
    // TODO IF no partForm, e.g. if no conclusion to be drawn, catch!
    // Need to re-write this API
    const subjectCircleShape = storeCircleShapesByPart[part].subject[partForm];

    const predicateCircleShape = {}
      storeCircleShapesByPart[part].predicate[partForm];

    drawCircle(SVGElem, subjectCircleShape);
    drawCircle(SVGElem, predicateCircleShape);
  };

  return {
    drawPartToBoard
  };
})(window.app.svgModule.store);

window.app.svgModule.utils.circle = utilsSVGCircle;
