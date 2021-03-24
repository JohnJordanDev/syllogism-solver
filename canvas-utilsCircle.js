const utilsCircle = (function (canvasModuleStore) {
  const storeCircleShapesByPart = canvasModuleStore.storeOfCircleShapes;
  const drawToCanvas = function (canvasElemCtx, settings) {
    canvasElemCtx.moveTo(settings.startPositionX, settings.startPositionY);
    canvasElemCtx.setLineDash(settings.setLineDash);
    canvasElemCtx.beginPath();
    canvasElemCtx.arc(
      settings.circleXPos,
      settings.cirleYPos,
      settings.circleRadius,
      settings.startAngleRad,
      settings.endAngleRad,
      settings.counterClockwise
    );
    canvasElemCtx.stroke();
    if (settings.fillStyle) {
      // eslint-disable-next-line no-param-reassign
      canvasElemCtx.fillStyle = settings.fillStyle;
      canvasElemCtx.fill();
    }
  };

  const drawCircle = function (canvasElemCtx, options = {}) {
    const settings = {
      ...canvasModuleStore.getDefaultShapeSettings(),
      ...options
    };
    drawToCanvas(canvasElemCtx, settings);
  };

  const drawPartToBoard = (part, partForm, canvasElemCtx) => {
    const subjectCircleShape = {
      ...canvasModuleStore.getDefaultShapeSettings(),
      ...storeCircleShapesByPart[part].subject[partForm]
    };
    const predicateCircleShape = {
      ...canvasModuleStore.getDefaultShapeSettings(),
      ...storeCircleShapesByPart[part].predicate[partForm]
    };
    drawCircle(canvasElemCtx, subjectCircleShape);
    drawCircle(canvasElemCtx, predicateCircleShape);
  };

  return {
    drawPartToBoard
  };
})(window.app.canvas.store);

window.app.canvas.utilsCircle = utilsCircle;
