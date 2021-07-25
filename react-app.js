/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */

const { React, ReactDOM, PropTypes } = window;

const getDescriptionOfType = (type="A") => {
	const map = {
		A: "Universal Affirmative",
		E: "Universal Negative",
		I: "Particular Affirmative",
		O: "Particular Negative"
	};
	return map[type];
};

// just handles case of major premise
// need to refactor off of shape positions, to get label pos.
// this is temp
const getShapeLabelPos = (part = "major", term = "subject", partType = "A") => {
  const defaults = {
   x: "149",
   y: "44.5"
 };
	const overrideMinorTermConclusion = {
		E: { x: "141.5", y: "99.5" }
	};
	const majorPartLabelPredicate = {
		A: { x: "159", y: "19.5" },
		E: { x: "239", y: "19.5" },
		I: { x: "178", y: "19.5" },
		O: { x: "194", y: "19.5" }
	};
	const minorPartLabelSubject = {
		A: { x: "141.5", y: "99.5" },
		E: { x: "89", y: "99.5" },
		I: { x: "130.25", y: "99.5" },
		O: { x: "124.625", y: "99.5" }
	};
	const major = {
		predicate: majorPartLabelPredicate
};
const minor = {
		subject: minorPartLabelSubject
};
const conclusion = {
		subject: { ...minorPartLabelSubject, ...overrideMinorTermConclusion },
		predicate: majorPartLabelPredicate
};
	const labelPos = { major, minor, conclusion };
	if (labelPos[part] && labelPos[part][term] && labelPos[part][term][partType]) {
		return labelPos[part][term][partType];
	}

 return defaults;
};

const getEulerCircleSettings = (part = "major", term = "subject", partType = "A") => {
  const minorFill = "#2BA1BD";
 const minorStroke = "#000000";
 // override for styling purposes, for first figure conclusions
	const concMajorTermPart = {
		I: { xPos: "57%", radius: "20%" },
		O: { xPos: "80%", radius: "20%" }
	};
	const concMinorTermPart = {
		E: { xPos: "47%", radius: "5%", fill: minorFill, stroke: minorStroke }
	};
	const majorTerm = {
		A: { xPos: "57%", radius: "20%" },
		E: { xPos: "80%", radius: "20%" },
		I: { xPos: "63%", radius: "20%" },
		O: { xPos: "65%", radius: "20%" }
	};
	const middleTerm = {
		A: { cssClass: "shape_border-dashed" },
		E: { cssClass: "shape_border-dashed" },
		I: { cssClass: "shape_border-dashed" },
		O: { cssClass: "shape_border-dashed" }
	};
	const minorTerm = {
		A: { xPos: "47%", radius: "5%", fill: minorFill, stroke: minorStroke },
		E: { xPos: "29%", radius: "5%", fill: minorFill, stroke: minorStroke }
	};
 const major = {
   subject: middleTerm,
   predicate: majorTerm
 };
 const minor = {
   subject: minorTerm,
   predicate: middleTerm
 };
 const conclusion = {
   subject: { ...minorTerm, ...concMinorTermPart },

   predicate: { ...majorTerm, ...concMajorTermPart }
 };
 const shapeAttrs = { major, minor, conclusion };
 if (shapeAttrs[part] && shapeAttrs[part][term] && shapeAttrs[part][term][partType]) {
   return shapeAttrs[part][term][partType];
 }
 return {};
};

const shiftBackRectPositions = (widthForBackRect = 0, currXPos = 149, currYPos = 44.5) => {
  const currXPosNum = parseFloat(currXPos);
  const currYPosNum = parseFloat(currYPos);
  const magicHeightAdj = 11;
  const x = currXPosNum - (widthForBackRect / 2);
  const y = currYPosNum - magicHeightAdj;
  return { x, y };
};

