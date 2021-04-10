const svgStore = (function () {
  const pi = window.Math.PI;

  const conclusionSVG = window.document.getElementById("svg_conclusion");
  const allSVGHeight = conclusionSVG.clientHeight || 150;
  const allSVGWidth = conclusionSVG.clientWidth || 300;

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
    stroke: "black",
    cssClass: ""
  });

  const minorTermFill = "#2BA1BD";
  const minorTermStroke = "#000000";
  // for dashed borders:https://kovart.github.io/dashed-border-generator
  const storeOfCircleShapes = {
    majorPremise: {
      subject: {
        A: { ...getDefaultShapeSettings(), cssClass: "shape_border-dashed" },
        E: { ...getDefaultShapeSettings(), cssClass: "shape_border-dashed" },
        I: { ...getDefaultShapeSettings(), cssClass: "shape_border-dashed" },
        O: { ...getDefaultShapeSettings(), cssClass: "shape_border-dashed" }
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
          fill: minorTermFill,
          stroke: minorTermStroke
        },
        E: {
          circleXPos: xPosZero + bigCircleRadius,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke
        },
        I: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.625,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke
        },
        O: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.6875,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke
        }
      },
      predicate: {
        A: { ...getDefaultShapeSettings(), cssClass: "shape_border-dashed" },
        E: { ...getDefaultShapeSettings(), cssClass: "shape_border-dashed" },
        I: { ...getDefaultShapeSettings(), cssClass: "shape_border-dashed" },
        O: { ...getDefaultShapeSettings(), cssClass: "shape_border-dashed" }
      }
    },
    conclusion: {
      subject: {
        A: {
          circleXPos: SVGMidPointX,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke
        },
        E: {
          circleXPos: SVGMidPointX,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke
        },
        I: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke
        },
        O: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke
        }
      },
      predicate: {
        A: {
          circleXPos: SVGMidPointX + midCircleRadius,
          circleRadius: bigCircleRadius
        },
        E: {
          circleXPos: SVGMidPointX + midCircleRadius * 3,
          circleRadius: bigCircleRadius
        },
        I: {
          circleXPos: SVGMidPointX + midCircleRadius * 0.75,
          circleRadius: bigCircleRadius
        },
        O: {
          circleXPos: SVGMidPointX + midCircleRadius * 3,
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
