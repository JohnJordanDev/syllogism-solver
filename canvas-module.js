var canvasModule = (function(){
    var canvasPropOne = window.document.getElementById('canvas_prop_one');
    var canvasPropOneCtx = canvasPropOne.getContext('2d');

    var allCanvasses = [canvasPropOne];

    var pi = window.Math.PI;

    var clearAllCanvasses = () => {
        console.log('clearing canvasses...')
        allCanvasses.forEach(canvas => {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        });
    };

    var allAisB = () => {
        canvasPropOneCtx.beginPath();
        canvasPropOneCtx.arc(180, 75, 25, 0, pi * 2, true); // subject
        canvasPropOneCtx.stroke();
        canvasPropOneCtx.moveTo(250, 75);
        canvasPropOneCtx.beginPath();
        canvasPropOneCtx.arc(200, 75, 50, 0, pi * 2, true); // predicate
        canvasPropOneCtx.stroke(); 
    };

    var noAisB = () => {
        canvasPropOneCtx.beginPath();
        canvasPropOneCtx.arc(75, 75, 25, 0, pi * 2, true); // subject
        canvasPropOneCtx.stroke();

        canvasPropOneCtx.moveTo(250, 75);
        canvasPropOneCtx.beginPath();
        canvasPropOneCtx.arc(200, 75, 50, 0, pi * 2, true); // predicate
        canvasPropOneCtx.stroke();
    };

    var someAareB = () => {
        canvasPropOneCtx.beginPath();
        canvasPropOneCtx.arc(157.25, 75, 25, pi/2, -pi/2, true); // subject
        canvasPropOneCtx.stroke();

        canvasPropOneCtx.moveTo(250, 75);
        canvasPropOneCtx.beginPath();
        canvasPropOneCtx.arc(200, 75, 50, 0, pi * 2, true); // predicate
        canvasPropOneCtx.stroke();
    };

    var someAareNotB = () => {
        canvasPropOneCtx.beginPath();
        canvasPropOneCtx.arc(150, 75, 25, (pi/180)*75, -(pi/180)*75, false); // subject
        canvasPropOneCtx.stroke();

        canvasPropOneCtx.moveTo(250, 75);
        canvasPropOneCtx.beginPath();
        canvasPropOneCtx.arc(200, 75, 50, 0, pi * 2, true); // predicate
        canvasPropOneCtx.stroke();
    };

    var drawPropOne = propForm => {
        clearAllCanvasses();
        console.log({propForm});
        if(propForm === 'A') {
            allAisB();
        } else if(propForm === 'E') {
            noAisB();
        } else if(propForm === 'I') {
            someAareB();
        } else if(propForm === 'O') {
            someAareNotB();
        } else {
            // error code
        }
    };

    return {
        drawPropOne: drawPropOne,
        clearAllCanvasses: clearAllCanvasses
    };
})();

app.canvas = canvasModule;