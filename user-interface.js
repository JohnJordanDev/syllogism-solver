// ToDo: Place all this on an object
var prop1Quantity = window.document.getElementById('prop_one_quantity');
var prop1Quality = window.document.getElementById('prop_one_quality');
var prop2Quantity = window.document.getElementById('prop_two_quantity');
var prop2Quality = window.document.getElementById('prop_two_quality'); 

var canvasPropOne = window.document.getElementById('canvas_prop_one');
var canvasPropOneCtx = canvasPropOne.getContext('2d');

var canvasPropTwo = window.document.getElementById('canvas_prop_two');
var canvasPropTwoCtx = canvasPropTwo.getContext('2d');


const firstFigure = window.document.getElementById('first_figure');
const firstFigureSubmit = window.document.getElementById('first_figure_submit');
const conclusion = window.document.getElementById('conclusion');

const drawPremisesAndConclusion = () => {
    let formsOfPropositions = window.app.getFormOfPropositions(
        prop1Quantity.value, prop1Quality.value, prop2Quantity.value, prop2Quality.value
    );
    app.canvas.drawPremise('major', formsOfPropositions[0], canvasPropOneCtx);
    app.canvas.drawPremise('minor', formsOfPropositions[1], canvasPropTwoCtx);
    conclusion.innerHTML = 'Then, ' + window.app.getConclusion(formsOfPropositions);
};

const triggerFormUiFeedback = () => {
    firstFigureSubmit.click();
};

const updateFormOutputs = () => {
    app.canvas.clearAllCanvasses();
    if(firstFigure.checkValidity()) {
        drawPremisesAndConclusion();
    } else {
        triggerFormUiFeedback(); 
        conclusion.innerHTML = '...';  
    }
};

const setValidUserChoicesBasedOnInput = event => {
    var elem = event.target;
    var elemId = elem.getAttribute('id');
    if(elemId === 'prop_one_quantity' || elemId === 'prop_two_quantity') {
        if(elem.value === 'no' || elem.value === 'all'){
            window.app.hideAreNotOptionOfPropQuality(elemId.replace('quantity', 'quality'));     
        } else {
            window.app.showAreNotOptionOfPropQuality(elemId.replace('quantity', 'quality'));
        }
    } else if(elemId === 'prop_one_quality' || elemId === 'prop_two_quality') {
        if(elem.value === 'arenot'){
            window.app.selectSomeOptionOfPropQuantity(elemId.replace('quality', 'quantity'));     
        } 
    }
}

const changeHandler = event => {
    setValidUserChoicesBasedOnInput(event);
    updateFormOutputs();
};

window.document.addEventListener('change', changeHandler);

window.document.getElementById('first_figure').reset();

// For testing purposes
prop1Quantity.selectedIndex = 2;
prop1Quality.selectedIndex = 2;
prop2Quantity.selectedIndex = 2;
prop2Quality.selectedIndex = 2;

var changeEvent = new Event('change', {bubbles: true});

// Dispatch it.
prop1Quantity.dispatchEvent(changeEvent);
prop1Quality.dispatchEvent(changeEvent);
prop2Quantity.dispatchEvent(changeEvent);