const EulerPath = (props) => {
  const { part, partType } = props;
		const defaultPath = {
			I: `M 130.25 63.325
			A11.175,11.175 0 0,1 130.25, 85.675
		M 130.25 74.5z`,
    O: `M 124.625 63.325
    A11.175,11.175 0 0,0 124.625, 85.675
   M 124.625 74.5z`
		};
  const paths = {
   major: {
				I: `M 149 52.15
    A22.358,22.358 0 0,1 149, 96.85
   M 149 74.5z`,
    O: `M 149 52.15
    A22.358,22.35 0 0,0 149, 96.85
   M 149 74.5z`
			},
			conclusion: {
				O: `M 130.25 63.325
				A11.175,11.175 0 0,1 130.25, 85.675
			M 130.25 74.5z`
			}
  };

		let path;
		if (paths[part] && paths[part][partType]) {
			path = paths[part][partType];
		} else {
			path = defaultPath[partType];
		}
  return (
    <path
      data-identifier="shape-middleTerm"
      className={`shape ${part === "major" && "shape_border-dashed"}`}
      fill={part === "major" ? "none" : "#2BA1BD"}
      stroke="black"
      strokeWidth="1"
      d={path}
    />
  );
};

const EulerCircle = (props) => {
  const { term, specificAttrs = {} } = props;
  const defaultAttrs = { xPos: "50%", yPos: "50%", radius: "10%", fill: "none", cssClass: "" };
  const svgAttrs = { ...defaultAttrs, ...specificAttrs };
  return (
    <>
      <circle
        data-term={term}
        cx={svgAttrs.xPos}
        cy={svgAttrs.yPos}
        r={svgAttrs.radius}
        fill={svgAttrs.fill}
        stroke="black"
        className={`shape ${svgAttrs.cssClass}`}
      />
    </>
  );
};

const ShapeLabel = (props) => {
  const { labelText, labelTextPos } = props;
  const textRef = React.useRef();
  let widthForBackRect = 0;
  if (textRef.current) {
    widthForBackRect = textRef.current.getBoundingClientRect().width + 5;
  }
  const backRectPos = shiftBackRectPositions(widthForBackRect, labelTextPos.x, labelTextPos.y);
  return (
    <>
      {labelText && (
      <rect
        x={backRectPos.x}
        y={backRectPos.y}
        width={widthForBackRect}
        height="16"
        data-identifier="rect-textLabel-middleTerm"
        fill="#DEDEDE"
        className="textLabel-rect"
      />
      )}
      <text
        ref={textRef}
        textAnchor="middle"
        x={labelTextPos.x}
        y={labelTextPos.y}
        data-identifier="textLabel-middleTerm"
        className="textLabel"
      >{labelText}
      </text>
    </>
  );
};

// Currently, just handles major premise positions
// need to refactor to handle all

const EulerCircleController = (props) => {
  const { part, partType, subjectName, predicateName } = props;
  const subjectShapeSettings = getEulerCircleSettings(part, "subject", partType);
  const predicateShapeSettings = getEulerCircleSettings(part, "predicate", partType);
  const shapeForSubject = (partType === "I" || partType === "O")
  ? <EulerPath part={part} partType={partType} />
  : <EulerCircle term="subject" specificAttrs={subjectShapeSettings} />;
 // Order reversed, for stacking purposes
  return (
    <>
      <g className="predicate">
        <ShapeLabel labelText={predicateName} labelTextPos={getShapeLabelPos(part, "predicate", partType)} />
        <EulerCircle term="predicate" specificAttrs={predicateShapeSettings} />
      </g>
      <g className="subject">
        <ShapeLabel labelText={subjectName} labelTextPos={getShapeLabelPos(part, "subject", partType)} />
        {shapeForSubject}
      </g>

    </>
  );
};

const DiagramMessage = () => (
  <foreignObject x="50" y="50" height="100" width="200" textAnchor="middle">
    <div xmlns="http://www.w3.org/1999/xhtml" className="svg_textMsg">
      Euler diagram for the major premise will appear here, once details entered.
    </div>
  </foreignObject>
  );

const DiagramController = (props) => {
  const { part, partType, children } = props;
  return (
    <svg id="svg_majorPremise" data-part={part} data-parttype={partType} width="300" height="150" viewBox="0 0 300 150">
      {children}
    </svg>
  );
};

const TermName = (props) => {
  const { value, changeHandler, term } = props;
  return (
    <div className="overheadInputLabel_wrapper">
      <label htmlFor={`term-${term}`} className="overheadInputLabel_label">{term} Term</label>
      <input
        name={`term-${term}`}
        type="text"
        value={value}
        onChange={changeHandler}
        data-term={term}
        maxLength="12"
      />
    </div>
  );
};

