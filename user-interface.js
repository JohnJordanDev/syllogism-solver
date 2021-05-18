(function userInterface(app) {
  const doc = window.document;
  doc.getEById = doc.getElementById;
  // ToDo: Place all this on an object
  const prop1Quantity = doc.getEById("prop_one_quantity");
  const prop1Quality = doc.getEById("prop_one_quality");
  const prop2Quantity = doc.getEById("prop_two_quantity");
  const prop2Quality = doc.getEById("prop_two_quality");

  const majorTermMajorPremise = doc.getEById("majorTerm_majorPremise");
  const minorTermMinorPremise = doc.getEById("minorTerm_minorPremise");

  const middleTermMajorPremise = doc.getEById("middleTerm_majorPremise");
  const middleTermMinorPremise = doc.getEById("middleTerm_minorPremise");

  const firstFigure = doc.getEById("first_figure");
  const firstFigureSubmit = doc.getEById("first_figure_submit");
  const conclusionOutputElem = doc.getEById("conclusion");

  const svgConclusion = doc.getEById("svg_conclusion");
  const svgMajorPremise = doc.getEById("svg_majorPremise");
  const svgMinorPremise = doc.getEById("svg_minorPremise");

  // ====== utils - UI ======

  const dispatchEvent = (eventType, elem) => {
    const newEvent = new Event(eventType, { bubbles: true });
    elem.dispatchEvent(newEvent);
  };

  const hideAreNotOptionOfPropQuality = (propQualityId) => {
    const propQualityElem = doc.getEById(propQualityId);
    propQualityElem.value = "are";
    dispatchEvent('change', propQualityElem);
    propQualityElem.querySelectorAll("option").forEach((optionElem) => {
      if (optionElem.value === "arenot") {
        optionElem.setAttribute("disabled", "disabled");
        optionElem.removeAttribute("selected");
      }
      if (optionElem.value === "are") {
        optionElem.setAttribute("selected", "true");
      }
    });
  };

  // Only valid quantity given quality of 'are NOT', is 'some'
  const selectSomeOptionOfPropQuantity = (propQuantityId) => {
    const propQuantityElem = doc.getEById(propQuantityId);
    propQuantityElem.value = "some";
    dispatchEvent("change", propQuantityElem);
  };

  // showAreNotOptionOfPropQuality(), to undo effect of hideAreNotOptionOfPropQuality
  const showAreNotOptionOfPropQuality = (propQualityId) => {
    const propQualityElem = doc.getEById(propQualityId);
    propQualityElem.querySelectorAll("option").forEach((optionElem) => {
      // Want to maintain disabled status of 'placeholder' element
      if (optionElem.value === "arenot") {
        optionElem.removeAttribute("disabled");
      }
    });
  };

  const triggerAllInputElementInput = () => {
    const inputElems = [middleTermMajorPremise, majorTermMajorPremise, minorTermMinorPremise, middleTermMinorPremise];
    const inputEvent = new Event("input", { bubbles: true });
    inputElems.forEach((elem) => {
      elem.dispatchEvent(inputEvent);
      // TODO need to remove "changing" class from shape and text label, related to this input (new function)
      // or just call 'unfocus' event, which will do the same thing
    });
    const unfocusEvent = new Event("focusout");
    doc.dispatchEvent(unfocusEvent);
  };

  const drawPremisesAndConclusion = () => {
    // TODO refactor in to function
    const formsOfPropositions = app.getFormOfPropositions(
      prop1Quantity.value,
      prop1Quality.value,
      prop2Quantity.value,
      prop2Quality.value
    );
    const conclusionForm = app.getConclusionForm(formsOfPropositions);

    app.svgModule.utils.circle.drawPartToBoard(
      "majorPremise",
      formsOfPropositions[0],
      svgMajorPremise
    );

    app.svgModule.utils.circle.drawPartToBoard(
      "minorPremise",
      formsOfPropositions[1],
      svgMinorPremise
    );

    if (conclusionForm) {
      const conclusionTextContent = app.getConclusion(
        formsOfPropositions,
        minorTermMinorPremise.value,
        majorTermMajorPremise.value
      );
      app.svgModule.utils.circle.drawPartToBoard(
        "conclusion",
        app.getConclusionForm(formsOfPropositions),
        svgConclusion
      );
      conclusionOutputElem.innerHTML = `${conclusionTextContent}`;
    } else {
      app.svgModule.clearThisElement(svgConclusion);
      conclusionOutputElem.innerHTML = "we cannot draw a valid conclusion";
    }
  };

  const triggerFormUiFeedback = () => {
    firstFigureSubmit.click();
  };

  const updateFormUI = () => {
    if (firstFigure.checkValidity()) {
      drawPremisesAndConclusion();
    } else {
      // triggerFormUiFeedback();
      conclusionOutputElem.innerHTML = "...";
    }
    triggerAllInputElementInput();
  };

  const setMiddleTermsInSync = (elemId, newInput) => {
    if (/(major)/.test(elemId)) {
      middleTermMinorPremise.value = newInput;
    } else {
      middleTermMajorPremise.value = newInput;
    }
  };

  const setValidUserChoicesBasedOnInput = (event) => {
    const elem = event.target;
    const elemId = elem.getAttribute("id");
    if (elemId === "prop_one_quantity" || elemId === "prop_two_quantity") {
      // TODO Refactor into new function
      if (elem.value === "no" || elem.value === "all") {
        hideAreNotOptionOfPropQuality(elemId.replace("quantity", "quality"));
      } else {
        showAreNotOptionOfPropQuality(elemId.replace("quantity", "quality"));
      }
    } else if (elemId === "prop_one_quality" || elemId === "prop_two_quality") {
      // TODO Refactor into new function
      if (elem.value === "arenot") {
        selectSomeOptionOfPropQuantity(elemId.replace("quality", "quantity"));
      }
    }
  };

  const changeHandler = (event) => {
    // ALWAYS want this function to run, to ensure correct UI
    setValidUserChoicesBasedOnInput(event);
    updateFormUI();
  };

  const inputHandler = (event) => {
    const elem = event.target;
    const elemId = elem.getAttribute("id");
    const newInput = elem.value;

    if (
      elemId === "middleTerm_majorPremise"
      || elemId === "middleTerm_minorPremise"
    ) {
      setMiddleTermsInSync(elemId, newInput);
    }
  };

  const handleChangeEvent = (ev) => {
    if (ev.target.nodeName === "SELECT") {
      // get conclusion form here, and pass in
      app.svgModule.clearAllSVGs();
      window.app.userInterfaceAnimations.checkAndAnimateParts(ev.target);
      // TODO: will need to split out the changes made for change and input events, to text label
      changeHandler(ev);
    }
  };

  doc.addEventListener("change", handleChangeEvent);

  doc.addEventListener("input", (ev) => {
    const elem = ev.target;
    // TODO: refactor into function
    const formsOfPropositions = app.getFormOfPropositions(
      prop1Quantity.value,
      prop1Quality.value,
      prop2Quantity.value,
      prop2Quality.value
    );
    const inputElemIdentififer = elem.attributes.id.value;
    const relevantTerm = inputElemIdentififer.split("_")[0];
    const relevantConclusionTermElem = doc.getElementById(`conclusion_${relevantTerm}`);
    const conclusionForm = app.getConclusionForm(formsOfPropositions);
    app.svgModule.utils.textLabel.addSVGTextElemFromInputElem(elem, formsOfPropositions, conclusionForm);
    if (relevantConclusionTermElem) {
      app.svgModule.utils.textLabel.updateConclusionTextLabel(relevantConclusionTermElem, elem.value);
    }
    inputHandler(ev);
  });

  doc.getEById("first_figure").reset();

  // TODO: place into userinterface polish, when ready
  doc.addEventListener("focusout", () => {
    doc.querySelectorAll(".changing").forEach((elem) => {
      elem.classList.remove("changing");
    });
  },
  false);

  // TODO: adding hover behavior revealing info boxs

  // For testing purposes
  // prop1Quantity.selectedIndex = 1;
  // prop1Quality.selectedIndex = 2;
  // prop2Quantity.selectedIndex = 2;
  // prop2Quality.selectedIndex = 1;

  // majorTermMajorPremise.value = "Major term";

  // const changeEvent = new Event("change", { bubbles: true });

  // // Dispatch it.
  // prop1Quantity.dispatchEvent(changeEvent);
  // prop1Quality.dispatchEvent(changeEvent);
  // prop2Quantity.dispatchEvent(changeEvent);
})(window.app);
