var canvasModule = (function(){
    
    var allCanvasses = [...window.document.getElementsByTagName('canvas')];

    var pi = window.Math.PI;

    var clearAllCanvasses = () => {
        allCanvasses.forEach(canvas => {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        });
    };

    const drawToCanvas = function(canvasElemCtx, settings) {
        canvasElemCtx.moveTo(settings.startPositionX, settings.startPositionY);
        canvasElemCtx.beginPath();
        canvasElemCtx.arc(settings.circleXPos, 
            settings.cirleYPos, 
            settings.circleRadius, 
            settings.startAngleRad, 
            settings.endAngleRad, 
            settings.counterClockwise
        );
        canvasElemCtx.stroke(); 
    };

    const drawCircle = function(canvasElemCtx, options = {}) {
        let defaults = {
            startPositionX: 250,
            startPositionY: 75,
            circleXPos: 200,
            cirleYPos: 75,
            circleRadius: 50,
            startAngleRad: 0,
            endAngleRad: pi*2,
            counterClockwise: true
        };
        let settings = Object.assign({}, defaults, options);
        drawToCanvas(canvasElemCtx, settings);
    };

    var drawPredicate = (premiseType, canvasElemCtx) => {
        if (premiseType === 'major') {
            drawCircle(canvasElemCtx);
        } else { 
            drawCircle(canvasElemCtx, {
                startPositionX: 200,        
                circleXPos: 150,
                circleRadius: 40
            });
        }
    };

    var allAisB = (premiseType, canvasElemCtx) => {
        canvasElemCtx.beginPath();
        canvasElemCtx.arc(180, 75, 25, 0, pi * 2, true); // subject
        canvasElemCtx.stroke();
        drawPredicate(premiseType, canvasElemCtx);
    };

    var noAisB = (premiseType, canvasElemCtx) => {
        canvasElemCtx.beginPath();
        canvasElemCtx.arc(75, 75, 25, 0, pi * 2, true); // subject
        canvasElemCtx.stroke();
        drawPredicate(premiseType, canvasElemCtx);
    };

    var someAareB = (premiseType, canvasElemCtx) => {
        canvasElemCtx.beginPath();
        canvasElemCtx.arc(157.25, 75, 25, pi/2, -pi/2, true); // subject
        canvasElemCtx.stroke();
        drawPredicate(premiseType, canvasElemCtx);
    };

    var someAareNotB = (premiseType, canvasElemCtx) => {
        if (premiseType === 'major') {
            canvasElemCtx.beginPath();
            canvasElemCtx.arc(150, 75, 25, (pi/180)*75, -(pi/180)*75, false); // subject
            canvasElemCtx.stroke();
        } else {
            // TODO: reduced size, geometrically
            canvasElemCtx.beginPath();
            canvasElemCtx.arc(150, 75, 25, (pi/180)*75, -(pi/180)*75, false); // subject
            canvasElemCtx.stroke();
        }
        drawPredicate(premiseType, canvasElemCtx);
    };

    var drawProposition = (premiseType, propForm, canvasElemCtx) => {
        console.log({propForm});
        if(propForm === 'A') {
            allAisB(premiseType, canvasElemCtx);
        } else if(propForm === 'E') {
            noAisB(premiseType, canvasElemCtx);
        } else if(propForm === 'I') {
            someAareB(premiseType, canvasElemCtx);
        } else if(propForm === 'O') {
            someAareNotB(premiseType, canvasElemCtx);
        } else {
            // error code
        }
    };

    return {
        drawProposition: drawProposition,
        clearAllCanvasses: clearAllCanvasses
    };
})();

app.canvas = canvasModule;