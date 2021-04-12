const utilsSVGTextLabels = (function (SVGStore) {
  const storeOfTextLabelData = {
    majorTerm: {
      textAnchor: "start"
    },
    middleTerm: {
      textAnchor: "middle"
    },
    minorTerm: {
      textAnchor: "end"
    }
  };

  const getLabelYPos = (inputElementIdentifier, storeSettings) => (
    inputElementIdentifier === "minorTerm"
      ? storeSettings.circleYPos + storeSettings.circleRadius + 10
      : storeSettings.circleYPos - storeSettings.circleRadius
  );

  const getTextLabelSpecificSettings = (inputElementIdentifier, storeSettings) => {
    const labelYPos = getLabelYPos(inputElementIdentifier, storeSettings);
    return { ...storeSettings, ...storeOfTextLabelData[inputElementIdentifier], labelYPos };
  };

  const updateAttributes = (element, attributes) => {
    Object.keys(attributes).forEach((attribute) => {
      element.setAttribute(attribute, attributes[attribute]);
    });
  };

  // TODO; Background image See here for https://stackoverflow.com/questions/15500894/background-color-of-text-in-svg text box

  const textElemFromInputElemData = (text, inputElemIdentififer, labelSettings) => {
    const nsSVG = "http://www.w3.org/2000/svg";
    const t = window.document.createElementNS(nsSVG, "text");
    console.log("getTextLabelSpecificSettings: ", getTextLabelSpecificSettings(inputElemIdentififer, labelSettings));
    updateAttributes(t, {
      "text-anchor": labelSettings.textAnchor,
      x: labelSettings.circleXPos,
      y: labelSettings.labelYPos,
      "data-identifier": `textLabel-${inputElemIdentififer}`
    });
    t.textContent = text;
    t.classList.add("changing");
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
  };

  const updateExistingTextLabel = (inputElem, listOfTextLabelsInParent, targetShape) => {
    listOfTextLabelsInParent.forEach((textLabel) => {
      // eslint-disable-next-line no-param-reassign
      textLabel.textContent = inputElem.value;
      textLabel.classList.add("changing");
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
    // TODO: need to retrieve settings from store before passing into updateExistingOrAddNewTextLabel
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

  return {
    addSVGTextElemFromInputElem
  };
})(window.app.svgModule.store);

window.app.svgModule.utils.textLabel = utilsSVGTextLabels;
