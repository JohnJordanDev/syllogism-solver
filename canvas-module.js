const canvasModule = (function () {
  const allCanvasses = [...window.document.getElementsByTagName("canvas")];

  // TODO: set width of all canvas elements to 350, etc.

  const pi = window.Math.PI;

  // Note: difference between canvas logical drawing elements, and the element itself
  // https://stackoverflow.com/questions/4938346/canvas-width-and-height-in-html5
  // TODO: Function to redraw canvas width on resize
  const allCanvassesWidth = 285;
  const allCanvassesHeight = 150;

  // TODO: Need to add values for position of circle, such that convenient to change all at once,
  // i.e. make all x and y-positions relative to these central defined values,
  // faciliating easy changes

  const bigCircleRadius = 50;
  const midCircleRadius = 25;
  const smallestCircleRadius = 12.5;
  const canvasMidPointX = allCanvassesWidth / 2;
  const canvasMidPointY = allCanvassesHeight / 2;

  const xPosZero = 0;

  const lineDashSettings = [2, 2, 2, 2];
  const solidLineSettings = [];
  const subjectFillHex = "#D1D1D1";

  const getDefaultShapeSettings = () => ({
    circleXPos: canvasMidPointX,
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
          circleXPos: canvasMidPointX + midCircleRadius,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        E: {
          circleXPos: canvasMidPointX + midCircleRadius * 4,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        I: {
          circleXPos: canvasMidPointX + midCircleRadius * 1.5,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        O: {
          circleXPos: canvasMidPointX + midCircleRadius * 2,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        }
      }
    },
    minorPremise: {
      subject: {
        A: {
          circleXPos: canvasMidPointX,
          circleRadius: smallestCircleRadius,
          setLineDash: solidLineSettings,
          fillStyle: subjectFillHex
        },
        E: {
          circleXPos: xPosZero + bigCircleRadius,
          circleRadius: smallestCircleRadius,
          setLineDash: solidLineSettings,
          fillStyle: subjectFillHex
        },
        I: {
          circleXPos: canvasMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius,
          startAngleRad: pi / 1.75,
          endAngleRad: -pi / 1.75,
          setLineDash: solidLineSettings,
          fillStyle: subjectFillHex
        },
        O: {
          circleXPos: canvasMidPointX - midCircleRadius,
          circleRadius: smallestCircleRadius,
          startAngleRad: (pi / 180) * 90,
          endAngleRad: -(pi / 180) * 90,
          counterClockwise: false,
          setLineDash: solidLineSettings,
          fillStyle: subjectFillHex
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
          circleXPos: canvasMidPointX,
          circleRadius: smallestCircleRadius,
          setLineDash: solidLineSettings,
          fillStyle: subjectFillHex
        },
        E: {
          circleXPos: canvasMidPointX,
          circleRadius: smallestCircleRadius,
          setLineDash: solidLineSettings,
          fillStyle: subjectFillHex
        },
        I: {
          circleXPos: canvasMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius,
          startAngleRad: pi / 1.9,
          endAngleRad: -pi / 1.9,
          setLineDash: solidLineSettings,
          fillStyle: subjectFillHex
        },
        O: {
          circleXPos: canvasMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius,
          startAngleRad: pi / 2,
          endAngleRad: -pi / 2,
          setLineDash: solidLineSettings,
          fillStyle: subjectFillHex
        }
      },
      predicate: {
        A: {
          circleXPos: canvasMidPointX + midCircleRadius,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        E: {
          circleXPos: canvasMidPointX + midCircleRadius * 4,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        I: {
          circleXPos: canvasMidPointX + midCircleRadius,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        O: {
          circleXPos: canvasMidPointX + midCircleRadius * 4,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        }
      }
    }
  };

  const clearThisCanvas = (canvas) => {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  };

  const clearAllCanvasses = () => {
    allCanvasses.forEach((canvas) => {
      clearThisCanvas(canvas);
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
    if (settings.fillStyle) {
      // eslint-disable-next-line no-param-reassign
      canvasElemCtx.fillStyle = settings.fillStyle;
      canvasElemCtx.fill();
    }
  };

  const drawCircle = function (canvasElemCtx, options = {}) {
    const defaults = {
      startPositionX: canvasMidPointX,
      startPositionY: canvasMidPointY,
      circleXPos: canvasMidPointX,
      cirleYPos: canvasMidPointY,
      circleRadius: bigCircleRadius,
      startAngleRad: 0,
      endAngleRad: pi * 2,
      counterClockwise: true,
      setLineDash: []
    };
    const settings = { ...defaults, ...options };
    drawToCanvas(canvasElemCtx, settings);
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
    clearThisCanvas,
    clearAllCanvasses
  };
})();

window.app.canvas = canvasModule;
