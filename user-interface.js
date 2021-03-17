(function userInterface() {
  // ToDo: Place all this on an object
  const prop1Quantity = window.document.getElementById("prop_one_quantity");
  const prop1Quality = window.document.getElementById("prop_one_quality");
  const prop2Quantity = window.document.getElementById("prop_two_quantity");
  const prop2Quality = window.document.getElementById("prop_two_quality");

  const majorTerm = window.document.getElementById("major_term");
  const minorTerm = window.document.getElementById("minor_term");

  const middleTermMajorPremise = window.document.getElementById(
    "middle_term_major_premise"
  );
  const middleTermMinorPremise = window.document.getElementById(
    "middle_term_minor_premise"
  );

  const canvasPropOne = window.document.getElementById("canvas_prop_one");
  const canvasPropOneCtx = canvasPropOne.getContext("2d");

  const canvasPropTwo = window.document.getElementById("canvas_prop_two");
  const canvasPropTwoCtx = canvasPropTwo.getContext("2d");

  const canvasConclusion = window.document.getElementById("canvas_conclusion");
  const canvasConclusionCtx = canvasConclusion.getContext("2d");

  const firstFigure = window.document.getElementById("first_figure");
  const firstFigureSubmit = window.document.getElementById(
    "first_figure_submit"
  );
  const conclusionOutputElem = window.document.getElementById("conclusion");

  // ====== utils - UI ======

  const hideAreNotOptionOfPropQuality = (propQualityId) => {
    const propQualityElem = window.document.getElementById(propQualityId);
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
    const propQuantityElem = window.document.getElementById(propQuantityId);
    propQuantityElem.value = "some";
  };

  // showAreNotOptionOfPropQuality(), to undo effect of hideAreNotOptionOfPropQuality
  const showAreNotOptionOfPropQuality = (propQualityId) => {
    const propQualityElem = window.document.getElementById(propQualityId);
    propQualityElem.querySelectorAll("option").forEach((optionElem) => {
      // Want to maintain disabled status of 'placeholder' element
      if (optionElem.value === "arenot") {
        optionElem.removeAttribute("disabled");
      }
    });
  };

  const storeOfDataLabels = [
    {
      inputElem: majorTerm,
      canvas: canvasPropOneCtx,
      term: "majorTerm",
      part: "majorPremise"
    },
    {
      inputElem: middleTermMajorPremise,
      canvas: canvasPropOneCtx,
      term: "middleTerm",
      part: "majorPremise"
    },
    {
      inputElem: middleTermMajorPremise,
      canvas: canvasPropTwoCtx,
      term: "middleTerm",
      part: "minorPremise"
    },
    {
      inputElem: minorTerm,
      canvas: canvasPropTwoCtx,
      term: "minorTerm",
      part: "minorPremise"
    },
    {
      inputElem: majorTerm,
      canvas: canvasConclusionCtx,
      term: "majorTerm",
      part: "conclusion"
    },
    {
      inputElem: minorTerm,
      canvas: canvasConclusionCtx,
      term: "minorTerm",
      part: "conclusion"
    }
  ];

  const drawPremisesAndConclusion = () => {
    const formsOfPropositions = window.app.getFormOfPropositions(
      prop1Quantity.value,
      prop1Quality.value,
      prop2Quantity.value,
      prop2Quality.value
    );
    const conclusionForm = window.app.getConclusionForm(formsOfPropositions);

    window.app.canvas.drawPartToBoard(
      "majorPremise",
      formsOfPropositions[0],
      canvasPropOneCtx
    );
    window.app.canvas.drawPartToBoard(
      "minorPremise",
      formsOfPropositions[1],
      canvasPropTwoCtx
    );

    if (conclusionForm) {
      const conclusionTextContent = window.app.getConclusion(
        formsOfPropositions,
        minorTerm.value,
        majorTerm.value
      );
      window.app.canvas.drawPartToBoard(
        "conclusion",
        window.app.getConclusionForm(formsOfPropositions),
        canvasConclusionCtx
      );
      conclusionOutputElem.innerHTML = `${conclusionTextContent}`;
    } else {
      conclusionOutputElem.innerHTML = "we cannot draw a valid conclusion";
    }
  };

  const triggerFormUiFeedback = () => {
    firstFigureSubmit.click();
  };

  const updateFormOutputs = () => {
    window.app.canvas.clearAllCanvasses();
    if (firstFigure.checkValidity()) {
      drawPremisesAndConclusion();
      // window.app.canvas.clearThisCanvas(canvasConclusion);
    } else {
      triggerFormUiFeedback();
      conclusionOutputElem.innerHTML = "...";
      // window.app.canvas.clearThisCanvas(canvasConclusion);
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
  // cannot set letter-spacing on canvas, so adding hairspace
  // const addLetterSpacing = (text) =>
  //   text.split("").join(String.fromCharCode(8202));

  const renderTextLabelsToCanvas = () => {
    storeOfDataLabels.forEach((l) => {
      window.app.canvas.drawTextToBoard(
        l.inputElem.value,
        l.canvas,
        l.term,
        l.part
      );
    });
    // TODO: use getFormOfPropositions on app, to get position for the minor term text label
    // TODO: to remove conclusion labels if no valid conclusion, from argument
  };

  const inputHandler = (event) => {
    const elem = event.target;
    const elemId = elem.getAttribute("id");
    const newInput = elem.value;
    if (
      elemId === "middle_term_major_premise" ||
      elemId === "middle_term_minor_premise"
    ) {
      setMiddleTermsInSync(elemId, newInput);
    }
    // TODO: wrap this in logic to remove conclusion labels, if no valid conclusion
    renderTextLabelsToCanvas();
    if (!window.app.getStoredFormOfConclusion().conclusion) window.app.canvas.clearThisCanvas(canvasConclusion);
  };

  const renderCanvas = (ev) => {
    // get conclusion form here, and pass in
    window.app.canvas.clearAllCanvasses();
    changeHandler(ev);
    inputHandler(ev);
  };

  // ANY change to input/select elements MUST result of complete canvas redraw
  ["change", "input"].forEach((event) => {
    window.document.addEventListener(event, renderCanvas);
  });

  window.document.getElementById("first_figure").reset();

  // For testing purposes
  prop1Quantity.selectedIndex = 3;
  prop1Quality.selectedIndex = 2;
  prop2Quantity.selectedIndex = 2;
  prop2Quality.selectedIndex = 1;

  majorTerm.value = "Major term";

  const changeEvent = new Event("change", { bubbles: true });

  // Dispatch it.
  prop1Quantity.dispatchEvent(changeEvent);
  prop1Quality.dispatchEvent(changeEvent);
  prop2Quantity.dispatchEvent(changeEvent);
})();
