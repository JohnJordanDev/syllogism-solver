const canvasModule = (function () {
  const allCanvasses = [...window.document.getElementsByTagName("canvas")];

  const pi = window.Math.PI;

  const allCanvassesWidth = 300;
  const allCanvassesHeight = 150;

  // TODO: Need to add values for position of circle, such that convenient to change all at once,
  // i.e. make all x and y-positions relative to these central defined values,
  // faciliating easy changes

  const majorPredicateCircleRadious = 60;
  const majorSubjectCircleRadius = 40;
  const minorPredicateCircleRadius = majorSubjectCircleRadius;
  const minorSubjectCircleRadius = 20;
  const subjectCircleStartPosXAll = allCanvassesWidth / 2;
  const subjectCircleStartPosXNone = 0;

  const offsetForSomeCircles = allCanvassesWidth / 30;

  const subjectCircleStartPosXSomeAre = allCanvassesWidth / 2;
  const subjectCircleStartPosXSomeAreNot = subjectCircleStartPosXSomeAre - majorSubjectCircleRadius;

  const premiseStartPosX = allCanvassesWidth / 2;
  const premiseCircleStartXPos = premiseStartPosX;
  const premiseStartPosY = allCanvassesHeight / 2;
  const premiseCircleStartYPos = premiseStartPosY;

  // Clear the next three functions into a util sub-module

  const clearAllCanvasses = () => {
    allCanvasses.forEach((canvas) => {
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    });
  };

  const drawToCanvas = function (canvasElemCtx, settings) {
    canvasElemCtx.moveTo(settings.startPositionX, settings.startPositionY);
    canvasElemCtx.setLineDash(settings.setLineDash);
    canvasElemCtx.beginPath();
    canvasElemCtx.arc(
      settings.circleXPos,
      settings.cirleYPos,
      settings.circleRadius,
      settings.startAngleRad,
      settings.endAngleRad,
      settings.counterClockwise
    );
    canvasElemCtx.stroke();
  };

  const drawCircle = function (canvasElemCtx, options = {}) {
    const defaults = {
      startPositionX: premiseStartPosX,
      startPositionY: premiseStartPosY,
      circleXPos: premiseCircleStartXPos,
      cirleYPos: premiseCircleStartYPos,
      circleRadius: majorPredicateCircleRadious,
      startAngleRad: 0,
      endAngleRad: pi * 2,
      counterClockwise: true,
      setLineDash: []
    };
    const settings = { ...defaults, ...options };
    drawToCanvas(canvasElemCtx, settings);
  };

  // TODO
  // Replace ALL the various 'draw' functions with the following
  // , which will reference a global store of shapes/positions
  // for the canvasses
  // predicate of major premise is default shape, and is predicate of conclusion
  const storeOfCircleShapes = {
    majorPremise: {
      subject: {
        A: {
          circleRadius: majorSubjectCircleRadius,
          setLineDash: [5, 3]
        },
        E: {
          circleXPos:
            subjectCircleStartPosXNone
            + majorSubjectCircleRadius
            + offsetForSomeCircles * 0.5,
          circleRadius: majorSubjectCircleRadius,
          setLineDash: [5, 3]
        },
        I: {
          circleXPos: subjectCircleStartPosXSomeAre - majorSubjectCircleRadius,
          circleRadius: majorSubjectCircleRadius,
          startAngleRad: pi / 2,
          endAngleRad: -pi / 2,
          setLineDash: [5, 3]
        },
        O: {
          circleXPos:
            subjectCircleStartPosXSomeAreNot - 2 * offsetForSomeCircles,
          circleRadius: majorSubjectCircleRadius,
          startAngleRad: (pi / 180) * 75,
          endAngleRad: -(pi / 180) * 75,
          counterClockwise: false,
          setLineDash: [5, 3]
        }
      },
      predicate: {
        startPositionX: premiseStartPosX,
        startPositionY: premiseStartPosY,
        circleXPos: premiseCircleStartXPos,
        cirleYPos: premiseCircleStartYPos,
        circleRadius: majorPredicateCircleRadious,
        startAngleRad: 0,
        endAngleRad: pi * 2,
        counterClockwise: true,
        setLineDash: []
      }
    },
    minorPremise: {
      subject: {
        A: {
          circleXPos: subjectCircleStartPosXAll,
          circleRadius: minorSubjectCircleRadius
        },
        E: {
          circleXPos: subjectCircleStartPosXNone + majorSubjectCircleRadius,
          circleRadius: minorSubjectCircleRadius
        },
        I: {
          circleXPos:
            subjectCircleStartPosXSomeAre
            + majorSubjectCircleRadius
            - offsetForSomeCircles,
          circleRadius: minorSubjectCircleRadius,
          startAngleRad: -pi / 2,
          endAngleRad: pi / 2
        },
        O: {
          circleXPos: subjectCircleStartPosXSomeAreNot,
          circleRadius: minorSubjectCircleRadius,
          startAngleRad: (pi / 180) * 75,
          endAngleRad: -(pi / 180) * 75,
          counterClockwise: false
        }
      },
      predicate: {
        circleRadius: minorPredicateCircleRadius,
        setLineDash: [5, 3]
      }
    },
    conclusion: {
      subject: {
        A: {
          circleXPos: subjectCircleStartPosXAll,
          circleRadius: minorSubjectCircleRadius
        },
        E: {
          circleXPos:
            subjectCircleStartPosXNone
            + majorSubjectCircleRadius
            + offsetForSomeCircles * 0.5,
          circleRadius: minorSubjectCircleRadius
        },
        I: {
          circleXPos:
            subjectCircleStartPosXSomeAre
            + majorSubjectCircleRadius
            + 1.5 * offsetForSomeCircles,
          circleRadius: minorSubjectCircleRadius,
          startAngleRad: -pi / 2,
          endAngleRad: pi / 2
        },
        O: {
          circleXPos:
            subjectCircleStartPosXSomeAre
            - majorSubjectCircleRadius
            - 1.5 * offsetForSomeCircles,
          circleRadius: minorSubjectCircleRadius,
          startAngleRad: -pi / 2,
          endAngleRad: pi / 2
        }
      }
    }
  };

  const getCircleShape = (part, whichTerm, partForm) => {
    const partShapesAllStore = storeOfCircleShapes[part];
    const defaultShape = storeOfCircleShapes.majorPremise.predicate;
    let individualTermCircleShape;
    if (whichTerm === "subject") {
      individualTermCircleShape = {
        ...defaultShape,
        ...partShapesAllStore.subject[partForm]
      };
    } else if (whichTerm === "predicate") {
      if (part === "majorPremise" || part === "conclusion") {
        return defaultShape;
      }
      individualTermCircleShape = {
        ...defaultShape,
        ...partShapesAllStore.predicate
      };
    } else {
      throw new Error("called getCircleShape with invalid arguments");
    }
    return individualTermCircleShape;
  };

  const drawPartToBoard = (part, partForm, canvasElemCtx) => {
    const subjectShape = getCircleShape(part, "subject", partForm);
    const predicateShape = getCircleShape(part, "predicate", partForm);
    drawCircle(canvasElemCtx, subjectShape);
    drawCircle(canvasElemCtx, predicateShape);
  };

  return {
    drawPartToBoard,
    clearAllCanvasses
  };
})();

window.app.canvas = canvasModule;