const Quality = (props) => {
	const { value, partType, selectOptions, changeHandler } = props;
  const isParticular = !!(partType === "I" || partType === "O");
	return (
  <>
    <label htmlFor="quality" hidden>Quality</label>
    <select
      name="quality"
      className=""
      required
      value={value}
      disabled={value === "none"}
      onChange={changeHandler}
      data-aspect="quality"
    >
      <option value="none" disabled hidden>are/are NOT</option>
      <option value={selectOptions.qAff}>{selectOptions.qAff}</option>
      <option value={selectOptions.qNeg} disabled={!isParticular}>{selectOptions.qNeg}</option>
    </select>
  </>
	);
};

const Quantity = (props) => {
	const { value, selectOptions, changeHandler } = props;
	return (
  <>
    <label htmlFor="quantity" hidden>Quantity</label>
    <select
      name="quantity"
      className=""
      required
      value={value}
      onChange={changeHandler}
      data-aspect="quantity"
    >
      <option value="none" disabled hidden>all/some/no</option>
      <option value={selectOptions.uniAff}>{selectOptions.uniAff}</option>
      <option value={selectOptions.uniNeg}>{selectOptions.uniNeg}</option>
      <option value={selectOptions.partAff}>{selectOptions.partAff}</option>
    </select>
  </>
	);
};

const Premise = (props) => {
  const { identity, children, type } = props;
  const inputElements = children.filter((child) => {
    const { name } = child.type;
    return name === "Quantity" || name === "Quality" || name === "TermName";
  });
  const eulerDiagram = children.filter((child) => {
    const { name } = child.type;
    return name === "DiagramController";
  });
		const firstTermStyling = inputElements[1].props.term === "middle" ? "premise_middleTerm" : "";
		const secondTermStyling = inputElements[3].props.term === "middle" ? "premise_middleTerm" : "";

		const conditional = identity === "Major" ? "If" : "And";
  return (
    <fieldset className={`part-${identity} syllogism_part`}>
      <legend>{`${identity.toUpperCase().split("P")[0]}`}: <small>{type}</small></legend>
      <span className="conditional">{conditional}</span>
      <fieldset className="premise_input-overall">
        <fieldset className={`syllogism_part-term ${firstTermStyling}`}>{inputElements[0]}{inputElements[1]}</fieldset>
        <fieldset className={`syllogism_part-term ${secondTermStyling}`}>{inputElements[2]}{inputElements[3]}</fieldset>
      </fieldset>
      <figure>
        {eulerDiagram}
        <figcaption>{!(type === "none") && `“${type}”: ${getDescriptionOfType(type)}`}</figcaption>
      </figure>
    </fieldset>
  );
};

const Conclusion = (props) => {
  const { maps, type, subject, predicate, children } = props;
  const subjectName = subject || "minor term";
  const predicateName = predicate || "major term";
		const noConclusion = type === "none";
		const noValidConclusion = type === "invalid";
		const output = (
  <output className="syllogism_part syllogism_part-conclusion">
    <span className="conditional">Then</span>
    <section className="conclusion_text">
      <section className="conclusion_term">
        <span className="conclusion_aspect">{maps.typeToQuantity[type]}</span>
        <div className="overheadInputLabel_wrapper conclusion_label-wrapper">
          <label htmlFor="term-minor" className="overheadInputLabel_label conclusion_label-label">Minor Term</label>
          <span>{subjectName}</span>
        </div>
      </section>
      <section className="conclusion_term mb-1">
        <span className="conclusion_aspect">{maps.typeToQuality[type]}</span>
        <div className="overheadInputLabel_wrapper conclusion_label-wrapper">
          <label htmlFor="term-major" className="overheadInputLabel_label conclusion_label-label">Major Term</label>
          {predicateName}
        </div>
      </section>
    </section>
    <figure>
      {children}
      <figcaption>{!(type === "valid") && `“${type}”: ${getDescriptionOfType(type)}`}</figcaption>
    </figure>
  </output>
);
  return (
    <section className={`conclusion ${noConclusion ? "hidden" : ""}`}>
      <span className="conclusion_legend"> Conclusion: {type}</span>
      {noValidConclusion
						? <div className={`conclusion_text ${noValidConclusion ? "invalid" : ""}`}>We cannot draw a conclusion</div>
						: output}
    </section>
);
};

