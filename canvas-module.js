const canvasModule = (function(){
    
    let allCanvasses = [...window.document.getElementsByTagName('canvas')];

    const pi = window.Math.PI;

    const allCanvassesWidth = 300;

    const majorPredicateCircleRadious = 60;
    const majorSubjectCircleRadius = 40;
    const minorPredicateCircleRadius = majorSubjectCircleRadius;
    const minorSubjectCircleRadius = 20;

    const premiseStartPosX = allCanvassesWidth/2;
    const premiseCircleStartXPos = premiseStartPosX;
    const premiseStartPosY = 75;
    const premiseCircleStartYPos = premiseStartPosY;

    // TODO: Need to add values for position of circle, such that convenient to change all at once,
    // i.e. make all x and y-positions relative to these central defined values, faciliating easy changes

    const clearAllCanvasses = () => {
        allCanvasses.forEach(canvas => {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        });
    };

    const drawToCanvas = function(canvasElemCtx, settings) {
        canvasElemCtx.moveTo(settings.startPositionX, settings.startPositionY);
        canvasElemCtx.setLineDash(settings.setLineDash);
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
            startPositionX: premiseStartPosX,
            startPositionY: premiseStartPosY,
            circleXPos: premiseCircleStartXPos,
            cirleYPos: premiseCircleStartYPos,
            circleRadius: majorPredicateCircleRadious,
            startAngleRad: 0,
            endAngleRad: pi*2,
            counterClockwise: true,
            setLineDash: []
        };
        let settings = Object.assign({}, defaults, options);
        drawToCanvas(canvasElemCtx, settings);
    };

    // ToDO
    // need a function that takes an input that draws circle depending on whether
    // the middle term is subject or predicate of premise

    const drawPredicate = (premiseType, canvasElemCtx) => {
        if (premiseType === 'major') {
            drawCircle(canvasElemCtx);
        } else if (premiseType === 'minor') { 
            drawCircle(canvasElemCtx, {        
                circleRadius: minorPredicateCircleRadius,
                setLineDash: [5,3]
            });
        }
    };

    const drawPremAllAisB = (premiseType, canvasElemCtx) => {
        if(premiseType === 'major') {
            drawCircle(canvasElemCtx, { 
                circleRadius: majorSubjectCircleRadius,
                setLineDash: [5,3]
            });
        } else if(premiseType === 'minor') {
            drawCircle(canvasElemCtx, { 
                circleXPos: 130,
                circleRadius: minorSubjectCircleRadius
            });
        }
        drawPredicate(premiseType, canvasElemCtx);
    };

    const drawPremNoAisB = (premiseType, canvasElemCtx) => {
        if(premiseType === 'major') {
            drawCircle(canvasElemCtx, { 
                circleXPos: 60,
                circleRadius: majorSubjectCircleRadius,
                setLineDash: [5,3]
            });
        } else if(premiseType === 'minor') {
            drawCircle(canvasElemCtx, { 
                circleXPos: 60,

                circleRadius: minorSubjectCircleRadius
            });
        }
        drawPredicate(premiseType, canvasElemCtx);
    };

    const drawPremSomeAareB = (premiseType, canvasElemCtx) => {
        if(premiseType === 'major') {
            drawCircle(canvasElemCtx, { 
                circleXPos: 137.5,
                circleRadius: majorSubjectCircleRadius,
                startAngleRad: pi/2,
                endAngleRad: -pi/2,
                setLineDash: [5,3]
            });
        } else if(premiseType === 'minor') {
            drawCircle(canvasElemCtx, { 
                circleXPos: 115,
                circleRadius: minorSubjectCircleRadius,
                startAngleRad: pi/2,
                endAngleRad: -pi/2,
            });
        }
        drawPredicate(premiseType, canvasElemCtx);
    };

    const drawPremSomeAareNotB = (premiseType, canvasElemCtx) => {
        if(premiseType === 'major') {
            drawCircle(canvasElemCtx, { 
                circleXPos: 125,
                circleRadius: majorSubjectCircleRadius,
                startAngleRad: (pi/180)*75,
                endAngleRad: -(pi/180)*75,
                counterClockwise: false,
                setLineDash: [5,3]
            });
        } else if(premiseType === 'minor') {
            drawCircle(canvasElemCtx, { 
                circleXPos: 110,
                circleRadius: minorSubjectCircleRadius,
                startAngleRad: (pi/180)*75,
                endAngleRad: -(pi/180)*75,
                counterClockwise: false
            });
        }
        drawPredicate(premiseType, canvasElemCtx);
    };

    const drawPremise = (premiseType, propForm, canvasElemCtx) => {
        if(propForm === 'A') {
            drawPremAllAisB(premiseType, canvasElemCtx);
        } else if(propForm === 'E') {
            drawPremNoAisB(premiseType, canvasElemCtx);
        } else if(propForm === 'I') {
            drawPremSomeAareB(premiseType, canvasElemCtx);
        } else if(propForm === 'O') {
            drawPremSomeAareNotB(premiseType, canvasElemCtx);
        } else {
            // error code
        }
    };

    const drawConclusion = (formOfPremises, canvasElemCtx) => {
        console.log('forms are ', formOfPremises, ' for drawing to conclusion');
        console.log(canvasElemCtx);
        if(formOfPremises === 'AA') {
            drawCircle(canvasElemCtx);
            drawCircle(canvasElemCtx, { 
                circleXPos: 140,
                circleRadius: minorSubjectCircleRadius
            });
        }
    };

    return {
        drawPremise: drawPremise,
        drawConclusion: drawConclusion,
        clearAllCanvasses: clearAllCanvasses
    };
})();

app.canvas = canvasModule;