window.app = (function appInit() {
  // ====== app - state ======

  let middleTermIsPredicateOfMajor = false;
  let middleTermIsSubjectOfMinor = false;
  const isMiddleTermPredicateOfMajor = () => middleTermIsPredicateOfMajor;

  const isMiddleTermSubjectOfMinor = () => middleTermIsSubjectOfMinor;

  const setValueOfIsMiddleTermPredicateOfMajor = (value) => {
    middleTermIsPredicateOfMajor = Boolean(value);
  };

  const setValueOfIsMiddleTermSubjectOfMinor = (value) => {
    middleTermIsSubjectOfMinor = Boolean(value);
  };

  // ====== utils - UI ======

  const validMoodsFirstFigure = {
    AA: "A",
    EA: "E",
    AI: "I",
    EI: "O",
  };
  // possible conclusions to draw, given invalid moods
  const invalidMoodsFirstFigure = {
    AE: ["A", "E", "I", "O"],
    AO: ["I", "O"],
    EE: [],
    EO: [],
    IA: [],
    IE: [],
    II: [],
    IO: [],
    OA: [],
    OE: [],
    OI: [],
    OO: [],
  };
  const formOfPropositions = {
    allare: "A",
    noare: "E",
    someare: "I",
    somearenot: "O",
  };
  const validConclusions = {
    A: "all 'B' are 'A'",
    E: "no 'B' are 'A'",
    I: "some 'B' are 'A'",
    O: "some 'B' are NOT 'A'",
  };

  // ====== utils - app logic ======

  const getFormOfPropositions = (
    prop1Quantity,
    prop1Quality,
    prop2Quantity,
    prop2Quality
  ) => {
    const prop1Form = formOfPropositions[prop1Quantity + prop1Quality];
    const prop2Form = formOfPropositions[prop2Quantity + prop2Quality];
    return prop1Form + prop2Form;
  };
  const getConclusion = (formOfBothPropositions) => {
    const conclusion = validMoodsFirstFigure[formOfBothPropositions];
    if (
      typeof conclusion !== "undefined" &&
      typeof validConclusions[conclusion] !== "undefined"
    ) {
      return validConclusions[conclusion];
    }
    return null;
  };

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

  return {
    getFormOfPropositions,
    getConclusion,
    hideAreNotOptionOfPropQuality,
    showAreNotOptionOfPropQuality,
    selectSomeOptionOfPropQuantity,
    isMiddleTermPredicateOfMajor,
    isMiddleTermSubjectOfMinor,
    setValueOfIsMiddleTermPredicateOfMajor,
    setValueOfIsMiddleTermSubjectOfMinor,
  };
})();
