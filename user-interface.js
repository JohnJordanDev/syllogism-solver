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
    conclusion.innerHTML = 'Then, ' + window.app.getConclusion(formsOfPropositions);
    app.canvas.drawPremise('major', formsOfPropositions[0], canvasPropOneCtx);
    app.canvas.drawPremise('minor', formsOfPropositions[1], canvasPropTwoCtx);   
};

const triggerFormUiFeedback = () => {
    firstFigureSubmit.click();
};

window.document.addEventListener('change', e => {    
    app.canvas.clearAllCanvasses();
    if(firstFigure.checkValidity()) {
        drawPremisesAndConclusion();
    } else {
        triggerFormUiFeedback(); 
        conclusion.innerHTML = '...';  
    }
});

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