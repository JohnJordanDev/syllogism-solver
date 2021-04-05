const utilsSVGTextLabels = (function () {
  // See here for https://stackoverflow.com/questions/15500894/background-color-of-text-in-svg text box
  const getTextLabel = () =>
    '<text text-anchor="middle" x="50%" y="20">Foo</text>';
})();

window.app.svgModule.utils.textLabel = utilsSVGTextLabels;
