var app = (function(){
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
        return "We cannot draw a valid conclusion";
    };

    var hideAreNotOptionOfPropQuality = propQualityId => {
        var propQualityElem = window.document.getElementById(propQualityId);
        propQualityElem.value = 'are';
        console.log('calling hiding', propQualityElem);
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

    window.document.addEventListener('change', e => {
        var elem = e.target;
        var elemId = elem.getAttribute('id');
        console.log('elemID', elemId, elem.value);
        if(elemId === 'prop_one_quantity' || elemId === 'prop_two_quantity') {
            if(elem.value === 'no' || elem.value === 'all'){
                hideAreNotOptionOfPropQuality(elemId.replace('quantity', 'quality'));     
            } else {
                showAreNotOptionOfPropQuality(elemId.replace('quantity', 'quality'));
            }
        }
    });

    return {
        getFormOfPropositions: getFormOfPropositions,
        getConclusion: getConclusion
    };
    
})();

window.document.addEventListener('submit', e => {
    var formsOfPropositions = window.app.getFormOfPropositions(
        window.document.getElementById('prop_one_quantity').value, 
        window.document.getElementById('prop_one_quality').value, 
        window.document.getElementById('prop_two_quantity').value,
        window.document.getElementById('prop_two_quality').value
    );
    e.preventDefault();
    window.document.getElementById('conclusion').innerHTML = 'Then, ' + window.app.getConclusion(formsOfPropositions);
});