const canvasModule = (function () {
  const allCanvasses = [...window.document.getElementsByTagName("canvas")];

  const pi = window.Math.PI;

  const allCanvassesWidth = 400;
  const allCanvassesHeight = 150;

  // TODO: Need to add values for position of circle, such that convenient to change all at once,
  // i.e. make all x and y-positions relative to these central defined values,
  // faciliating easy changes

  const bigCircleRadius = 50;
  const midCircleRadius = 25;
  const smallestCircle = 12.5;
  const canvasMidPoint = allCanvassesWidth / 2;
  const subjectCircleStartPosXNone = 0;

  const offsetForSomeCircles = allCanvassesWidth / 30;

  const subjectCircleStartPosXSomeAreNot = canvasMidPoint - midCircleRadius;

  const premiseStartPosY = allCanvassesHeight / 2;
  const premiseCircleStartYPos = premiseStartPosY;
  const lineDashSettings = [5, 3];
  const solidLineSettings = [];
  const getDefaultShapeSettings = () => ({
    circleXPos: canvasMidPoint,
    circleRadius: midCircleRadius,
    startAngleRad: 0,
    endAngleRad: pi * 2,
    counterClockwise: true,
    setLineDash: lineDashSettings
  });
  const storeOfCircleShapes = {
    majorPremise: {
      subject: {
        A: getDefaultShapeSettings(),
        E: getDefaultShapeSettings(),
        I: {
          circleXPos: canvasMidPoint - midCircleRadius,
          circleRadius: midCircleRadius,
          startAngleRad: pi / 2,
          endAngleRad: -pi / 2
        },
        O: {
          circleXPos:
            subjectCircleStartPosXSomeAreNot - 2 * offsetForSomeCircles,
          circleRadius: midCircleRadius,
          startAngleRad: (pi / 180) * 75,
          endAngleRad: -(pi / 180) * 75,
          counterClockwise: false
        }
      },
      predicate: {
        A: {
          circleXPos: canvasMidPoint + midCircleRadius,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        E: {
          circleXPos: canvasMidPoint + midCircleRadius * 4,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        I: {
          circleXPos: canvasMidPoint + midCircleRadius,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        O: {
          circleXPos: canvasMidPoint + midCircleRadius,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        }
      }
    },
    minorPremise: {
      subject: {
        A: {
          circleXPos: canvasMidPoint,
          circleRadius: smallestCircle
        },
        E: {
          circleXPos: subjectCircleStartPosXNone + midCircleRadius,
          circleRadius: smallestCircle
        },
        I: {
          circleXPos: midCircleRadius + midCircleRadius - offsetForSomeCircles,
          circleRadius: smallestCircle,
          startAngleRad: -pi / 2,
          endAngleRad: pi / 2
        },
        O: {
          circleXPos: subjectCircleStartPosXSomeAreNot,
          circleRadius: smallestCircle,
          startAngleRad: (pi / 180) * 75,
          endAngleRad: -(pi / 180) * 75,
          counterClockwise: false
        }
      },
      predicate: {
        A: getDefaultShapeSettings(),
        E: getDefaultShapeSettings(),
        I: getDefaultShapeSettings(),
        O: getDefaultShapeSettings()
      }
    },
    conclusion: {
      subject: {
        A: {
          circleXPos: canvasMidPoint,
          circleRadius: smallestCircle
        },
        E: {
          circleXPos:
            subjectCircleStartPosXNone +
            midCircleRadius +
            offsetForSomeCircles * 0.5,
          circleRadius: smallestCircle
        },
        I: {
          circleXPos:
            canvasMidPoint + midCircleRadius + 1.5 * offsetForSomeCircles,
          circleRadius: smallestCircle,
          startAngleRad: -pi / 2,
          endAngleRad: pi / 2
        },
        O: {
          circleXPos:
            canvasMidPoint - midCircleRadius - 1.5 * offsetForSomeCircles,
          circleRadius: smallestCircle,
          startAngleRad: -pi / 2,
          endAngleRad: pi / 2
        }
      },
      predicate: {
        A: {
          circleXPos: canvasMidPoint + midCircleRadius,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        E: {
          circleXPos: canvasMidPoint + midCircleRadius,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        I: {
          circleXPos: canvasMidPoint + midCircleRadius,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        O: {
          circleXPos: canvasMidPoint + midCircleRadius,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        }
      }
    }
  };

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
      startPositionX: canvasMidPoint,
      startPositionY: premiseStartPosY,
      circleXPos: canvasMidPoint,
      cirleYPos: premiseCircleStartYPos,
      circleRadius: bigCircleRadius,
      startAngleRad: 0,
      endAngleRad: pi * 2,
      counterClockwise: true,
      setLineDash: []
    };
    const settings = { ...defaults, ...options };
    drawToCanvas(canvasElemCtx, settings);
  };

  const getCircleShape = (part, whichTerm, partForm) => {
    const partShapesAllStore = storeOfCircleShapes[part];
    const defaultShape = storeOfCircleShapes.majorPremise.predicate;
    let individualTermCircleShape;

    // will need to refactor this, since major SUBJECT is to be the default shape
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
    const subjectCircleShape = {
      ...getDefaultShapeSettings(),
      ...storeOfCircleShapes[part].subject[partForm]
    };
    const predicateCircleShape = {
      ...getDefaultShapeSettings(),
      ...storeOfCircleShapes[part].predicate[partForm]
    };
    drawCircle(canvasElemCtx, subjectCircleShape);
    drawCircle(canvasElemCtx, predicateCircleShape);
  };

  return {
    drawPartToBoard,
    clearAllCanvasses
  };
})();

window.app.canvas = canvasModule;
