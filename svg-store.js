const svgStore = (function () {
  const pi = window.Math.PI;

  const conclusionSVG = window.document.getElementById("svg_conclusion");
  const allSVGHeight = conclusionSVG.attributes.height.value || 150;
  const allSVGWidth = conclusionSVG.attributes.width.value || 300;

  const bigCircleRadius = 50;
  const midCircleRadius = 25;
  const smallestCircleRadius = 12.5;
  const SVGMidPointX = allSVGWidth / 2;
  const SVGMidPointY = allSVGHeight / 2;
  const xPosZero = 0;

  const getDefaultShapeSettings = () => ({
    circleXPos: SVGMidPointX,
    circleYPos: SVGMidPointY,
    circleRadius: midCircleRadius,
    fill: "blue",
    stroke: "black"
  });
  // TODO: add function for half circle shape
  // for dashed borders:https://kovart.github.io/dashed-border-generator
  const storeOfCircleShapes = {
    majorPremise: {
      subject: {
        A: getDefaultShapeSettings(),
        E: getDefaultShapeSettings(),
        I: getDefaultShapeSettings(),
        O: getDefaultShapeSettings()
      },
      predicate: {
        A: {
          circleXPos: SVGMidPointX + midCircleRadius,
          circleRadius: bigCircleRadius
        },
        E: {
          circleXPos: SVGMidPointX + midCircleRadius * 4,
          circleRadius: bigCircleRadius
        },
        I: {
          circleXPos: SVGMidPointX + midCircleRadius * 1.5,
          circleRadius: bigCircleRadius
        },
        O: {
          circleXPos: SVGMidPointX + midCircleRadius * 2,
          circleRadius: bigCircleRadius
        }
      }
    },
    minorPremise: {
      subject: {
        A: {
          circleXPos: SVGMidPointX,
          circleRadius: smallestCircleRadius
        },
        E: {
          circleXPos: xPosZero + bigCircleRadius,
          circleRadius: smallestCircleRadius
        },
        I: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius
        },
        O: {
          circleXPos: SVGMidPointX - midCircleRadius,
          circleRadius: smallestCircleRadius
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
          circleRadius: smallestCircleRadius
        },
        E: {
          circleXPos: SVGMidPointX,
          circleRadius: smallestCircleRadius
        },
        I: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius
        },
        O: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius
        }
      },
      predicate: {
        A: {
          circleXPos: SVGMidPointX + midCircleRadius,
          circleRadius: bigCircleRadius
        },
        E: {
          circleXPos: SVGMidPointX + midCircleRadius * 4,
          circleRadius: bigCircleRadius
        },
        I: {
          circleXPos: SVGMidPointX + midCircleRadius,
          circleRadius: bigCircleRadius
        },
        O: {
          circleXPos: SVGMidPointX + midCircleRadius * 4,
          circleRadius: bigCircleRadius
        }
      }
    }
  };
  return {
    // Need to rewrite this API, to expose two functions
    storeOfCircleShapes
  };
})();

window.app.svgModule.store = svgStore;
