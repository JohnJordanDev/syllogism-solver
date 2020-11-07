window.app = (function(){
    let middleTermIsPredicateOfMajor = false;
    let middleTermIsSubjectOfMinor = false;
    var validMoodsFirstFigure = {
        "AA": "A",
        "EA": "E",
        "AI": "I",
        "EI": "O"
    };
    var formOfPropositions = {
        "allare": "A",
        "noare": "E",
        "someare": "I",
        "somearenot": "O"
    };
    var validConclusions = {
        "A": "all 'B' are 'A'",
        "E": "no 'B' are 'A'",
        "I": "some 'B' are 'A'",
        "O": "some 'B' are NOT 'A'"
    };
    const isMiddleTermPredicateOfMajor = () => {
        return middleTermIsPredicateOfMajor;
    };

    const isMiddleTermSubjectOfMinor = () => {
        return middleTermIsSubjectOfMinor;
    };

    const setValueOfIsMiddleTermPredicateOfMajor = value => {
        middleTermIsPredicateOfMajor = Boolean(value);
    };

    const setValueOfIsMiddleTermSubjectOfMinor = value => {
        middleTermIsSubjectOfMinor = Boolean(value);
    };

    var getFormOfPropositions = (prop1Quantity, prop1Quality, prop2Quantity, prop2Quality) => {
        var prop1Form = formOfPropositions[prop1Quantity + prop1Quality];
        var prop2Form = formOfPropositions[prop2Quantity + prop2Quality];
        return prop1Form + prop2Form;
    };
    var getConclusion = (formOfBothPropositions) => {
        var conclusion = validMoodsFirstFigure[formOfBothPropositions];
        if(typeof conclusion !== "undefined" && typeof validConclusions[conclusion] !== "undefined") {
            return validConclusions[conclusion];
        }
        return null;
    };

    var hideAreNotOptionOfPropQuality = propQualityId => {
        var propQualityElem = window.document.getElementById(propQualityId);
        propQualityElem.value = 'are';
        propQualityElem.querySelectorAll('option').forEach(optionElem => {
            if(optionElem.value === 'arenot'){
                optionElem.setAttribute('disabled', 'disabled');
                optionElem.removeAttribute('selected');
            } 
            if(optionElem.value === 'are') {
                optionElem.setAttribute('selected', 'true');
            }
        });
    };

    // Only valid quantity given quality of 'are NOT', is 'some'
    var selectSomeOptionOfPropQuantity = propQuantityId => {
        var propQuantityElem = window.document.getElementById(propQuantityId);
        propQuantityElem.value = 'some';
    };

    // showAreNotOptionOfPropQuality(), to undo effect of hideAreNotOptionOfPropQuality
    var showAreNotOptionOfPropQuality = propQualityId => {
        var propQualityElem = window.document.getElementById(propQualityId);
        propQualityElem.querySelectorAll('option').forEach(optionElem => {
            // Want to maintain disabled status of 'placeholder' element
            if(optionElem.value === 'arenot') {
                optionElem.removeAttribute('disabled');
            }
        });
    };

    
    return {
        getFormOfPropositions: getFormOfPropositions,
        getConclusion: getConclusion,
        hideAreNotOptionOfPropQuality: hideAreNotOptionOfPropQuality,
        showAreNotOptionOfPropQuality: showAreNotOptionOfPropQuality,
        selectSomeOptionOfPropQuantity: selectSomeOptionOfPropQuantity,
        isMiddleTermPredicateOfMajor: isMiddleTermPredicateOfMajor,
        isMiddleTermSubjectOfMinor: isMiddleTermSubjectOfMinor,
        setValueOfIsMiddleTermPredicateOfMajor: setValueOfIsMiddleTermPredicateOfMajor,
        setValueOfIsMiddleTermSubjectOfMinor, setValueOfIsMiddleTermSubjectOfMinor
    };
    
})();




