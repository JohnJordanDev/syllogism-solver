const userInterfaceAnimations = (function () {
  const checkAndAnimateParts = (targetElem) => {
    console.log("node is: ", targetElem);
    if (targetElem.getAttribute("id") === "prop_one_quantity") {
      window.document.getElementById("syllogism_part_minor").classList.remove("animation_part-hidden");
    }
  };
  return { checkAndAnimateParts };
})();

window.app.userInterfaceAnimations = userInterfaceAnimations;
