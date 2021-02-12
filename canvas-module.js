const canvasModule = (function () {
  const allCanvasses = [...window.document.getElementsByTagName("canvas")];

  // TODO: set width of all canvas elements to 350, etc.

  const pi = window.Math.PI;

  // Note: difference between canvas logical drawing elements, and the element itself
  // https://stackoverflow.com/questions/4938346/canvas-width-and-height-in-html5
  // TODO: Function to redraw canvas width on resize
  const allCanvassesWidth = 300;
  const allCanvassesHeight = 150;

  // TODO: Need to add values for position of circle, such that convenient to change all at once,
  // i.e. make all x and y-positions relative to these central defined values,
  // faciliating easy changes

  const bigCircleRadius = 50;
  const midCircleRadius = 25;
  const smallestCircle = 12.5;
  const canvasMidPoint = allCanvassesWidth / 2;
  const xPosZero = 0;

  const offsetForSomeCircles = allCanvassesWidth / 30;

  const premiseStartPosY = allCanvassesHeight / 2;
  const premiseCircleStartYPos = premiseStartPosY;
  const lineDashSettings = [2,2,2,2];
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
          startAngleRad: pi / 2,
          endAngleRad: -pi / 2
        },
        O: {
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
          circleXPos: canvasMidPoint + midCircleRadius * 1.5,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        O: {
          circleXPos: canvasMidPoint + midCircleRadius * 2,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        }
      }
    },
    // TOODO: POSITIONING
    minorPremise: {
      subject: {
        A: {
          circleXPos: canvasMidPoint,
          circleRadius: smallestCircle,
          setLineDash: solidLineSettings
        },
        E: {
          circleXPos: xPosZero + bigCircleRadius,
          circleRadius: smallestCircle,
          setLineDash: solidLineSettings
        },
        I: {
          circleXPos: canvasMidPoint - midCircleRadius * 0.75,
          circleRadius: smallestCircle,
          startAngleRad: pi / 2,
          endAngleRad: -pi / 2,
          setLineDash: solidLineSettings
        },
        O: {
          circleXPos: canvasMidPoint - midCircleRadius,
          circleRadius: smallestCircle,
          startAngleRad: (pi / 180) * 75,
          endAngleRad: -(pi / 180) * 75,
          counterClockwise: false,
          setLineDash: solidLineSettings
        }
      },
      predicate: {
        A: getDefaultShapeSettings(),
        E: getDefaultShapeSettings(),
        I: getDefaultShapeSettings(),
        O: getDefaultShapeSettings()
      }
    },
    // TOODO: POSITIONING
    conclusion: {
      subject: {
        A: {
          circleXPos: canvasMidPoint,
          circleRadius: smallestCircle
        },
        E: {
          circleXPos:
            xPosZero +
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
  // TODO: DELETE
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
