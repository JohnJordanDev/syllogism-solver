const canvasModule = (function(){
    
    let allCanvasses = [...window.document.getElementsByTagName('canvas')];

    const pi = window.Math.PI;

    const allCanvassesWidth = 300;
    const allCanvassesHeight = 150;

    
    // TODO: Need to add values for position of circle, such that convenient to change all at once,
    // i.e. make all x and y-positions relative to these central defined values, faciliating easy changes

    const majorPredicateCircleRadious = 60;
    const majorSubjectCircleRadius = 40;
    const minorPredicateCircleRadius = majorSubjectCircleRadius;
    const minorSubjectCircleRadius = 20;
    const subjectCircleStartPosXAll = allCanvassesWidth/2;
    const subjectCircleStartPosXNone = 0;

    const offsetForSomeCircles = allCanvassesWidth/30;


    const subjectCircleStartPosXSomeAre = (allCanvassesWidth/2);
    const subjectCircleStartPosXSomeAreNot = subjectCircleStartPosXSomeAre - majorSubjectCircleRadius;


    const premiseStartPosX = allCanvassesWidth/2;
    const premiseCircleStartXPos = premiseStartPosX;
    const premiseStartPosY = allCanvassesHeight/2;
    const premiseCircleStartYPos = premiseStartPosY;

    // Clear the next three functions into a util sub-module

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

    //TODO: For setLineDash, need to create a function to get the form of the syllogism from a (global) reference,
    // and set the line dash on the appropriate circle

    const drawPremAllAisB = (premiseType, canvasElemCtx) => {
        if(premiseType === 'major') {
            drawCircle(canvasElemCtx, { 
                circleRadius: majorSubjectCircleRadius,
                setLineDash: [5,3]
            });
        } else if(premiseType === 'minor') {
            drawCircle(canvasElemCtx, { 
                circleXPos: subjectCircleStartPosXAll,
                circleRadius: minorSubjectCircleRadius
            });
        }
        drawPredicate(premiseType, canvasElemCtx);
    };

    const drawPremNoAisB = (premiseType, canvasElemCtx) => {
        if(premiseType === 'major') {
            drawCircle(canvasElemCtx, { 
                circleXPos: subjectCircleStartPosXNone + majorSubjectCircleRadius + offsetForSomeCircles*0.5,
                circleRadius: majorSubjectCircleRadius,
                setLineDash: [5,3]
            });
        } else if(premiseType === 'minor') {
            drawCircle(canvasElemCtx, { 
                circleXPos: subjectCircleStartPosXNone + majorSubjectCircleRadius,
                circleRadius: minorSubjectCircleRadius
            });
        }
        drawPredicate(premiseType, canvasElemCtx);
    };

    const drawPremSomeAareB = (premiseType, canvasElemCtx) => {
        if(premiseType === 'major') {
            drawCircle(canvasElemCtx, { 
                circleXPos: subjectCircleStartPosXSomeAre - majorSubjectCircleRadius,
                circleRadius: majorSubjectCircleRadius,
                startAngleRad: pi/2,
                endAngleRad: -pi/2,
                setLineDash: [5,3]
            });
        } else if(premiseType === 'minor') {
            drawCircle(canvasElemCtx, { 
                circleXPos: subjectCircleStartPosXSomeAre - majorSubjectCircleRadius + offsetForSomeCircles,
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
                circleXPos: subjectCircleStartPosXSomeAreNot - 2*offsetForSomeCircles,
                circleRadius: majorSubjectCircleRadius,
                startAngleRad: (pi/180)*75,
                endAngleRad: -(pi/180)*75,
                counterClockwise: false,
                setLineDash: [5,3]
            });
        } else if(premiseType === 'minor') {
            drawCircle(canvasElemCtx, { 
                circleXPos: subjectCircleStartPosXSomeAreNot,
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
        if(formOfPremises === 'AA') {
            drawCircle(canvasElemCtx);
            drawCircle(canvasElemCtx, { 
                circleXPos: subjectCircleStartPosXAll,
                circleRadius: minorSubjectCircleRadius
            });
        } else if(formOfPremises === 'EA') {
            drawCircle(canvasElemCtx);
            drawCircle(canvasElemCtx, { 
                circleXPos: subjectCircleStartPosXNone + majorSubjectCircleRadius + offsetForSomeCircles*0.5,
                circleRadius: minorSubjectCircleRadius
            });
        } else if(formOfPremises === 'AI'){
            drawCircle(canvasElemCtx);
            drawCircle(canvasElemCtx, { 
                circleXPos: subjectCircleStartPosXSomeAre - majorSubjectCircleRadius - 1.5*offsetForSomeCircles,
                circleRadius: minorSubjectCircleRadius,
                startAngleRad: pi/2,
                endAngleRad: -pi/2,
            });
        } else if (formOfPremises === 'EI') {
            drawCircle(canvasElemCtx);
            drawCircle(canvasElemCtx, { 
                circleXPos: subjectCircleStartPosXSomeAre - majorSubjectCircleRadius - 1.5*offsetForSomeCircles,
                circleRadius: minorSubjectCircleRadius,
                startAngleRad: -pi/2,
                endAngleRad: pi/2,
            });
        }
    };

    // TODO: To refactor these functions, or all BUT these functions, into a separate module under canvas

    return {
        drawPremise: drawPremise,
        drawConclusion: drawConclusion,
        clearAllCanvasses: clearAllCanvasses
    };
})();

app.canvas = canvasModule;