const userInterfaceAnimations = (function () {
  const doc = window.document;
  doc.getEById = doc.getElementById;

  const checkAndAnimateParts = (targetElem) => {
    const prop1Quantity = doc.getEById("prop_one_quantity");
    const prop1Quality = doc.getEById("prop_one_quality");

    const prop2Quantity = doc.getEById("prop_two_quantity");
    const prop2Quality = doc.getEById("prop_two_quality");
    if (window.app.getState("selectionMadeMajorPremise") === false) {
      if (prop1Quantity.value && prop1Quality.value) {
        window.document.getElementById("syllogism_part_minor").classList.remove("animation_part-hidden");
        window.app.setState("selectionMadeMajorPremise", true);
      }
    }
    if (window.app.getState("selectionMadeMinorPremise") === false) {
      if (prop2Quantity.value && prop2Quality.value) {
        window.app.setState("selectionMadeMinorPremise", true);
      }
    }
    if (window.app.getState("selectionMadeMajorPremise") && window.app.getState("selectionMadeMinorPremise")) {
      window.document.getElementById("syllogism_part_conclusion").classList.remove("animation_part-hidden");
    }
  };
  return { checkAndAnimateParts };
})();

window.app.userInterfaceAnimations = userInterfaceAnimations;
