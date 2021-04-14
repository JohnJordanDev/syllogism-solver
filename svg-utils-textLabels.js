const utilsSVGTextLabels = (function (SVGStore) {
  // TODO remove this, as now redundant
  const storeOfTextLabelData = {
    majorTerm: {
      textAnchor: "middle"
    },
    middleTerm: {
      textAnchor: "middle"
    },
    minorTerm: {
      textAnchor: "middle"
    }
  };

  const updateAttributes = (element, attributes) => {
    Object.keys(attributes).forEach((attribute) => {
      element.setAttribute(attribute, attributes[attribute]);
    });
  };

  const drawRectBehind = (targetTextLabel) => {
    const bBox = targetTextLabel.getBBox();
    const rect = window.document.createElementNS("http://www.w3.org/2000/svg", "rect");
    updateAttributes(rect, {
      x: bBox.x - 5,
      y: bBox.y - 2.5,
      width: bBox.width + 10,
      height: bBox.height + 5,
      "data-identifier": `rect-${targetTextLabel.dataset.identifier}`,
      fill: "#DEDEDE"
    });
    rect.classList.add("textLabel-rect", "changing");
    targetTextLabel.parentNode.insertBefore(rect, targetTextLabel);
  };

  const updateRectBehind = (targetTextLabel) => {
    const rect = targetTextLabel.parentNode.querySelectorAll(`[data-identifier=rect-${targetTextLabel.dataset.identifier}]`)[0];
    const bBox = targetTextLabel.getBBox();
    updateAttributes(rect, {
      x: bBox.x - 5,
      y: bBox.y - 2.5,
      width: bBox.width + 10,
      height: bBox.height + 5
    });
    rect.classList.add("changing");
  };

  const getLabelYPos = (inputElementIdentifier, storeSettings) => {
    let labelYPos = "";
    if (inputElementIdentifier === "majorTerm") {
      labelYPos = storeSettings.circleYPos - storeSettings.circleRadius + 5;
    } else if (inputElementIdentifier === "minorTerm") {
      labelYPos = storeSettings.circleYPos + storeSettings.circleRadius + 10;
    } else {
      labelYPos = storeSettings.circleYPos - storeSettings.circleRadius;
    }
    return labelYPos;
  };

  const getTextLabelSpecificSettings = (inputElementIdentifier, storeSettings) => {
    const labelYPos = getLabelYPos(inputElementIdentifier, storeSettings);
    return { ...storeSettings, ...storeOfTextLabelData[inputElementIdentifier], labelYPos };
  };

  // TODO; Background image See here for https://stackoverflow.com/questions/15500894/background-color-of-text-in-svg text box

  const textElemFromInputElemData = (text, inputElemIdentififer, labelSettings) => {
    const nsSVG = "http://www.w3.org/2000/svg";
    const t = window.document.createElementNS(nsSVG, "text");
    updateAttributes(t, {
      "text-anchor": labelSettings.textAnchor,
      x: labelSettings.circleXPos,
      y: labelSettings.labelYPos,
      "data-identifier": `textLabel-${inputElemIdentififer}`
    });
    t.textContent = text;
    t.classList.add("changing", "textLabel");
    return t;
  };

  const createSVGTextLabel = (inputElem, labelSettings) => {
    const inputElemIdentififer = inputElem.attributes.id.value.split("_")[0];
    const textLabelSpecificSettings = getTextLabelSpecificSettings(inputElemIdentififer, labelSettings);
    window.document
      .querySelectorAll(`[data-identifier*="${inputElemIdentififer}"]`)
      .forEach((shape) => {
        shape.classList.add("changing");
      });
    return textElemFromInputElemData(inputElem.value, inputElemIdentififer, textLabelSpecificSettings);
  };

  const addNewTextLabelBesideTarget = (inputElem, targetShape, labelSettings) => {
    const SVGTextElement = createSVGTextLabel(inputElem, labelSettings);
    targetShape.parentNode.insertBefore(SVGTextElement, targetShape);
    drawRectBehind(SVGTextElement);
  };

  const updateExistingTextLabel = (inputElem, listOfTextLabelsInParent, targetShape) => {
    listOfTextLabelsInParent.forEach((textLabel) => {
      // eslint-disable-next-line no-param-reassign
      textLabel.textContent = inputElem.value;
      textLabel.classList.add("changing");
      updateRectBehind(textLabel);
    });
    targetShape.classList.add("changing");
  };

  const updateExistingOrAddNewTextLabel = (inputElem, targetShape, labelSettings) => {
    const shapeOfWhichTerm = targetShape.dataset.identifier.split("-")[1];
    const listOfTextLabelsInParent = targetShape.parentNode.querySelectorAll(
      `[data-identifier="textLabel-${shapeOfWhichTerm}"]`
    );
    if (listOfTextLabelsInParent.length === 0) {
      addNewTextLabelBesideTarget(inputElem, targetShape, labelSettings);
    } else {
      updateExistingTextLabel(inputElem, listOfTextLabelsInParent, targetShape);
    }
  };

  const determineSubjectOrPredicate = (termIdentifier, partOfSyllogism) => {
    let subjectOrPredicate;
    if (termIdentifier === "minorTerm") {
      subjectOrPredicate = "subject";
    } else if (termIdentifier === "majorTerm") {
      subjectOrPredicate = "predicate";
    } else if (
      termIdentifier === "middleTerm"
      && partOfSyllogism === "majorPremise"
    ) {
      subjectOrPredicate = "subject";
    } else {
      subjectOrPredicate = "predicate";
    }
    return subjectOrPredicate;
  };

  const getFormOfPartOfSyllogism = (partOfSyllogism, formsOfPropositions, conclusionForm) => {
    if (partOfSyllogism === "majorPremise") {
      return formsOfPropositions[0];
    } if (partOfSyllogism === "minorPremise") {
      return formsOfPropositions[1];
    } if (partOfSyllogism === "conclusion") {
      return conclusionForm;
    }
  };

  const addSVGTextElemFromInputElem = (inputElem, formsOfPropositions, conclusionForm) => {
    const inputElemID = inputElem.attributes.id.value;
    const inputElemTermIdentififer = inputElemID.split("_")[0];
    const listOfSVGShapeTargets = window.document.querySelectorAll(
      `[data-identifier="shape-${inputElemTermIdentififer}"]`
    );

    listOfSVGShapeTargets.forEach((targetShape) => {
      const partOfSyllogism = targetShape.parentNode.attributes.id.value.split(
        "_"
      )[1];
      const subjectOrPredicate = determineSubjectOrPredicate(
        inputElemTermIdentififer,
        partOfSyllogism
      );
      const formOfPartOfSyllogism = getFormOfPartOfSyllogism(partOfSyllogism, formsOfPropositions, conclusionForm);
      const settingsFromStore = SVGStore.getCircleShape(partOfSyllogism, subjectOrPredicate, formOfPartOfSyllogism);
      const textLabelSettings = { ...settingsFromStore, labelYPos: settingsFromStore.circleYPos - settingsFromStore.circleRadius };
      updateExistingOrAddNewTextLabel(inputElem, targetShape, textLabelSettings);
    });
  };

  const updateConclusionTextLabel = (concTerm, newText) => {
    concTerm.textContent = newText;
    concTerm.classList.add("changing");
  };

  return {
    addSVGTextElemFromInputElem,
    updateConclusionTextLabel
  };
})(window.app.svgModule.store);

window.app.svgModule.utils.textLabel = utilsSVGTextLabels;
