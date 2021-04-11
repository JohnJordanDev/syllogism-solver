const utilsSVGTextLabels = (function (SVGStore) {
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

  const updateExistingTextLabel = (inputElem, listOfTextLabelsInParent, targetShape) => {
    listOfTextLabelsInParent.forEach((textLabel) => {
      // eslint-disable-next-line no-param-reassign
      textLabel.textContent = inputElem.value;
      textLabel.classList.add("changing");
    });
    targetShape.classList.add("changing");
  };

  const updateExistingOrAddNewTextLabel = (inputElem, targetShape, settingsFromStore) => {
    const shapeOfWhichTerm = targetShape.dataset.identifier.split("-")[1];
    const listOfTextLabelsInParent = targetShape.parentNode.querySelectorAll(
      `[data-identifier="textLabel-${shapeOfWhichTerm}"]`
    );
    if (listOfTextLabelsInParent.length === 0) {
      addNewTextLabelBesideTarget(inputElem, targetShape);
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
      // need part of syllogism
      const partOfSyllogism = targetShape.parentNode.attributes.id.value.split(
        "_"
      )[1];
      // need subject or predicate
      const subjectOrPredicate = determineSubjectOrPredicate(
        inputElemTermIdentififer,
        partOfSyllogism
      );
      const formOfPartOfSyllogism = getFormOfPartOfSyllogism(partOfSyllogism, formsOfPropositions, conclusionForm);
      const settingsFromStore = SVGStore.getCircleShape(partOfSyllogism, subjectOrPredicate, formOfPartOfSyllogism);
      console.log('settingsFromStore: ', settingsFromStore);

      // need formOfProsition
      updateExistingOrAddNewTextLabel(inputElem, targetShape, settingsFromStore);
    });
  };

  return {
    addSVGTextElemFromInputElem
  };
})(window.app.svgModule.store);

window.app.svgModule.utils.textLabel = utilsSVGTextLabels;
