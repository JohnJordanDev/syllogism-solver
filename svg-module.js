const svgModule = (function () {
  const drawCircle = (svgElem) => {
    // eslint-disable-next-line no-param-reassign
    svgElem.innerHTML
      += '<circle cx="50%" cy="50%" r="50" style="fill: blue; stroke: black; stroke-width: 2px;"/>';
  };

  return {
    drawCircle
  };
})();

window.app.svgModule = svgModule;
