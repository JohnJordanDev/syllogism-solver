// ToDo: Place all this on an object
const prop1Quantity = window.document.getElementById("prop_one_quantity");
const prop1Quality = window.document.getElementById("prop_one_quality");
const prop2Quantity = window.document.getElementById("prop_two_quantity");
const prop2Quality = window.document.getElementById("prop_two_quality");

const canvasPropOne = window.document.getElementById("canvas_prop_one");
const canvasPropOneCtx = canvasPropOne.getContext("2d");

const canvasPropTwo = window.document.getElementById("canvas_prop_two");
const canvasPropTwoCtx = canvasPropTwo.getContext("2d");

const canvasConclusion = window.document.getElementById("canvas_conclusion");
const canvasConclusionCtx = canvasConclusion.getContext("2d");

const firstFigure = window.document.getElementById("first_figure");
const firstFigureSubmit = window.document.getElementById("first_figure_submit");
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

const drawPremisesAndConclusion = () => {
  const formsOfPropositions = window.app.getFormOfPropositions(
    prop1Quantity.value,
    prop1Quality.value,
    prop2Quantity.value,
    prop2Quality.value
  );
  const conclusionContent = window.app.getConclusion(formsOfPropositions);
  window.app.canvas.drawPremise("major", formsOfPropositions[0], canvasPropOneCtx);
  window.app.canvas.drawPremise("minor", formsOfPropositions[1], canvasPropTwoCtx);
  if (conclusionContent) {
    debugger;
    window.app.canvas.drawConclusion(formsOfPropositions, canvasConclusionCtx);
    conclusionOutputElem.innerHTML = `Then, ${conclusionContent}`;
  } else {
    conclusionOutputElem.innerHTML = "Then, we cannot draw a valid conclusion";
  }
};

const triggerFormUiFeedback = () => {
  firstFigureSubmit.click();
};

const updateFormOutputs = () => {
  window.app.canvas.clearAllCanvasses();
  if (firstFigure.checkValidity()) {
    drawPremisesAndConclusion();
  } else {
    triggerFormUiFeedback();
    conclusionOutputElem.innerHTML = "...";
  }
};

const setValidUserChoicesBasedOnInput = (event) => {
  const elem = event.target;
  const elemId = elem.getAttribute("id");
  if (elemId === "prop_one_quantity" || elemId === "prop_two_quantity") {
    if (elem.value === "no" || elem.value === "all") {
      hideAreNotOptionOfPropQuality(
        elemId.replace("quantity", "quality")
      );
    } else {
      showAreNotOptionOfPropQuality(
        elemId.replace("quantity", "quality")
      );
    }
  } else if (elemId === "prop_one_quality" || elemId === "prop_two_quality") {
    if (elem.value === "arenot") {
      selectSomeOptionOfPropQuantity(
        elemId.replace("quality", "quantity")
      );
    }
  }
};

const changeHandler = (event) => {
  setValidUserChoicesBasedOnInput(event);
  updateFormOutputs();
};

window.document.addEventListener("change", changeHandler);

window.document.getElementById("first_figure").reset();

// For testing purposes
prop1Quantity.selectedIndex = 1;
prop1Quality.selectedIndex = 1;
prop2Quantity.selectedIndex = 2;
prop2Quality.selectedIndex = 1;

const changeEvent = new Event("change", { bubbles: true });

// Dispatch it.
prop1Quantity.dispatchEvent(changeEvent);
prop1Quality.dispatchEvent(changeEvent);
prop2Quantity.dispatchEvent(changeEvent);
