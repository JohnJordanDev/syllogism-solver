window.app = (function appInit() {
  // ====== app - state ======

  let storedFormsOfBothPropositions;
  const setStoredFormsOfBothPropositions = (majorPremise, minorPremise) => {
    storedFormsOfBothPropositions = { majorPremise, minorPremise };
  };
  const getStoredFormsOfBothPropositions = () => storedFormsOfBothPropositions;

  let storedFormOfConclusion;
  const setStoredFormOfConclusion = (conclusion) => {
    storedFormOfConclusion = { conclusion };
  };
  const getStoredFormOfConclusion = () => storedFormOfConclusion;

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
  
  let state = {
    selectionMadeMajorPremise: false,
    selectionMadeMinorPremise: false
  };

  const getState = (stateProp) => state[stateProp];

  const setState = (stateProp, value) => {
    state[stateProp] = value;
  };

  // ====== utils - UI ======

  const validMoodsFirstFigure = {
    AA: "A",
    EA: "E",
    AI: "I",
    EI: "O"
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
    OO: []
  };
  const formOfPropositions = {
    allare: "A",
    noare: "E",
    someare: "I",
    somearenot: "O"
  };
  const validConclusions = {
    A: "all 'B' are 'A'",
    E: "no 'B' are 'A'",
    I: "some 'B' are 'A'",
    O: "some 'B' are NOT 'A'"
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
    setStoredFormsOfBothPropositions(prop1Form, prop2Form);
    return prop1Form + prop2Form;
  };
  const getConclusionForm = (pFormsOfBothPropositions) => {
    const conclusion = validMoodsFirstFigure[pFormsOfBothPropositions] || undefined;
    setStoredFormOfConclusion(conclusion);
    return conclusion;
  };
  const getConclusion = (
    formOfBothPropositions,
    pMinorTermValue,
    pMajorTermValue
  ) => {
    let conclusion = validMoodsFirstFigure[formOfBothPropositions] || undefined;
    const minorTermValue =
      typeof pMinorTermValue !== "string" || pMinorTermValue.length === 0
        ? "minor term"
        : pMinorTermValue;
    const majorTermValue =
      typeof pMajorTermValue !== "string" || pMajorTermValue.length === 0
        ? "major term"
        : pMajorTermValue;
    if (
      typeof conclusion !== "undefined" &&
      typeof validConclusions[conclusion] !== "undefined"
    ) {
      conclusion = validConclusions[conclusion]
        .replace("'B'", `<span id="conclusion_minorTerm">${minorTermValue}</span>`)
        .replace("'A'", `<span id="conclusion_majorTerm">${majorTermValue}</span>`);
    }
    return conclusion;
  };

  return {
    getFormOfPropositions,
    getConclusionForm,
    getConclusion,
    getStoredFormsOfBothPropositions,
    getStoredFormOfConclusion,
    isMiddleTermPredicateOfMajor,
    isMiddleTermSubjectOfMinor,
    setValueOfIsMiddleTermPredicateOfMajor,
    setValueOfIsMiddleTermSubjectOfMinor,
    getState,
    setState
  };
})();
