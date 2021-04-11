const utilsSVGTextLabels = (function () {
  const updateAttributes = (element, attributes) => {
    Object.keys(attributes).forEach((attribute) => {
      element.setAttribute(attribute, attributes[attribute]);
    });
  };
  // See here for https://stackoverflow.com/questions/15500894/background-color-of-text-in-svg text box
  const textElemFromInputElemData = (text, inputElemIdentififer) => {
    const xmlns = "http://www.w3.org/2000/svg";
    const t = window.document.createElementNS(xmlns, "text");
    updateAttributes(t, {
      "text-achor": "middle",
      x: "50%",
      y: "50%",
      "data-identifier": `textLabel-${inputElemIdentififer}`
    });
    t.textContent = text;
    t.classList.add("changing");
    return t;
  };

  const getSVGShapeTarget = (inputElem) => {
    // query DOM
    const inputElemIdentififer = inputElem.attributes.id.value.split("_")[0];
    const inputElementParentPremise = inputElem.attributes.id.value.split(
      "_"
    )[1];
    window.document
      .querySelectorAll(`[data-identifier*="${inputElemIdentififer}"]`)
      .forEach((shape) => {
        shape.classList.add("changing");
      });
    return textElemFromInputElemData(inputElem.value, inputElemIdentififer);
  };

  const addNewTextLabelBesideTarget = (inputElem, targetShape) => {
    const SVGTextElement = getSVGShapeTarget(inputElem);
    targetShape.parentNode.insertBefore(SVGTextElement, targetShape);
  };

  const updateExistingTextLabel = (inputElem, listOfTextLabelsInParent) => {
    listOfTextLabelsInParent.forEach((textLabel) => {
      // eslint-disable-next-line no-param-reassign
      textLabel.textContent = inputElem.value;
    });
  };

  const updateExistingOrAddNewTextLabel = (inputElem, targetShape) => {
    const shapeOfWhichTerm = targetShape.dataset.identifier.split("-")[1];
    const listOfTextLabelsInParent = targetShape.parentNode.querySelectorAll(
      `[data-identifier="textLabel-${shapeOfWhichTerm}"]`
    );
    if (listOfTextLabelsInParent.length === 0) {
      addNewTextLabelBesideTarget(inputElem, targetShape);
    } else {
      updateExistingTextLabel(inputElem, listOfTextLabelsInParent);
    }
  };

  const addSVGTextElemFromInputElem = (inputElem, formsOfPropositions) => {
    // TODO need to pull out the premise/subject or predicate/form of premise from the available info
    // in the input element ID, e.g. if minorTerm and minorPremise => 'subject' and formsOfPropositions[1]
    // then can query values from SVG store, with modifications
    const inputElemIdentififer = inputElem.attributes.id.value.split("_")[0];
    const listOfSVGShapeTargets = window.document.querySelectorAll(
      `[data-identifier="shape-${inputElemIdentififer}"]`
    );

    listOfSVGShapeTargets.forEach((targetShape) => {
      updateExistingOrAddNewTextLabel(inputElem, targetShape);
    });
  };

  return {
    addSVGTextElemFromInputElem
  };
})();

window.app.svgModule.utils.textLabel = utilsSVGTextLabels;
