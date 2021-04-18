const svgStore = (function () {
  const conclusionSVG = window.document.getElementById("svg_conclusion");
  const allSVGHeight = conclusionSVG.clientHeight || 150;
  const allSVGWidth = conclusionSVG.clientWidth || 300;

  // need to make all these percentages to ensure responsive design
  const bigCircleRadius = 60;
  const midCircleRadius = 30;
  const smallestCircleRadius = 15;
  const SVGMidPointX = allSVGWidth / 2;
  const SVGMidPointY = allSVGHeight / 2;

  const getSVGHeight = () => allSVGHeight;
  const getSVGWidth = () => allSVGWidth;

  const getDefaultShapeSettings = () => ({
    circleXPos: SVGMidPointX,
    circleYPos: SVGMidPointY,
    circleRadius: midCircleRadius,
    fill: "none",
    stroke: "black",
    cssClass: "",
    identifier: "middleTerm",
    arcSweepFlag: "1"
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
        O: { ...getDefaultShapeSettings(), cssClass: "shape_border-dashed", arcSweepFlag: "0" }
      },
      predicate: {
        A: {
          circleXPos: SVGMidPointX + midCircleRadius * 0.75,
          circleRadius: bigCircleRadius,
          identifier: "majorTerm"
        },
        E: {
          circleXPos: SVGMidPointX + midCircleRadius * 3,
          circleRadius: bigCircleRadius,
          identifier: "majorTerm"
        },
        I: {
          circleXPos: SVGMidPointX + midCircleRadius * 1.375,
          circleRadius: bigCircleRadius,
          identifier: "majorTerm"
        },
        O: {
          circleXPos: SVGMidPointX + midCircleRadius * 1.5,
          circleRadius: bigCircleRadius,
          identifier: "majorTerm"
        }
      }
    },
    minorPremise: {
      subject: {
        A: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.25,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke,
          identifier: "minorTerm"
        },
        E: {
          circleXPos: SVGMidPointX - bigCircleRadius,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke,
          identifier: "minorTerm"
        },
        I: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.625,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke,
          identifier: "minorTerm"
        },
        O: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.8125,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke,
          identifier: "minorTerm",
          arcSweepFlag: "0"
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
          circleXPos: SVGMidPointX - midCircleRadius * 0.25,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke,
          identifier: "minorTerm"
        },
        E: {
          circleXPos: SVGMidPointX,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke,
          identifier: "minorTerm"
        },
        I: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke,
          identifier: "minorTerm"
        },
        O: {
          circleXPos: SVGMidPointX - midCircleRadius * 0.75,
          circleRadius: smallestCircleRadius,
          fill: minorTermFill,
          stroke: minorTermStroke,
          identifier: "minorTerm"
        }
      },
      predicate: {
        A: {
          circleXPos: SVGMidPointX + midCircleRadius * 0.75,
          circleRadius: bigCircleRadius,
          identifier: "majorTerm"
        },
        E: {
          circleXPos: SVGMidPointX + midCircleRadius * 3,
          circleRadius: bigCircleRadius,
          identifier: "majorTerm"
        },
        I: {
          circleXPos: SVGMidPointX + midCircleRadius * 0.75,
          circleRadius: bigCircleRadius,
          identifier: "majorTerm"
        },
        O: {
          circleXPos: SVGMidPointX + midCircleRadius * 1.5,
          circleRadius: bigCircleRadius,
          identifier: "majorTerm"
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
