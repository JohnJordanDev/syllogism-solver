const svgStore = (function () {
  const pi = window.Math.PI;

  const conclusionSVG = window.document.getElementById('svg_conclusion');
  const allSVGHeight = conclusionSVG.attributes.height;
  const allSVGWidth = conclusionSVG.attributes.width;

  // TODO: Need to add values for position of circle, such that convenient to change all at once,
  // i.e. make all x and y-positions relative to these central defined values,
  // faciliating easy changes

  const bigCircleRadius = 50;
  const midCircleRadius = 25;
  const smallestCircleRadius = 12.5;
  const SVGMidPointX = allSVGWidth / 2;
  const SVGMidPointY = allSVGHeight / 2;

  const xPosZero = 0;

  const lineDashSettings = [2, 2, 2, 2];
  const solidLineSettings = [];
  const subjectFillHex = "#D1D1D1";
  const getDefaultShapeSettings = () => ({
    startPositionX: SVGMidPointX,
    startPositionY: SVGMidPointY,
    circleXPos: SVGMidPointX,
    cirleYPos: SVGMidPointY,
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
          circleXPos: SVGMidPointX + midCircleRadius,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        E: {
          circleXPos: SVGMidPointX + midCircleRadius * 4,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        I: {
          circleXPos: SVGMidPointX + midCircleRadius * 1.5,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        O: {
          circleXPos: SVGMidPointX + midCircleRadius * 2,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        }
      }
    },
    minorPremise: {
      subject: {
        A: {
          circleXPos: SVGMidPointX,
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
          circleXPos: SVGMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius,
          startAngleRad: pi / 1.75,
          endAngleRad: -pi / 1.75,
          setLineDash: solidLineSettings,
          fillStyle: subjectFillHex
        },
        O: {
          circleXPos: SVGMidPointX - midCircleRadius,
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
          circleXPos: SVGMidPointX,
          circleRadius: smallestCircleRadius,
          setLineDash: solidLineSettings,
          fillStyle: subjectFillHex
        },
        E: {
          circleXPos: SVGMidPointX,
          circleRadius: smallestCircleRadius,
          setLineDash: solidLineSettings,
          fillStyle: subjectFillHex
        },
        I: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius,
          startAngleRad: pi / 1.9,
          endAngleRad: -pi / 1.9,
          setLineDash: solidLineSettings,
          fillStyle: subjectFillHex
        },
        O: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius,
          startAngleRad: pi / 2,
          endAngleRad: -pi / 2,
          setLineDash: solidLineSettings,
          fillStyle: subjectFillHex
        }
      },
      predicate: {
        A: {
          circleXPos: SVGMidPointX + midCircleRadius,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        E: {
          circleXPos: SVGMidPointX + midCircleRadius * 4,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        I: {
          circleXPos: SVGMidPointX + midCircleRadius,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        },
        O: {
          circleXPos: SVGMidPointX + midCircleRadius * 4,
          circleRadius: bigCircleRadius,
          setLineDash: solidLineSettings
        }
      }
    }
  };
  const getLabelPosition = (term, part) => {
    let xPos = SVGMidPointX - midCircleRadius;
    let yPos = SVGMidPointY - midCircleRadius;
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
        yPos = SVGMidPointY + 2 * smallestCircleRadius;
      } else {
        yPos -= 0.25 * midCircleRadius;
      }
    } else if (part === "conclusion") {
      if (term === "minorTerm") {
        xPos -= 2 * smallestCircleRadius;
        yPos = SVGMidPointY + 2 * smallestCircleRadius;
      } else {
        yPos -= 0.5 * bigCircleRadius;
        xPos = storeOfCircleShapes.majorPremise.predicate.I.circleXPos;
      }
    }
    return [xPos, yPos];
  };
  return {};
})();

window.app.svgModule.store = svgStore;