const Form = (props) => {
  const { children } = props;
  return (<form>{children}</form>);
};

const FormController = (props) => {
  const [typeMajor, setTypeMajor] = React.useState("none");
  const [typeMinor, setTypeMinor] = React.useState("none");

  const [majorTermName, setMajorTermName] = React.useState("");
  const [middleTermName, setMiddleTermName] = React.useState("");
  const [minorTermName, setMinorTermName] = React.useState("");

  const { quantSelectValues, qualitySelectValues, getConclusion, maps } = props;
  const changeHandlerMajor = ({ target }) => {
    const { dataset: { aspect } } = target;
    if (aspect === "quantity") {
      setTypeMajor(maps.quantityToType[target.value]);
    } else if (aspect === "quality") {
      setTypeMajor(maps.qualityToType[target.value]);
    }
  };
  const changeHandlerMinor = ({ target }) => {
    const { dataset: { aspect } } = target;
    if (aspect === "quantity") {
      setTypeMinor(maps.quantityToType[target.value]);
    } else if (aspect === "quality") {
      setTypeMinor(maps.qualityToType[target.value]);
    }
  };
  const changeNameHandler = ({ target }) => {
    const { dataset: { term } } = target;
   if (term === "middle") {
    setMiddleTermName(target.value);
   } else if (term === "major") {
    setMajorTermName(target.value);
   } else if (term === "minor") {
     setMinorTermName(target.value);
   }
  };

  const typeConclusion = getConclusion(typeMajor, typeMinor);
  return (
    <>
      <Form>
        <Premise identity="Major" type={typeMajor}>
          <Quantity
            value={maps.typeToQuantity[typeMajor]}
            selectOptions={quantSelectValues}
            changeHandler={changeHandlerMajor}
          />
          <TermName
            value={middleTermName}
            changeHandler={changeNameHandler}
            term="middle"
          />
          <Quality
            value={maps.typeToQuality[typeMajor]}
            partType={typeMajor}
            selectOptions={qualitySelectValues}
            changeHandler={changeHandlerMajor}
          />
          <TermName
            value={majorTermName}
            changeHandler={changeNameHandler}
            term="major"
          />
          <DiagramController part="major" partType={typeMajor}>
            {(typeMajor === "none")
            ? <DiagramMessage />
            : (
              <EulerCircleController
                part="major"
                partType={typeMajor}
                subjectName={middleTermName}
                predicateName={majorTermName}
              />
            )}
          </DiagramController>
        </Premise>
        <Premise identity="Minor" type={typeMinor}>
          <Quantity
            value={maps.typeToQuantity[typeMinor]}
            selectOptions={quantSelectValues}
            changeHandler={changeHandlerMinor}
          />
          <TermName
            value={minorTermName}
            changeHandler={changeNameHandler}
            term="minor"
          />
          <Quality
            value={maps.typeToQuality[typeMinor]}
            partType={typeMinor}
            selectOptions={qualitySelectValues}
            changeHandler={changeHandlerMinor}
          />
          <TermName
            value={middleTermName}
            changeHandler={changeNameHandler}
            term="middle"
          />
          <DiagramController part="minor" partType={typeMinor}>
            {(typeMinor === "none")
            ? <DiagramMessage />
            : (
              <EulerCircleController
                part="minor"
                partType={typeMinor}
                subjectName={minorTermName}
                predicateName={middleTermName}
              />
            )}
          </DiagramController>
        </Premise>
      </Form>
      <Conclusion maps={maps} type={typeConclusion} subject={minorTermName} predicate={majorTermName}>
        <DiagramController part="conclusion" partType={typeConclusion}>
          <EulerCircleController
            part="conclusion"
            partType={typeConclusion}
            subjectName={minorTermName}
            predicateName={majorTermName}
          />
        </DiagramController>
      </Conclusion>
    </>
  );
};

