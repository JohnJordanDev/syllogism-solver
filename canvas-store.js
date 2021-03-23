const store = (function () {
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
  const getLabelPosition = (term, part) => {
    let xPos = canvasMidPointX - midCircleRadius;
    let yPos = canvasMidPointY - midCircleRadius;
    if (part === "majorPremise") {
      if (term === "majorTerm") {
        yPos -= 0.5 * bigCircleRadius;
        xPos = storeOfCircleShapes.majorPremise.predicate.I.circleXPos;
      } else {
        yPos -= 0.25 * midCircleRadius;
      }
    } else if (part === "minorPremise") {
      if (term === "minorTerm") {
        xPos -= 2 * smallestCircleRadius;
        yPos = canvasMidPointY + 2 * smallestCircleRadius;
      } else {
        yPos -= 0.25 * midCircleRadius;
      }
    } else if (part === "conclusion") {
      if (term === "minorTerm") {
        xPos -= 2 * smallestCircleRadius;
        yPos = canvasMidPointY + 2 * smallestCircleRadius;
      } else {
        yPos -= 0.5 * bigCircleRadius;
        xPos = storeOfCircleShapes.majorPremise.predicate.I.circleXPos;
      }
    }
    return [xPos, yPos];
  };
  return {
    getDefaultShapeSettings,
    storeOfCircleShapes,
    getLabelPosition
  };
})(window.app.canvas);

window.app.canvas.store = store;
