const svgStore = (function () {
  const pi = window.Math.PI;

  const conclusionSVG = window.document.getElementById("svg_conclusion");
  const allSVGHeight = conclusionSVG.attributes.height.value || 150;
  const allSVGWidth = conclusionSVG.attributes.width.value || 300;

  // need to make all these percentages to ensure responsive design
  const bigCircleRadius = 60;
  const midCircleRadius = 30;
  const smallestCircleRadius = 15;
  const SVGMidPointX = allSVGWidth / 2;
  const SVGMidPointY = allSVGHeight / 2;
  const xPosZero = 0;

  const getSVGHeight = () => allSVGHeight;
  const getSVGWidth = () => allSVGWidth;

  const getDefaultShapeSettings = () => ({
    circleXPos: SVGMidPointX,
    circleYPos: SVGMidPointY,
    circleRadius: midCircleRadius,
    fill: "none",
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
          circleXPos: SVGMidPointX + midCircleRadius * 0.75,
          circleRadius: bigCircleRadius
        },
        E: {
          circleXPos: SVGMidPointX + midCircleRadius * 3,
          circleRadius: bigCircleRadius
        },
        I: {
          circleXPos: SVGMidPointX + midCircleRadius * 1.375,
          circleRadius: bigCircleRadius
        },
        O: {
          circleXPos: SVGMidPointX + midCircleRadius * 1.5,
          circleRadius: bigCircleRadius
        }
      }
    },
    minorPremise: {
      subject: {
        A: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.25,
          circleRadius: smallestCircleRadius,
          fill: "#F7F7F7",
          stroke: "#2BA1BD"
        },
        E: {
          circleXPos: xPosZero + bigCircleRadius,
          circleRadius: smallestCircleRadius,
          fill: "#F7F7F7",
          stroke: "#2BA1BD"
        },
        I: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius,
          fill: "#F7F7F7",
          stroke: "#2BA1BD"
        },
        O: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius,
          fill: "#F7F7F7",
          stroke: "#2BA1BD"
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

  const getCircleShape = (syllogismPart, propositionPart, propositionForm) => ({
    ...getDefaultShapeSettings(),
    ...storeOfCircleShapes[syllogismPart][propositionPart][propositionForm]
  });
  return {
    getCircleShape,
    getSVGHeight,
    getSVGWidth
  };
})();

window.app.svgModule.store = svgStore;
