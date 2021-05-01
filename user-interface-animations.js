const userInterfaceAnimations = (function () {
  const doc = window.document;
  doc.getEById = doc.getElementById;

  const checkAndAnimateParts = (targetElem) => {
    console.log("node is: ", targetElem);
    const prop1Quantity = doc.getEById("prop_one_quantity");
    const prop1Quality = doc.getEById("prop_one_quality");
    if (window.app.getState("selectionMadeMajorPremise") === false) {
      if (prop1Quantity.value && prop1Quality.value) {
        window.document.getElementById("syllogism_part_minor").classList.remove("animation_part-hidden");
        window.app.setState("selectionMadeMajorPremise", true);
      }
    }
  };
  return { checkAndAnimateParts };
})();

window.app.userInterfaceAnimations = userInterfaceAnimations;
