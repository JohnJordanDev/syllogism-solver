/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */

const { React, ReactDOM, PropTypes } = window;

// just handles case of major premise
// need to refactor off of shape positions, to get label pos.
// this is temp
const getShapeLabelPos = (term = "subject", partType = "A") => {
  const defaults = {
   x: "149",
   y: "44.5"
 };
 let specificSettings;
 if (term === "subject") {
   switch (partType) {
     case ("I"):
     specificSettings = {};
      break;
     default:
       break;
   }
 } else if (term === "predicate") {
     switch (partType) {
       case ("A"):
          specificSettings = { x: "159", y: "19.5" };
          break;
      case ("E"):
          specificSettings = { x: "239", y: "19.5" };
          break;
       case ("I"):
          specificSettings = { x: "178", y: "19.5" };
          break;
       case ("O"):
          specificSettings = { x: "194", y: "19.5" };
          break;
       default:
         break;
     }
 }
 return { ...defaults, ...specificSettings };
};

const getShapeSettings = (part = "major", term = "subject", partType = "A") => {
 const major = {
   subject: {
     A: { cssClass: "shape_border-dashed" },
     E: { cssClass: "shape_border-dashed" },
     I: { cssClass: "shape_border-dashed" },
     O: { cssClass: "shape_border-dashed" }
   },
   predicate: {
     A: { xPos: "57%", radius: "20%" },
     E: { xPos: "80%", radius: "20%" },
     I: { xPos: "63%", radius: "20%" },
     O: { xPos: "65%", radius: "20%" }
   }
 };
 const minor = {
   subject: { },
   predicate: { }
 };
 const conclusion = {
   subject: { },
   predicate: { }
 };
 const shapeAttrs = { major, minor, conclusion };
 if (shapeAttrs[part] && shapeAttrs[part][term] && shapeAttrs[part][term][partType]) {
   return shapeAttrs[part][term][partType];
 }
 return {};
};

const EulerPath = (props) => {
  const { partType } = props;
  const paths = {
    I: `M 149 52.150000000000006
    A22.349999999999998,22.349999999999998 0 0,1 149, 96.85
   M 149 74.5z`,
    O: `M 149 52.150000000000006
    A22.349999999999998,22.349999999999998 0 0,0 149, 96.85
   M 149 74.5z`
  };
  return (
    <path
      data-identifier="shape-middleTerm"
      className="shape shape_border-dashed"
      fill="none"
      stroke="black"
      strokeWidth="1"
      d={paths[partType]}
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

const shiftBackRectPositions = (widthForBackRect = 0, currXPos = 149, currYPos = 44.5) => {
  const currXPosNum = parseFloat(currXPos);
  const currYPosNum = parseFloat(currYPos);
  const magicHeightAdj = 11;
  const x = currXPosNum - (widthForBackRect / 2);
  const y = currYPosNum - magicHeightAdj;
  return { x, y };
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
  const subjectShapeSettings = getShapeSettings(part, "subject", partType);
  const predicateShapeSettings = getShapeSettings(part, "predicate", partType);

  const shapeForSubject = (partType === "I" || partType === "O")
  ? <EulerPath partType={partType} />
  : <EulerCircle term="subject" specificAttrs={subjectShapeSettings} />;

  return (
    <>
      <g>
        <ShapeLabel labelText={subjectName} labelTextPos={getShapeLabelPos("subject", partType)} />
        {shapeForSubject}
      </g>
      <ShapeLabel labelText={predicateName} labelTextPos={getShapeLabelPos("predicate", partType)} />
      <EulerCircle term="predicate" specificAttrs={predicateShapeSettings} />
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
    <input
      type="text"
      value={value}
      onChange={changeHandler}
      data-term={term}
      maxLength="12"
    />
  );
};

const Quality = (props) => {
	const { value, partType, selectOptions, changeHandler } = props;
  const isParticular = !!(partType === "I" || partType === "O");
	return (
  <>
    <label htmlFor="prop_one_quality">Quality</label>
    <select
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
    <label htmlFor="prop_one_quantity">Quantity</label>
    <select
      id="prop_one_quantity"
      name="quantity-major-premise"
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

// const UserInput = (props) => {
// 	// TODO: to pass down
// 	const { typeOfPremise } = props;
//   return (
//     <>
//       <Quantity value="none" />
//       <Quality value="none" />
//     </>
// 	);
// };

// UserInput.propTypes = {
// 	typeOfPremise: PropTypes.string.isRequired
// };

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
  return (
    <fieldset className={`part-${identity}`}>
      <legend>{`${identity.toUpperCase().split("P")[0]}`}: <small>{type}</small></legend>
      <fieldset>
        <legend>Choose options:</legend>
        <fieldset>{inputElements[0]}{inputElements[1]}</fieldset>
        <fieldset>{inputElements[2]}{inputElements[3]}</fieldset>
      </fieldset>
      <figure>
        {eulerDiagram}
        <figcaption>Euler Diagram: {!(type === "none") && `${identity}, of type "${type}";`}</figcaption>
      </figure>
    </fieldset>
  );
};

const Conclusion = (props) => {
  const { maps, type, children } = props;
  return (
    <output>
      Conclusion: {type}
      <section>
        {maps.typeToQuantity[type]} thing
        {maps.typeToQuality[type]} other thing
      </section>
      <section>
        {children}
      </section>
    </output>
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
  console.log('typConc: ', typeConclusion, typeMajor, typeMinor,' -> ', getConclusion(typeMajor, typeMinor));
  return (
    <>
      <Form>
        <Premise identity="Major Premise" type={typeMajor}>
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
        <Premise identity="Minor Premise" type={typeMinor}>
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
      <Conclusion maps={maps} type={typeConclusion}>
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
    maps: PropTypes.objectOf(
      PropTypes.object.isRequired,
      PropTypes.object.isRequired,
      PropTypes.object.isRequired,
      PropTypes.object.isRequired
    ).isRequired
  };
})();
