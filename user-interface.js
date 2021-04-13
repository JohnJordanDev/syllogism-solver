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

  const hideAreNotOptionOfPropQuality = (propQualityId) => {
    const propQualityElem = doc.getEById(propQualityId);
    propQualityElem.value = "are";
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

  const updateFormOutputs = () => {
    // is this needed
    // app.canvas.clearAllCanvasses();
    if (firstFigure.checkValidity()) {
      drawPremisesAndConclusion();
      // app.canvas.clearThisCanvas(canvasConclusion);
    } else {
      triggerFormUiFeedback();
      conclusionOutputElem.innerHTML = "...";
      // app.canvas.clearThisCanvas(canvasConclusion);
    }
    // TODO Add call to clearVanas on conclusion, and refactor our conContent from 'drawPrem..
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
    setValidUserChoicesBasedOnInput(event);
    updateFormOutputs();
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

  const renderCanvas = (ev) => {
    const elem = ev.target;
    // TODO: refactor into function
    const formsOfPropositions = app.getFormOfPropositions(
      prop1Quantity.value,
      prop1Quality.value,
      prop2Quantity.value,
      prop2Quality.value
    );
    const conclusionForm = app.getConclusionForm(formsOfPropositions);
    // TODO render text labels: need to split out in renderCanvas
    if (elem.nodeName === "INPUT") {
      const inputElemIdentififer = elem.attributes.id.value;
      const relevantTerm = inputElemIdentififer.split("_")[0];
      app.svgModule.utils.textLabel.addSVGTextElemFromInputElem(elem, formsOfPropositions, conclusionForm);
      app.svgModule.utils.textLabel.updateConclusionTextLabel(doc.getElementById(`conclusion_${relevantTerm}`), elem.value);
      inputHandler(ev);
    } else {
      // get conclusion form here, and pass in
      app.svgModule.clearAllSVGs();
      // TODO: will need to split out the changes made for change and input events, to text label
      changeHandler(ev);
    }
  };

  // ANY change to input/select elements MUST result of complete canvas redraw
  ["change", "input"].forEach((event) => {
    doc.addEventListener(event, renderCanvas);
  });

  doc.getEById("first_figure").reset();

  // TODO: place into userinterface polish, when ready
  doc.addEventListener(
    "focusout",
    () => {
      doc.querySelectorAll(".changing").forEach((elem) => {
        elem.classList.remove("changing");
      });
    },
    false
  );

  // TODO: adding hover behavior revealing info boxs

  // For testing purposes
  prop1Quantity.selectedIndex = 1;
  prop1Quality.selectedIndex = 2;
  prop2Quantity.selectedIndex = 2;
  prop2Quality.selectedIndex = 1;

  majorTermMajorPremise.value = "Major term";

  const changeEvent = new Event("change", { bubbles: true });

  // Dispatch it.
  prop1Quantity.dispatchEvent(changeEvent);
  prop1Quality.dispatchEvent(changeEvent);
  prop2Quantity.dispatchEvent(changeEvent);
})(window.app);
