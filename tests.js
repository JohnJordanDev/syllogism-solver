const tests = (function () {
  const _logErrorInConclusion = (propsForm, validConclusion) => {
    console.error(
      `"${propsForm}" should lead to conclusion of "${validConclusion}"`
    );
  };
  const checkAllConclusions = function () {
    const prop1Quantity = window.document.getElementById("prop_one_quantity")
      .value;
    const prop1Quality = window.document.getElementById("prop_one_quality")
      .value;
    const prop2Quantity = window.document.getElementById("prop_two_quantity")
      .value;
    const prop2Quality = window.document.getElementById("prop_two_quality")
      .value;
    const formsOfPropositions = window.app.getFormOfPropositions(
      prop1Quantity,
      prop1Quality,
      prop2Quantity,
      prop2Quality
    );
    if (formsOfPropositions === "AA") {
      if (window.app.getConclusion(formsOfPropositions) !== "A") {
        _logErrorInConclusion("AA", "A");
      }
    }
    if (formsOfPropositions === "EA") {
      if (window.app.getConclusion(formsOfPropositions) !== "E") {
        _logErrorInConclusion("EA", "E");
      }
    }
    if (formsOfPropositions === "AI") {
      if (window.app.getConclusion(formsOfPropositions) !== "I") {
        _logErrorInConclusion("AI", "I");
      }
    }
    if (formsOfPropositions === "EI") {
      if (window.app.getConclusion(formsOfPropositions) !== "O") {
        _logErrorInConclusion("EI", "O");
      }
    }
  };
  return {
    checkAllConclusions,
  };
})();

window.app.tests = tests;
window.app.tests.checkAllConclusions();