const App = () => {
  const uniAff = "all";
  const uniNeg = "no";
  const partAff = "some";
  const quantSelectValues = { uniAff, uniNeg, partAff };

  const qAff = "are";
  const qNeg = "are NOT";
  const qualitySelectValues = { qAff, qNeg };

  const quantityToType = {
    [uniAff]: "A",
    [uniNeg]: "E",
    [partAff]: "I"
  };
  const typeToQuantity = {
    A: uniAff,
    E: uniNeg,
    I: partAff,
    O: partAff,
    none: "none"
  };
  /* programmatic 'change' event does not cause Quantity to be overwritten
  so okay to have limited mapping. Only way you can toggle "are"/"arenot"
  is if you are in the "particular" state
  => universal values are NOT needed here. */
  const qualityToType = {
    [qAff]: "I",
    [qNeg]: "O"
  };

  const typeToQuality = {
    A: qAff,
    E: qAff,
    I: qAff,
    O: qNeg,
    none: "none"
  };

  const getConclusion = (typeMajor = "", typeMinor = "") => {
    const validConclusions = {
      AA: "A",
      EA: "E",
      AI: "I",
      EI: "O"
    };
    if (typeMajor === "none" || typeMinor === "none") return "none";
    if (validConclusions[typeMajor + typeMinor]) return validConclusions[typeMajor + typeMinor];
    return "invalid";
  };

  const maps = {
    quantityToType, typeToQuantity, qualityToType, typeToQuality
  };
  return <FormController getConclusion={getConclusion} quantSelectValues={quantSelectValues} qualitySelectValues={qualitySelectValues} maps={maps} />;
};
ReactDOM.render(<App />, document.getElementById("react_app"));

(function checkPropTypes() {
  EulerPath.propTypes = {
    partType: PropTypes.string.isRequired
  };

  EulerCircle.propTypes = {
    term: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    specificAttrs: PropTypes.object
  };
  EulerCircle.defaultProps = {
    specificAttrs: {}
  };

  ShapeLabel.propTypes = {
    labelText: PropTypes.string.isRequired,
    labelTextPos: PropTypes.objectOf(
      PropTypes.string.isRequired,
      PropTypes.string.isRequired
    ).isRequired
  };

  EulerCircleController.propTypes = {
    part: PropTypes.string.isRequired,
    partType: PropTypes.string.isRequired,
    subjectName: PropTypes.string.isRequired,
    predicateName: PropTypes.string.isRequired
  };

  DiagramController.propTypes = {
    part: PropTypes.string.isRequired,
    partType: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  TermName.propTypes = {
    value: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired,
    term: PropTypes.string.isRequired
  };

  Quality.propTypes = {
    value: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired,
    partType: PropTypes.string.isRequired,
    selectOptions: PropTypes.objectOf(
      PropTypes.string.isRequired,
      PropTypes.string.isRequired
    ).isRequired
  };

  Quantity.propTypes = {
    value: PropTypes.string.isRequired,
    selectOptions: PropTypes.objectOf(
      PropTypes.string.isRequired,
      PropTypes.string.isRequired,
      PropTypes.string.isRequired
    ).isRequired,
    changeHandler: PropTypes.func.isRequired
  };

  Premise.propTypes = {
    identity: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    type: PropTypes.string.isRequired
  };

  Conclusion.propTypes = {
    maps: PropTypes.objectOf(
      PropTypes.object.isRequired,
      PropTypes.object.isRequired,
      PropTypes.object.isRequired,
      PropTypes.object.isRequired
    ).isRequired,
    type: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    predicate: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  Form.propTypes = {
    children: PropTypes.node.isRequired
  };

  FormController.propTypes = {
    quantSelectValues: PropTypes.objectOf(
      PropTypes.string.isRequired,
      PropTypes.string.isRequired,
      PropTypes.string.isRequired
    ).isRequired,
    qualitySelectValues: PropTypes.objectOf(
      PropTypes.string.isRequired,
      PropTypes.string.isRequired
    ).isRequired,
    getConclusion: PropTypes.func.isRequired,
    maps: PropTypes.objectOf(
      PropTypes.object.isRequired,
      PropTypes.object.isRequired,
      PropTypes.object.isRequired,
      PropTypes.object.isRequired
    ).isRequired
  };
})();
