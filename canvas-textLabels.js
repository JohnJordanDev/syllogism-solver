const textLabels = (function (canvasModule) {
  const setStylingOfCanvas = (pCanvasElemCtx) => {
    const canvasElemCtx = pCanvasElemCtx;
    canvasElemCtx.textBaseline = "bottom"; // to allow positioning of text in middle of label
    canvasElemCtx.font = "normal 0.667rem Helvetica, Arial, sans-serif";
    canvasElemCtx.fillStyle = "#DED";
  };

  const drawTextBox = (text, pCanvasElemCtx, canvasPositionsXAndY) => {
    const canvasElemCtx = pCanvasElemCtx;
    const textWidth = canvasElemCtx.measureText(text).width;
    const docPixelSize = window.parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );
    const offsetPixelSizing = docPixelSize * 0.667; // using 0.667rem in font styling
    setStylingOfCanvas(canvasElemCtx);

    canvasElemCtx.fillRect(
      canvasPositionsXAndY[0],
      canvasPositionsXAndY[1] - offsetPixelSizing,
      textWidth,
      offsetPixelSizing
    );
  };

  const drawTextToBoard = (text, pCanvasElemCtx, term, part) => {
    const canvasElemCtx = pCanvasElemCtx;
    const canvasPositionsXAndY = canvasModule.store.getLabelPosition(
      term,
      part
    );

    drawTextBox(text, canvasElemCtx, canvasPositionsXAndY);
    // TODO: draw line between minor term text box and its circle

    canvasElemCtx.fillStyle = "#000"; // black text
    canvasElemCtx.textAlign = "start";
    canvasElemCtx.fillText(
      text,
      canvasPositionsXAndY[0],
      canvasPositionsXAndY[1]
    );
  };
  return {
    drawTextToBoard
  };
})(window.app.canvas);

window.app.canvas.textLabels = textLabels;
