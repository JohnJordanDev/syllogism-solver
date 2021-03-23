const canvasModule = (function () {
  const allCanvasses = [...window.document.getElementsByTagName("canvas")];

  const clearThisCanvas = (canvas) => {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  };

  const clearAllCanvasses = () => {
    allCanvasses.forEach((canvas) => {
      clearThisCanvas(canvas);
    });
  };

  return {
    clearThisCanvas,
    clearAllCanvasses
  };
})();

window.app.canvas = canvasModule;
