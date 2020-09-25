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

window.document.addEventListener('change', e => {
    var formsOfPropositions;
    
    if(firstFigure.checkValidity()) {
        formsOfPropositions = window.app.getFormOfPropositions(
            prop1Quantity.value, prop1Quality.value, prop2Quantity.value, prop2Quality.value
        );
        console.log();
        conclusion.innerHTML = 'Then, ' + window.app.getConclusion(formsOfPropositions);
        app.canvas.clearAllCanvasses();
        app.canvas.drawProposition('major', formsOfPropositions[0], canvasPropOneCtx);
        app.canvas.drawProposition('minor', formsOfPropositions[1], canvasPropTwoCtx);
    } else {
        firstFigureSubmit.click(); 
        conclusion.innerHTML = '...';  
        app.canvas.clearAllCanvasses();
    }

});

window.document.getElementById('first_figure').reset();

// For testing purposes
prop1Quantity.selectedIndex = 2;
prop1Quality.selectedIndex = 2;
prop2Quantity.selectedIndex = 1;

var changeEvent = new Event('change', {bubbles: true});

// Dispatch it.
prop1Quantity.dispatchEvent(changeEvent);
prop1Quality.dispatchEvent(changeEvent);
prop2Quantity.dispatchEvent(changeEvent);